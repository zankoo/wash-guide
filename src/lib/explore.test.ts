// 随机性质测试：每次运行用不同的种子随机生成大量输入，检查无论怎么组合都成立的规则。
// 失败时测试名里带种子，用 EXPLORE_SEED=<种子> pnpm test 可以原样重放。
import { describe, expect, it } from 'vitest';
import { flowItems, productItems } from '../data/catalog';
import { MATERIALS } from '../data/materials';
import { BRANDS, CATS, SCENES } from '../data/taxonomy';
import { isDead, selectCatalog } from './catalog-results';
import { convert, formatMl, isVolume, parseWater, ratios } from './dilution';
import { parseFilters, type Filters } from './filters';
import { rng, testSeed } from './rng';

const SEED = testSeed();
const r = rng(SEED);
const pick = <T,>(xs: readonly T[]): T => xs[r(xs.length)];
const MAT_IDS = MATERIALS.map(([k]) => k);
const CAT_IDS = CATS.map(([k]) => k);
const SCENE_IDS = SCENES.map(([k]) => k);
const PRODUCT_IDS = productItems.map((p) => p.id);
const WORDS = ['', '', '', '铁粉', '皮革', '镀膜', '玻璃', 'ppf', '1:10', 'gs', 'reset', '水斑', 'zzqx', '中性', 'Koch', '轮毂 酸性'];

function randomFilters(): Filters {
  const c = r(4);
  return {
    brand: r(2) ? pick(BRANDS) : '',
    material: r(2) ? pick(MAT_IDS) : '',
    category: c === 0 ? 'fav' : c === 1 ? pick(CAT_IDS) : '',
    scene: r(2) ? pick(SCENE_IDS) : '',
    query: pick(WORDS),
  };
}
/** 随机收藏：可能为空，可能含已删除产品的 id，可能重复 */
function randomFavorites(): string[] {
  const n = r(4) === 0 ? 0 : r(15);
  return Array.from({ length: n }, () => (r(8) === 0 ? `deleted-${r(5)}` : pick(PRODUCT_IDS)));
}
const run = (f: Filters, favorites: readonly string[]) => selectCatalog(productItems, flowItems, f, favorites);

