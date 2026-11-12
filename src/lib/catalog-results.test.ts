import { describe, expect, it } from 'vitest';
import { selectCatalog } from './catalog-results';
import { parseFilters } from './filters';
import { productItems, flowItems } from '../data/catalog';
import { PRODUCTS, productSearchText, keyRatios, phDisplay } from '../data';

const select = (query: string, favorites: string[] = []) => selectCatalog(productItems, flowItems, parseFilters(query), favorites);
describe('共享目录筛选', () => {
  it('流程搜索、侧栏与场景计数来自相同结果', () => {
    const empty = select('?q=zzzznonexistent');
    expect(empty.flows).toHaveLength(0);
    expect(empty.flowSceneCounts['']).toBe(0);
    expect(empty.flowBrandCounts['']).toBe(0);
    const matching = select('?q=PPF&brand=L');
    expect(matching.flows.length).toBeGreaterThan(0);
    expect(matching.flowSceneCounts['']).toBe(matching.flows.length);
    expect(matching.flows.every((f) => f.brand === 'L')).toBe(true);
  });
  it('材质单选，分类计数保留切换分类所需的候选数', () => {
    const result = select('?material=rubber&brand=K&category=trim');
    expect(result.products.length).toBeGreaterThan(0);
    expect(result.products.every((p) => p.brand === 'K' && p.category === 'trim' && p.materials.includes('rubber'))).toBe(true);
    expect(result.materialCounts.rubber).toBe(result.products.length);
    expect(result.materialCounts['']).toBe(select('?brand=K&category=trim').products.length);
    expect(result.productCounts.trim).toBe(result.products.length);
    expect(result.subCounts['']).toBe(result.products.length);
  });
  it('已删除产品的收藏不会虚增数字，收藏筛选仍与其他条件取交集', () => {
    const result = select('?category=fav&brand=C', ['C-reset', 'L-primus', 'deleted-product']);
    // 「我的常用」的数字和其他选项一样跟着品牌走；总数单独给「还没有常用」的提示用
    expect(result.favoriteCount).toBe(1);
    expect(result.favoriteTotal).toBe(2);
    expect(result.products.map((p) => p.id)).toEqual(['C-reset']);
  });
  it('非法筛选被忽略，旧的多选材质链接取第一个有效材质', () => {
    expect(parseFilters('?brand=bad&category=bad&scene=bad&material=unknown,rubber,plastic')).toEqual({ brand: '', category: '', scene: '', material: 'rubber', query: '' });
  });
  it('精简投影保留所有原有可搜索文本、配比和 pH 展示，不发送详情字段', () => {
    for (const item of productItems) {
      const p = PRODUCTS.find((p) => p.id === item.id)!;
      expect(item.text).toBe(productSearchText(p));
      expect(item.pills).toEqual(keyRatios(p));
      expect(item.ph).toEqual(phDisplay(p));
      expect(item).not.toHaveProperty('steps');
      expect(item).not.toHaveProperty('sds');
    }
  });
});
