import { BRAND_SHORT, TOXIC, imageSrc, keyRatios, phText, type Product } from '@/data';
import { FavMark } from './fav-mark';
import { ToxicIcon } from './icons';
import { ProductImage } from './product-image';
import { ProductLink } from './product-link';

/** eager：首屏的前几张卡片立即加载图片，避免拖慢最大内容绘制（LCP） */
export function ProductCard({ p, eager }: { p: Product; eager?: boolean }) {
  const pills = keyRatios(p);
  const ph = phText(p);
  return (
    <ProductLink className="card" id={p.id} aria-label={`${p.n}，${p.t}${TOXIC[p.id] ? '，极危险化学品' : ''}`}>
      <div className="stage">
        <ProductImage src={imageSrc(p)} name={p.n} brand={p.b} sizes="(max-width: 600px) 88px, 256px" eager={eager} />
        <FavMark id={p.id} />
        {TOXIC[p.id] && (
          <span className="toxic-mark" title={`极危险化学品：含${TOXIC[p.id]}`}>
            <ToxicIcon />
            <span className="sr">极危险化学品：含{TOXIC[p.id]}</span>
          </span>
        )}
      </div>
      <div className="bd">
        <span className={`br ${p.b}`}>{BRAND_SHORT[p.b]}</span>
        <span className="nm">{p.n}</span>
        <span className="ty">{p.t}</span>
        {ph && <span className={`phtag ${p.ph![0]} card-ph`}>{ph}</span>}
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
