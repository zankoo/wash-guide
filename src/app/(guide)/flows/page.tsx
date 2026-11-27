import type { Metadata } from 'next';
import { FlowBrowser } from '@/components/flow-browser';
import { PageSlide } from '@/components/page-slide';
import { FLOWS, PRODUCTS, imageSrc, productsOfStep, stepsOf } from '@/data';
import { flowItems } from '@/data/catalog';
import { CatalogProvider } from '@/components/catalog-state';
import { GuideShell } from '@/components/guide-shell';

const usedIds = new Set(FLOWS.flatMap((f) => stepsOf(f).flatMap(productsOfStep)));
const chips = PRODUCTS.filter((p) => usedIds.has(p.id)).map((p) => ({ id: p.id, name: p.name, brand: p.brand, image: imageSrc(p) }));

export const metadata: Metadata = {
  title: '洗车流程与组合',
  description: 'Labocosmetica 3pH®、Maniac Line、MAFRA、Koch-Chemie、CarPro、GYEON、BolaSolution、FEYNLAB、P&S 官方洗车流程，以及在官方流程上替换或追加步骤的产品组合。',
};

const intro = (
  <div className="ph-explain">
    <div className="phx">
      <span className="phtag alk">碱性 pH</span>
      <b>去有机污垢</b>
      <p>路面油污、机油、飞虫、尾气烟尘、交通膜。代表：PRÌMUS 2.0、LIBERA、DÙCTILE。</p>
    </div>
    <div className="phx">
      <span className="phtag neu">中性 pH</span>
      <b>手洗时去静态污垢</b>
      <p>配合手套的机械作用，不影响前后步骤的化学作用，也不伤保护层。代表：SÈMPER、REVÌTAX。</p>
    </div>
    <div className="phx">
      <span className="phtag acid">酸性 pH</span>
      <b>去无机污垢</b>
      <p>水垢、水斑、酸雨残留和矿物盐，恢复镀膜和封体性能。代表：PURÌFICA、RENOVA、ÈNERGO。</p>
    </div>
  </div>
);

export default function FlowsPage() {
  return (
    <CatalogProvider products={[]} flows={flowItems} chips={chips}><GuideShell><PageSlide>
      <FlowBrowser cards={FLOWS} intro={intro} />
    </PageSlide></GuideShell></CatalogProvider>
  );
}
