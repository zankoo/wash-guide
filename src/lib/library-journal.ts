'use client';

export const LINK = 'wash-library-device';
export const CHANGED = 'wash-library-change';
export type FavoriteChange = { id: string; on: boolean };
type Entry = { seq: number; scope: string; changes: FavoriteChange[] };
export function linkedDevice() {
  try {
    return localStorage.getItem(LINK);
  } catch {
    return null;
  }
}

function database(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open('wash-guide-library', 1);
    open.onupgradeneeded = () => {
      open.result.createObjectStore('journal', { keyPath: 'seq' }).createIndex('scope', 'scope');
      open.result.createObjectStore('clock');
    };
    open.onsuccess = () => resolve(open.result);
    open.onerror = () => reject(open.error);
  });
}
async function transaction<T>(
  mode: IDBTransactionMode,
  run: (tx: IDBTransaction, set: (v: T) => void) => void,
): Promise<T> {
  const db = await database();
  try {
    return await new Promise<T>((resolve, reject) => {
      const tx = db.transaction(['journal', 'clock'], mode);
      let result: T;
      tx.oncomplete = () => resolve(result);
      tx.onabort = () => reject(tx.error || new Error('无法保存本机同步记录'));
      run(tx, (value) => {
        result = value;
      });
    });
  } finally {
    db.close();
  }
}

export function enqueue(scope: string, changes: FavoriteChange[], floor = 0) {
  return transaction<void>('readwrite', (tx) => {
    const clock = tx.objectStore('clock');
    const read = clock.get('last');
    read.onsuccess = () => {
      const seq = Math.max(Date.now(), Number(read.result || 0) + 1, floor + 1);
      clock.put(seq, 'last');
      if (changes.length) tx.objectStore('journal').add({ seq, scope, changes } satisfies Entry);
    };
  });
}
export function pending(scope: string) {
  return transaction<Entry[]>('readonly', (tx, set) => {
    const rows = tx.objectStore('journal').index('scope').getAll(scope);
    rows.onsuccess = () => set(rows.result);
  });
}
export function acknowledge(entries: Entry[]) {
  return transaction<void>('readwrite', (tx) => {
    for (const row of entries) tx.objectStore('journal').delete(row.seq);
  });
}
