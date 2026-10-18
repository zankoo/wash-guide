import * as bola from './bola';
import * as carpro from './carpro';
import * as gyeon from './gyeon';
import * as feynlab from './feynlab';
import * as koch from './koch';
import * as mafra from './mafra';
import * as laboManiac from './labo-maniac';
import * as laboManiacFlows from './labo-maniac-flows';
import * as ps from './ps';
import { SUBCATS, type Subcategory } from './subcategories';
import { BRAND, CAT_EN, CAT_NAME, SCENE_NAME } from './taxonomy';
import type { Combo, Flow, FlowStep, Product } from './types';
import { fold, type RankFields } from '../lib/search';

export * from './materials';
export * from './subcategories';
export * from './taxonomy';
export type * from './types';

export const PRODUCTS: Product[] = [...laboManiac.products, ...mafra.products, ...koch.products, ...carpro.products, ...gyeon.products, ...bola.products, ...feynlab.products, ...ps.products];

export type FlowEntry = (Flow & { kind: 'off' }) | (Combo & { kind: 'combo' });

export const FLOWS: FlowEntry[] = [
  ...[laboManiacFlows.flows, mafra.flows, koch.flows, carpro.flows, gyeon.flows, bola.flows, feynlab.flows, ps.flows].flat().map((f) => ({ ...f, kind: 'off' as const })),
  ...[laboManiacFlows.combos, mafra.combos, koch.combos, carpro.combos, gyeon.combos].flat().map((f) => ({ ...f, kind: 'combo' as const })),
];

export const PRODUCT_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));
export const FLOW_BY_ID = new Map(FLOWS.map((f) => [f.id, f]));

export function getProduct(id: string): Product {
  const p = PRODUCT_BY_ID.get(id);
  if (!p) throw new Error(`Unknown product id: ${id}`);
  return p;
}

/** 官网没有提供产品图（或图片已失效）的产品，显示名称卡片 */
export const NO_IMAGE = new Set([
  'K-ceramic-neo-c003', 'K-ceramic-glass-cg001', 'K-plast-shield', 'K-perfectfinish-sealant', 'K-wetgloss',
  'K-quick-shine-plus', 'K-allround-quick-shine', 'K-nanomagic-plast-care', 'K-speed-glass-cleaner',
  'K-multi-interior-cleaner', 'K-leather-star', 'K-protect-leather-care',
  'B-pf1',
]);

/** 产品图全部是 public/img 下的本地 webp（720×720 白底） */
export function imageSrc(p: Product): string | undefined {
  return NO_IMAGE.has(p.id) ? undefined : `/img/${p.id}.webp`;
}

export const SUB_OF = new Map<string, Subcategory>(SUBCATS.flatMap((s) => s.ids.map((id) => [id, s] as const)));

/** 产品在页面上的排序位置：子分类顺序 → 子分类内顺序 */
export const PRODUCT_RANK = new Map(SUBCATS.flatMap((s) => s.ids).map((id, i) => [id, i]));

export const stepsOf = (f: Flow): FlowStep[] => [...f.steps, ...(f.branch?.steps ?? [])];
export const productsOfStep = (x: FlowStep): string[] => [...(x.p ?? []), ...(x.vars ?? []).flatMap((v) => v.p ?? [])];

export const flowsUsing = (id: string): FlowEntry[] =>
  FLOWS.filter((f) => stepsOf(f).some((x) => productsOfStep(x).includes(id)));

/** 卡片标签只放简短的用量：带数字（1:10、3 瓶盖 / 10 L 水、每车 30 g）或原液 / 即用，文字说明留在详情页 */
const PILL_MAX = 14;
const isPill = (r: string) => r.length <= PILL_MAX && (/\d/.test(r) || /^(原液|即用)/.test(r));

/**
 * 标签的浓度 [最浓一端, 最稀一端]：原液 / 即用最浓（0），比例 1:5 – 1:10 → [5, 10]。
 * 瓶盖、每车用量等换算不成比例的排在最后。
 */
function strength(r: string): [number, number] {
  const ratios = [...r.matchAll(/1\s*:\s*(\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
  const strong = /^(原液|即用)/.test(r) ? 0 : (ratios[0] ?? Infinity);
  // 最浓一端相同时，再比较最稀的一端（1:100 – 1:200 排在 1:100 – 1:400 前面）
  return [strong, ratios.at(-1) ?? strong];
}

/** 卡片上显示的最多 3 个比例标签：取详情页里最常用的前 3 个，再按浓度从浓到淡排列 */
export function keyRatios(p: Product): string[] | 'accessory' | 'see-label' {
  if (!p.d.length) return 'accessory';
  const seen: string[] = [];
  for (const [, ratio] of p.d) {
    const r = ratio.split('（')[0].trim();
    if (isPill(r) && !seen.includes(r)) seen.push(r);
    if (seen.length >= 3) break;
  }
  if (!seen.length) return 'see-label';
  return seen.map((r, i) => ({ r, i, k: strength(r) })).sort((a, b) => a.k[0] - b.k[0] || a.k[1] - b.k[1] || a.i - b.i).map((x) => x.r);
}

/** 搜索排序用的字段（见 relevance） */
export function productRankFields(p: Product): RankFields {
  return { name: fold(p.n), type: fold(p.t), tags: fold([SUB_OF.get(p.id)?.n ?? '', CAT_NAME[p.c], p.m].join(' ')) };
}

export function productSearchText(p: Product): string {
  const sub = SUB_OF.get(p.id)?.n ?? '';
  return fold([p.n, p.t, p.m, CAT_NAME[p.c], CAT_EN[p.c], sub, BRAND[p.b], ...p.d.flat(), ...p.x].join(' '));
}

export function flowSearchText(f: FlowEntry): string {
  return fold([
    f.name, f.en ?? '', f.sum, SCENE_NAME[f.sc], ...f.tags, ...f.x,
    f.kind === 'combo' ? f.at : '', f.branch?.n ?? '',
    ...stepsOf(f).flatMap((x) => [
      x.ph, x.r ?? '', x.how ?? '', ...(x.o ?? []),
      ...(x.vars ?? []).flatMap((v) => [v.n, v.r ?? '', v.how ?? '']),
      ...productsOfStep(x).map((id) => `${getProduct(id).n} ${getProduct(id).t}`),
    ]),
  ].join(' '));
}

export const OFFICIAL_RATIO_ROWS = PRODUCTS.reduce((n, p) => n + p.d.filter((d) => /1:\d|原液/.test(d[1])).length, 0);
