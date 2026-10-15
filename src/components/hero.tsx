import { ViewTabs } from './view-tabs';

/** 三段 pH 色条（碱性 / 中性 / 酸性）；首次加载时像液面一样依次升起 */
export function Logo() {
  return (
    <span className="logo" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

/** 窄屏顶栏：站名 + 视图切换（手机上视图切换移到底部栏；桌面由左侧索引栏代替） */
export function Masthead() {
  return (
    <header className="mast">
      <div className="wrap">
        <div className="mast-id">
          <Logo />
          <div>
            <h1>洗车施工速查</h1>
            <p>Labocosmetica、Maniac Line、MAFRA、Koch-Chemie、CarPro、GYEON、BolaSolution 的官方稀释比例、施工步骤和洗车流程</p>
          </div>
        </div>
        <ViewTabs className="tabs top" />
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
          数据来源：labocosmetica.com、maniacline.com、mafra.it、koch-chemie.com、carpro.global、gyeon.co 与 bolasolution.com 官方产品页、技术资料和施工手册，BolaSolution 日本正规代理（乐天 Amazing Green）产品页与韩国环境部申报资料，2026 年 10
          月整理翻译。产品图取自各品牌官网（BolaSolution 取自日本正规代理产品页和韩国官方商城 DOXX MALL）并保存在本站，官网未提供图片的产品以名称卡片代替。官网未给出比例的产品按原液或即用处理并已注明；镀膜类以包装说明书为准。施工前请先在不显眼处测试。
        </p>
      </div>
    </footer>
  );
}
