import { readFile } from 'node:fs/promises';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Miniflare } from 'miniflare';
import { applyDecision, type ProductEdit } from './publication';
import type { Product } from '../../src/data/types';
import { products } from '../../src/data/carpro';

const base = 'catalog-initial';
const product = products[0];
const edit: ProductEdit = { name: 'Updated product', materials: '玻璃', sizes: '1 L', type: 'New description',
  notes: ['new note'], steps: ['new step'], dilutions: [['wash', '1:20', 'bucket']] };
let runtime: Miniflare;
let db: Awaited<ReturnType<Miniflare['getD1Database']>>;
beforeAll(async () => {
  runtime = new Miniflare({ workers: [{ config: { name: 'review', compatibilityDate: '2026-11-17',
    manifest: { mainModule: 'entry.js', modules: { 'entry.js': { type:'esm',contents:'export default {}' } } },
    env: { DB: { type: 'd1', id: 'local-review' } },
  } }] });
  db = await runtime.getD1Database('DB');
  for (const migration of ['0001_catalog','0007_review_evidence','0008_review_actions']) {
    const sql = await readFile(new URL('../migrations/' + migration + '.sql', import.meta.url), 'utf8');
    await db.exec(sql.replace(/^\s*--.*$/gm, '').replaceAll('\n', ' '));
  }
  await db.batch([
    db.prepare('INSERT INTO brands VALUES (?,?)').bind(product.brand, 'Brand'),
    db.prepare('INSERT INTO categories VALUES (?,?,1)').bind(product.category, 'Category'),
    db.prepare("INSERT INTO materials VALUES ('glass','玻璃',1)"),
    db.prepare("INSERT INTO catalog_versions(id,source_commit,content_sha256,state,product_count,flow_count) VALUES (?,'seed','seed','published',1,0)").bind(base),
    db.prepare('INSERT INTO products VALUES (?,?,?,?,?,?,?,0,?)').bind(base, product.id, product.brand, product.category, product.name, product.type, product.url, JSON.stringify(product)),
    db.prepare('INSERT INTO catalog_publication(singleton,version_id) VALUES (1,?)').bind(base),
  ]);
});
afterAll(async () => { await runtime.dispose(); });

async function propose(id: string, baseVersion: string, data: ProductEdit) {
  const review = 'issue-' + id;
  await db.prepare("INSERT INTO review_items(id,product_id,kind,body,created_at) VALUES (?,?,'correction','feedback',datetime('now'))").bind(review, product.id).run();
  await db.prepare("INSERT INTO review_actions(id,review_id,kind,actor,base_version,product_id,change_json,note) VALUES (?,?,'edit','reviewer',?,?,?,'Checked the source')")
    .bind(id, review, baseVersion, product.id, JSON.stringify(data)).run();
}
describe('reviewed catalog publication', () => {
  it('waits for confirmation, publishes atomically, tolerates duplicate delivery, detects conflicts and rolls back', async () => {
    await propose('change', base, edit);
    await propose('stale', base, { ...edit, name: 'Out of date' });
    expect(await applyDecision(db, 'change')).toBe('proposed');
    await db.prepare("UPDATE review_actions SET state='queued'").run();
    expect(await Promise.all([applyDecision(db,'change'),applyDecision(db,'change')])).toEqual(['applied','applied']);
    const pointer = () => db.prepare('SELECT version_id FROM catalog_publication').first<string>('version_id');
    const current = await pointer();
    expect(current).not.toBe(base);
    const readProduct = async (version: string) => JSON.parse((await db.prepare('SELECT document FROM products WHERE version_id=?').bind(version).first<string>('document'))!) as Product;
    expect((await readProduct(base)).name).toBe(product.name);
    expect(await readProduct(current!)).toMatchObject(edit);
    expect(await db.prepare('SELECT ratio FROM product_dilutions WHERE version_id=?').bind(current).first('ratio')).toBe('1:20');
    expect(await db.prepare('SELECT material_id FROM product_materials WHERE version_id=?').bind(current).first('material_id')).toBe('glass');
    expect(await applyDecision(db, 'stale')).toBe('conflict');
    expect(await pointer()).toBe(current);
    expect(await db.prepare("SELECT state FROM review_items WHERE id='issue-stale'").first('state')).toBe('pending');
    expect(await db.prepare('SELECT count(*) AS n FROM catalog_versions').first('n')).toBe(2);
    await db.prepare("INSERT INTO review_actions(id,kind,actor,base_version,rollback_version,note,state) VALUES ('undo','rollback','reviewer',?,?,'Revert','queued')").bind(current, base).run();
    expect(await applyDecision(db, 'undo')).toBe('applied');
    expect(await pointer()).toBe(base);
    expect(await db.prepare('SELECT count(*) AS n FROM audit_events').first('n')).toBe(2);
  });
});
