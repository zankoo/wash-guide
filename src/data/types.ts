import type { SdsSourceId } from './sds-sources';
export type { SdsSourceId } from './sds-sources';

export type BrandId = 'L' | 'M' | 'F' | 'K' | 'C' | 'G' | 'B' | 'N' | 'P';
export type CategoryId =
  | 'pre' | 'wash' | 'wheel' | 'deco' | 'polish' | 'coat'
  | 'seal' | 'trim' | 'glass' | 'apc' | 'int' | 'towel' | 'acc';
export type SceneId =
  | 'daily' | 'coated' | 'tfr' | 'ppf' | 'nowater' | 'self' | 'wheel' | 'engine' | 'int';
export type PH = 'alk' | 'neu' | 'acid';

/** [适用场景/材质, 比例, 施工工具] */
export type DilutionRow = [scene: string, ratio: string, tool: string];

export interface Product {
  id: string;
  sds?: SafetyDataSheet;
  hazard?: ProductHazard;
  /** 未设置时使用约定图片路径，null 表示暂无图片。 */
  image?: string | null;
  /** 品牌 */
  brand: BrandId;
  /** 分类 */
  category: CategoryId;
  /** 名称 */
  name: string;
  /** 类型 / 一句话说明 */
  type: string;
  /** 规格 */
  sizes: string;
  /** 适用材质 */
  materials: string;
  /** 稀释表 */
  dilutions: DilutionRow[];
  /** 施工步骤 */
  steps: string[];
  /** 注意事项 */
  notes: string[];
  /** 官网原文 */
  url: string;
  /**
   * 产品自身的 pH（原液），包含展示值、来源、证据及冲突标记。
   * 只收官方来源（产品信息 / 技术资料表 / SDS 第 9 节 / 官网页面 / 韩国申报）；
   * 'na' = 官方注明不适用（非水性产品，或韩国申报写「해당없음」）；没有这一项 = 官方未公布。
   */
  ph?: ProductPh;
}

/** 步骤的可切换变体 */
export interface StepVariant {
  name: string;
  products?: string[];
  ratio?: string;
  pH?: PH;
  how?: string;
  src?: string;
}

export interface FlowStep {
  /** 阶段名 */
  phase: string;
  /** 产品 id（可点击） */
  products?: string[];
  /** products 中任选其一 */
  alt?: boolean;
  /** 本站未收录的工具/产品 */
  extras?: string[];
  ratio?: string;
  pH?: PH;
  how?: string;
  src?: string;
  variants?: StepVariant[];
}

export interface Flow {
  id: string;
  brand: BrandId;
  name: string;
  en?: string;
  /** 唯一主场景（用于筛选） */
  scene: SceneId;
  /** 次要场景（仅显示） */
  tags: string[];
  summary: string;
  steps: FlowStep[];
  branch?: { name: string; steps: FlowStep[] };
  notes: string[];
  url: string;
}

/** 在官方流程（base）上替换或追加步骤的产品组合 */
export interface Combo extends Flow {
  base: string;
  /** 套用位置说明 */
  at: string;
}

/** 每份安全技术说明书的来源与版本；不由来源机构推断语言或托管位置。 */
export interface SafetyDataSheet {
  url: string;
  source: SdsSourceId;
  language: string;
  version?: string;
  hosting: 'remote' | 'local';
  originalUrl?: string;
  sha256?: string;
  checkedAt?: string;
  /** 旧记录缺少原地址时明确说明，不猜测地址。 */
  provenanceNote?: string;
}

export interface ProductHazard {
  ingredient: string;
  sdsSection: 3;
  /** 本站额外提醒，不代表产品整体的官方 GHS 分类。 */
  siteWarning: true;
}

export type PhSourceKind = 'product-page' | 'technical-sheet' | 'sds' | 'korean-registration' | 'unrecorded';
export type PhEvidence =
  | { kind: 'statement'; source: PhSourceKind; text: string; url?: string; registration?: string }
  | { kind: 'resolution'; rule: 'sds-overrides-na' }
  | { kind: 'resolution'; rule: 'sds-overrides-category'; previousCategory: PH };

/** 展示值与证据分开；迁移时无明确依据的来源保留为 unrecorded，不能从 SDS 的存在推断。 */
export interface ProductPh {
  category: PH | 'na';
  value?: string;
  basis: 'raw';
  source: { kind: PhSourceKind; url?: string; section?: 9 };
  evidence: PhEvidence[];
  conflict: boolean;
  claim?: string;
}
