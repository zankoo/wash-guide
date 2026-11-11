import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

// gzip 预算只统计 HTML/RSC，不声称是图片、JS 和字体的总传输量。
const budgets = { 'index.html': 140000, 'index.rsc': 120000, 'flows.html': 140000, 'flows.rsc': 90000 };
let failed = false;
for (const [file, budget] of Object.entries(budgets)) {
  const raw = readFileSync(new URL(`../.next/server/app/${file}`, import.meta.url));
  const bytes = gzipSync(raw).length;
  console.log(`${file}: raw ${raw.length} B; gzip ${bytes} / ${budget} B`);
  if (bytes > budget) failed = true;
}
if (failed) {
  console.error('页面传输超过预算：检查是否意外发送了完整详情或另一视图的数据。');
  process.exitCode = 1;
}
