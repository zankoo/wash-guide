import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { Miniflare } from 'miniflare';
import config from '../cloudflare.config.ts';

// Use the Vite simulator's namespace and id. Nothing here opens a remote binding.
export async function withLocalCatalog(stateDirectory, run) {
  const runtime = new Miniflare({
    resourcePersistencePath: resolve(stateDirectory, 'v3'),
    workers: [{ config: {
      name: 'catalog-local',
      compatibilityDate: config.worker.compatibilityDate,
      manifest: { mainModule: 'local.js', modules: { 'local.js': { type: 'esm', contents: 'export default {}' } } },
      env: { DB: config.worker.env.DB },
    } }],
  });
  try {
    const db = await runtime.getD1Database('DB');
    const exists = await db.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name='catalog_publication'").first();
    if (!exists) {
      const directory = mkdtempSync(join(tmpdir(), 'wash-local-d1-'));
      try {
        const file = join(directory, 'statements.json');
        execFileSync(process.execPath, ['scripts/catalog-export.mjs', file, '--statements']);
        const schema = readFileSync('platform/migrations/0001_catalog.sql', 'utf8');
        const tables = schema.split(';').map(sql => sql.trim()).filter(Boolean);
        const rows = JSON.parse(readFileSync(file, 'utf8'));
        await db.batch([...tables, ...rows].map(sql => db.prepare(sql)));
        console.log('Local D1 catalog initialized.');
      } finally {
        rmSync(directory, { recursive: true, force: true });
      }
    }
    await db.prepare(readFileSync('platform/migrations/0006_catalog_reads.sql', 'utf8')).run();
    return await run(db);
  } finally {
    await runtime.dispose();
  }
}

if (import.meta.main) {
  await withLocalCatalog(process.env.WASH_LOCAL_STATE || '.cloudflare/state', async () => {});
}
