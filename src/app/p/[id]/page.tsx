import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DetailSuspense, ProductDetail } from '@/components/product-detail';
import { BRAND, PRODUCTS, PRODUCT_BY_ID, imageSrc } from '@/data';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<'/p/[id]'>): Promise<Metadata> {
  const p = PRODUCT_BY_ID.get((await params).id);
  if (!p) return {};
  const ratios = p.d.slice(0, 3).map(([scene, ratio]) => `${scene} ${ratio}`).join('；');
  const description = `${BRAND[p.b]} ${p.n}：${p.t}。${ratios ? `官方稀释比例：${ratios}。` : ''}`;
  const image = imageSrc(p);
  return {
    title: `${p.n} · ${BRAND[p.b]}`,
    description,
    openGraph: { title: p.n, description, images: image ? [image] : undefined },
  };
}

async function Detail({ params }: { params: PageProps<'/p/[id]'>['params'] }) {
  const p = PRODUCT_BY_ID.get((await params).id);
  if (!p) notFound();
  return <ProductDetail p={p} />;
}

/** 直接打开或刷新 /p/[id] 时的独立产品页 */
export default function ProductPage({ params }: PageProps<'/p/[id]'>) {
  return (
    <div className="page-detail">
      <nav className="page-nav">
        <Link href="/">← 产品速查</Link>
        <Link href="/flows">洗车流程</Link>
      </nav>
      <article className="page-sheet">
        <DetailSuspense>
          <Detail params={params} />
        </DetailSuspense>
      </article>
    </div>
  );
}
