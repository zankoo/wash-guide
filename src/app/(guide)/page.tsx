import { LegacyHashRedirect } from '@/components/legacy-hash-redirect';
import { ProductBrowser, type ProductItem } from '@/components/product-browser';
import { ProductCard } from '@/components/product-card';
import { BRANDS, PRODUCTS, productSearchText } from '@/data';

// 同一分类内按品牌顺序（Labo → Maniac → Koch → CarPro）排列
const items: ProductItem[] = PRODUCTS.toSorted((a, b) => BRANDS.indexOf(a.b) - BRANDS.indexOf(b.b)).map((p) => ({
  id: p.id,
  b: p.b,
  c: p.c,
  text: productSearchText(p),
  card: <ProductCard p={p} />,
}));

export default function ProductsPage() {
  return (
    <>
      <LegacyHashRedirect />
      <ProductBrowser items={items} />
    </>
  );
}
