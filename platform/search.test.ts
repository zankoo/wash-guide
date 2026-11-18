import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { Miniflare } from 'miniflare';
import { PRODUCTS } from '../src/data';
import { archiveDocument } from './archive';
import { syncSearchIndex } from './search-index';
import api from './api/worker';

let runtime: Miniflare;
let db: Awaited<ReturnType<Miniflare['getD1Database']>>;
const product = PRODUCTS.find(p => p.id === 'C-spotless')!;
const upload = vi.fn();
const items = {upload,list:vi.fn(),delete:vi.fn()};
const search = vi.fn();
const limit = vi.fn();
const query = () => new Request('https://wash.kokoda.fun/api/platform/search', { method: 'POST', body: '如何去除车漆上的水斑' });
const bindings = () => ({ DB: db, SEARCH: { search }, SEARCH_LIMIT: { limit } });

beforeEach(async () => {
  vi.resetAllMocks();
  limit.mockResolvedValue({ success: true });
  runtime = new Miniflare({ workers: [{ config: {
    name: 'search-test', compatibilityDate: '2026-11-17',
    manifest: { mainModule: 'worker.js', modules: { 'worker.js': { type: 'esm', contents: 'export default {}' } } },
    env: { DB: { type: 'd1', id: 'search-test' }, ARCHIVE: {type:'r2',name:'local-sds'} },
  } }] });
  db = await runtime.getD1Database('DB');
  for (const name of ['0001_catalog','0002_archive','0004_search','0005_search_publications','0011_archived_sds_search']) {
    const sql = await readFile(new URL('./migrations/' + name + '.sql', import.meta.url), 'utf8');
    await db.exec(sql.replace(/^\s*--.*$/gm, '').replaceAll('\n', ' '));
  }
  await db.batch([
    db.prepare("INSERT INTO brands VALUES (?,?)").bind(product.brand, 'CarPro'),
    db.prepare("INSERT INTO categories VALUES (?,?,1)").bind(product.category, 'test'),
    db.prepare("INSERT INTO catalog_versions(id,source_commit,content_sha256,state,product_count,flow_count) VALUES ('v1','test','test','published',1,0)"),
    db.prepare("INSERT INTO catalog_publication(singleton,version_id) VALUES (1,'v1')"),
    db.prepare("INSERT INTO products VALUES ('v1',?,?,?,?,?,?,1,?)")
      .bind(product.id,product.brand,product.category,product.name,product.type,product.url,JSON.stringify({...product,sds:undefined})),
  ]);
});
afterEach(async () => { vi.unstubAllGlobals(); await runtime?.dispose(); });

it('indexes a published product once and resolves search citations against D1', async () => {
  await syncSearchIndex(db, {items});
  await syncSearchIndex(db, {items});
  expect(upload).toHaveBeenCalledTimes(1);
  const [key, document] = upload.mock.calls[0];
  expect(document).toContain(product.name);
  search.mockResolvedValue({chunks:[
    {item:{key:'withdrawn.md'},text:'removed'},
    {item:{key},text:'相关段落'},
    {item:{key},text:'重复来源'},
  ]});
  const response = await api.fetch(query(),bindings());
  expect(response.status).toBe(200);
  expect((await response.json()).results).toEqual([{
    title:product.name,productId:product.id,kind:'产品资料',href:product.url,excerpt:'相关段落',
  }]);
});

it('reserves the last daily lookup just once across concurrent requests', async () => {
  await db.prepare("INSERT INTO search_usage(day,lookups) VALUES(date('now'),24)").run();
  search.mockResolvedValue({chunks:[]});
  const responses = await Promise.all(Array.from({length:5},()=>api.fetch(query(),bindings())));
  expect(responses.filter(response=>response.status===429)).toHaveLength(4);
  expect(search).toHaveBeenCalledTimes(1);
});

it('skips the provider when an upload would cross the monthly byte budget', async () => {
  await db.prepare("INSERT INTO search_usage(day,bytes) VALUES(date('now'),23999999)").run();
  await syncSearchIndex(db, {items});
  expect(upload).not.toHaveBeenCalled();
  expect(await db.prepare('SELECT state,attempts FROM search_documents').first()).toMatchObject({state:'pending',attempts:0});
});

