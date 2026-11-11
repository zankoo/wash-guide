import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { describe, expect, it, vi } from 'vitest';

function harness() {
  const origin = 'https://wash.test';
  const handlers: Record<string, (event: unknown) => void> = {};
  const entries = new Map<string, Map<string, { request: Request; response: Response }>>();
  const normalize = (key: string | Request) => typeof key === 'string' ? new Request(new URL(key, origin)) : key;
  const caches = {
    keys: async () => [...entries.keys()],
    delete: async (name: string) => entries.delete(name),
    open: async (name: string) => {
      if (!entries.has(name)) entries.set(name, new Map());
      const map = entries.get(name)!;
      return {
        keys: async () => [...map.values()].map((x) => x.request),
        delete: async (key: string | Request) => map.delete(normalize(key).url),
        put: async (key: string | Request, response: Response) => { const request = normalize(key); map.set(request.url, { request, response: response.clone() }); },
        match: async (key: string | Request, options?: { ignoreVary: boolean }) => {
          const request = normalize(key), found = map.get(request.url);
          if (!found) return undefined;
          if (!options?.ignoreVary && (found.response.headers.get('vary') ?? '').split(',').filter(Boolean).some((h) => found.request.headers.get(h.trim()) !== request.headers.get(h.trim()))) return undefined;
          return found.response.clone();
        },
      };
    },
  };
  const fetch = vi.fn(async () => new Response('fresh', { headers: { 'Content-Type': 'text/html' } }));
  const self = { skipWaiting: async () => {}, location: { origin }, addEventListener: (name: string, handler: (event: unknown) => void) => { handlers[name] = handler; }, clients: { claim: async () => {} } };
  const context = vm.createContext({ self, caches, fetch, Request, Response, URL, setTimeout, clearTimeout, console });
  vm.runInContext(readFileSync(new URL('./service-worker.js', import.meta.url), 'utf8').replace('__BUILD_VERSION__', 'test'), context);
  async function dispatch(kind: string, props: Record<string, unknown>) {
    const pending: Promise<unknown>[] = [];
    let response: Promise<Response> | undefined;
    handlers[kind]({ ...props, waitUntil: (p: Promise<unknown>) => pending.push(p), respondWith: (p: Promise<Response>) => { response = p; } });
    const value = await response;
    await Promise.all(pending);
    return value;
  }
  return { caches, fetch, dispatch, origin };
}

describe('离线缓存策略', () => {
  it('首次安装只缓存页面与脚本，不预下载整份目录的产品图', async () => {
    const h = harness();
    h.fetch.mockImplementation(async () => new Response('<script src="/_next/static/app.js"></script><img src="/_next/image?url=%2Fimg%2FC-reset.webp&amp;w=1080">', { headers: { 'Content-Type': 'text/html' } }));
    await h.dispatch('install', {});
    expect(h.fetch).toHaveBeenCalledWith(`${h.origin}/_next/static/app.js`, expect.anything());
    expect(h.fetch).not.toHaveBeenCalledWith(`${h.origin}/img/C-reset.webp`, expect.anything());
  });
  it('筛选页面回退到 HTML 缓存，不把未知参数随意合并', async () => {
    const h = harness();
    const docs = await h.caches.open('wash-guide-test-documents');
    await docs.put('/', new Response('cached html', { headers: { 'Content-Type': 'text/html' } }));
    h.fetch.mockRejectedValue(new Error('offline'));
    const request = new Request(`${h.origin}/?q=铁粉&brand=K`);
    Object.defineProperty(request, 'mode', { value: 'navigate' });
    expect(await (await h.dispatch('fetch', { request }))!.text()).toBe('cached html');
    const unknown = new Request(`${h.origin}/?not-a-filter=1`);
    Object.defineProperty(unknown, 'mode', { value: 'navigate' });
    expect((await h.dispatch('fetch', { request: unknown }))!.status).toBe(503);
  });
  it('在线不存在的产品保留 404，不错误显示为离线', async () => {
    const h = harness();
    h.fetch.mockResolvedValue(new Response('not found', { status: 404 }));
    const request = new Request(`${h.origin}/p/missing`);
    Object.defineProperty(request, 'mode', { value: 'navigate' });
    expect((await h.dispatch('fetch', { request }))!.status).toBe(404);
  });
  it('RSC 不读取 HTML，也不会忽略路由状态 Vary', async () => {
    const h = harness();
    const url = `${h.origin}/p/C-reset?_rsc=key`;
    const cache = await h.caches.open('wash-guide-test-rsc');
    await cache.put(new Request(url, { headers: { RSC: '1', 'Next-Router-State-Tree': 'A' } }), new Response('tree A', { headers: { Vary: 'Next-Router-State-Tree', 'Content-Type': 'text/x-component' } }));
    h.fetch.mockRejectedValue(new Error('offline'));
    const result = await h.dispatch('fetch', { request: new Request(url, { headers: { RSC: '1', 'Next-Router-State-Tree': 'B' } }) });
    expect(result!.status).toBe(503);
    expect(await result!.text()).toBe('Offline');
  });
  it('图片先返回旧缓存但后台更新，不永久缓存旧图', async () => {
    const h = harness();
    const request = new Request(`${h.origin}/img/C-reset.webp`);
    const media = await h.caches.open('wash-guide-test-media');
    await media.put(request, new Response('old image'));
    h.fetch.mockResolvedValue(new Response('new image'));
    expect(await (await h.dispatch('fetch', { request }))!.text()).toBe('old image');
    expect(await (await media.match(request))!.text()).toBe('new image');
  });
  it('离线时不同 srcset 尺寸可使用预存原图', async () => {
    const h = harness();
    const media = await h.caches.open('wash-guide-test-media');
    await media.put('/img/C-reset.webp', new Response('original image'));
    h.fetch.mockRejectedValue(new Error('offline'));
    const request = new Request(`${h.origin}/_next/image?url=%2Fimg%2FC-reset.webp&w=256&q=75`);
    expect(await (await h.dispatch('fetch', { request }))!.text()).toBe('original image');
  });
  it('媒体缓存有容量上限，升级只清理本应用的旧缓存', async () => {
    const h = harness();
    const media = await h.caches.open('wash-guide-test-media');
    for (let i = 0; i < 128; i++) await media.put(`/img/${i}.webp`, new Response('image'));
    await h.dispatch('fetch', { request: new Request(`${h.origin}/img/new.webp`) });
    expect(await media.keys()).toHaveLength(128);
    expect(await media.match('/img/0.webp')).toBeUndefined();
    await h.caches.open('wash-guide-old-documents');
    await h.caches.open('another-app-cache');
    await h.dispatch('activate', {});
    expect(await h.caches.keys()).toContain('another-app-cache');
    expect(await h.caches.keys()).not.toContain('wash-guide-old-documents');
  });
  it('收藏页已有缓存仍更新，拒绝外部链接', async () => {
    const h = harness();
    const docs = await h.caches.open('wash-guide-test-documents');
    await docs.put('/p/C-reset', new Response('old document'));
    const reply = vi.fn();
    await h.dispatch('message', { data: { type: 'cache-pages', urls: ['/p/C-reset', '//evil.test/x', 'https://evil.test/x'] }, ports: [{ postMessage: reply }] });
    expect(await (await docs.match('/p/C-reset'))!.text()).toBe('fresh');
    expect(h.fetch).toHaveBeenCalledTimes(1);
    expect(reply).toHaveBeenCalledWith({ cached: ['/p/C-reset'] });
  });
});
