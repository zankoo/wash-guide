ALTER TABLE audit_runs ADD COLUMN expected_count INTEGER NOT NULL DEFAULT 0;
CREATE TABLE source_job_days (
  day TEXT PRIMARY KEY,
  run_id TEXT NOT NULL UNIQUE REFERENCES audit_runs(id)
);
