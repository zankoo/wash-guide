'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/** 兼容旧版静态站的链接：/#产品id → /p/产品id，/#flows 或 /#流程id → /flows */
export function LegacyHashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const h = decodeURIComponent(location.hash.slice(1));
    if (!h) return;
    if (h === 'flows') router.replace('/flows');
    else if (/^[fc]-/.test(h)) router.replace(`/flows#${h}`);
    else if (/^[LMKC]-/.test(h)) {
      // 先去掉 hash，再以弹出面板打开产品，关闭后回到列表
      history.replaceState(history.state, '', '/');
      router.push(`/p/${h}`, { scroll: false });
    }
  }, [router]);
  return null;
}
