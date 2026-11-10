import type { SdsSourceId } from './types';

/** SDS 来源的显示名和语言 */
export const SDS_SOURCE: Record<SdsSourceId, { name: string; lang: string }> = {
  koch: { name: 'Koch-Chemie 官方', lang: '英文' },
  gyeon: { name: 'Gyeon 官方', lang: '英文' },
  'gyeon-be': { name: 'Gyeon 比利时官方商店', lang: '德文' },
  'gyeon-cz': { name: '加拿大经销商 Carzilla 的 SDS 合集，本站转存', lang: '英文' },
  ps: { name: 'P&S 官方', lang: '英文' },
  feynlab: { name: 'Feynlab 官方', lang: '英文' },
  gesa: { name: '意大利经销商 Gruppo Gesa', lang: '意大利文' },
  bilnerden: { name: '挪威经销商 Bilnerden', lang: '挪威文' },
  'carpro-ws': { name: '德国经销商 wasch-shop.de 的 SDS 合集，本站转存', lang: '英文' },
  chemcx: { name: '第三方化学品资料库 ChemCX 收录的副本', lang: '英文' },
  'chemcx-nl': { name: '第三方化学品资料库 ChemCX 收录的副本', lang: '荷兰文' },
  bricocenter: { name: '意大利零售商 Bricocenter', lang: '意大利文' },
  ebay: { name: 'eBay 卖家附带的 SDS', lang: '意大利文' },
  'sds-db': { name: '第三方资料库 CarCareTruth 收录的副本', lang: '英文' },
  autonablask: { name: '波兰经销商 Auto Na Blask，本站转存', lang: '波兰文' },
  rokjo: { name: '波兰经销商 Rokjo，本站转存', lang: '波兰文' },
  washme: { name: '爱尔兰经销商 washme.ie，本站转存', lang: '英文' },
  mvp: { name: '美国经销商 MVP Detail Supply，本站转存', lang: '英文' },
  'mafra-fr': { name: 'MAFRA 阿尔及利亚官网，本站转存', lang: '法文' },
  'koch-no': { name: 'Koch-Chemie 官方，本站转存', lang: '挪威文' },
  ingrijireauto: { name: '罗马尼亚经销商 Ingrijireauto，本站转存', lang: '英文' },
  'bb-carcare': { name: '比利时经销商 BB CARcare，本站转存', lang: '荷兰文' },
};

/**
 * 含极危险化学品（氢氟酸 / 氟化氢铵）的产品，值为 SDS 第 3 节写的成分和含量。
 * 卡片和详情会显示 GHS06 骷髅标志。官方 SDS 给产品整体的标签是腐蚀（GHS05），骷髅标志是本站对含氟成分的额外提醒。
 */
export const TOXIC: Record<string, string> = {
  'K-triple-acid-star': '氢氟酸 < 0.5%',
  'L-energo': '氟化氢铵 3–5%',
};
