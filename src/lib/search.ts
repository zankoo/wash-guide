/** 搜索用的归一化：去掉重音（PRÌMUS → primus）、全角冒号转半角（1：10 → 1:10）、转小写 */
export function fold(s: string): string {
  return s.normalize('NFD').replace(/\p{M}/gu, '').replace(/：/g, ':').toLowerCase();
}

/**
 * 名称的首字母缩写，用于按首字母搜索（Vorreiniger B → vb、Magic Wheel Cleaner → mwc）。
 * 驼峰写法再拆一次（ReactiveWheelCleaner → rwc、NanoMagic Shampoo → nms，同时保留 ns），
 * 纯数字词（H9.02 的 02）不计入，带字母的型号取首字母（H9.02 → h）。只有一个词的名称不生成缩写。
 */
export function initials(name: string): string[] {
  const variants = [name, name.replace(/(\p{Ll})(\p{Lu})/gu, '$1 $2')].map((s) =>
    (fold(s).match(/[a-z0-9]+/g) ?? []).filter((w) => /[a-z]/.test(w)).map((w) => w[0]).join(''),
  );
  return [...new Set(variants)].filter((a) => a.length >= 2);
}

/** 可以按首字母匹配的搜索词：至少 2 个字母 / 数字 */
const isAbbrQuery = (w: string) => /^[a-z0-9]{2,}$/.test(w);

const abbrHit = (abbr: readonly string[], w: string) => isAbbrQuery(w) && abbr.some((a) => a.startsWith(w));

/** 用途词扩展；每组内取任一同义词，空格分开的组仍取交集。 */
const SYNONYMS: Record<string, string[]> = {
  '大灯发黄': ['大灯', 'headlight'], '车灯发黄': ['大灯', 'headlight'],
  '发黄': ['发黄', '大灯', '氧化'], '黄灯': ['大灯', 'headlight'],
  '铁锈': ['铁锈', '铁粉', '锈迹'], '铁粉': ['铁粉', '除铁'],
  '水印': ['水印', '水斑', '水垢'], '水渍': ['水渍', '水斑', '水垢'],
  '油膜': ['油膜', '玻璃抛光'], '树胶': ['树胶', '树脂'],
  '鸟屎': ['鸟屎', '鸟粪'], '虫子': ['虫尸', '飞虫'],
  '轮胎发褐': ['轮胎', '橡胶'], '皮座椅': ['皮革'],
};
function terms(query: string): string[][] {
  return fold(query).split(/\s+/).filter(Boolean).map((w) => SYNONYMS[w] ?? [w]);
}
export function matchesQuery(text: string, query: string, abbr: readonly string[] = []): boolean {
  return terms(query).every((words) => words.some((w) => text.includes(w) || abbrHit(abbr, w)));
}
export function suggestions(query: string): string[] {
  const related = Object.entries(SYNONYMS).filter(([k]) => k.includes(query) || query.includes(k)).flatMap(([, words]) => words);
  return [...new Set(related.length ? related : ['大灯', '铁粉', '水斑', '皮革'])].slice(0, 4);
}

/** 搜索结果排序用的字段，都需要先 fold */
export interface RankFields {
  /** 产品名 */
  name: string;
  /** 一句话类型说明，如「铁粉去除凝胶」 */
  type: string;
  /** 分类、子分类、适用材质 */
  tags: string;
  /** 产品名的首字母缩写（见 initials） */
  abbr: string[];
}

/**
 * 搜索结果的相关度，按每个搜索词累加：名称开头 6、名称其他位置 5、类型开头 4、类型其他位置 3、
 * 分类 / 材质 2、其他字段 1。这样搜「铁粉」时，类型就叫「铁粉去除剂」的产品排在只在子分类里提到铁粉的产品前面。
 * 首字母缩写命中（搜 vb 找到 Vorreiniger B）和名称开头同分。
 */
export function relevance(f: RankFields, query: string): number {
  return fold(query)
    .split(/\s+/)
    .filter(Boolean)
    .reduce((sum, w) => {
      if (f.name.startsWith(w)) return sum + 6;
      if (abbrHit(f.abbr, w)) return sum + 6;
      if (f.name.includes(w)) return sum + 5;
      if (f.type.startsWith(w)) return sum + 4;
      if (f.type.includes(w)) return sum + 3;
      if (f.tags.includes(w)) return sum + 2;
      return sum + 1;
    }, 0);
}
