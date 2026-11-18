import { diffLines } from 'diff';
import { Parser } from 'htmlparser2';

const hidden = new Set(['script', 'style', 'template', 'noscript', 'head', 'svg']);
const blocks = new Set(['p', 'div', 'li', 'br', 'tr', 'td', 'h1', 'h2', 'h3', 'h4', 'section', 'article']);
const textLimit = 400_000;

function visibleText(bytes: Uint8Array, type: string) {
  const source = new TextDecoder().decode(bytes);
  if (type !== 'text/html') return source;
  const parts: string[] = [];
  let depth = 0;
  const parser = new Parser({
    onopentag(name) {
      if (hidden.has(name)) depth++;
      if (!depth && blocks.has(name)) parts.push('\n');
    },
    onclosetag(name) {
      if (hidden.has(name)) depth--;
      if (!depth && blocks.has(name)) parts.push('\n');
    },
    ontext(text) { if (!depth) parts.push(text); },
  }, { decodeEntities: true });
  parser.end(source);
  return parts.join('').split(/\r?\n/u).map(line => line.trim().replace(/\s+/gu, ' ')).filter(Boolean).join('\n');
}

export function compareEvidence(before: Uint8Array, after: Uint8Array, oldType: string, newType: string) {
  if (before.length <= textLimit && after.length <= textLimit && oldType.startsWith('text/') && newType.startsWith('text/')) {
    const oldText = visibleText(before, oldType);
    const newText = visibleText(after, newType);
    const changes = diffLines(oldText, newText, { maxEditLength: 192, timeout: 30 });
    if (changes) {
      const lines = changes.filter(c => c.added || c.removed).map(c => (c.added ? '+ ' : '− ') + c.value.trimEnd().replaceAll('\n', c.added ? '\n+ ' : '\n− ')).join('\n');
      return lines ? lines.slice(0, 16000) + (lines.length > 16000 ? '\n（仅展示前 16000 个字符，可下载两版原文）' : '') : '两版可见文字相同。';
    }
  }
  // For PDFs, large text files and extensive rewrites, show the actual byte
  // interval and offer both complete documents for manual comparison.
  let prefix = 0;
  let suffix = 0;
  const common = Math.min(before.length, after.length);
  while (prefix < common && before[prefix] === after[prefix]) prefix++;
  while (suffix < common - prefix && before[before.length - 1 - suffix] === after[after.length - 1 - suffix]) suffix++;
  return `前 ${prefix} 字节和末尾 ${suffix} 字节相同，中间内容从 ${before.length - prefix - suffix} 字节变为 ${after.length - prefix - suffix} 字节。下载两版文件可核对完整内容。`;
}
