import { Suspense, type ReactNode } from 'react';
import { BRAND, CAT_NAME, SUB_OF, flowsUsing, imageSrc, type Product } from '@/data';
import { DilutionTable } from './dilution-table';
import { FavButton } from './fav-button';
import { Notes } from './flow-card';
import { FlowLink } from './flow-link';
import { ExternalIcon } from './icons';
import { ProductImage } from './product-image';
import { ProductMorph } from './product-morph';

/** 产品详情：弹出面板和独立页面共用 */
export function ProductDetail({ p }: { p: Product }) {
  const used = flowsUsing(p.id);
  return (
    <>
      <div className="sh-head">
        <div className={`sh-stage ${p.b}`}>
          <ProductMorph id={p.id}>
            <ProductImage
              src={imageSrc(p)}
              name={p.n}
              brand={p.b}
              alt={`${p.n} 产品图`}
              sizes="(max-width: 760px) 120px, 220px"
              eager
            />
          </ProductMorph>
        </div>
        <div className="sh-id">
          <div className="sh-tag">
            <span className={`br ${p.b}`}>{BRAND[p.b]}</span>
            <span>
              {CAT_NAME[p.c]} / {SUB_OF.get(p.id)?.n}
            </span>
          </div>
          <h2 className="sh-name" id="d-name">
            {p.n}
          </h2>
          <p className="sh-type">{p.t}</p>
          <FavButton id={p.id} />
        </div>
      </div>
      <div className="sh-body">
        {p.d.length ? (
          <DilutionTable rows={p.d} />
        ) : (
          <>
            <h3>稀释比例</h3>
            <p className="none-msg">配件类产品，无稀释比例。</p>
          </>
        )}
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
        {p.s.length > 0 && (
          <>
            <h3>施工步骤</h3>
            <ol className="steps">
              {p.s.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </>
        )}
        {p.x.length > 0 && (
          <>
            <h3>注意事项</h3>
            <Notes items={p.x} />
          </>
        )}
        {used.length > 0 && (
          <>
            <h3>出现在这些流程</h3>
            <div className="rel">
              {used.map((f) => (
                <FlowLink key={f.id} flow={{ id: f.id, b: f.b, sc: f.sc }}>
                  <b>{f.name}</b>
                  <small>
                    {f.kind === 'off' ? '官方循环' : '产品组合'}，{BRAND[f.b]}
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

/** 详情内容到达前的占位：和真实布局同样的位置，避免面板内容跳动 */
export function DetailSkeleton() {
  return (
    <div className="skel" aria-busy="true" aria-label="正在加载产品详情">
      <div className="sh-head">
        <div className="sh-stage" />
        <div className="sh-id">
          <i style={{ width: '40%' }} />
          <i className="big" style={{ width: '75%' }} />
          <i style={{ width: '55%' }} />
        </div>
      </div>
      <div className="sh-body">
        <i className="block" />
      </div>
    </div>
  );
}

/**
 * 详情内容的 Suspense。没有给骨架屏 → 内容加转场：转场会排在面板滑入动画之后执行，
 * 内容要多等约 700ms 才出现；查阅速度比这段动画重要。
 */
export function DetailSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<DetailSkeleton />}>{children}</Suspense>;
}
