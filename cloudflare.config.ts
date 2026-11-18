import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  accountId: "a158719ab9bc61951cf7ca8463e5ac70",
  worker: defineWorker({
    name: "wash-guide",
    workersDev: true,
    previewUrls: true,
    placement: { mode: "smart" },
    domains: ["wash.kokoda.fun"],
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-17",
    observability: {
      enabled: true,
      issues: { enabled: true },
      traces: { enabled: true },
    },
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*", "!/img/*", "!/sds/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      DB: bindings.d1({ name: "wash-guide", id: "fe14705e-4532-4b31-afb5-455132ec1e7e" }),
      ARCHIVE: bindings.r2({ name: "wash-guide-archive" }),
      SEARCH: bindings.aiSearch({ name: "wash-guide" }),
      PLATFORM: bindings.worker({ worker: "wash-guide-api" }),
    },
  }),
});
