import type { D1Database, DurableObjectNamespace, RateLimit } from '@cloudflare/workers-types';
import type { LibraryDevices } from './devices';

export type LibraryBindings = {
  DB: D1Database;
  DEVICES: Pick<DurableObjectNamespace<LibraryDevices>, 'getByName'>;
  LIBRARY_LIMIT: RateLimit;
  PAIR_LIMIT: RateLimit;
};
const origin = 'https://wash.kokoda.fun';
const cookieName = '__Host-wash-device';
const year = 365 * 86400;
const randomSecret = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) => b.toString(16).padStart(2, '0')).join('');
const hex = /^[a-f0-9]{64}$/;
const uuid = /^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/;
const digest = async (purpose: string, text: string) =>
  Array.from(
    new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(purpose + ':' + text))),
    (b) => b.toString(16).padStart(2, '0'),
  ).join('');
const cookie = (value: string, age = year) =>
  `${cookieName}=${value}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${age}`;
const json = (data: object, status = 200, session?: string) =>
  Response.json(data, {
    status,
    headers: { 'Cache-Control': 'private, no-store', ...(session ? { 'Set-Cookie': session } : {}) },
  });
const fail = (status: number, error: string) => json({ error }, status);
const known = (db: D1Database, id: string) =>
  db.prepare('SELECT 1 FROM users WHERE id=? AND disabled_at IS NULL').bind(id).first();

async function input(request: Request): Promise<Record<string, unknown> | null> {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder();
  let data = '',
    size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 128_000) {
        await reader.cancel();
        return null;
      }
      data += decoder.decode(value, { stream: true });
    }
    const result = JSON.parse(data + decoder.decode());
    return result && typeof result === 'object' && !Array.isArray(result) ? result : null;
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

async function connect(env: LibraryBindings, operation: string, fields: Record<string, unknown>) {
  const key = fields.key;
  if (typeof key !== 'string' || !hex.test(key)) return fail(400, '设备密钥无效');
  const device = await digest('session', key);
  let user: string;
  if (operation === 'create') {
    const bootstrap = await digest('create', key);
    await env.DB.prepare(
      `INSERT OR IGNORE INTO users(id,created_at,credential_hash) SELECT ?,strftime('%Y-%m-%dT%H:%M:%fZ','now'),?
      WHERE (SELECT count(*) FROM users WHERE created_at>=date('now'))<40`,
    )
      .bind(crypto.randomUUID(), bootstrap)
      .run();
    const found = await env.DB.prepare('SELECT id FROM users WHERE credential_hash=? AND disabled_at IS NULL')
      .bind(bootstrap)
      .first<string>('id');
    if (!found) return fail(429, '今日新建额度已满，请明天再试');
    user = found;
    if (!(await env.DEVICES.getByName(user).initialize(device))) return fail(403, '此设备凭据已撤销');
  } else {
    const pair = typeof fields.pair === 'string' ? fields.pair.split('.') : [];
    if (pair.length !== 2 || !uuid.test(pair[0]) || !hex.test(pair[1]) || !(await known(env.DB, pair[0])))
      return fail(400, '配对码无效或已过期');
    user = pair[0];
    if (!(await env.DEVICES.getByName(user).redeem(await digest('pair', pair[1]), device)))
      return fail(400, '配对码无效、已使用或设备名额已满');
  }
  return json({ user }, 200, cookie(user + '.' + key));
}

