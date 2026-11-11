import { MATERIALS, type MaterialId } from '@/data/materials';
import { BRANDS, CATS, SCENES } from '@/data/taxonomy';
import type { BrandId, CategoryId, SceneId } from '@/data/types';

export interface Filters {
  brand: BrandId | ''; material: MaterialId[]; query: string;
  category: CategoryId | 'fav' | ''; scene: SceneId | '';
}
export function parseFilters(search: string): Filters {
  const params = new URLSearchParams(search);
  return {
    brand: BRANDS.find((b) => b === params.get('brand')) ?? '',
    material: MATERIALS.filter(([m]) => (params.get('material') ?? '').split(',').includes(m)).map(([m]) => m),
    query: params.get('q') ?? '',
    category: params.get('category') === 'fav' ? 'fav' : CATS.find(([c]) => c === params.get('category'))?.[0] ?? '',
    scene: SCENES.find(([s]) => s === params.get('scene'))?.[0] ?? '',
  };
}
