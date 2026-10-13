'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, startTransition, use, useEffect, useRef, useState, type ReactNode } from 'react';
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
  /** 当前视图是否流程页；打开产品详情（/p/…）时保持原来的视图不变 */
  isFlows: boolean;
  brand: BrandId | '';
  setBrand: (b: BrandId | '') => void;
  query: string;
  setQuery: (q: string) => void;
  /** 'fav' 表示只看常用产品 */
  category: CategoryId | 'fav' | '';
  setCategory: (c: CategoryId | 'fav' | '') => void;
  scene: SceneId | '';
  setScene: (s: SceneId | '') => void;
  flowTarget: FlowTarget | null;
  goToFlow: (flow: FlowRef) => void;
  /** 产品页里已展开的分类（折叠的分类只露出一行） */
  expanded: ReadonlySet<CategoryId>;
  setExpanded: (c: CategoryId, open: boolean) => void;
  /** 展开分类 c（可选），提交后再滚动到元素 id */
  jumpTo: (id: string, c?: CategoryId) => void;
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
  const [brand, setBrandState] = useState<BrandId | ''>('');
  const [query, setQuery] = useState('');
  const [category, setCategoryState] = useState<CategoryId | 'fav' | ''>('');
  const [scene, setSceneState] = useState<SceneId | ''>('');
  // 筛选切换放在 transition 里：选中指示块滑动、列表淡入淡出都由 View Transition 呈现。
  // 搜索词保持同步更新，输入不卡顿（列表那边用 useDeferredValue）。
  const setBrand = (b: BrandId | '') => startTransition(() => setBrandState(b));
  const setCategory = (c: CategoryId | 'fav' | '') => startTransition(() => setCategoryState(c));
  const setScene = (sc: SceneId | '') => startTransition(() => setSceneState(sc));
  const [flowTarget, setFlowTarget] = useState<FlowTarget | null>(null);
  // 从流程页点开产品时路径变成 /p/…，但底下还是流程页：只在非详情路径上更新视图
  const [isFlows, setIsFlows] = useState(pathname === '/flows');
  if (!pathname.startsWith('/p/') && (pathname === '/flows') !== isFlows) setIsFlows(pathname === '/flows');
  const [expanded, setExpandedSet] = useState<ReadonlySet<CategoryId>>(new Set());
  const [scrollTarget, setScrollTarget] = useState<{ id: string } | null>(null);

  function setExpanded(c: CategoryId, open: boolean) {
    // 放在 transition 里，展开 / 收起时分类区块的高度变化会以 View Transition 动画呈现
    startTransition(() =>
      setExpandedSet((s) => {
        if (s.has(c) === open) return s;
        const next = new Set(s);
        if (open) next.add(c);
        else next.delete(c);
        return next;
      }),
    );
  }

  function jumpTo(id: string, c?: CategoryId) {
    if (c) setExpanded(c, true);
    // 等展开的内容提交到 DOM 之后再滚动
    startTransition(() => setScrollTarget({ id }));
  }

  // 每次跳转都是新对象，重复点同一个目标也会再滚动一次
  const lastScroll = useRef<{ id: string } | null>(null);
  useEffect(() => {
    if (!scrollTarget || lastScroll.current === scrollTarget) return;
    lastScroll.current = scrollTarget;
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(scrollTarget.id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  }, [scrollTarget]);

  function goToFlow(f: FlowRef) {
    // 目标流程被当前筛选隐藏时清空筛选，保证能滚动到它
    if ((brand && brand !== f.b) || (scene && scene !== f.sc) || query) {
      setBrand('');
      setScene('');
      setQuery('');
    }
    setFlowTarget((t) => ({ id: f.id, seq: (t?.seq ?? 0) + 1 }));
    if (pathname !== '/flows') router.push('/flows', { scroll: false, transitionTypes: ['nav-forward'] });
  }

  return (
    <GuideContext
      value={{
        isFlows,
        brand,
        setBrand,
        query,
        setQuery,
        category,
        setCategory,
        scene,
        setScene,
        flowTarget,
        goToFlow,
        expanded,
        setExpanded,
        jumpTo,
      }}
    >
      {children}
    </GuideContext>
  );
}
