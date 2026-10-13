import { Fragment } from 'react';
import {
  BRAND,
  FLOW_BY_ID,
  PH_LABEL,
  SCENE_NAME,
  getProduct,
  imageSrc,
  type FlowEntry,
  type FlowStep,
  type StepVariant,
} from '@/data';
import { FlowLink } from './flow-link';
import { ProductLink } from './product-link';
import { WarnIcon } from './icons';
import { ProductThumb } from './product-image';
import { VariantTabs } from './variant-tabs';

function ProductChip({ id }: { id: string }) {
  const p = getProduct(id);
  return (
    <ProductLink className="pc" id={id}>
      <ProductThumb src={imageSrc(p)} name={p.n} brand={p.b} />
      <span>{p.n}</span>
    </ProductLink>
  );
}

function StepTop({ name, x }: { name: string; x: StepVariant | FlowStep }) {
  return (
    <div className="fs-top">
      <b>{name}</b>
      {x.pH && <span className={`phtag ${x.pH}`}>{PH_LABEL[x.pH]}</span>}
      {x.r && <span className="fs-r">{x.r}</span>}
    </div>
  );
}

function StepBody({ x }: { x: StepVariant | FlowStep }) {
  const ids = x.p ?? [];
  const others = 'o' in x ? (x.o ?? []) : [];
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
  if (!x.vars) {
    return (
      <li>
        <StepTop name={x.ph} x={x} />
        <StepBody x={x} />
      </li>
    );
  }
  return (
    <li>
      <div className="fs-top">
        <b>{x.ph}</b>
        <span className="vhint">{x.vars.length} 种选择</span>
      </div>
      <VariantTabs
        variants={x.vars.map((v) => ({
          label: v.n,
          content: (
            <>
              <StepTop name={v.n} x={v} />
              <StepBody x={v} />
            </>
          ),
        }))}
      />
    </li>
  );
}

export function FlowCard({ f }: { f: FlowEntry }) {
  const base = f.kind === 'combo' ? FLOW_BY_ID.get(f.base) : undefined;
  return (
    <article className={`flow ${f.b} ${f.kind}`} id={f.id}>
      <div className="fl-h">
        <div className="sh-tag">
          <span className={`br ${f.b}`}>{BRAND[f.b]}</span>
          <span>{f.en || '产品组合'}</span>
        </div>
        <h3>{f.name}</h3>
        {base && f.kind === 'combo' && (
          <FlowLink className="basechip" flow={{ id: base.id, b: base.b, sc: base.sc }}>
            套用官方：{base.name}
            <em>{f.at}</em>
          </FlowLink>
        )}
        <p>{f.sum}</p>
        <div className="scn">
          <span className="main">{SCENE_NAME[f.sc]}</span>
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
          <div className="br-h">分支 · {f.branch.n}</div>
          <ol className="fsteps sub">
            {f.branch.steps.map((x, i) => (
              <Step key={i} x={x} />
            ))}
          </ol>
        </div>
      )}
      <div className="fl-x">
        {f.x.length > 0 && <Notes items={f.x} />}
        <a className="fl-src" href={f.u} target="_blank" rel="noopener">
          查看官方来源
        </a>
      </div>
    </article>
  );
}

export function Notes({ items }: { items: string[] }) {
  return (
    <div className="notes">
      {items.map((t, i) => (
        <p key={i}>
          <WarnIcon />
          <span>{t}</span>
        </p>
      ))}
    </div>
  );
}
