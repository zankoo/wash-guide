import { SUBCATS, otherSubcategory, type Subcategory } from './subcategories';
import { BRAND, CAT_EN, CAT_NAME, PH_SHORT, SCENE_NAME } from './taxonomy';
import type { Combo, Flow, FlowStep, PH, Product } from './types';
import { PH_BASIS_LABEL, phEvidenceNotes } from './ph';
import { cautionTexts } from './cautions';
import { fold, initials, type RankFields } from '../lib/search';

export type FlowEntry = (Flow & { kind: 'off' }) | (Combo & { kind: 'combo' });

/** 产品图全部是 public/img 下的本地 webp（720×720 白底） */
export function imageSrc(p: Pick<Product, 'id' | 'image'>): string | undefined {
  return p.image === null ? undefined : p.image ?? `/img/${p.id}.webp`;
}

export const SUB_OF = new Map<string, Subcategory>(SUBCATS.flatMap((s) => s.ids.map((id) => [id, s] as const)));

export function subcategoryOf(p: Product): Subcategory {
  const sub = SUB_OF.get(p.id);
  return sub?.category === p.category ? sub : otherSubcategory(p.category);
}

/** 产品在页面上的排序位置：子分类顺序 → 子分类内顺序 */
export const PRODUCT_RANK = new Map(SUBCATS.flatMap((s) => s.ids).map((id, i) => [id, i]));

export const stepsOf = (f: Flow): FlowStep[] => [...f.steps, ...(f.branch?.steps ?? [])];
export const productsOfStep = (x: FlowStep): string[] => [...(x.products ?? []), ...(x.variants ?? []).flatMap((v) => v.products ?? [])];

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
  return { name: fold(p.name), type: fold(p.type), tags: fold([subcategoryOf(p).name, CAT_NAME[p.category], p.materials].join(' ')), abbr: initials(p.name) };
}

export function productSearchText(p: Product): string {
  const sub = subcategoryOf(p).name;
  return fold([p.name, p.type, p.materials, CAT_NAME[p.category], CAT_EN[p.category], sub, BRAND[p.brand], phText(p) ?? '', ...p.dilutions.flat(), ...cautionTexts(p.cautions), ...p.notes, ...phEvidenceNotes(p.ph)].join(' '));
}

/** pH 标签主体：「碱性 12.5」，不含测量口径；官方未公布或不适用时返回 undefined */
export function phValueText(p: Product): string | undefined {
  if (!p.ph || p.ph.category === 'na') return undefined;
  const { category: k, value: v } = p.ph;
  const label = k === 'acid' && v && /^\d+(?:\.\d+)?$/.test(v) && Number(v) >= 5 && Number(v) <= 6 ? '弱酸' : PH_SHORT[k];
  return v ? `${label} ${v}` : label;
}

/** 非原液口径的说明：「1% 稀释液」；原液返回 undefined */
export function phBasisText(p: Product): string | undefined {
  return p.ph && p.ph.basis !== 'raw' ? PH_BASIS_LABEL[p.ph.basis] : undefined;
}

/** 完整 pH 标签文字：「碱性 12.5」「中性 7 · 1% 稀释液」 */
export function phText(p: Product): string | undefined {
  const text = phValueText(p);
  const basis = phBasisText(p);
  return text && basis ? `${text} · ${basis}` : text;
}

/**
 * 卡片和详情页共用的 pH 显示：每个产品都有一条，写法固定。
 * label 是主体（「碱性 · pH 12.5」），basis 是非原液时的测量口径（「1% 稀释液」）。
 */
export function phDisplay(p: Product): { category: PH | 'none'; label: string; basis?: string } {
  if (p.category === 'acc') return { category: 'none', label: '配件，无 pH' };
  if (!p.ph) return { category: 'none', label: 'pH 官方未公布' };
  if (p.ph.category === 'na') return { category: 'none', label: 'pH 不适用（官方标注）' };
  const short = phValueText(p)!.split(' ')[0];
  return { category: p.ph.category, label: p.ph.value ? `${short} · pH ${p.ph.value}` : `${short} · 无具体数值`, basis: phBasisText(p) };
}

type ProductLookup = (id: string) => Pick<Product, 'name' | 'type'>;

/** 流程按首字母搜索用的缩写：流程英文名和用到的产品名（搜 vb 找到用了 Vorreiniger B 的流程） */
export function flowInitials(f: FlowEntry, product: ProductLookup): string[] {
  const names = [f.en ?? '', ...stepsOf(f).flatMap((x) => productsOfStep(x).map((id) => product(id).name))];
  return [...new Set(names.flatMap(initials))];
}

export function flowSearchText(f: FlowEntry, product: ProductLookup): string {
  return fold([
    f.name, f.en ?? '', f.summary, SCENE_NAME[f.scene], ...f.tags, ...f.notes,
    f.kind === 'combo' ? f.at : '', f.branch?.name ?? '',
    ...stepsOf(f).flatMap((x) => [
      x.phase, x.ratio ?? '', x.how ?? '', ...(x.extras ?? []),
      ...(x.variants ?? []).flatMap((v) => [v.name, v.ratio ?? '', v.how ?? '']),
      ...productsOfStep(x).map((id) => `${product(id).name} ${product(id).type}`),
    ]),
  ].join(' '));
}
