'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { SunIcon } from './icons';

const noop = () => () => {};

/** 洗车时保持屏幕常亮（Screen Wake Lock API）；浏览器不支持时不显示 */
export function WakeToggle() {
  const supported = useSyncExternalStore(noop, () => 'wakeLock' in navigator, () => false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!on) return;
    let lock: WakeLockSentinel | null = null;
    let cancelled = false;
    const acquire = async () => {
      try {
        lock = await navigator.wakeLock.request('screen');
        if (cancelled) lock.release();
      } catch {
        // 低电量模式等情况下浏览器会拒绝，开关回到关闭
        if (!cancelled) setOn(false);
      }
    };
    // 切到后台时锁会被系统释放，回到页面时重新申请
    const onVisible = () => document.visibilityState === 'visible' && acquire();
    acquire();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
      lock?.release();
    };
  }, [on]);

  if (!supported) return null;
  return (
    <button type="button" className="tab wake" aria-pressed={on} onClick={() => setOn(!on)}>
      <SunIcon />
      {on ? '常亮中' : '屏幕常亮'}
    </button>
  );
}
