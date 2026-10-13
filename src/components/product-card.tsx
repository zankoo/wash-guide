import Link from 'next/link';
import { BRAND_SHORT, imageSrc, keyRatios, type Product } from '@/data';
import { ProductImage } from './product-image';

export function ProductCard({ p }: { p: Product }) {
  const pills = keyRatios(p);
  return (
    <Link className="card" href={`/p/${p.id}`} scroll={false} prefetch={false} aria-label={`${p.n}，${p.t}`}>
      <div className="stage">
        <ProductImage src={imageSrc(p)} name={p.n} brand={p.b} sizes="(max-width: 460px) 50vw, 256px" />
        <span className={`br ${p.b}`}>{BRAND_SHORT[p.b]}</span>
      </div>
      <div className="bd">
        <span className="nm">{p.n}</span>
        <span className="ty">{p.t}</span>
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
    </Link>
  );
}
