'use client';

import { useState, useSyncExternalStore } from 'react';
import type { DilutionRow } from '@/data/types';
import { VOLUMES, convert, formatMl, isVolume, parseWater, type Volume } from '@/lib/dilution';

// 换算水量记在 localStorage，所有产品共用（沿用旧版的 key）
const KEY = 'mafra-water';
const listeners = new Set<() => void>();

function readVolume(): Volume {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw === 'auto' ? 'auto' : Number(raw);
    return isVolume(v) ? v : 'auto';
  } catch {
    return 'auto';
  }
}

function writeVolume(v: Volume) {
  try {
    localStorage.setItem(KEY, String(v));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function splitRatio(ratio: string): [string, string] {
  const i = ratio.indexOf('（');
  const single = i > 0 && i === ratio.lastIndexOf('（') && ratio.indexOf('）') === ratio.length - 1;
  return single ? [ratio.slice(0, i).trim(), ratio.slice(i + 1, -1)] : [ratio, ''];
}

export function DilutionTable({ rows }: { rows: DilutionRow[] }) {
  const vol = useSyncExternalStore(subscribe, readVolume, () => 'auto' as const);
  const canConvert = rows.some(([, r, tool]) => convert(r, tool, vol));

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const isCustom = vol !== 'auto' && !VOLUMES.some(([v]) => v === vol);
  const parsed = parseWater(draft);

  function commit() {
    if (parsed) {
      writeVolume(parsed);
      setEditing(false);
    }
  }

  return (
    <>
      <div className="dil-h">
        <h3>稀释比例</h3>
        {canConvert && (
          <>
            <span className="vol" role="group" aria-label="按水量换算">
              {VOLUMES.map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={!editing && vol === v}
                  onClick={() => {
                    setEditing(false);
                    writeVolume(v);
                  }}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                aria-pressed={editing || isCustom}
                onClick={() => {
                  setDraft(isCustom ? String(vol) : '');
                  setEditing(true);
                }}
              >
                {isCustom && !editing ? formatMl(vol) : '自定义'}
              </button>
            </span>
            {editing ? (
              <form
                className="vcustom"
                onSubmit={(e) => {
                  e.preventDefault();
                  commit();
                }}
              >
                <label>
                  我的水量
                  <input
                    autoFocus
                    inputMode="decimal"
                    enterKeyHint="done"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="如 750、1.5L"
                    aria-invalid={draft !== '' && !parsed}
                  />
                </label>
                <button type="submit" disabled={!parsed}>
                  换算
                </button>
                <button type="button" className="ghost" onClick={() => setEditing(false)}>
                  取消
                </button>
                {draft !== '' && !parsed && <span className="verr">请输入 10 ml 到 100 L 之间的水量</span>}
              </form>
            ) : (
              <span className="vnote">
                {vol === 'auto'
                  ? '常用水量：PA壶 300 ml，喷雾壶 2 L，桶洗 10 L，其他 1 L'
                  : `按每 ${formatMl(vol)} 水换算原液用量`}
              </span>
            )}
          </>
        )}
      </div>
      <div className="dil">
        {rows.map(([scene, ratio, tool], i) => {
          const c = convert(ratio, tool, vol);
          // 「1:50（20 ml/L）」：比例本身大字显示，括号里的官方原文写法放到下面
          const [main, note] = splitRatio(ratio);
          return (
            <div className="dl" key={i}>
              <div>
                <div className="sc">{scene}</div>
                {tool && tool !== '—' && <span className="tl">{tool}</span>}
              </div>
              <div className="rt">
                <div className={main.length > 12 ? 'rv long' : 'rv'}>{main}</div>
                {note && <span className="rn">{note}</span>}
                {c && (
                  <span className="cc">
                    {/* 范围比例有两个换算结果，各占一行，不在中间断开 */}
                    {c.split('　～　').map((part) => (
                      <span key={part}>{part}</span>
                    ))}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
