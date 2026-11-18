'use client';

import { readFavorites, storeFavorites } from './favorites';
import {
  acknowledge,
  CHANGED,
  enqueue,
  LINK,
  linkedDevice,
  pending,
  type FavoriteChange,
} from './library-journal';

export type Task = { text: string; done: boolean };
export type Checklist = { id: string; title: string; items: Task[]; revision: number };
export type Library = { user: string; scope: string; seq: number; favorites: string[]; lists: Checklist[] };
export class LibraryError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}
export async function libraryApi<T>(operation: string, data: object = {}): Promise<T> {
  const res = await fetch('/api/platform/library/' + operation, {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(12000),
  });
  const value = await res.json();
  if (!res.ok) throw new LibraryError(value.error || '资料库暂不可用', res.status);
  return value;
}
function combine(changes: FavoriteChange[][]) {
  const map = new Map<string, boolean>();
  for (const group of changes) for (const entry of group) map.set(entry.id, entry.on);
  return Array.from(map, ([id, on]) => ({ id, on }));
}
let refreshing: Promise<Library> | undefined;
export function refreshLibrary(): Promise<Library> {
  if (refreshing) return refreshing;
  const next = async () => {
    let state = await libraryApi<Library>('state');
    if (linkedDevice() !== state.scope) return state;
    const journal = await pending(state.scope);
    const applied = journal.filter((entry) => entry.seq <= state.seq);
    if (applied.length) await acknowledge(applied);
    const queue = journal.filter((entry) => entry.seq > state.seq);
    let baseSeq = state.seq;
    for (let start = 0; start < queue.length; ) {
      const batch = [];
      let count = 0;
      do {
        const item = queue[start++];
        batch.push(item);
        count += item.changes.length;
      } while (start < queue.length && count + queue[start].changes.length <= 1000);
      const seq = batch.at(-1)!.seq;
      try {
        await libraryApi('favorites', {
          scope: state.scope,
          seq,
          baseSeq,
          changes: combine(batch.map((r) => r.changes)),
        });
      } catch (error) {
        if (error instanceof LibraryError && error.status === 412) window.dispatchEvent(new Event(CHANGED));
        throw error;
      }
      baseSeq = seq;
      await acknowledge(batch);
    }
    if (queue.length) state = await libraryApi<Library>('state');
    if (linkedDevice() !== state.scope) return state;
    const merged = new Set(state.favorites);
    const remaining = await pending(state.scope);
    if (remaining.length) window.dispatchEvent(new Event(CHANGED));
    for (const { changes } of remaining)
      for (const { id, on } of changes) {
        if (on) merged.add(id);
        else merged.delete(id);
      }
    const ids = [...merged].sort();
    if (JSON.stringify([...readFavorites()].sort()) !== JSON.stringify(ids)) storeFavorites(ids);
    window.dispatchEvent(new CustomEvent('wash-library-state', { detail: state }));
    return state;
  };
  const run = async (): Promise<Library> =>
    navigator.locks ? await navigator.locks.request('wash-library-refresh', next) : next();
  refreshing = run().finally(() => {
    refreshing = undefined;
  });
  return refreshing;
}

export async function attachLibrary(state: Library) {
  if (linkedDevice() !== state.scope) {
    const existing = [...new Set(readFavorites())].filter((id) => /^[\w-]{1,100}$/.test(id));
    if (existing.length > 1000) throw new Error('本机收藏超过 1000 个，请整理后再同步。');
    await enqueue(
      state.scope,
      existing.map((id) => ({ id, on: true })),
      state.seq,
    );
    localStorage.setItem(LINK, state.scope);
  }
  return refreshLibrary();
}

export async function connectLibrary(pair?: string) {
  const mode = pair ? 'join' : 'create';
  // Same pending credential on a transport retry. Remove it as soon as the
  // HttpOnly cookie has been confirmed by the authenticated state endpoint.
  const storageKey = 'wash-library-pending-' + mode;
  let key = sessionStorage.getItem(storageKey);
  if (!key) {
    key = Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) => b.toString(16).padStart(2, '0')).join(
      '',
    );
    sessionStorage.setItem(storageKey, key);
  }
  try {
    await libraryApi(mode, { key, pair });
  } catch (e) {
    if (!(e instanceof LibraryError) || e.status !== 409) throw e;
  }
  const state = await libraryApi<Library>('state');
  if (pair && !pair.startsWith(state.user + '.')) throw new Error('请先断开当前资料库，再连接另一份资料库。');
  sessionStorage.removeItem(storageKey);
  return attachLibrary(state);
}
