import type { D1Database } from '@cloudflare/workers-types';
import { materialsOf } from '../../src/data/materials';
import type { Product } from '../../src/data/types';

type DB = Pick<D1Database, 'prepare' | 'batch'>;
export type ActionKind = 'edit' | 'approve' | 'reject' | 'rollback';
type Action = {
  id: string; review_id: string | null; kind: ActionKind; actor: string; base_version: string;
  product_id: string | null; change_json: string | null; rollback_version: string | null;
  state: 'proposed' | 'queued' | 'applied' | 'conflict'; note: string; result_version: string | null;
};
export type ProductEdit = Pick<Product, 'name' | 'type' | 'materials' | 'sizes' | 'notes' | 'steps' | 'dilutions'>;
const textWithin = (v: unknown, max: number) => typeof v === 'string' && v.length <= max;
export function validProductEdit(value: unknown): value is ProductEdit {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const edit = value as Record<string, unknown>;
  if (Object.keys(edit).sort().join(',') !== 'dilutions,materials,name,notes,sizes,steps,type') return false;
  return ['name', 'type', 'materials', 'sizes'].every(key => textWithin(edit[key], 1200) && (edit[key] as string).trim().length) &&
    ['notes', 'steps'].every(key => Array.isArray(edit[key]) && edit[key].length <= 64 && edit[key].every(v => textWithin(v, 1500))) &&
    Array.isArray(edit.dilutions) && edit.dilutions.length <= 64 && edit.dilutions.every(row => Array.isArray(row) &&
      row.length === 3 && row.every(v => textWithin(v, 500)));
}

async function prepareEdit(db: DB, action: Action) {
  const edit = JSON.parse(action.change_json || 'null');
  if (!validProductEdit(edit)) throw new Error('review_invalid_edit');
  const base = action.base_version;
  const [products, flows] = await db.batch<{ id: string; document: string }>([
    db.prepare('SELECT id,document FROM products WHERE version_id=? ORDER BY position').bind(base),
    db.prepare('SELECT id,document FROM flows WHERE version_id=? ORDER BY position').bind(base),
  ]);
  const target = products.results.find(row => row.id === action.product_id);
  if (!target) throw new Error('review_unknown_product');
  const product: Product = { ...JSON.parse(target.document), ...edit };
  const updated = JSON.stringify(product);
  if (target.document === updated) throw new Error('review_unchanged');
  target.document = updated;
  // Same canonical ordered serialization as the initial catalog export.
  const content = '{"products":[' + products.results.map(p => p.document).join(',') + '],"flows":[' + flows.results.map(f => f.document).join(',') + ']}';
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(content)));
  const checksum = Array.from(digest, byte => byte.toString(16).padStart(2, '0')).join('');
  const version = 'catalog-' + checksum.slice(0, 20);
  const existing = await db.prepare('SELECT content_sha256 FROM catalog_versions WHERE id=?').bind(version).first<string>('content_sha256');
  if (existing && existing !== checksum) throw new Error('catalog_digest_collision');
  if (existing) return { version, statements: [] };
  const statements = [
    db.prepare(`INSERT INTO catalog_versions(id,source_commit,content_sha256,state,product_count,flow_count)
      SELECT ?, source_commit, ?, 'draft', product_count, flow_count FROM catalog_versions WHERE id=?`).bind(version, checksum, base),
    db.prepare(`INSERT INTO products(version_id,id,brand_id,category_id,name,description,source_url,position,document)
      SELECT ?,id,brand_id,category_id,CASE WHEN id=? THEN ? ELSE name END,CASE WHEN id=? THEN ? ELSE description END,source_url,
      position,CASE WHEN id=? THEN ? ELSE document END FROM products WHERE version_id=?`)
      .bind(version, product.id, product.name, product.id, product.type, product.id, updated, base),
    db.prepare('INSERT INTO flows SELECT ?,id,brand_id,name,kind,position,document FROM flows WHERE version_id=?').bind(version, base),
    db.prepare('INSERT INTO flow_products SELECT ?,flow_id,product_id FROM flow_products WHERE version_id=?').bind(version, base),
    db.prepare('INSERT INTO product_sources SELECT ?,product_id,source_id,kind FROM product_sources WHERE version_id=?').bind(version, base),
    db.prepare('INSERT INTO product_materials SELECT ?,product_id,material_id FROM product_materials WHERE version_id=? AND product_id!=?').bind(version, base, product.id),
    db.prepare('INSERT INTO product_dilutions SELECT ?,product_id,position,scene,ratio,tool FROM product_dilutions WHERE version_id=? AND product_id!=?').bind(version, base, product.id),
    db.prepare('INSERT INTO product_materials SELECT ?,?,value FROM json_each(?)').bind(version, product.id, JSON.stringify(materialsOf(product))),
    db.prepare(`INSERT INTO product_dilutions SELECT ?,?,key,json_extract(value,'$[0]'),json_extract(value,'$[1]'),json_extract(value,'$[2]') FROM json_each(?)`)
      .bind(version, product.id, JSON.stringify(product.dilutions)),
  ];
  return { version, statements };
}

export async function applyDecision(db: DB, id: string) {
  const action = await db.prepare('SELECT * FROM review_actions WHERE id=?').bind(id).first<Action>();
  if (!action) throw new Error('review_unknown_action');
  if (action.state !== 'queued') return action.state;
  try {
    const desired = action.kind === 'edit' ? await prepareEdit(db, action) : {
      version: action.rollback_version ?? action.base_version, statements: [],
    };
    const statements = [db.prepare('INSERT INTO review_receipts(action_id) VALUES (?)').bind(id), ...desired.statements];
    if (desired.version !== action.base_version) statements.push(
      db.prepare("UPDATE catalog_versions SET state='retired' WHERE id=?").bind(action.base_version),
      db.prepare("UPDATE catalog_versions SET state='published' WHERE id=?").bind(desired.version),
      db.prepare("UPDATE catalog_publication SET version_id=?,updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE singleton=1").bind(desired.version),
    );
    if (action.review_id) statements.push(db.prepare(`UPDATE review_items SET state=?, reviewed_by=?, decision_note=?,
      reviewed_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=?`).bind(action.kind === 'reject' ? 'rejected' : 'approved', action.actor, action.note, action.review_id));
    statements.push(
      db.prepare("INSERT INTO audit_events(id,actor_id,action,entity_id,created_at,metadata) VALUES(?,?,?,?,strftime('%Y-%m-%dT%H:%M:%fZ','now'),?)")
        .bind(id, action.actor, action.kind, action.review_id ?? desired.version, JSON.stringify({ from: action.base_version, to: desired.version })),
      db.prepare("UPDATE review_actions SET state='applied',result_version=?,finished_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=?").bind(desired.version, id),
    );
    await db.batch(statements);
    return 'applied';
  } catch (error) {
    // An overlapping delivery can finish between the initial read and guard.
    const state = await db.prepare('SELECT state FROM review_actions WHERE id=?').bind(id).first<string>('state');
    if (state === 'applied') return state;
    const conflict = String(error).match(/review_(stale|closed|unrelated_product|rollback_unavailable|daily_limit|unchanged|unknown_product|invalid_edit)\b/);
    if (!conflict) throw error;
    await db.prepare("UPDATE review_actions SET state='conflict',reason=?,finished_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=? AND state='queued'")
      .bind(conflict[0], id).run();
    return 'conflict';
  }
}
