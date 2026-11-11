import type { MaterialId } from '@/data/materials';
import type { BrandId, CategoryId, SceneId, PH, Flow, Combo } from '@/data/types';
import type { RankFields } from './search';

/** 仅用于列表展示与本地检索；不包含完整施工步骤、SDS 或证据对象。 */
export interface ProductItem {
  id: string; brand: BrandId; category: CategoryId; sub: string;
  name: string; type: string; image?: string;
  materials: MaterialId[]; text: string; rank: RankFields;
  pills: string[] | 'accessory' | 'see-label';
  ph?: { category: PH | 'na'; text: string; claim?: string };
  hazard?: string;
}
export interface FlowItem {
  id: string; brand: BrandId; scene: SceneId; kind: 'off' | 'combo';
  name: string; text: string; abbr: string[];
}
export type FlowView = (Flow & { kind: 'off' }) | (Combo & { kind: 'combo' });

export type ProductChip = Pick<ProductItem, 'id' | 'name' | 'brand' | 'image'>;
