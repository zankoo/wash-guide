'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useLayoutEffect, useRef, ViewTransition } from 'react';
import { MATERIAL_NAME } from '@/data/materials';
import { SUBCATS } from '@/data/subcategories';
import { BRAND, CAT_NAME, CATS } from '@/data/taxonomy';
import { relevance, suggestions } from '@/lib/search';
import { useGuide } from './guide-state';
import { useFilters } from './filter-state';
import { useCatalogData, useCatalogResults } from './catalog-state';
import { ProductCard } from './product-card';

/** 折叠状态下每个分类预览的卡片数（CSS 按列数只露出一整行） */
const PEEK = 6;

/** 按品牌 / 分类 / 搜索词筛选服务端渲染好的产品卡片，按分类 → 子分类分组；「全部」视图下大分类默认折叠 */
export function ProductBrowser() {
  const { brand, material, category, setCategory, setQuery, clearFilters } = useFilters();
  const { expanded, setExpanded, jumpTo, setBrand, setMaterial } = useGuide();
  const { products: items } = useCatalogData();
  const { products: list, matchedProducts: matched, query, relaxed, favoriteTotal } = useCatalogResults();
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
    if (category === 'fav' && !favoriteTotal) {
      return (
        <p className="empty list" key={listKey} ref={top}>
          还没有常用产品。打开产品详情，点「加入常用」，下次在这里就能直接找到。
        </p>
      );
    }
    // 告诉用户去掉哪个条件能看到多少款；只列出确实能看到产品的放宽方式
    const relax = [
      category && { key: 'category', label: category === 'fav' ? '退出「我的常用」' : `去掉分类「${CAT_NAME[category]}」`, n: relaxed.category, run: () => setCategory('') },
      brand && { key: 'brand', label: `去掉品牌「${BRAND[brand]}」`, n: relaxed.brand, run: () => setBrand('') },
      material && { key: 'material', label: `去掉材质「${MATERIAL_NAME[material]}」`, n: relaxed.material, run: () => setMaterial('') },
      query && { key: 'query', label: `清空搜索「${query}」`, n: relaxed.query, run: () => setQuery('') },
    ].filter((r): r is { key: string; label: string; n: number; run: () => void } => !!r && r.n > 0);
    return (
      <div className="empty list" key={listKey} ref={top} role="status">
        <p>{query ? `没有与「${query}」相关的产品` : '没有同时符合这些条件的产品'}{relax.length ? '，可以：' : '。'}</p>
        {relax.map((r) => (
          <button type="button" className="scope-clear" key={r.key} onClick={r.run}>
            {r.label}（{r.n} 款）
          </button>
        ))}
        {query && !relax.length && (
          <p className="empty-try">
            试试相关用途：
            {suggestions(query).map((word) => <button type="button" className="scope-clear" key={word} onClick={() => setQuery(word)}>{word}</button>)}
          </p>
        )}
        <button type="button" className="scope-clear" onClick={clearFilters}>清除全部筛选</button>
      </div>
    );
  }

  // 选了分类时完整展开
  const browsing = !category && !brand && !material;
  const compact = !browsing;

  // 搜索按分类分组，每组内按相关度排序。
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
              <>找到 {list.length} 款与「{query}」相关的产品，按分类分组</>
            )}
          </p>
          {CATS.map(([c, name]) => {
            const group = ranked.filter(({ p }) => p.category === c);
            return group.length ? <section className="sec" id={`cat-${c}`} key={c}>
              <div className="sec-h"><h2>{name}</h2><span className="n">{group.length} 款</span></div>
              <div className="grid results">{group.map(({ p }) => <Fragment key={p.id}><ProductCard p={p} eager={items.indexOf(p) < 6} /></Fragment>)}</div>
            </section> : null;
          })}
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
          const group = list.filter((p) => p.category === k);
          if (!group.length) return null;
          const subs = SUBCATS.filter((s) => s.category === k)
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
              {!compact && subs.length > 1 && (
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
                      {s.name}
                      <small>{s.items.length}</small>
                    </a>
                  ))}
                </nav>
              )}
              {compact ? (
                <div className="grid">{group.map((p) => <Fragment key={p.id}><ProductCard p={p} eager={items.indexOf(p) < 6} /></Fragment>)}</div>
              ) : collapsed ? (
                <div className="grid peek">
                  {group.slice(0, PEEK).map((p) => (
                    <Fragment key={p.id}><ProductCard p={p} eager={items.indexOf(p) < 6} /></Fragment>
                  ))}
                </div>
              ) : (
                subs.map((s) => (
                  <div className="subgrp" key={s.id} id={`sub-${s.id}`}>
                    {!compact && subs.length > 1 && (
                      <h3 className="sub-h">
                        {s.name}
                        <small>{s.items.length}</small>
                      </h3>
                    )}
                    <div className="grid">
                      {s.items.map((p) => (
                        <Fragment key={p.id}><ProductCard p={p} eager={items.indexOf(p) < 6} /></Fragment>
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
