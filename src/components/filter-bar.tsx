'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { BRAND, BRAND_SHORT, BRANDS, CATS, SCENES } from '@/data/taxonomy';
import type { BrandId } from '@/data/types';
import { useFavorites } from '@/lib/favorites';
import { useGuide } from './guide-state';
import { CloseIcon, SearchIcon, StarIcon } from './icons';

/** counts[品牌 或 '' 表示全部][分类/场景 或 '' 表示全部] */
export type CountTable = Record<string, Record<string, number>>;

export function FilterBar({ productCounts, flowCounts }: { productCounts: CountTable; flowCounts: CountTable }) {
  const isFlows = usePathname() === '/flows';
  const { brand, setBrand, query, setQuery, category, setCategory, scene, setScene } = useGuide();
  const input = useRef<HTMLInputElement>(null);
  const favorites = useFavorites();

  // 桌面上按 / 直接聚焦搜索框
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select, [contenteditable], dialog')) return;
      e.preventDefault();
      input.current?.focus();
    }
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  function pickBrand(b: BrandId | '') {
    setBrand(b);
    // 新品牌下没有当前分类 / 场景时回到「全部」
    if (category && category !== 'fav' && !productCounts[b][category]) setCategory('');
    if (scene && !flowCounts[b][scene]) setScene('');
  }

  const chips = isFlows
    ? [['', '全部场景'] as const, ...SCENES].map(([k, n]) => ({ k, n, count: flowCounts[brand][k] ?? 0 }))
    : [['', '全部'] as const, ...CATS].map(([k, n]) => ({ k, n, count: productCounts[brand][k] ?? 0 }));
  const selected = isFlows ? scene : category;

  return (
    <div className="bar">
      <div className="wrap">
        <div className="row">
          <label className="search">
            <SearchIcon />
            <input
              ref={input}
              type="search"
              enterKeyHint="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              // 手机上按「搜索」收起键盘，露出结果
              onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
              placeholder={isFlows ? '搜流程、场景或产品，如 PPF、镀膜' : '搜产品、用途或材质，如 铁粉、皮革、1:10'}
              aria-label={isFlows ? '搜索流程' : '搜索产品'}
              autoComplete="off"
            />
            {query ? (
              <button type="button" className="clear" onClick={() => setQuery('')} aria-label="清空搜索">
                <CloseIcon />
              </button>
            ) : (
              <kbd>/</kbd>
            )}
          </label>
          <div className="seg" role="group" aria-label="品牌">
            <button type="button" aria-pressed={brand === ''} onClick={() => pickBrand('')}>
              全部品牌
            </button>
            {BRANDS.map((b) => (
              <button key={b} type="button" aria-pressed={brand === b} onClick={() => pickBrand(b)}>
                <span className={`dot ${b}`} />
                {BRAND[b]}
              </button>
            ))}
          </div>
          <label className={`brand-pick ${brand}`}>
            <span className="sr">品牌</span>
            <span className={`dot ${brand}`} />
            <select value={brand} onChange={(e) => pickBrand(e.target.value as BrandId | '')}>
              <option value="">全部品牌</option>
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {BRAND_SHORT[b]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="chips" role="group" aria-label={isFlows ? '场景' : '分类'}>
          {!isFlows && (favorites.length > 0 || category === 'fav') && (
            <button
              type="button"
              className="chip fav-chip"
              aria-pressed={category === 'fav'}
              onClick={() => setCategory(category === 'fav' ? '' : 'fav')}
            >
              <StarIcon filled />
              常用
              <small>{favorites.length}</small>
            </button>
          )}
          {chips
            .filter((c) => c.count)
            .map(({ k, n, count }) => (
              <button
                key={k}
                type="button"
                className="chip"
                aria-pressed={selected === k}
                onClick={() => (isFlows ? setScene(k as typeof scene) : setCategory(k as typeof category))}
              >
                {n}
                <small>{count}</small>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
