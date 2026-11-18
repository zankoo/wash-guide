import { readFile } from 'node:fs/promises';
import { Miniflare } from 'miniflare';

export async function localLibraryApi() {
  const built = new URL('../platform/api/.cloudflare/output/v1/workers/default/', import.meta.url);
  const spec = JSON.parse(await readFile(new URL('worker.config.json', built), 'utf8'));
  const entry = spec.manifest.mainModule;
  const contents = await readFile(new URL('bundle/' + entry, built), 'utf8');
  const runtime = new Miniflare({
    workers: [
      {
        config: {
          name: spec.name,
          compatibilityDate: spec.compatibilityDate,
          exports: spec.exports,
          env: {
            DB: { type: 'd1', id: 'private-local' },
            DEVICES: spec.env.DEVICES,
            LIBRARY_LIMIT: spec.env.LIBRARY_LIMIT,
            PAIR_LIMIT: spec.env.PAIR_LIMIT,
          },
          manifest: { mainModule: entry, modules: { [entry]: { type: 'esm', contents } } },
        },
      },
    ],
  });
  try {
    const db = await runtime.getD1Database('DB');
    for (const migration of ['0001_catalog', '0010_library']) {
      const sql = await readFile(
        new URL('../platform/migrations/' + migration + '.sql', import.meta.url),
        'utf8',
      );
      await db.exec(sql.replace(/^\s*--.*$/gm, '').replaceAll('\n', ' '));
    }
    return runtime;
  } catch (error) {
    await runtime.dispose();
    throw error;
  }
}
