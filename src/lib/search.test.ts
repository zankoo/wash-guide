import { describe, expect, it } from 'vitest';
import { fold, matchesQuery, relevance } from './search';

describe('搜索', () => {
  it('忽略重音和大小写', () => {
    expect(matchesQuery(fold('PRÌMUS 2.0 碱性泡沫预洗'), 'primus')).toBe(true);
    expect(matchesQuery(fold('SÈMPER'), 'Semper')).toBe(true);
  });

  it('全角冒号等同半角', () => {
    expect(matchesQuery(fold('喷雾壶 1:10'), '1：10')).toBe(true);
  });

  it('多个词都要命中', () => {
    expect(matchesQuery(fold('IronX 铁粉去除剂'), '铁粉 ironx')).toBe(true);
    expect(matchesQuery(fold('IronX 铁粉去除剂'), '铁粉 柏油')).toBe(false);
  });

  it('名称命中 > 类型开头 > 类型其他位置 > 分类 / 材质 > 其他字段', () => {
    const f = (name: string, type: string, tags = '') => ({ name: fold(name), type: fold(type), tags: fold(tags) });
    const q = '铁粉';
    const scores = [
      relevance(f('铁粉 X', ''), q),
      relevance(f('SIDERO', '铁粉去除凝胶'), q),
      relevance(f('IronX', '中性（pH 7）铁粉去除剂'), q),
      relevance(f('Magic Wheel Cleaner', '无酸粘稠轮毂清洁剂', '无酸 / 中性（铁粉变色）'), q),
      relevance(f('Reset', '洗车香波'), q),
    ];
    expect(scores).toEqual([...scores].sort((a, b) => b - a));
    expect(new Set(scores).size).toBe(scores.length);
  });
});
