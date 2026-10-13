import { ratios } from '@/lib/dilution';

/** 从比例文本里取出 1:x 的 x（原液为 0）；即用、瓶盖、滴等写法返回空 */
export function mixValues(ratioTexts: string[]): number[] {
  return ratioTexts.flatMap((r) => (/即用/.test(r) ? [] : ratios(r)));
}

/** 1:x 里原液所占的比例（0–1） */
const share = (x: number) => 1 / (1 + x);

/**
 * 配比条：一个长条按真实比例分成原液和水两段，数值只看上面写的比例。
 * 范围比例（如 1:3–1:10）：实色是最稀一端的原液，斜纹延伸到最浓一端。
 * 纯装饰，对读屏隐藏。
 */
export function MixBar({ values }: { values: number[] }) {
  if (!values.length) return null;
  const thin = share(Math.max(...values)); // 最稀时原液占比
  const rich = share(Math.min(...values)); // 最浓时原液占比
  // 保留两位小数：服务端和浏览器序列化长小数的精度不同，会导致水合不一致
  const w = (n: number) => `${Math.round(n * 10000) / 100}%`;
  return (
    <div className="mix-bar" aria-hidden="true">
      <b className="mix-c" style={{ width: w(thin) }} />
      {rich > thin && <b className="mix-r" style={{ width: w(rich - thin) }} />}
    </div>
  );
}

/** 「稀释比例」标题旁的图例 */
export function MixLegend() {
  return (
    <span className="mix-legend" aria-hidden="true">
      <i className="c" />
      原液
      <i className="w" />水
    </span>
  );
}
