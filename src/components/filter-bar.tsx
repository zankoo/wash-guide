'use client';

import { usePathname } from 'next/navigation';
import { BRAND, BRANDS, CATS, SCENES } from '@/data/taxonomy';
import type { BrandId } from '@/data/types';
import { useGuide } from './guide-state';
import { SearchIcon } from './icons';

/** counts[品牌 或 '' 表示全部][分类/场景 或 '' 表示全部] */
export type CountTable = Record<string, Record<string, number>>;

const DOT_CLASS: Record<BrandId, string> = { L: '', M: 'm', K: 'k', C: 'c' };

export function FilterBar({ productCounts, flowCounts }: { productCounts: CountTable; flowCounts: CountTable }) {
  const isFlows = usePathname() === '/flows';
  const { brand, setBrand, query, setQuery, category, setCategory, scene, setScene } = useGuide();

  function pickBrand(b: BrandId | '') {
    setBrand(b);
    // 新品牌下没有当前分类 / 场景时回到「全部」
    if (category && !productCounts[b][category]) setCategory('');
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
          <div className="seg" role="group" aria-label="品牌">
            <button type="button" aria-pressed={brand === ''} onClick={() => pickBrand('')}>
              全部品牌
            </button>
            {BRANDS.map((b) => (
              <button key={b} type="button" aria-pressed={brand === b} onClick={() => pickBrand(b)}>
                <span className={`dot ${DOT_CLASS[b]}`} />
                {BRAND[b]}
              </button>
            ))}
          </div>
          <label className="search">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isFlows ? '搜索流程、场景或产品，如 PPF、镀膜、REVÌTAX' : '搜索产品、用途或材质，如 PPF、皮革、1:10'
              }
              aria-label="搜索"
              autoComplete="off"
            />
          </label>
        </div>
        <div className="chips" role="group" aria-label={isFlows ? '场景' : '分类'}>
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
