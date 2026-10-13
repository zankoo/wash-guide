import { BRANDS, FLOWS, OFFICIAL_RATIO_ROWS, PRODUCTS } from '@/data';
import { ViewTabs } from './view-tabs';

const STATS: [number, string][] = [
  [PRODUCTS.length, '款产品'],
  [BRANDS.length, '个品牌'],
  [FLOWS.length, '套流程与组合'],
  [OFFICIAL_RATIO_ROWS, '条官方比例'],
];

export function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <div className="eyebrow">
          <span>Labocosmetica</span>
          <span className="x">·</span>
          <span>Maniac Line</span>
          <span className="x">·</span>
          <span>Koch-Chemie</span>
          <span className="x">·</span>
          <span>CarPro</span>
          <span className="x">/</span>
          <span>Official Application Guide</span>
        </div>
        <h1>洗车施工速查</h1>
        <p className="lede">
          四个品牌汽美产品的官方施工方式与稀释比例，按场景和材质分行列出。点开产品即可查看步骤，并按施工工具换算加水量和原液量。
        </p>
        <div className="stats">
          {STATS.map(([n, label]) => (
            <div className="stat" key={label}>
              <b>{n}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <ViewTabs />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <p>
          比例写法沿用官方：<b>1:10</b> = 1 份原液 + 10 份水。PA壶比例指壶内的调配比例，最终出液浓度取决于高压清洗机。
        </p>
        <p>
          数据来源：labocosmetica.com、maniacline.com、koch-chemie.com 与 carpro.global 官方产品页、技术资料和施工手册，2026 年 10
          月整理翻译。产品图取自各品牌官网并保存在本站，官网未提供图片的产品以名称卡片代替。官网未给出比例的产品按原液或即用处理并已注明；镀膜类以包装说明书为准。施工前请先在不显眼处测试。
        </p>
      </div>
    </footer>
  );
}
