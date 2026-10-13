'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { CloseIcon } from './icons';

/**
 * 产品详情弹出面板（拦截路由 /p/[id] 时使用）：原生 <dialog> 负责焦点约束、背景 inert 和 Esc，
 * 关闭时先播放退出动画再 router.back() 回到列表。
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
    <dialog
      ref={ref}
      className="sheet"
      data-closing={closing || undefined}
      aria-labelledby="d-name"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      // 浏览器强制关闭（例如连按 Esc）时同步路由
      onClose={() => {
        if (!hidden.current && !closing) router.back();
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
  );
}
