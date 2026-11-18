declare module 'cloudflare:workers' {
  export const env: { PLATFORM: { fetch(request: Request): Promise<Response> } };
}
