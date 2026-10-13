'use client';

import { useEffect } from 'react';
import { useFavorites } from '@/lib/favorites';

/** 注册 Service Worker，并把常用产品的详情页缓存下来，没信号时也能打开 */
export function OfflineSupport() {
  const favorites = useFavorites();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator) || !favorites.length) return;
    navigator.serviceWorker.ready
      .then((reg) => reg.active?.postMessage({ type: 'cache-pages', urls: favorites.map((id) => `/p/${id}`) }))
      .catch(() => {});
  }, [favorites]);

  return null;
}