async function publishRevision(document: Record<string, unknown> | null) {
  await db.prepare("INSERT INTO catalog_versions(id,source_commit,content_sha256,state,product_count,flow_count) VALUES ('v2','test','v2','published',?,0)")
    .bind(document ? 1 : 0).run();
  if (document) {
    await db.prepare("INSERT INTO products SELECT 'v2',id,brand_id,category_id,name,description,source_url,position,? FROM products WHERE version_id='v1'")
      .bind(JSON.stringify(document)).run();
  }
  await db.prepare("UPDATE catalog_publication SET version_id='v2'").run();
}

it('keeps unchanged searchable text visible across publication at the daily quota', async () => {
  await syncSearchIndex(db, {items});
  const [key] = upload.mock.calls[0];
  await db.prepare("UPDATE search_usage SET uploads=100").run();
  await publishRevision({...product, sds:undefined, sizes:'different packaging'});
  expect(await db.prepare('SELECT version_id,state,indexed_key FROM search_documents').first())
    .toEqual({version_id:'v2',state:'submitted',indexed_key:key});
  await syncSearchIndex(db, {items});
  expect(upload).toHaveBeenCalledTimes(1);
  expect(items.list).not.toHaveBeenCalled();
});

it.each([true,false])('retires old provider documents after replacement or withdrawal (replaced=%s)', async replaced => {
  await syncSearchIndex(db, {items});
  const [key] = upload.mock.calls[0];
  await publishRevision(replaced ? {...product,sds:undefined,notes:['updated']} : null);
  items.list.mockResolvedValue({result:[{id:'old-id',key,source_id:'builtin'}]});
  await syncSearchIndex(db, {items});
  expect(items.list).toHaveBeenCalledWith({key,source:'builtin'});
  expect(items.delete).toHaveBeenCalledWith('old-id');
  if (replaced) expect(upload.mock.calls[1][0]).not.toBe(key);
  await db.prepare('UPDATE search_retirements SET retry_after=0').run();
  items.list.mockResolvedValue({result:[]});
  await syncSearchIndex(db, {items});
  expect(await db.prepare('SELECT item_key FROM search_retirements').first()).toBeNull();
});

it('retries a mismatched SDS without charging an upload, then submits the matching revision', async () => {
  const bytes = 'verified PDF';
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const doc = {...product,sds:{url:'/sds/test.pdf',hosting:'local',sha256}};
  await db.prepare('UPDATE products SET document=?').bind(JSON.stringify(doc)).run();
  const pdf = (text: string) => new Response(text, {headers:{'Content-Type':'application/pdf','Content-Length':String(text.length)}});
  const fetchPdf = vi.fn().mockResolvedValueOnce(pdf('outdated PDF')).mockResolvedValueOnce(pdf(bytes));
  vi.stubGlobal('fetch',fetchPdf);
  await syncSearchIndex(db, {items});
  expect(upload).toHaveBeenCalledTimes(1);
  expect(await db.prepare("SELECT state,attempts FROM search_documents WHERE item_key='sds-test.pdf'").first())
    .toEqual({state:'pending',attempts:0});
  await syncSearchIndex(db, {items});
  expect(fetchPdf).toHaveBeenCalledTimes(1);
  await db.prepare('UPDATE search_documents SET retry_after=0').run();
  await syncSearchIndex(db, {items});
  expect(upload).toHaveBeenCalledTimes(2);
  expect(await upload.mock.calls[1][1].text()).toBe(bytes);
});

it('records an in-flight final upload after an unchanged product moves to another publication', async () => {
  // Defer the first tick so the next claim can exercise the third attempt.
  await db.prepare("INSERT INTO search_usage(day,uploads) VALUES(date('now'),100)").run();
  await syncSearchIndex(db, {items});
  await db.prepare("UPDATE search_usage SET uploads=0").run();
  await db.prepare('UPDATE search_documents SET attempts=2').run();
  upload.mockImplementationOnce(async () => {
    await publishRevision({...product,sds:undefined,sizes:'new packaging'});
  });
  await syncSearchIndex(db, {items});
  await syncSearchIndex(db, {items});
  expect(upload).toHaveBeenCalledTimes(1);
  expect(await db.prepare('SELECT state,attempts,indexed_key,version_id FROM search_documents').first())
    .toEqual({state:'submitted',attempts:3,indexed_key:upload.mock.calls[0][0],version_id:'v2'});
});

