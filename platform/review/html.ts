export const responseHeaders = {
  'Cache-Control': 'private, no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Robots-Tag': 'noindex, nofollow',
  'Content-Security-Policy':
    "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; form-action 'self'; base-uri 'none'",
};
export const escape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
export const message = (text: string, status: number) => new Response(text, { status, headers: responseHeaders });

const styles = `:root{--paper:#eef1f2;--sheet:#ffffff;--ink:#0f1b22;--muted:#53626b;--faint:#637077;--line:#dbe1e4;--line-2:#c3cdd2;--rinse:#0b6e99;--rinse-soft:#e0eef5;--warn:#8a5300;--warn-bg:#fbf3e3;--danger:#c81e15;--alk:#5b3fd1;--alk-bg:#eeebfc;--neu:#1d8656;--neu-bg:#e2f2e9;--acid:#b0600a;--acid-bg:#fbeedd;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--paper:#0c1418;--sheet:#131e24;--ink:#e4ecef;--muted:#9caab1;--faint:#86959c;--line:#22313a;--line-2:#33464f;--rinse:#62c3ea;--rinse-soft:#123242;--warn:#f0b65c;--warn-bg:#2a2113;--danger:#ff7a6e;--alk:#ab9dff;--alk-bg:#231f45;--neu:#7cd3a3;--neu-bg:#13302a;--acid:#f1ad5c;--acid-bg:#2f2213;color-scheme:dark}}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.65 system-ui,-apple-system,"PingFang SC","HarmonyOS Sans SC","Noto Sans CJK SC","Microsoft YaHei",sans-serif;-webkit-font-smoothing:antialiased}
a{color:var(--rinse);text-decoration:none}
a:hover{text-decoration:underline}
button,input,select,textarea{font:inherit;color:inherit}
.wrap{max-width:860px;margin:0 auto;padding:16px clamp(12px,3vw,20px) 48px}
.nav{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px 16px;padding:8px 6px 16px;font-size:14px;font-weight:600}
.nav-links{display:flex;flex-wrap:wrap;gap:14px}
.sheet{background:var(--sheet);border:1px solid var(--line);border-radius:18px;overflow:clip}
.head{padding:22px clamp(18px,4vw,28px) 18px;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:14px}
.logo{display:flex;gap:3px;flex:none}
.logo i{width:6px;height:28px;border-radius:3px;background:var(--alk)}
.logo i:nth-child(2){background:var(--neu);transform:translateY(4px)}
.logo i:nth-child(3){background:var(--acid)}
.eyebrow{display:block;font-size:12px;font-weight:600;color:var(--faint);letter-spacing:.03em}
h1{margin:2px 0 0;font-size:clamp(22px,4vw,26px);line-height:1.2;font-weight:800}
h2{margin:0 0 10px;font-size:16px;font-weight:800}
.body{padding:20px clamp(18px,4vw,28px) 28px;display:grid;gap:16px}
.card{border:1px solid var(--line);border-radius:14px;padding:16px 18px;background:var(--sheet);display:grid;gap:12px}
.card.soft{background:var(--paper)}
.list{list-style:none;margin:0;padding:0;border:1px solid var(--line);border-radius:14px;overflow:clip}
.list li{padding:13px 16px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 14px;border-top:1px solid var(--line)}
.list li:first-child{border-top:0}
.list li a{font-weight:600;color:var(--ink);overflow-wrap:anywhere}
.list li a:hover{color:var(--rinse)}
.meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:13px;color:var(--muted)}
.tag{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;padding:2px 9px;border-radius:6px;white-space:nowrap}
.tag.alk{color:var(--alk);background:var(--alk-bg)}
.tag.neu{color:var(--neu);background:var(--neu-bg)}
.tag.acid{color:var(--acid);background:var(--acid-bg)}
.tag.rinse{color:var(--rinse);background:var(--rinse-soft)}
.tag.none{color:var(--muted);background:var(--line)}
.actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.btn,button{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:40px;padding:0 16px;border-radius:11px;border:1px solid var(--line-2);background:var(--sheet);color:var(--ink);font-size:14px;font-weight:600;cursor:pointer;text-decoration:none}
.btn:hover,button:hover{border-color:var(--ink);text-decoration:none}
.btn.primary,button.primary{border-color:var(--ink);background:var(--ink);color:var(--paper)}
.btn.primary:hover,button.primary:hover{opacity:.88}
.btn.danger,button.danger{border-color:var(--danger);color:var(--danger)}
.btn.danger:hover,button.danger:hover{background:var(--danger);color:#fff}
form{display:grid;gap:14px;margin:0}
label{display:grid;gap:6px;font-size:13.5px;font-weight:600;color:var(--ink)}
input,select,textarea{width:100%;max-width:100%;padding:9px 12px;border:1px solid var(--line-2);border-radius:10px;background:var(--sheet);color:var(--ink);font-size:14.5px;outline:0}
input:focus,select:focus,textarea:focus{border-color:var(--rinse);box-shadow:0 0 0 3px var(--rinse-soft)}
textarea{resize:vertical;line-height:1.55}
fieldset{margin:0;padding:14px 16px;border:1px solid var(--line);border-radius:14px;background:var(--paper);display:grid;gap:10px}
legend{padding:0 6px;font-size:13.5px;font-weight:700;color:var(--ink)}
.repeat-list{display:grid;gap:10px}
.dilution{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:10px;border:1px solid var(--line);border-radius:10px;background:var(--sheet)}
.dilution label{font-size:12.5px;color:var(--muted)}
pre{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;padding:14px 16px;border:1px solid var(--line);border-radius:12px;background:var(--paper);font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:13px;line-height:1.6}
.diff-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.diff-box{display:grid;gap:6px}
.diff-box span{font-size:12.5px;font-weight:700;color:var(--muted)}
.empty{margin:0;padding:24px 16px;border:1px dashed var(--line-2);border-radius:12px;text-align:center;color:var(--muted);font-size:14px}
.muted{margin:0;color:var(--muted);font-size:14px;overflow-wrap:anywhere}
@media (max-width:640px){.dilution,.diff-grid{grid-template-columns:1fr}}`;

export function page(title: string, body: string, script?: string, nav = '') {
  const nonce = script ? crypto.randomUUID() : null;
  const html = `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} · 审核台 · 洗车施工速查</title><style>${styles}</style><body><div class="wrap"><nav class="nav"><a href="/">← 返回主站</a><div class="nav-links">${nav || '<a href="/admin">待审核资料</a><a href="/admin/decisions/history">审核记录与回滚</a>'}</div></nav><main class="sheet"><header class="head"><span class="logo" role="presentation"><i></i><i></i><i></i></span><div><span class="eyebrow">Cloudflare Access · 目录受审发布</span><h1>${escape(title)}</h1></div></header><div class="body">${body}</div></main></div>${script ? `<script nonce="${nonce}">${script}</script>` : ''}</body></html>`;
  return new Response(html, {
    headers: {
      ...responseHeaders,
      'Content-Security-Policy':
        responseHeaders['Content-Security-Policy'] + (nonce ? "; script-src 'nonce-" + nonce + "'" : ''),
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
