'use client';

import { useSyncExternalStore } from 'react';

// 常用产品：只存在当前设备的 localStorage 里（无痕模式或存储被禁用时退化为空列表）
const KEY = 'wash-favorites';
const EMPTY: readonly string[] = [];
const listeners = new Set<() => void>();
let cache: { raw: string | null; ids: readonly string[] } = { raw: null, ids: EMPTY };

function read(): readonly string[] {
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
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function toggleFavorite(id: string) {
  const ids = read();
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}
