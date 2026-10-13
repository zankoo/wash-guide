'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FlowIcon, GridIcon } from './icons';

/** 产品速查 / 洗车流程切换：桌面在顶栏，手机在底部固定栏 */
export function ViewTabs({ className }: { className: string }) {
  const isFlows = usePathname() === '/flows';
  return (
    <nav className={className} aria-label="视图">
      <Link className="tab" href="/" aria-current={isFlows ? undefined : 'page'} scroll={false}>
        <GridIcon />
        产品速查
      </Link>
      <Link className="tab" href="/flows" aria-current={isFlows ? 'page' : undefined} scroll={false}>
        <FlowIcon />
        洗车流程
      </Link>
    </nav>
  );
}
