import { notFound } from 'next/navigation';
import { DetailSuspense, ProductDetail } from '@/components/product-detail';
import { Sheet } from '@/components/sheet';
import { publishedDetail } from '@/data/published-catalog';

export const dynamic = 'force-dynamic';

type Params = PageProps<'/p/[id]'>['params'];

async function Detail({ params }: { params: Params }) {
  const detail = await publishedDetail((await params).id);
  if (!detail) notFound();
  return <ProductDetail p={detail.product} used={detail.flows} />;
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
