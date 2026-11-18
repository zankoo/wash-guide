import type { D1Database } from '@cloudflare/workers-types';

// Both the capacity estimate before an R2 read and the final atomic
// reservation use UTC and the same account-wide application budget.
const capacity = `uploads<100 AND bytes+?1<=4000000 AND
  (SELECT COALESCE(SUM(bytes),0) FROM search_usage WHERE day>=date('now','start of month'))+?1<=24000000`;

export async function uploadCapacity(db: D1Database, bytes: number, reserve: boolean) {
  await db.prepare("INSERT OR IGNORE INTO search_usage(day) VALUES(date('now'))").run();
  const operation = reserve
    ? `UPDATE search_usage SET bytes=bytes+?1,uploads=uploads+1 WHERE day=date('now') AND ${capacity} RETURNING uploads`
    : `SELECT uploads FROM search_usage WHERE day=date('now') AND ${capacity}`;
  return Boolean(await db.prepare(operation).bind(bytes).first());
}