describe(`随机筛选组合（种子 ${SEED}）`, () => {
  const cases = Array.from({ length: 300 }, () => ({ f: randomFilters(), favorites: randomFavorites() }));

  it('每个选项上的数字都等于点它之后的结果数，数字为 0 的选项不可点', () => {
    for (const { f, favorites } of cases) {
      const res = run(f, favorites);
      const at = (patch: Partial<Filters>) => run({ ...f, ...patch }, favorites);
      const label = JSON.stringify(f);
      for (const b of ['', ...BRANDS] as const) {
        const n = at({ brand: b }).products.length;
        expect(res.productBrandCounts[b] ?? 0, `${label} 品牌 ${b}`).toBe(n);
        // 不可点的选项点了一定是 0；可点的非「全部」、非已选选项一定有结果
        if (!isDead(res.productBrandCounts[b], f.brand === b, !b) && b && f.brand !== b) expect(n, label).toBeGreaterThan(0);
      }
      for (const m of ['', ...MAT_IDS] as const) expect(res.materialCounts[m] ?? 0, `${label} 材质 ${m}`).toBe(at({ material: m }).products.length);
      for (const c of CAT_IDS) expect(res.productCounts[c] ?? 0, `${label} 分类 ${c}`).toBe(at({ category: c }).products.length);
      expect(res.productCounts[''], `${label} 全部分类`).toBe(at({ category: '' }).products.length);
      expect(res.favoriteCount, `${label} 我的常用`).toBe(at({ category: 'fav' }).products.length);
      for (const s of ['', ...SCENE_IDS] as const) expect(res.flowSceneCounts[s] ?? 0, `${label} 场景 ${s}`).toBe(at({ scene: s }).flows.length);
      for (const b of ['', ...BRANDS] as const) expect(res.flowBrandCounts[b] ?? 0, `${label} 流程品牌 ${b}`).toBe(at({ brand: b }).flows.length);
    }
  });

  it('空结果的放宽建议给出的数字就是去掉该条件后的结果数', () => {
    for (const { f, favorites } of cases) {
      const res = run(f, favorites);
      const label = JSON.stringify(f);
      expect(res.relaxed.brand, label).toBe(run({ ...f, brand: '' }, favorites).products.length);
      expect(res.relaxed.material, label).toBe(run({ ...f, material: '' }, favorites).products.length);
      expect(res.relaxed.category, label).toBe(run({ ...f, category: '' }, favorites).products.length);
      expect(res.relaxed.query, label).toBe(run({ ...f, query: '' }, favorites).products.length);
      expect(res.flowRelaxed.brand, label).toBe(run({ ...f, brand: '' }, favorites).flows.length);
      expect(res.flowRelaxed.scene, label).toBe(run({ ...f, scene: '' }, favorites).flows.length);
      expect(res.flowRelaxed.query, label).toBe(run({ ...f, query: '' }, favorites).flows.length);
      // 收藏总数只看收藏本身，已删除产品不算
      expect(res.favoriteTotal, label).toBe(new Set(favorites.filter((id) => PRODUCT_IDS.includes(id))).size);
    }
  });

  it('多加一个条件结果只会变少，结果始终同时满足所有条件', () => {
    for (const { f, favorites } of cases) {
      const res = run(f, favorites);
      const label = JSON.stringify(f);
      for (const key of ['brand', 'material', 'category', 'query'] as const) {
        expect(res.products.length, `${label} 去掉 ${key}`).toBeLessThanOrEqual(run({ ...f, [key]: '' }, favorites).products.length);
      }
      for (const p of res.products) {
        if (f.brand) expect(p.brand, label).toBe(f.brand);
        if (f.material) expect(p.materials, label).toContain(f.material);
        if (f.category === 'fav') expect(favorites, label).toContain(p.id);
        else if (f.category) expect(p.category, label).toBe(f.category);
      }
      // 分类目录的子分类数字加起来等于列表总数
      const subs = Object.entries(res.subCounts).filter(([k]) => k).reduce((a, [, n]) => a + n, 0);
      expect(subs, label).toBe(res.products.length);
      expect(new Set(res.products.map((p) => p.id)).size, label).toBe(res.products.length);
    }
  });

  it('筛选顺序不影响结果', () => {
    for (const { f, favorites } of cases.slice(0, 60)) {
      const shuffled = [...favorites].reverse();
      expect(run(f, shuffled).products.map((p) => p.id)).toEqual(run(f, favorites).products.map((p) => p.id));
    }
  });
});

describe(`随机链接参数（种子 ${SEED}）`, () => {
  const junk = ['', 'x', 'fav', 'FAV', ' paint', 'paint,glass', 'glass,paint', ',,', '%E4%B8%AD', '<script>', 'L,M', '0', 'undefined', 'null'];
  const keys = ['brand', 'material', 'category', 'scene', 'q', 'other', 'Brand'];

  it('任意参数都不会报错，只留下有效值', () => {
    for (let i = 0; i < 500; i++) {
      const params = new URLSearchParams();
      for (let k = r(6); k > 0; k--) {
        const key = pick(keys);
        const v = r(3) === 0 ? pick(junk) : key === 'brand' ? pick(BRANDS) : key === 'material' ? pick(MAT_IDS) : key === 'category' ? pick(['fav', ...CAT_IDS]) : key === 'scene' ? pick(SCENE_IDS) : pick(WORDS);
        params.append(key, v);
      }
      const f = parseFilters(`?${params}`);
      expect(['', ...BRANDS], `${params}`).toContain(f.brand);
      expect(['', ...MAT_IDS], `${params}`).toContain(f.material);
      expect(['', 'fav', ...CAT_IDS], `${params}`).toContain(f.category);
      expect(['', ...SCENE_IDS], `${params}`).toContain(f.scene);
      expect(f.query, `${params}`).toBe(params.get('q') ?? '');
    }
  });

  it('有效的筛选写进链接再读出来保持不变', () => {
    for (let i = 0; i < 300; i++) {
      const f = randomFilters();
      const params = new URLSearchParams();
      // 与 updateFilters 相同：空值不写进链接；参数顺序随机
      const entries = Object.entries({ brand: f.brand, material: f.material, category: f.category, scene: f.scene, q: f.query });
      for (const [k, v] of entries.sort(() => r(3) - 1)) if (v) params.set(k, v);
      expect(parseFilters(`?${params}`), `${params}`).toEqual(f);
    }
  });
});

