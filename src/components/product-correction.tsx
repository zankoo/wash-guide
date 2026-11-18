'use client';

import Script from 'next/script';
import { useEffect, useRef, useState, type FormEvent } from 'react';

type Challenge = {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  reset(id: string): void;
  remove(id: string): void;
};
declare global { interface Window { turnstile?: Challenge } }

function Form({ product }: { product: string }) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const submission = useRef<{ message: string; id: string } | null>(null);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  function render() {
    if (!container.current || !window.turnstile || widget.current !== null) return;
    widget.current = window.turnstile.render(container.current, {
      sitekey: '0x4AAAAAAGGZFWxBBrypejEj', action: 'product_correction', theme: 'auto',
      callback: (value: string) => setToken(value),
      'expired-callback': () => setToken(''),
      'error-callback': () => { setToken(''); setStatus('验证暂不可用，请检查网络后重试。'); },
    });
  }
  useEffect(() => {
    render();
    return () => {
      if (widget.current !== null) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || busy) return;
    const text = message.trim();
    if (text.length < 5) { setStatus('请至少填写 5 个字符。'); return; }
    if (submission.current?.message !== text) submission.current = { message: text, id: crypto.randomUUID() };
    setBusy(true);
    setStatus('');
    try {
      const res = await fetch('/api/platform/corrections', { method: 'POST',
        headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ id: submission.current.id, product, message: text, token }),
      });
      const data = await res.json();
      if (!res.ok || data.ok !== true) { setStatus(data.error || '提交失败，请稍后重试。'); return; }
      setSent(true);
    } catch { setStatus('暂时无法确认是否送达。联网后可重新提交。'); } finally {
      setToken('');
      if (widget.current !== null) window.turnstile?.reset(widget.current);
      setBusy(false);
    }
  }
  if (sent) return <p role="status">纠错已送交审核，感谢提供资料。</p>;
  return <form onSubmit={submit}>
    <label>需要修正的内容<textarea required minLength={5} maxLength={1500} rows={4} value={message}
      onChange={e => setMessage(e.target.value)} placeholder="请指出具体字段和建议改法，也可以附上官方资料链接。" /></label>
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive"
      onReady={render} onError={() => setStatus('验证未加载，请检查网络后重试。')} />
    <div ref={container} />
    <button type="submit" className="src" disabled={!token || busy || message.trim().length < 5}>{busy ? '提交中…' : '提交纠错'}</button>
    {status && <p role="status">{status}</p>}
  </form>;
}

export function ProductCorrection({ product }: { product: string }) {
  const [opened, setOpened] = useState(false);
  return <details className="product-correction" onToggle={e => { if (e.currentTarget.open) setOpened(true); }}>
    <summary>反馈资料错误</summary>
    {opened && <Form key={product} product={product} />}
  </details>;
}
