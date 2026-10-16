'use client';

import { useEffect, useRef } from 'react';
import { MATERIALS, type MaterialId } from '@/data/materials';
import { BRAND, BRAND_SHORT, BRANDS, CATS, SCENES } from '@/data/taxonomy';
import type { BrandId } from '@/data/types';
import { useFavorites } from '@/lib/favorites';
import { useGuide } from './guide-state';
import { CloseIcon, SearchIcon, StarIcon } from './icons';
import { Indicator } from './indicator';

/** counts[品牌 或 '' 表示全部][分类/场景 或 '' 表示全部] */
export type CountTable = Record<string, Record<string, number>>;
/** 产品数再按材质分一层：counts[材质 或 ''][品牌 或 ''][分类 / 子分类 或 ''] */
export type ProductCounts = Record<string, CountTable>;

/**
 * 切换品牌 / 材质：新的筛选下没有当前材质、分类或场景时回到「全部」，
 * 这样分类标签和左栏里不会选着一个已经看不到的分类。
 */
export function usePickers(productCounts: ProductCounts, flowCounts: CountTable) {
  const { brand, setBrand, material, setMaterial, category, setCategory, scene, setScene } = useGuide();
  function keepCategory(b: BrandId | '', mt: MaterialId | '') {
    if (category && category !== 'fav' && !productCounts[mt][b][category]) setCategory('');
  }
  return {
    pickBrand(b: BrandId | '') {
      setBrand(b);
      const mt = material && !productCounts[material][b][''] ? '' : material;
      if (mt !== material) setMaterial(mt);
      keepCategory(b, mt);
      if (scene && !flowCounts[b][scene]) setScene('');
    },
    pickMaterial(mt: MaterialId | '') {
      setMaterial(mt);
      keepCategory(brand, mt);
    },
  };
}

export function FilterBar({ productCounts, flowCounts }: { productCounts: ProductCounts; flowCounts: CountTable }) {
  const { isFlows, brand, material, query, setQuery, category, setCategory, scene, setScene, hits } = useGuide();
  const { pickBrand, pickMaterial } = usePickers(productCounts, flowCounts);
  const input = useRef<HTMLInputElement>(null);
  const favorites = useFavorites();
  const counts = productCounts[material];

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

  const chips = isFlows
    ? [['', '全部场景'] as const, ...SCENES].map(([k, n]) => ({ k, n, count: flowCounts[brand][k] ?? 0 }))
    : [['', '全部'] as const, ...CATS].map(([k, n]) => ({
        k,
        n,
        // 有搜索词时显示该分类命中几款，没命中的分类不显示（选着的除外）
        count: (query.trim() && hits ? hits[k] : counts[brand][k]) ?? 0,
      }));
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
              onKeyDown={(e) => {
                if (e.key !== 'Enter' || e.nativeEvent.isComposing) return;
                // 有鼠标的设备：回车直接打开排在第一的产品；手机：收起键盘露出结果
                const first = document.querySelector<HTMLElement>('.results .card');
                if (!isFlows && first && matchMedia('(hover: hover)').matches) first.click();
                else e.currentTarget.blur();
              }}
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
              {brand === '' && <Indicator name="ind-seg" />}
              全部品牌
            </button>
            {BRANDS.map((b) => (
              <button key={b} type="button" aria-pressed={brand === b} onClick={() => pickBrand(b)}>
                {brand === b && <Indicator name="ind-seg" />}
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
          {!isFlows && (
            <label className={`mat-pick${material ? ' on' : ''}`}>
              <span className="sr">适用材质</span>
              <select value={material} onChange={(e) => pickMaterial(e.target.value as MaterialId | '')}>
                <option value="">全部材质</option>
                {MATERIALS.filter(([k]) => productCounts[k][brand]['']).map(([k, n]) => (
                  <option key={k} value={k}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        <div className="chips" role="group" aria-label={isFlows ? '场景' : '分类'}>
          {!isFlows && (favorites.length > 0 || category === 'fav') && (
            <button
              type="button"
              className="chip fav-chip"
              aria-pressed={category === 'fav'}
              onClick={() => setCategory(category === 'fav' ? '' : 'fav')}
            >
              {category === 'fav' && <Indicator name="ind-chip" />}
              <StarIcon filled />
              常用
              <small>{favorites.length}</small>
            </button>
          )}
          {chips
            .filter((c) => c.count || c.k === selected)
            .map(({ k, n, count }) => (
              <button
                key={k}
                type="button"
                className="chip"
                aria-pressed={selected === k}
                onClick={() => (isFlows ? setScene(k as typeof scene) : setCategory(k as typeof category))}
              >
                {selected === k && <Indicator name="ind-chip" />}
                {n}
                <small>{count}</small>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
