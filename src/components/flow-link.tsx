'use client';

import type { ReactNode } from 'react';
import { useGuide, type FlowRef } from './guide-state';

/** 跳到流程页并滚动高亮指定流程 */
export function FlowLink({ flow, className, children }: { flow: FlowRef; className?: string; children: ReactNode }) {
  const { goToFlow } = useGuide();
  return (
    <button type="button" className={className} onClick={() => goToFlow(flow)}>
      {children}
    </button>
  );
}
