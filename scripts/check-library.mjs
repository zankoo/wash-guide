import assert from 'node:assert/strict';
import { randomBytes, randomUUID } from 'node:crypto';
import { localLibraryApi } from './local-library-api.mjs';

const runtime = await localLibraryApi();
try {
  const origin = 'https://wash.kokoda.fun';
  let client = 0;
  async function call(operation, data, cookie = '', status = 200) {
    const res = await runtime.dispatchFetch(origin + '/api/platform/library/' + operation, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: origin,
        Cookie: cookie,
        'CF-Connecting-IP': '192.0.2.' + ++client,
      },
      body: JSON.stringify(data),
    });
    const value = await res.json();
    assert.equal(res.status, status, operation + ' ' + JSON.stringify(value));
    return { value, cookie: res.headers.get('Set-Cookie')?.split(';')[0] };
  }
  const key = () => randomBytes(32).toString('hex');
  await call('state', {}, '', 401);
  const { cookie: a } = await call('create', { key: key() });
  const { value: first } = await call('state', {}, a);
  const { value: pairing } = await call('pair', { scope: first.scope }, a);
  const claims = await Promise.all(
    [key(), key()].map(async (k) => {
      const res = await runtime.dispatchFetch(origin + '/api/platform/library/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Origin: origin },
        body: JSON.stringify({ key: k, pair: pairing.pair }),
      });
      return { status: res.status, cookie: res.headers.get('Set-Cookie')?.split(';')[0] };
    }),
  );
  assert.deepEqual(claims.map((c) => c.status).sort(), [200, 400]);
  const b = claims.find((c) => c.status === 200).cookie;
  const { value: second } = await call('state', {}, b);
  await call('favorites', { scope: first.scope, seq: 1, changes: [{ id: 'C-reset', on: true }] }, a);
  assert.deepEqual((await call('state', {}, b)).value.favorites, ['C-reset']);
  await call('favorites', { scope: second.scope, seq: 1, changes: [{ id: 'C-reset', on: false }] }, b);
  await call('favorites', { scope: first.scope, seq: 1, changes: [{ id: 'C-reset', on: true }] }, a);
  assert.deepEqual((await call('state', {}, a)).value.favorites, []);
  const id = randomUUID();
  const list = { id, title: '洗车前准备', items: [{ text: '准备手套', done: false }], revision: 0 };
  await call('checklist', { ...list, scope: first.scope }, a);
  await call(
    'checklist',
    { ...list, scope: second.scope, revision: 1, items: [{ text: '准备手套', done: true }] },
    b,
  );
  await call('checklist', { ...list, scope: first.scope, revision: 1 }, a, 409);
  assert.equal((await call('state', {}, a)).value.lists[0].items[0].done, true);
  const { cookie: c } = await call('create', { key: key() });
  const foreign = (await call('state', {}, c)).value;
  assert.deepEqual(foreign.lists, []);
  await call('checklist', { scope: foreign.scope, id, remove: true, revision: 2 }, c, 409);
  await call('leave', { scope: second.scope }, b);
  await call('state', {}, b, 401);
  assert.equal((await call('state', {}, a)).value.lists.length, 1);
  console.log(
    'Verified device pairing, replay-safe favorites, private checklist revisions, isolation, and revocation.',
  );
} finally {
  await runtime.dispose();
}
