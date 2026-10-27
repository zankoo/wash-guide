export type BrandId = 'L' | 'M' | 'F' | 'K' | 'C' | 'G' | 'B' | 'E';
export type CategoryId =
  | 'pre' | 'wash' | 'wheel' | 'deco' | 'polish' | 'coat'
  | 'seal' | 'trim' | 'glass' | 'apc' | 'int' | 'acc';
export type SceneId =
  | 'daily' | 'coated' | 'tfr' | 'ppf' | 'nowater' | 'self' | 'wheel' | 'engine' | 'int';
export type PH = 'alk' | 'neu' | 'acid';

/** [适用场景/材质, 比例, 施工工具] */
export type DilutionRow = [scene: string, ratio: string, tool: string];

export interface Product {
  id: string;
  /** 品牌 */
  b: BrandId;
  /** 分类 */
  c: CategoryId;
  /** 名称 */
  n: string;
  /** 类型 / 一句话说明 */
  t: string;
  /** 规格 */
  f: string;
  /** 适用材质 */
  m: string;
  /** 稀释表 */
  d: DilutionRow[];
  /** 施工步骤 */
  s: string[];
  /** 注意事项 */
  x: string[];
  /** 官网原文 */
  u: string;
}

/** 步骤的可切换变体 */
export interface StepVariant {
  n: string;
  p?: string[];
  r?: string;
  pH?: PH;
  how?: string;
  src?: string;
}

export interface FlowStep {
  /** 阶段名 */
  ph: string;
  /** 产品 id（可点击） */
  p?: string[];
  /** p 中任选其一 */
  alt?: boolean;
  /** 本站未收录的工具/产品 */
  o?: string[];
  r?: string;
  pH?: PH;
  how?: string;
  src?: string;
  vars?: StepVariant[];
}

export interface Flow {
  id: string;
  b: BrandId;
  name: string;
  en?: string;
  /** 唯一主场景（用于筛选） */
  sc: SceneId;
  /** 次要场景（仅显示） */
  tags: string[];
  sum: string;
  steps: FlowStep[];
  branch?: { n: string; steps: FlowStep[] };
  x: string[];
  u: string;
}

/** 在官方流程（base）上替换或追加步骤的产品组合 */
export interface Combo extends Flow {
  base: string;
  /** 套用位置说明 */
  at: string;
}
