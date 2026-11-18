import { env } from 'cloudflare:workers';

export async function POST(request: Request) {
  return env.PLATFORM.fetch(request);
}
