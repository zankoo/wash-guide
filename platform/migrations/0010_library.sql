CREATE INDEX users_created_at ON users(created_at);
-- One receipt per device. A replay after another device has edited the same
-- favorite cannot reapply the old command. The receipt and edits are atomic.
CREATE TABLE library_favorite_commands (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device TEXT NOT NULL,
  seq INTEGER NOT NULL,
  changes TEXT NOT NULL CHECK(json_valid(changes)),
  PRIMARY KEY(user_id, device)
);
CREATE TRIGGER apply_library_favorites AFTER INSERT ON library_favorite_commands BEGIN
  DELETE FROM user_favorites WHERE user_id=NEW.user_id AND product_id IN (
    SELECT json_extract(value,'$.id') FROM json_each(NEW.changes) WHERE json_extract(value,'$.on')=0
  );
  INSERT INTO user_favorites(user_id,product_id,updated_at,deleted)
    SELECT NEW.user_id,json_extract(value,'$.id'),datetime('now'),0 FROM json_each(NEW.changes)
    WHERE json_extract(value,'$.on')=1 ON CONFLICT(user_id,product_id)
    DO UPDATE SET deleted=0,updated_at=excluded.updated_at WHERE user_favorites.deleted=1;
  SELECT CASE WHEN (SELECT count(*) FROM user_favorites WHERE user_id=NEW.user_id AND deleted=0)>1000
    THEN RAISE(ABORT,'library_favorites_limit') END;
END;
