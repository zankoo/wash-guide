import { MATERIALS, type MaterialId } from '@/data/materials';
import { BRANDS, CATS, SCENES } from '@/data/taxonomy';
import type { BrandId, CategoryId, SceneId } from '@/data/types';

export interface Filters {
  brand: BrandId | ''; material: MaterialId | ''; query: string;
  category: CategoryId | 'fav' | ''; scene: SceneId | '';
}
export function parseFilters(search: string): Filters {
  const params = new URLSearchParams(search);
  return {
    brand: BRANDS.find((b) => b === params.get('brand')) ?? '',
    // 材质单选；旧链接里的多选（逗号分隔）取第一个有效值
    material: (params.get('material') ?? '').split(',').map((m) => MATERIALS.find(([k]) => k === m)?.[0]).find((m) => m) ?? '',
    query: params.get('q') ?? '',
    category: params.get('category') === 'fav' ? 'fav' : CATS.find(([c]) => c === params.get('category'))?.[0] ?? '',
    scene: SCENES.find(([s]) => s === params.get('scene'))?.[0] ?? '',
  };
}
