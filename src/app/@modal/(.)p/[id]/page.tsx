import { notFound } from 'next/navigation';
import { DetailSuspense, ProductDetail } from '@/components/product-detail';
import { Sheet } from '@/components/sheet';
import { PRODUCTS, PRODUCT_BY_ID } from '@/data';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

type Params = PageProps<'/p/[id]'>['params'];

async function Detail({ params }: { params: Params }) {
  const p = PRODUCT_BY_ID.get((await params).id);
  if (!p) notFound();
  return <ProductDetail p={p} />;
}

/** 从列表点开产品：拦截 /p/[id]，以弹出面板显示；面板立即出现，内容在 Suspense 里补上 */
export default function ProductSheet({ params }: PageProps<'/p/[id]'>) {
  return (
    <Sheet>
      <DetailSuspense>
        <Detail params={params} />
      </DetailSuspense>
    </Sheet>
  );
}
