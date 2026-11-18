import type { AiSearchInstance, Blob as WorkerBlob, D1Database } from '@cloudflare/workers-types';
import type { Product } from '../src/data/types';
import { cautionTexts } from '../src/data/cautions';
import { BRAND } from '../src/data/taxonomy';

declare const Blob: typeof WorkerBlob;

export function searchDocument(p: Product) {
  return [
    BRAND[p.brand] + ' ' + p.name, p.type, '适用材质 ' + p.materials,
    ...p.dilutions.map(row => row.join(' · ')), ...p.steps, ...cautionTexts(p.cautions), ...p.notes,
    ...(p.ph?.evidence ?? []).flatMap(e => e.kind === 'statement' ? [e.text] : []),
    '产品原文 ' + p.url,
  ].join('\n');
}

type IndexItems = Pick<AiSearchInstance['items'], 'upload' | 'list' | 'delete'>;

async function retireDocuments(db: D1Database, items: IndexItems, now: number) {
  const { results } = await db.prepare(`UPDATE search_retirements SET retry_after=? WHERE item_key IN
    (SELECT item_key FROM search_retirements WHERE retry_after<=? ORDER BY retry_after,item_key LIMIT 2)
    RETURNING item_key`).bind(now+3600000,now).all<{item_key:string}>();
  for (const {item_key: key} of results) {
    const matches = await items.list({key,source:'builtin'});
    const item = matches.result.find(record => record.key === key);
    if (!item) {
      await db.prepare('DELETE FROM search_retirements WHERE item_key=?').bind(key).run();
    } else if (item.next_action !== 'DELETE') {
      await items.delete(item.id);
    }
  }
}

export async function syncSearchIndex(db: D1Database, search: {items: IndexItems}) {
  const version = await db.prepare('SELECT version_id FROM catalog_publication WHERE singleton=1').first<string>('version_id');
  if (!version) return;
  // On a fresh installation the catalog may predate the publication trigger.
  await db.prepare(`UPDATE catalog_publication SET version_id=version_id WHERE version_id=?1
    AND NOT EXISTS (SELECT 1 FROM search_index_versions WHERE version_id=?1)`).bind(version).run();
  const now = Date.now();
  await retireDocuments(db,search.items,now);
  const available = await db.prepare(`SELECT COALESCE(MAX(CASE WHEN day=date('now') THEN uploads END),0)<100
    AND SUM(bytes)<24000000 AS ok FROM search_usage WHERE day>=date('now','start of month')`).first<{ok:number|null}>();
  if (available?.ok === 0) return;
  const { results } = await db.prepare(`SELECT s.item_key,p.document FROM search_documents s JOIN products p
    ON p.id=s.product_id AND p.version_id=s.version_id WHERE s.version_id=? AND s.retry_after<=? AND s.attempts<3
    AND (s.state='pending' OR (s.state='uploading' AND s.updated_at<?))
    ORDER BY s.updated_at,s.product_id,s.item_key LIMIT 6`).bind(version,now,now-900000).all<{item_key:string; document:string}>();
  for (const row of results) {
    const p: Product = JSON.parse(row.document);
    const key = row.item_key;
    const claim = await db.prepare(`UPDATE search_documents SET state='uploading', attempts=attempts+1,updated_at=?,
      upload_key=coalesce(upload_key,lower(hex(randomblob(16)))||'-'||item_key)
      WHERE item_key=? AND version_id=? AND attempts<3 AND (state='pending' OR (state='uploading' AND updated_at<?)) RETURNING upload_key`)
      .bind(now,key,version,now-900000).first<{upload_key:string}>();
    if (!claim) continue;
    try {
      let content: string | WorkerBlob;
      if (key.startsWith('sds-')) {
        if (!p.sds || !/^\/sds\/[A-Za-z0-9_-]+\.pdf$/.test(p.sds.url)) throw Error('Unexpected catalog PDF path');
        const response = await fetch('https://wash.kokoda.fun'+p.sds.url, {redirect:'error',signal:AbortSignal.timeout(10000)});
        const length = Number(response.headers.get('Content-Length'));
        if (!response.ok || !Number.isSafeInteger(length) || length<1 || length>4_000_000 || !response.headers.get('content-type')?.includes('pdf')) {
          await response.body?.cancel();
          throw Error('Invalid published PDF');
        }
        const blob = new Blob([await response.arrayBuffer()], {type: 'application/pdf'});
        if (blob.size !== length) throw Error('Incomplete published PDF');
        content = blob;
      } else content = searchDocument(p);
      const size = typeof content === 'string' ? new TextEncoder().encode(content).length : content.size;
      if (typeof content !== 'string' && p.sds?.sha256 &&
          await sha256(content) !== p.sds.sha256.toLowerCase()) {
        // Static asset deployment may lag publication. Retry in an hour without
        // consuming an AI upload or exhausting the transient failure attempts.
        await defer(db,claim.upload_key,now,now+3600000);
        continue;
      }
      await db.prepare("INSERT OR IGNORE INTO search_usage(day) VALUES(date('now'))").run();
      const reserved = await db.prepare(`UPDATE search_usage SET bytes=bytes+?,uploads=uploads+1 WHERE day=date('now')
        AND uploads<100 AND bytes+?<=4000000 AND
        (SELECT SUM(bytes) FROM search_usage WHERE day>=date('now','start of month'))+?<=24000000 RETURNING uploads`)
        .bind(size,size,size).first();
      if (!reserved) {
        await defer(db,claim.upload_key,now);
        return;
      }
      await search.items.upload(claim.upload_key,content);
      await db.prepare("UPDATE search_documents SET state='submitted',indexed_key=?,upload_key=NULL WHERE upload_key=? AND updated_at=? AND state='uploading'")
        .bind(claim.upload_key,claim.upload_key,now).run();
    } catch {
      await db.prepare("UPDATE search_documents SET state=CASE WHEN attempts>=3 THEN 'error' ELSE 'pending' END WHERE upload_key=? AND updated_at=? AND state='uploading'").bind(claim.upload_key,now).run();
    }
  }
}

async function sha256(blob: WorkerBlob) {
  const digest = await crypto.subtle.digest('SHA-256', await blob.arrayBuffer());
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2,'0')).join('');
}

async function defer(db: D1Database, uploadKey: string, stamp: number, retryAfter = 0) {
  await db.prepare("UPDATE search_documents SET state='pending',attempts=attempts-1,retry_after=? WHERE upload_key=? AND updated_at=? AND state='uploading'")
    .bind(retryAfter,uploadKey,stamp).run();
}
