import { auditProductionGuide } from './browser-audit';
import { healthResponse, recordIndexRun } from './job-health';
import { syncSearchIndex } from './search-index';
import type { AiSearchInstance, BrowserRun, D1Database, MessageBatch } from '@cloudflare/workers-types';
import { archiveDocument, ArchiveUnavailable, cleanupArchives } from './archive';

// These are binding contracts; configuration lives in jobs/cloudflare.config.ts.
type SourceJob = { runId: string; sourceId: string };
export type JobBindings = {
  DB: Parameters<typeof archiveDocument>[0];
  ARCHIVE: Parameters<typeof archiveDocument>[1];
  SOURCE_QUEUE: { sendBatch(messages: { body: SourceJob }[]): Promise<unknown> };
};
type Source = { id: string; url: string; etag: string | null; last_modified: string | null; content_sha256: string | null };
const SOURCES_PER_DAY = 50;

export function sourceURL(value: string): URL {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || (url.port && url.port !== '443') ||
    !url.hostname.includes('.') || /^(?:[\d.]+|\[.*\])$/.test(url.hostname) ||
    /(?:^|\.)(?:localhost|local|internal|test|invalid)$/.test(url.hostname)) {
    throw new ArchiveUnavailable('source_url_not_public_https');
  }
  return url;
}

async function fetchSource(source: Source): Promise<Response> {
  let url = sourceURL(source.url);
  const signal = AbortSignal.timeout(20_000);
  for (let redirects = 0; redirects <= 4; redirects++) {
    const headers = new Headers({ Accept: 'application/pdf,text/html,text/plain', 'User-Agent': 'WashGuideSourceCheck/1.0 (+https://wash.kokoda.fun)' });
    if (source.etag) headers.set('If-None-Match', source.etag);
    if (source.last_modified) headers.set('If-Modified-Since', source.last_modified);
    const response = await fetch(url, { headers, redirect: 'manual', signal });
    if (![301, 302, 303, 307, 308].includes(response.status)) return response;
    const location = response.headers.get('location');
    await response.body?.cancel();
    if (!location) throw new ArchiveUnavailable('source_redirect_without_location');
    url = sourceURL(new URL(location, url).href);
  }
  throw new ArchiveUnavailable('source_redirect_limit');
}

export async function scheduleSourceChecks(env: JobBindings) {
  await cleanupArchives(env.DB, env.ARCHIVE);
  const day = new Date().toISOString().slice(0, 10);
  const runId = `sources-${day}`;
  // One persisted daily claim, including after deployment/restart. A failed
  // send stops that day's producer rather than generating an unbounded replay.
  const claim = await env.DB.batch([
    env.DB.prepare(`INSERT OR IGNORE INTO audit_runs(id,started_at,state,kind)
      VALUES (?,?,'running','sources')`).bind(runId, new Date().toISOString()),
    env.DB.prepare('INSERT INTO source_job_days(day,run_id) SELECT ?,? WHERE NOT EXISTS (SELECT 1 FROM source_job_days WHERE day=?) RETURNING run_id').bind(day, runId, day),
  ]);
  if (!claim[1].results.length) return;
  const { results } = await env.DB.prepare(`SELECT id FROM sources WHERE last_checked_at IS NULL
    OR last_checked_at < strftime('%Y-%m-%dT%H:%M:%fZ','now','-7 days') ORDER BY last_checked_at,id LIMIT ?`)
    .bind(SOURCES_PER_DAY).all<{ id: string }>();
  await env.DB.prepare('UPDATE audit_runs SET expected_count=? WHERE id=?').bind(results.length, runId).run();
  try {
    if (results.length) await env.SOURCE_QUEUE.sendBatch(results.map(source => ({ body: { runId, sourceId: source.id } })));
    else await env.DB.prepare("UPDATE audit_runs SET state='completed',completed_at=? WHERE id=?").bind(new Date().toISOString(), runId).run();
  } catch (error) {
    await env.DB.prepare("UPDATE audit_runs SET state='failed',completed_at=? WHERE id=?").bind(new Date().toISOString(), runId).run();
    throw error;
  }
}

function job(value: unknown): SourceJob | null {
  if (!value || typeof value !== 'object' || !('runId' in value) || !('sourceId' in value)) return null;
  return typeof value.runId === 'string' && /^sources-\d{4}-\d{2}-\d{2}$/.test(value.runId) &&
    typeof value.sourceId === 'string' && /^[a-f0-9]{64}$/.test(value.sourceId)
    ? { runId: value.runId, sourceId: value.sourceId } : null;
}

