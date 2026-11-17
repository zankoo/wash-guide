PRAGMA foreign_keys = ON;

CREATE TABLE brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position INTEGER NOT NULL
);
CREATE TABLE materials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position INTEGER NOT NULL
);
CREATE TABLE catalog_versions (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  source_commit TEXT NOT NULL,
  content_sha256 TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL CHECK (state IN ('draft','published','retired')),
  product_count INTEGER NOT NULL,
  flow_count INTEGER NOT NULL
);
CREATE TABLE products (
  version_id TEXT NOT NULL REFERENCES catalog_versions(id),
  id TEXT NOT NULL,
  brand_id TEXT NOT NULL REFERENCES brands(id),
  category_id TEXT NOT NULL REFERENCES categories(id),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  source_url TEXT NOT NULL,
  position INTEGER NOT NULL,
  document TEXT NOT NULL CHECK (json_valid(document)),
  PRIMARY KEY (version_id, id)
);
CREATE INDEX products_brand_category ON products(version_id, brand_id, category_id, position);
CREATE TABLE product_materials (
  version_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  material_id TEXT NOT NULL REFERENCES materials(id),
  PRIMARY KEY (version_id, product_id, material_id),
  FOREIGN KEY (version_id, product_id) REFERENCES products(version_id, id)
);
CREATE INDEX materials_products ON product_materials(version_id, material_id, product_id);
CREATE TABLE product_dilutions (
  version_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  position INTEGER NOT NULL,
  scene TEXT NOT NULL,
  ratio TEXT NOT NULL,
  tool TEXT NOT NULL,
  PRIMARY KEY (version_id, product_id, position),
  FOREIGN KEY (version_id, product_id) REFERENCES products(version_id, id)
);
CREATE TABLE flows (
  version_id TEXT NOT NULL REFERENCES catalog_versions(id),
  id TEXT NOT NULL,
  brand_id TEXT NOT NULL REFERENCES brands(id),
  name TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('off','combo')),
  position INTEGER NOT NULL,
  document TEXT NOT NULL CHECK (json_valid(document)),
  PRIMARY KEY (version_id, id)
);
CREATE TABLE flow_products (
  version_id TEXT NOT NULL,
  flow_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  PRIMARY KEY (version_id, flow_id, product_id),
  FOREIGN KEY (version_id, flow_id) REFERENCES flows(version_id, id),
  FOREIGN KEY (version_id, product_id) REFERENCES products(version_id, id)
);
CREATE TABLE sources (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL UNIQUE,
  hostname TEXT NOT NULL,
  last_checked_at TEXT,
  last_success_at TEXT,
  last_http_status INTEGER,
  consecutive_failures INTEGER NOT NULL DEFAULT 0,
  etag TEXT,
  last_modified TEXT,
  content_sha256 TEXT
);
CREATE INDEX sources_due ON sources(last_checked_at, hostname);
CREATE TABLE product_sources (
  version_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  source_id TEXT NOT NULL REFERENCES sources(id),
  kind TEXT NOT NULL CHECK (kind IN ('product','sds','ph','evidence')),
  PRIMARY KEY (version_id, product_id, source_id, kind),
  FOREIGN KEY (version_id, product_id) REFERENCES products(version_id, id)
);
CREATE TABLE catalog_publication (
  singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
  version_id TEXT NOT NULL REFERENCES catalog_versions(id),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TABLE source_snapshots (
  id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL REFERENCES sources(id),
  object_key TEXT NOT NULL UNIQUE,
  content_sha256 TEXT NOT NULL,
  content_type TEXT NOT NULL,
  byte_length INTEGER NOT NULL,
  captured_at TEXT NOT NULL,
  UNIQUE(source_id, content_sha256)
);
CREATE TABLE audit_runs (
  id TEXT PRIMARY KEY,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  state TEXT NOT NULL CHECK (state IN ('running','completed','failed')),
  kind TEXT NOT NULL CHECK (kind IN ('sources','browser','index'))
);
CREATE TABLE source_checks (
  run_id TEXT NOT NULL REFERENCES audit_runs(id),
  source_id TEXT NOT NULL REFERENCES sources(id),
  checked_at TEXT NOT NULL,
  status INTEGER,
  outcome TEXT NOT NULL,
  error_code TEXT,
  PRIMARY KEY (run_id, source_id)
);
CREATE TABLE review_items (
  id TEXT PRIMARY KEY,
  source_id TEXT REFERENCES sources(id),
  product_id TEXT,
  kind TEXT NOT NULL CHECK (kind IN ('source-change','correction')),
  state TEXT NOT NULL CHECK (state IN ('pending','approved','rejected')) DEFAULT 'pending',
  body TEXT NOT NULL,
  created_at TEXT NOT NULL,
  reviewed_at TEXT,
  reviewed_by TEXT,
  decision_note TEXT
);
CREATE INDEX review_pending ON review_items(state, created_at);
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  credential_hash TEXT UNIQUE,
  disabled_at TEXT
);
CREATE TABLE user_favorites (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted INTEGER NOT NULL DEFAULT 0 CHECK (deleted IN (0,1)),
  PRIMARY KEY (user_id, product_id)
);
CREATE TABLE user_checklists (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  document TEXT NOT NULL CHECK (json_valid(document)),
  revision INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL
);
CREATE INDEX checklists_owner ON user_checklists(user_id, updated_at);
CREATE TABLE audit_events (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  metadata TEXT NOT NULL CHECK (json_valid(metadata))
);
