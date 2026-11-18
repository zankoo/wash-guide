import { WorkflowEntrypoint } from 'cloudflare:workers';
import type { CloudflareWorkersModule } from '@cloudflare/workers-types';
import type { ReviewEnv } from './dispatch';
import { applyDecision } from './publication';

export class CatalogReview extends WorkflowEntrypoint<ReviewEnv, { id: string }> {
  async run(event: CloudflareWorkersModule.WorkflowEvent<{ id: string }>, step: CloudflareWorkersModule.WorkflowStep) {
    const { id } = event.payload;
    const state = await step.do('Read proposal', () => this.env.DB.prepare('SELECT state FROM review_actions WHERE id=?').bind(id).first<string>('state'));
    if (state === 'proposed') {
      try {
        await step.waitForEvent('Wait for reviewer confirmation', { type: 'confirmed', timeout: '7 days' });
      } catch (error) {
        // Only lapse an unconfirmed proposal after its actual deadline. If a
        // confirmation raced the timer its durable queued state wins.
        const current = await step.do('Check deadline', async () => {
          await this.env.DB.prepare(`UPDATE review_actions SET state='conflict',reason='review_expired',finished_at=datetime('now')
            WHERE id=? AND state='proposed' AND created_at<=strftime('%Y-%m-%dT%H:%M:%fZ','now','-7 days')`).bind(id).run();
          return this.env.DB.prepare('SELECT state FROM review_actions WHERE id=?').bind(id).first<string>('state');
        });
        if (current === 'proposed') throw error;
      }
    }
    // The event is a wake-up only. Trust the persisted, authenticated decision.
    return step.do('Apply confirmed decision', { retries: { limit: 3, delay: '10 seconds', backoff: 'exponential' } }, () => applyDecision(this.env.DB, id));
  }
}
