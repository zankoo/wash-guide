'use client';

import { useEffect } from 'react';
import { CHANGED, linkedDevice } from '@/lib/library-journal';

export function LibrarySync() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let disposed = false;
    const sync = () => {
      if (!navigator.onLine || !linkedDevice()) return;
      clearTimeout(timer);
      timer = setTimeout(async () => {
        try {
          await (await import('@/lib/library-client')).refreshLibrary();
        } catch (e) {
          if (!disposed)
            window.dispatchEvent(
              new CustomEvent('wash-library-error', {
                detail: e instanceof Error ? e.message : '资料库暂未同步',
              }),
            );
        }
      }, 300);
    };
    sync();
    for (const event of ['online', 'focus', CHANGED]) addEventListener(event, sync);
    return () => {
      disposed = true;
      clearTimeout(timer);
      for (const event of ['online', 'focus', CHANGED]) removeEventListener(event, sync);
    };
  }, []);
  return null;
}
