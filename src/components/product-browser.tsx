'use client';

import { Fragment, useDeferredValue, type ReactNode } from 'react';
import { CATS } from '@/data/taxonomy';
import type { BrandId, CategoryId } from '@/data/types';
import { matchesQuery } from '@/lib/search';
import { useGuide } from './guide-state';

export interface ProductItem {
  id: string;
  b: BrandId;
  c: CategoryId;
  /** 小写的搜索文本 */
  text: string;
  /** 服务端渲染好的卡片 */
  card: ReactNode;
}

/** 按品牌 / 分类 / 搜索词筛选服务端渲染好的产品卡片，并按分类分组 */
export function ProductBrowser({ items }: { items: ProductItem[] }) {
  const { brand, category, query: rawQuery } = useGuide();
  const query = useDeferredValue(rawQuery.trim());
  const list = items.filter(
    (p) => (!brand || p.b === brand) && (!category || p.c === category) && (!query || matchesQuery(p.text, query)),
  );

  if (!list.length) return <p className="empty">没有匹配的产品，换个关键词试试。</p>;

  return CATS.map(([k, name, en]) => {
    const group = list.filter((p) => p.c === k);
    if (!group.length) return null;
    return (
      <section className="sec" key={k}>
        <div className="sec-h">
          <h2>{name}</h2>
          <span className="en">{en}</span>
          <span className="n">{String(group.length).padStart(2, '0')} 款</span>
        </div>
        <div className="grid">
          {group.map((p) => (
            <Fragment key={p.id}>{p.card}</Fragment>
          ))}
        </div>
      </section>
    );
  });
}
