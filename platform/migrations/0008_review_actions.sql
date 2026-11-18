-- The signed-in reviewer submits an immutable decision against the version
-- they inspected. A workflow can retry that decision after losing its response.
CREATE TABLE review_actions (
  id TEXT PRIMARY KEY,
  review_id TEXT REFERENCES review_items(id),
  kind TEXT NOT NULL CHECK(kind IN ('edit','approve','reject','rollback')),
  actor TEXT NOT NULL,
  base_version TEXT NOT NULL,
  product_id TEXT,
  change_json TEXT CHECK(change_json IS NULL OR json_valid(change_json)),
  rollback_version TEXT,
  note TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'proposed' CHECK(state IN ('proposed','queued','applied','conflict')),
  dispatch_attempts INTEGER NOT NULL DEFAULT 0,
  next_dispatch INTEGER NOT NULL DEFAULT 0,
  reason TEXT,
  result_version TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  finished_at TEXT,
  CHECK((kind='rollback') = (review_id IS NULL)),
  CHECK((kind='rollback') = (rollback_version IS NOT NULL)),
  CHECK((kind='edit') = (product_id IS NOT NULL AND change_json IS NOT NULL))
);
CREATE UNIQUE INDEX review_one_decision ON review_actions(review_id) WHERE state IN ('proposed','queued','applied');
CREATE UNIQUE INDEX review_one_rollback ON review_actions(base_version) WHERE kind='rollback' AND state IN ('proposed','queued');
CREATE INDEX review_actions_waiting ON review_actions(state,next_dispatch,created_at);

-- Inserting a receipt is the first statement of the publication batch. If any
-- condition changed since the form was opened, D1 rolls back the entire batch.
CREATE TABLE review_receipts (
  action_id TEXT PRIMARY KEY REFERENCES review_actions(id),
  applied_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TRIGGER review_action_guard BEFORE INSERT ON review_receipts BEGIN
  SELECT CASE WHEN NOT EXISTS (SELECT 1 FROM review_actions a JOIN catalog_publication p ON p.singleton=1
    WHERE a.id=NEW.action_id AND a.state='queued' AND a.base_version=p.version_id)
    THEN RAISE(ABORT,'review_stale') END;
  SELECT CASE WHEN EXISTS (SELECT 1 FROM review_actions a JOIN review_items r ON r.id=a.review_id
    WHERE a.id=NEW.action_id AND r.state!='pending') THEN RAISE(ABORT,'review_closed') END;
  SELECT CASE WHEN EXISTS (SELECT 1 FROM review_actions a JOIN review_items r ON r.id=a.review_id
    WHERE a.id=NEW.action_id AND a.kind='edit' AND NOT (
      (r.product_id IS NOT NULL AND r.product_id=a.product_id) OR
      EXISTS (SELECT 1 FROM product_sources s WHERE s.version_id=a.base_version
        AND s.product_id=a.product_id AND s.source_id=r.source_id)))
    THEN RAISE(ABORT,'review_unrelated_product') END;
  SELECT CASE WHEN EXISTS (SELECT 1 FROM review_actions a WHERE a.id=NEW.action_id AND a.kind='rollback'
    AND NOT EXISTS (SELECT 1 FROM review_actions published WHERE published.kind='edit' AND published.state='applied'
      AND published.result_version=a.base_version AND published.base_version=a.rollback_version))
    THEN RAISE(ABORT,'review_rollback_unavailable') END;
  SELECT CASE WHEN EXISTS (SELECT 1 FROM review_actions WHERE id=NEW.action_id AND kind='edit')
    AND (SELECT count(*) FROM review_actions WHERE kind='edit' AND state='applied'
      AND finished_at >= date('now')) >= 3 THEN RAISE(ABORT,'review_daily_limit') END;
END;
