import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { FLOWS, FLOW_BY_ID, PRODUCTS, PRODUCT_BY_ID, SDS_SOURCES, SUBCATS, keyRatios, materialsOf, productsOfStep, stepsOf } from './index';
import { CAT_NAME, SCENE_NAME } from './taxonomy';

describe('数据完整性', () => {
  it('产品和流程 id 不重复', () => {
    expect(PRODUCT_BY_ID.size).toBe(PRODUCTS.length);
    expect(FLOW_BY_ID.size).toBe(FLOWS.length);
  });

  it('分类和场景都在列表里', () => {
    for (const p of PRODUCTS) expect(CAT_NAME[p.category], p.id).toBeDefined();
    for (const f of FLOWS) expect(SCENE_NAME[f.scene], f.id).toBeDefined();
  });

  it('流程引用的产品和组合引用的官方流程都存在', () => {
    for (const f of FLOWS) {
      for (const x of stepsOf(f)) for (const id of productsOfStep(x)) expect(PRODUCT_BY_ID.has(id), `${f.id} → ${id}`).toBe(true);
      if (f.kind === 'combo') expect(FLOW_BY_ID.get(f.base)?.kind, `${f.id} → ${f.base}`).toBe('off');
    }
  });

  it('除显式无图外每款产品都有本地图，且没有多余图片', () => {
    const files = new Set(readdirSync(new URL('../../public/img', import.meta.url)));
    const local = PRODUCTS.filter((p) => p.image !== null).map((p) => `${p.id}.webp`);
    for (const f of local) expect(files.has(f), f).toBe(true);
    expect(files.size).toBe(local.length);
  });

  it('每款产品恰好属于一个子分类，且子分类与产品分类一致', () => {
    const ids = SUBCATS.flatMap((s) => s.ids);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(SUBCATS.map((s) => s.id)).size).toBe(SUBCATS.length);
    for (const s of SUBCATS) for (const id of s.ids) expect(PRODUCT_BY_ID.get(id)?.category, `${s.id} → ${id}`).toBe(s.category);
    for (const p of PRODUCTS) expect(ids, p.id).toContain(p.id);
  });
});

describe('卡片比例标签', () => {
  it('常用配比带上工具和场景，避免把 PA壶与喷雾壶混淆', () => {
    expect(keyRatios(PRODUCT_BY_ID.get('L-primus')!)).toEqual(['PA壶 · 夏季污垢 1:10']);
    for (const p of PRODUCTS) {
      const ratios = keyRatios(p);
      if (Array.isArray(ratios)) expect(ratios.length, p.id).toBe(1);
    }
  });

  it('VDA 浓度上限不会重复成第二个施工配比', () => {
    expect(keyRatios(PRODUCT_BY_ID.get('K-super-foam')!)).toEqual(['PA壶 1:50 – 1:100']);
  });

  it('同一个意思只用一种写法', () => {
    for (const p of PRODUCTS) {
      for (const [, r] of p.dilutions) {
        expect(r, p.id).not.toMatch(/即用原液|水加 .*瓶盖|^最高 1:/);
        // 不需要稀释的产品写「即用」，「原液」只用在需要稀释的产品上
        if (/^原液/.test(r)) expect(p.dilutions.some(([, x]) => /\d+\s*:\s*\d/.test(x)), p.id).toBe(true);
      }
    }
  });
});

describe('适用材质', () => {
  const of = (m: string) => materialsOf({ materials: m });

  it('只收原文明确写出的材质', () => {
    expect(of('车漆')).toEqual(['paint']);
    expect(materialsOf(PRODUCT_BY_ID.get('L-venere')!)).not.toContain('ppf');
    expect(materialsOf(PRODUCT_BY_ID.get('L-perfecta')!)).toEqual(['paint', 'ppf', 'plastic', 'metal']);
    expect(of('车身外部各表面')).toEqual(['paint']);
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
    expect(of('哑光漆 · 改色膜')).toEqual(['matte', 'wrap']);
    expect(of('哑光 / 缎面车漆')).toEqual(['paint', 'matte']);
    expect(of('软硬塑料饰条（亮面 / 哑光）')).toEqual(['plastic']);
  });

  it('钢琴黑是塑料，不是金属', () => {
    expect(of('钢琴黑')).toEqual(['plastic']);
  });
});

describe('pH', () => {
  const num = (v: string) => {
    const xs = (v.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
    return xs.reduce((a, b) => a + b, 0) / xs.length;
  };

  it('数值写法统一（如 12.5、6–8、> 12、≥ 11）', () => {
    for (const p of PRODUCTS) {
      if (!p.ph) continue;
      const { category: k, value: v } = p.ph;
      if (k === 'na') expect(v, p.id).toBeUndefined();
      if (v) expect(v, p.id).toMatch(/^(?:[<>≥≤] )?-?\d+(?:\.\d+)?(?:–\d+(?:\.\d+)?)?$/);
    }
  });

  it('酸碱性和数值一致：< 6 酸性，6–8 中性，> 8 碱性', () => {
    for (const p of PRODUCTS) {
      const { category: k, value: v } = p.ph ?? {};
      if (!k || k === 'na' || !v) continue;
      const n = num(v);
      expect(k, `${p.id} pH ${v}`).toBe(n < 6 ? 'acid' : n <= 8 ? 'neu' : 'alk');
    }
  });
});

describe('SDS 和危险品标注', () => {
  it('SDS 只关联已收录的产品，链接是 https 或本站转存的文件', () => {
    const hosted = new Set(readdirSync(new URL('../../public/sds', import.meta.url)));
    for (const p of PRODUCTS) {
      if (!p.sds) continue;
      const { url, source, hosting } = p.sds;
      expect(SDS_SOURCES[source], p.id).toBeDefined();
      expect(p.sds.language, p.id).toBeTruthy();
      if (hosting === 'local') {
        expect(url).toMatch(/^\/sds\//);
        expect(hosted.has(url.slice(5)), url).toBe(true);
        expect(p.sds.originalUrl || p.sds.provenanceNote, p.id).toBeTruthy();
        const bytes = readFileSync(new URL('../../public' + url, import.meta.url));
        expect(createHash('sha256').update(bytes).digest('hex'), p.id).toBe(p.sds.sha256);
      } else expect(url, p.id).toMatch(/^https:\/\//);
    }
    // 转存的文件都有产品在用
    const used = new Set(PRODUCTS.flatMap((p) => p.sds ? [p.sds.url] : []));
    for (const f of hosted) expect(used.has(`/sds/${f}`), f).toBe(true);
  });

  it('标了危险品的产品都有可以核对的 SDS', () => {
    for (const p of PRODUCTS.filter((p) => p.hazard)) expect(p.sds, p.id).toBeDefined();
    expect(PRODUCTS.filter((p) => p.hazard).map((p) => p.id).sort()).toEqual(['K-triple-acid-star', 'L-energo']);
  });
});
