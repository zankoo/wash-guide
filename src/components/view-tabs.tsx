'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FlowIcon, GridIcon } from './icons';

export function ViewTabs() {
  const isFlows = usePathname() === '/flows';
  return (
    <nav className="tabs" aria-label="视图">
      <Link className="tab" href="/" aria-current={isFlows ? undefined : 'page'} scroll={false}>
        <GridIcon />
        产品速查
      </Link>
      <Link className="tab" href="/flows" aria-current={isFlows ? 'page' : undefined} scroll={false}>
        <FlowIcon />
        洗车流程与组合
      </Link>
    </nav>
  );
}
