import type { AiSearchInstance, D1Database, RateLimit } from '@cloudflare/workers-types';

type Bindings = { DB: D1Database; SEARCH: Pick<AiSearchInstance, 'search'>; SEARCH_LIMIT: RateLimit };

function reply(value: unknown, status = 200) {
  return Response.json(value, {status,headers:{'Cache-Control':'no-store'}});
}
async function search(request: Request, env: Bindings) {
  if (!request.headers.get('Content-Type')?.startsWith('text/plain')) return reply({error:'查询格式无效'},415);
  const reader = request.body?.getReader();
  if (!reader) return reply({error:'请输入查询内容'},400);
  const decoder = new TextDecoder();
  let text = '';
  let bytes = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      bytes += part.value.byteLength;
      if (bytes > 800) {
        await reader.cancel();
        return reply({error:'查询内容过长'},413);
      }
      text += decoder.decode(part.value,{stream:true});
    }
  } finally { reader.releaseLock(); }
  const q = (text + decoder.decode()).trim();
  if (!q || q.length < 2 || q.length > 200) return reply({error:'请输入 2 至 200 个字符'},400);
  const client = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (!(await env.SEARCH_LIMIT.limit({key:client})).success) return reply({error:'查询过于频繁，请稍后再试'},429);
  const reservation = await env.DB.prepare(`INSERT INTO search_usage(day,lookups) VALUES(date('now'),1)
    ON CONFLICT(day) DO UPDATE SET lookups=lookups+1 WHERE lookups<25 RETURNING lookups`).first();
  if (!reservation) return reply({error:'今日资料检索额度已用完，可继续使用产品速查'},429);
  const result = await env.SEARCH.search({query:q,ai_search_options:{retrieval:{retrieval_type:'hybrid',max_num_results:8,return_on_failure:false},query_rewrite:{enabled:false}}});
  const keys = [...new Set(result.chunks.map(chunk=>chunk.item.key))];
  if (!keys.length) return reply({results:[]});
  // Resolve links against the currently published catalog. Never follow URLs
  // from retrieved chunk text, or surface withdrawn records from the index.
  const {results: rows} = await env.DB.prepare(`SELECT s.indexed_key,s.item_key,p.id,p.name,p.source_url,
    json_extract(p.document,'$.sds.url') AS sds_url FROM search_documents s JOIN catalog_publication v ON v.version_id=s.version_id
    JOIN products p ON p.id=s.product_id AND p.version_id=v.version_id
    WHERE s.indexed_key IN (${keys.map(()=>'?').join(',')}) AND s.state='submitted'`).bind(...keys)
    .all<{indexed_key:string; item_key:string; id:string; name:string; source_url:string; sds_url:string|null}>();
  const citations = new Map(rows.map(row=>[row.indexed_key,row]));
  return reply({results: keys.flatMap(key=>{
    const row = citations.get(key);
    const chunk = result.chunks.find(item=>item.item.key===key);
    if (!row || !chunk) return [];
    const isSheet = row.item_key.startsWith('sds-');
    const href = isSheet ? row.sds_url : row.source_url;
    if (!href || !/^(https?:\/\/|\/sds\/[A-Za-z0-9_-]+\.pdf$)/.test(href)) return [];
    return [{title:row.name,productId:row.id,kind:isSheet?'安全技术说明书':'产品资料',excerpt:chunk.text.slice(0,800),href}];
  })});
}
const worker = {
  async fetch(request: Request, env: Bindings) {
    if (request.method==='POST' && new URL(request.url).pathname==='/api/platform/search') {
      try {return await search(request,env);} catch {return reply({error:'资料检索暂时不可用，请稍后再试'},503);}
    }
    return reply({error:'页面不存在'},404);
  },
};
export default worker;
