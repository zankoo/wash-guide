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

// Commit a new index worklist together with its version marker. Replayed cron
// events pick up unfinished rows, including uploads interrupted mid-request.
async function prepareWorklist(db: D1Database, version: string) {
  if (await db.prepare('SELECT 1 FROM search_index_versions WHERE version_id=?').bind(version).first()) return;
  const enqueue = (key: string, predicate: string) => db.prepare(`INSERT INTO search_documents(item_key,version_id,product_id,state)
    SELECT ${key},version_id,id,'pending' FROM products WHERE version_id=? ${predicate}
    ON CONFLICT(item_key) DO UPDATE SET version_id=excluded.version_id, product_id=excluded.product_id,
    state='pending',attempts=0,updated_at=0 WHERE search_documents.version_id!=excluded.version_id`).bind(version);
  await db.batch([
    enqueue("'product-'||id||'.md'", ''),
    enqueue("'sds-'||substr(json_extract(document,'$.sds.url'),6)", "AND json_extract(document,'$.sds.hosting')='local'"),
    db.prepare('DELETE FROM search_index_versions'),
    db.prepare('INSERT INTO search_index_versions VALUES (?)').bind(version),
  ]);
}

export async function syncSearchIndex(db: D1Database, search: { items: Pick<AiSearchInstance['items'], 'upload'> }) {
  const version = await db.prepare('SELECT version_id FROM catalog_publication WHERE singleton=1').first<string>('version_id');
  if (!version) return;
  await prepareWorklist(db, version);
  const available = await db.prepare(`SELECT COALESCE(MAX(CASE WHEN day=date('now') THEN uploads END),0)<100
    AND SUM(bytes)<24000000 AS ok FROM search_usage WHERE day>=date('now','start of month')`).first<{ok:number|null}>();
  if (available?.ok === 0) return;
  const now = Date.now();
  const { results } = await db.prepare(`SELECT s.item_key,s.indexed_key,p.document FROM search_documents s JOIN products p
    ON p.id=s.product_id AND p.version_id=s.version_id WHERE s.version_id=? AND s.attempts<3
    AND (s.state='pending' OR (s.state='uploading' AND s.updated_at<?))
    ORDER BY s.updated_at,s.product_id,s.item_key LIMIT 6`).bind(version, now-900000).all<{item_key:string; indexed_key:string|null; document:string}>();
  for (const row of results) {
    const p: Product = JSON.parse(row.document);
    const key = row.item_key;
    const claim = await db.prepare(`UPDATE search_documents SET state='uploading', attempts=attempts+1,updated_at=?
      WHERE item_key=? AND version_id=? AND attempts<3 AND (state='pending' OR (state='uploading' AND updated_at<?)) RETURNING item_key`)
      .bind(now,key,version,now-900000).first();
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
      const digest = await crypto.subtle.digest('SHA-256', typeof content === 'string' ? new TextEncoder().encode(content) : await content.arrayBuffer());
      const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2,'0')).join('');
      const indexedKey = hash + '-' + key;
      if (row.indexed_key !== indexedKey) {
        await db.prepare("INSERT OR IGNORE INTO search_usage(day) VALUES(date('now'))").run();
        const reserved = await db.prepare(`UPDATE search_usage SET bytes=bytes+?,uploads=uploads+1 WHERE day=date('now')
          AND uploads<100 AND bytes+?<=4000000 AND
          (SELECT SUM(bytes) FROM search_usage WHERE day>=date('now','start of month'))+?<=24000000 RETURNING uploads`)
          .bind(size,size,size).first();
        if (!reserved) {
          await defer(db,key,version,now);
          return;
        }
        await search.items.upload(indexedKey,content);
      }
      await db.prepare("UPDATE search_documents SET state='submitted',indexed_key=? WHERE item_key=? AND version_id=? AND updated_at=?")
        .bind(indexedKey,key,version,now).run();
    } catch {
      await db.prepare("UPDATE search_documents SET state=CASE WHEN attempts>=3 THEN 'error' ELSE 'pending' END WHERE item_key=? AND version_id=? AND updated_at=?").bind(key,version,now).run();
    }
  }
}

async function defer(db: D1Database, key: string, version: string, stamp: number) {
  await db.prepare("UPDATE search_documents SET state='pending',attempts=attempts-1 WHERE item_key=? AND version_id=? AND updated_at=?")
    .bind(key,version,stamp).run();
}
