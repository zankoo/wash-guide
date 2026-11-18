import type { BrowserRun, D1Database } from '@cloudflare/workers-types';
import { browserScenario } from './browser-scenario';

export async function auditProductionGuide(db: D1Database, browser: Pick<BrowserRun,'script'|'closeSession'>, scheduledTime: number) {
  const day = new Date(scheduledTime).toISOString().slice(0,10);
  const runId = 'browser-' + day;
  // Claim only today's slot and count failed sessions too. A delayed or
  // duplicated Cron event cannot start extra browsers for the same UTC day.
  const claimed = await db.prepare(`INSERT OR IGNORE INTO audit_runs(id,started_at,state,kind)
    SELECT ?,strftime('%Y-%m-%dT%H:%M:%fZ','now'),'running','browser' WHERE ?=date('now') RETURNING id`)
    .bind(runId,day).first();
  if (!claimed) return;

  let state = 'failed';
  try {
    const response = await browser.script(browserScenario,{library:'playwright',timeout:55000,keepAlive:10000,recording:false});
    try {
      if (!response.ok) throw new Error('Browser Run failed with HTTP ' + response.status);
      const report = await response.json<{success:boolean;result:unknown}>();
      if (!report.success || report.result !== 'offline-calculation-passed') {
        const stage = typeof report.result === 'string' && /^failed:[a-z-]+$/.test(report.result) ? report.result : 'invalid-result';
        throw new Error('Production guide browser audit ' + stage);
      }
    } finally {
      const session = response.headers.get('cf-browser-session-id');
      if (session) await browser.closeSession(session);
    }
    state = 'completed';
  } finally {
    await db.prepare("UPDATE audit_runs SET state=?,completed_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=?")
      .bind(state,runId).run();
  }
}
