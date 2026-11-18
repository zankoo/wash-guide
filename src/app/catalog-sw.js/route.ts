import { env } from 'cloudflare:workers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const [version, script] = await Promise.all([
    env.DB.prepare('SELECT version_id FROM catalog_publication WHERE singleton = 1').first<string>('version_id'),
    env.ASSETS.fetch(new URL('/sw.js', request.url).href),
  ]);
  if (!version || !script.ok || !script.headers.get('content-type')?.includes('javascript')) {
    return new Response('Offline catalog unavailable', { status: 503 });
  }
  // A different script installs a new offline cache even when only D1 changes.
  return new Response('self.catalogPublication = ' + JSON.stringify(version) + ';\n' + await script.text(), {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'",
    },
  });
}
