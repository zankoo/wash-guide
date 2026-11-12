'use client';

import { Fragment, useEffect, useRef, type ReactNode } from 'react';
import { BRAND, BRANDS, FLOW_SOURCE, SCENES } from '@/data/taxonomy';
import type { FlowView } from '@/lib/catalog';
import { useGuide } from './guide-state';
import { useFilters } from './filter-state';
import { useCatalogData, useCatalogResults } from './catalog-state';
import { FlowCard } from './flow-card';

export function highlight(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  el.classList.add('hl');
  setTimeout(() => el.classList.remove('hl'), 2200);
  history.replaceState(history.state, '', `#${id}`);
  return true;
}

/** 按品牌 / 场景 / 搜索词筛选流程，按品牌分为「官方循环」和「产品组合」两层 */
export function FlowBrowser({ cards, intro }: { cards: FlowView[]; intro: ReactNode }) {
  const { flowTarget } = useGuide();
  const { brand, scene } = useFilters();
  const { flows: items } = useCatalogData();
  const { flows: list, query } = useCatalogResults();
  const cardById = new Map(cards.map((f) => [f.id, f]));

  // 从产品详情或「套用官方」跳转过来：等目标渲染出来后滚动并高亮
  const handled = useRef(0);
  useEffect(() => {
    if (!flowTarget || flowTarget.seq === handled.current) return;
    if (highlight(flowTarget.id)) handled.current = flowTarget.seq;
  }, [flowTarget, list.length]);

  // 直接打开 /flows#流程id，或在本页修改 hash
  const hashHandled = useRef(false);
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (id && items.some((f) => f.id === id)) highlight(id);
    };
    if (!hashHandled.current) {
      hashHandled.current = true;
      fromHash();
    }
    addEventListener('hashchange', fromHash);
    return () => removeEventListener('hashchange', fromHash);
  }, [items]);

  const showIntro = (!brand || brand === 'L') && !query && !scene;

  return (
    <>
      {showIntro && intro}
      {list.length > 3 && (
        <details className="toc">
          <summary>
            流程目录<small>{list.length} 套</small>
          </summary>
          <p className="toc-note">实线框是官方循环，虚线框是在官方循环上替换或追加步骤的产品组合</p>
          {BRANDS.map((b) => {
            const own = list.filter((f) => f.brand === b);
            if (!own.length) return null;
            return (
              <div className="toc-b" key={b}>
                <span className={`br ${b}`}>{BRAND[b]}</span>
                <div>
                  {own.map((f) => (
                    <a
                      key={f.id}
                      href={`#${f.id}`}
                      className={f.kind}
                      onClick={(e) => {
                        e.preventDefault();
                        e.currentTarget.closest('details')?.removeAttribute('open');
                        highlight(f.id);
                      }}
                    >
                      {f.name}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </details>
      )}
      {!list.length ? (
        <FlowsEmpty />
      ) : (
        BRANDS.map((b) => {
          const off = list.filter((f) => f.brand === b && f.kind === 'off');
          const combos = list.filter((f) => f.brand === b && f.kind === 'combo');
          if (!off.length && !combos.length) return null;
          return (
            <Fragment key={b}>
              <div className="brand-h">
                <h2>{BRAND[b]}</h2>
              </div>
              {off.length > 0 && (
                <>
                  <div className="tier">
                    <span className="tier-n">官方循环</span>
                    <span>
                      直接来自{FLOW_SOURCE[b]} · {off.length} 套
                    </span>
                  </div>
                  <div className="flows">
                    {off.map((f) => (
                      <Fragment key={f.id}><FlowCard f={cardById.get(f.id)!} /></Fragment>
                    ))}
                  </div>
                </>
              )}
              {combos.length > 0 && (
                <>
                  <div className="tier">
                    <span className="tier-n combo">产品组合</span>
                    <span>在官方循环上替换或追加的步骤，只列特有部分 · {combos.length} 套</span>
                  </div>
                  <div className="flows">
                    {combos.map((f) => (
                      <Fragment key={f.id}><FlowCard f={cardById.get(f.id)!} /></Fragment>
                    ))}
                  </div>
                </>
              )}
            </Fragment>
          );
        })
      )}
    </>
  );
}

/** 流程空结果：说明去掉哪个条件能看到多少个流程 */
function FlowsEmpty() {
  const { brand, scene, setScene, setQuery, clearFilters } = useFilters();
  const { setBrand } = useGuide();
  const { flowRelaxed, query } = useCatalogResults();
  const relax = [
    scene && { key: 'scene', label: `去掉场景「${SCENES.find(([k]) => k === scene)?.[1]}」`, n: flowRelaxed.scene, run: () => setScene('') },
    brand && { key: 'brand', label: `去掉品牌「${BRAND[brand]}」`, n: flowRelaxed.brand, run: () => setBrand('') },
    query && { key: 'query', label: `清空搜索「${query}」`, n: flowRelaxed.query, run: () => setQuery('') },
  ].filter((r): r is { key: string; label: string; n: number; run: () => void } => !!r && r.n > 0);
  return (
    <div className="empty" role="status">
      <p>{query ? `没有与「${query}」相关的流程` : '没有同时符合这些条件的流程'}{relax.length ? '，可以：' : '。'}</p>
      {relax.map((r) => (
        <button type="button" className="scope-clear" key={r.key} onClick={r.run}>
          {r.label}（{r.n} 个）
        </button>
      ))}
      <button type="button" className="scope-clear" onClick={clearFilters}>清除全部筛选</button>
    </div>
  );
}
