'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, use, useState, type ReactNode } from 'react';
import type { BrandId, CategoryId, SceneId } from '@/data/types';

interface FlowTarget {
  id: string;
  /** 每次跳转递增，重复点同一个流程也会再次滚动和高亮 */
  seq: number;
}

/** 跳转目标流程：只带筛选需要的字段，避免把整份数据打进客户端 */
export interface FlowRef {
  id: string;
  b: BrandId;
  sc: SceneId;
}

interface GuideState {
  brand: BrandId | '';
  setBrand: (b: BrandId | '') => void;
  query: string;
  setQuery: (q: string) => void;
  category: CategoryId | '';
  setCategory: (c: CategoryId | '') => void;
  scene: SceneId | '';
  setScene: (s: SceneId | '') => void;
  flowTarget: FlowTarget | null;
  goToFlow: (flow: FlowRef) => void;
}

const GuideContext = createContext<GuideState | null>(null);

export function useGuide(): GuideState {
  const ctx = use(GuideContext);
  if (!ctx) throw new Error('useGuide must be used inside <GuideProvider>');
  return ctx;
}

/** 两个视图共享的筛选状态：品牌和搜索词跨视图保留，分类 / 场景各自独立 */
export function GuideProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [brand, setBrand] = useState<BrandId | ''>('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryId | ''>('');
  const [scene, setScene] = useState<SceneId | ''>('');
  const [flowTarget, setFlowTarget] = useState<FlowTarget | null>(null);

  function goToFlow(f: FlowRef) {
    // 目标流程被当前筛选隐藏时清空筛选，保证能滚动到它
    if ((brand && brand !== f.b) || (scene && scene !== f.sc) || query) {
      setBrand('');
      setScene('');
      setQuery('');
    }
    setFlowTarget((t) => ({ id: f.id, seq: (t?.seq ?? 0) + 1 }));
    if (pathname !== '/flows') router.push('/flows', { scroll: false });
  }

  return (
    <GuideContext
      value={{ brand, setBrand, query, setQuery, category, setCategory, scene, setScene, flowTarget, goToFlow }}
    >
      {children}
    </GuideContext>
  );
}
