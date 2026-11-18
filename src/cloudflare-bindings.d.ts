declare module 'cloudflare:workers' {
  export const DurableObject: typeof import('@cloudflare/workers-types').CloudflareWorkersModule.DurableObject;
  export const env: { PLATFORM: { fetch(url: string, init: RequestInit): Promise<Response> } };
}
