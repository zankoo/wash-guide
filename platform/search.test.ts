import { readFile } from 'node:fs/promises';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { Miniflare } from 'miniflare';
import { PRODUCTS } from '../src/data';
import { syncSearchIndex } from './search-index';
import api from './api/worker';

let runtime: Miniflare;
let db: Awaited<ReturnType<Miniflare['getD1Database']>>;
const product = PRODUCTS.find(p => p.id === 'C-spotless')!;
const upload = vi.fn();
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
    env: { DB: { type: 'd1', id: 'search-test' } },
  } }] });
  db = await runtime.getD1Database('DB');
  for (const name of ['0001_catalog', '0004_search']) {
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
afterEach(async () => { await runtime?.dispose(); });

it('indexes a published product once and resolves search citations against D1', async () => {
  await syncSearchIndex(db, {items:{upload}});
  await syncSearchIndex(db, {items:{upload}});
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
  await syncSearchIndex(db, {items:{upload}});
  expect(upload).not.toHaveBeenCalled();
  expect(await db.prepare('SELECT state,attempts FROM search_documents').first()).toMatchObject({state:'pending',attempts:0});
});
