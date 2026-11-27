import { Suspense, type ReactNode } from 'react';
import { BRAND, CAT_NAME, SDS_SOURCES, SUB_OF, cautionTexts, flowsUsing, imageSrc, phEvidenceNotes, PH_BASIS_LABEL, PH_SOURCE_LABEL, phDisplay, type Product } from '@/data';
import { DilutionTable } from './dilution-table';
import { FavButton } from './fav-button';
import { Notes } from './notes';
import { FlowLink } from './flow-link';
import { ExternalIcon, ToxicIcon } from './icons';
import { ProductImage } from './product-image';

/** 产品详情：弹出面板和独立页面共用 */
export function ProductDetail({ p }: { p: Product }) {
  const used = flowsUsing(p.id);
  return (
    <>
      <div className="sh-head">
        <div className={`sh-stage ${p.brand}`}>
          <ProductImage
            src={imageSrc(p)}
            name={p.name}
            brand={p.brand}
            alt={`${p.name} 产品图`}
            sizes="(max-width: 760px) 120px, 220px"
            eager
          />
        </div>
        <div className="sh-id">
          <div className="sh-tag">
            <span className={`br ${p.brand}`}>{BRAND[p.brand]}</span>
            <span>
              {CAT_NAME[p.category]} / {SUB_OF.get(p.id)?.name}
            </span>
          </div>
          <h2 className="sh-name" id={`d-name-${p.id}`}>
            {p.name}
          </h2>
          <p className="sh-type">{p.type}</p>
          <PhLine p={p} />
          <FavButton id={p.id} />
        </div>
      </div>
      <div className="sh-body">
        <ToxicLine p={p} />
        {p.dilutions.length ? (
          <DilutionTable rows={p.dilutions} />
        ) : (
          <>
            <h3>稀释比例</h3>
            <p className="none-msg">{p.category === 'acc' ? '配件类产品，无稀释比例。' : '官方未给出稀释比例，请按包装说明使用。'}</p>
          </>
        )}
        <dl className="facts">
          <div className="fact">
            <dt>规格</dt>
            <dd>{p.sizes}</dd>
          </div>
          <div className="fact">
            <dt>适用材质</dt>
            <dd>{p.materials}</dd>
          </div>
          <PhSourceFact p={p} />
        </dl>
        {p.steps.length > 0 && (
          <>
            <h3>施工步骤</h3>
            <ol className="steps">
              {p.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </>
        )}
        <Cautions p={p} />
        {used.length > 0 && (
          <>
            <h3>出现在这些流程</h3>
            <div className="rel">
              {used.map((f) => (
                <FlowLink key={f.id} flow={{ id: f.id, brand: f.brand, scene: f.scene }}>
                  <b>{f.name}</b>
                  <small>
                    {f.kind === 'off' ? '官方循环' : '产品组合'}，{BRAND[f.brand]}
                  </small>
                </FlowLink>
              ))}
            </div>
          </>
        )}
        <Remarks p={p} />
        <div className="src-row">
          <a className="src" href={p.url} target="_blank" rel="noopener">
            查看官网原文
            <ExternalIcon />
          </a>
          <SdsLink p={p} />
        </div>
      </div>
    </>
  );
}

/** 注意事项：只放固定措辞的通用提醒，所有产品同一种情况写法相同 */
function Cautions({ p }: { p: Product }) {
  const items = cautionTexts(p.cautions);
  if (items.length === 0) return null;
  return (
    <>
      <h3>注意事项</h3>
      <Notes items={items} />
    </>
  );
}

/** pH 依据：来源和口径用统一说法，具体原文放到底部备注 */
function PhSourceFact({ p }: { p: Product }) {
  const ph = p.ph;
  if (!ph || p.category === 'acc') return null;
  const recorded = ph.source.kind !== 'unrecorded';
  return (
    <div className="fact wide ph-source">
      <dt>pH 依据</dt>
      <dd>
        {recorded ? `${PH_SOURCE_LABEL[ph.source.kind]} · ${PH_BASIS_LABEL[ph.basis]}数据` : PH_SOURCE_LABEL.unrecorded}
        {ph.conflict && ' · 官方资料之间不一致，见备注'}
        {ph.source.url && (
          <>
            {' '}
            <a href={ph.source.url} target="_blank" rel="noopener">
              查看原文
            </a>
          </>
        )}
      </dd>
    </div>
  );
}

/** 备注：这个产品特有的说明和 pH 资料原文，放在页面最下面 */
function Remarks({ p }: { p: Product }) {
  const claim = p.ph?.claim ? [`${p.ph.claim}（这是配方宣传或使用液的说法；pH 标签是原液数据）。`] : [];
  const items = [...p.notes, ...claim, ...phEvidenceNotes(p.ph)];
  if (items.length === 0) return null;
  return (
    <section className="remarks" aria-label="备注">
      <h3>备注</h3>
      <ul>
        {items.map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </ul>
    </section>
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

/** 详情内容的 Suspense：内容到达前显示同样布局的骨架屏 */
export function DetailSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<DetailSkeleton />}>{children}</Suspense>;
}

/** 安全技术说明书（SDS）：新窗口打开 PDF，下方注明来源、语言和版本 */
function SdsLink({ p }: { p: Product }) {
  const sds = p.sds;
  if (!sds) return null;
  const { url, source, version, language } = sds;
  const { name } = SDS_SOURCES[source];
  return (
    <a className="src sds" href={url} target="_blank" rel="noopener">
      <span>
        安全技术说明书（SDS）
        <small>
          {name} · {language}
          {version && ` · ${version}`}
        </small>
      </span>
      <ExternalIcon />
    </a>
  );
}

/** 含氢氟酸 / 氟化氢铵这类极危险化学品时的醒目提醒 */
function ToxicLine({ p }: { p: Product }) {
  const what = p.hazard?.ingredient;
  if (!what) return null;
  return (
    <div className="toxic" role="note">
      <ToxicIcon size={40} />
      <p>
        <b>极危险化学品：含{what}</b>
        氟化物能穿透皮肤损伤深层组织，低浓度时疼痛可能几小时后才出现。必须戴耐酸手套和护目镜；皮肤沾到立即大量冲水并就医。
        <small>官方 SDS 给产品整体标的是腐蚀标志，骷髅标志是本站对含氟成分的额外提醒。</small>
      </p>
    </div>
  );
}

/** 产品自身 pH：和卡片同一套写法；有数值时显示彩色标签，口径说明在窄屏时整体换行 */
function PhLine({ p }: { p: Product }) {
  const { category, label, basis } = phDisplay(p);
  return (
    <p className="sh-ph">
      <span className={`phtag ${category}`}>
        <span>
          {label}
          {basis && (
            <>
              {' '}
              <span className="ph-basis">· {basis}</span>
            </>
          )}
        </span>
      </span>
    </p>
  );
}
