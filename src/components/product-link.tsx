'use client';

import Link from 'next/link';
import { useState, type ComponentProps } from 'react';

/**
 * 打开产品详情的链接（Partial Prefetching 推荐写法，见 Next 文档「Hover-triggered prefetch」）：
 * - 默认 'auto'：只预取 /p/[id] 路由共享的 App Shell（面板 + 骨架屏，一个路由只有一份），
 *   所以任何时候点开，面板都能立即出现，不用等服务器；
 * - 鼠标移入、手指按下或键盘聚焦时改为 true：再预取这个产品自己的内容，通常点开时内容也已经到了。
 * 之前写成 prefetch={false} 会连共享的 App Shell 都不预取，网络慢时点开要等一下才出面板。
 */
export function ProductLink({ id, ...props }: { id: string } & Omit<ComponentProps<typeof Link>, 'href' | 'prefetch'>) {
  const [intent, setIntent] = useState(false);
  const warm = () => setIntent(true);
  return (
    <Link
      {...props}
      href={`/p/${id}`}
      scroll={false}
      prefetch={intent ? true : 'auto'}
      onPointerEnter={warm}
      onPointerDown={warm}
      onFocus={warm}
    />
  );
}
