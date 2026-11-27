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
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*", "!/img/*"],
    },
    env: {
      ASSETS: bindings.assets(),
    },
  }),
});
