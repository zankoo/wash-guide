import { ViewTransition, type ReactNode } from 'react';

const DIRECTION = { 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' };

/**
 * 页面内容的方向转场：去流程（前进）时内容向左滑出、新内容从右滑入，回产品（后退）时相反。
 * 必须放在 page 里而不是 layout：layout 跨导航保持不变，不会触发进入 / 离开。
 */
export function PageSlide({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={DIRECTION} exit={DIRECTION} default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
