'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  CheckIcon,
  CopyIcon,
  LinkDeviceIcon,
  PlusIcon,
  StarIcon,
  SyncIcon,
  WarnIcon,
} from '@/components/icons';
import { useFavorites } from '@/lib/favorites';
import {
  attachLibrary,
  connectLibrary,
  libraryApi,
  LibraryError,
  refreshLibrary,
  type Checklist,
  type Library,
  type Task,
} from '@/lib/library-client';
import { LINK, linkedDevice } from '@/lib/library-journal';

type Draft = Checklist & { conflict?: boolean };
const blank = (): Draft => ({
  id: crypto.randomUUID(),
  title: '',
  items: [{ text: '', done: false }],
  revision: 0,
});

export function PrivateLibrary() {
  const favorites = useFavorites();
  const [library, setLibrary] = useState<Library | null>(null);
  const [busy, setBusy] = useState(true);
  const [status, setStatus] = useState('');
  const [statusTone, setStatusTone] = useState<'info' | 'ok' | 'warn'>('info');
  const pair = useRef<HTMLInputElement>(null);
  const [share, setShare] = useState('');
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    let mounted = true;
    const receive = (e: Event) => {
      const state = (e as CustomEvent<Library>).detail;
      if (mounted) setLibrary(state);
    };
    const error = (e: Event) => {
      setStatusTone('warn');
      setStatus((e as CustomEvent<string>).detail);
    };
    const fragment = new URLSearchParams(location.hash.slice(1));
    if (fragment.has('pair')) {
      if (pair.current) pair.current.value = fragment.get('pair') || '';
      history.replaceState(history.state, '', location.pathname + location.search);
    }
    addEventListener('wash-library-state', receive);
    addEventListener('wash-library-error', error);
    libraryApi<Library>('state')
      .then(async (state) => {
        if (linkedDevice() === state.scope) state = await refreshLibrary();
        if (mounted) setLibrary(state);
      })
      .catch((e) => {
        if (mounted && (!(e instanceof LibraryError) || e.status !== 401)) {
          setStatusTone('warn');
          setStatus('资料库暂时无法连接。本机收藏仍可使用。');
        }
      })
      .finally(() => {
        if (mounted) setBusy(false);
      });
    return () => {
      mounted = false;
      removeEventListener('wash-library-state', receive);
      removeEventListener('wash-library-error', error);
    };
  }, []);

  async function run(fn: () => Promise<void>) {
    if (busy) return;
    setBusy(true);
    setStatus('');
    setStatusTone('info');
    try {
      await fn();
    } catch (e) {
      setStatusTone('warn');
      setStatus(e instanceof Error ? e.message : '请求失败，请稍后再试。');
    } finally {
      setBusy(false);
    }
  }

  async function save(remove = false) {
    if (!library || !draft) return;
    const items = draft.items.filter((i) => i.text.trim());
    try {
      await libraryApi('checklist', {
        scope: library.scope,
        id: draft.id,
        title: draft.title,
        items,
        revision: draft.revision,
        remove,
      });
      setDraft(null);
      setLibrary(await refreshLibrary());
      setStatusTone('ok');
      setStatus(remove ? '清单已删除。' : '清单已保存。');
    } catch (e) {
      if (e instanceof LibraryError && e.status === 409) {
        setDraft({ ...draft, conflict: true });
        setLibrary(await refreshLibrary());
      }
      throw e;
    }
  }

  function updateItem(index: number, patch: Partial<Task>) {
    setDraft(
      (old) => old && { ...old, items: old.items.map((t, i) => (i === index ? { ...t, ...patch } : t)) },
    );
  }

  const localOnly = !library || linkedDevice() !== library.scope;
  const remoteDraft = library?.lists.find((l) => l.id === draft?.id);
  const statusText = busy ? '正在连接…' : status;

  return (
    <div className="lib-stack">
      <div className="lib-fav-bar">
        <div className="lib-fav-meta">
          <span className="lib-fav-badge" aria-hidden="true">
            <StarIcon filled />
          </span>
          <div>
            <div className="lib-fav-count">{favorites.length}</div>
            <div className="lib-fav-sub">本机已收藏常用产品</div>
          </div>
        </div>
        <Link className="btn-secondary lib-fav-link" href="/?category=fav">
          查看本机的 {favorites.length} 个常用产品
        </Link>
      </div>

      <p
        className={statusText ? `tool-notice ${busy ? 'info' : statusTone}` : 'sr'}
        role="status"
      >
        {!busy && statusTone === 'ok' && statusText ? <CheckIcon /> : null}
        {!busy && statusTone === 'warn' && statusText ? <WarnIcon /> : null}
        <span>{statusText}</span>
      </p>

      {!library ? (
        <section className="lib-card">
          <div className="lib-card-head">
            <div className="lib-head-top">
              <h2>跨设备同步</h2>
              <span className="phtag none">未启用</span>
            </div>
            <p>启用后，会把本机收藏合并到私人资料库。另一台设备可以用配对码连接，查看相同的收藏和施工清单。</p>
          </div>

          <div className="lib-start-row">
            <button
              type="button"
              className="btn-primary"
              disabled={busy}
              onClick={() =>
                run(async () => {
                  setLibrary(await connectLibrary());
                  setStatusTone('ok');
                  setStatus('本机收藏已合并。');
                })
              }
            >
              <SyncIcon />
              为本机启用同步
            </button>
          </div>

          <div className="lib-divider"><span>或连接已有资料库</span></div>

          <form
            className="lib-pair-form"
            onSubmit={(e) => {
              e.preventDefault();
              void run(async () => {
                setLibrary(await connectLibrary(pair.current!.value.trim()));
                setStatusTone('ok');
                setStatus('已连接，本机收藏已合并。');
              });
            }}
          >
            <label className="lib-field">
              <span>另一台设备的配对码</span>
              <div className="lib-inline">
                <input
                  ref={pair}
                  required
                  maxLength={110}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="粘贴一次性配对码"
                />
                <button type="submit" className="btn-secondary" disabled={busy}>
                  连接已有资料库
                </button>
              </div>
            </label>
          </form>
        </section>
      ) : localOnly ? (
        <section className="lib-card">
          <div className="lib-card-head">
            <div className="lib-head-top">
              <h2>恢复同步</h2>
              <span className="phtag acid">待恢复</span>
            </div>
            <p>浏览器已有资料库连接。恢复同步会合并本机收藏。</p>
          </div>
          <div className="lib-actions">
            <button
              type="button"
              className="btn-primary"
              disabled={busy}
              onClick={() =>
                run(async () => {
                  setLibrary(await attachLibrary(library));
                  setStatusTone('ok');
                  setStatus('已恢复同步。');
                })
              }
            >
              <SyncIcon />
              恢复同步
            </button>
          </div>
        </section>
      ) : (
        <>
          <section className="lib-card">
            <div className="lib-card-head">
              <div className="lib-head-top">
                <h2>已连接的资料库</h2>
                <span className="phtag neu">已连接</span>
              </div>
              <p>常用收藏会在联网和切换页面时自动同步，也可随时手动刷新或配对新设备。</p>
            </div>

            <div className="lib-actions">
              <button
                type="button"
                className="btn-secondary"
                disabled={busy}
                onClick={() =>
                  run(async () => {
                    setLibrary(await refreshLibrary());
                    setStatusTone('ok');
                    setStatus('已同步。');
                  })
                }
              >
                <SyncIcon />
                立即同步
              </button>
              <button
                type="button"
                className="btn-primary"
                disabled={busy}
                onClick={() =>
                  run(async () => {
                    const value = await libraryApi<{ pair: string }>('pair', { scope: library.scope });
                    setShare(value.pair);
                  })
                }
              >
                <LinkDeviceIcon />
                配对另一台设备
              </button>
            </div>

            {share && (
              <div className="lib-pair-box">
                <label className="lib-field">
                  <span>一次性配对码（10 分钟有效）</span>
                  <div className="lib-inline">
                    <input
                      className="lib-mono"
                      value={share}
                      readOnly
                      onFocus={(e) => e.target.select()}
                    />
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() =>
                        run(async () => {
                          await navigator.clipboard.writeText(location.origin + '/library#pair=' + share);
                          setStatusTone('ok');
                          setStatus('配对链接已复制，请只发给自己的设备。');
                        })
                      }
                    >
                      <CopyIcon />
                      复制配对链接
                    </button>
                  </div>
                </label>
              </div>
            )}

            <details className="lib-disclosure">
              <summary>断开本机</summary>
              <div className="lib-disclosure-body">
                <p>本机保留收藏。如果还要从其他设备查看资料，请先完成配对。</p>
                <button
                  type="button"
                  className="btn-danger"
                  disabled={busy}
                  onClick={() =>
                    run(async () => {
                      await refreshLibrary();
                      await libraryApi('leave', { scope: library.scope });
                      localStorage.removeItem(LINK);
                      setShare('');
                      setDraft(null);
                      setLibrary(null);
                      setStatusTone('info');
                      setStatus('已断开本机。');
                    })
                  }
                >
                  确认断开
                </button>
              </div>
            </details>
          </section>

          <section className="lib-card">
            <div className="lib-card-head">
              <div className="lib-head-top">
                <h2>
                  私人施工清单
                  <small className="lib-count">{library.lists.length}</small>
                </h2>
                {!draft && (
                  <button type="button" className="btn-primary lib-new-btn" disabled={busy} onClick={() => setDraft(blank())}>
                    <PlusIcon />
                    新建清单
                  </button>
                )}
              </div>
              <p>记录自己的预洗、轮毂或周期护理步骤，支持最多 30 份清单、每份 60 步。</p>
            </div>

            {!draft && (
              library.lists.length > 0 ? (
                <ul className="lib-list" role="list">
                  {library.lists.map((list) => {
                    const done = list.items.filter((i) => i.done).length;
                    const total = list.items.length;
                    const pct = total ? Math.round((done / total) * 100) : 0;
                    return (
                      <li key={list.id}>
                        <button
                          type="button"
                          className="lib-list-btn"
                          onClick={() => setDraft(structuredClone(list))}
                        >
                          <span className="lib-list-name">{list.title}</span>
                          <span className="lib-list-prog">
                            <span className="lib-list-ratio">（{done}/{total}）</span>
                            <span className="lib-meter" aria-hidden="true">
                              <i style={{ width: `${pct}%` }} />
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="lib-empty">
                  <p>还没有私人施工清单。点右上角「新建清单」，按自己的洗车顺序记录步骤和工具。</p>
                </div>
              )
            )}

            {draft && (
              <form
                className="lib-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  void run(() => save());
                }}
              >
                <fieldset className="library-editor" disabled={busy}>
                  <label className="lib-field">
                    <span>清单名称</span>
                    <input
                      value={draft.title}
                      required
                      maxLength={80}
                      placeholder="例如：周末标准 3pH 维护洗"
                      onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    />
                  </label>

                  <fieldset className="lib-steps-set">
                    <legend>施工步骤</legend>
                    <div className="lib-steps-list">
                      {draft.items.map((item, i) => (
                        <div className={`library-task${item.done ? ' done' : ''}`} key={i}>
                          <span className="lib-step-num" aria-hidden="true">{i + 1}</span>
                          <input
                            type="checkbox"
                            className="lib-check"
                            aria-label={'第 ' + (i + 1) + ' 步已完成'}
                            checked={item.done}
                            onChange={(e) => updateItem(i, { done: e.target.checked })}
                          />
                          <input
                            aria-label={'第 ' + (i + 1) + ' 步'}
                            value={item.text}
                            maxLength={180}
                            placeholder="输入这一步的产品、比例或操作"
                            onChange={(e) => updateItem(i, { text: e.target.value })}
                          />
                          <button
                            type="button"
                            className="lib-remove"
                            onClick={() => setDraft({ ...draft, items: draft.items.filter((_, j) => i !== j) })}
                          >
                            移除
                          </button>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  <button
                    type="button"
                    className="lib-add-step"
                    disabled={draft.items.length >= 60}
                    onClick={() => setDraft({ ...draft, items: [...draft.items, { text: '', done: false }] })}
                  >
                    <PlusIcon />
                    添加步骤
                  </button>

                  {draft.conflict && (
                    <aside className="lib-conflict">
                      <div className="lib-conflict-head">
                        <WarnIcon />
                        <p>云端版本已变化。当前草稿仍在，可检查差异后另存为新清单。</p>
                      </div>
                      {remoteDraft && (
                        <div className="lib-conflict-remote">
                          <strong>云端版本：{remoteDraft.title}</strong>
                          <ul>
                            {remoteDraft.items.map((t, i) => (
                              <li key={i}>
                                {t.done ? '☑' : '☐'} {t.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() =>
                          setDraft({ ...draft, id: crypto.randomUUID(), revision: 0, conflict: false })
                        }
                      >
                        将草稿另存为新清单
                      </button>
                    </aside>
                  )}

                  <div className="lib-editor-actions">
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={busy || draft.conflict || !draft.title.trim()}
                    >
                      保存清单
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => setDraft(null)}>
                      返回列表
                    </button>
                  </div>

                  {draft.revision > 0 && (
                    <details className="lib-disclosure">
                      <summary>删除清单</summary>
                      <div className="lib-disclosure-body">
                        <p>删除后无法从其他设备恢复此清单。</p>
                        <button
                          type="button"
                          className="btn-danger"
                          disabled={busy || draft.conflict}
                          onClick={() => run(() => save(true))}
                        >
                          确认删除此清单
                        </button>
                      </div>
                    </details>
                  )}
                </fieldset>
              </form>
            )}
          </section>
        </>
      )}
    </div>
  );
}
