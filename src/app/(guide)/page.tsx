import { CatalogProvider } from '@/components/catalog-state';
import { GuideShell } from '@/components/guide-shell';
import { productItems } from '@/data/catalog';
import { LegacyHashRedirect } from '@/components/legacy-hash-redirect';
import { ProductBrowser } from '@/components/product-browser';
import { PageSlide } from '@/components/page-slide';

export default function ProductsPage() {
  return <CatalogProvider products={productItems} flows={[]}><GuideShell><PageSlide><LegacyHashRedirect /><ProductBrowser /></PageSlide></GuideShell></CatalogProvider>;
}
