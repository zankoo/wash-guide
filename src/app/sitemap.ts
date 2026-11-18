import type { MetadataRoute } from 'next';
import { publishedIds } from '@/data/published-catalog';
import { SITE_URL as base } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await publishedIds();
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/flows`, priority: 0.8 },
    { url: `${base}/research-search`, priority: 0.7 },
    ...products.map((p) => ({ url: `${base}/p/${p.id}`, priority: 0.6 })),
  ];
}
