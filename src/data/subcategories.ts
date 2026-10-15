import type { CategoryId } from './types';

export interface Subcategory {
  id: string;
  c: CategoryId;
  n: string;
  /** 产品 id；同一子分类内跨品牌混排，按用途 / 强度排序 */
  ids: string[];
}

/** 分类下的第二层：每款产品恰好属于一个子分类，子分类顺序即页面上的显示顺序 */
export const SUBCATS: Subcategory[] = [
  // ── 预洗 / TFR
  { id: 'pre-alk', c: 'pre', n: '碱性预洗 / TFR', ids: ['L-primus', 'M-foam-gun-prewash', 'K-vorreiniger-b', 'C-lift', 'L-libera', 'K-green-star', 'L-initio'] },
  { id: 'pre-neu', c: 'pre', n: '中性预洗', ids: ['L-neve', 'K-gsf'] },
  { id: 'pre-bug', c: 'pre', n: '虫尸去除', ids: ['M-insect-remover', 'K-insect-dirt-remover', 'C-bugout', 'G-buggrime', 'F-killer'] },
  { id: 'pre-foam', c: 'pre', n: '泡沫预洗（官方未标 pH）', ids: ['G-foam', 'F-valido', 'F-iglu', 'F-c1', 'F-docg3', 'F-jedy', 'F-mafrasol', 'F-supermafrasol', 'F-idrowash'] },

  // ── 洗车香波 / 免冲洗
  { id: 'wash-neu', c: 'wash', n: '中性香波', ids: ['L-semper', 'M-neutral-foam-shampoo', 'C-reset', 'K-autoshampoo', 'K-active-foam', 'G-bathe'] },
  { id: 'wash-plain', c: 'wash', n: '洗车香波（官方未标 pH）', ids: ['F-shampoo-power'] },
  { id: 'wash-protect', c: 'wash', n: '洗护一体 / 镀膜香波', ids: ['L-revitax', 'M-ceramic-shampoo', 'K-ceramic-effect-shampoo', 'K-nanomagic-shampoo', 'C-hydro2-foam', 'K-glanzwachsshampoo', 'G-bathe-plus', 'F-shampoo-cera', 'F-polish-express'] },
  { id: 'wash-acid', c: 'wash', n: '酸性除垢香波', ids: ['L-purifica', 'M-descale-foam-shampoo', 'K-reactivation-shampoo', 'C-descale', 'L-renova'] },
  { id: 'wash-deco', c: 'wash', n: '中性除染香波（去铁 / 恢复镀膜）', ids: ['G-restartwash', 'G-ppf-wash'] },
  { id: 'wash-film', c: 'wash', n: '哑光漆 / 改色膜专用', ids: ['L-satino', 'M-black-wrap-shampoo'] },
  { id: 'wash-rinseless', c: 'wash', n: '免冲洗 / 无水洗', ids: ['L-idrosave', 'K-rapid-rinseless-wash', 'M-waterless', 'C-ech2o', 'G-ecowash', 'K-wash-finish', 'L-preludio-alkaline', 'L-preludio-acidic', 'F-waterless', 'F-ecodry'] },

  // ── 轮毂轮胎
  { id: 'wheel-neu', c: 'wheel', n: '无酸 / 中性（铁粉变色）', ids: ['M-wheel-decontaminant', 'K-magic-wheel-cleaner', 'K-reactive-wheel-cleaner', 'K-felgenblitz-saeurefrei', 'G-iron-wheelcleaner', 'F-fallout', 'F-regenera-rims'] },
  { id: 'wheel-alk', c: 'wheel', n: '碱性轮毂 / 轮胎清洁', ids: ['M-wheel-tyre-cleaner', 'M-wheel-foam-cleaner', 'K-alkali-wheel-cleaner', 'C-retyre', 'G-tirecleaner', 'F-rimnet', 'F-powerwheel'] },
  { id: 'wheel-plain', c: 'wheel', n: '轮毂清洁（官方未标 pH）', ids: ['F-cerchi-gomme', 'F-splendorlega', 'F-splendorlega-pro'] },
  { id: 'wheel-acid', c: 'wheel', n: '酸性（强效）', ids: ['C-wheelx', 'K-felgenreiniger-k', 'K-triple-acid-star'] },

  // ── 除染 / 去水垢
  { id: 'deco-iron', c: 'deco', n: '铁粉 / 锈斑', ids: ['L-sidero', 'M-iron-remover', 'C-ironx', 'G-iron', 'K-reactive-rust-remover', 'C-ironx-paste', 'C-ironx-ss', 'C-ironx-limescale', 'C-trix', 'K-flugrostentferner-bmp', 'F-iron-sniper'] },
  { id: 'deco-water', c: 'deco', n: '水垢 / 水斑', ids: ['L-energo', 'M-water-spot-mineral-remover', 'C-spotless', 'K-spotless-ceramic-finish', 'G-waterspot'] },
  { id: 'deco-tar', c: 'deco', n: '柏油 / 除胶 / 树脂', ids: ['K-teerwaesche-a', 'C-tarx', 'G-tar', 'K-eulex', 'K-eulex-m', 'K-orange-power', 'F-decaflash', 'F-resinoff'] },
  { id: 'deco-clay', c: 'deco', n: '清洁泥 / 润滑液', ids: ['K-reinigungsknete-blau', 'K-reinigungsknete-rot', 'L-lubrifica', 'K-clay-spray', 'C-claylube', 'G-clay', 'G-claylube', 'F-clay-soft', 'F-clay-medium', 'F-regenera-body'] },
  { id: 'deco-special', c: 'deco', n: '专项（尾喉 / PPF）', ids: ['L-cronos', 'L-limpia', 'G-ppf-renew'] },

  // ── 研磨抛光 / 施工前处理（研磨剂按切削力从强到弱）
  { id: 'polish-heavy', c: 'polish', n: '重切削研磨', ids: ['C-ultracut', 'L-audace', 'K-heavy-cut-h902', 'K-heavy-quick-cut-b901', 'K-schleifpaste-h701', 'G-compound-plus', 'C-clearcut', 'F-corrector'] },
  { id: 'polish-medium', c: 'polish', n: '中切削 / 一步抛光', ids: ['L-leale', 'K-fine-cut-f601', 'K-one-cut-finish-p602', 'C-fixer', 'G-compound', 'F-scratch', 'F-scratch-remover'] },
  { id: 'polish-fine', c: 'polish', n: '细抛 / 收光', ids: ['K-micro-cut-m302', 'K-micro-cut-finish-p301', 'K-micro-cut-m202', 'K-lack-polish-violett', 'L-fiero', 'C-reflect', 'K-lack-polish-gruen', 'C-essence', 'G-polish', 'G-primer', 'F-illumina', 'F-cleanerwax', 'F-polish-clever'] },
  { id: 'polish-prep', c: 'polish', n: '镀膜前脱脂检验', ids: ['L-veritas', 'C-eraser', 'G-prep', 'G-total-remover', 'K-silicon-wachsentferner', 'K-panel-preparation-spray', 'F-sherlock'] },
  { id: 'polish-special', c: 'polish', n: '大灯 / 金属', ids: ['K-headlight-polish-set', 'K-metal-polish', 'C-metallicut', 'G-metalpolish', 'F-regenera-view', 'F-flashbright'] },

  // ── 镀膜
  { id: 'coat-paint', c: 'coat', n: '漆面镀膜', ids: ['L-hpc-2', 'L-hpc-pro', 'L-sam', 'L-blindo', 'L-stc', 'K-ceramic-body-cb001', 'K-ceramic-allround-c002', 'K-ceramic-neo-c003', 'K-1k-nano', 'C-cq-lite', 'C-cq-uk', 'C-cq-sic', 'C-cq-pro', 'C-cqfr', 'C-dq-go', 'C-dquartz', 'G-one-evo', 'G-pure-evo', 'G-mohs-evo', 'G-syncro-evo', 'G-matte-evo', 'G-cancoat-evo', 'G-flash-evo', 'G-infinite-base-1', 'G-infinite-base-2'] },
  { id: 'coat-top', c: 'coat', n: '面层 / 镀膜修复', ids: ['C-cq-gliss', 'C-essence-plus', 'G-infinite-top-1', 'G-infinite-top-2', 'G-cancoat-pro-evo'] },
  { id: 'coat-glass', c: 'coat', n: '玻璃镀膜', ids: ['K-ceramic-glass-cg001', 'C-dq-gforce', 'G-view-evo', 'G-antifog'] },
  { id: 'coat-trim', c: 'coat', n: '轮毂 / 塑料 / 轮胎 / 膜', ids: ['K-ceramic-rims-cr001', 'C-cq-dlux', 'K-plast-shield', 'C-cq-blackout', 'C-cq-dlight', 'C-cq-skin', 'G-rim-evo', 'G-trim-evo', 'G-ppf-evo'] },
  { id: 'coat-int', c: 'coat', n: '皮革 / 织物镀膜', ids: ['C-cq-leather', 'C-cq-fabric', 'G-leathershield-evo', 'G-fabriccoat', 'G-purify-coat'] },
  { id: 'coat-kit', c: 'coat', n: '镀膜套装', ids: ['L-kit-sam', 'L-kit-blindo', 'L-kit-stc'] },

  // ── 封体 / 快速养护
  { id: 'seal-rinse', c: 'seal', n: '喷涂即冲 / 湿式封体', ids: ['L-beneficia', 'M-wet-coat', 'C-hydro2', 'C-hydro2-lite', 'K-hydro-foam-sealant', 'K-wetgloss', 'G-wetcoat', 'G-wetcoat-essence'] },
  { id: 'seal-spray', c: 'seal', n: '喷雾 / 擦拭封体', ids: ['L-cupido', 'L-venere', 'K-spray-sealant', 'K-perfectfinish-sealant', 'C-reload', 'C-release', 'C-madmatte', 'G-cure', 'G-cure-matte', 'G-ppf-maintain', 'F-lasttouch', 'F-metalcar'] },
  { id: 'seal-wax', c: 'seal', n: '蜡', ids: ['M-ceramic-ultra-speed-wax', 'K-hand-wax-w001', 'K-protectorwax', 'G-wax', 'F-carlux', 'F-metalcrem', 'F-glazing', 'F-splendida'] },
  { id: 'seal-qd', c: 'seal', n: '快速美容剂', ids: ['L-perfecta', 'L-perfecta-sio2', 'M-exterior-quick-detailer', 'C-elixir', 'K-quick-shine-plus', 'K-quick-finish', 'K-allround-quick-shine', 'K-finish-spray-exterior', 'G-ceramicdetailer', 'G-quickdetailer', 'F-fast-cleaner'] },

  // ── 塑料 / 轮胎养护
  { id: 'trim-care', c: 'trim', n: '外饰塑料 / 橡胶养护', ids: ['L-hydra', 'M-all-round-plastic-protectant', 'C-perl', 'K-plast-star-siliconoelfrei', 'K-plast-star-96', 'K-hydro-plast-care', 'K-gummi-kunststoff-vinylpflege', 'K-gummi-kunststoffpflege-glaenzend', 'K-nanomagic-plast-care', 'G-preserve', 'F-diamant-dressing', 'F-faspoiler'] },
  { id: 'trim-restore', c: 'trim', n: '塑料修复 / 上色', ids: ['L-tpr', 'K-kunststoff-faerber-schwarz'] },
  { id: 'trim-tyre', c: 'trim', n: '轮胎上光', ids: ['L-nero', 'C-darkside', 'K-kcu-reifenschaum', 'G-tire-express', 'G-tire', 'F-nerissimo', 'F-nouveaunoir', 'F-m1', 'F-extremeblack-pro', 'F-extremeblack', 'F-fastblack', 'F-black3'] },
  { id: 'trim-special', c: 'trim', n: '发动机舱 / 敞篷软顶', ids: ['K-motorplast', 'K-cabriodach-versiegelung'] },

  // ── 玻璃
  { id: 'glass-clean', c: 'glass', n: '玻璃清洁', ids: ['L-nitido', 'M-glass-cleaner-degreaser', 'C-clarify', 'C-clarify-phobic', 'K-glas-star', 'K-glass-cleaner', 'K-speed-glass-cleaner', 'G-glass', 'G-glass-plus', 'G-defrost', 'F-glass-plus', 'F-glass-clean', 'F-glass-cleaner', 'F-cristalvetro'] },
  { id: 'glass-protect', c: 'glass', n: '驱水 / 玻璃封体', ids: ['L-aquavelox', 'M-rain-speed', 'K-nano-glasversiegelung', 'G-quickview'] },
  { id: 'glass-polish', c: 'glass', n: '研磨 / 去油膜', ids: ['L-vitreo', 'C-ceriglass', 'C-gofx', 'G-glasspolish'] },
  { id: 'glass-winter', c: 'glass', n: '雨刷水 / 除冰', ids: ['F-cristalbel', 'F-notice'] },

  // ── 多功能清洁 APC
  { id: 'apc-conc', c: 'apc', n: '浓缩型', ids: ['L-ductile', 'M-all-purpose-cleaner', 'C-multix', 'K-mehrzweckreiniger', 'G-apc', 'F-allpurpose', 'F-superapc'] },
  { id: 'apc-rtu', c: 'apc', n: '即用型', ids: ['L-varius', 'M-multisurface-cleaner', 'F-hp12', 'F-split'] },

  // ── 内饰
  { id: 'int-clean', c: 'int', n: '综合清洁', ids: ['L-omnia', 'L-igea', 'M-interior-cleaner-purifier', 'C-inside', 'K-multi-interior-cleaner', 'K-allround-surface-cleaner', 'K-schmutzradierer', 'G-trimcleaner', 'F-pulimax', 'F-pulimax-ewo', 'F-deterjet'] },
  { id: 'int-fabric', c: 'int', n: '织物 / Alcantara', ids: ['L-glico', 'L-texia', 'M-alcantara-cleaner', 'K-pol-star', 'K-tinten-kuli-ex', 'K-allround-textile-sealant', 'G-fabriccleaner', 'F-3in1-tessuti', 'F-flash', 'F-flash-liquido', 'F-textile'] },
  { id: 'int-leather', c: 'int', n: '皮革清洁与养护', ids: ['L-derma-cleaner', 'M-leather-cleaner', 'C-cleanse', 'L-derma-sealant', 'C-lotion', 'K-leather-star', 'K-protect-leather-care', 'G-leathercleaner-natural', 'G-leathercleaner-strong', 'G-leathercoat', 'F-3in1-pelle', 'F-charming', 'F-nutrient', 'F-hydrating'] },
  { id: 'int-care', c: 'int', n: '塑料养护 / 快速美容 / 除味', ids: ['M-interior-quick-detailer', 'C-innerqd', 'K-top-star', 'K-cockpit-super-pflege', 'K-gummifix', 'C-so2pure', 'G-interior-detailer', 'G-purify-maintain', 'G-odorremover', 'G-odorremover-pads', 'F-3in1-plast', 'F-plast-shine', 'F-plast-satin', 'F-scic-blu', 'F-odorbact'] },

  // ── 配件
  { id: 'acc-towel', c: 'acc', n: '毛巾 / 超纤布', ids: ['L-ideale-ext', 'L-ideale-int', 'L-multi-towel', 'M-all-round-towel', 'L-buffing-towel', 'M-polish-sealant-remover', 'K-coating-towel', 'L-glass-towel', 'M-glass', 'L-drying-towel', 'K-pro-drying-towel', 'C-dhydrate', 'G-silkdryer', 'G-softwipe', 'G-polishwipe', 'G-glasswipe', 'G-suede', 'F-superdryer', 'F-extradry', 'F-martina', 'F-heavywork', 'F-topbuffing', 'F-panno-df', 'F-1shine-vetri'] },
  { id: 'acc-mitt', c: 'acc', n: '洗车手套 / 施工海绵', ids: ['K-exterior-wash-mitt', 'C-merino-mitt', 'K-application-sponge', 'K-allround-microfiber-sponge', 'C-mf-applicator', 'G-smoothie', 'G-silkmitt', 'G-wheelmitt', 'G-coating-applicator', 'G-mf-applicator', 'G-tire-applicator', 'F-guanto', 'F-allseasons', 'F-comfortpad', 'F-booster', 'F-mfpad', 'F-foampad'] },
  { id: 'acc-brush', c: 'acc', n: '刷具', ids: ['L-duo-scrub-pad', 'L-fabric-seat-brush', 'L-floor-carpet-brush', 'K-detail-wheel-brush', 'C-detailing-brushes', 'C-darkside-brush', 'G-wheelbrush', 'G-tirebrush', 'G-leatherbrush'] },
  { id: 'acc-clay', c: 'acc', n: '除染黏土', ids: ['C-clays', 'C-polyshave'] },
  { id: 'acc-pad', c: 'acc', n: '抛光盘', ids: ['G-pad-heavy-cut', 'G-wool-heavy-cut', 'G-pad-cut', 'G-wool-cut', 'G-pad-polish', 'G-pad-finish', 'F-pad-white', 'F-pad-blu', 'F-microwool', 'F-hybrid', 'F-eskimo-white', 'F-eskimo-gold', 'F-pad-yellow', 'F-pad-black'] },
  { id: 'acc-other', c: 'acc', n: '喷壶 / 其他', ids: ['L-bottle', 'C-dilute', 'K-pressure-foam-sprayer', 'C-mfx', 'G-towelwash', 'M-be-twin', 'F-secchio-wash', 'F-gritsafe', 'F-nebula', 'F-mfwash'] },
];
