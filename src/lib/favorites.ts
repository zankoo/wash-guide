'use client';

import { CHANGED, enqueue, linkedDevice } from './library-journal';
import { useSyncExternalStore } from 'react';

// 本机收藏及可选同步资料库的离线副本。
const KEY = 'wash-favorites';
const EMPTY: readonly string[] = [];
const listeners = new Set<() => void>();
let cache: { raw: string | null; ids: readonly string[] } = { raw: null, ids: EMPTY };

export function readFavorites(): readonly string[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {}
  // useSyncExternalStore 要求内容不变时返回同一个数组
  if (raw !== cache.raw) {
    let ids: readonly string[] = EMPTY;
    try {
      const v: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(v)) ids = v.filter((x): x is string => typeof x === 'string');
    } catch {}
    cache = { raw, ids };
  }
  return cache.ids;
}

function subscribe(l: () => void) {
  listeners.add(l);
  // 其他标签页修改时同步
  const onStorage = (e: StorageEvent) => e.key === KEY && l();
  addEventListener('storage', onStorage);
  return () => {
    listeners.delete(l);
    removeEventListener('storage', onStorage);
  };
}

export function useFavorites(): readonly string[] {
  return useSyncExternalStore(subscribe, readFavorites, () => EMPTY);
}

export function storeFavorites(next: readonly string[]) {
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  listeners.forEach(l => l());
}

export function toggleFavorite(id: string) {
  const ids = readFavorites();
  const on = !ids.includes(id);
  const scope = linkedDevice();
  storeFavorites(on ? [...ids, id] : ids.filter(x => x !== id));
  if (scope) {
    enqueue(scope,[{ id,on }]).then(() => window.dispatchEvent(new Event(CHANGED))).catch(() => {
      window.dispatchEvent(new CustomEvent('wash-library-error', { detail:'本机存储不可用，此次收藏尚未同步。' }));
    });
  }
}
