import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { FLOWS, FLOW_BY_ID, NO_IMAGE, PRODUCTS, PRODUCT_BY_ID, SUBCATS, materialsOf, productsOfStep, stepsOf } from './index';
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

  it('除 NO_IMAGE 外每款产品都有本地图，且没有多余图片', () => {
    const files = new Set(readdirSync(new URL('../../public/img', import.meta.url)));
    for (const id of NO_IMAGE) expect(PRODUCT_BY_ID.has(id), id).toBe(true);
    const local = PRODUCTS.filter((p) => !NO_IMAGE.has(p.id)).map((p) => `${p.id}.webp`);
    for (const f of local) expect(files.has(f), f).toBe(true);
    expect(files.size).toBe(local.length);
  });

  it('每款产品恰好属于一个子分类，且子分类与产品分类一致', () => {
    const ids = SUBCATS.flatMap((s) => s.ids);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(SUBCATS.map((s) => s.id)).size).toBe(SUBCATS.length);
    for (const s of SUBCATS) for (const id of s.ids) expect(PRODUCT_BY_ID.get(id)?.c, `${s.id} → ${id}`).toBe(s.c);
    for (const p of PRODUCTS) expect(ids, p.id).toContain(p.id);
  });
});

describe('适用材质', () => {
  const of = (m: string) => materialsOf({ m });

  it('只收原文明确写出的材质', () => {
    expect(of('车漆')).toEqual(['paint']);
    expect(materialsOf(PRODUCT_BY_ID.get('L-venere')!)).not.toContain('ppf');
    expect(materialsOf(PRODUCT_BY_ID.get('L-perfecta')!)).toEqual(['paint', 'ppf', 'plastic', 'metal']);
    expect(of('外部全车')).toEqual(['paint']);
  });

  it('括号里的否定和提醒不算', () => {
    expect(of('所有车漆（不可用于涂装塑料和橡胶）')).toEqual(['paint']);
    expect(of('多种表面（不含皮革、裸铝及未涂层金属）')).toEqual([]);
    expect(of('硬表面（漆面、皮革慎用）')).toEqual([]);
  });

  it('轮毂的写法只算轮毂', () => {
    expect(of('喷漆合金轮毂 · 轮胎')).toEqual(['rubber', 'wheel']);
    expect(of('轮毂（含黑色喷漆、改色膜、Plastidip）')).toEqual(['wheel']);
    expect(of('钢圈 · 耐碱烤漆铝圈')).toEqual(['wheel']);
  });

  it('哑光只在指漆面时算哑光漆', () => {
    expect(of('哑光/改色膜')).toEqual(['matte', 'wrap']);
    expect(of('哑光 / 缎面车漆')).toEqual(['paint', 'matte']);
    expect(of('软硬塑料饰条（亮面 / 哑光）')).toEqual(['plastic']);
  });

  it('钢琴黑是塑料，不是金属', () => {
    expect(of('钢琴黑')).toEqual(['plastic']);
  });
});
