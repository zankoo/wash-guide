import type { BrandId, CategoryId, SceneId } from './types';

export const BRANDS: BrandId[] = ['L', 'M', 'F', 'K', 'C', 'G', 'B'];

export const BRAND: Record<BrandId, string> = {
  L: 'Labocosmetica',
  M: 'Maniac Line',
  F: 'MAFRA',
  K: 'Koch-Chemie',
  C: 'CarPro',
  G: 'GYEON',
  B: 'BolaSolution',
};

export const BRAND_SHORT: Record<BrandId, string> = { L: 'Labo', M: 'Maniac', F: 'MAFRA', K: 'Koch', C: 'CarPro', G: 'GYEON', B: 'Bola' };

/** 官方循环的来源说明（流程页的分组标题） */
export const FLOW_SOURCE: Record<BrandId, string> = {
  L: ' 3pH® 页面与产品页的官方完整流程',
  M: '官方宣传册的完整流程',
  F: '官方产品页给出的用法与搭配（MAFRA 没有成套流程，按产品页互相推荐的顺序整理）',
  K: '官方产品页与技术资料给出的施工顺序',
  C: '官方产品页与施工手册（How-to PDF）给出的施工顺序',
  G: '官方镀膜说明书（Coatings Manual）与产品页给出的施工顺序',
  B: '日本正规代理乐天店的官方流程图与产品页给出的施工顺序',
};

export const CATS: [CategoryId, string, string][] = [
  ['pre', '预洗 / TFR', 'Pre-wash · TFR'],
  ['wash', '洗车香波 / 免冲洗', 'Wash · Rinseless'],
  ['wheel', '轮毂轮胎', 'Wheels & Tyres'],
  ['deco', '除染 / 去水垢', 'Decontamination'],
  ['polish', '研磨抛光 / 施工前处理', 'Correction & Prep'],
  ['coat', '镀膜', 'Ceramic Coating'],
  ['seal', '封体 / 快速养护', 'Sealant · Quick Detailer'],
  ['trim', '塑料 / 轮胎养护', 'Trim & Tyre Care'],
  ['glass', '玻璃', 'Glass'],
  ['apc', '多功能清洁 APC', 'All Purpose Cleaner'],
  ['int', '内饰', 'Interior'],
  ['acc', '配件', 'Accessories'],
];

export const CAT_NAME = Object.fromEntries(CATS.map(([k, n]) => [k, n])) as Record<CategoryId, string>;
export const CAT_EN = Object.fromEntries(CATS.map(([k, , en]) => [k, en])) as Record<CategoryId, string>;

export const SCENES: [SceneId, string][] = [
  ['daily', '日常洗车'],
  ['coated', '保护 / 镀膜车'],
  ['tfr', '交通膜 / 深度清洁'],
  ['ppf', 'PPF / 改色膜'],
  ['nowater', '无水 / 少水条件'],
  ['self', '自助洗车房'],
  ['wheel', '轮毂'],
  ['engine', '发动机舱'],
  ['int', '内饰'],
];

export const SCENE_NAME = Object.fromEntries(SCENES) as Record<SceneId, string>;

export const PH_LABEL = { alk: '碱性 pH', neu: '中性 pH', acid: '酸性 pH' } as const;
