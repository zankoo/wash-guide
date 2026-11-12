import type { ProductItem, FlowItem } from './catalog';
import type { Filters } from './filters';
import { matchesQuery } from './search';

function counts<T>(items: T[], key: (item: T) => string) {
  const result: Record<string, number> = { '': items.length };
  for (const item of items) result[key(item)] = (result[key(item)] ?? 0) + 1;
  return result;
}

/** 选了会一款都没有的选项变淡且不可点；已选中的和「全部」始终可点，用来取消 */
export function isDead(count: number | undefined, selected: boolean, isAll: boolean): boolean {
  return !count && !selected && !isAll;
}

/** 同一份派生结果供列表、目录、筛选计数使用，不通过 effect 回写共享状态。 */
export function selectCatalog(products: ProductItem[], flows: FlowItem[], filters: Filters, favorites: readonly string[]) {
  const { brand, material, category, scene, query } = filters;
  const favoriteIds = new Set(favorites);
  const inCategory = (p: ProductItem) => !category || (category === 'fav' ? favoriteIds.has(p.id) : p.category === category);
  const searched = products.filter((p) => !query || matchesQuery(p.text, query, p.rank.abbr));
  const hasMaterial = (p: ProductItem) => !material || p.materials.includes(material);
  const matched = searched.filter((p) => (!brand || p.brand === brand) && hasMaterial(p));
  const visible = matched.filter(inCategory);
  const materialBase = searched.filter((p) => (!brand || p.brand === brand) && inCategory(p));
  const hasBrand = (p: ProductItem) => !brand || p.brand === brand;
  const searchedFlows = flows.filter((f) => !query || matchesQuery(f.text, query, f.abbr));
  const brandFlows = searchedFlows.filter((f) => !brand || f.brand === brand);
  return {
    products: visible,
    matchedProducts: matched,
    productCounts: counts(matched, (p) => p.category),
    subCounts: counts(visible, (p) => p.sub),
    productBrandCounts: counts(searched.filter((p) => inCategory(p) && hasMaterial(p)), (p) => p.brand),
    // 材质单选：每个材质的数字是选它之后会剩几款（''：不限材质）
    materialCounts: Object.assign(counts(materialBase.flatMap((p) => p.materials), (m) => m), { '': materialBase.length }),
    flows: brandFlows.filter((f) => !scene || f.scene === scene),
    flowSceneCounts: counts(brandFlows, (f) => f.scene),
    flowBrandCounts: counts(searchedFlows.filter((f) => !scene || f.scene === scene), (f) => f.brand),
    // 和其他选项一样：数字是点「我的常用」之后会看到几款（保留品牌、材质和搜索）
    favoriteCount: matched.filter((p) => favoriteIds.has(p.id)).length,
    flowRelaxed: {
      brand: searchedFlows.filter((f) => !scene || f.scene === scene).length,
      scene: brandFlows.length,
      query: flows.filter((f) => (!brand || f.brand === brand) && (!scene || f.scene === scene)).length,
    },
    /** 收藏了多少款（不看筛选），用于「还没有常用产品」的提示 */
    favoriteTotal: products.filter((p) => favoriteIds.has(p.id)).length,
    /** 空结果时去掉某一个条件后能看到几款，空状态据此给出可行的放宽方式 */
    relaxed: {
      brand: searched.filter((p) => hasMaterial(p) && inCategory(p)).length,
      material: materialBase.length,
      category: matched.length,
      query: products.filter((p) => hasBrand(p) && hasMaterial(p) && inCategory(p)).length,
    },
  };
}
