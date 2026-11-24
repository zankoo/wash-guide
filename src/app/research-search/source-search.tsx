'use client';

import { useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import Link from 'next/link';
import { CloseIcon, ExternalIcon, SearchIcon, WarnIcon } from '@/components/icons';

type Citation = { title: string; productId: string; kind: string; href: string; excerpt: string };

const subscribeHydration = () => () => {};
const EXAMPLES = ['去除车漆水斑', '轮毂铁粉清洁', 'PPF 隐形车衣维护', '皮革清洁 pH'];

export function SourceSearch() {
  const ready = useSyncExternalStore(subscribeHydration, () => true, () => false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Citation[]>([]);
  const [status, setStatus] = useState('');
  const [tone, setTone] = useState<'info' | 'warn' | ''>('');
  const [busy, setBusy] = useState(false);

  async function runSearch(raw: string) {
    if (busy) return;
    const text = raw.trim();
    if (text.length < 2) {
      setTone('warn');
      setStatus('请至少输入两个字符');
      return;
    }
    setBusy(true);
    setResults([]);
    setTone('info');
    setStatus('正在检索资料…');
    try {
      const response = await fetch('/api/platform/search', { method: 'POST', body: text, cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) {
        setTone('warn');
        setStatus(data.error ?? '资料检索暂时不可用');
        return;
      }
      setResults(data.results);
      if (data.results.length) {
        setTone('info');
        setStatus('找到 ' + data.results.length + ' 份相关资料');
      } else {
        setTone('warn');
        setStatus('没有找到相关资料，可换个说法或使用产品速查');
      }
    } catch {
      setTone('warn');
      setStatus('无法连接资料检索服务，请检查网络后再试');
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = String(new FormData(event.currentTarget).get('q') ?? '');
    void runSearch(text);
  }

  function pickExample(example: string) {
    setQuery(example);
    void runSearch(example);
  }

  return (
    <div className="source-search">
      <form className="srch-form" onSubmit={submit} role="search">
        <label className="sr" htmlFor="source-query">想查什么？</label>
        <div className="search srch-box">
          <SearchIcon />
          <input
            ref={inputRef}
            name="q"
            id="source-query"
            disabled={!ready}
            type="search"
            minLength={2}
            maxLength={200}
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="例如：哪些产品适合去除车漆水斑？"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className="clear"
              aria-label="清空输入"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
            >
              <CloseIcon />
            </button>
          )}
        </div>
        <button type="submit" className="btn-primary srch-btn" disabled={!ready || busy}>
          {busy ? '检索中…' : '检索'}
        </button>
      </form>

      <div className="srch-examples" aria-label="示例问题">
        <span>试试：</span>
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            className="srch-chip"
            disabled={!ready || busy}
            onClick={() => pickExample(example)}
          >
            {example}
          </button>
        ))}
      </div>

      <p className="srch-note">按当前已发布目录核对引用；结果来自原文摘录，施工前请仍以产品详情页比例与瓶身说明为准。</p>

      <p className={status ? `tool-status${tone === 'warn' ? ' warn' : ''}` : 'sr'} role="status">
        {tone === 'warn' && status ? <WarnIcon /> : null}
        <span>{status}</span>
      </p>

      {busy && (
        <div className="res-list skel" aria-hidden="true">
          <div className="res-card">
            <i style={{ width: '28%' }} />
            <i className="big" style={{ width: '56%' }} />
            <i style={{ width: '100%' }} />
            <i style={{ width: '84%' }} />
          </div>
          <div className="res-card">
            <i style={{ width: '24%' }} />
            <i className="big" style={{ width: '48%' }} />
            <i style={{ width: '96%' }} />
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="res-list">
          {results.map((item) => {
            const isSds = item.kind.includes('安全');
            return (
              <article className="res-card" key={item.productId + item.kind}>
                <div className="res-meta">
                  <span className={`res-kind ${isSds ? 'sds' : 'doc'}`}>{item.kind}</span>
                  <span className="res-id">{item.productId}</span>
                </div>
                <h2 className="res-title">
                  <Link href={'/p/' + encodeURIComponent(item.productId)}>{item.title}</Link>
                </h2>
                <p className="res-excerpt">{item.excerpt}</p>
                <div className="res-actions">
                  <Link className="res-link" href={'/p/' + encodeURIComponent(item.productId)}>
                    查看施工参数
                  </Link>
                  <a className="res-ext" href={item.href} target="_blank" rel="noreferrer">
                    查看{item.kind}原文
                    <ExternalIcon />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
