import type { AiSearchInstance, D1Database, Blob as WorkerBlob } from '@cloudflare/workers-types';
import { ArchiveUnavailable, readArchive } from './archive';
import { uploadCapacity } from './search-budget';

declare const Blob: typeof WorkerBlob;

export async function syncArchivedSds(
  db: D1Database,
  bucket: Parameters<typeof readArchive>[1],
  items: Pick<AiSearchInstance['items'], 'upload'>,
) {
  const now = Date.now();
  // A change of source, catalog membership or review state withdraws the
  // citation immediately in the API; retirement also removes the provider item.
  await db
    .prepare(
      `DELETE FROM search_archived_sds WHERE rowid IN (
    SELECT d.rowid FROM search_archived_sds d WHERE NOT EXISTS (
      SELECT 1 FROM published_remote_sds p WHERE (p.source_id,p.digest)=(d.source_id,d.digest)) LIMIT 2)`,
    )
    .run();
  const row = await db
    .prepare(
      `SELECT p.source_id,p.digest,a.object_key,a.byte_length
    FROM archive_objects a JOIN published_remote_sds p ON (p.source_id,p.digest)=(a.source_id,a.content_sha256)
    LEFT JOIN search_archived_sds d ON (d.source_id,d.digest)=(p.source_id,p.digest)
    WHERE a.state='stored' AND a.content_type='application/pdf' AND a.expires_at>? AND a.byte_length<=4000000
      AND (d.source_id IS NULL OR (d.submitted=0 AND d.attempts<3 AND d.retry_after<=?))
    ORDER BY a.byte_length,p.source_id LIMIT 1`,
    )
    .bind(now, now)
    .first<{ source_id: string; digest: string; object_key: string; byte_length: number }>();
  if (!row || !(await uploadCapacity(db, row.byte_length, false))) return false;
  const claim = await db
    .prepare(
      `INSERT INTO search_archived_sds(source_id,digest,upload_key,attempts,retry_after)
    VALUES(?,?,lower(hex(randomblob(16)))||'-external.pdf',1,?)
    ON CONFLICT(source_id,digest) DO UPDATE SET attempts=attempts+1,retry_after=excluded.retry_after
    WHERE submitted=0 AND attempts<3 AND retry_after<=? RETURNING upload_key`,
    )
    .bind(row.source_id, row.digest, now + 3600000, now)
    .first<string>('upload_key');
  if (!claim) return false;
  const defer = () =>
    db
      .prepare('UPDATE search_archived_sds SET attempts=attempts-1 WHERE upload_key=? AND retry_after=?')
      .bind(claim, now + 3600000)
      .run();
  try {
    const object = await readArchive(db, bucket, row.object_key);
    if (!object || object.size !== row.byte_length) return true;
    const bytes = await object.arrayBuffer();
    if (bytes.byteLength !== row.byte_length || new TextDecoder().decode(bytes.slice(0, 5)) !== '%PDF-')
      return true;
    const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), (b) =>
      b.toString(16).padStart(2, '0'),
    ).join('');
    if (digest !== row.digest) return true;
    if (!(await uploadCapacity(db, bytes.byteLength, true))) {
      await defer();
      return true;
    }
    await items.upload(claim, new Blob([bytes], { type: 'application/pdf' }));
    await db.prepare('UPDATE search_archived_sds SET submitted=1 WHERE upload_key=?').bind(claim).run();
  } catch (error) {
    if (error instanceof ArchiveUnavailable) await defer();
    else throw error; // Retry within the persisted attempt and byte limits.
  }
  return true;
}
