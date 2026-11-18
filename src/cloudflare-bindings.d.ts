declare module 'cloudflare:workers' {
  export const WorkflowEntrypoint: typeof import("@cloudflare/workers-types").CloudflareWorkersModule.WorkflowEntrypoint;
  export const env: {
    DB: import('@cloudflare/workers-types').D1Database;
    ASSETS: { fetch(url: string): Promise<Response> };
    PLATFORM: { fetch(url: string, init: RequestInit): Promise<Response> };
  };
}
