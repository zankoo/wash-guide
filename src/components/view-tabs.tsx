'use client';

import Link from 'next/link';
import { useGuide } from './guide-state';
import { FlowIcon, GridIcon } from './icons';
import { Indicator } from './indicator';
import { WakeToggle } from './wake-toggle';

/**
 * 产品速查 / 洗车流程切换：窄屏在顶栏和手机底部栏，桌面在左侧索引栏。
 * 去流程是「前进」、回产品是「后退」，页面内容按方向左右滑动；选中背景从一个标签滑到另一个。
 */
export function ViewTabs({ className }: { className: string }) {
  const { isFlows } = useGuide();
  // 同一页面上有几组标签，指示块的名字要各不相同
  const ind = `ind-tab-${className.split(' ').at(-1)}`;
  const mark = <Indicator name={ind} />;
  return (
    <nav className={className} aria-label="视图">
      <Link
        className="tab"
        href="/"
        aria-current={isFlows ? undefined : 'page'}
        scroll={false}
        transitionTypes={['nav-back']}
      >
        {!isFlows && mark}
        <GridIcon />
        产品速查
      </Link>
      <Link
        className="tab"
        href="/flows"
        aria-current={isFlows ? 'page' : undefined}
        scroll={false}
        transitionTypes={['nav-forward']}
      >
        {isFlows && mark}
        <FlowIcon />
        洗车流程
      </Link>
      {/* 屏幕常亮只放在手机底部栏 */}
      {className.includes('bottom') && <WakeToggle />}
    </nav>
  );
}
