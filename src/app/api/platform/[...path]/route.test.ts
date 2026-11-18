import { expect, it, vi } from 'vitest';
import { POST } from './route';

const serviceFetch = vi.hoisted(() => vi.fn());
vi.mock('cloudflare:workers', () => ({ env: { PLATFORM: { fetch: serviceFetch } } }));

it('forwards the URL, headers and query body across the native service binding', async () => {
  const query = '车漆上的水斑怎么去除';
  const url = 'https://wash.kokoda.fun/api/platform/search';
  const request = new Request(url, {method:'POST',body:query});
  // A vinext request can be read through Web APIs while lacking the native
  // Fetcher's Request identity. Passing the proxy as the URL fails on Workers.
  const proxy = new Proxy(request, {});
  serviceFetch.mockImplementation(async (target, init) => {
    expect(target).toBe(url);
    expect(init.method).toBe('POST');
    expect(new Headers(init.headers).get('content-type')).toBe(request.headers.get('content-type'));
    expect(await new Response(init.body).text()).toBe(query);
    return Response.json({results:[]});
  });
  expect(await (await POST(proxy)).json()).toEqual({results:[]});
});
