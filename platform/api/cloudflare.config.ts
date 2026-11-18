import { bindings, defineConfig, defineWorker } from 'cf/config';

export default defineConfig({
  accountId: 'a158719ab9bc61951cf7ca8463e5ac70',
  worker: defineWorker({
    name: 'wash-guide-api',
    entrypoint: './worker.ts',
    compatibilityDate: '2026-11-18',
    workersDev: false,
    previewUrls: false,
    observability: { enabled: true, traces: { enabled: true } },
    env: {
      DB: bindings.d1({ name:'wash-guide',id:'fe14705e-4532-4b31-afb5-455132ec1e7e' }),
      SEARCH: bindings.aiSearch({ name:'wash-guide' }),
      TURNSTILE_SECRET: bindings.secret(),
      CORRECTION_LIMIT: bindings.rateLimit({ namespace:'41072',simple:{limit:4,period:60} }),
      SEARCH_LIMIT: bindings.rateLimit({ namespace:'41071',simple:{limit:4,period:60} }),
    },
  }),
});
