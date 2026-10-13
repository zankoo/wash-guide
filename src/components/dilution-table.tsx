'use client';

import { useSyncExternalStore } from 'react';
import type { DilutionRow } from '@/data/types';
import { VOLUMES, convert, formatMl, isVolume, type Volume } from '@/lib/dilution';

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

export function DilutionTable({ rows }: { rows: DilutionRow[] }) {
  const vol = useSyncExternalStore(subscribe, readVolume, () => 'auto' as const);
  const canConvert = rows.some(([, r, tool]) => convert(r, tool, vol));

  return (
    <>
      <h3>
        稀释比例<span className="en">Dilution</span>
        {canConvert && (
          <>
            <span className="vol" role="group" aria-label="按水量换算">
              {VOLUMES.map(([v, label]) => (
                <button key={v} type="button" aria-pressed={vol === v} onClick={() => writeVolume(v)}>
                  {label}
                </button>
              ))}
            </span>
            <span className="vnote">
              {vol === 'auto'
                ? '按水量换算原液：PA壶 300 ml 水 · 喷雾壶 2 L 水 · 桶洗 10 L 水 · 其他 1 L 水'
                : `按每 ${formatMl(vol)} 水换算原液用量`}
            </span>
          </>
        )}
      </h3>
      <div className="dil">
        {rows.map(([scene, ratio, tool], i) => {
          const c = convert(ratio, tool, vol);
          return (
            <div className="dl" key={i}>
              <div>
                <div className="sc">{scene}</div>
                {tool && tool !== '—' && <span className="tl">{tool}</span>}
              </div>
              <div className="rt">
                <div className={ratio.length > 12 ? 'rv long' : 'rv'}>{ratio}</div>
                {c && <span className="cc">{c}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
