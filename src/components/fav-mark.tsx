'use client';

import { useFavorites } from '@/lib/favorites';
import { StarIcon } from './icons';

/** 列表卡片上的「已加入常用」标记 */
export function FavMark({ id }: { id: string }) {
  if (!useFavorites().includes(id)) return null;
  return (
    <span className="fav-mark" title="已加入常用">
      <StarIcon filled />
      <span className="sr">已加入常用</span>
    </span>
  );
}
