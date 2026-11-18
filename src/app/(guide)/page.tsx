import { CatalogProvider } from '@/components/catalog-state';
import { GuideShell } from '@/components/guide-shell';
import { publishedProducts } from '@/data/published-catalog';
import { LegacyHashRedirect } from '@/components/legacy-hash-redirect';
import { ProductBrowser } from '@/components/product-browser';
import { PageSlide } from '@/components/page-slide';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const productItems = await publishedProducts();
  return <CatalogProvider products={productItems} flows={[]}><GuideShell><PageSlide><LegacyHashRedirect /><ProductBrowser /></PageSlide></GuideShell></CatalogProvider>;
}
