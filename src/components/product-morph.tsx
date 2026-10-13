'use client';

import { usePathname } from 'next/navigation';
import { ViewTransition, type ReactNode } from 'react';

/**
 * 产品图的共享元素：列表卡片和详情面板里的同一个瓶子用同一个 name，
 * 打开详情时瓶子从卡片位置变形放大到面板里，关闭时飞回去。
 *
 * 同一时刻页面上只能有一个元素用这个 name：详情打开（路径是 /p/该产品）时，
 * 卡片这边去掉命名包裹，让「卡片里的消失、面板里的出现」配成一对。
 * 只在 open-detail 转场里配对；切换品牌等其他转场里卡片不参与，避免卡片满屏乱飞。
 */
const SHARE = { 'open-detail': 'morph', default: 'none' };
export function ProductMorph({ id, inCard, children }: { id: string; inCard?: boolean; children: ReactNode }) {
  const open = usePathname() === `/p/${id}`;
  if (inCard && open) return <div className="morph-rest">{children}</div>;
  return (
    <ViewTransition name={`p-${id}`} share={SHARE} default="none">
      <div className="morph">{children}</div>
    </ViewTransition>
  );
}
