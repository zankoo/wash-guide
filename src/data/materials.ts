import type { Product } from './types';

/** 材质筛选的固定选项（顺序即显示顺序） */
export const MATERIALS = [
  ['paint', '车漆'],
  ['matte', '哑光漆'],
  ['ppf', '车衣'],
  ['wrap', '改色膜'],
  ['glass', '玻璃'],
  ['plastic', '塑料'],
  ['rubber', '橡胶轮胎'],
  ['wheel', '轮毂'],
  ['metal', '金属镀铬'],
  ['leather', '皮革'],
  ['fabric', '织物地毯'],
  ['alcantara', 'Alcantara'],
] as const;

export type MaterialId = (typeof MATERIALS)[number][0];

export const MATERIAL_NAME = Object.fromEntries(MATERIALS) as Record<MaterialId, string>;

/** 泛指整车外部的写法：一定包括车漆，但不推断车衣、改色膜、哑光漆 */
const EXTERIOR = /镀膜车|外部全车|整车|全部外部表面|外部各表面|车身外部|全部车身|大部分车身|所有车身|车身$|轿车|商用车|摩托车|房车/;
/** 泛指内饰的写法：一定包括塑料，但不推断皮革、织物 */
const INTERIOR = /内饰各类表面|内饰表面|内饰软硬表面|内外饰各类表面/;

/**
 * 从官方「适用材质」原文里整理出固定的材质标签：只收原文明确写出的材质。
 * - 括号里的否定或提醒（不可用于、不含、不适用、慎用）整段去掉，不让其中的材质被误收；
 * - 写的是轮毂（喷漆轮毂、镀铬轮毂、铝圈……）时只算轮毂，不算车漆或金属。
 */
export function materialsOf(p: Pick<Product, 'm'>): MaterialId[] {
  const found = new Set<MaterialId>();
  const text = p.m.replace(/[（(][^）)]*(不可|不含|不适用|慎用)[^）)]*[）)]/g, '');
  for (const raw of text.split(/\s*[·：:]\s*/)) {
    const t = raw.trim();
    if (!t || t === '—') continue;
    if (/多种表面/.test(t)) continue;
    if (/轮毂|铝圈|钢圈|轮圈/.test(t)) {
      found.add('wheel');
      continue;
    }
    if (EXTERIOR.test(t)) found.add('paint');
    if (INTERIOR.test(t)) found.add('plastic');
    if (/车漆|漆面|修补漆|原厂漆|深色漆|裸漆/.test(t) && !/漆面家具/.test(t)) found.add('paint');
    // 哑光只在指漆面时才算（「塑料饰条（亮面 / 哑光）」不算）；Labo 的「哑光/改色膜」指哑光漆和改色膜两种
    if (/哑光|缎面/.test(t) && /漆|^哑光$|哑光\/改色膜/.test(t)) found.add('matte');
    if (/PPF|透明保护膜/.test(t)) found.add('ppf');
    if (/改色膜/.test(t)) found.add('wrap');
    if (/玻璃|车窗|前挡|镜面|后视镜/.test(t)) found.add('glass');
    if (/塑料|饰板|饰条|中控|乙烯基|树脂|保险杠|钢琴黑|门板|大灯/.test(t)) found.add('plastic');
    if (/轮胎|橡胶|密封条/.test(t)) found.add('rubber');
    if (/金属|镀铬|不锈钢|铝|钢(?!琴)|排气|车标/.test(t)) found.add('metal');
    if (/皮|革/.test(t)) found.add('leather');
    if (/织物|地毯|面料|车顶内衬|软顶|^超纤$/.test(t)) found.add('fabric');
    if (/Alcantara/i.test(t)) found.add('alcantara');
  }
  return MATERIALS.map(([id]) => id).filter((id) => found.has(id));
}
