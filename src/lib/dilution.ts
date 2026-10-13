// 稀释比例换算：1:10 = 1 份原液 + 10 份水

/** 'auto' 按施工工具取常用水量，数字是用户选定或自定义的水量（ml） */
export type Volume = 'auto' | number;

export const VOLUMES: [Volume, string][] = [
  ['auto', '常用'],
  [300, '300ml'],
  [1000, '1L'],
  [2000, '2L'],
  [10000, '10L'],
];

/** 自定义水量的允许范围：10 ml – 100 L */
export const isVolume = (v: unknown): v is Volume =>
  v === 'auto' || (typeof v === 'number' && Number.isFinite(v) && v >= 10 && v <= 100000);

/** 解析用户输入的水量：「750」「750ml」「1.5L」「1.5 升」都可以，单位缺省为 ml；无效时返回 null */
export function parseWater(input: string): number | null {
  const m = input.trim().replace(/[。．]/g, '.').match(/^(\d+(?:\.\d+)?)\s*(ml|毫升|l|升)?$/i);
  if (!m) return null;
  const ml = /^(l|升)$/i.test(m[2] ?? '') ? Number(m[1]) * 1000 : Number(m[1]);
  return isVolume(ml) ? Math.round(ml) : null;
}

/** 「常用」模式下按施工工具取水量 */
const AUTO_WATER: [RegExp, number][] = [
  [/PA壶/, 300],
  [/喷雾壶/, 2000],
  [/桶洗/, 10000],
];

export function autoWater(tool: string): number {
  for (const [re, w] of AUTO_WATER) if (re.test(tool)) return w;
  return 1000;
}

/** 从比例文本中提取 1:x 的 x；原液记为 0 */
export function ratios(r: string): number[] {
  const out: number[] = [];
  if (/原液/.test(r)) out.push(0);
  for (const m of r.matchAll(/1:(\d+)/g)) out.push(+m[1]);
  // 「瓶盖」「滴」「喷」等用量写法无法换算，只保留原液
  if (/瓶盖|滴|喷/.test(r) && !/^(最高 )?1:/.test(r)) return out.filter((x) => x === 0);
  return out;
}

export function formatMl(ml: number): string {
  if (ml >= 1000) return `${(Math.round(ml / 100) / 10).toString().replace(/\.0$/, '')} L`;
  if (ml < 10) return `${Math.round(ml * 10) / 10} ml`;
  return `${Math.round(ml)} ml`;
}

/** 按水量换算原液用量，无法换算时返回空串 */
export function convert(ratio: string, tool: string, vol: Volume): string {
  if (/即用/.test(ratio)) return '';
  const xs = [...new Set(ratios(ratio))];
  if (!xs.length) return '';
  const water = vol === 'auto' ? autoWater(tool) : vol;
  return xs.map((x) => (x === 0 ? '直接用原液' : `水 ${formatMl(water)} + 原液 ${formatMl(water / x)}`)).join('　～　');
}
