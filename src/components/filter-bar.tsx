'use client';

import { useEffect, useRef } from 'react';
import { MATERIALS, MATERIAL_NAME, type MaterialId } from '@/data/materials';
import { BRAND, BRAND_SHORT, BRANDS, CATS, SCENES } from '@/data/taxonomy';
import type { BrandId } from '@/data/types';
import { useGuide } from './guide-state';
import { useFilters } from './filter-state';
import { useCatalogResults } from './catalog-state';
import { isDead } from '@/lib/catalog-results';
import { CloseIcon, SearchIcon, StarIcon } from './icons';
import { Indicator } from './indicator';

/** 切换单项筛选时保留其他已选条件。 */
export function usePickers() {
  const { setBrand, setMaterial } = useGuide();
  // 保留用户选择；无交集时由空状态提供清除入口，避免悄悄取消筛选。
  return { pickBrand: setBrand, pickMaterial: setMaterial };
}

export function FilterBar() {
  const { isFlows } = useGuide();
  const { brand, material, query, setQuery, category, setCategory, scene, setScene, clearFilters } = useFilters();
  const { productCounts, flowSceneCounts, favoriteCount, favoriteTotal, materialCounts, productBrandCounts, flowBrandCounts } = useCatalogResults();
  const brandCounts = isFlows ? flowBrandCounts : productBrandCounts;
  const { pickBrand, pickMaterial } = usePickers();
  const input = useRef<HTMLInputElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      // 只记录筛选栏真实高度：分类标题按它吸顶，若掺入留白会在两者之间露出一条缝；锚点留白由各自的 scroll-margin 负责。
      document.documentElement.style.setProperty('--bar-h', `${el.getBoundingClientRect().height}px`);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    ? [['', '全部场景'] as const, ...SCENES].map(([k, n]) => ({ k, n, count: flowSceneCounts[k] ?? 0 }))
    : [['', '全部'] as const, ...CATS].map(([k, n]) => ({
        k,
        n,
        // 数字是点这个分类之后会看到几款；一款都没有的变淡且不可点
        count: productCounts[k] ?? 0,
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
              <button key={b} type="button" aria-pressed={brand === b} disabled={isDead(brandCounts[b], brand === b, false)} onClick={() => pickBrand(b)}>
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
                <option key={b} value={b} disabled={isDead(brandCounts[b], brand === b, false)}>
                  {BRAND_SHORT[b]}（{brandCounts[b] ?? 0}）
                </option>
              ))}
            </select>
          </label>
          {!isFlows && (
            <label className={`mat-pick${material ? ' on' : ''}`}>
              <span className="sr">适用材质</span>
              <select value={material} onChange={(e) => pickMaterial(e.target.value as MaterialId | '')}>
                <option value="">全部材质</option>
                {MATERIALS.map(([k, n]) => (
                  <option key={k} value={k} disabled={isDead(materialCounts[k], material === k, false)}>
                    {n}（{materialCounts[k] ?? 0}）
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        {(brand || material || category || scene || query) && (
          <div className="active-filters" role="group" aria-label="已选条件">
            {brand && <button onClick={() => pickBrand('')} aria-label={`移除品牌 ${BRAND[brand]}`}>{BRAND[brand]} ×</button>}
            {!isFlows && material && <button onClick={() => pickMaterial('')} aria-label={`移除材质 ${MATERIAL_NAME[material]}`}>材质：{MATERIAL_NAME[material]} ×</button>}
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
              disabled={category !== 'fav' && favoriteTotal > 0 && !favoriteCount}
              onClick={() => setCategory(category === 'fav' ? '' : 'fav')}
            >
              {category === 'fav' && <Indicator name="ind-chip" />}
              <StarIcon filled />
              常用
              <small>{favoriteCount}</small>
            </button>
          )}
          {chips
            .map(({ k, n, count }) => (
              <button
                key={k}
                type="button"
                className="chip"
                aria-pressed={selected === k}
                disabled={isDead(count, selected === k, !k)}
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
