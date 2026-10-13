/** 搜索用的归一化：去掉重音（PRÌMUS → primus）、全角冒号转半角（1：10 → 1:10）、转小写 */
export function fold(s: string): string {
  return s.normalize('NFD').replace(/\p{M}/gu, '').replace(/：/g, ':').toLowerCase();
}

/** 所有搜索词（空格分隔）都要命中已经 fold 过的搜索文本 */
export function matchesQuery(text: string, query: string): boolean {
  return fold(query).split(/\s+/).filter(Boolean).every((w) => text.includes(w));
}

/** 搜索结果排序用的字段，都需要先 fold */
export interface RankFields {
  /** 产品名 */
  name: string;
  /** 一句话类型说明，如「铁粉去除凝胶」 */
  type: string;
  /** 分类、子分类、适用材质 */
  tags: string;
}

/**
 * 搜索结果的相关度，按每个搜索词累加：名称开头 6、名称其他位置 5、类型开头 4、类型其他位置 3、
 * 分类 / 材质 2、其他字段 1。这样搜「铁粉」时，类型就叫「铁粉去除剂」的产品排在只在子分类里提到铁粉的产品前面。
 */
export function relevance(f: RankFields, query: string): number {
  return fold(query)
    .split(/\s+/)
    .filter(Boolean)
    .reduce((sum, w) => {
      if (f.name.startsWith(w)) return sum + 6;
      if (f.name.includes(w)) return sum + 5;
      if (f.type.startsWith(w)) return sum + 4;
      if (f.type.includes(w)) return sum + 3;
      if (f.tags.includes(w)) return sum + 2;
      return sum + 1;
    }, 0);
}
