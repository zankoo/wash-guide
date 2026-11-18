import type { D1Database, RateLimit } from '@cloudflare/workers-types';

export async function recordIndexRun(db: D1Database, time: number, run: () => Promise<void>) {
  const tick = new Date(time).toISOString();
  const claimed = await db
    .prepare(
      `INSERT INTO audit_runs(id,kind,state,started_at)
    VALUES('index-heartbeat','index','running',?) ON CONFLICT(id) DO UPDATE SET
    state='running',started_at=excluded.started_at WHERE excluded.started_at>audit_runs.started_at RETURNING id`,
    )
    .bind(tick)
    .first();
  if (!claimed) return;
  try {
    await run();
    await db
      .prepare(
        "UPDATE audit_runs SET state='completed',completed_at=? WHERE id='index-heartbeat' AND started_at=?",
      )
      .bind(new Date().toISOString(), tick)
      .run();
  } catch (error) {
    await db
      .prepare("UPDATE audit_runs SET state='failed' WHERE id='index-heartbeat' AND started_at=?")
      .bind(tick)
      .run();
    throw error;
  }
}

const url = 'https://wash.kokoda.fun/health/jobs';
export async function jobHealth(db: D1Database, now = Date.now()) {
  // Source checks run at 03:00 UTC, Browser Run at 03:35. Allow the queue to
  // drain and audit yesterday until today's 05:00 deadline.
  const day = new Date(now - 5 * 3600000).toISOString().slice(0, 10);
  const today = new Date(now).toISOString().slice(0, 10);
  const [runs, queue, archive] = await db.batch<Record<string, string | number | null>>([
    db
      .prepare('SELECT id,state,expected_count,completed_at FROM audit_runs WHERE id IN (?,?,?)')
      .bind('sources-' + day, 'browser-' + day, 'index-heartbeat'),
    db
      .prepare(
        "SELECT count(*) n,count(CASE WHEN outcome='failed' THEN 1 END) failed FROM source_checks WHERE run_id=?",
      )
      .bind('sources-' + day),
    db
      .prepare(
        `SELECT enabled,reserved_bytes*10>=max_bytes*8 OR coalesce(puts,0)*10>=daily_puts*8
      OR coalesce(gets,0)*10>=daily_gets*8 AS near_limit FROM archive_policy JOIN archive_storage USING(singleton)
      LEFT JOIN archive_daily ON day=? WHERE singleton=1`,
      )
      .bind(today),
  ]);
  const run = (id: string) => runs.results.find((row) => row.id === id);
  const sources = run('sources-' + day);
  const index = run('index-heartbeat');
  const usage = archive.results[0];
  const checks = {
    browser: run('browser-' + day)?.state ?? 'missing',
    sources: sources?.state ?? 'missing',
    queue:
      !sources || queue.results[0].n !== sources.expected_count
        ? 'incomplete'
        : queue.results[0].failed
          ? 'failed'
          : 'completed',
    index: !index
      ? 'missing'
      : index.state === 'failed'
        ? 'failed'
        : Date.parse(String(index.completed_at)) >= now - 45 * 60000
          ? 'completed'
          : 'stale',
    archive: !usage?.enabled ? 'disabled' : usage.near_limit ? 'near-limit' : 'within-budget',
  };
  const ok =
    checks.browser === 'completed' &&
    checks.sources === 'completed' &&
    checks.queue === 'completed' &&
    checks.index === 'completed' &&
    checks.archive === 'within-budget';
  return { ok, day, checks };
}

export async function healthResponse(
  request: Request,
  env: { DB: D1Database; HEALTH_LIMIT: RateLimit },
  cache: Cache,
) {
  if (request.method !== 'GET' || request.url !== url) return new Response('Not found', { status: 404 });
  const cached = await cache.match(url);
  if (cached) return cached;
  // All callers share one key per Cloudflare location. A burst on a cold
  // cache cannot turn a read-only status check into unlimited D1 queries.
  if (!(await env.HEALTH_LIMIT.limit({ key: 'job-health' })).success)
    return new Response(null, { status: 429, headers: { 'Retry-After': '60' } });
  const report = await jobHealth(env.DB);
  const response = Response.json(report, {
    status: report.ok ? 200 : 503,
    headers: { 'Cache-Control': 'public, max-age=120' },
  });
  await cache.put(url, response.clone());
  return response;
}
