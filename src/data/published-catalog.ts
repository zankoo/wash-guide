import { env } from 'cloudflare:workers';
import { cache } from 'react';
import { connection } from 'next/server';
import { imageSrc, type FlowEntry } from './presentation';
import { projectFlows, projectProducts } from './projections';
import type { Product } from './types';

// A render (including metadata) uses one immutable release. Each new request
// reads the pointer again so publishing or rolling back takes effect immediately.
const publishedVersion = cache(async () => {
  await connection();
  const version = await env.DB.prepare('SELECT version_id FROM catalog_publication WHERE singleton = 1').first<string>('version_id');
  if (!version) throw new Error('Catalog has no published version');
  return version;
});

let productList: { version: string; items: ReturnType<typeof projectProducts> } | undefined;

export async function publishedProducts() {
  const version = await publishedVersion();
  if (productList?.version === version) return productList.items;
  const rows = await env.DB.prepare('SELECT document FROM products WHERE version_id = ? ORDER BY position').bind(version).all<{ document: string }>();
  const items = projectProducts(rows.results.map(row => JSON.parse(row.document) as Product));
  productList = { version, items };
  return items;
}

let flowList: { version: string; data: Awaited<ReturnType<typeof readFlows>> } | undefined;

export async function publishedFlows() {
  const version = await publishedVersion();
  if (flowList?.version === version) return flowList.data;
  const data = await readFlows(version);
  flowList = { version, data };
  return data;
}

async function readFlows(version: string) {
  const [flowRows, chipRows] = await env.DB.batch<Record<string, unknown>>([
    env.DB.prepare('SELECT document FROM flows WHERE version_id = ? ORDER BY position').bind(version),
    env.DB.prepare(`SELECT id, name, brand_id AS brand, description AS type,
      CASE WHEN json_type(document, '$.image') IS NULL THEN '/img/' || id || '.webp'
           ELSE json_extract(document, '$.image') END AS image
      FROM products WHERE version_id = ? AND id IN
      (SELECT product_id FROM flow_products WHERE version_id = ?) ORDER BY position`).bind(version, version),
  ]);
  const flows = flowRows.results.map(row => JSON.parse(String(row.document)) as FlowEntry);
  const products = chipRows.results as Pick<Product, 'id' | 'brand' | 'name' | 'image' | 'type'>[];
  const byId = new Map(products.map(p => [p.id, p]));
  const items = projectFlows(flows, id => {
    const product = byId.get(id);
    if (!product) throw new Error('Missing product in published flow: ' + id);
    return product;
  });
  const chips = products.map(p => ({ id: p.id, name: p.name, brand: p.brand, image: imageSrc(p) }));
  return { flows, items, chips };
}

export const publishedDetail = cache(async (id: string) => {
  const version = await publishedVersion();
  const [product, related] = await env.DB.batch<{ document: string }>([
    env.DB.prepare('SELECT document FROM products WHERE version_id = ? AND id = ?').bind(version, id),
    env.DB.prepare(`SELECT f.document FROM flow_products fp JOIN flows f
      ON f.version_id = fp.version_id AND f.id = fp.flow_id
      WHERE fp.version_id = ? AND fp.product_id = ? ORDER BY f.position`).bind(version, id),
  ]);
  const document = product.results[0]?.document;
  if (!document) return null;
  return {
    product: JSON.parse(document) as Product,
    flows: related.results.map(row => JSON.parse(row.document) as FlowEntry),
  };
});

export async function publishedIds() {
  const version = await publishedVersion();
  return (await env.DB.prepare('SELECT id FROM products WHERE version_id = ? ORDER BY position').bind(version).all<{id: string}>()).results;
}
