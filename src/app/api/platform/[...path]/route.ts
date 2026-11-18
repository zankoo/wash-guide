import { env } from 'cloudflare:workers';

export async function POST(request: Request) {
  // vinext tracks reads with a Request proxy. Workers service bindings require
  // a native request or a URL and init when forwarding across isolates.
  return env.PLATFORM.fetch(request.url, {
    method: request.method,
    headers: Object.fromEntries(request.headers),
    body: request.body,
  });
}
