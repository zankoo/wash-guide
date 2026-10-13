'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useDeferredValue, useEffect, ViewTransition, type ReactNode } from 'react';
import { SUBCATS } from '@/data/subcategories';
import { CATS } from '@/data/taxonomy';
import type { BrandId, CategoryId } from '@/data/types';
import { useFavorites } from '@/lib/favorites';
import { matchesQuery, relevance, type RankFields } from '@/lib/search';
import { useGuide } from './guide-state';

export interface ProductItem {
  id: string;
  b: BrandId;
  c: CategoryId;
  /** 子分类 id */
  sub: string;
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
  const { brand, category, query: rawQuery, expanded, setExpanded, jumpTo } = useGuide();
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
  const list = items.filter(
    (p) => (!brand || p.b === brand) && inCategory(p) && (!query || matchesQuery(p.text, query)),
  );

  // 品牌 / 分类切换时整个列表淡入淡出（不给每张卡片单独命名，244 张太重）
  const listKey = `${brand}|${category}|${query ? 'q' : ''}`;

  if (!list.length) {
    return (
      <p className="empty" key={listKey}>
        {category === 'fav' && !favorites.length
          ? '还没有常用产品。打开产品详情，点「加入常用」，下次在这里就能直接找到。'
          : '没有匹配的产品，换个关键词或品牌试试。'}
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
        <div>
          <p className="found" role="status">
            找到 {list.length} 款与「{query}」相关的产品，名称匹配的排在前面
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
      <div>
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
