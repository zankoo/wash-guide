import { PRODUCTS, FLOWS, PRODUCT_RANK, SUB_OF, imageSrc, keyRatios, phText, materialsOf, productSearchText, productRankFields, flowSearchText, flowInitials } from './index';
import type { ProductItem, FlowItem } from '../lib/catalog';

/** 仅由服务端布局引用。客户端只接收投影，不导入完整产品数据库。 */
export const productItems: ProductItem[] = PRODUCTS.toSorted((a, b) => PRODUCT_RANK.get(a.id)! - PRODUCT_RANK.get(b.id)!).map((p) => ({
  id: p.id, brand: p.brand, category: p.category, sub: SUB_OF.get(p.id)!.id,
  name: p.name, type: p.type, image: imageSrc(p), materials: materialsOf(p),
  text: productSearchText(p), rank: productRankFields(p), pills: keyRatios(p),
  ph: p.ph ? { category: p.ph.category, text: phText(p) ?? '', claim: p.ph.claim } : undefined,
  hazard: p.hazard?.ingredient,
}));
export const flowItems: FlowItem[] = FLOWS.map((f) => ({
  id: f.id, brand: f.brand, scene: f.scene, kind: f.kind, name: f.name,
  text: flowSearchText(f), abbr: flowInitials(f),
}));