export async function libraryRequest(request: Request, env: LibraryBindings, operation: string) {
  if (new URL(request.url).origin !== origin || request.headers.get('Origin') !== origin)
    return fail(403, '请从站内打开我的资料库');
  if (request.headers.get('content-type')?.split(';')[0] !== 'application/json')
    return fail(415, '请求格式无效');
  const joining = operation === 'create' || operation === 'join';
  if (
    !(
      await (joining ? env.PAIR_LIMIT : env.LIBRARY_LIMIT).limit({
        key: request.headers.get('CF-Connecting-IP') || 'unknown',
      })
    ).success
  )
    return fail(429, '操作太频繁，请稍后再试');
  const data = await input(request);
  if (!data) return fail(400, '请求内容无效或过大');
  const session = request.headers
    .get('Cookie')
    ?.split(/;\s*/)
    .find((v) => v.startsWith(cookieName + '='))
    ?.slice(cookieName.length + 1)
    .split('.');
  let auth: { user: string; device: string } | undefined;
  if (
    session?.length === 2 &&
    uuid.test(session[0]) &&
    hex.test(session[1]) &&
    (await known(env.DB, session[0]))
  ) {
    const device = await digest('session', session[1]);
    if (await env.DEVICES.getByName(session[0]).has(device)) auth = { user: session[0], device };
  }
  if (joining)
    return auth ? fail(409, '此设备已连接资料库，请先断开后再配对') : connect(env, operation, data);
  if (!auth) return fail(401, '设备未连接或连接已失效');
  const { user, device } = auth;
  const db = env.DB;
  const scope = user + '.' + device.slice(0, 20);
  if (operation !== 'state' && data.scope !== scope) return fail(409, '设备连接已变化，请刷新资料库');
  if (operation === 'pair') {
    const secret = randomSecret();
    if (!(await env.DEVICES.getByName(user).issue(device, await digest('pair', secret))))
      return fail(401, '设备未连接');
    return json({ pair: user + '.' + secret, expiresIn: 600 });
  }
  if (operation === 'leave') {
    await env.DEVICES.getByName(user).revoke(device);
    await db
      .prepare('DELETE FROM library_favorite_commands WHERE user_id=? AND device=?')
      .bind(user, device)
      .run();
    return json({ ok: true }, 200, cookie('', 0));
  }
  if (operation === 'state') {
    const [favorites, lists, clock] = await db.batch<Record<string, unknown>>([
      db
        .prepare('SELECT product_id FROM user_favorites WHERE user_id=? AND deleted=0 ORDER BY product_id')
        .bind(user),
      db
        .prepare(
          'SELECT id,title,document,revision FROM user_checklists WHERE user_id=? ORDER BY updated_at DESC,id',
        )
        .bind(user),
      db.prepare('SELECT seq FROM library_favorite_commands WHERE user_id=? AND device=?').bind(user, device),
    ]);
    return json({
      user,
      scope,
      seq: clock.results[0]?.seq ?? 0,
      favorites: favorites.results.map((p) => p.product_id),
      lists: lists.results.map((r) => ({
        id: r.id,
        title: r.title,
        revision: r.revision,
        items: JSON.parse(String(r.document)),
      })),
    });
  }
  if (operation === 'favorites') {
    if (
      !Number.isSafeInteger(data.seq) ||
      !Number.isSafeInteger(data.baseSeq) ||
      Number(data.baseSeq) < 0 ||
      Number(data.seq) <= Number(data.baseSeq) ||
      !Array.isArray(data.changes) ||
      data.changes.length < 1 ||
      data.changes.length > 1000 ||
      data.changes.some(
        (v) => !v || typeof v.id !== 'string' || !/^[\w-]{1,100}$/.test(v.id) || typeof v.on !== 'boolean',
      )
    )
      return fail(400, '收藏内容无效');
    const changes = new Map<string, boolean>(data.changes.map((v) => [v.id, v.on]));
    try {
      const applied = await db
        .prepare(
          `INSERT OR REPLACE INTO library_favorite_commands(user_id,device,seq,changes)
        SELECT ?1,?2,?3,?4 WHERE COALESCE((SELECT seq FROM library_favorite_commands
        WHERE user_id=?1 AND device=?2),0)=?5 RETURNING seq`,
        )
        .bind(
          user,
          device,
          data.seq,
          JSON.stringify(Array.from(changes, ([id, on]) => ({ id, on }))),
          data.baseSeq,
        )
        .first();
      if (!applied) {
        const current = await db
          .prepare('SELECT seq FROM library_favorite_commands WHERE user_id=? AND device=?')
          .bind(user, device)
          .first<number>('seq');
        if ((current ?? 0) < Number(data.seq)) return fail(412, '同步记录已变化，请重新同步');
      }
    } catch (e) {
      if (String(e).includes('library_favorites_limit')) return fail(409, '每个资料库最多收藏 1000 个产品');
      throw e;
    }
    return json({ ok: true });
  }
  if (operation !== 'checklist' || typeof data.id !== 'string' || !uuid.test(data.id))
    return fail(404, '操作不存在');
  const revision = data.revision;
  if (!Number.isSafeInteger(revision) || Number(revision) < 0) return fail(400, '清单版本无效');
  if (data.remove === true) {
    const removed = await db
      .prepare('DELETE FROM user_checklists WHERE user_id=? AND id=? AND revision=? RETURNING id')
      .bind(user, data.id, revision)
      .first();
    return removed ? json({ ok: true }) : fail(409, '清单版本已变化，请刷新后核对');
  }
  if (
    typeof data.title !== 'string' ||
    !data.title.trim() ||
    data.title.length > 80 ||
    !Array.isArray(data.items) ||
    data.items.length > 60 ||
    data.items.some(
      (i) =>
        !i ||
        typeof i.text !== 'string' ||
        !i.text.trim() ||
        i.text.length > 180 ||
        typeof i.done !== 'boolean',
    )
  )
    return fail(400, '请检查清单标题和步骤');
  const document = JSON.stringify(data.items.map((i) => ({ text: i.text.trim(), done: i.done })));
  const title = data.title.trim();
  const saved =
    revision === 0
      ? await db
          .prepare(
            `INSERT OR IGNORE INTO user_checklists(id,user_id,title,document,updated_at) SELECT ?,?,?,?,datetime('now')
        WHERE (SELECT count(*) FROM user_checklists WHERE user_id=?)<30 RETURNING revision`,
          )
          .bind(data.id, user, title, document, user)
          .first()
      : await db
          .prepare(
            `UPDATE user_checklists SET title=?,document=?,updated_at=datetime('now'),revision=revision+1
        WHERE user_id=? AND id=? AND revision=? RETURNING revision`,
          )
          .bind(title, document, user, data.id, revision)
          .first();
  return saved ? json(saved) : fail(409, '版本已变化或已达 30 份清单上限，请刷新核对');
}
