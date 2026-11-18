import type { D1Database, RateLimit } from '@cloudflare/workers-types';

export type CorrectionBindings = { DB: Pick<D1Database, 'prepare'>; TURNSTILE_SECRET: string; CORRECTION_LIMIT: RateLimit };
const hostname = 'wash.kokoda.fun';
const response = (status: number, error?: string) => Response.json(error ? { error } : { ok: true }, { status, headers: { 'Cache-Control': 'no-store' } });

async function readCorrection(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder();
  let bytes = 0, text = '';
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16000) { await reader.cancel(); return null; }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } catch { return null; } finally { reader.releaseLock(); }
}

export async function submitCorrection(request: Request, env: CorrectionBindings) {
  if (request.headers.get('Origin') !== 'https://' + hostname || new URL(request.url).hostname !== hostname) return response(403, '请从产品页提交纠错');
  if (request.headers.get('Content-Type')?.split(';')[0] !== 'application/json') return response(415, '提交格式无效');
  const ip = request.headers.get('CF-Connecting-IP');
  if (!(await env.CORRECTION_LIMIT.limit({ key: ip || 'unknown' })).success) return response(429, '提交过于频繁，请稍后再试');
  const input = await readCorrection(request);
  if (!input || typeof input.id !== 'string' || !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(input.id) ||
    typeof input.product !== 'string' || !/^[\w-]{1,100}$/.test(input.product) || typeof input.message !== 'string') return response(400, '纠错资料无效');
  const text = input.message.trim();
  if (text.length < 5 || text.length > 1500) return response(400, '请填写 5 至 1500 个字符');
  if (typeof input.token !== 'string' || !input.token || input.token.length > 2048) return response(400, '请先完成人机验证');
  if (!env.TURNSTILE_SECRET) return response(503, '人机验证暂不可用');
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: input.token });
  if (ip) body.set('remoteip', ip);
  const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST', body, signal: AbortSignal.timeout(8000),
  });
  if (!verification.ok) return response(503, '人机验证暂不可用，请稍后再试');
  const result: { success?: boolean; action?: string; hostname?: string } = await verification.json();
  if (result.success !== true || result.action !== 'product_correction' || result.hostname !== hostname) {
    return response(403, '验证已失效，请重新验证');
  }

  // One atomic conditional insert bounds accepted submissions globally. Reading
  // an existing receipt after a lost response does not consume another slot.
  const id = 'correction-' + input.id;
  const saved = await env.DB.prepare(`INSERT OR IGNORE INTO review_items(id,product_id,kind,body,created_at)
    SELECT ?,p.id,'correction',?,strftime('%Y-%m-%dT%H:%M:%fZ','now') FROM products p
    JOIN catalog_publication v ON v.version_id=p.version_id AND v.singleton=1 WHERE p.id=?
    AND (SELECT count(*) FROM review_items WHERE kind='correction' AND created_at>=date('now'))<30 RETURNING id`)
    .bind(id, text, input.product).first();
  if (saved) return response(201);
  const previous = await env.DB.prepare("SELECT product_id,body FROM review_items WHERE id=? AND kind='correction'").bind(id).first<{ product_id: string; body: string }>();
  if (previous) return previous.product_id === input.product && previous.body === text ? response(200) : response(409, '请重新打开纠错表单');
  const exists = await env.DB.prepare('SELECT 1 FROM products p JOIN catalog_publication v ON v.version_id=p.version_id WHERE p.id=?').bind(input.product).first();
  return exists ? response(429, '今日纠错额度已满，请明天再试') : response(404, '该产品已下架');
}
