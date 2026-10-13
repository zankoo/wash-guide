import { ViewTransition } from 'react';

/**
 * 选中项背后的指示块。只渲染在当前选中的那一项里，并带同一个 name：
 * 切换选中项（在 transition 里）时，它会从旧位置滑到新位置。
 * 同一页面上每组选项要用不同的 name。
 */
export function Indicator({ name }: { name: string }) {
  return (
    <ViewTransition name={name} share="indicator" default="none">
      <span className="ind" aria-hidden="true" />
    </ViewTransition>
  );
}
