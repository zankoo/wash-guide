declare module 'cloudflare:workers' {
  export const env: { PLATFORM: { fetch(url: string, init: RequestInit): Promise<Response> } };
}
