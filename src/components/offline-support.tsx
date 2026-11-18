'use client';

import { useEffect } from 'react';
import { useFavorites } from '@/lib/favorites';
import { useOnline } from '@/lib/connectivity';

/** 联网、重新聚焦和收藏变化时更新常用页，缓存任务由 SW 延长生命周期。 */
export function OfflineSupport() {
  const favorites = useFavorites();
  const online = useOnline();
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/catalog-sw.js', { updateViaCache: 'none' }).catch(() => {});
  }, []);
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;
    const refresh = () => {
      if (!navigator.onLine) return;
      navigator.serviceWorker.ready.then((reg) => {
        reg.update().catch(() => {});
        if (favorites.length) reg.active?.postMessage({ type: 'cache-pages', urls: favorites.map((id) => `/p/${id}`) });
      }).catch(() => {});
    };
    refresh();
    addEventListener('focus', refresh);
    navigator.serviceWorker.addEventListener('controllerchange', refresh);
    return () => {
      removeEventListener('focus', refresh);
      navigator.serviceWorker.removeEventListener('controllerchange', refresh);
    };
  }, [favorites, online]);
  return online ? null : <p className="offline-status" role="status">离线模式 · 可查看已缓存页面</p>;
}
