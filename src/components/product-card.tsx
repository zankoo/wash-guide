import { BRAND_SHORT } from '@/data/taxonomy';
import type { ProductItem } from '@/lib/catalog';
import { FavMark } from './fav-mark';
import { ToxicIcon } from './icons';
import { ProductImage } from './product-image';
import { ProductLink } from './product-link';

/** eager：首屏的前几张卡片立即加载图片，避免拖慢最大内容绘制（LCP） */
export function ProductCard({ p, eager }: { p: ProductItem; eager?: boolean }) {
  // 每张卡片固定显示同样几项：品牌、名称、类型、pH、常用比例；产品特有的说明只在详情页的备注里
  const pills = p.pills;
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
        <span className={`phtag ${p.ph.category} card-ph`}>
          {p.ph.label}
          {p.ph.basis && ` · ${p.ph.basis}`}
        </span>
        <div className="pills">
          {pills === 'accessory' ? (
            <span className="pill ghost">配件，无需稀释</span>
          ) : pills === 'see-label' ? (
            <span className="pill ghost">比例见包装说明</span>
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
