'use client';

import { useSyncExternalStore } from 'react';
function subscribe(listener: () => void) {
  addEventListener('online', listener);
  addEventListener('offline', listener);
  return () => { removeEventListener('online', listener); removeEventListener('offline', listener); };
}
export function useOnline() { return useSyncExternalStore(subscribe, () => navigator.onLine, () => true); }
/** 离线客户端路由不一定已缓存对应的 RSC；用规范化后的 HTML 页面导航。 */
export function navigateOffline(event: { preventDefault: () => void }, href: string) {
  if (navigator.onLine) return;
  event.preventDefault();
  window.location.assign(href);
}
