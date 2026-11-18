import { PRODUCT_RANK, subcategoryOf, imageSrc, keyRatios, phDisplay, productSearchText, productRankFields, flowSearchText, flowInitials, type FlowEntry } from './presentation';
import { materialsOf } from './materials';
import type { Product } from './types';
import type { ProductItem, FlowItem } from '../lib/catalog';

/** 仅由服务端布局引用。客户端只接收投影，不导入完整产品数据库。 */
export function projectProducts(products: Product[]): ProductItem[] {
  const rank = (p: Product) => PRODUCT_RANK.get(p.id) ?? Number.MAX_SAFE_INTEGER;
  return products.toSorted((a, b) => rank(a) - rank(b)).map((p) => ({
    id: p.id, brand: p.brand, category: p.category, sub: subcategoryOf(p).id,
    name: p.name, type: p.type, image: imageSrc(p), materials: materialsOf(p),
    text: productSearchText(p), rank: productRankFields(p), pills: keyRatios(p),
    ph: phDisplay(p),
    hazard: p.hazard?.ingredient,
  }));
}

export function projectFlows(flows: FlowEntry[], product: (id: string) => Pick<Product, 'name' | 'type'>): FlowItem[] {
  return flows.map((f) => ({
    id: f.id, brand: f.brand, scene: f.scene, kind: f.kind, name: f.name,
    text: flowSearchText(f, product), abbr: flowInitials(f, product),
  }));
}
