import { bindings, defineConfig, defineWorker, triggers } from 'cf/config';

export default defineConfig({
  accountId: 'a158719ab9bc61951cf7ca8463e5ac70',
  worker: defineWorker({
    name: 'wash-guide-jobs',
    entrypoint: '../jobs.ts',
    compatibilityDate: '2026-11-17',
    workersDev: false,
    previewUrls: false,
    observability: { enabled: true, traces: { enabled: true } },
    triggers: [
      triggers.scheduled({ schedule: '*/15 * * * *' }),
      triggers.scheduled({ schedule: '0 3 * * *' }),
      triggers.scheduled({ schedule: '35 3 * * *' }),
      triggers.queue({ name: 'wash-guide-sources', deadLetterQueue: 'wash-guide-sources-dead', maxBatchSize: 1, maxConcurrency: 1, maxRetries: 2, retryDelay: 300 }),
    ],
    env: {
      BROWSER: bindings.browser(),
      SEARCH: bindings.aiSearch({ name: 'wash-guide' }),
      DB: bindings.d1({ name: 'wash-guide', id: 'fe14705e-4532-4b31-afb5-455132ec1e7e' }),
      ARCHIVE: bindings.r2({ name: 'wash-guide-archive' }),
      SOURCE_QUEUE: bindings.queue({ name: 'wash-guide-sources' }),
    },
  }),
});
