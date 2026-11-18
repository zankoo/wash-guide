import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DetailSuspense, ProductDetail } from '@/components/product-detail';
import { BRAND } from '@/data/taxonomy';
import { imageSrc } from '@/data/presentation';
import { publishedDetail } from '@/data/published-catalog';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps<'/p/[id]'>): Promise<Metadata> {
  const detail = await publishedDetail((await params).id);
  if (!detail) return {};
  const p = detail.product;
  const ratios = p.dilutions.slice(0, 3).map(([scene, ratio]) => `${scene} ${ratio}`).join('；');
  const description = `${BRAND[p.brand]} ${p.name}：${p.type}。${ratios ? `官方稀释比例：${ratios}。` : ''}`;
  const image = imageSrc(p);
  return {
    title: `${p.name} · ${BRAND[p.brand]}`,
    description,
    openGraph: { title: p.name, description, images: image ? [image] : undefined },
  };
}

async function Detail({ params }: { params: PageProps<'/p/[id]'>['params'] }) {
  const detail = await publishedDetail((await params).id);
  if (!detail) notFound();
  return <ProductDetail p={detail.product} used={detail.flows} />;
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
