import { ratios } from '@/lib/dilution';

/** 从比例文本里取出 1:x 的 x（原液为 0）；即用、瓶盖、滴等写法返回空 */
export function mixValues(ratioTexts: string[]): number[] {
  return ratioTexts.flatMap((r) => (/即用/.test(r) ? [] : ratios(r)));
}

/** 1:x 里原液所占的百分比 */
const share = (x: number) => 100 / (1 + x);

/** 小数位数：≥10% 取整，≥1% 一位小数，<1% 保留两位有效数字（1:1200 → 0.083%） */
const decimals = (c: number) => (c >= 10 ? 0 : c >= 1 ? 1 : 1 - Math.floor(Math.log10(c)));
const trim = (s: string) => (s.includes('.') ? s.replace(/\.?0+$/, '') : s);

/** 原液和水的占比按同样的小数位数写，保证两者加起来正好是 100% */
function shares(c: number): [string, string] {
  const d = decimals(c);
  return [trim(c.toFixed(d)), trim((100 - c).toFixed(d))];
}

/** 两端相同时只写一个，不同时写成范围 */
const range = (a: string, b: string) => (a === b ? `${a}%` : `${a}–${b}%`);

/**
 * 配比条：一个长条按真实比例分成原液和水两段。
 * 范围比例（如 1:3–1:10）：实色是最稀一端的原液占比，浅色斜纹延伸到最浓一端。
 * 百分比已经写在条下面，长条本身对读屏隐藏。
 */
export function MixBar({ values }: { values: number[] }) {
  if (!values.length) return null;
  const thin = share(Math.max(...values)); // 最稀时原液占比
  const rich = share(Math.min(...values)); // 最浓时原液占比
  // 保留两位小数：服务端和浏览器序列化长小数的精度不同，会导致水合不一致
  const w = (n: number) => `${Math.round(n * 100) / 100}%`;
  return (
    <div className="mix">
      <div className="mix-bar" aria-hidden="true">
        <b className="mix-c" style={{ width: w(thin) }} />
        {rich > thin && <b className="mix-r" style={{ width: w(rich - thin) }} />}
      </div>
      <div className="mix-lab">
        <span className="c">原液 {range(shares(thin)[0], shares(rich)[0])}</span>
        {rich < 100 && <span className="w">水 {range(shares(rich)[1], shares(thin)[1])}</span>}
      </div>
    </div>
  );
}
