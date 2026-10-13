'use client';

import { useEffect, useState } from 'react';
import { SUBCATS } from '@/data/subcategories';
import { BRAND, BRANDS, CATS, SCENES } from '@/data/taxonomy';
import type { BrandId, SceneId } from '@/data/types';
import { useFavorites } from '@/lib/favorites';
import type { CountTable } from './filter-bar';
import { highlight } from './flow-browser';
import { useGuide } from './guide-state';
import { StarIcon } from './icons';
import { Indicator } from './indicator';
import { Logo } from './hero';
import { ViewTabs } from './view-tabs';

/** 流程目录只需要这几个字段 */
export interface FlowIndexItem {
  id: string;
  b: BrandId;
  sc: SceneId;
  name: string;
  kind: 'off' | 'combo';
}

/** 滚动监听：返回当前位于视口上部的那个元素的 id */
function useScrollSpy(selector: string, deps: unknown[]): string {
  const [active, setActive] = useState('');
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>(selector)];
    if (!els.length) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        // 取视口里最靠上的那个
        const top = [...visible].sort((a, b) => a[1] - b[1])[0];
        if (top) setActive(top[0]);
      },
      // 只看搜索栏下方到视口 40% 高度之间的区域
      { rootMargin: '-90px 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return active;
}

/** 桌面左侧索引栏：品牌、分类目录（产品页）或场景与流程目录（流程页） */
export function Sidebar({
  productCounts,
  flowCounts,
  flows,
}: {
  productCounts: CountTable;
  flowCounts: CountTable;
  flows: FlowIndexItem[];
}) {
  const { isFlows, brand, setBrand, category, setCategory, scene, setScene, query, jumpTo } = useGuide();
  const favorites = useFavorites();
  const counts = isFlows ? flowCounts : productCounts;

  const spyCat = useScrollSpy('.sec', [isFlows, brand, category, query]);
  const spySub = useScrollSpy('.subgrp', [isFlows, brand, category, query]);
  const spyFlow = useScrollSpy('.flow', [isFlows, brand, scene, query]);

  function pickBrand(b: BrandId | '') {
    setBrand(b);
    if (category && category !== 'fav' && !productCounts[b][category]) setCategory('');
    if (scene && !flowCounts[b][scene]) setScene('');
  }

  const shownFlows = flows.filter((f) => (!brand || f.b === brand) && (!scene || f.sc === scene));

  return (
    <aside className="side" aria-label="索引">
      <div className="side-id">
        <Logo />
        <span>洗车施工速查</span>
      </div>
      <ViewTabs className="tabs side-tabs" />

      <div className="side-sec">
        <h2>品牌</h2>
        <ul className="side-list" role="list">
          {(['', ...BRANDS] as const).map((b) => (
            <li key={b || 'all'}>
              <button type="button" aria-pressed={brand === b} onClick={() => pickBrand(b)}>
                {brand === b && <Indicator name="ind-brand" />}
                {b && <span className={`dot ${b}`} />}
                {b ? BRAND[b] : '全部品牌'}
                <small>{counts[b]['']}</small>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isFlows ? (
        <>
          <div className="side-sec">
            <h2>场景</h2>
            <ul className="side-list compact" role="list">
              {([['', '全部场景'] as const, ...SCENES] as const)
                .filter(([k]) => flowCounts[brand][k])
                .map(([k, n]) => (
                  <li key={k || 'all'}>
                    <button type="button" aria-pressed={scene === k} onClick={() => setScene(k as SceneId | '')}>
                      {scene === k && <Indicator name="ind-scene" />}
                      {n}
                      <small>{flowCounts[brand][k]}</small>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <nav className="side-sec" aria-label="流程目录">
            <h2>流程目录</h2>
            {BRANDS.map((b) => {
              const own = shownFlows.filter((f) => f.b === b);
              if (!own.length) return null;
              return (
                <div className="side-group" key={b}>
                  <span className={`br ${b}`}>{BRAND[b]}</span>
                  <ul className="side-index" role="list">
                    {own.map((f) => (
                      <li key={f.id}>
                        <a
                          href={`#${f.id}`}
                          className={f.kind}
                          aria-current={spyFlow === f.id ? 'location' : undefined}
                          onClick={(e) => {
                            e.preventDefault();
                            highlight(f.id);
                          }}
                        >
                          {f.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>
        </>
      ) : (
        <nav className="side-sec" aria-label="分类目录">
          <h2>分类</h2>
          <ul className="side-list" role="list">
            {(favorites.length > 0 || category === 'fav') && (
              <li>
                <button
                  type="button"
                  className="side-fav"
                  aria-pressed={category === 'fav'}
                  onClick={() => setCategory(category === 'fav' ? '' : 'fav')}
                >
                  {category === 'fav' && <Indicator name="ind-cat" />}
                  <StarIcon filled />
                  常用
                  <small>{favorites.length}</small>
                </button>
              </li>
            )}
            {category && (
              <li>
                <button type="button" onClick={() => setCategory('')}>
                  显示全部分类
                </button>
              </li>
            )}
          </ul>
          <ul className="side-index" role="list">
            {CATS.filter(([k]) => productCounts[brand][k]).map(([k, n]) => {
              const here = spyCat === `cat-${k}`;
              const subs = SUBCATS.filter((s) => s.c === k);
              return (
                <li key={k}>
                  <a
                    href={`#cat-${k}`}
                    aria-current={here ? 'location' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      // 选了其他分类或「常用」时先回到全部，目标分类才在列表里
                      if (category && category !== k) setCategory('');
                      jumpTo(`cat-${k}`, k);
                    }}
                  >
                    {n}
                    <small>{productCounts[brand][k]}</small>
                  </a>
                  {here && subs.length > 1 && (
                    <ul className="side-subs" role="list">
                      {subs.map((s) => (
                        <li key={s.id}>
                          <a
                            href={`#sub-${s.id}`}
                            aria-current={spySub === `sub-${s.id}` ? 'location' : undefined}
                            onClick={(e) => {
                              e.preventDefault();
                              jumpTo(`sub-${s.id}`, k);
                            }}
                          >
                            {s.n}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </aside>
  );
}
