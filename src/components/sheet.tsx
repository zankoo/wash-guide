'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect, useRef, useState, ViewTransition, type ReactNode } from 'react';
import { CloseIcon } from './icons';

/**
 * 产品详情弹出面板（拦截路由 /p/[id] 时使用）：原生 <dialog> 负责焦点约束、背景 inert 和 Esc。
 * 打开：面板包在 ViewTransition 里由转场滑入（支持的浏览器关掉 CSS 进入动画）。外层这个 ViewTransition
 * 也是瓶子变形能配对的前提：React 只在新插入子树的外层有 ViewTransition 时，才去里面找同名元素配对。
 * 面板里不能再套 Suspense，否则内容会被推迟到滑入动画结束后才显示。
 * 关闭：router.back() 是浏览器后退（popstate），不触发 View Transition，所以用 CSS 先滑出再后退。
 */
export function Sheet({ children }: { children: ReactNode }) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);
  const hidden = useRef(false);
  const [closing, setClosing] = useState(false);

  // 用 layout effect 打开 / 关闭：Activity 隐藏路由时会运行清理函数，避免留下一个看不见的模态框
  useLayoutEffect(() => {
    const d = ref.current;
    if (!d) return;
    hidden.current = false;
    if (!d.open) d.showModal();
    return () => {
      hidden.current = true;
      d.close();
      setClosing(false);
    };
  }, []);

  function close() {
    if (closing) return;
    setClosing(true);
    const instant = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => router.back(), instant ? 0 : 280);
  }

  return (
    <ViewTransition enter="sheet-in" default="none">
      <dialog
        ref={ref}
        className="sheet"
        data-closing={closing || undefined}
        aria-labelledby="d-name"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        // 浏览器强制关闭（例如连按 Esc）时同步路由。close 事件是异步派发的：
        // 卸载时的 close() 可能在重新挂载、面板已再次打开之后才到达，这时忽略
        onClose={(e) => {
          if (!e.currentTarget.open && !hidden.current && !closing) router.back();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <button type="button" className="sh-close" onClick={close} aria-label="关闭">
          <CloseIcon />
        </button>
        <div className="sh-scroll">{children}</div>
      </dialog>
    </ViewTransition>
  );
}
