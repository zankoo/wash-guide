'use client';

import { useEffect, useRef } from 'react';
import { MATERIALS, MATERIAL_NAME } from '@/data/materials';
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

/** 切换单项筛选时保留其他已选条件。 */
export function usePickers() {
  const { setBrand, setMaterial } = useGuide();
  // 保留用户选择；无交集时由空状态提供清除入口，避免悄悄取消筛选。
  return { pickBrand: setBrand, pickMaterial: setMaterial };
}

export function FilterBar({ productCounts, flowCounts }: { productCounts: ProductCounts; flowCounts: CountTable }) {
  const { isFlows, brand, material, query, setQuery, category, setCategory, scene, setScene, hits, clearFilters } = useGuide();
  const { pickBrand, pickMaterial } = usePickers();
  const input = useRef<HTMLInputElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--bar-h', `${el.getBoundingClientRect().height + 12}px`);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const favorites = useFavorites();
  const counts = productCounts[''];

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
        count: (hits ? hits[k] : counts[brand][k]) ?? 0,
      }));
  const selected = isFlows ? scene : category;

  return (
    <div className="bar" ref={bar}>
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
            <details className="material-picker">
              <summary>材质{material.length ? ` · ${material.length}` : ' · 多选'}</summary>
              <div className="material-options">
                {MATERIALS.map(([k, n]) => (
                  <label key={k}><input type="checkbox" checked={material.includes(k)} onChange={() => pickMaterial(k)} />{n}</label>
                ))}
              </div>
            </details>
          )}
        </div>
        {(brand || material.length > 0 || category || scene || query) && (
          <div className="active-filters" role="group" aria-label="已选条件">
            {brand && <button onClick={() => pickBrand('')} aria-label={`移除品牌 ${BRAND[brand]}`}>{BRAND[brand]} ×</button>}
            {!isFlows && material.map((m) => <button key={m} onClick={() => pickMaterial(m)} aria-label={`移除材质 ${MATERIAL_NAME[m]}`}>材质：{MATERIAL_NAME[m]} ×</button>)}
            {!isFlows && category && <button onClick={() => setCategory('')}>分类：{category === 'fav' ? '我的常用' : CATS.find(([k]) => k === category)?.[1]} ×</button>}
            {isFlows && scene && <button onClick={() => setScene('')}>{SCENES.find(([k]) => k === scene)?.[1]} ×</button>}
            {query && <button onClick={() => setQuery('')}>搜索：{query} ×</button>}
            <button onClick={clearFilters}>清除全部</button>
          </div>
        )}
        <div className="chips" role="group" aria-label={isFlows ? '场景' : '分类'}>
          {!isFlows && (
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
