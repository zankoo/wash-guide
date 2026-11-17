import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const output = process.argv[2];
const dataOnly = process.argv[3] === '--data-only';
if (!output || (process.argv.length !== 3 && !(process.argv.length === 4 && dataOnly))) {
  throw new Error('Usage: node scripts/catalog-export.mjs <output.sql> [--data-only]');
}
const temporary = mkdtempSync(join(tmpdir(), 'wash-catalog-export-'));
const hash = value => createHash('sha256').update(value).digest('hex');
const quote = value => value === null ? 'NULL' : typeof value === 'number' ? String(value) : `'${String(value).replaceAll("'", "''")}'`;
try {
  execFileSync(process.execPath, [require.resolve('typescript/bin/tsc'), 'src/data/index.ts',
    '--rootDir', 'src', '--outDir', temporary, '--module', 'commonjs', '--moduleResolution', 'node',
    '--target', 'ES2023', '--strict', '--skipLibCheck', '--esModuleInterop'], {cwd:root,stdio:'pipe'});
  const data = require(join(temporary, 'data/index.js'));
  const { PRODUCTS, FLOWS, BRAND, CATS, MATERIALS, materialsOf, stepsOf, productsOfStep } = data;
  const content = JSON.stringify({products:PRODUCTS,flows:FLOWS});
  const checksum = hash(content);
  const version = `catalog-${checksum.slice(0,20)}`;
  const sql = dataOnly ? [] : [readFileSync(join(root, 'platform/migrations/0001_catalog.sql'), 'utf8')];
  const insert = (table, columns, values) => sql.push(`INSERT INTO ${table} (${columns.join(',')}) VALUES (${values.map(quote).join(',')});`);
  for (const [id,name] of Object.entries(BRAND)) insert('brands',['id','name'],[id,name]);
  CATS.forEach(([id,name],position)=>insert('categories',['id','name','position'],[id,name,position]));
  MATERIALS.forEach(([id,name],position)=>insert('materials',['id','name','position'],[id,name,position]));
  insert('catalog_versions',['id','source_commit','content_sha256','state','product_count','flow_count'],[version,execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),checksum,'published',PRODUCTS.length,FLOWS.length]);
  const sources = new Set();
  function source(productId, url, kind) {
    if (!url || !/^https?:\/\//.test(url)) return;
    const sourceId = hash(url);
    if (!sources.has(sourceId)) {
      insert('sources',['id','url','hostname'],[sourceId,url,new URL(url).hostname]);
      sources.add(sourceId);
    }
    sql.push(`INSERT OR IGNORE INTO product_sources(version_id,product_id,source_id,kind) VALUES (${[version,productId,sourceId,kind].map(quote).join(',')});`);
  }
  PRODUCTS.forEach((p,position)=>{
    insert('products',['version_id','id','brand_id','category_id','name','description','source_url','position','document'],[version,p.id,p.brand,p.category,p.name,p.type,p.url,position,JSON.stringify(p)]);
    materialsOf(p).forEach(m=>insert('product_materials',['version_id','product_id','material_id'],[version,p.id,m]));
    p.dilutions.forEach(([scene,ratio,tool],i)=>insert('product_dilutions',['version_id','product_id','position','scene','ratio','tool'],[version,p.id,i,scene,ratio,tool]));
    source(p.id,p.url,'product');
    source(p.id,p.sds?.originalUrl || p.sds?.url,'sds');
    source(p.id,p.ph?.source.url,'ph');
    for(const e of p.ph?.evidence ?? []) source(p.id,e.url,'evidence');
  });
  FLOWS.forEach((f,position)=>{
    insert('flows',['version_id','id','brand_id','name','kind','position','document'],[version,f.id,f.brand,f.name,f.kind,position,JSON.stringify(f)]);
    for(const id of new Set(stepsOf(f).flatMap(productsOfStep))) insert('flow_products',['version_id','flow_id','product_id'],[version,f.id,id]);
  });
  insert('catalog_publication',['singleton','version_id'],[1,version]);
  writeFileSync(resolve(output),sql.join('\n')+'\n');
  writeFileSync(resolve(output)+'.json',content);
  console.log(JSON.stringify({version,checksum,products:PRODUCTS.length,flows:FLOWS.length,sources:sources.size,output:resolve(output)}));
} finally {
  rmSync(temporary,{recursive:true,force:true});
}
