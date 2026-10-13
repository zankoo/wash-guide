import { ratios } from '@/lib/dilution';

// 浓度刻度：对数刻度，左端原液（最浓）、右端 1:2000（最稀）。
// 只在详情的每一行比例下面画，标出这一行用到的浓度：单个比例是一根指针，范围比例是一段括号。
const MAX_X = 2000;
const MAX = Math.log10(1 + MAX_X);
// 保留两位小数：服务端和浏览器序列化长小数的精度不同，会导致水合不一致
const pos = (x: number) => Math.round((Math.log10(1 + Math.min(x, MAX_X)) / MAX) * 10000) / 100;
const TICKS: [number, string][] = [
  [0, '原液'],
  [10, '1:10'],
  [100, '1:100'],
  [1000, '1:1000'],
];

/** 从比例文本里取出可以画在刻度上的 1:x（原液为 0）；即用、瓶盖、滴等写法返回空 */
export function gaugeValues(ratioTexts: string[]): number[] {
  return ratioTexts.flatMap((r) => (/即用/.test(r) ? [] : ratios(r)));
}

/** 比例文字下面的装饰性刻度条（数值已在文字里，所以对读屏隐藏） */
export function Gauge({ values }: { values: number[] }) {
  if (!values.length) return null;
  const lo = pos(Math.min(...values));
  const hi = pos(Math.max(...values));
  return (
    <div className="gauge" aria-hidden="true">
      <span className="g-end">浓</span>
      <div className="g-body">
        <div className="g-track">
          {TICKS.slice(1).map(([x]) => (
            <i key={x} style={{ left: `${pos(x)}%` }} />
          ))}
          {hi === lo ? (
            <b className="pin" style={{ left: `${lo}%` }} />
          ) : (
            <b className="span" style={{ left: `${lo}%`, width: `${Math.round((hi - lo) * 100) / 100}%` }} />
          )}
        </div>
        <div className="g-lab">
          {TICKS.map(([x, l]) => (
            <span key={x} style={{ left: `${pos(x)}%` }}>
              {l}
            </span>
          ))}
        </div>
      </div>
      <span className="g-end">稀</span>
    </div>
  );
}
