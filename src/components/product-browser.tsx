'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useDeferredValue, useEffect, useLayoutEffect, useRef, ViewTransition, type ReactNode } from 'react';
import { MATERIAL_NAME, type MaterialId } from '@/data/materials';
import { SUBCATS } from '@/data/subcategories';
import { CAT_NAME, CATS } from '@/data/taxonomy';
import type { BrandId, CategoryId } from '@/data/types';
import { useFavorites } from '@/lib/favorites';
import { matchesQuery, relevance, type RankFields } from '@/lib/search';
import { useGuide, type SearchHits } from './guide-state';

export interface ProductItem {
  id: string;
  b: BrandId;
  c: CategoryId;
  /** 子分类 id */
  sub: string;
  /** 官方明确列出的适用材质 */
  mt: MaterialId[];
  /** 归一化后的搜索文本（见 fold） */
  text: string;
  /** 搜索结果排序用的字段 */
  rank: RankFields;
  /** 服务端渲染好的卡片 */
  card: ReactNode;
}

/** 折叠状态下每个分类预览的卡片数（CSS 按列数只露出一整行） */
const PEEK = 6;

/** 按品牌 / 分类 / 搜索词筛选服务端渲染好的产品卡片，按分类 → 子分类分组；「全部」视图下大分类默认折叠 */
export function ProductBrowser({ items }: { items: ProductItem[] }) {
  const { brand, material, category, setCategory, query: rawQuery, expanded, setExpanded, jumpTo, setHits } = useGuide();
  const query = useDeferredValue(rawQuery.trim());
  const favorites = useFavorites();
  const router = useRouter();

  // 页面空闲时预取一个产品详情：顺带加载详情面板的脚本，第一次点开产品就不用再等它们下载
  const warmId = items[0]?.id;
  useEffect(() => {
    if (!warmId) return;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => router.prefetch(`/p/${warmId}`));
    return () => cancel(handle);
  }, [router, warmId]);

  const inCategory = (p: ProductItem) =>
    !category || (category === 'fav' ? favorites.includes(p.id) : p.c === category);
  // 先按品牌 / 材质 / 搜索词筛选，再按分类筛选：搜索时左栏和分类标签要显示每个分类各命中几款
  const matched = items.filter(
    (p) => (!brand || p.b === brand) && (!material || p.mt.includes(material)) && (!query || matchesQuery(p.text, query)),
  );
  const list = matched.filter(inCategory);

  // 把搜索命中数交给左栏和分类标签；用字符串比较，内容没变就不更新
  const hitsKey = query ? JSON.stringify(countHits(matched)) : '';
  useEffect(() => {
    setHits(hitsKey ? (JSON.parse(hitsKey) as SearchHits) : null);
  }, [hitsKey, setHits]);
  // 离开产品页（例如切到流程页）时清掉，左栏不再按搜索结果显示
  useEffect(() => () => setHits(null), [setHits]);

  // 品牌 / 分类切换时整个列表淡入淡出（不给每张卡片单独命名，244 张太重）
  const listKey = `${brand}|${material}|${category}|${query ? 'q' : ''}`;

  // 已经滚进列表里时切换分类：回到新列表开头，不然会停在新列表中间的某个位置
  // （切换品牌时停在哪里由 GuideProvider 决定）。用 layout effect 在转场截取新画面之前完成滚动
  const top = useRef<HTMLDivElement>(null);
  const lastCategory = useRef(category);
  useLayoutEffect(() => {
    if (lastCategory.current === category) return;
    lastCategory.current = category;
    const el = top.current;
    if (el && el.getBoundingClientRect().top < parseFloat(getComputedStyle(el).scrollMarginTop)) {
      el.scrollIntoView({ block: 'start' });
    }
  }, [category]);

  // 搜索时选着某个分类：说明只在这个分类里找，并能一键回到全部分类
  const scope = query && category ? (category === 'fav' ? '常用' : CAT_NAME[category]) : '';

  if (!list.length) {
    return (
      <p className="empty list" key={listKey} ref={top}>
        {category === 'fav' && !favorites.length && !query ? (
          '还没有常用产品。打开产品详情，点「加入常用」，下次在这里就能直接找到。'
        ) : scope && matched.length ? (
          <>
            「{scope}」里没有与「{query}」相关的产品，其他分类里有 {matched.length} 款。
            <button type="button" className="scope-clear" onClick={() => setCategory('')}>
              在全部分类中查看
            </button>
          </>
        ) : (
          '没有匹配的产品，换个关键词、品牌或材质试试。'
        )}
      </p>
    );
  }

  // 选了分类时完整展开
  const browsing = !category;

  // 搜索时不再按分类分组，而是按相关度排成一个列表：名称命中的产品排最前
  if (query) {
    const ranked = list
      .map((p, i) => ({ p, i, score: relevance(p.rank, query) }))
      .sort((a, b) => b.score - a.score || a.i - b.i);
    return (
      <ViewTransition key={listKey} enter="list-in" exit="list-out" default="none">
        <div className="list" ref={top}>
          <p className="found" role="status">
            {scope ? (
              <>
                在「{scope}」中找到 {list.length} 款与「{query}」相关的产品
                <button type="button" className="scope-clear" onClick={() => setCategory('')}>
                  查看全部 {matched.length} 款
                </button>
              </>
            ) : (
              <>找到 {list.length} 款与「{query}」相关的产品，名称匹配的排在前面</>
            )}
          </p>
          <div className="grid results">
            {ranked.map(({ p }) => (
              <Fragment key={p.id}>{p.card}</Fragment>
            ))}
          </div>
        </div>
      </ViewTransition>
    );
  }

  return (
    <ViewTransition key={listKey} enter="list-in" exit="list-out" default="none">
      <div className="list" ref={top}>
        {material && (
          <p className="found" role="status">
            只显示官方写明可用于「{MATERIAL_NAME[material]}」的产品
          </p>
        )}
        {CATS.map(([k, name]) => {
          const group = list.filter((p) => p.c === k);
          if (!group.length) return null;
          const subs = SUBCATS.filter((s) => s.c === k)
            .map((s) => ({ ...s, items: group.filter((p) => p.sub === s.id) }))
            .filter((s) => s.items.length);
          const collapsible = browsing && group.length > PEEK;
          const collapsed = collapsible && !expanded.has(k);

          return (
            <section className="sec" key={k} id={`cat-${k}`}>
              <div className="sec-h">
                <h2>{name}</h2>
                <span className="n">{group.length} 款</span>
              </div>
              {subs.length > 1 && (
                <nav className="subnav" aria-label={`${name}子分类`}>
                  {subs.map((s) => (
                    <a
                      key={s.id}
                      href={`#sub-${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        jumpTo(`sub-${s.id}`, k);
                      }}
                    >
                      {s.n}
                      <small>{s.items.length}</small>
                    </a>
                  ))}
                </nav>
              )}
              {collapsed ? (
                <div className="grid peek">
                  {group.slice(0, PEEK).map((p) => (
                    <Fragment key={p.id}>{p.card}</Fragment>
                  ))}
                </div>
              ) : (
                subs.map((s) => (
                  <div className="subgrp" key={s.id} id={`sub-${s.id}`}>
                    {subs.length > 1 && (
                      <h3 className="sub-h">
                        {s.n}
                        <small>{s.items.length}</small>
                      </h3>
                    )}
                    <div className="grid">
                      {s.items.map((p) => (
                        <Fragment key={p.id}>{p.card}</Fragment>
                      ))}
                    </div>
                  </div>
                ))
              )}
              {collapsible && (
                <button
                  type="button"
                  className="more"
                  aria-expanded={!collapsed}
                  onClick={() => {
                    setExpanded(k, collapsed);
                    // 收起后回到分类开头，不然会停在下一个分类中间
                    if (!collapsed) jumpTo(`cat-${k}`);
                  }}
                >
                  {collapsed ? `展开全部 ${group.length} 款` : '收起'}
                </button>
              )}
            </section>
          );
        })}
      </div>
    </ViewTransition>
  );
}

/** 按分类统计命中数，'' 为合计 */
function countHits(matched: ProductItem[]): SearchHits {
  const hits: SearchHits = { '': matched.length };
  for (const p of matched) hits[p.c] = (hits[p.c] ?? 0) + 1;
  return hits;
}
