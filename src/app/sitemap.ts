import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data';
import { SITE_URL as base } from '@/lib/site';


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/flows`, priority: 0.8 },
    ...PRODUCTS.map((p) => ({ url: `${base}/p/${p.id}`, priority: 0.6 })),
  ];
}
