import { FilterBar, type CountTable } from '@/components/filter-bar';
import { Footer, Masthead } from '@/components/hero';
import { ViewTabs } from '@/components/view-tabs';
import { BRANDS, FLOWS, PRODUCTS } from '@/data';

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

const productCounts = countBy(PRODUCTS, (p) => p.c);
const flowCounts = countBy(FLOWS, (f) => f.sc);

export default function GuideLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Masthead />
      <FilterBar productCounts={productCounts} flowCounts={flowCounts} />
      <div className="wrap">
        <main>{children}</main>
      </div>
      <Footer />
      <ViewTabs className="tabs bottom" />
    </>
  );
}
