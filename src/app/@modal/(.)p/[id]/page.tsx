import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product-detail';
import { Sheet } from '@/components/sheet';
import { PRODUCTS, PRODUCT_BY_ID } from '@/data';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

// 允许这次导航等内容就绪后再提交（约 100ms，内容是静态预渲染的）：
// 面板和里面的瓶子必须和「卡片里的瓶子消失」在同一次提交里出现，瓶子的变形动画才能配对。
// 如果用 Suspense 先提交面板、再补内容，两者分成两次提交，变形就不会发生。
export const instant = false;

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
