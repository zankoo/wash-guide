'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
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
  const pair = useRef<HTMLInputElement>(null);
  const [share, setShare] = useState('');
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    let mounted = true;
    const receive = (e: Event) => {
      const state = (e as CustomEvent<Library>).detail;
      if (mounted) setLibrary(state);
    };
    const error = (e: Event) => setStatus((e as CustomEvent<string>).detail);
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
        if (mounted && (!(e instanceof LibraryError) || e.status !== 401))
          setStatus('资料库暂时无法连接。本机收藏仍可使用。');
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
    try {
      await fn();
    } catch (e) {
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
  return (
    <>
      <p>
        <Link href="/?category=fav">查看本机的 {favorites.length} 个常用产品</Link>
      </p>
      {!library ? (
        <section>
          <h2>跨设备同步</h2>
          <p>启用后，会把本机收藏合并到私人资料库。另一台设备可以用配对码连接，查看相同的收藏和施工清单。</p>
          <button
            disabled={busy}
            onClick={() =>
              run(async () => {
                setLibrary(await connectLibrary());
                setStatus('本机收藏已合并。');
              })
            }
          >
            为本机启用同步
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void run(async () => {
                setLibrary(await connectLibrary(pair.current!.value.trim()));
                setStatus('已连接，本机收藏已合并。');
              });
            }}
          >
            <label>
              另一台设备的配对码
              <input ref={pair} required maxLength={110} autoComplete="off" spellCheck={false} />
            </label>
            <button disabled={busy}>连接已有资料库</button>
          </form>
        </section>
      ) : localOnly ? (
        <section>
          <p>浏览器已有资料库连接。恢复同步会合并本机收藏。</p>
          <button
            disabled={busy}
            onClick={() =>
              run(async () => {
                setLibrary(await attachLibrary(library));
              })
            }
          >
            恢复同步
          </button>
        </section>
      ) : (
        <>
          <section>
            <h2>已连接的资料库</h2>
            <button
              disabled={busy}
              onClick={() =>
                run(async () => {
                  setLibrary(await refreshLibrary());
                  setStatus('已同步。');
                })
              }
            >
              立即同步
            </button>
            <button
              disabled={busy}
              onClick={() =>
                run(async () => {
                  const value = await libraryApi<{ pair: string }>('pair', { scope: library.scope });
                  setShare(value.pair);
                })
              }
            >
              配对另一台设备
            </button>
            {share && (
              <div>
                <label>
                  一次性配对码（10 分钟有效）
                  <input value={share} readOnly onFocus={(e) => e.target.select()} />
                </label>
                <button
                  onClick={() =>
                    run(async () => {
                      await navigator.clipboard.writeText(location.origin + '/library#pair=' + share);
                      setStatus('配对链接已复制，请只发给自己的设备。');
                    })
                  }
                >
                  复制配对链接
                </button>
              </div>
            )}
            <details>
              <summary>断开本机</summary>
              <p>本机保留收藏。如果还要从其他设备查看资料，请先完成配对。</p>
              <button
                disabled={busy}
                onClick={() =>
                  run(async () => {
                    await refreshLibrary();
                    await libraryApi('leave', { scope: library.scope });
                    localStorage.removeItem(LINK);
                    setShare('');
                    setDraft(null);
                    setLibrary(null);
                    setStatus('已断开本机。');
                  })
                }
              >
                确认断开
              </button>
            </details>
          </section>
          <section>
            <h2>私人施工清单</h2>
            {!draft && (
              <>
                <button disabled={busy} onClick={() => setDraft(blank())}>
                  新建清单
                </button>
                <ul>
                  {library.lists.map((list) => (
                    <li key={list.id}>
                      <button onClick={() => setDraft(structuredClone(list))}>
                        {list.title}（{list.items.filter((i) => i.done).length}/{list.items.length}）
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {draft && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void run(() => save());
                }}
              >
                <fieldset className="library-editor" disabled={busy}>
                  <label>
                    清单名称
                    <input
                      value={draft.title}
                      required
                      maxLength={80}
                      onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    />
                  </label>
                  <fieldset>
                    <legend>施工步骤</legend>
                    {draft.items.map((item, i) => (
                      <div className="library-task" key={i}>
                        <input
                          type="checkbox"
                          aria-label={'第 ' + (i + 1) + ' 步已完成'}
                          checked={item.done}
                          onChange={(e) => updateItem(i, { done: e.target.checked })}
                        />
                        <input
                          aria-label={'第 ' + (i + 1) + ' 步'}
                          value={item.text}
                          maxLength={180}
                          onChange={(e) => updateItem(i, { text: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setDraft({ ...draft, items: draft.items.filter((_, j) => i !== j) })}
                        >
                          移除
                        </button>
                      </div>
                    ))}
                  </fieldset>
                  <button
                    type="button"
                    disabled={draft.items.length >= 60}
                    onClick={() => setDraft({ ...draft, items: [...draft.items, { text: '', done: false }] })}
                  >
                    添加步骤
                  </button>
                  {draft.conflict && (
                    <aside>
                      <p>云端版本已变化。当前草稿仍在，可检查差异后另存为新清单。</p>
                      {remoteDraft && (
                        <>
                          <strong>{remoteDraft.title}</strong>
                          <ul>
                            {remoteDraft.items.map((t, i) => (
                              <li key={i}>
                                {t.done ? '☑' : '☐'} {t.text}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setDraft({ ...draft, id: crypto.randomUUID(), revision: 0, conflict: false })
                        }
                      >
                        将草稿另存为新清单
                      </button>
                    </aside>
                  )}
                  <button disabled={busy || draft.conflict || !draft.title.trim()}>保存清单</button>
                  <button type="button" onClick={() => setDraft(null)}>
                    返回列表
                  </button>
                  {draft.revision > 0 && (
                    <details>
                      <summary>删除清单</summary>
                      <button
                        type="button"
                        disabled={busy || draft.conflict}
                        onClick={() => run(() => save(true))}
                      >
                        确认删除此清单
                      </button>
                    </details>
                  )}
                </fieldset>
              </form>
            )}
          </section>
        </>
      )}
      <p role="status">{busy ? '正在连接…' : status}</p>
    </>
  );
}
