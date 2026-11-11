'use client';

import { useEffect, useState } from 'react';
import { MATERIALS, type MaterialId } from '@/data/materials';
import { SUBCATS } from '@/data/subcategories';
import { BRAND, BRANDS, CATS, SCENES } from '@/data/taxonomy';
import type { SceneId } from '@/data/types';
import { usePickers } from './filter-bar';
import { highlight } from './flow-browser';
import { useGuide } from './guide-state';
import { useFilters } from './filter-state';
import { useCatalogResults } from './catalog-state';
import { StarIcon } from './icons';
import { Indicator } from './indicator';
import { Logo } from './hero';
import { ViewTabs } from './view-tabs';

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

/** 点击目录跳转时「钉住」的目标：平滑滚动途中不跟随滚动监听，避免沿途的分类被依次点亮、展开 */
interface Pin {
  cat?: string;
  sub?: string;
  flow?: string;
}

/**
 * 钉住目标后，等这次滚动停下来（150ms 内没有新的 scroll 事件）再恢复跟随滚动；
 * 用户中途自己滚动（滚轮、手指、键盘）时立即恢复。
 */
function usePin(): [Pin | null, (p: Pin) => void] {
  const [pin, setPin] = useState<Pin | null>(null);
  useEffect(() => {
    if (!pin) return;
    let timer = 0;
    const release = () => setPin(null);
    const onScroll = () => {
      clearTimeout(timer);
      timer = window.setTimeout(release, 150);
    };
    const opts = { passive: true } as const;
    addEventListener('scroll', onScroll, opts);
    addEventListener('wheel', release, opts);
    addEventListener('touchstart', release, opts);
    addEventListener('keydown', release);
    return () => {
      clearTimeout(timer);
      removeEventListener('scroll', onScroll);
      removeEventListener('wheel', release);
      removeEventListener('touchstart', release);
      removeEventListener('keydown', release);
    };
  }, [pin]);
  return [pin, setPin];
}