describe(`随机稀释换算（种子 ${SEED}）`, () => {
  /** 把 formatMl 的输出换回 ml */
  const back = (s: string) => {
    const m = s.match(/^([\d.]+) (ml|L)$/)!;
    return Number(m[1]) * (m[2] === 'L' ? 1000 : 1);
  };

  it('任意写法的有效水量都能解析，超出 10 ml – 100 L 的一律拒绝', () => {
    for (let i = 0; i < 500; i++) {
      const ml = r(4) === 0 ? r(200000) : 10 + r(99991);
      const asL = r(2) === 0;
      const value = asL ? ml / 1000 : ml;
      const unit = asL ? pick(['L', 'l', '升', ' L', ' 升']) : pick(['', 'ml', 'ML', ' ml', '毫升']);
      const text = `${pick(['', ' '])}${String(value).replace('.', pick(['.', '。']))}${unit}${pick(['', ' '])}`;
      const want = isVolume(ml) ? Math.round(ml) : null;
      expect(parseWater(text), text).toBe(want);
    }
    for (const bad of ['-5', '1e4', '5,000', '1/2 L', 'ml', 'L 2', '3 gal', '２L']) expect(parseWater(bad), bad).toBeNull();
  });

  it('任意比例和水量：原液用量 = 水量 ÷ 比例，范围比例按顺序给出两个结果', () => {
    for (let i = 0; i < 500; i++) {
      const a = 1 + r(500);
      const b = a + 1 + r(1000);
      const range = r(2) === 0;
      const ratio = range ? `1:${a} – 1:${b}` : `1:${a}`;
      const water = r(3) === 0 ? 'auto' : 10 + r(99991);
      const tool = pick(['PA壶', '喷雾壶', '桶洗', '海绵', '—']);
      const w = water === 'auto' ? { PA壶: 300, 喷雾壶: 2000, 桶洗: 10000 }[tool as string] ?? 1000 : water;
      const parts = convert(ratio, tool, water).split('　～　');
      const xs = range ? [a, b] : [a];
      expect(parts.length, ratio).toBe(xs.length);
      parts.forEach((part, k) => {
        const m = part.match(/^水 (.+) \+ 原液 (.+)$/)!;
        expect(m, part).not.toBeNull();
        expect(m[1]).toBe(formatMl(w));
        const dose = back(m[2]);
        // 显示时会四舍五入：1 L 以上保留 0.1 L，10 ml 以上取整，10 ml 以下保留 0.1 ml
        expect(Math.abs(dose - w / xs[k]), `${ratio} ${w} → ${part}`).toBeLessThanOrEqual((w / xs[k] >= 1000 ? 50 : w / xs[k] >= 10 ? 0.5 : 0.05) + 1e-9);
      });
    }
  });

  it('原液、即用和用量写法', () => {
    for (let i = 0; i < 50; i++) {
      const vol = r(2) ? 'auto' : 10 + r(99991);
      expect(convert('原液', '—', vol)).toBe('直接用原液');
      expect(convert(pick(['即用', '即用（喷雾瓶）']), '—', vol)).toBe('');
      expect(ratios(`${1 + r(5)} 瓶盖 / 4 L`)).toEqual([]);
    }
  });
});
