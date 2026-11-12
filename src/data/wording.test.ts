import { describe, expect, it } from 'vitest';
import { PRODUCTS } from './index';
import { CAUTION_TEXT } from './cautions';
import { phEvidenceNotes } from './ph';

/** 产品页的统一措辞：同一种情况只有一种写法，个性化内容只出现在备注里 */
describe('产品页措辞统一', () => {
  const remarks = PRODUCTS.flatMap((p) => p.notes.map((text) => ({ id: p.id, text })));

  it('通用提醒只用固定措辞的注意事项，不在备注里另写一遍', () => {
    const generic = /不要在热表面使用|(^|；)不要让(其|它|产品)(在表面)?干(在表面|掉)|防冻防高温|^使用前摇匀。$|使用前先确认材质兼容|先检查(色牢度和)?材质兼容性|避免阳光直射下使用|请阅读安全数据表/;
    expect(remarks.filter((r) => generic.test(r.text))).toEqual([]);
  });

  it('注意事项只引用已定义的固定措辞', () => {
    for (const p of PRODUCTS) for (const c of p.cautions ?? []) expect(CAUTION_TEXT[c], p.id).toBeDefined();
  });

  it('备注不重复 pH 标签已经写出的数值和来源', () => {
    expect(remarks.filter((r) => /pH [-\d.]+（官方产品信息）|^pH 中性，|酸碱性来自韩国申报/.test(r.text))).toEqual([]);
  });

  it('同一器材、动作只用一种叫法', () => {
    const texts = PRODUCTS.flatMap((p) => [p.type, p.materials, ...p.steps, ...p.notes, ...p.dilutions.flat()].map((text) => ({ id: p.id, text })));
    const variants = /泡沫枪|Foam gun|PA 壶|(?<![雾沫力])喷壶|泵壶|从下往上|从上往下|超细纤维布|(?<!使)用前摇匀|不可用于|不适用于|不能用于/;
    expect(texts.filter((t) => variants.test(t.text))).toEqual([]);
  });

  it('适用材质不混入用法限制，整车外部统一写「车身外部各表面」', () => {
    const bad = PRODUCTS.filter((p) => /（[^）]*(不可|不含|不适用|慎用|未列)[^）]*）|外部全车|所有外部表面|全部外部表面|车身外部(?!各表面)/.test(p.materials));
    expect(bad.map((p) => `${p.id}: ${p.materials}`)).toEqual([]);
  });

  it('规格只写容量或尺寸，货号等说明放进备注', () => {
    expect(PRODUCTS.filter((p) => /Art\.|货号|约可做/.test(p.sizes)).map((p) => `${p.id}: ${p.sizes}`)).toEqual([]);
  });

  it('pH 资料原文都用统一句式，以句号结尾', () => {
    for (const p of PRODUCTS) {
      for (const text of phEvidenceNotes(p.ph)) {
        expect(text, p.id).toMatch(/。$/);
        expect(text, p.id).not.toMatch(/^酸碱性来自|maframall\.com 的安全标示（액성）：|本站暂按|官方产品资料/);
      }
    }
  });
});