/** 桌面左侧索引栏：品牌、分类目录（产品页）或场景与流程目录（流程页） */
export function Sidebar() {
  const { isFlows, jumpTo, expanded } = useGuide();
  const { brand, material, category, setCategory, scene, setScene, query } = useFilters();
  const { pickBrand, pickMaterial } = usePickers();
  const { products, flows: shownFlows, productCounts: hits, subCounts, productBrandCounts, flowBrandCounts, flowSceneCounts, materialCounts, favoriteCount } = useCatalogResults();
  const counts = isFlows ? flowBrandCounts : productBrandCounts;
  const visibleProductIds = products.map((p) => p.id).join(',');
  // 依赖实际渲染结果，而不是尚未完成 deferred 筛选的输入值。
  const spyCat = useScrollSpy('.sec', [isFlows, visibleProductIds, expanded]);
  const spySub = useScrollSpy('.subgrp', [isFlows, visibleProductIds, expanded]);
  const spyFlow = useScrollSpy('.flow', [isFlows, shownFlows.map((f) => f.id).join(',')]);
  // 点击跳转时以被点的目标为准；用户自己滚动时跟着滚动位置走
  const [pin, setPin] = usePin();
  const activeCat = pin ? pin.cat : spyCat;
  const activeSub = pin ? pin.sub : spySub;
  const activeFlow = pin ? pin.flow : spyFlow;

  // 产品页有搜索词时，左栏分类显示每个分类的命中数
  const searching = !isFlows && (query.trim() !== '' || material.length > 0 || !!brand || !!category);


  return (
    <aside className="side" aria-label="索引">
      <div className="side-id">
        <Logo />
        <span>洗车施工速查</span>
      </div>
      <ViewTabs className="tabs side-tabs" />

      {!isFlows && <div className="side-sec side-favorites"><button type="button" className="side-fav" aria-pressed={category === 'fav'} onClick={() => setCategory(category === 'fav' ? '' : 'fav')}><StarIcon filled /> 我的常用 · {favoriteCount}</button></div>}
      <div className="side-sec">
        <h2>品牌</h2>
        <ul className="side-list" role="list">
          {(['', ...BRANDS] as const).map((b) => (
            <li key={b || 'all'}>
              <button
                type="button"
                aria-pressed={brand === b}
                className={counts[b] ? undefined : 'none'}
                onClick={() => pickBrand(b)}
              >
                {brand === b && <Indicator name="ind-brand" />}
                {b && <span className={`dot ${b}`} />}
                {b ? BRAND[b] : '全部品牌'}
                <small>{counts[b] ?? 0}</small>
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
                .filter(([k]) => flowSceneCounts[k])
                .map(([k, n]) => (
                  <li key={k || 'all'}>
                    <button type="button" aria-pressed={scene === k} onClick={() => setScene(k as SceneId | '')}>
                      {scene === k && <Indicator name="ind-scene" />}
                      {n}
                      <small>{flowSceneCounts[k]}</small>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <nav className="side-sec" aria-label="流程目录">
            <h2>流程目录</h2>
            {BRANDS.map((b) => {
              const own = shownFlows.filter((f) => f.brand === b);
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
                          aria-current={activeFlow === f.id ? 'location' : undefined}
                          onClick={(e) => {
                            e.preventDefault();
                            setPin({ flow: f.id });
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
        <>
          <div className="side-sec">
            <h2>适用材质（多选取交集）</h2>
            <ul className="side-list compact" role="list">
              {([['', '全部'] as const, ...MATERIALS] as const)
                .filter(([k]) => !k || material.includes(k) || materialCounts[k])
                .map(([k, n]) => (
                  <li key={k || 'all'}>
                    <button type="button" aria-pressed={(k ? material.includes(k) : material.length === 0)} onClick={() => pickMaterial(k as MaterialId | '')}>
                      {n}
                      <small>{k ? materialCounts[k] : products.length}</small>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <nav className="side-sec side-categories" aria-label="分类目录">
            <h2>{searching ? '分类（筛选结果）' : '分类'}</h2>
            <ul className="side-list" role="list">
              {(favoriteCount > 0 || category === 'fav') && (
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
                    <small>{favoriteCount}</small>
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
            {searching ? (
              // 搜索时列表不按分类分区，没有可以跳转的位置：分类改为在搜索结果里筛选，再点一次取消
              <ul className="side-list side-hits" role="list">
                {CATS.filter(([k]) => hits[k] || category === k).map(([k, n]) => (
                  <li key={k}>
                    <button
                      type="button"
                      aria-pressed={category === k}
                      className={hits[k] ? undefined : 'none'}
                      disabled={!hits[k] && category !== k}
                      onClick={() => setCategory(category === k ? '' : k)}
                    >
                      {category === k && <Indicator name="ind-cat" />}
                      {n}
                      <small>{hits[k] ?? 0}</small>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="side-index" role="list">
                {CATS.filter(([k]) => hits[k] || category === k).map(([k, n]) => {
                  const here = activeCat === `cat-${k}`;
                  const subs = SUBCATS.filter((s) => s.category === k && subCounts[s.id]);
                  return (
                    <li key={k}>
                      <a
                        href={`#cat-${k}`}
                        aria-current={here ? 'location' : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          // 选了其他分类或「常用」时先回到全部，目标分类才在列表里
                          if (category && category !== k) setCategory('');
                          setPin({ cat: `cat-${k}` });
                          jumpTo(`cat-${k}`, k);
                        }}
                      >
                        {n}
                        <small>{hits[k]}</small>
                      </a>
                      {here && subs.length > 1 && (
                        <ul className="side-subs" role="list">
                          {subs.map((s) => (
                            <li key={s.id}>
                              <a
                                href={`#sub-${s.id}`}
                                aria-current={activeSub === `sub-${s.id}` ? 'location' : undefined}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPin({ cat: `cat-${k}`, sub: `sub-${s.id}` });
                                  jumpTo(`sub-${s.id}`, k);
                                }}
                              >
                                {s.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>
        </>
      )}
    </aside>
  );
}
