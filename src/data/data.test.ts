import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { FLOWS, FLOW_BY_ID, PRODUCTS, PRODUCT_BY_ID, productsOfStep, stepsOf } from './index';
import { REMOTE } from './remote-images';
import { CAT_NAME, SCENE_NAME } from './taxonomy';

describe('数据完整性', () => {
  it('产品和流程 id 不重复', () => {
    expect(PRODUCT_BY_ID.size).toBe(PRODUCTS.length);
    expect(FLOW_BY_ID.size).toBe(FLOWS.length);
  });

  it('分类和场景都在列表里', () => {
    for (const p of PRODUCTS) expect(CAT_NAME[p.c], p.id).toBeDefined();
    for (const f of FLOWS) expect(SCENE_NAME[f.sc], f.id).toBeDefined();
  });

  it('流程引用的产品和组合引用的官方流程都存在', () => {
    for (const f of FLOWS) {
      for (const x of stepsOf(f)) for (const id of productsOfStep(x)) expect(PRODUCT_BY_ID.has(id), `${f.id} → ${id}`).toBe(true);
      if (f.kind === 'combo') expect(FLOW_BY_ID.get(f.base)?.kind, `${f.id} → ${f.base}`).toBe('off');
    }
  });

  it('Labocosmetica / Maniac Line 每款产品都有本地图，且没有多余图片', () => {
    const files = new Set(readdirSync(new URL('../../public/img', import.meta.url)));
    const local = PRODUCTS.filter((p) => p.b === 'L' || p.b === 'M').map((p) => `${p.id}.webp`);
    for (const f of local) expect(files.has(f), f).toBe(true);
    expect(files.size).toBe(local.length);
  });

  it('官网图地址只对应 Koch-Chemie / CarPro 产品', () => {
    for (const id of Object.keys(REMOTE)) expect(['K', 'C']).toContain(PRODUCT_BY_ID.get(id)?.b);
  });
});
