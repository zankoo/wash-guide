export const responseHeaders = {
  'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; form-action 'self'; base-uri 'none'",
};
export const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
export const message = (text: string, status: number) => new Response(text, { status, headers: responseHeaders });
export function page(title: string, body: string, script?: string) {
  const nonce = script ? crypto.randomUUID() : null;
  const html = `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escape(title)} · 洗车施工速查</title>
    <style>body{max-width:60rem;margin:3rem auto;padding:0 1rem;font:1rem/1.65 system-ui,sans-serif;color:#17282b}a{color:#065b69}li{margin:.6rem 0}label{display:block;margin:1rem 0}textarea,select,input{max-width:100%;box-sizing:border-box;font:inherit}textarea{width:100%}fieldset{margin:1.2rem 0}.dilution{display:flex;flex-wrap:wrap;gap:.6rem}.dilution label{margin:.4rem 0}button{font:inherit;padding:.3rem .8rem}pre{white-space:pre-wrap;overflow-wrap:anywhere;padding:1rem;background:#f3f6f6}</style>
    <main><h1>${escape(title)}</h1>${body}</main>${script ? `<script nonce="${nonce}">${script}</script>` : ''}</html>`;
  return new Response(html, { headers: { ...responseHeaders, 'Content-Security-Policy': responseHeaders['Content-Security-Policy'] + (nonce ? "; script-src 'nonce-" + nonce + "'" : ''), 'Content-Type': 'text/html; charset=utf-8' } });
}
