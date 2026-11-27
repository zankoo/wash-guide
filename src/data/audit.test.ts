import { describe, expect, it } from 'vitest';
import { auditCatalog } from './audit';
import { PRODUCTS } from './index';
import type { Product } from './types';

const product = (id: string, overrides: Partial<Product> = {}): Product => ({
  id, brand: 'C', category: 'wash', name: id, type: '', sizes: '', materials: '',
  dilutions: [], steps: [], notes: [], url: 'https://example.com/product', ...overrides,
});

describe('目录资料报告', () => {
  it('配件排除，但套装与洗车泥不被误判为配件', () => {
    const report = auditCatalog([
      product('accessory', { category: 'acc' }),
      product('kit', { name: 'Coating Kit', category: 'coat' }),
      product('clay', { name: 'Clay Bar', category: 'deco' }),
    ]);
    expect(report.scope).toEqual({ total: 3, excludedAccessories: 1, included: 2 });
    expect(report.sds.missing.map((p) => p.id)).toEqual(['clay', 'kit']);
  });

  it('缺数值、不适用与缺来源分别统计，有 SDS 也不推断 pH 来源', () => {
    const base = { basis: 'raw' as const, source: { kind: 'unrecorded' as const }, evidence: [], conflict: false };
    const report = auditCatalog([
      product('none'),
      product('na', { ph: { ...base, category: 'na' } }),
      product('qualitative', { ph: { ...base, category: 'alk' } }),
      product('value', { ph: { ...base, category: 'acid', value: '0', conflict: true },
        sds: { url: 'https://sds.kokoda.fun/value.pdf', source: 'koch', language: '英文', hosting: 'r2' } }),
    ]);
    expect(report.ph.unrecorded.map((p) => p.id)).toEqual(['none']);
    expect(report.ph.notApplicable.map((p) => p.id)).toEqual(['na']);
    expect(report.ph.qualitativeOnly.map((p) => p.id)).toEqual(['qualitative']);
    expect(report.ph.withValue.map((p) => p.id)).toEqual(['value']);
    expect(report.ph.missingSource).toHaveLength(3);
    expect(report.ph.conflictingEvidence.map((p) => p.id)).toEqual(['value']);
    expect(report.hostedSds.missingOriginalUrl.map((p) => p.id)).toEqual(['value']);
    expect(report.sds.linked).toBe(1);
  });

  it('空目录、输入顺序和重复运行不影响统计口径', () => {
    expect(auditCatalog([]).scope.included).toBe(0);
    const input = [product('z'), product('a')];
    expect(auditCatalog(input)).toEqual(auditCatalog([...input].reverse()));
    expect(input.map((p) => p.id)).toEqual(['z', 'a']);
  });

  it('当前目录总数、品牌汇总和互斥的 pH 状态相互对得上', () => {
    const report = auditCatalog(PRODUCTS);
    const sum = (key: 'products' | 'linkedSds' | 'missingSds') => report.byBrand.reduce((n, b) => n + b[key], 0);
    expect(sum('products')).toBe(report.scope.included);
    expect(sum('linkedSds')).toBe(report.sds.linked);
    expect(sum('missingSds')).toBe(report.sds.missing.length);
    const { unrecorded, notApplicable, qualitativeOnly, withValue } = report.ph;
    expect([...unrecorded, ...notApplicable, ...qualitativeOnly, ...withValue]).toHaveLength(report.scope.included);
  });
});
