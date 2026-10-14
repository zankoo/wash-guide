import { FilterBar, type CountTable, type ProductCounts } from '@/components/filter-bar';
import { Footer, Masthead } from '@/components/hero';
import { Sidebar, type FlowIndexItem } from '@/components/sidebar';
import { ViewTabs } from '@/components/view-tabs';
import { BRANDS, FLOWS, MATERIALS, PRODUCTS, SUB_OF, materialsOf } from '@/data';

/** counts[品牌 | ''][分组 | ''] */
function countBy<T extends { b: string }>(items: T[], group: (x: T) => string): CountTable {
  const table: CountTable = {};
  for (const b of ['', ...BRANDS]) {
    const row: Record<string, number> = {};
    for (const x of items) {
      if (b && x.b !== b) continue;
      row[''] = (row[''] ?? 0) + 1;
      row[group(x)] = (row[group(x)] ?? 0) + 1;
    }
    table[b] = row;
  }
  return table;
}

/** 再按材质分一层：'' 表示不限材质 */
function byMaterial(group: (p: (typeof PRODUCTS)[number]) => string): ProductCounts {
  const table: ProductCounts = { '': countBy(PRODUCTS, group) };
  for (const [mt] of MATERIALS) table[mt] = countBy(PRODUCTS.filter((p) => materialsOf(p).includes(mt)), group);
  return table;
}

const productCounts = byMaterial((p) => p.c);
const subCounts = byMaterial((p) => SUB_OF.get(p.id)!.id);
const flowCounts = countBy(FLOWS, (f) => f.sc);
const flowIndex: FlowIndexItem[] = FLOWS.map((f) => ({ id: f.id, b: f.b, sc: f.sc, name: f.name, kind: f.kind }));

export default function GuideLayout({ children }: LayoutProps<'/'>) {
  return (
    // 桌面 ≥1100px：左侧索引栏 + 右侧内容；更窄时左栏隐藏，用顶栏、分类标签和底部栏
    <div className="shell">
      <Sidebar productCounts={productCounts} subCounts={subCounts} flowCounts={flowCounts} flows={flowIndex} />
      <div className="main-col">
        <Masthead />
        <FilterBar productCounts={productCounts} flowCounts={flowCounts} />
        <div className="wrap">
          <main>{children}</main>
        </div>
        <Footer />
      </div>
      <ViewTabs className="tabs bottom" />
    </div>
  );
}
