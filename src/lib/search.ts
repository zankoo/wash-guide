/** 搜索用的归一化：去掉重音（PRÌMUS → primus）、全角冒号转半角（1：10 → 1:10）、转小写 */
export function fold(s: string): string {
  return s.normalize('NFD').replace(/\p{M}/gu, '').replace(/：/g, ':').toLowerCase();
}

/** 所有搜索词（空格分隔）都要命中已经 fold 过的搜索文本 */
export function matchesQuery(text: string, query: string): boolean {
  return fold(query).split(/\s+/).filter(Boolean).every((w) => text.includes(w));
}
