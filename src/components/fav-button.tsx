'use client';

import { toggleFavorite, useFavorites } from '@/lib/favorites';
import { StarIcon } from './icons';

/** 详情面板里的「加入常用」开关 */
export function FavButton({ id }: { id: string }) {
  const on = useFavorites().includes(id);
  return (
    <button type="button" className="fav" aria-pressed={on} onClick={() => toggleFavorite(id)}>
      <StarIcon filled={on} />
      {on ? '已加入常用' : '加入常用'}
    </button>
  );
}
