import { describe, expect, it } from 'vitest';
import { PRODUCTS, PRODUCT_BY_ID, productSearchText } from './index';
import { phEvidenceNotes } from './ph';

describe('pH 证据与口径', () => {
  it('采用 SDS 数值时链接到本产品的 SDS，而非其他产品', () => {
    for (const p of PRODUCTS) {
      if (p.ph?.source.kind !== 'sds') continue;
      expect(p.sds, p.id).toBeDefined();
      expect(p.ph.source.url, p.id).toBe(p.sds?.url);
      expect(p.ph.source.section, p.id).toBe(9);
    }
  });

  it('保留 HydrO2 Foam 的相互矛盾证据，不擅自采用另一数值', () => {
    const p = PRODUCT_BY_ID.get('C-hydro2-foam')!;
    expect(p.ph?.category).toBe('acid');
    expect(p.ph?.conflict).toBe(true);
    expect(phEvidenceNotes(p.ph).join(' ')).toContain('pH 7');
    expect(phEvidenceNotes(p.ph).join(' ')).toContain('弱酸性');
  });

  it('SDS 覆盖“不适用”的说明由结构生成且仍可搜索', () => {
    const p = PRODUCT_BY_ID.get('C-clearcut')!;
    expect(p.ph?.value).toBe('8.5');
    expect(p.ph?.evidence).toContainEqual({ kind: 'resolution', rule: 'sds-overrides-na' });
    expect(phEvidenceNotes(p.ph).join(' ')).toContain('本站按 SDS 标注');
    expect(productSearchText(p)).toContain('本站按 sds 标注');
    expect(p.notes.some((n) => n.includes('本站按 SDS 标注'))).toBe(false);
  });

  it('技术资料表与 SDS 数值相差较大时保留两者并标记口径差异', () => {
    const p = PRODUCT_BY_ID.get('K-super-foam')!;
    expect(p.ph?.value).toBe('12');
    expect(p.ph?.source.kind).toBe('technical-sheet');
    expect(p.ph?.conflict).toBe(true);
    expect(phEvidenceNotes(p.ph).join(' ')).toContain('SDS 第 9 节写 pH 11');
  });

  it('数值来源与 SDS 附件分别记录，不因有附件而臆测来源', () => {
    const unresolved = PRODUCTS.filter((p) => p.sds && p.ph?.source.kind === 'unrecorded');
    expect(unresolved.length).toBeGreaterThan(0);
    for (const p of unresolved) expect(p.ph?.source.url, p.id).toBeUndefined();
  });
});
