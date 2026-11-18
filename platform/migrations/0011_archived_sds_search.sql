-- An external URL may be shared by several products. One indexed document
-- per source revision, with a representative product from the live catalog.
CREATE INDEX product_sources_by_source_kind ON product_sources(source_id,kind,version_id,product_id);
CREATE INDEX source_change_reviews ON review_items(source_id,state) WHERE kind='source-change';
-- Keep the withdrawal across timeouts, 403s or a response that could not
-- be validated and archived. Older runs may already have overwritten the status.
CREATE TABLE withdrawn_sds_sources (source_id TEXT PRIMARY KEY REFERENCES sources(id));
INSERT INTO withdrawn_sds_sources
SELECT id FROM sources WHERE last_http_status IN (404,410);
INSERT OR IGNORE INTO withdrawn_sds_sources
SELECT source_id FROM source_checks
WHERE status IN (404,410) OR (status BETWEEN 200 AND 299 OR status=304) AND outcome IN ('archived','unchanged')
GROUP BY source_id
HAVING max(CASE WHEN status IN (404,410) THEN checked_at ELSE '' END) >
       max(CASE WHEN outcome IN ('archived','unchanged') THEN checked_at ELSE '' END);
CREATE TRIGGER withdraw_missing_sds AFTER INSERT ON source_checks WHEN NEW.status IN (404,410) BEGIN
  INSERT OR IGNORE INTO withdrawn_sds_sources VALUES(NEW.source_id);
END;
CREATE TRIGGER restore_checked_sds AFTER INSERT ON source_checks
WHEN (NEW.status BETWEEN 200 AND 299 OR NEW.status=304) AND NEW.outcome IN ('archived','unchanged') BEGIN
  DELETE FROM withdrawn_sds_sources WHERE source_id=NEW.source_id;
END;

CREATE VIEW published_remote_sds AS
SELECT s.id source_id,s.content_sha256 digest,s.url,min(p.id) product_id
FROM catalog_publication v
JOIN product_sources ps ON ps.version_id=v.version_id AND ps.kind='sds'
JOIN sources s ON s.id=ps.source_id
JOIN products p ON (p.version_id,p.id)=(ps.version_id,ps.product_id)
WHERE s.url LIKE 'https://%' AND length(s.content_sha256)=64
  AND NOT EXISTS (SELECT 1 FROM withdrawn_sds_sources w WHERE w.source_id=s.id)
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
