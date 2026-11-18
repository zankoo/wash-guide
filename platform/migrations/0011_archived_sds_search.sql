-- An external URL may be shared by several products. One indexed document
-- per source revision, with a representative product from the live catalog.
CREATE INDEX product_sources_by_source_kind ON product_sources(source_id,kind,version_id,product_id);
CREATE INDEX source_change_reviews ON review_items(source_id,state) WHERE kind='source-change';
CREATE VIEW published_remote_sds AS
SELECT s.id source_id,s.content_sha256 digest,s.url,min(p.id) product_id
FROM catalog_publication v
JOIN product_sources ps ON ps.version_id=v.version_id AND ps.kind='sds'
JOIN sources s ON s.id=ps.source_id
JOIN products p ON (p.version_id,p.id)=(ps.version_id,ps.product_id)
WHERE s.url LIKE 'https://%' AND length(s.content_sha256)=64
  AND coalesce(s.last_http_status,200) NOT IN (404,410)
  AND json_extract(p.document,'$.sds.hosting')='remote'
  AND json_extract(p.document,'$.sds.url')=s.url
  AND (json_extract(p.document,'$.sds.sha256') IS NULL OR lower(json_extract(p.document,'$.sds.sha256'))=s.content_sha256)
  AND NOT EXISTS (SELECT 1 FROM review_items r WHERE r.source_id=s.id AND r.kind='source-change'
    AND r.state!='approved' AND json_extract(r.body,'$.current')=s.content_sha256)
GROUP BY s.id,s.content_sha256,s.url;

CREATE TABLE search_archived_sds (
  source_id TEXT NOT NULL REFERENCES sources(id),
  digest TEXT NOT NULL,
  upload_key TEXT UNIQUE NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  retry_after INTEGER NOT NULL DEFAULT 0,
  submitted INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(source_id,digest)
);
CREATE TRIGGER retire_archived_sds AFTER DELETE ON search_archived_sds WHEN OLD.attempts>0 BEGIN
  INSERT OR IGNORE INTO search_retirements(item_key,retry_after)
    VALUES(OLD.upload_key,(unixepoch()+1800)*1000);
END;
