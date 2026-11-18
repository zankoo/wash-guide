-- R2 reservations are committed BEFORE object operations. Failed/unknown writes
-- keep their storage reservation until R2 deletion has been acknowledged.
CREATE TABLE archive_policy (
  singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
  enabled INTEGER NOT NULL CHECK (enabled IN (0,1)),
  max_bytes INTEGER NOT NULL CHECK (max_bytes BETWEEN 1 AND 1000000000),
  max_object_bytes INTEGER NOT NULL CHECK (max_object_bytes BETWEEN 1 AND 5000000),
  daily_puts INTEGER NOT NULL CHECK (daily_puts BETWEEN 1 AND 100),
  daily_gets INTEGER NOT NULL CHECK (daily_gets BETWEEN 1 AND 1000)
);
INSERT INTO archive_policy VALUES (1,1,1000000000,5000000,100,1000);
CREATE TABLE archive_storage (
  singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
  reserved_bytes INTEGER NOT NULL CHECK (reserved_bytes >= 0)
);
INSERT INTO archive_storage VALUES (1,0);
CREATE TABLE archive_daily (
  day TEXT PRIMARY KEY,
  puts INTEGER NOT NULL DEFAULT 0 CHECK (puts >= 0),
  gets INTEGER NOT NULL DEFAULT 0 CHECK (gets >= 0)
);
CREATE TABLE archive_objects (
  object_key TEXT PRIMARY KEY,
  source_id TEXT NOT NULL REFERENCES sources(id),
  content_sha256 TEXT NOT NULL,
  byte_length INTEGER NOT NULL CHECK (byte_length > 0),
  content_type TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('uploading','stored','failed','deleting')),
  attempts INTEGER NOT NULL CHECK (attempts BETWEEN 1 AND 3),
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL CHECK (expires_at > created_at),
  UNIQUE(source_id, content_sha256)
);
CREATE INDEX archive_expiration ON archive_objects(expires_at);

CREATE TRIGGER archive_reserve BEFORE INSERT ON archive_objects BEGIN
  SELECT CASE WHEN NOT EXISTS (SELECT 1 FROM archive_policy WHERE singleton=1 AND enabled=1)
    OR NOT EXISTS (SELECT 1 FROM archive_storage WHERE singleton=1)
    THEN RAISE(ABORT,'archive_disabled') END;
  SELECT CASE WHEN NEW.byte_length > (SELECT max_object_bytes FROM archive_policy WHERE singleton=1)
    OR NEW.byte_length + (SELECT reserved_bytes FROM archive_storage WHERE singleton=1) > (SELECT max_bytes FROM archive_policy WHERE singleton=1)
    THEN RAISE(ABORT,'archive_storage_limit') END;
  INSERT OR IGNORE INTO archive_daily(day) VALUES (date('now'));
  SELECT CASE WHEN (SELECT puts FROM archive_daily WHERE day=date('now')) >= (SELECT daily_puts FROM archive_policy WHERE singleton=1)
    THEN RAISE(ABORT,'archive_write_limit') END;
  UPDATE archive_daily SET puts=puts+1 WHERE day=date('now');
  UPDATE archive_storage SET reserved_bytes=reserved_bytes+NEW.byte_length WHERE singleton=1;
END;

CREATE TRIGGER archive_retry BEFORE UPDATE OF attempts ON archive_objects
WHEN NEW.attempts != OLD.attempts BEGIN
  SELECT CASE WHEN NOT EXISTS (SELECT 1 FROM archive_policy WHERE singleton=1 AND enabled=1)
    OR NOT EXISTS (SELECT 1 FROM archive_storage WHERE singleton=1)
    THEN RAISE(ABORT,'archive_disabled') END;
  SELECT CASE WHEN NEW.attempts != OLD.attempts+1 OR OLD.state != 'failed' OR NEW.state != 'uploading'
    THEN RAISE(ABORT,'archive_invalid_retry') END;
  INSERT OR IGNORE INTO archive_daily(day) VALUES (date('now'));
  SELECT CASE WHEN (SELECT puts FROM archive_daily WHERE day=date('now')) >= (SELECT daily_puts FROM archive_policy WHERE singleton=1)
    THEN RAISE(ABORT,'archive_write_limit') END;
  UPDATE archive_daily SET puts=puts+1 WHERE day=date('now');
END;

CREATE TRIGGER archive_delete_guard BEFORE DELETE ON archive_objects BEGIN
  SELECT CASE WHEN OLD.state != 'deleting' THEN RAISE(ABORT,'archive_delete_not_confirmed') END;
END;
CREATE TRIGGER archive_release AFTER DELETE ON archive_objects BEGIN
  UPDATE archive_storage SET reserved_bytes=reserved_bytes-OLD.byte_length WHERE singleton=1;
END;
