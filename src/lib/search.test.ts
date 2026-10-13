import { describe, expect, it } from 'vitest';
import { fold, matchesQuery } from './search';

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
});