it('keeps an unchanged legacy SDS with no digest when the next version is published', async () => {
  const sheet = {url:'/sds/legacy.pdf',hosting:'local',version:'2025'};
  const record = {...product,sds:sheet};
  await db.prepare('UPDATE products SET document=?').bind(JSON.stringify(record)).run();
  vi.stubGlobal('fetch',vi.fn().mockResolvedValue(new Response('PDF',{headers:{
    'Content-Type':'application/pdf','Content-Length':'3',
  }})));
  await syncSearchIndex(db,{items});
  const read = () => db.prepare("SELECT indexed_key,state FROM search_documents WHERE item_key='sds-legacy.pdf'").first();
  const previous = await read();
  expect(previous).toMatchObject({state:'submitted'});
  await publishRevision({...record,sizes:'new packaging'});
  expect(await read()).toEqual(previous);
  await syncSearchIndex(db,{items});
  expect(upload).toHaveBeenCalledTimes(2);
});

it('indexes a shared archived remote SDS once and withdraws citations immediately for an unreviewed revision', async () => {
  const bucket = await runtime.getR2Bucket('ARCHIVE');
  const url='https://manufacturer.example/technical/sds.pdf';
  const source=createHash('sha256').update(url).digest('hex');
  const document=JSON.stringify({...product,sds:{url,hosting:'remote'}});
  await db.prepare('INSERT INTO sources(id,url,hostname) VALUES(?,?,?)').bind(source,url,'manufacturer.example').run();
  await db.prepare('UPDATE products SET document=?').bind(document).run();
  await db.prepare("INSERT INTO products SELECT version_id,'shared-product',brand_id,category_id,name,description,source_url,position,document FROM products").run();
  await db.prepare("INSERT INTO product_sources SELECT version_id,id,?,'sds' FROM products").bind(source).run();
  const snapshot=async (version:string) => {
    const response=new Response('%PDF-1.7\n'+version, {headers:{'Content-Type':'application/pdf'}});
    const stored=await archiveDocument(db,bucket,source,response);
    await db.prepare('UPDATE sources SET content_sha256=? WHERE id=?').bind(stored.sha256,source).run();
    return stored;
  };
  const first=await snapshot('initial');
  await db.prepare("INSERT INTO search_usage(day,bytes) VALUES(date('now'),4000000)").run();
  await syncSearchIndex(db,{items},bucket);
  expect((await db.prepare("SELECT gets FROM archive_daily WHERE day=date('now')").first())?.gets).toBe(0);
  await db.prepare('UPDATE search_usage SET bytes=0').run();
  await syncSearchIndex(db,{items},bucket);
  await syncSearchIndex(db,{items},bucket);
  const pdf=upload.mock.calls.filter(([key])=>key.endsWith('-external.pdf'));
  expect(pdf).toHaveLength(1);
  expect(await pdf[0][1].text()).toContain('initial');
  const [key]=pdf[0];
  search.mockResolvedValue({chunks:[{item:{key},text:'PDF evidence'}]});
  const citations=async()=> (await (await api.fetch(query(),bindings())).json()).results;
  expect(await citations()).toEqual([expect.objectContaining({kind:'安全技术说明书',href:url})]);
  const updated=await snapshot('changed');
  await db.prepare("INSERT INTO review_items(id,source_id,kind,body,created_at) VALUES('review',?,'source-change',?,datetime('now'))")
    .bind(source,JSON.stringify({previous:first.sha256,current:updated.sha256})).run();
  expect(await citations()).toEqual([]);
  await syncSearchIndex(db,{items},bucket);
  expect(await db.prepare('SELECT item_key FROM search_retirements WHERE item_key=?').bind(key).first()).toBeTruthy();
  expect(upload.mock.calls.filter(([k])=>k.endsWith('-external.pdf'))).toHaveLength(1);
  await db.prepare("UPDATE review_items SET state='approved' WHERE id='review'").run();
  await syncSearchIndex(db,{items},bucket);
  expect(upload.mock.calls.filter(([k])=>k.endsWith('-external.pdf'))).toHaveLength(2);
  const [current]=upload.mock.calls.at(-1)!;
  search.mockResolvedValue({chunks:[{item:{key:current},text:'new evidence'}]});
  expect(await citations()).toHaveLength(1);
  await db.prepare('UPDATE sources SET last_http_status=410').run();
  expect(await citations()).toEqual([]);
});
