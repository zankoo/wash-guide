'use client';

import { createContext, use, useDeferredValue, type ReactNode } from 'react';
import type { ProductItem, FlowItem, ProductChip } from '@/lib/catalog';
import { selectCatalog } from '@/lib/catalog-results';
import { useFavorites } from '@/lib/favorites';
import { useFilters } from './filter-state';

const Data = createContext<{ products: ProductItem[]; flows: FlowItem[]; chips: ProductChip[] } | null>(null);
const Results = createContext<(ReturnType<typeof selectCatalog> & { query: string }) | null>(null);
export function CatalogProvider({ products, flows, chips = products, children }: { products: ProductItem[]; flows: FlowItem[]; chips?: ProductChip[]; children: ReactNode }) {
  const filters = useFilters();
  const query = useDeferredValue(filters.query.trim());
  const favorites = useFavorites();
  const result = selectCatalog(products, flows, { ...filters, query }, favorites);
  return <Data value={{ products, flows, chips }}><Results value={{ ...result, query }}>{children}</Results></Data>;
}
export function useCatalogData() {
  const value = use(Data);
  if (!value) throw new Error('useCatalogData requires CatalogProvider');
  return value;
}
export function useCatalogResults() {
  const value = use(Results);
  if (!value) throw new Error('useCatalogResults requires CatalogProvider');
  return value;
}
