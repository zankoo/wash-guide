import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product-detail';
import { Sheet } from '@/components/sheet';
import { PRODUCTS, PRODUCT_BY_ID } from '@/data';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

/** 从列表点开产品：拦截 /p/[id]，以弹出面板显示 */
export default async function ProductSheet({ params }: PageProps<'/p/[id]'>) {
  const p = PRODUCT_BY_ID.get((await params).id);
  if (!p) notFound();
  return (
    <Sheet>
      <ProductDetail p={p} />
    </Sheet>
  );
}
