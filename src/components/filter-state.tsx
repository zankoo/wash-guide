'use client';

import { createContext, use, useSyncExternalStore, type ReactNode } from 'react';
import { parseFilters, type Filters } from '@/lib/filters';

const EVENT = 'guide-filters';
export function readFilterSearch() { return window.location.search; }
function subscribe(listener: () => void) {
  window.addEventListener('popstate', listener);
  window.addEventListener(EVENT, listener);
  return () => { window.removeEventListener('popstate', listener); window.removeEventListener(EVENT, listener); };
}
export function updateFilters(values: Record<string, string>, replace = false) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(values)) {
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }
  if (url.href === window.location.href) return;
  window.history[replace ? 'replaceState' : 'pushState'](window.history.state, '', url.pathname + url.search + url.hash);
  window.dispatchEvent(new Event(EVENT));
}
interface FilterState extends Filters {
  ready: boolean;
  filterSearch: string;
  setQuery: (query: string) => void;
  setCategory: (category: Filters['category']) => void;
  setScene: (scene: Filters['scene']) => void;
  clearFilters: () => void;
}
const Context = createContext<FilterState | null>(null);
export function FilterProvider({ children }: { children: ReactNode }) {
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const filterSearch = useSyncExternalStore(subscribe, readFilterSearch, () => '');
  const filters = parseFilters(filterSearch);
  return <Context value={{ ...filters, filterSearch, ready,
    setQuery: (q) => updateFilters({ q }, true),
    setCategory: (category) => updateFilters({ category }),
    setScene: (scene) => updateFilters({ scene }),
    clearFilters: () => updateFilters({ brand: '', material: '', q: '', category: '', scene: '' }),
  }}>{children}</Context>;
}
export function useFilters() {
  const value = use(Context);
  if (!value) throw new Error('useFilters requires FilterProvider');
  return value;
}
