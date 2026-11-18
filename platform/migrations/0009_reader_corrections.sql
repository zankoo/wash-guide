CREATE INDEX IF NOT EXISTS corrections_by_date ON review_items(created_at) WHERE kind='correction';
