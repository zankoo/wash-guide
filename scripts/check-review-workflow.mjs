// Run against the built Worker with isolated local D1, Workflows and a test IdP.
import assert from 'node:assert/strict';
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { preview } from 'vite';
import { withLocalCatalog } from './seed-local-catalog.mjs';
import { setTimeout as delay } from 'node:timers/promises';
import { generateKeyPair, exportJWK, SignJWT } from 'jose';
import { Miniflare } from 'miniflare';

async function builtWorker(name) {
  const dir = new URL('../platform/' + name + '/.cloudflare/output/v1/workers/default/', import.meta.url);
  const config = JSON.parse(await readFile(new URL('worker.config.json', dir), 'utf8'));
  const file = config.manifest.mainModule;
  const contents = await readFile(new URL('bundle/' + file, dir), 'utf8');
  return { ...config, manifest: { mainModule: file, modules: { [file]: { type: 'esm', contents } } } };
}
const [jobs, api] = await Promise.all([builtWorker('jobs'), builtWorker('api')]);
const issuer = 'https://kokodal.cloudflareaccess.com';
const audience = '597640e5d38cad688539217461d7f90a3b958bcc7e261254e9c282f2cf45842f';
const { publicKey, privateKey } = await generateKeyPair('RS256');
const jwk = { ...(await exportJWK(publicKey)), kid: 'local-test' };
const token = await new SignJWT({ type: 'app', email: 'reviewer@example.test' })
  .setSubject('reviewer')
  .setProtectedHeader({ alg: 'RS256', kid: jwk.kid })
  .setIssuedAt()
  .setExpirationTime('10m')
  .setIssuer(issuer)
  .setAudience(audience)
  .sign(privateKey);
