import { describe, expect, it } from 'vitest';
import { PRODUCTS, PRODUCT_BY_ID } from './index';

/** 已逐份核对过官方资料的品牌：除下列例外外，pH 不得再是 unrecorded。 */
const AUDITED_BRANDS = new Set(['K', 'L', 'P']);
const KNOWN_UNRESOLVED: Record<string, string> = {
  // SDS 第 9 节写「pH < -3 / pH under -3」，明显笔误；官网无资料表，不擅自改写厂商数据
  'L-preludio-acidic': 'SDS 数值疑似笔误',
};

describe('pH 来源核对', () => {
  it('已核对品牌的 pH 都关联到具体文件', () => {
    const unresolved = PRODUCTS.filter((p) => AUDITED_BRANDS.has(p.brand) && p.ph?.source.kind === 'unrecorded').map((p) => p.id);
    expect(unresolved.sort()).toEqual(Object.keys(KNOWN_UNRESOLVED).sort());
  });

  it('已核对品牌的技术资料表来源必须带 PDF 地址', () => {
    for (const p of PRODUCTS) {
      if (!AUDITED_BRANDS.has(p.brand) || p.ph?.source.kind !== 'technical-sheet') continue;
      expect(p.ph.source.url, p.id).toMatch(/^https:\/\/.+\.pdf$/i);
    }
  });

  it('资料表只给范围或定性时，按 SDS 的具体数值标注', () => {
    const purifica = PRODUCT_BY_ID.get('L-purifica')!;
    expect(purifica.ph?.value).toBe('2.1');
    expect(purifica.ph?.source).toEqual({ kind: 'sds', url: purifica.sds?.url, section: 9 });
  });
});
