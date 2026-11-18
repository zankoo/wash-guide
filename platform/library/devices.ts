import { DurableObject } from 'cloudflare:workers';
import type { DurableObjectState } from '@cloudflare/workers-types';

// One SQLite-backed object per library. No raw cookie or pairing secret is
// stored. All pairing checks and the device insertion execute synchronously.
export class LibraryDevices extends DurableObject<unknown> {
  constructor(ctx: DurableObjectState, env: unknown) {
    super(ctx, env);
    ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS devices (digest TEXT PRIMARY KEY);
      CREATE TABLE IF NOT EXISTS bootstrap (singleton INTEGER PRIMARY KEY CHECK(singleton=1));
      CREATE TABLE IF NOT EXISTS pairing (singleton INTEGER PRIMARY KEY CHECK(singleton=1), digest TEXT, expires INTEGER, claimed TEXT);
    `);
  }
  has(digest: string) {
    return this.ctx.storage.sql.exec('SELECT 1 FROM devices WHERE digest=?', digest).toArray().length === 1;
  }
  initialize(digest: string) {
    return this.ctx.storage.transactionSync(() => {
      const first = this.ctx.storage.sql
        .exec('INSERT OR IGNORE INTO bootstrap VALUES(1) RETURNING singleton')
        .toArray();
      if (first.length) this.ctx.storage.sql.exec('INSERT INTO devices VALUES(?)', digest);
      return this.has(digest);
    });
  }
  issue(device: string, digest: string) {
    if (!this.has(device)) return false;
    this.ctx.storage.sql.exec(
      'INSERT OR REPLACE INTO pairing VALUES(1,?,?,NULL)',
      digest,
      Date.now() + 600_000,
    );
    return true;
  }
  redeem(pair: string, device: string) {
    return this.ctx.storage.transactionSync(() => {
      const row = this.ctx.storage.sql
        .exec<{
          claimed: string | null;
        }>('SELECT claimed FROM pairing WHERE digest=? AND expires>?', pair, Date.now())
        .toArray()[0];
      if (!row) return false;
      if (row.claimed) return row.claimed === device && this.has(device);
      if (this.ctx.storage.sql.exec<{ n: number }>('SELECT count(*) AS n FROM devices').one().n >= 8)
        return false;
      this.ctx.storage.sql.exec('INSERT OR IGNORE INTO devices VALUES(?)', device);
      this.ctx.storage.sql.exec('UPDATE pairing SET claimed=? WHERE singleton=1', device);
      return true;
    });
  }
  revoke(device: string) {
    this.ctx.storage.transactionSync(() => {
      this.ctx.storage.sql.exec('DELETE FROM devices WHERE digest=?', device);
      this.ctx.storage.sql.exec('DELETE FROM pairing');
    });
  }
}
