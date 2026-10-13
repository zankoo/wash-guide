import { BRAND, CAT_NAME, flowsUsing, imageSrc, type Product } from '@/data';
import { DilutionTable } from './dilution-table';
import { Notes } from './flow-card';
import { FlowLink } from './flow-link';
import { ExternalIcon } from './icons';
import { ProductImage } from './product-image';

/** 产品详情：弹出面板和独立页面共用 */
export function ProductDetail({ p }: { p: Product }) {
  const used = flowsUsing(p.id);
  return (
    <>
      <div className={`sh-stage ${p.b}`}>
        <ProductImage
          src={imageSrc(p)}
          name={p.n}
          brand={p.b}
          alt={`${p.n} 产品图`}
          sizes="(max-width: 760px) 100vw, 720px"
          eager
        />
      </div>
      <div className="sh-body">
        <div className="sh-tag">
          <b>{BRAND[p.b]}</b>　/　{CAT_NAME[p.c]}
        </div>
        <h2 className="sh-name" id="d-name">
          {p.n}
        </h2>
        <p className="sh-type">{p.t}</p>
        <dl className="facts">
          <div className="fact">
            <dt>规格</dt>
            <dd>{p.f}</dd>
          </div>
          <div className="fact">
            <dt>适用材质</dt>
            <dd>{p.m}</dd>
          </div>
        </dl>
        {p.d.length ? (
          <DilutionTable rows={p.d} />
        ) : (
          <>
            <h3>
              稀释比例<span className="en">Dilution</span>
            </h3>
            <p className="none-msg">配件类产品，无稀释比例。</p>
          </>
        )}
        {p.s.length > 0 && (
          <>
            <h3>
              施工步骤<span className="en">Application</span>
            </h3>
            <ol className="steps">
              {p.s.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </>
        )}
        {p.x.length > 0 && (
          <>
            <h3>
              注意事项<span className="en">Notes</span>
            </h3>
            <Notes items={p.x} />
          </>
        )}
        {used.length > 0 && (
          <>
            <h3>
              出现在这些流程<span className="en">Used in</span>
            </h3>
            <div className="rel">
              {used.map((f) => (
                <FlowLink key={f.id} flow={{ id: f.id, b: f.b, sc: f.sc }}>
                  <b>{f.name}</b>
                  <small>
                    {f.kind === 'off' ? '官方循环' : '产品组合'} · {BRAND[f.b]} →
                  </small>
                </FlowLink>
              ))}
            </div>
          </>
        )}
        <a className="src" href={p.u} target="_blank" rel="noopener">
          查看官网原文
          <ExternalIcon />
        </a>
      </div>
    </>
  );
}
