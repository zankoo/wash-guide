'use client';

import { useState } from 'react';
import { toggleFavorite, useFavorites } from '@/lib/favorites';
import { StarIcon } from './icons';

/** 详情面板里的「加入常用」开关；加入的那一刻星标弹一下并放出一圈光环 */
export function FavButton({ id }: { id: string }) {
  const on = useFavorites().includes(id);
  // 只在点击加入时播放动画；打开已收藏产品的详情时不播
  const [bump, setBump] = useState(0);
  return (
    <button
      type="button"
      className="fav"
      aria-pressed={on}
      onClick={() => {
        if (!on) setBump((n) => n + 1);
        toggleFavorite(id);
      }}
    >
      <span key={bump} className={bump && on ? 'bump' : undefined}>
        <StarIcon filled={on} />
      </span>
      {on ? '已加入常用' : '加入常用'}
    </button>
  );
}