async function finish(env: JobBindings, task: SourceJob, status: number | null, outcome: string, error: string | null = null) {
  const now = new Date().toISOString();
  await env.DB.batch([
    env.DB.prepare(`INSERT OR IGNORE INTO source_checks(run_id,source_id,checked_at,status,outcome,error_code) VALUES (?,?,?,?,?,?)`)
      .bind(task.runId, task.sourceId, now, status, outcome, error),
    env.DB.prepare(`UPDATE sources SET last_checked_at=?,last_http_status=?,
      consecutive_failures=CASE WHEN ? THEN 0 ELSE consecutive_failures+1 END,
      last_success_at=CASE WHEN ? THEN ? ELSE last_success_at END WHERE id=?`)
      .bind(now, status, status !== null && (status === 304 || status >= 200 && status < 300) ? 1 : 0,
        status !== null && (status === 304 || status >= 200 && status < 300) ? 1 : 0, now, task.sourceId),
    env.DB.prepare(`UPDATE audit_runs SET state='completed',completed_at=? WHERE id=?
      AND state='running' AND expected_count <= (SELECT count(*) FROM source_checks WHERE run_id=?)`).bind(now, task.runId, task.runId),
  ]);
}

export async function consumeSourceChecks(batch: MessageBatch, env: JobBindings) {
  for (const message of batch.messages) {
    const task = job(message.body);
    if (!task) { message.ack(); continue; }
    try {
      if (await env.DB.prepare('SELECT 1 FROM source_checks WHERE run_id=? AND source_id=?').bind(task.runId, task.sourceId).first()) {
        message.ack(); continue;
      }
      const source = await env.DB.prepare('SELECT id,url,etag,last_modified,content_sha256 FROM sources WHERE id=?').bind(task.sourceId).first<Source>();
      if (!source || !await env.DB.prepare('SELECT 1 FROM audit_runs WHERE id=?').bind(task.runId).first()) { message.ack(); continue; }
      const response = await fetchSource(source);
      if (response.status === 429 || response.status >= 500) {
        await response.body?.cancel();
        throw new Error('source_transient_http');
      }
      let outcome = response.status === 304 ? 'unchanged' : response.ok ? 'checked' : 'http-error';
      if (response.ok) {
        const etag = response.headers.get('etag');
        const modified = response.headers.get('last-modified');
        try {
          const stored = await archiveDocument(env.DB, env.ARCHIVE, source.id, response);
          outcome = stored.deduplicated ? 'unchanged' : 'archived';
          await env.DB.batch([
            env.DB.prepare('UPDATE sources SET etag=?,last_modified=?,content_sha256=? WHERE id=?').bind(etag, modified, stored.sha256, source.id),
            env.DB.prepare(`INSERT OR IGNORE INTO review_items(id,source_id,kind,body,created_at)
              SELECT ?,?,'source-change',?,? WHERE ? IS NOT NULL AND ? != ?`)
              .bind(`${task.runId}-${source.id}`, source.id, JSON.stringify({ previous: source.content_sha256, current: stored.sha256, objectKey: stored.key }),
                new Date().toISOString(), source.content_sha256, source.content_sha256, stored.sha256),
          ]);
        } catch (error) {
          // Quota/type/size exclusions are final outcomes, never retry storms.
          if (error instanceof ArchiveUnavailable || error instanceof Error && /archive_(disabled|storage_limit|write_limit)/.test(error.message)) outcome = 'archive-skipped';
          else throw error;
        }
      } else await response.body?.cancel();
      await finish(env, task, response.status, outcome);
      message.ack();
    } catch (error) {
      if (message.attempts >= 3 || error instanceof ArchiveUnavailable) {
        await finish(env, task, null, 'failed', error instanceof ArchiveUnavailable ? error.message : 'source_check_failed');
        message.ack();
      } else message.retry({ delaySeconds: 300 });
    }
  }
}

const worker = {
  fetch(request: Request, env: Parameters<typeof healthResponse>[1]) {
    return healthResponse(request,env,(caches as CacheStorage & {default:Cache}).default);
  },
  async scheduled(controller: { cron: string; scheduledTime: number }, env: JobBindings & { DB: D1Database; SEARCH: AiSearchInstance; BROWSER: BrowserRun }) {
    if (controller.cron === '*/15 * * * *') await recordIndexRun(env.DB, controller.scheduledTime, () => syncSearchIndex(env.DB, env.SEARCH));
    else if (controller.cron === '35 3 * * *') await auditProductionGuide(env.DB, env.BROWSER, controller.scheduledTime);
    else if (controller.cron === '0 3 * * *') await scheduleSourceChecks(env);
  },
  queue: consumeSourceChecks,
};
export default worker;
