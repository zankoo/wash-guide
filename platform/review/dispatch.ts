import type { D1Database, Workflow } from '@cloudflare/workers-types';

export type ReviewEnv = { DB: Pick<D1Database, 'prepare' | 'batch'>; REVIEW: Workflow<{ id: string }> };

export async function dispatchReview(env: ReviewEnv, id: string) {
  // The database owns the outbox. Even if the process dies after reserving a
  // delivery, a later tick can pick it up using the same workflow instance id.
  const row = await env.DB.prepare(`UPDATE review_actions SET dispatch_attempts=dispatch_attempts+1,next_dispatch=unixepoch()+300
    WHERE id=? AND state IN ('proposed','queued') AND next_dispatch<=unixepoch() AND dispatch_attempts<6 RETURNING state`)
    .bind(id).first<{ state: string }>();
  if (!row) return;
  const result = await env.REVIEW.createBatch({ instances: [{ id, params: { id } }] });
  const instance = result.created[0] ?? await env.REVIEW.get(id);
  const { status } = await instance.status();
  if (status === 'errored' || status === 'terminated') await instance.restart();
  if (row.state === 'queued' && (status === 'waiting' || status === 'running')) {
    await instance.sendEvent({ type: 'confirmed', payload: { id } });
  }
  await env.DB.prepare('UPDATE review_actions SET next_dispatch=unixepoch()+? WHERE id=? AND state=?')
    .bind(row.state === 'proposed' ? 7 * 86400 + 300 : 900, id, row.state).run();
}

export async function recoverReviews(env: ReviewEnv) {
  await env.DB.prepare(`UPDATE review_actions SET state='conflict', reason='review_delivery_expired',
    finished_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE state IN ('proposed','queued') AND next_dispatch<=unixepoch()
    AND (dispatch_attempts>=6 OR (state='proposed' AND created_at<strftime('%Y-%m-%dT%H:%M:%fZ','now','-7 days')))`).run();
  const due = await env.DB.prepare(`SELECT id FROM review_actions WHERE state IN ('proposed','queued')
    AND next_dispatch<=unixepoch() ORDER BY next_dispatch,created_at LIMIT 4`).all<{ id: string }>();
  for (const { id } of due.results) {
    try { await dispatchReview(env, id); } catch { console.error('review_dispatch_failed', id); }
  }
}
