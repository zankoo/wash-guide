declare module 'cloudflare:workers' {
  export const WorkflowEntrypoint: typeof import('@cloudflare/workers-types').CloudflareWorkersModule.WorkflowEntrypoint;
  export const env: { PLATFORM: { fetch(request: Request): Promise<Response> } };
}
