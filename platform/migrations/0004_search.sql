CREATE TABLE search_documents (
  item_key TEXT PRIMARY KEY,
  indexed_key TEXT UNIQUE,
  version_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  state TEXT NOT NULL CHECK(state IN ('pending','uploading','submitted','error')),
  attempts INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX search_documents_pending ON search_documents(state,updated_at);
CREATE TABLE search_index_versions(version_id TEXT PRIMARY KEY);
CREATE TABLE search_usage (
  day TEXT PRIMARY KEY,
  lookups INTEGER NOT NULL DEFAULT 0,
  uploads INTEGER NOT NULL DEFAULT 0,
  bytes INTEGER NOT NULL DEFAULT 0
);
