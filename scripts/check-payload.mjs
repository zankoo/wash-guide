import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { preview } from 'vite';
import { withLocalCatalog } from './seed-local-catalog.mjs';

const state = mkdtempSync(join(tmpdir(), 'wash-preview-'));
process.env.WASH_LOCAL_STATE = state;
try {
  await withLocalCatalog(state, async (db) => {
    const server = await preview({ preview: { host: '127.0.0.1', port: 0 }, logLevel: 'error' });
    try {
      const origin = 'http://127.0.0.1:' + server.httpServer.address().port;
      async function read(path, { rsc = false, status = 200 } = {}) {
        const response = await fetch(origin + path, { headers: rsc ? { RSC: '1', Accept: 'text/x-component' } : {} });
        assert.equal(response.status, status, path);
        const type = path === '/catalog-sw.js' ? 'javascript' : path === '/sitemap.xml' ? 'xml' : rsc ? 'text/x-component' : 'text/html';
        assert.ok(response.headers.get('content-type')?.includes(type), path + ' expected ' + type);
        return await response.text();
      }
      for (const [path, htmlBudget, rscBudget] of [['/', 140000, 120000], ['/flows', 140000, 90000]]) {
        for (const [rsc, budget] of [[false, htmlBudget], [true, rscBudget]]) {
          const body = await read(path, { rsc });
          assert.ok(body.includes('L-primus'), path + ' must render the catalog');
          const bytes = gzipSync(body).length;
          console.log(path, rsc ? 'RSC' : 'HTML', bytes, '/', budget, 'B gzip');
          assert.ok(bytes <= budget, path + ' exceeds payload budget');
        }
      }

      // Exercise a real publication on the same running Worker without touching
      // the developer's local catalog or any production binding.
      const previous = await db.prepare('SELECT version_id FROM catalog_publication WHERE singleton = 1').first('version_id');
      const beforeScript = await read('/catalog-sw.js');
      assert.ok(beforeScript.includes(JSON.stringify(previous)));
      const version = 'release-under-test';
      const id = 'published-product';
      const flow = 'published-flow';
      await db.batch([
        db.prepare("INSERT INTO catalog_versions(id, source_commit, content_sha256, state, product_count, flow_count) VALUES (?, 'test', 'test', 'published', 1, 1)").bind(version),
        db.prepare(`INSERT INTO products SELECT ?, ?, brand_id, category_id, 'Release Product', description, source_url, position,
          json_set(document, '$.id', ?, '$.name', 'Release Product') FROM products WHERE version_id = ? AND id = 'L-primus'`).bind(version, id, id, previous),
        db.prepare(`INSERT INTO flows SELECT ?, ?, brand_id, 'Release Flow', kind, position,
          json_set(json_remove(document, '$.branch'), '$.id', ?, '$.name', 'Release Flow', '$.steps', json_array(json_object('phase', 'Test', 'products', json_array(?))))
          FROM flows WHERE version_id = ? AND kind = 'off' ORDER BY position LIMIT 1`).bind(version, flow, flow, id, previous),
        db.prepare('INSERT INTO flow_products VALUES (?, ?, ?)').bind(version, flow, id),
        db.prepare('UPDATE catalog_publication SET version_id = ? WHERE singleton = 1').bind(version),
      ]);
      for (const rsc of [false, true]) {
        assert.ok((await read('/', { rsc })).includes('Release Product'));
        assert.ok((await read('/flows', { rsc })).includes('Release Flow'));
        const detail = await read('/p/' + id, { rsc });
        assert.ok(detail.includes('Release Product') && detail.includes('Release Flow'));
      }
      await read('/p/L-primus', { status: 404 });
      assert.ok((await read('/catalog-sw.js')).includes(JSON.stringify(version)));
      const sitemap = await read('/sitemap.xml');
      assert.ok(sitemap.includes('/p/' + id) && !sitemap.includes('/p/L-primus'));
      await db.prepare('UPDATE catalog_publication SET version_id = ? WHERE singleton = 1').bind(previous).run();
      assert.ok((await read('/')).includes('L-primus'));
      assert.ok(!(await read('/flows')).includes('Release Flow'));
      await read('/p/L-primus');
      await read('/p/' + id, { status: 404 });
      assert.ok(!(await read('/sitemap.xml')).includes('/p/' + id));
      assert.equal(await read('/catalog-sw.js'), beforeScript);
      console.log('Catalog publication and rollback verified on one Worker build.');
    } finally {
      await server.close();
    }
  });
} finally {
  rmSync(state, { recursive: true, force: true });
}
