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
import { BRAND, CAT_EN, CAT_NAME, PH_SHORT, SCENE_NAME } from './taxonomy';
import type { Combo, Flow, FlowStep, Product } from './types';
import { phEvidenceNotes } from './ph';
import { fold, initials, type RankFields } from '../lib/search';

export * from './materials';
export * from './subcategories';
export * from './taxonomy';
export * from './sds-sources';
export * from './ph';
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

/** 产品图全部是 public/img 下的本地 webp（720×720 白底） */
export function imageSrc(p: Product): string | undefined {
  return p.image === null ? undefined : p.image ?? `/img/${p.id}.webp`;
}

export const SUB_OF = new Map<string, Subcategory>(SUBCATS.flatMap((s) => s.ids.map((id) => [id, s] as const)));

/** 产品在页面上的排序位置：子分类顺序 → 子分类内顺序 */
export const PRODUCT_RANK = new Map(SUBCATS.flatMap((s) => s.ids).map((id, i) => [id, i]));

export const stepsOf = (f: Flow): FlowStep[] => [...f.steps, ...(f.branch?.steps ?? [])];
export const productsOfStep = (x: FlowStep): string[] => [...(x.products ?? []), ...(x.variants ?? []).flatMap((v) => v.products ?? [])];

export const flowsUsing = (id: string): FlowEntry[] =>
  FLOWS.filter((f) => stepsOf(f).some((x) => productsOfStep(x).includes(id)));

/** 只展示最常用的一项，保留工具 / 场景，完整用法在详情表。 */
export function keyRatios(p: Product): string[] | 'accessory' | 'see-label' {
  if (!p.dilutions.length) return p.category === 'acc' ? 'accessory' : 'see-label';
  const row = p.dilutions.find(([scene, ratio]) => !/VDA|最高使用浓度/.test(scene) && /\d|原液|即用/.test(ratio));
  if (!row) return 'see-label';
  const [scene, ratio, tool] = row;
  const label = tool && tool !== '—' && !scene.includes(tool) ? `${tool} · ${scene}` : scene;
  return [`${label} ${ratio.split('（')[0].trim()}`];
}

/** 搜索排序用的字段（见 relevance） */
export function productRankFields(p: Product): RankFields {
  return { name: fold(p.name), type: fold(p.type), tags: fold([SUB_OF.get(p.id)?.name ?? '', CAT_NAME[p.category], p.materials].join(' ')), abbr: initials(p.name) };
}

export function productSearchText(p: Product): string {
  const sub = SUB_OF.get(p.id)?.name ?? '';
  return fold([p.name, p.type, p.materials, CAT_NAME[p.category], CAT_EN[p.category], sub, BRAND[p.brand], phText(p) ?? '', ...p.dilutions.flat(), ...p.notes, ...phEvidenceNotes(p.ph)].join(' '));
}

/** pH 标签文字：「碱性 12.5」；官方未公布或不适用时返回 undefined */
export function phText(p: Product): string | undefined {
  if (!p.ph || p.ph.category === 'na') return undefined;
  const { category: k, value: v } = p.ph;
  const label = k === 'acid' && v && /^\d+(?:\.\d+)?$/.test(v) && Number(v) >= 5 && Number(v) <= 6 ? '弱酸' : PH_SHORT[k];
  return v ? `${label} ${v}` : label;
}

/** 流程按首字母搜索用的缩写：流程英文名和用到的产品名（搜 vb 找到用了 Vorreiniger B 的流程） */
export function flowInitials(f: FlowEntry): string[] {
  const names = [f.en ?? '', ...stepsOf(f).flatMap((x) => productsOfStep(x).map((id) => getProduct(id).name))];
  return [...new Set(names.flatMap(initials))];
}

export function flowSearchText(f: FlowEntry): string {
  return fold([
    f.name, f.en ?? '', f.summary, SCENE_NAME[f.scene], ...f.tags, ...f.notes,
    f.kind === 'combo' ? f.at : '', f.branch?.name ?? '',
    ...stepsOf(f).flatMap((x) => [
      x.phase, x.ratio ?? '', x.how ?? '', ...(x.extras ?? []),
      ...(x.variants ?? []).flatMap((v) => [v.name, v.ratio ?? '', v.how ?? '']),
      ...productsOfStep(x).map((id) => `${getProduct(id).name} ${getProduct(id).type}`),
    ]),
  ].join(' '));
}

export const OFFICIAL_RATIO_ROWS = PRODUCTS.reduce((n, p) => n + p.dilutions.filter((d) => /1:\d|原液/.test(d[1])).length, 0);
