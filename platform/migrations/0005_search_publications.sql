ALTER TABLE search_documents ADD COLUMN upload_key TEXT;
ALTER TABLE search_documents ADD COLUMN retry_after INTEGER NOT NULL DEFAULT 0;

CREATE TABLE search_retirements (
  item_key TEXT PRIMARY KEY,
  retry_after INTEGER NOT NULL DEFAULT 0
);

-- Retire accepted uploads and any request that could have reached the provider
-- before its receipt was saved. Allow in-flight operations to finish first.
CREATE TRIGGER search_retire_documents AFTER DELETE ON search_documents BEGIN
  INSERT OR IGNORE INTO search_retirements(item_key)
    SELECT OLD.indexed_key WHERE OLD.indexed_key IS NOT NULL;
  INSERT OR IGNORE INTO search_retirements(item_key,retry_after)
    SELECT OLD.upload_key,(unixepoch()+1800)*1000 WHERE OLD.upload_key IS NOT NULL;
END;

-- Earlier Workers accepted a PDF after checking only its length and MIME type.
-- Their keys begin with the verified digest of the bytes actually uploaded.
INSERT OR IGNORE INTO search_retirements(item_key)
SELECT s.indexed_key FROM search_documents s
JOIN products p ON (p.version_id,p.id)=(s.version_id,s.product_id)
WHERE s.item_key LIKE 'sds-%' AND s.indexed_key IS NOT NULL
AND lower(json_extract(p.document,'$.sds.sha256')) != substr(s.indexed_key,1,64);
UPDATE search_documents SET indexed_key=NULL, state='pending', attempts=0
WHERE indexed_key IN (SELECT item_key FROM search_retirements);

-- Keep existing citations available in the transaction that switches the
-- publication pointer, even when uploads have exhausted their daily budget.
CREATE TRIGGER search_publish_catalog AFTER UPDATE OF version_id ON catalog_publication
WHEN NOT EXISTS (SELECT 1 FROM search_index_versions WHERE version_id=NEW.version_id)
BEGIN
  DELETE FROM search_documents WHERE version_id!=NEW.version_id AND NOT EXISTS (
    SELECT 1 FROM products original JOIN products current ON current.id=original.id
    WHERE original.version_id=search_documents.version_id AND original.id=search_documents.product_id
      AND current.version_id=NEW.version_id AND CASE WHEN search_documents.item_key LIKE 'sds-%' THEN
        json_extract(current.document,'$.sds.hosting')='local'
        AND json_extract(current.document,'$.sds.url')=json_extract(original.document,'$.sds.url')
        AND json_extract(current.document,'$.sds.sha256') IS json_extract(original.document,'$.sds.sha256')
        AND (json_extract(current.document,'$.sds.sha256') IS NOT NULL OR
             json_extract(current.document,'$.sds')=json_extract(original.document,'$.sds'))
      ELSE json_extract(current.document,'$.brand','$.name','$.type','$.materials','$.dilutions','$.steps','$.cautions','$.notes','$.ph.evidence','$.url') =
           json_extract(original.document,'$.brand','$.name','$.type','$.materials','$.dilutions','$.steps','$.cautions','$.notes','$.ph.evidence','$.url')
      END
  );
  UPDATE search_documents SET version_id=NEW.version_id WHERE version_id!=NEW.version_id;
  INSERT OR IGNORE INTO search_documents(item_key,version_id,product_id,state)
    SELECT 'product-'||id||'.md',version_id,id,'pending' FROM products WHERE version_id=NEW.version_id;
  INSERT OR IGNORE INTO search_documents(item_key,version_id,product_id,state)
    SELECT 'sds-'||substr(json_extract(document,'$.sds.url'),6),version_id,id,'pending'
    FROM products WHERE version_id=NEW.version_id AND json_extract(document,'$.sds.hosting')='local';
  DELETE FROM search_index_versions;
  INSERT INTO search_index_versions VALUES(NEW.version_id);
END;
