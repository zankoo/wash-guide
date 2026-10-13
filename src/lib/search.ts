/** 所有搜索词（空格分隔）都要命中小写的搜索文本 */
export function matchesQuery(text: string, query: string): boolean {
  return query.toLowerCase().split(/\s+/).filter(Boolean).every((w) => text.includes(w));
}
