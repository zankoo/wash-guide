import { ArchiveUnavailable, readArchive } from '../archive';
import type { JobBindings } from '../jobs';
import { catalogReviewer } from './access';
import { compareEvidence } from './evidence';

const responseHeaders = {
  'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; form-action 'self'; base-uri 'none'",
};
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const message = (text: string, status: number) => new Response(text, { status, headers: responseHeaders });
function page(title: string, body: string) {
  const html = `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escape(title)} · 洗车施工速查</title>
    <style>body{max-width:60rem;margin:3rem auto;padding:0 1rem;font:1rem/1.65 system-ui,sans-serif;color:#17282b}a{color:#065b69}li{margin:.6rem 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;padding:1rem;background:#f3f6f6}</style>
    <main><h1>${escape(title)}</h1>${body}</main></html>`;
  return new Response(html, { headers: { ...responseHeaders, 'Content-Type': 'text/html; charset=utf-8' } });
}

type Review = { id: string; kind: string; state: string; source_id: string | null; product_id: string | null; body: string; url: string | null; created_at: string; evidence_diff?: string | null };
const selectReview = 'SELECT r.*, s.url FROM review_items r LEFT JOIN sources s ON s.id = r.source_id';
const target = (r: Review) => r.url || r.product_id || r.id;
const pathFor = (id: string) => '/admin/reviews/' + encodeURIComponent(id);

export async function adminRequest(request: Request, env: Pick<JobBindings, 'DB' | 'ARCHIVE'>, authenticate = catalogReviewer) {
  const { pathname, searchParams } = new URL(request.url);
  if (pathname !== '/admin' && !pathname.startsWith('/admin/')) return message('页面不存在', 404);
  if (!await authenticate(request)) return message('需要管理员登录', 403);
  if (request.method !== 'GET') return message('请求方法不支持', 405);
  if (pathname === '/admin' || pathname === '/admin/') {
    const after = searchParams.get('after');
    if (after && !/^[\w-]{1,160}$/.test(after)) return message('分页参数无效', 400);
    const start = after ? ' AND (r.created_at, r.id) > (SELECT created_at, id FROM review_items WHERE id = ?)' : '';
    const statement = env.DB.prepare(`SELECT r.id, r.kind, r.product_id, r.created_at, s.url FROM review_items r
      LEFT JOIN sources s ON s.id = r.source_id WHERE r.state='pending' ${start} ORDER BY r.created_at, r.id LIMIT 101`);
    const rows = (await (after ? statement.bind(after) : statement).all<Review>()).results;
    const next = rows.length > 100 ? `<p><a href="/admin/?after=${encodeURIComponent(rows[99].id)}">下一页</a></p>` : '';
    return page('待审核资料', rows.length ? '<ol>' + rows.slice(0, 100).map(r =>
      `<li><a href="${pathFor(r.id)}">${escape(target(r))}</a> · ${r.kind === 'correction' ? '读者纠错' : '来源变化'} · ${escape(r.created_at)}</li>`).join('') + '</ol>' + next : '<p>暂无待审核资料。</p>');
  }
  const match = /^\/admin\/reviews\/([\w-]{1,160})(?:\/(compare|previous|current))?$/.exec(pathname);
  if (!match) return message('页面不存在', 404);
  const [, id, operation] = match;
  const review = await env.DB.prepare(selectReview + ' WHERE r.id = ?').bind(id).first<Review>();
  if (!review) return message('记录不存在', 404);
  const root = pathFor(id);
  const back = '<p><a href="/admin">返回审核列表</a></p>';
  if (review.kind === 'correction') {
    if (operation) return message('页面不存在', 404);
    return page('读者纠错', back + '<p>' + escape(target(review)) + '</p><pre>' + escape(review.body) + '</pre>');
  }
  if (!operation) {
    return page('来源变化', back + '<p>' + escape(target(review)) + '</p>' +
      `<p><a href="${root}/compare">查看内容差异</a></p><p><a href="${root}/previous">下载旧版原文</a> · <a href="${root}/current">下载新版原文</a></p>`);
  }
  const diffPage = (text: string) => page('来源内容差异', `<a href="${root}">返回资料</a><pre>${escape(text)}</pre>`);
  if (operation === 'compare' && review.evidence_diff) return diffPage(review.evidence_diff);
  const hashes = JSON.parse(review.body);
  if (!review.source_id || ![review.source_id, hashes.previous, hashes.current].every(s => typeof s === 'string' && /^[a-f0-9]{64}$/.test(s))) {
    return message('记录缺少可核对的归档', 409);
  }
  const sourceId = review.source_id;
  async function evidence(hash: string) {
    const obj = await readArchive(env.DB, env.ARCHIVE, `snapshots/${sourceId}/${hash}`);
    if (!obj) throw new ArchiveUnavailable('missing');
    return { bytes: await obj.arrayBuffer(), type: obj.httpMetadata?.contentType || 'application/octet-stream' };
  }
  try {
    if (operation === 'compare') {
      const old = await evidence(hashes.previous);
      const current = await evidence(hashes.current);
      const diff = compareEvidence(new Uint8Array(old.bytes), new Uint8Array(current.bytes), old.type, current.type);
      await env.DB.prepare('UPDATE review_items SET evidence_diff = ? WHERE id = ? AND body = ? AND evidence_diff IS NULL')
        .bind(diff, id, review.body).run();
      return diffPage(diff);
    }
    const doc = await evidence(operation === 'previous' ? hashes.previous : hashes.current);
    const extension = doc.type === 'application/pdf' ? 'pdf' : doc.type === 'text/html' ? 'html' : 'txt';
    return new Response(doc.bytes, { headers: { ...responseHeaders, 'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="' + operation + '.' + extension + '"',
    } });
  } catch (e) {
    if (e instanceof ArchiveUnavailable) return message('归档已过期或读取额度已用完', 503);
    throw e;
  }
}
