// 构建时注入内容版本。HTML 与 RSC 严格分库；只有页面导航可以规范化筛选参数。
const VERSION = '__BUILD_VERSION__';
const PREFIX = 'wash-guide-';
const DOCUMENTS = `${PREFIX}${VERSION}-documents`;
const RSC = `${PREFIX}${VERSION}-rsc`;
const MEDIA = `${PREFIX}${VERSION}-media`;
// 哈希资源允许跨版本复用，仍有容量上限。
const STATIC = `${PREFIX}static-v1`;
const LIMITS = { [DOCUMENTS]: 100, [RSC]: 160, [MEDIA]: 128, [STATIC]: 256 };
const FILTERS = ['brand', 'category', 'material', 'scene', 'q'];
const WRITES = new Map();

function pageUrl(value) {
  const url = new URL(value, self.location.origin);
  if (url.origin !== self.location.origin || !(/^\/$|^\/flows$|^\/p\/[\w-]+$/.test(url.pathname))) return null;
  for (const key of FILTERS) url.searchParams.delete(key);
  url.hash = '';
  return url.href;
}
function assetKind(url) {
  if (url.origin !== self.location.origin) return null;
  if (url.pathname.startsWith('/_next/static/')) return STATIC;
  if (url.pathname.startsWith('/_next/image') || url.pathname.startsWith('/img/') || /^\/icon-\d+\.png$/.test(url.pathname)) return MEDIA;
  return null;
}
async function store(name, key, response) {
  if (!response.ok || response.type === 'opaque') return;
  // 串行写入和淘汰，避免并发请求让缓存超过上限。存储失败不影响在线响应。
  const copy = response.clone();
  const task = (WRITES.get(name) || Promise.resolve()).then(async () => {
    const cache = await caches.open(name);
    try {
      await cache.delete(key);
      await cache.put(key, copy);
      const keys = await cache.keys();
      const evictable = keys.filter((k) => name !== DOCUMENTS || !['/', '/flows'].includes(new URL(k.url).pathname));
      await Promise.all(evictable.slice(0, Math.max(0, keys.length - LIMITS[name])).map((k) => cache.delete(k)));
    } catch { /* 存储额度不足时仍允许用户在线访问 */ }
  });
  WRITES.set(name, task.catch(() => {}));
  await task;
}
async function fetchDocument(url) {
  const response = await fetch(url, { cache: 'no-cache', headers: { Accept: 'text/html' } });
  if (!response.ok || !response.headers.get('Content-Type')?.includes('text/html')) throw new Error('Document unavailable');
  await store(DOCUMENTS, url, response);
  return response;
}
async function cachePage(value, includeImages = true) {
  const url = pageUrl(value);
  if (!url) return;
  const response = await fetchDocument(url);
  const html = await response.text();
  // 预存 HTML 并不会执行其脚本；同时预存页面真正引用的脚本、样式、字体和图片。
  const urls = [...html.matchAll(/(?:src|href)="([^"<>]+)"/g)].map((m) => new URL(m[1].replaceAll('&amp;', '&'), url)).map((asset) => {
    // srcset 会按屏幕选择不同尺寸。离线存一份原图即可支持所有尺寸，避免预存最大尺寸却错过实际请求。
    const original = asset.pathname === '/_next/image' && asset.searchParams.get('url');
    return original && /^\/img\/[\w-]+\.webp$/.test(original) ? new URL(original, self.location.origin) : asset;
  });
  await Promise.all([...new Set(urls.filter((u) => assetKind(u) === STATIC || (includeImages && assetKind(u) === MEDIA)).map((u) => u.href))].map(async (href) => {
    const kind = assetKind(new URL(href));
    try {
      const cache = await caches.open(kind);
      if (kind === STATIC && await cache.match(href)) return;
      const asset = await fetch(href, { cache: 'no-cache' });
      await store(kind, href, asset);
    } catch { /* 某张图片失败不阻止其他资源缓存 */ }
  }));
}
self.addEventListener('install', (event) => {
  event.waitUntil(Promise.all([cachePage('/', false), cachePage('/flows', false)]).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keep = new Set([DOCUMENTS, RSC, MEDIA, STATIC]);
    await Promise.all((await caches.keys()).filter((key) =>
      (key.startsWith(PREFIX) && !keep.has(key)) || /^(pages|assets)-v\d+$/.test(key),
    ).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

async function networkFirst(event, name, key, isDocument) {
  const cache = await caches.open(name);
  const match = () => cache.match(key, isDocument ? { ignoreVary: true } : undefined);
  const network = (async () => {
    const response = await fetch(event.request);
    const type = response.headers.get('Content-Type') || '';
    if (response.status >= 500) throw new Error(`HTTP ${response.status}`);
    if (!response.ok) return response; // 在线 404 等响应保留原本的页面语义。
    if (type.includes(isDocument ? 'text/html' : 'text/x-component')) await store(name, key, response);
    return response;
  })();
  event.waitUntil(network.catch(() => {}));
  let timer;
  const slow = new Promise((resolve) => { timer = setTimeout(async () => resolve((await match()) || network), 3000); });
  try {
    return await Promise.race([network, slow]);
  } catch {
    const cached = await match();
    if (cached) return cached;
    if (isDocument) return new Response('<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>暂时离线</title><h1>这个页面尚未缓存</h1><p>联网打开一次后即可离线查看。</p><a href="/">返回产品速查</a></html>', { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    // 绝不能拿 HTML 回应 RSC。Next 可选择回退为页面导航。
    return new Response('Offline', { status: 503 });
  } finally { clearTimeout(timer); }
}
async function assetResponse(event, kind) {
  const cache = await caches.open(kind);
  // 本站图片源与优化输出均为 webp；离线预存请求和 <img> 的 Accept 不同也可复用。
  let hit = await cache.match(event.request, kind === MEDIA ? { ignoreVary: true } : undefined);
  const requested = new URL(event.request.url);
  const original = requested.pathname === '/_next/image' && requested.searchParams.get('url');
  if (!hit && original && /^\/img\/[\w-]+\.webp$/.test(original)) {
    hit = await cache.match(new URL(original, self.location.origin).href, { ignoreVary: true });
  }
  if (hit && kind === STATIC) return hit;
  const fresh = fetch(event.request, { cache: kind === MEDIA ? 'no-cache' : 'default' }).then(async (response) => {
    await store(kind, event.request, response);
    return response;
  });
  event.waitUntil(fresh.catch(() => {}));
  // 非哈希产品图采用后台更新，内容不会永久停留在第一次访问的版本。
  return hit || fresh;
}
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.headers.get('RSC') === '1') {
    event.respondWith(networkFirst(event, RSC, request, false));
  } else if (request.mode === 'navigate' && pageUrl(url)) {
    event.respondWith(networkFirst(event, DOCUMENTS, pageUrl(url), true));
  } else {
    const kind = assetKind(url);
    if (kind) event.respondWith(assetResponse(event, kind));
  }
});
self.addEventListener('message', (event) => {
  if (event.data?.type !== 'cache-pages' || !Array.isArray(event.data.urls)) return;
  event.waitUntil((async () => {
    // 限制单次消息，拒绝外站、协议相对地址和非产品页面。
    const urls = [...new Set(event.data.urls.filter((url) => typeof url === 'string' && /^\/p\/[\w-]+$/.test(url)))].slice(0, 80);
    const results = [];
    // 小批串行避免一次收藏很多产品时冲垮弱网络。
    for (const url of urls) {
      try { await cachePage(url); results.push(url); } catch { /* 下次联网重试 */ }
    }
    event.ports[0]?.postMessage({ cached: results });
  })());
});
