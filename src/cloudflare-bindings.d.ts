declare module 'cloudflare:workers' {
  export const env: {
    DB: import('@cloudflare/workers-types').D1Database;
    ASSETS: { fetch(url: string): Promise<Response> };
    PLATFORM: { fetch(request: Request): Promise<Response> };
  };
}
