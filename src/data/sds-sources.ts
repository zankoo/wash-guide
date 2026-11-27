/** 统一托管在 Cloudflare R2 自定义域名的 SDS 基准地址。 */
export const SDS_R2_ORIGIN = 'https://sds.kokoda.fun';

/** 来源只标识机构；语言、版本和托管信息属于每份文件。 */
export const SDS_SOURCES = {
  "koch": {
    "name": "Koch-Chemie 官方"
  },
  "gyeon": {
    "name": "Gyeon 官方"
  },
  "gyeon-be": {
    "name": "Gyeon 比利时官方商店"
  },
  "gyeon-cz": {
    "name": "加拿大经销商 Carzilla"
  },
  "ps": {
    "name": "P&S 官方"
  },
  "feynlab": {
    "name": "Feynlab 官方"
  },
  "gesa": {
    "name": "意大利经销商 Gruppo Gesa"
  },
  "bilnerden": {
    "name": "挪威经销商 Bilnerden"
  },
  "carpro-ws": {
    "name": "德国经销商 wasch-shop.de"
  },
  "chemcx": {
    "name": "第三方化学品资料库 ChemCX 收录的副本"
  },
  "bricocenter": {
    "name": "意大利零售商 Bricocenter"
  },
  "ebay": {
    "name": "eBay 卖家附带的 SDS"
  },
  "sds-db": {
    "name": "第三方资料库 CarCareTruth 收录的副本"
  },
  "autonablask": {
    "name": "波兰经销商 Auto Na Blask"
  },
  "rokjo": {
    "name": "波兰经销商 Rokjo"
  },
  "washme": {
    "name": "爱尔兰经销商 washme.ie"
  },
  "mvp": {
    "name": "美国经销商 MVP Detail Supply"
  },
  "mafra-fr": {
    "name": "MAFRA 阿尔及利亚官网"
  },
  "ingrijireauto": {
    "name": "罗马尼亚经销商 Ingrijireauto"
  },
  "bb-carcare": {
    "name": "比利时经销商 BB CARcare"
  },
  "alphadetails": {
    "name": "澳大利亚经销商 Alpha Details"
  },
  "car-wash-gr": {
    "name": "希腊经销商 car-wash.gr"
  }
} as const;
export type SdsSourceId = keyof typeof SDS_SOURCES;
