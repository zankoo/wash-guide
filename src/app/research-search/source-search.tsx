'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

type Citation = {title:string; productId:string; kind:string; href:string; excerpt:string};

export function SourceSearch() {
  const [results,setResults] = useState<Citation[]>([]);
  const [status,setStatus] = useState('');
  const [busy,setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const query = String(new FormData(event.currentTarget).get('q') ?? '').trim();
    if (query.length<2) {setStatus('请至少输入两个字符'); return;}
    setBusy(true);
    setResults([]);
    setStatus('正在检索资料…');
    try {
      const response = await fetch('/api/platform/search', {method:'POST',body:query,cache:'no-store'});
      const data = await response.json();
      if (!response.ok) {setStatus(data.error ?? '资料检索暂时不可用'); return;}
      setResults(data.results);
      setStatus(data.results.length ? '找到 '+data.results.length+' 份相关资料' : '没有找到相关资料，可换个说法或使用产品速查');
    } catch {
      setStatus('无法连接资料检索服务，请检查网络后再试');
    } finally {setBusy(false);}
  }
  return <>
    <form onSubmit={submit} role="search">
      <label htmlFor="source-query">想查什么？</label>
      <input name="q" id="source-query" type="search" minLength={2} maxLength={200} required placeholder="例如：哪些产品适合去除车漆水斑？" />
      <button type="submit" disabled={busy}>检索</button>
    </form>
    <p role="status">{status}</p>
    {results.map(item=><article key={item.productId+item.kind}>
      <h2><Link href={'/p/'+encodeURIComponent(item.productId)}>{item.title}</Link></h2>
      <p>{item.excerpt}</p><a href={item.href} target="_blank" rel="noreferrer">查看{item.kind}原文 ↗</a>
    </article>)}
  </>;
}
