import { BRAND_SHORT } from '@/data/taxonomy';
import type { ProductItem } from '@/lib/catalog';
import { FavMark } from './fav-mark';
import { ToxicIcon } from './icons';
import { ProductImage } from './product-image';
import { ProductLink } from './product-link';

/** eager：首屏的前几张卡片立即加载图片，避免拖慢最大内容绘制（LCP） */
export function ProductCard({ p, eager }: { p: ProductItem; eager?: boolean }) {
  const pills = p.pills;
  const ph = p.ph?.text;
  const claim = p.ph?.claim;
  return (
    <ProductLink className="card" id={p.id} aria-label={`${p.name}，${p.type}${p.hazard ? '，极危险化学品' : ''}`}>
      <div className="stage">
        <ProductImage src={p.image} name={p.name} brand={p.brand} sizes="(max-width: 600px) 88px, 256px" eager={eager} />
        <FavMark id={p.id} />
        {p.hazard && (
          <span className="toxic-mark" title={`极危险化学品：含${p.hazard}`}>
            <ToxicIcon />
            <span className="sr">极危险化学品：含{p.hazard}</span>
          </span>
        )}
      </div>
      <div className="bd">
        <span className={`br ${p.brand}`}>{BRAND_SHORT[p.brand]}</span>
        <span className="nm">{p.name}</span>
        <span className="ty">{p.type}</span>
        {ph && <span className={`phtag ${p.ph!.category} card-ph`}>{ph}</span>}
        {claim && <span className="ph-claim" title="配方宣传或使用液描述；pH 标签展示原液数据，详见产品说明">ⓘ {claim}</span>}
        <div className="pills">
          {pills === 'accessory' ? (
            <span className="pill ghost">配件</span>
          ) : pills === 'see-label' ? (
            <span className="pill ghost">见包装说明</span>
          ) : (
            pills.map((r) => (
              <span className="pill" key={r}>
                {r}
              </span>
            ))
          )}
        </div>
      </div>
    </ProductLink>
  );
}
