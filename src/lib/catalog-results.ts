import { MATERIALS } from '@/data/materials';
import type { ProductItem, FlowItem } from './catalog';
import type { Filters } from './filters';
import { matchesQuery } from './search';

function counts<T>(items: T[], key: (item: T) => string) {
  const result: Record<string, number> = { '': items.length };
  for (const item of items) result[key(item)] = (result[key(item)] ?? 0) + 1;
  return result;
}

/** 同一份派生结果供列表、目录、筛选计数使用，不通过 effect 回写共享状态。 */
export function selectCatalog(products: ProductItem[], flows: FlowItem[], filters: Filters, favorites: readonly string[]) {
  const { brand, material, category, scene, query } = filters;
  const favoriteIds = new Set(favorites);
  const inCategory = (p: ProductItem) => !category || (category === 'fav' ? favoriteIds.has(p.id) : p.category === category);
  const searched = products.filter((p) => !query || matchesQuery(p.text, query, p.rank.abbr));
  const matched = searched.filter((p) => (!brand || p.brand === brand) && material.every((m) => p.materials.includes(m)));
  const visible = matched.filter(inCategory);
  const searchedFlows = flows.filter((f) => !query || matchesQuery(f.text, query, f.abbr));
  const brandFlows = searchedFlows.filter((f) => !brand || f.brand === brand);
  return {
    products: visible,
    matchedProducts: matched,
    productCounts: counts(matched, (p) => p.category),
    subCounts: counts(visible, (p) => p.sub),
    productBrandCounts: counts(searched.filter((p) => inCategory(p) && material.every((m) => p.materials.includes(m))), (p) => p.brand),
    materialCounts: Object.fromEntries(MATERIALS.map(([m]) => [m,
      searched.filter((p) => (!brand || p.brand === brand) && inCategory(p) && p.materials.includes(m) && material.filter((x) => x !== m).every((x) => p.materials.includes(x))).length,
    ])),
    flows: brandFlows.filter((f) => !scene || f.scene === scene),
    flowSceneCounts: counts(brandFlows, (f) => f.scene),
    flowBrandCounts: counts(searchedFlows.filter((f) => !scene || f.scene === scene), (f) => f.brand),
    favoriteCount: products.filter((p) => favoriteIds.has(p.id)).length,
  };
}
