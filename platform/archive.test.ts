import { adminRequest } from './review/admin';
import { readFile } from 'node:fs/promises';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Miniflare } from 'miniflare';
import { archiveDocument, cleanupArchives, readArchive } from './archive';
import { consumeSourceChecks, scheduleSourceChecks, sourceURL } from './jobs';

const sourceId = 'a'.repeat(64);
const document = (text = 'official document') => new Response(text, { headers: { 'Content-Type': 'text/plain' } });

describe('bounded R2 archive with real D1 and R2 bindings', () => {
  let mf: Miniflare;
  let db: Awaited<ReturnType<Miniflare['getD1Database']>>;
  let bucket: Parameters<typeof archiveDocument>[1];
  beforeEach(async () => {
    mf = new Miniflare({ workers: [{ config: {
      name: 'archive-test', compatibilityDate: '2026-11-17',
      manifest: { mainModule: 'test.js', modules: { 'test.js': {
        type: 'esm', contents: 'export default { fetch() { return new Response("test"); } }',
      } } },
      env: { DB: { type: 'd1', id: 'test-db' }, ARCHIVE: { type: 'r2', name: 'test-archive' } },
    } }] });
    db = await mf.getD1Database('DB');
    const binding = await mf.getR2Bucket('ARCHIVE');
    // Observe/inject failures at the adapter boundary; Miniflare's binding is
    // a remote Proxy whose methods cannot be replaced with spies directly.
    bucket = {
      put: (key, bytes, options) => binding.put(key, bytes, options),
      get: key => binding.get(key),
      delete: key => binding.delete(key),
    };
    for (const name of ['0001_catalog.sql', '0002_archive.sql', '0003_source_jobs.sql', '0007_review_evidence.sql']) {
      const sql = await readFile(new URL(`./migrations/${name}`, import.meta.url), 'utf8');
      // D1 exec treats line breaks as statement boundaries. Flatten these
      // trusted migrations so multi-line CREATE TABLE/TRIGGER stays intact.
      await db.exec(sql.replace(/^\s*--.*$/gm, '').replaceAll('\n', ' '));
    }
    await db.prepare('INSERT INTO sources(id,url,hostname) VALUES (?,?,?)')
      .bind(sourceId, 'https://example.com/document', 'example.com').run();
  });
  afterEach(async () => { vi.unstubAllGlobals(); vi.restoreAllMocks(); await mf?.dispose(); });

  it('authenticates before archive access and compares only the two recorded snapshots under the read budget', async () => {
    const env = { DB: db, ARCHIVE: bucket };
    const html = (ratio: string) => new Response('<script>hidden</script><p>Ratio ' + ratio + '</p>', { headers: { 'Content-Type': 'text/html' } });
    const before = await archiveDocument(db, bucket, sourceId, html('1:10'));
    const after = await archiveDocument(db, bucket, sourceId, html('1:20'));
    await db.prepare("INSERT INTO review_items (id,source_id,kind,body,created_at) VALUES ('review-a',?,'source-change',?,datetime('now'))")
      .bind(sourceId, JSON.stringify({ previous: before.sha256, current: after.sha256 })).run();
    const allow = async () => ({ email: 'owner@example.test', subject: 'owner' });
    const request = (path: string) => new Request('https://wash.kokoda.fun' + path);
    const compare = request('/admin/reviews/review-a/compare');
    expect((await adminRequest(compare, env)).status).toBe(403);
    expect(await (await adminRequest(request('/admin'), env, allow)).text()).toContain('example.com/document');
    const reads = () => db.prepare("SELECT gets FROM archive_daily WHERE day=date('now')").first('gets');
    expect(await reads()).toBe(0);
    const response = await adminRequest(compare, env, allow);
    const content = await response.text();
    expect(content).toContain('− Ratio 1:10');
    expect(content).toContain('+ Ratio 1:20');
    expect(content).not.toContain('hidden');
    expect(response.headers.get('cache-control')).toContain('no-store');
    expect(await reads()).toBe(2);
    expect(await (await adminRequest(compare, env, allow)).text()).toBe(content);
    expect(await reads()).toBe(2);
    const download = await adminRequest(request('/admin/reviews/review-a/current'), env, allow);
    expect(download.headers.get('content-disposition')).toContain('attachment');
    expect(await download.text()).toBe(await html('1:20').text());
    await db.prepare('UPDATE archive_policy SET daily_gets=3').run();
    expect((await adminRequest(request('/admin/reviews/review-a/previous'), env, allow)).status).toBe(503);
    expect(await reads()).toBe(3);
  });

  async function delivery(runId = 'sources-2026-11-17', attempts = 1) {
    await db.prepare("INSERT OR IGNORE INTO audit_runs(id,started_at,state,kind,expected_count) VALUES (?,?,'running','sources',1)")
      .bind(runId, new Date().toISOString()).run();
    const message = { id: 'test-message', timestamp: new Date(), attempts, body: { runId, sourceId }, ack: vi.fn(), retry: vi.fn() };
    const batch = { queue: 'wash-guide-sources', messages: [message], metadata: { metrics: { backlogCount: 0, backlogBytes: 0 } }, ackAll: vi.fn(), retryAll: vi.fn() };
    const env = { DB: db, ARCHIVE: bucket, SOURCE_QUEUE: { sendBatch: vi.fn() } };
    return { message, run: () => consumeSourceChecks(batch, env) };
  }

  it('stores once and serves the original bytes, with no R2 HEAD/list on a duplicate', async () => {
    const put = vi.spyOn(bucket, 'put');
    const result = await archiveDocument(db, bucket, sourceId, document());
    expect(result.deduplicated).toBe(false);
    expect((await archiveDocument(db, bucket, sourceId, document())).deduplicated).toBe(true);
    expect(put).toHaveBeenCalledTimes(1);
    expect(await (await readArchive(db, bucket, result.key))?.text()).toBe('official document');
    expect(await db.prepare('SELECT puts,gets FROM archive_daily').first()).toMatchObject({ puts: 1, gets: 1 });
  });

  it('reserves before concurrent writes and cannot race past the daily limit', async () => {
    await db.prepare('UPDATE archive_policy SET daily_puts=2').run();
    const put = vi.spyOn(bucket, 'put');
    const outcomes = await Promise.allSettled(Array.from({ length: 8 }, (_, i) => archiveDocument(db, bucket, sourceId, document(`v${i}`))));
    expect(outcomes.filter(r => r.status === 'fulfilled')).toHaveLength(2);
    expect(put).toHaveBeenCalledTimes(2);
    expect(await db.prepare('SELECT puts FROM archive_daily').first('puts')).toBe(2);
  });

  it('deduplicates concurrent deliveries, then a later delivery sees the completed object', async () => {
    const put = vi.spyOn(bucket, 'put');
    await Promise.allSettled(Array.from({ length: 6 }, () => archiveDocument(db, bucket, sourceId, document())));
    expect(put).toHaveBeenCalledTimes(1);
    expect((await archiveDocument(db, bucket, sourceId, document())).deduplicated).toBe(true);
  });

  it('counts failed PUTs and stops after three attempts without releasing uncertain bytes', async () => {
    const put = vi.spyOn(bucket, 'put').mockRejectedValue(new Error('network interrupted'));
    for (let i = 0; i < 4; i++) await expect(archiveDocument(db, bucket, sourceId, document('abc'))).rejects.toThrow();
    expect(put).toHaveBeenCalledTimes(3);
    expect(await db.prepare('SELECT puts FROM archive_daily').first('puts')).toBe(3);
    expect(await db.prepare('SELECT reserved_bytes FROM archive_storage').first('reserved_bytes')).toBe(3);
  });

  it('blocks reads at the internal limit and counts unsuccessful R2 reads', async () => {
    const stored = await archiveDocument(db, bucket, sourceId, document());
    await db.prepare('UPDATE archive_policy SET daily_gets=1').run();
    const get = vi.spyOn(bucket, 'get').mockRejectedValue(new Error('network interrupted'));
    await expect(readArchive(db, bucket, stored.key)).rejects.toThrow('network interrupted');
    await expect(readArchive(db, bucket, stored.key)).rejects.toThrow('archive_read_unavailable');
    expect(get).toHaveBeenCalledTimes(1);
  });

  it('fails closed when policy is absent; a fresh caller does not reset budgets', async () => {
    await db.prepare('UPDATE archive_policy SET daily_puts=1').run();
    await archiveDocument(db, bucket, sourceId, document());
    const freshDb = await mf.getD1Database('DB');
    await expect(archiveDocument(freshDb, bucket, sourceId, document('second'))).rejects.toThrow('archive_write_limit');
    await db.prepare('DELETE FROM archive_policy').run();
    const put = vi.spyOn(bucket, 'put');
    await expect(archiveDocument(db, bucket, sourceId, document('third'))).rejects.toThrow('archive_disabled');
    expect(put).not.toHaveBeenCalled();
  });

  it('rejects oversized streamed bodies even without an honest Content-Length', async () => {
    const put = vi.spyOn(bucket, 'put');
    const response = new Response(new ReadableStream({ start(c) { c.enqueue(new Uint8Array(5_000_001)); c.close(); } }),
      { headers: { 'Content-Type': 'application/pdf', 'Content-Length': '1' } });
    await expect(archiveDocument(db, bucket, sourceId, response)).rejects.toThrow('document_too_large');
    expect(put).not.toHaveBeenCalled();
    expect(await db.prepare('SELECT reserved_bytes FROM archive_storage').first('reserved_bytes')).toBe(0);
  });

  it('stops at the storage cap, and releases capacity only after successful deletion', async () => {
    await db.prepare('UPDATE archive_policy SET max_bytes=3').run();
    const saved = await archiveDocument(db, bucket, sourceId, document('abc'));
    await expect(archiveDocument(db, bucket, sourceId, document('d'))).rejects.toThrow('archive_storage_limit');
    await db.prepare('UPDATE archive_objects SET created_at=1,expires_at=2').run();
    const remove = vi.spyOn(bucket, 'delete').mockRejectedValueOnce(new Error('delete failed'));
    await expect(cleanupArchives(db, bucket)).rejects.toThrow('delete failed');
    expect(await db.prepare('SELECT reserved_bytes FROM archive_storage').first('reserved_bytes')).toBe(3);
    expect(await cleanupArchives(db, bucket)).toBe(1);
    expect(remove).toHaveBeenCalledTimes(2);
    expect(await bucket.get(saved.key)).toBeNull();
    expect(await db.prepare('SELECT reserved_bytes FROM archive_storage').first('reserved_bytes')).toBe(0);
    await expect(archiveDocument(db, bucket, sourceId, document('d'))).resolves.toMatchObject({ bytes: 1 });
  });

  it('limits the producer to 50 sources and one persisted run per UTC day', async () => {
    await db.batch(Array.from({ length: 60 }, (_, i) => db.prepare('INSERT INTO sources(id,url,hostname) VALUES (?,?,?)')
      .bind(i.toString(16).padStart(64, '0'), `https://example.com/${i}`, 'example.com')));
    const sendBatch = vi.fn().mockResolvedValue(undefined);
    const env = { DB: db, ARCHIVE: bucket, SOURCE_QUEUE: { sendBatch } };
    await Promise.all([scheduleSourceChecks(env), scheduleSourceChecks(env)]);
    await scheduleSourceChecks(env);
    expect(sendBatch).toHaveBeenCalledTimes(1);
    expect(sendBatch.mock.calls[0][0]).toHaveLength(50);
    expect(await db.prepare('SELECT expected_count FROM audit_runs').first('expected_count')).toBe(50);
  });

  it('does not automatically replay an ambiguous queue send', async () => {
    const sendBatch = vi.fn().mockRejectedValue(new Error('send interrupted'));
    const env = { DB: db, ARCHIVE: bucket, SOURCE_QUEUE: { sendBatch } };
    await expect(scheduleSourceChecks(env)).rejects.toThrow('send interrupted');
    await scheduleSourceChecks(env);
    expect(sendBatch).toHaveBeenCalledTimes(1);
    expect(await db.prepare('SELECT state FROM audit_runs').first('state')).toBe('failed');
  });

  it('rejects private literals, credentials and non-HTTPS redirect targets', () => {
    for (const url of ['http://example.com/a', 'https://127.1/a', 'https://169.254.169.254/', 'https://[::1]/', 'https://user:pass@example.com/', 'https://foo.internal/', 'https://example.com:8000/']) {
      expect(() => sourceURL(url)).toThrow();
    }
    expect(sourceURL('https://example.com/a.pdf').hostname).toBe('example.com');
  });

  it('consumes a source task once and creates a review when the source changes', async () => {
    const fetch = vi.fn().mockImplementation(async () => document('version one'));
    vi.stubGlobal('fetch', fetch);
    const first = await delivery();
    await first.run();
    await first.run();
    expect(first.message.ack).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(await db.prepare('SELECT state FROM audit_runs').first('state')).toBe('completed');
    expect(await db.prepare('SELECT count(*) AS n FROM review_items').first('n')).toBe(0);
    fetch.mockImplementation(async () => document('version two'));
    await (await delivery('sources-2026-11-18')).run();
    expect(await db.prepare('SELECT kind,state FROM review_items').first()).toMatchObject({ kind: 'source-change', state: 'pending' });
    expect(await db.prepare('SELECT count(*) AS n FROM archive_objects').first('n')).toBe(2);
  });

  it('does not retry a document rejected by the archive budget', async () => {
    await db.prepare('UPDATE archive_policy SET enabled=0').run();
    vi.stubGlobal('fetch', vi.fn().mockImplementation(async () => document()));
    const put = vi.spyOn(bucket, 'put');
    const item = await delivery();
    await item.run();
    expect(item.message.ack).toHaveBeenCalledOnce();
    expect(item.message.retry).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
    expect(await db.prepare('SELECT outcome FROM source_checks').first('outcome')).toBe('archive-skipped');
  });

  it('finishes an unchanged source without reading or writing R2', async () => {
    await db.prepare('UPDATE sources SET etag=? WHERE id=?').bind('"source-version"', sourceId).run();
    const fetch = vi.fn().mockImplementation(async () => new Response(null, { status: 304 }));
    vi.stubGlobal('fetch', fetch);
    const put = vi.spyOn(bucket, 'put');
    await (await delivery()).run();
    expect(fetch.mock.calls[0][1].headers.get('If-None-Match')).toBe('"source-version"');
    expect(put).not.toHaveBeenCalled();
    expect(await db.prepare('SELECT outcome FROM source_checks').first('outcome')).toBe('unchanged');
  });

  it('retries transient source errors twice, then persists the failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation(async () => new Response('unavailable', { status: 503 })));
    for (let attempts = 1; attempts <= 3; attempts++) {
      const item = await delivery('sources-2026-11-17', attempts);
      await item.run();
      if (attempts < 3) expect(item.message.retry).toHaveBeenCalledWith({ delaySeconds: 300 });
      else { expect(item.message.ack).toHaveBeenCalledOnce(); expect(item.message.retry).not.toHaveBeenCalled(); }
    }
    expect(await db.prepare('SELECT outcome FROM source_checks').first('outcome')).toBe('failed');
  });
});
