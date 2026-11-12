import { describe, expect, it } from 'vitest';
import { PRODUCTS, PRODUCT_BY_ID, phEvidenceNotes, phText } from './index';

/** 已逐份核对过官方资料的品牌：除下列例外外，pH 不得再是 unrecorded。 */
const AUDITED_BRANDS = new Set(['B', 'C', 'F', 'G', 'K', 'L', 'M', 'N', 'P']);
const KNOWN_UNRESOLVED: Record<string, string> = {
  // SDS 第 9 节写「pH < -3 / pH under -3」，明显笔误；官网无资料表，不擅自改写厂商数据
  'L-preludio-acidic': 'SDS 数值疑似笔误',
};

describe('pH 来源核对', () => {
  it('全部品牌都已核对', () => {
    expect([...new Set(PRODUCTS.map((p) => p.brand))].filter((b) => !AUDITED_BRANDS.has(b))).toEqual([]);
  });

  it('已核对品牌的 pH 都关联到具体文件', () => {
    const unresolved = PRODUCTS.filter((p) => AUDITED_BRANDS.has(p.brand) && p.ph?.source.kind === 'unrecorded').map((p) => p.id);
    expect(unresolved.sort()).toEqual(Object.keys(KNOWN_UNRESOLVED).sort());
  });

  it('技术资料表来源必须带 PDF 地址', () => {
    for (const p of PRODUCTS) {
      if (p.ph?.source.kind !== 'technical-sheet') continue;
      expect(p.ph.source.url, p.id).toMatch(/^https:\/\/.+\.pdf$/i);
    }
  });

  it('资料表只给范围或定性时，按 SDS 的具体数值标注', () => {
    const purifica = PRODUCT_BY_ID.get('L-purifica')!;
    expect(purifica.ph?.value).toBe('2.1');
    expect(purifica.ph?.source).toEqual({ kind: 'sds', url: purifica.sds?.url, section: 9 });
  });

  it('资料表只给 1% 稀释液的 pH 时按原样标注口径，不当作原液', () => {
    const p = PRODUCT_BY_ID.get('F-cristalbel')!;
    expect(p.ph?.basis).toBe('1%');
    expect(phText(p)).toBe('中性 6.0–8.0 · 1% 稀释液');
    expect(PRODUCT_BY_ID.get('F-supermafrasol')?.ph?.basis).toBe('raw');
  });

  it('技术资料表与 SDS 相差较大且资料表不符站内数值时，按 SDS 标注并保留资料表说法', () => {
    const p = PRODUCT_BY_ID.get('F-glass-clean')!;
    expect(p.ph?.value).toBe('7');
    expect(p.ph?.source).toEqual({ kind: 'sds', url: p.sds?.url, section: 9 });
    expect(p.ph?.conflict).toBe(true);
    expect(phEvidenceNotes(p.ph).join(' ')).toContain('厂商技术资料表写 pH 11');
  });

  it('产品页只写「中性」而 SDS 给出碱性数值时，按 SDS 标注并保留不一致记录', () => {
    const p = PRODUCT_BY_ID.get('G-trimcleaner')!;
    expect(p.ph?.value).toBe('10');
    expect(p.ph?.source).toEqual({ kind: 'sds', url: p.sds?.url, section: 9 });
    expect(p.ph?.evidence).toContainEqual({ kind: 'resolution', rule: 'sds-overrides-category', previousCategory: 'neu' });
    expect(p.ph?.conflict).toBe(true);
  });

  it('只有韩国申报的产品记录申报号，申报使用说明里的数值写进依据', () => {
    const p = PRODUCT_BY_ID.get('B-a53')!;
    expect(p.ph?.source).toEqual({ kind: 'korean-registration' });
    expect(p.ph?.value).toBe('7');
    expect(p.ph?.evidence).toContainEqual(expect.objectContaining({ kind: 'statement', source: 'korean-registration', registration: 'HB21-01-0971' }));
    expect(phEvidenceNotes(p.ph).join(' ')).toContain('pH 7');
  });

  it('产品页给出数值、SDS 不给数值时按产品页标注并保留 SDS 说法', () => {
    const p = PRODUCT_BY_ID.get('C-trix')!;
    expect(p.ph?.source).toEqual({ kind: 'product-page', url: p.url });
    expect(p.ph?.conflict).toBe(false);
    expect(phEvidenceNotes(p.ph).join(' ')).toContain('N/A');
  });
});
