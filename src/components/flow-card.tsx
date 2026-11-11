'use client';

import { Fragment } from 'react';
import { BRAND, PH_LABEL, SCENE_NAME } from '@/data/taxonomy';
import type { FlowStep, StepVariant } from '@/data/types';
import type { FlowView } from '@/lib/catalog';
import { useCatalogData } from './catalog-state';
import { Notes } from './notes';
import { FlowLink } from './flow-link';
import { ProductLink } from './product-link';
import { ProductThumb } from './product-image';
import { VariantTabs } from './variant-tabs';

function ProductChip({ id }: { id: string }) {
  const p = useCatalogData().chips.find((p) => p.id === id)!;
  return (
    <ProductLink className="pc" id={id}>
      <ProductThumb src={p.image} name={p.name} brand={p.brand} />
      <span>{p.name}</span>
    </ProductLink>
  );
}

function StepTop({ name, x }: { name: string; x: StepVariant | FlowStep }) {
  return (
    <div className="fs-top">
      <b>{name}</b>
      {x.pH && <span className={`phtag ${x.pH}`}>{PH_LABEL[x.pH]}</span>}
      {x.ratio && <span className="fs-r">{x.ratio}</span>}
    </div>
  );
}

function StepBody({ x }: { x: StepVariant | FlowStep }) {
  const ids = x.products ?? [];
  const others = 'extras' in x ? (x.extras ?? []) : [];
  const alt = 'alt' in x && x.alt;
  return (
    <>
      {(ids.length > 0 || others.length > 0) && (
        <div className="prods">
          {ids.map((id, i) => (
            <Fragment key={id}>
              {alt && i > 0 && <span className="or">或</span>}
              <ProductChip id={id} />
            </Fragment>
          ))}
          {others.map((o) => (
            <span className="oc" key={o}>
              {o}
            </span>
          ))}
        </div>
      )}
      {x.how && <p className="fs-how">{x.how}</p>}
      {x.src && <p className="fs-src">{x.src}</p>}
    </>
  );
}

function Step({ x }: { x: FlowStep }) {
  if (!x.variants) {
    return (
      <li>
        <StepTop name={x.phase} x={x} />
        <StepBody x={x} />
      </li>
    );
  }
  return (
    <li>
      <div className="fs-top">
        <b>{x.phase}</b>
        <span className="vhint">{x.variants.length} 种选择</span>
      </div>
      <VariantTabs
        variants={x.variants.map((v) => ({
          label: v.name,
          content: (
            <>
              <StepTop name={v.name} x={v} />
              <StepBody x={v} />
            </>
          ),
        }))}
      />
    </li>
  );
}

export function FlowCard({ f }: { f: FlowView }) {
  const { flows } = useCatalogData();
  const base = f.kind === 'combo' ? flows.find((b) => b.id === f.base) : undefined;
  return (
    <article className={`flow ${f.brand} ${f.kind}`} id={f.id}>
      <div className="fl-h">
        <div className="sh-tag">
          <span className={`br ${f.brand}`}>{BRAND[f.brand]}</span>
          <span>{f.en || '产品组合'}</span>
        </div>
        <h3>{f.name}</h3>
        {base && f.kind === 'combo' && (
          <FlowLink className="basechip" flow={{ id: base.id, brand: base.brand, scene: base.scene }}>
            套用官方：{base.name}
            <em>{f.at}</em>
          </FlowLink>
        )}
        <p>{f.summary}</p>
        <div className="scn">
          <span className="main">{SCENE_NAME[f.scene]}</span>
          {f.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <ol className="fsteps">
        {f.steps.map((x, i) => (
          <Step key={i} x={x} />
        ))}
      </ol>
      {f.branch && (
        <div className="branch">
          <div className="br-h">分支 · {f.branch.name}</div>
          <ol className="fsteps sub">
            {f.branch.steps.map((x, i) => (
              <Step key={i} x={x} />
            ))}
          </ol>
        </div>
      )}
      <div className="fl-x">
        {f.notes.length > 0 && <Notes items={f.notes} />}
        <a className="fl-src" href={f.url} target="_blank" rel="noopener">
          查看官方来源
        </a>
      </div>
    </article>
  );
}
