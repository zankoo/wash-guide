import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
if (args.length > 1 || args.some((arg) => !['--json', '--help'].includes(arg))) {
  console.error('用法：pnpm data:report [--json | --help]');
  process.exit(1);
}
if (args.includes('--help')) {
  console.log('用法：pnpm data:report [--json]\n读取当前产品数据，默认打印摘要；--json 输出含产品清单的 JSON。不联网、不修改文件。');
  process.exit(0);
}

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const output = mkdtempSync(join(tmpdir(), 'wash-guide-audit-'));
try {
  // 使用项目已有 TypeScript 编译器；兼容项目最低 Node 版本，不注册全局加载钩子。
  execFileSync(process.execPath, [require.resolve('typescript/bin/tsc'),
    'src/data/index.ts', 'src/data/audit.ts', '--rootDir', 'src', '--outDir', output,
    '--module', 'commonjs', '--moduleResolution', 'node', '--target', 'ES2023',
    '--strict', '--skipLibCheck', '--esModuleInterop',
  ], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
  const { PRODUCTS } = require(join(output, 'data/index.js'));
  const { auditCatalog, formatCatalogAudit } = require(join(output, 'data/audit.js'));
  const report = auditCatalog(PRODUCTS);
  console.log(args.includes('--json') ? JSON.stringify(report, null, 2) : formatCatalogAudit(report));
} catch (error) {
  console.error(error.stdout?.toString() || error.message);
  process.exitCode = 1;
} finally {
  rmSync(output, { recursive: true, force: true });
}
