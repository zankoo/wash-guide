import * as carpro from './carpro';
import * as koch from './koch';
import * as laboManiac from './labo-maniac';
import * as laboManiacFlows from './labo-maniac-flows';
import { SUBCATS, type Subcategory } from './subcategories';
import { BRAND, CAT_EN, CAT_NAME, SCENE_NAME } from './taxonomy';
import type { Combo, Flow, FlowStep, Product } from './types';

export * from './subcategories';
export * from './taxonomy';
export type * from './types';

export const PRODUCTS: Product[] = [...laboManiac.products, ...koch.products, ...carpro.products];

export type FlowEntry = (Flow & { kind: 'off' }) | (Combo & { kind: 'combo' });

export const FLOWS: FlowEntry[] = [
  ...[laboManiacFlows.flows, koch.flows, carpro.flows].flat().map((f) => ({ ...f, kind: 'off' as const })),
  ...[laboManiacFlows.combos, koch.combos, carpro.combos].flat().map((f) => ({ ...f, kind: 'combo' as const })),
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

/** 卡片上显示的最多 3 个比例标签 */
export function keyRatios(p: Product): string[] | 'accessory' | 'see-label' {
  if (!p.d.length) return 'accessory';
  const seen: string[] = [];
  for (const [, ratio] of p.d) {
    const r = ratio.split('（')[0].trim();
    if (r !== '—' && !seen.includes(r)) seen.push(r);
    if (seen.length >= 3) break;
  }
  return seen.length ? seen : 'see-label';
}

export function productSearchText(p: Product): string {
  return [p.n, p.t, p.m, CAT_NAME[p.c], CAT_EN[p.c], SUB_OF.get(p.id)?.n ?? '', BRAND[p.b], ...p.d.flat(), ...p.x].join(' ').toLowerCase();
}

export function flowSearchText(f: FlowEntry): string {
  return [
    f.name, f.en ?? '', f.sum, SCENE_NAME[f.sc], ...f.tags, ...f.x,
    f.kind === 'combo' ? f.at : '', f.branch?.n ?? '',
    ...stepsOf(f).flatMap((x) => [
      x.ph, x.r ?? '', x.how ?? '', ...(x.o ?? []),
      ...(x.vars ?? []).flatMap((v) => [v.n, v.r ?? '', v.how ?? '']),
      ...productsOfStep(x).map((id) => `${getProduct(id).n} ${getProduct(id).t}`),
    ]),
  ].join(' ').toLowerCase();
}

export const OFFICIAL_RATIO_ROWS = PRODUCTS.reduce((n, p) => n + p.d.filter((d) => /1:\d|原液/.test(d[1])).length, 0);
