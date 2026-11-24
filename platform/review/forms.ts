import { addRowScript, editFields, fieldNames, submittedEdit } from './editor';
import { dispatchReview, type ReviewEnv } from './dispatch';
import { escape, message, page, responseHeaders } from './html';
import { validProductEdit, type ProductEdit } from './publication';
import type { Product } from '../../src/data/types';

const prefix = '/admin/decisions/';
const labels = { edit: '修改产品并发布', approve: '核对通过，无需改动目录', reject: '驳回', rollback: '回滚目录' } as const;
const states = { proposed: '待确认', queued: '处理中', applied: '已完成', conflict: '未执行' } as const;
const stateTone = { proposed: 'acid', queued: 'rinse', applied: 'neu', conflict: 'none' } as const;
const redirect = (id: string) => new Response(null, { status: 303, headers: { ...responseHeaders, Location: prefix + 'action/' + id } });
const currentVersion = (env: ReviewEnv) => env.DB.prepare('SELECT version_id FROM catalog_publication WHERE singleton=1').first<string>('version_id');
const editable = ({ name, type, materials, sizes, steps, notes, dilutions }: Product): ProductEdit => ({ name, type, materials, sizes, steps, notes, dilutions });
const hidden = (key: string, value: string) => `<input type="hidden" name="${key}" value="${escape(value)}">`;
const noteField = '<label>审核说明 <input name="note" required maxlength="1000"></label>';
type Decision = { id: string; actor: string; base_version: string; result_version: string | null; review_id: string | null; rollback_version: string | null;
  product_id: string | null; change_json: string | null; kind: keyof typeof labels; state: keyof typeof states; note: string; reason: string | null };

async function parseForm(request: Request) {
  if (request.headers.get('Origin') !== 'https://wash.kokoda.fun') throw message('请从审核页面提交', 403);
  if (request.headers.get('content-type')?.split(';')[0] !== 'application/x-www-form-urlencoded') throw message('表单格式无效', 415);
  const reader = request.body?.getReader();
  if (!reader) throw message('缺少表单', 400);
  const decoder = new TextDecoder();
  let data = '', bytes = 0;
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > 96_000) { await reader.cancel(); throw message('表单太大', 413); }
      data += decoder.decode(value, { stream: true });
    }
    return new URLSearchParams(data + decoder.decode());
  } finally { reader.releaseLock(); }
}

async function wake(env: ReviewEnv, id: string) {
  try { await dispatchReview(env, id); } catch { console.error('review_delivery_deferred', id); }
  return redirect(id);
}

async function reviewForm(request: Request, env: ReviewEnv, actor: string, reviewId: string, form?: URLSearchParams) {
  const review = await env.DB.prepare('SELECT state,product_id,source_id FROM review_items WHERE id=?').bind(reviewId)
    .first<{ state: string; product_id: string | null; source_id: string | null }>();
  if (!review) return message('记录不存在', 404);
  const active = await env.DB.prepare("SELECT id FROM review_actions WHERE review_id=? AND state!='conflict'").bind(reviewId).first<string>('id');
  if (active) return redirect(active);
  if (review.state !== 'pending') return message('记录已经处理', 409);
  const version = await currentVersion(env);
  if (!version) return message('目录暂不可用', 503);
  const { results } = await env.DB.prepare(`SELECT id,name FROM products WHERE version_id=? AND
    (id=? OR id IN (SELECT product_id FROM product_sources WHERE version_id=? AND source_id=?)) ORDER BY name`)
    .bind(version, review.product_id, version, review.source_id).all<{ id: string; name: string }>();
  const productId = form?.get('product') || new URL(request.url).searchParams.get('product') || results[0]?.id || '';
  if (productId && !results.some(p => p.id === productId)) return message('请选择这条资料对应的产品', 400);
  if (form) {
    if (form.get('base') !== version) return message('目录已更新，请重新打开审核页面', 409);
    const kind = form.get('kind');
    const note = form.get('note')?.trim();
    if (!note || note.length > 1000 || !['edit','approve','reject'].includes(kind || '')) return message('请填写审核说明并选择操作', 400);
    let change = null;
    if (kind === 'edit') {
      change = submittedEdit(form);
      if (!productId || !validProductEdit(change)) return message('产品字段或稀释比例无效', 400);
    }
    const id = crypto.randomUUID();
    const saved = await env.DB.prepare(`INSERT OR IGNORE INTO review_actions
      (id,review_id,kind,actor,base_version,product_id,change_json,note) VALUES (?,?,?,?,?,?,?,?) RETURNING id`)
      .bind(id, reviewId, kind, actor, version, kind === 'edit' ? productId : null, change ? JSON.stringify(change) : null, note).first();
    if (!saved) return message('此记录已有审核操作，请重新打开', 409);
    return wake(env, id);
  }
  const doc = productId && await env.DB.prepare('SELECT document FROM products WHERE version_id=? AND id=?').bind(version, productId).first<string>('document');
  const select = results.length > 1 ? '<form class="card soft"><label>关联产品 <select name="product">' + results.map(p =>
    `<option value="${escape(p.id)}"${p.id === productId ? ' selected' : ''}>${escape(p.name)}</option>`).join('') + '</select></label><div class="actions"><button>切换产品</button></div></form>' : '';
  const editor = doc ? editFields(JSON.parse(doc)) : '';
  return page('处理资料', `<div class="actions"><a class="btn" href="/admin/reviews/${encodeURIComponent(reviewId)}">← 查看提交资料</a></div>` + select +
    '<form class="card" method="post">' + hidden('product', productId) + hidden('base', version) + editor + noteField +
    '<label>处理方式 <select name="kind">' + (doc ? '<option value="edit">修改产品并发布</option>' : '') +
    '<option value="approve">核对通过，无需改动目录</option><option value="reject">驳回</option></select></label><div class="actions"><button class="primary">核对决定</button></div></form>', doc ? addRowScript : undefined);
}

