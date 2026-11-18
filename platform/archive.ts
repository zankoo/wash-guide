import type { D1Database, R2ObjectBody } from '@cloudflare/workers-types';

export const ARCHIVE_LIMITS = Object.freeze({
  objectBytes: 5_000_000,
  storageBytes: 1_000_000_000,
  dailyPuts: 100,
  dailyGets: 1_000,
  retentionDays: 90,
  attempts: 3,
  cleanupBatch: 100,
});

type Database = Pick<D1Database, 'prepare' | 'batch'>;
// Restrict the adapter to the operations actually used. This also allows the
// Miniflare Node bridge without pretending its streams are workerd streams.
type Bucket = {
  put(key: string, bytes: Uint8Array<ArrayBuffer>, options: {
    httpMetadata: { contentType: string }; customMetadata: Record<string, string>; storageClass: 'Standard';
  }): Promise<{ key: string } | null>;
  get(key: string): Promise<Pick<R2ObjectBody, 'key' | 'size' | 'text' | 'arrayBuffer' | 'httpMetadata'> | null>;
  delete(key: string): Promise<void>;
};
type ArchiveRow = {
  object_key: string;
  state: 'uploading' | 'stored' | 'failed' | 'deleting';
  expires_at: number;
  attempts: number;
};

export class ArchiveUnavailable extends Error {}

/** Bounded buffering is deliberate: deduplication needs the hash before PUT. */
async function readDocument(response: Response): Promise<Uint8Array<ArrayBuffer>> {
  if (!response.ok || !response.body) throw new ArchiveUnavailable('invalid_document_response');
  const advertised = Number(response.headers.get('content-length') ?? 0);
  if (advertised > ARCHIVE_LIMITS.objectBytes) {
    await response.body.cancel();
    throw new ArchiveUnavailable('document_too_large');
  }
  const reader = response.body.getReader();
  // Fixed capacity also bounds overhead if a stream yields many tiny chunks.
  const buffer = new Uint8Array(ARCHIVE_LIMITS.objectBytes);
  let bytes = 0;
  try {
    for (;;) {
      const part = await reader.read();
      if (part.done) break;
      if (bytes + part.value.byteLength > ARCHIVE_LIMITS.objectBytes) {
        await reader.cancel();
        throw new ArchiveUnavailable('document_too_large');
      }
      buffer.set(part.value, bytes);
      bytes += part.value.byteLength;
    }
  } finally {
    reader.releaseLock();
  }
  if (!bytes) throw new ArchiveUnavailable('empty_document');
  return buffer.slice(0, bytes);
}

/** Internal entry only. sourceId must refer to an already curated D1 source.
 * No URL fetching, multipart, public listing, or automatic retry loop here. */