const directory = await mkdtemp(join(tmpdir(), 'wash-release-'));
process.env.WASH_LOCAL_STATE = directory;
let runtime;
let apiRuntime;
let server;
try {
  await withLocalCatalog(directory, async (db) => {
    const migrations = new URL('../platform/migrations/', import.meta.url);
    for (const file of (await readdir(migrations)).sort()) {
      if (!file.endsWith('.sql') || /^(0001|0006)_/.test(file)) continue; // Already loaded by the catalog fixture.
      const sql = await readFile(new URL(file, migrations), 'utf8');
      await db.exec(sql.replace(/^\s*--.*$/gm, '').replaceAll('\n', ' '));
    }
  });
  runtime = new Miniflare({
    resourcePersistencePath: join(directory, 'v3'),
    workers: [
      {
        config: {
          name: jobs.name,
          compatibilityDate: jobs.compatibilityDate,
          exports: jobs.exports,
          env: { DB: jobs.env.DB, REVIEW: jobs.env.REVIEW },
          manifest: jobs.manifest,
        },
        dev: {
          outboundService: {
            type: 'fetcher',
            handler: async (request) => {
              assert.equal(request.url, issuer + '/cdn-cgi/access/certs');
              return Response.json({ keys: [jwk] });
            },
          },
        },
      },
    ],
  });
  apiRuntime = new Miniflare({
    resourcePersistencePath: join(directory, 'v3'),
    workers: [
      {
        config: {
          name: api.name,
          compatibilityDate: api.compatibilityDate,
          exports: api.exports,
          manifest: api.manifest,
          env: {
            DB: api.env.DB,
            CORRECTION_LIMIT: api.env.CORRECTION_LIMIT,
            TURNSTILE_SECRET: { type: 'text', value: 'local-only' },
          },
        },
        dev: {
          outboundService: {
            type: 'fetcher',
            handler: async (request) => {
              assert.equal(request.url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
              assert.equal((await request.formData()).get('response'), 'local-token');
              return Response.json({
                success: true,
                hostname: 'wash.kokoda.fun',
                action: 'product_correction',
              });
            },
          },
        },
      },
    ],
  });
  const db = await runtime.getD1Database('DB', jobs.name);
  const current = () =>
    db.prepare('SELECT version_id FROM catalog_publication WHERE singleton=1').first('version_id');
  const base = await current();
  assert.ok(base);
  await db
    .prepare(
      "INSERT INTO review_items(id,kind,body,created_at) VALUES ('request','correction','A reader correction',datetime('now'))",
    )
    .run();
  const origin = 'https://wash.kokoda.fun';
  const request = (path, fields, requestOrigin = origin) =>
    runtime.dispatchFetch(origin + path, {
      method: fields ? 'POST' : 'GET',
      redirect: 'manual',
      headers: {
        'Cf-Access-Jwt-Assertion': token,
        Origin: requestOrigin,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: fields && new URLSearchParams(fields).toString(),
    });
  const review = '/admin/decisions/review/request';
  assert.equal((await runtime.dispatchFetch(origin + review)).status, 403);
  assert.equal((await request(review)).status, 200);
  const proposal = { kind: 'reject', base, note: 'Checked the original label' };
  assert.equal((await request(review, proposal, 'https://other.example')).status, 403);
  const response = await request(review, proposal);
  assert.equal(response.status, 303);
  const action = response.headers.get('Location');
  const actionId = action.split('/').pop();
  const instance = await (await runtime.getBindings(jobs.name)).REVIEW.get(actionId);
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
  assert.equal((await request(action, { choice: 'confirm' })).status, 303);
  await waitFor('decision application', async () => (await state()) === 'rejected');
  assert.equal((await request(action, { choice: 'confirm' })).status, 303);
  assert.equal(await db.prepare('SELECT count(*) AS n FROM audit_events').first('n'), 1);
  assert.equal(await db.prepare('SELECT reviewed_by FROM review_items').first('reviewed_by'), 'reviewer');
  server = await preview({ preview: { host: '127.0.0.1', port: 0 }, logLevel: 'error' });
  const site = 'http://127.0.0.1:' + server.httpServer.address().port;
  const productId = 'L-primus';
  const product = JSON.parse(
    await db
      .prepare('SELECT document FROM products WHERE version_id=? AND id=?')
      .bind(base, productId)
      .first('document'),
  );
  const edited = 'Local publication verification';
  async function checkProduct(name) {
    const response = await fetch(site + '/p/' + productId);
    assert.equal(response.status, 200);
    assert.ok((await response.text()).includes(name));
  }
  await checkProduct(product.name);
  const id = crypto.randomUUID();
  const submitted = await apiRuntime.dispatchFetch(origin + '/api/platform/corrections', {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      product: productId,
      message: 'Please verify the published product name',
      token: 'local-token',
    }),
  });
  assert.equal(submitted.status, 201, await submitted.text());
  assert.ok((await (await request('/admin')).text()).includes('correction-' + id));
  const fields = new URLSearchParams({
    kind: 'edit',
    base,
    note: 'Reviewed source',
    product: productId,
    name: edited,
    type: product.type,
    materials: product.materials,
    sizes: product.sizes,
  });
  for (const step of product.steps) fields.append('steps', step);
  for (const note of product.notes) fields.append('notes', note);
  for (const [scene, ratio, tool] of product.dilutions) {
    fields.append('scene', scene);
    fields.append('ratio', ratio);
    fields.append('tool', tool);
  }
  async function confirm(proposal) {
    assert.equal(proposal.status, 303);
    const action = proposal.headers.get('Location');
    const actionId = action.split('/').pop();
    assert.equal((await request(action, { choice: 'confirm' })).status, 303);
    await waitFor(
      'confirmed publication',
      async () =>
        (await db.prepare('SELECT state FROM review_actions WHERE id=?').bind(actionId).first('state')) ===
        'applied',
    );
  }
  const change = await request('/admin/decisions/review/correction-' + id, fields);
  await checkProduct(product.name);
  await confirm(change);
  const release = await current();
  assert.notEqual(release, base);
  await checkProduct(edited);
  await confirm(
    await request('/admin/decisions/history', { base: release, to: base, note: 'Verify rollback' }),
  );
  assert.equal(await current(), base);
  await checkProduct(product.name);
  console.log(
    'Verified reader correction, Access review, confirmed Workflow publication, the live page change and rollback on one build.',
  );
} finally {
  await server?.close();
  await apiRuntime?.dispose();
  await runtime?.dispose();
  await rm(directory, { recursive: true, force: true });
}
