import { describe, expect, it } from 'vitest';
import { autoWater, convert, formatMl, parseWater, ratios } from './dilution';

describe('ratios', () => {
  it('提取 1:x 和原液', () => {
    expect(ratios('1:3 – 1:10')).toEqual([3, 10]);
    expect(ratios('原液 – 1:1')).toEqual([0, 1]);
    expect(ratios('1:25（最浓）– 1:50（最稀）')).toEqual([25, 50]);
  });
  it('用量写法（瓶盖 / 滴 / 喷）不换算', () => {
    expect(ratios('2 瓶盖 / 10 L 水')).toEqual([]);
    expect(ratios('最高 1:5 · 喷 2 下')).toEqual([5]);
  });
});

describe('convert', () => {
  it('常用模式按施工工具取水量', () => {
    expect(autoWater('PA壶')).toBe(300);
    expect(autoWater('喷雾壶')).toBe(2000);
    expect(autoWater('桶洗')).toBe(10000);
    expect(autoWater('海绵')).toBe(1000);
    expect(convert('1:10', 'PA壶', 'auto')).toBe('水 300 ml + 原液 30 ml');
  });
  it('固定水量', () => {
    expect(convert('1:3 – 1:10', '喷雾壶', 10000)).toBe('水 10 L + 原液 3.3 L　～　水 10 L + 原液 1 L');
    expect(convert('原液', '—', 1000)).toBe('直接用原液');
  });
  it('即用产品不换算', () => {
    expect(convert('即用原液', '喷雾壶', 'auto')).toBe('');
  });
});

describe('formatMl', () => {
  it('格式化', () => {
    expect(formatMl(1500)).toBe('1.5 L');
    expect(formatMl(2000)).toBe('2 L');
    expect(formatMl(3.33)).toBe('3.3 ml');
    expect(formatMl(66.6)).toBe('67 ml');
  });
});

describe('parseWater', () => {
  it('支持 ml / L / 升，单位缺省为 ml', () => {
    expect(parseWater('750')).toBe(750);
    expect(parseWater('750 ml')).toBe(750);
    expect(parseWater('1.5L')).toBe(1500);
    expect(parseWater('20 升')).toBe(20000);
  });
  it('无效或超出范围返回 null', () => {
    expect(parseWater('')).toBeNull();
    expect(parseWater('abc')).toBeNull();
    expect(parseWater('5')).toBeNull();
    expect(parseWater('500L')).toBeNull();
  });
  it('自定义水量参与换算', () => {
    expect(convert('1:10', '喷雾壶', 750)).toBe('水 750 ml + 原液 75 ml');
  });
});
