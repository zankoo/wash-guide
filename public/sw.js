// 离线支持：洗车房和地下车库信号常常很差。
// - 页面（HTML）和 RSC 数据：先联网，失败时用缓存（所以打开过的页面没网也能看）
// - 带哈希的静态文件、字体、产品图：先读缓存
// - 页面可以发消息 { type: 'cache-pages', urls } 让我们提前缓存指定页面（常用产品的详情页）
const VERSION = 'v4';
const PAGES = `pages-${VERSION}`;
const ASSETS = `assets-${VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(PAGES).then((c) => c.addAll(['/', '/flows'])).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.endsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Next 的响应带 Vary: rsc, next-router-state-tree…；URL 里的 _rsc 参数已经区分了不同请求，匹配时忽略 Vary
const MATCH = { ignoreVary: true };

// 信号弱时联网可能一直挂着：超过这个时间且缓存里有这一页，就先用缓存
const SLOW_MS = 4000;

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const network = fetch(request).then((res) => {
    if (res.ok) cache.put(request, res.clone());
    return res;
  });
  network.catch(() => {}); // 已经用缓存回应时，网络失败不再报未处理的错误
  const slow = new Promise((resolve) => setTimeout(resolve, SLOW_MS)).then(() => cache.match(request, MATCH));
  try {
    // 先到先用：网络先返回就用网络；超时时有缓存就用缓存，没有缓存继续等网络
    return await Promise.race([network, slow.then((hit) => hit || network)]);
  } catch (err) {
    const hit = await cache.match(request, MATCH);
    if (hit) return hit;
    throw err;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) cache.put(request, res.clone());
  return res;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate' || request.headers.get('RSC') === '1') {
    event.respondWith(networkFirst(request, PAGES));
  } else if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/_next/image') ||
    url.pathname.startsWith('/img/') ||
    /^\/icon-\d+\.png$/.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request));
  }
});

self.addEventListener('message', (event) => {
  const { type, urls } = event.data || {};
  if (type !== 'cache-pages' || !Array.isArray(urls)) return;
  event.waitUntil(
    caches.open(PAGES).then((cache) =>
      Promise.all(
        urls
          .filter((u) => typeof u === 'string' && u.startsWith('/'))
          .map(async (u) => {
            if (await cache.match(u, MATCH)) return;
            try {
              const res = await fetch(u);
              if (res.ok) await cache.put(u, res);
            } catch {}
          }),
      ),
    ),
  );
});
