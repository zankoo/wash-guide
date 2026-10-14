import { LegacyHashRedirect } from '@/components/legacy-hash-redirect';
import { ProductBrowser, type ProductItem } from '@/components/product-browser';
import { PageSlide } from '@/components/page-slide';
import { ProductCard } from '@/components/product-card';
import { PRODUCT_RANK, PRODUCTS, SUB_OF, materialsOf, productRankFields, productSearchText } from '@/data';

// 按子分类排列，同一子分类内各品牌同类产品放在一起
const items: ProductItem[] = PRODUCTS.toSorted((a, b) => PRODUCT_RANK.get(a.id)! - PRODUCT_RANK.get(b.id)!).map(
  (p, i) => ({
    id: p.id,
    b: p.b,
    c: p.c,
    sub: SUB_OF.get(p.id)!.id,
    mt: materialsOf(p),
    text: productSearchText(p),
    rank: productRankFields(p),
    card: <ProductCard p={p} eager={i < 6} />,
  }),
);

export default function ProductsPage() {
  return (
    <PageSlide>
      <LegacyHashRedirect />
      <ProductBrowser items={items} />
    </PageSlide>
  );
}
