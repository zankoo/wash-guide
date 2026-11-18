// Run against the built Worker with isolated local D1, Workflows and a test IdP.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { generateKeyPair, exportJWK, SignJWT } from 'jose';
import { Miniflare } from 'miniflare';

const configDir = new URL('../platform/jobs/.cloudflare/output/v1/workers/default/', import.meta.url);
const config = JSON.parse(await readFile(new URL('worker.config.json', configDir), 'utf8'));
const entry = config.manifest.mainModule;
const contents = await readFile(new URL('bundle/' + entry, configDir), 'utf8');
const issuer = 'https://kokodal.cloudflareaccess.com';
const audience = '597640e5d38cad688539217461d7f90a3b958bcc7e261254e9c282f2cf45842f';
const { publicKey, privateKey } = await generateKeyPair('RS256');
const jwk = { ...await exportJWK(publicKey), kid: 'local-test' };
const token = await new SignJWT({ type: 'app', email: 'reviewer@example.test' }).setSubject('reviewer')
  .setProtectedHeader({ alg: 'RS256', kid: jwk.kid }).setIssuedAt().setExpirationTime('10m')
  .setIssuer(issuer).setAudience(audience).sign(privateKey);
const runtime = new Miniflare({ workers: [{
  config: { name: config.name, compatibilityDate: config.compatibilityDate, exports: config.exports,
    env: { DB: { type: 'd1', id: 'local-review-test' }, REVIEW: config.env.REVIEW },
    manifest: { mainModule: entry, modules: { [entry]: { type: 'esm', contents } } },
  },
  dev: { outboundService: { type: 'fetcher', handler: async request => {
    assert.equal(request.url, issuer + '/cdn-cgi/access/certs');
    return Response.json({ keys: [jwk] });
  } } },
}] });
try {
  const db = await runtime.getD1Database('DB');
  for (const migration of ['0001_catalog', '0007_review_evidence', '0008_review_actions']) {
    const sql = await readFile(new URL('../platform/migrations/' + migration + '.sql', import.meta.url), 'utf8');
    await db.exec(sql.replace(/^\s*--.*$/gm, '').replaceAll('\n', ' '));
  }
  await db.batch([
    db.prepare("INSERT INTO catalog_versions(id,source_commit,content_sha256,state,product_count,flow_count) VALUES ('test','test','test','published',0,0)"),
    db.prepare("INSERT INTO catalog_publication(singleton,version_id) VALUES (1,'test')"),
    db.prepare("INSERT INTO review_items(id,kind,body,created_at) VALUES ('request','correction','A reader correction',datetime('now'))"),
  ]);
  const origin = 'https://wash.kokoda.fun';
  const request = (path, fields, requestOrigin = origin) => runtime.dispatchFetch(origin + path, {
    method: fields ? 'POST' : 'GET', redirect: 'manual',
    headers: { 'Cf-Access-Jwt-Assertion': token, Origin: requestOrigin, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: fields && new URLSearchParams(fields).toString(),
  });
  const review = '/admin/decisions/review/request';
  assert.equal((await runtime.dispatchFetch(origin + review)).status, 403);
  assert.equal((await request(review)).status, 200);
  const proposal = { kind: 'reject', base: 'test', note: 'Checked the original label' };
  assert.equal((await request(review, proposal, 'https://other.example')).status, 403);
  const response = await request(review, proposal);
  assert.equal(response.status, 303);
  const action = response.headers.get('Location');
  const actionId = action.split('/').pop();
  const instance = await (await runtime.getBindings()).REVIEW.get(actionId);
  async function waitFor(name, check) {
    const deadline = Date.now() + 20000;
    while (Date.now() < deadline) {
      if (await check()) return;
      await delay(100);
    }
    const status = await instance.status();
    throw new Error(name + ' timed out: ' + JSON.stringify(status));
  }
  await waitFor('proposal checkpoint', async () => {
    const progress = await instance.status();
    return progress.status === 'waiting' || progress.__LOCAL_DEV_STEP_OUTPUTS?.includes('proposed');
  });
  const state = () => db.prepare("SELECT state FROM review_items WHERE id='request'").first('state');
  assert.equal(await state(), 'pending');
  assert.ok((await (await request(action)).text()).includes('Checked the original label'));
  assert.equal((await request(action, {choice:'confirm'})).status, 303);
  await waitFor('decision application', async () => await state() === 'rejected');
  assert.equal((await request(action, {choice:'confirm'})).status, 303);
  assert.equal(await db.prepare('SELECT count(*) AS n FROM audit_events').first('n'), 1);
  assert.equal(await db.prepare('SELECT reviewed_by FROM review_items').first('reviewed_by'), 'reviewer');
  console.log('Verified Access, CSRF, a real workflow waiting for confirmation, and a single audited decision.');
} finally {
  await runtime.dispose();
}