async function history(env: ReviewEnv, actor: string, form?: URLSearchParams) {
  const version = await currentVersion(env);
  const release = version && await env.DB.prepare(`SELECT base_version FROM review_actions WHERE kind='edit' AND state='applied'
    AND result_version=? ORDER BY finished_at DESC LIMIT 1`).bind(version).first<string>('base_version');
  if (form) {
    if (!version || !release || form.get('base') !== version || form.get('to') !== release) return message('可回滚版本已变化', 409);
    const note = form.get('note')?.trim();
    if (!note || note.length > 1000) return message('请填写回滚原因', 400);
    const id = crypto.randomUUID();
    const saved = await env.DB.prepare(`INSERT OR IGNORE INTO review_actions(id,kind,actor,base_version,rollback_version,note)
      VALUES (?,'rollback',?,?,?,?) RETURNING id`).bind(id, actor, version, release, note).first();
    if (!saved) return message('已有回滚提议，请在审核记录中打开', 409);
    return wake(env, id);
  }
  const { results } = await env.DB.prepare('SELECT id,kind,state,note FROM review_actions ORDER BY created_at DESC LIMIT 100').all<Decision>();
  const rollback = release && version ? `<form class="card soft" method="post"><h2>快速回滚</h2><p class="muted">从 ${escape(version)} 回滚至 ${escape(release)}</p>` +
    hidden('base', version) + hidden('to', release) + noteField + '<div class="actions"><button class="danger">核对回滚</button></div></form>' : '';
  return page('审核记录', rollback + (results.length ? '<ul class="list">' + results.map(r =>
    `<li><a href="${prefix}action/${encodeURIComponent(r.id)}">${labels[r.kind]} · ${escape(r.note)}</a><span class="tag ${stateTone[r.state]}">${states[r.state]}</span></li>`).join('') + '</ul>' : '<p class="empty">暂无审核记录。</p>'));
}

export async function decisionRequest(request: Request, env: ReviewEnv, actor: string) {
  if (!['GET', 'POST'].includes(request.method)) return message('请求方法不支持', 405);
  const path = new URL(request.url).pathname.slice(prefix.length);
  let form;
  if (request.method === 'POST') {
    try { form = await parseForm(request); } catch (e) { if (e instanceof Response) return e; throw e; }
  }
  if (path === 'history') return history(env, actor, form);
  const match = /^(action|review)\/([\w-]{1,160})$/.exec(path);
  if (!match) return message('页面不存在', 404);
  const [, mode, id] = match;
  if (mode === 'review') return reviewForm(request, env, actor, id, form);
  const action = await env.DB.prepare('SELECT * FROM review_actions WHERE id=?').bind(id).first<Decision>();
  if (!action) return message('审核提议不存在', 404);
  if (form) {
    if (action.actor !== actor) return message('请使用提交该提议的账户确认',403);
    if (form.get('choice') === 'cancel') {
      await env.DB.prepare("UPDATE review_actions SET state='conflict',reason='review_cancelled',finished_at=datetime('now') WHERE id=? AND actor=? AND state='proposed'").bind(id, actor).run();
      return redirect(id);
    }
    if (form.get('choice') !== 'confirm') return message('请选择确认或撤销', 400);
    await env.DB.prepare("UPDATE review_actions SET state='queued',next_dispatch=0,dispatch_attempts=0 WHERE id=? AND actor=? AND state='proposed'").bind(id, actor).run();
    return wake(env, id);
  }
  const old = action.product_id && await env.DB.prepare('SELECT document FROM products WHERE version_id=? AND id=?').bind(action.base_version, action.product_id).first<string>('document');
  const changes = old && action.change_json ? (() => {
    const before = editable(JSON.parse(old));
    const after: ProductEdit = JSON.parse(action.change_json);
    return (Object.keys(before) as (keyof ProductEdit)[]).filter(k => JSON.stringify(before[k]) !== JSON.stringify(after[k])).map(k =>
      `<section class="card"><h2>${fieldNames[k]}</h2><div class="diff-grid"><div class="diff-box"><span>原内容</span><pre>${escape(JSON.stringify(before[k], null, 2))}</pre></div><div class="diff-box"><span>拟发布</span><pre>${escape(JSON.stringify(after[k], null, 2))}</pre></div></div></section>`).join('');
  })() : '';
  const confirm = action.state === 'proposed' ? '<form class="actions" method="post"><button class="primary" name="choice" value="confirm">确认执行</button><button class="danger" name="choice" value="cancel">撤销提议</button></form>' : '';
  return page(labels[action.kind], `<section class="card"><div class="meta"><span class="tag ${stateTone[action.state]}">${states[action.state]}</span><span>依据版本 ${escape(action.base_version)}</span>${action.rollback_version ? `<span>回滚至 ${escape(action.rollback_version)}</span>` : ''}</div><p class="muted">${escape(action.note)}</p>${action.reason ? `<p class="muted">${escape(action.reason)}</p>` : ''}${confirm}</section>` + changes);
}
