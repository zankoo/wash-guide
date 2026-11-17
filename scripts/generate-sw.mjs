import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const hash = createHash('sha256');
function add(path) {
  for (const entry of readdirSync(join(root, path), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const name = join(path, entry.name);
    if (name === 'public/sw.js') continue;
    if (entry.isDirectory()) add(name);
    else if (entry.isFile()) hash.update(name).update(readFileSync(join(root, name)));
  }
}
add('src');
add('public');
for (const file of ['pnpm-lock.yaml', 'next.config.ts', 'vite.config.ts', 'cloudflare.config.ts']) hash.update(readFileSync(join(root, file)));
const version = hash.digest('hex').slice(0, 16);
const source = readFileSync(join(root, 'src/offline/service-worker.js'), 'utf8');
writeFileSync(join(root, 'public/sw.js'), source.replace('__BUILD_VERSION__', version));
console.log(`Offline cache version: ${version}`);