export async function archiveDocument(db: Database, bucket: Bucket, sourceId: string, response: Response) {
  if (!/^[a-f0-9]{64}$/.test(sourceId)) throw new ArchiveUnavailable('invalid_source');
  const contentType = (response.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
  if (!['application/pdf', 'text/html', 'text/plain'].includes(contentType)) {
    await response.body?.cancel();
    throw new ArchiveUnavailable('unsupported_document_type');
  }
  const bytes = await readDocument(response);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const sha = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
  const key = `snapshots/${sourceId}/${sha}`;
  const now = Date.now();
  const expiresAt = now + ARCHIVE_LIMITS.retentionDays * 86_400_000;
  // INSERT ... WHERE NOT EXISTS skips both the PUT and reservation triggers for
  // duplicates. D1 serializes writes, so competing callers cannot both own it.
  let owned = await db.prepare(`INSERT INTO archive_objects
    (object_key,source_id,content_sha256,byte_length,content_type,state,attempts,created_at,expires_at)
    SELECT ?,?,?,?,?,'uploading',1,?,? WHERE NOT EXISTS
    (SELECT 1 FROM archive_objects WHERE object_key=?) RETURNING object_key`)
    .bind(key, sourceId, sha, bytes.byteLength, contentType, now, expiresAt, key)
    .first<{ object_key: string }>();
  if (!owned) {
    const existing = await db.prepare('SELECT object_key,state,expires_at,attempts FROM archive_objects WHERE object_key=?')
      .bind(key).first<ArchiveRow>();
    if (existing?.state === 'stored' && existing.expires_at > now) {
      return { key, sha256: sha, bytes: bytes.byteLength, deduplicated: true };
    }
    // A crashed upload remains reserved. Never guess whether an unknown write
    // happened or reset the reservation on a process restart.
    if (!existing || existing.state !== 'failed' || existing.expires_at <= now || existing.attempts >= ARCHIVE_LIMITS.attempts) {
      throw new ArchiveUnavailable('archive_busy_expired_or_exhausted');
    }
    owned = await db.prepare(`UPDATE archive_objects SET attempts=attempts+1,state='uploading'
      WHERE object_key=? AND state='failed' AND attempts<3 RETURNING object_key`).bind(key).first();
    if (!owned) throw new ArchiveUnavailable('archive_busy');
  }
  try {
    const object = await bucket.put(key, bytes, {
      httpMetadata: { contentType },
      customMetadata: { sha256: sha, sourceId },
      storageClass: 'Standard',
    });
    if (!object) throw new ArchiveUnavailable('archive_put_failed');
    await db.prepare("UPDATE archive_objects SET state='stored' WHERE object_key=? AND state='uploading'")
      .bind(key).run();
    return { key, sha256: sha, bytes: bytes.byteLength, deduplicated: false };
  } catch (error) {
    // Keep the byte reservation even if the PUT's outcome was ambiguous.
    await db.prepare("UPDATE archive_objects SET state='failed' WHERE object_key=? AND state='uploading'")
      .bind(key).run();
    throw error;
  }
}

export async function readArchive(db: Database, bucket: Bucket, key: string) {
  if (!/^snapshots\/[a-f0-9]{64}\/[a-f0-9]{64}$/.test(key)) throw new ArchiveUnavailable('invalid_archive_key');
  // The daily counter and metadata lookup are one transaction. An absent,
  // disabled, exhausted, or expired archive causes NO R2 read.
  const results = await db.batch([
    db.prepare("INSERT OR IGNORE INTO archive_daily(day) VALUES (date('now'))"),
    db.prepare(`UPDATE archive_daily SET gets=gets+1 WHERE day=date('now')
      AND gets < (SELECT daily_gets FROM archive_policy WHERE singleton=1 AND enabled=1)
      AND EXISTS (SELECT 1 FROM archive_objects WHERE object_key=? AND state='stored' AND expires_at>?)
      RETURNING gets`).bind(key, Date.now()),
  ]);
  if (!results[1].results.length) throw new ArchiveUnavailable('archive_read_unavailable');
  return bucket.get(key);
}

/** Bounded cleanup. Storage is released only AFTER delete.
 * The bucket lifecycle is a second cleanup layer, not evidence of deletion. */
export async function cleanupArchives(db: Database, bucket: Bucket) {
  const { results } = await db.prepare(`SELECT object_key FROM archive_objects
    WHERE expires_at<=? AND state!='deleting' ORDER BY expires_at LIMIT ?`)
    .bind(Date.now(), ARCHIVE_LIMITS.cleanupBatch).all<{ object_key: string }>();
  let removed = 0;
  for (const row of results) {
    // Claim one at a time: a failed deletion must not strand the rest of a batch.
    const claim = await db.prepare(`UPDATE archive_objects SET state='deleting'
      WHERE object_key=? AND expires_at<=? AND state!='deleting' RETURNING object_key`)
      .bind(row.object_key, Date.now()).first();
    if (!claim) continue;
    try {
      await bucket.delete(row.object_key);
      await db.prepare("DELETE FROM archive_objects WHERE object_key=? AND state='deleting'").bind(row.object_key).run();
      removed++;
    } catch (error) {
      await db.prepare("UPDATE archive_objects SET state='failed' WHERE object_key=? AND state='deleting'").bind(row.object_key).run();
      throw error;
    }
  }
  await db.prepare("DELETE FROM archive_daily WHERE day < date('now','-120 days')").run();
  return removed;
}
