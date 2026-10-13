import { ratios } from '@/lib/dilution';

// 浓度刻度：对数刻度，左端原液、右端 1:1000，让不同比例之间能直观比较浓淡
const MAX = Math.log10(1001);
// 保留两位小数：服务端和浏览器序列化长小数的精度不同，会导致水合不一致
const pos = (x: number) => Math.round((Math.log10(1 + Math.min(x, 1000)) / MAX) * 10000) / 100;
const TICKS: [number, string][] = [
  [0, '原液'],
  [1, '1:1'],
  [10, '1:10'],
  [100, '1:100'],
  [1000, '1:1000'],
];

/** 从比例文本里取出可以画在刻度上的 1:x（原液为 0）；即用、瓶盖、滴等写法返回空 */
export function gaugeValues(ratioTexts: string[]): number[] {
  return ratioTexts.flatMap((r) => (/即用/.test(r) ? [] : ratios(r)));
}

/** 比例文字旁边的装饰性刻度条（数值已在文字里，所以对读屏隐藏） */
export function Gauge({ values, labels = false }: { values: number[]; labels?: boolean }) {
  if (!values.length) return null;
  const lo = pos(Math.min(...values));
  const hi = pos(Math.max(...values));
  return (
    <div className={labels ? 'gauge lab' : 'gauge'} aria-hidden="true">
      <div className="g-track">
        {TICKS.map(([x]) => (
          <i key={x} style={{ left: `${pos(x)}%` }} />
        ))}
        <b style={{ left: `${lo}%`, width: `${Math.round((hi - lo) * 100) / 100}%` }} />
      </div>
      {labels && (
        <div className="g-lab">
          {/* 1:1 离原液太近，只画刻度不写字，避免窄屏上两个标签重叠 */}
          {TICKS.filter(([x]) => x !== 1).map(([x, l]) => (
            <span key={x} style={{ left: `${pos(x)}%` }}>
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
