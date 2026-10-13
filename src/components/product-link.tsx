'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps } from 'react';

/**
 * 打开产品详情的链接：不在进入视口时预取（列表有 200 多款），
 * 而是在鼠标移入或手指按下的那一刻预取，点开面板时数据通常已经到了。
 */
export function ProductLink({ id, ...props }: { id: string } & Omit<ComponentProps<typeof Link>, 'href'>) {
  const router = useRouter();
  const href = `/p/${id}`;
  const warm = () => router.prefetch(href);
  return (
    <Link
      {...props}
      href={href}
      scroll={false}
      prefetch={false}
      // 只有「打开详情」这种转场里，卡片和面板里的瓶子才配对做变形（见 ProductMorph）
      transitionTypes={['open-detail']}
      onPointerEnter={warm}
      onPointerDown={warm}
      onFocus={warm}
    />
  );
}
