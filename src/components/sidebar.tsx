'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MATERIALS, type MaterialId } from '@/data/materials';
import { subcategoriesFor } from '@/data/subcategories';
import { BRAND, BRANDS, CATS, SCENES } from '@/data/taxonomy';
import type { SceneId } from '@/data/types';
import { usePickers } from './filter-bar';
import { highlight } from './flow-browser';
import { useGuide } from './guide-state';
import { useFilters } from './filter-state';
import { useCatalogResults } from './catalog-state';
import { isDead } from '@/lib/catalog-results';
import { StarIcon } from './icons';
import { Indicator } from './indicator';
import { Logo } from './hero';
import { ViewTabs } from './view-tabs';

function countBy(keys: string[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const k of keys) result[k] = (result[k] ?? 0) + 1;
  return result;
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
  const { ready, brand, material, category, setCategory, scene, setScene, query } = useFilters();
  const { pickBrand, pickMaterial } = usePickers();
  const { products, flows: shownFlows, productCounts: hits, subCounts, productBrandCounts, flowBrandCounts, flowSceneCounts, materialCounts, favoriteCount, favoriteTotal } = useCatalogResults();
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

  // 「我的常用」是一个独立范围：分类目录照常用于跳转，只统计常用里的产品
  const favMode = !isFlows && category === 'fav';
  // 筛选只改变目录里的数字，不改变目录的用法：主列表在任何筛选下都按分类分区，点一下都是跳到那个分类。
  // 子分类只在不加筛选的完整列表里有分区，有筛选时不显示子分类目录。
  const narrowed = !!(query.trim() || brand || material || category);
  const indexCounts = favMode ? countBy(products.map((p) => p.category)) : hits;


  return (
    <aside className="side" aria-label="索引" inert={!ready}>
      <div className="side-id">
        <Logo />
        <span>洗车施工速查</span>
      </div>
      <ViewTabs className="tabs side-tabs" />

      {!isFlows && (
        <ul className="side-list" role="list">
          <li>
            {/* 还没收藏时仍可点开，看到如何加入常用的说明；收藏了但当前条件下一款都没有时不可点 */}
            <button
              type="button"
              className={`side-fav${favoriteCount ? '' : ' none'}`}
              aria-pressed={favMode}
              disabled={!favMode && favoriteTotal > 0 && !favoriteCount}
              onClick={() => setCategory(favMode ? '' : 'fav')}
            >
              {favMode && <Indicator name="ind-fav" />}
              <StarIcon filled />
              我的常用
              <small>{favoriteCount}</small>
            </button>
            {favMode && <Link className="scope-clear" href="/library">同步收藏与私人清单</Link>}
          </li>
        </ul>
      )}
      <div className="side-sec">
        <h2>品牌</h2>
        <ul className="side-list" role="list">
          {(['', ...BRANDS] as const).map((b) => (
            <li key={b || 'all'}>
              <button
                type="button"
                aria-pressed={brand === b}
                className={counts[b] ? undefined : 'none'}
                disabled={isDead(counts[b], brand === b, !b)}
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
                .map(([k, n]) => (
                  <li key={k || 'all'}>
                    <button
                      type="button"
                      aria-pressed={scene === k}
                      className={flowSceneCounts[k] ? undefined : 'none'}
                      disabled={isDead(flowSceneCounts[k], scene === k, !k)}
                      onClick={() => setScene(k as SceneId | '')}
                    >
                      {scene === k && <Indicator name="ind-scene" />}
                      {n}
                      <small>{flowSceneCounts[k] ?? 0}</small>
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
            <h2>适用材质</h2>
            <ul className="side-list compact" role="list">
              {([['', '全部'] as const, ...MATERIALS] as const)
                .map(([k, n]) => (
                  <li key={k || 'all'}>
                    <button
                      type="button"
                      aria-pressed={material === k}
                      className={materialCounts[k] ? undefined : 'none'}
                      disabled={isDead(materialCounts[k], material === k, !k)}
                      onClick={() => pickMaterial(k as MaterialId | '')}
                    >
                      {material === k && <Indicator name="ind-mat" />}
                      {n}
                      <small>{materialCounts[k] ?? 0}</small>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <nav className="side-sec side-categories" aria-label="分类目录">
            <h2>{favMode ? '分类（我的常用）' : '分类'}</h2>
            <ul className="side-index" role="list">
              {CATS.filter(([k]) => indexCounts[k]).map(([k, n]) => {
                const here = activeCat === `cat-${k}`;
                const subs = subcategoriesFor(k).filter((s) => subCounts[s.id]);
                return (
                  <li key={k}>
                    <a
                      href={`#cat-${k}`}
                      aria-current={here ? 'location' : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        setPin({ cat: `cat-${k}` });
                        // 链接进来时可能只看某一个分类（窄屏的分类筛选）：点别的分类时先回到全部分类再跳
                        if (category && !favMode && category !== k) setCategory('');
                        // 常用列表不折叠，不改动全部产品里各分类的展开状态
                        jumpTo(`cat-${k}`, favMode ? undefined : k);
                      }}
                    >
                      {n}
                      <small>{indexCounts[k]}</small>
                    </a>
                    {/* 常用和筛选后的列表不分子分类，没有可跳转的子分类位置 */}
                    {here && !narrowed && subs.length > 1 && (
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
          </nav>
        </>
      )}
    </aside>
  );
}
