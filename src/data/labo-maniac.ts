// MAFRA 旗下 Labocosmetica / Maniac Line 产品施工数据
// 来源：labocosmetica.com（英文版）与 maniacline.com（英文版）产品页，2026-10 抓取并译为中文。
// d = 稀释表 [适用场景/材质, 比例, 施工工具]；s = 施工步骤；x = 注意事项/补充
// 比例写法沿用官方：1:10 = 1 份原液 + 10 份水

import type { Product } from './types';

const LABO = 'https://www.labocosmetica.com/product/';
const MANIAC = 'https://maniacline.com/shop/';

const COATING_PREP = [
  '表面必须彻底除染（铁粉、柏油、水垢等），无任何残留。',
  '施工前去除旧蜡、封体或镀膜。',
  '表面必须无浅划痕、印记和污渍，如有须先机器抛光；新车无需修复漆面时，做一次除染洗车去除运输残留。',
  '车身必须完全脱脂：使用 VÈRITAS 1:5 擦拭。此步骤为强制要求。',
];
const COATING_RULES = [
  '只在有遮盖、无尘的室内施工，切勿户外；佩戴溶剂蒸气防护面罩，保持通风，避免阳光直射。',
  '温度和湿度越高，可操作时间越短；每次施工区域不超过 50×50 cm。',
  '使用反射光（灯打向墙面或天花板）检查，发现高点（残留）立即处理。',
  '镀膜与表面初始结合只需几分钟，随后用超细纤维布去除残留并收尾。',
  '12 小时内部分固化，36 小时完全固化；前 7–10 天不要洗车，避免淋雨和湿度骤变。',
  '如有红外灯：距离 50 cm、60 °C、照射 15–20 分钟以帮助固化。',
];

export const products: Product[] = [
// ───────────────────────── Labocosmetica ─────────────────────────
{id:'L-initio',b:'L',c:'pre',n:'INITIO',t:'即用型碱性预洗',f:'1000 ml 喷壶',m:'车漆 · 塑料 · 玻璃 · 轮毂 · 密封条',
 d:[['全部外部表面','即用原液','喷雾壶']],
 s:['使用前摇匀，在干燥车身上直接喷涂所有外部表面（车漆、塑料、玻璃、轮毂、密封条），由下往上均匀覆盖。','停留约 60 秒。DryShield™ 技术会减缓蒸发、提升清洁效果。','用大量高压水冲洗，同样由下往上。'],
 x:['无需稀释，面向入门用户设计。','看似干了也会在再次冲水时恢复作用（DryShield™），可在阳光下或较热表面使用。'],u:LABO+'initio/'},

{id:'L-primus',b:'L',c:'pre',n:'PRÌMUS 2.0',t:'碱性泡沫预洗 · VDA 认证',f:'1000 ml · 4.5 L',m:'车漆 · 塑料 · 铝 · 玻璃 · PPF · 轮毂 · 轮胎 · 发动机舱',
 d:[['轮毂和轮胎','1:3 – 1:10','喷雾壶'],['车身下部、侧裙、保险杠、去飞虫','1:20','喷雾壶'],['非常脏的车（由下往上喷）','1:50','喷雾壶'],['中度脏污（由下往上喷）','1:80','喷雾壶'],['频繁清洗','1:100','喷雾壶'],['冬季污垢','1:5','PA壶'],['夏季污垢','1:10','PA壶']],
 s:['按脏污程度在PA壶内稀释 1:5–1:15，将泡沫喷满所有漆面、车轮和轮毂。','停留 3–5 分钟后高压冲洗。','「双重作用」法：先用喷壶 1:5 喷车身下部（污染主要集中在此）→ 换PA壶再覆盖整车 → 等 3–5 分钟后冲洗。'],
 x:['PA壶最终出液浓度因高压清洗机而异；官方建议使出液浓度接近喷壶推荐值。','对已施工的保护层安全。'],u:LABO+'primus-best-multi-purpose-foam-prewash-for-car-motocycles/'},

{id:'L-neve',b:'L',c:'pre',n:'NÈVE',t:'中性泡沫预洗',f:'1000 ml · 4.5 L',m:'车漆 · 铝 · 玻璃 · PPF · 哑光/改色膜',
 d:[['PA壶','1:25（最浓）– 1:50（最稀）','PA壶'],['顽固污垢（外部）','1:5','喷雾壶'],['中度污垢（外部）','1:10','喷雾壶'],['Nebula 手动泡沫壶','1:20','喷雾壶']],
 s:['按污染程度稀释，用PA壶均匀由下往上喷涂。','等待约 5 分钟，直到泡沫开始消退。','在泡沫变干前由下往上冲洗。','根据污染程度决定是否再用洗车手套。'],
 x:['极浓缩，请严格按推荐比例。过量会让泡沫过重、反而贴不住表面。','顽固污垢建议用喷雾模式，清洁更快。'],u:LABO+'neve-best-snow-foam-prewash-neutral-shampoo-gun-detailing/'},

{id:'L-libera',b:'L',c:'pre',n:'LIBERA',t:'浓缩碱性 TFR 预洗（去交通膜）',f:'1000 ml',m:'车漆 · PPF · 镀膜车',
 d:[['白车灰膜 / 多孔漆面','1:5','喷雾壶'],['中度污垢','1:10','喷雾壶'],['轻度预洗 / 维护','1:20','喷雾壶'],['PPF 施工前准备','1:5 – 1:20（视脏污）','喷雾壶'],['第二遍预洗（手套）','1:20','桶洗']],
 s:['车辆置于阴凉处，车身冷却。','按推荐比例在压力喷壶中稀释。','以雾状喷在干燥车身上，由下往上。','停留 3–6 分钟，不要让产品干在表面。','高压水由下往上冲洗。'],
 x:['必须以雾状喷涂，不要当泡沫预洗用。','更深度清洁（交通膜严重、PPF 施工前）：用手套以 1:20 做第二遍预洗，或改用酸性 RENOVA（2pH+ 洗车流程）。','车标、轮毂等复杂区域用软毛刷。'],u:LABO+'libera/'},

{id:'L-semper',b:'L',c:'wash',n:'SÈMPER',t:'中性超浓缩洗车香波',f:'500 ml · 4.5 L',m:'车漆 · 塑料 · 铝 · 玻璃',
 d:[['顽固污垢','1:800','桶洗'],['中等污垢','1:1000','桶洗'],['轻度污垢','1:1200','桶洗'],['最高稀释','1:1500','桶洗']],
 s:['水桶先加约 4/5 的水，加入 SÈMPER。','剩余 1/5 用高压水或 Tornador 冲入，打出泡沫。','用超细纤维手套或软海绵清洗整车。','用大量清水冲洗。'],
 x:['适用于中等硬度的水；水质更硬时提高浓度，或改用 SÀTINO 以便干燥、减少水垢残留。','对镀膜、封体和棕榈蜡完全安全，不含蜡和增亮剂，可用于玻璃。'],u:LABO+'semper-car-detailing-shampoo-ph-neutro/'},

{id:'L-revitax',b:'L',c:'wash',n:'REVÌTAX',t:'中性 Wash & Coat 镀膜香波',f:'500 ml · 4.5 L',m:'车漆 · 铝 · PPF · 轮毂',
 d:[['PA壶','1:10','PA壶'],['未做纳米封体的车','1:100','桶洗'],['镀膜/封体车维护','最高 1:150','桶洗'],['喷壶','1:100','喷雾壶']],
 s:['按推荐比例稀释，全车施用。','用软海绵或手套清洗车身。','用清水冲洗。'],
 x:['施工 8 小时后保护达到最强。','与 BENEFÌCIA、CUPÌDO 同源母粒子，可层叠施工。'],u:LABO+'revitax-best-sio2-shampoo-maintenance-ceramic-coated-car/'},

{id:'L-purifica',b:'L',c:'wash',n:'PURÌFICA（升级配方）',t:'酸性除染香波',f:'1000 ml · 4.5 L',m:'车漆 · 塑料 · 铝 · 玻璃 · PPF · 轮毂 · 哑光/改色膜',
 d:[['PA壶','1:5 – 1:10','PA壶'],['水桶','1:100 – 1:400','桶洗'],['喷雾器','1:100 – 1:200','喷雾壶'],['pH < 3（强效）','1:100 – 1:200','—'],['pH < 4','1:200 – 1:330','—'],['pH ≈ 5（维护洗）','1:400','—']],
 s:['可作手洗香波（水桶），也可作PA壶/喷壶预洗。','按需要的强度选择比例：比例越浓 pH 越低、去水垢越强。'],
 x:['溶解并封闭水垢和矿物沉积，去除让车漆发闷的钙质薄膜（黑车尤其明显）。','可恢复镀膜和封体的性能；不含蜡和封体成分。保持 VDA 认证。','官网未给出分步说明。'],u:LABO+'purifica-shampoo-revitalize-post-coated-car-water-spot-remover/'},

{id:'L-satino',b:'L',c:'wash',n:'SÀTINO',t:'哑光漆 / 改色膜香波',f:'500 ml',m:'哑光漆 · 改色膜 · PPF · 轮毂',
 d:[['PA壶','1:5','PA壶'],['水桶（约 5 L）','1:60 – 1:100','桶洗']],
 s:['PA壶：泡沫喷满整车，用软手套轻轻擦洗。','水桶：按比例与约 5 L 水混合（COMODO 桶），用高压水打出泡沫，两桶法从上往下洗，经常清洗手套。','直线移动、不加压。','用冷水冲洗，超细纤维布擦干。'],
 x:['在车身留下至少 2 周的抗 UV 保护。'],u:LABO+'satino-special-shampoo-matte-and-wrap-paint/'},

{id:'L-renova',b:'L',c:'wash',n:'RENOVA',t:'酸性 TFR 香波（PPF / 改色膜专用）',f:'500 ml',m:'PPF · 改色膜 · 车漆 · 轮毂',
 d:[['手洗','1:50（1 L 水加 20 ml）','桶洗'],['局部强化处理','1:10（1 L 水加 100 ml）','喷雾壶'],['PPF 维护香波','1:200（1 L 加 5 ml / 10 L 加 50 ml）','桶洗'],['手套增效','1:5（1 L 水加 200 ml）','喷雾壶'],['轮毂/重点区域去油喷雾（软毛刷）','1:5','喷雾壶']],
 s:['手洗 1:50：用高润滑超纤手套，分区从上往下，彻底冲洗后擦干。','局部 1:10：施于有水垢/矿物残留的区域，最多停留 60 秒，立即冲洗。','PPF 维护 1:200：在已湿润表面用手套或海绵均匀清洗，彻底冲洗。','手套增效 1:5：溶液直接倒在手套上逐区擦过，恢复疏水和光泽；不要让它干，擦完立即冲洗。','轮毂 1:5：喷在轮毂或污染区，软毛刷刷洗后彻底冲洗。'],
 x:['在敏感表面先做兼容性测试。'],u:LABO+'renova/'},

{id:'L-idrosave',b:'L',c:'wash',n:'IDROSAVE',t:'中性聚合物免冲洗洗车液',f:'250 ml · 1000 ml · 4.5 L',m:'外部全车',
 d:[['水桶（免冲洗）（隔砂网）','1:250（5 L 水加 20 ml）','桶洗'],['无水洗 / 干燥辅助','1:100（1 L 水加 10 ml）','喷雾壶']],
 s:['带隔砂网的水桶中按 1:250 稀释。','另装一个喷壶，先把溶液喷在待清洗的板块上软化污垢；有机污垢（虫尸、刹车粉）配合碱性产品、无机污垢（水垢）配合酸性产品，停留不超过 2 分钟，不要干在表面。','软超纤手套浸入水桶，拧到不滴水。','轻轻划过车身，不加压。','软超纤布擦干。','一次一个板块，重复直到全车完成。'],
 x:['无水洗用法：1:100 喷在板块上，用软超纤布擦过，必要时第二块布再擦一遍。','可与 PRELUDIO 碱性/酸性配合使用。'],u:LABO+'idrosave-polymer-rinseless-wash-neutral-ph/'},

{id:'L-preludio-alkaline',b:'L',c:'wash',n:'PRELUDIO ALKALINE',t:'碱性预浸液（免冲洗 / 无水洗体系）',f:'1000 ml',m:'车漆 · 塑料 · 玻璃 · PPF · 轮毂 · 轮胎',
 d:[['严重污垢','1:5','喷雾壶'],['重度污垢','1:10','喷雾壶'],['PPF 清洁 / 白车','1:15','喷雾壶'],['新鲜污垢','1:20','喷雾壶']],
 s:['按处理目的稀释。','均匀施于污染区域。','停留约 1 分钟，随后用无水洗或免冲洗方式去除污垢。'],
 x:['针对有机污垢：轮毂刹车粉、虫尸、尾气、交通膜、PPF 发雾、白车发黄。'],u:LABO+'preludio-alkaline/'},

{id:'L-preludio-acidic',b:'L',c:'wash',n:'PRELUDIO ACIDIC',t:'酸性预浸液（免冲洗 / 无水洗体系）',f:'1000 ml',m:'车漆 · 塑料 · 玻璃 · PPF · 轮毂 · 轮胎',
 d:[['轮毂、明显水垢','1:5','喷雾壶'],['沙尘雨后、重度矿物污染','1:10','喷雾壶'],['镀膜焕新 / 车身和塑料维护','1:50','喷雾壶']],
 s:['按处理目的稀释。','均匀施于污染区域。','停留约 1 分钟，随后用无水洗或免冲洗方式去除。'],
 x:['1:5 处理后水垢仍在，改用 ÈNERGO 等专用去水斑产品。','溶解并封闭水垢矿物，无需用布用力擦拭，更安全。'],u:LABO+'preludio-acidic/'},

{id:'L-sidero',b:'L',c:'deco',n:'SIDERO',t:'铁粉去除凝胶（兼去水垢）',f:'500 ml · 4.5 L',m:'车漆 · 铝 · 玻璃 · 轮毂',
 d:[['日常维护（最高稀释）','1:4','喷雾壶'],['重度污染（锈斑、轨道铁粉、轮毂内圈深度清洁）','原液','喷雾壶']],
 s:['官网未列出文字步骤。要点：干燥慢，可在阳光下更安全地作用；润滑性高，可用刷子清洁喷漆轮毂缝隙。'],
 x:['遇铁粉变紫；如有水垢，颜色会由紫转为深绿至青铜色，表示钙质已被去除。','对车漆、保险杠、塑料安全，可恢复原有保护的拨水效果；也可溶解锈斑（适用于船舶）。','施工镀膜前清洁轮毂内圈必备。'],u:LABO+'sidero-500ml-iron-remover-gel-anti-limescale-action/'},

{id:'L-energo',b:'L',c:'deco',n:'ÈNERGO',t:'矿物水斑去除剂',f:'—',m:'车漆 · 玻璃 · 发动机舱 · 排气',
 d:[['重度（棉片）','原液','喷雾壶'],['中度','1:5','喷雾壶'],['轻度','1:10','喷雾壶']],
 s:['按污垢程度加水稀释。','喷在需要的区域，用施工棉或软毛刷涂开，作用 2–3 分钟。','清水冲洗。'],
 x:['PURÌFICA 去不掉的大面积水垢：原液至 1:5 倒在手套上，在湿车上逐板擦拭（避开阳光），随即冲洗。','仍有残留：原液点涂，或浸湿棉片贴在车身上作用 5 分钟并打圈按摩，再用湿超纤布擦去。','软漆、单工序漆须谨慎，避免用原液以防出现光晕。'],u:LABO+'energo-clean-acid-rain-water-stain-mineral-remover-car-detailing/'},

{id:'L-lubrifica',b:'L',c:'deco',n:'LUBRIFICA',t:'粘土 / 打磨 / 抛光润滑液',f:'500 ml · 4.5 L',m:'车漆 · 玻璃 · PPF · 改色膜',
 d:[['粘土块（Clay Block）','1:5','喷雾壶'],['粘土棒（Clay Bar）','1:10','喷雾壶'],['PPF 施工','1:15','喷雾壶'],['玻璃隔热膜 / 贴纸','1:20','喷雾壶']],
 s:['直接喷在需要过泥或打磨的表面，或抛光前喷在抛光盘上。','过泥时持续喷洒，保持表面润滑。','用后以布擦净，无需冲洗。','贴 PPF 或隔热膜：表面和膜的胶面都要喷。'],
 x:['掉在地上的粘土必须丢弃。','过泥时不要加压，避免阳光直射（润滑液干得太快）。'],u:LABO+'lubricant-for-claying-and-sanding-500ml/'},

{id:'L-cronos',b:'L',c:'deco',n:'CRÒNOS',t:'排气尾喉除碳剂',f:'250 ml',m:'排气尾喉（金属）',
 d:[['尾喉（中软毛刷 / 超纤）','原液','—']],
 s:['少量 CRÒNOS 倒在中软毛刷上清洁尾喉。','冲水并擦干。残留处把少量产品倒在超纤块上反复擦，直至完全去除。','再冲水，用超纤布擦干。'],
 x:[],u:LABO+'cronos-rapid-decarbonizer-exhaust-tailpipes-car-detailing/'},

{id:'L-limpia',b:'L',c:'deco',n:'LIMPIA',t:'PPF / 改色膜深层清洁剂',f:'500 ml 喷壶',m:'PPF · 改色膜',
 d:[['PPF / 改色膜（超纤布）','即用原液','喷雾壶']],
 s:['喷在膜面上。','用超细纤维布擦拭并带走污垢，无需冲水。'],
 x:['适用时机：季节性除染（膜孔内积累的环境污垢）；PPF 发灰发闷时恢复光泽；定期维护以保持透明度、弹性和自修复反应。','可用于已有纳米保护、蜡或镀膜的表面。'],u:LABO+'limpia/'},

{id:'L-veritas',b:'L',c:'polish',n:'VÈRITAS',t:'镀膜前脱脂 / 去油检验剂',f:'1000 ml',m:'车漆 · 玻璃 · 轮毂 · 织物',
 d:[['去除旧保护层 / 镀膜施工出错（超纤布）','原液（喷在布上）','—'],['点测（spot test）','1:1','喷雾壶'],['抛光后检查','1:3 – 1:5','喷雾壶'],['镀膜前脱脂（官方镀膜流程）','1:5','喷雾壶']],
 s:['原液：先喷在短毛超纤布上，再不加压直线擦拭，最后用布的干面收尾。不要把原液直接喷到车身。','稀释液：直接喷在表面，用超纤布不加压抹开，用干面收尾。','检查镀膜状态：洗车后车身仍湿时，距离 60 cm 喷在引擎盖上，再用水冲。'],
 x:['不要在热表面或热源旁使用；单工序/直接亮光漆面上避免让产品干在表面。'],u:LABO+'veritas-alcool-ipa-verificatore-swirls-oil-wax-remover/'},

{id:'L-audace',b:'L',c:'polish',n:'AUDACE',t:'顶级切削研磨剂',f:'250 ml · 1000 ml',m:'车漆',
 d:[['羊毛盘（旋转机）','4 滴','—'],['海绵盘（旋转机 / DA）','3 滴','—']],
 s:['DA 偏心机：1 档在约 40×40 cm 区域抹开，升至 3 档开始切削，5 档达到最大切削，直到研磨剂耗尽。','旋转机：从 400–600 rpm 开始，升至 1000–1200 rpm（切削与收光的最佳平衡，羊毛盘也不易出现光环）。','加工中经常清洁抛光盘，发挥性能并避免起粉。'],
 x:['硬漆用 HybridPad；需要较少切削时用白色或蓝色海绵盘。','水性配方，ColdCut 技术，低转速即可高切削。'],u:LABO+'audace-supreme-cut-compound/'},

{id:'L-leale',b:'L',c:'polish',n:'LEALE',t:'中切研磨剂（敏感漆专用）',f:'250 ml · 500 ml',m:'车漆',
 d:[['海绵盘（旋转机 / DA）','3 滴','—']],
 s:['旋转机：400–600 rpm 起步，升至 1000–1200 rpm，最后用 400–600 rpm 收一遍以获得好的光洁度。','DA 偏心机：1 档在约 40×40 cm 区域抹开后加工。','加工中经常清洁抛光盘。'],
 x:['中等敏感漆：切削用 HybridPad；非常软的漆：用中蓝盘；作一步抛光用蓝盘或黄盘。','不含石蜡和填充剂，不掩盖缺陷。'],u:LABO+'leale-250gr-medium-cut-compound-special-for-sensitive-paint/'},

{id:'L-fiero',b:'L',c:'polish',n:'FIERO',t:'精细收光抛光剂 / 镀膜结合底剂',f:'250 ml · 500 ml',m:'车漆',
 d:[['车漆（DA 偏心机）','原液','—']],
 s:['DA 偏心机恒定 4.5 档，在 40×40 cm 区域均匀推开，直到产品耗尽。','推荐中软黄盘或软黑盘。'],
 x:['水性，不含蜡和填充剂。'],u:LABO+'fiero-super-finish-genuine-polish/'},

{id:'L-blindo',b:'L',c:'coat',n:'BLINDO PLUS',t:'硬质树脂透明底层镀膜（仅套装销售）',f:'套装',m:'车漆 · 铝',
 d:[['—','原液','—']],
 s:COATING_PREP.concat(COATING_RULES),
 x:['接触角 105°，提升抗水垢附着和耐化学性。','不单独销售，需与 HPC PRO 组成套装。'],u:LABO+'blindo-physically-ceramic-based-nano-coating-car-detailing/'},

{id:'L-sam',b:'L',c:'coat',n:'SAM',t:'单层自组装镀膜（Self Assembled Monolayer）',f:'30 ml · 50 ml',m:'车漆 · 塑料 · 铝 · PPF',
 d:[['—','原液','—']],
 s:COATING_PREP.concat(COATING_RULES),
 x:['80% 化学 + 20% 物理镀膜，单层即可施工。','最低耐久 30,000 km 或 2 年（官方测试折算约 15,000 km/年）。'],u:LABO+'sam-ceramic-hydrophobic-coat-stand-alone/'},

{id:'L-stc',b:'L',c:'coat',n:'STC',t:'永久纳米镀膜（仅授权施工商）',f:'50 ml',m:'车漆 · 塑料 · 铝',
 d:[['—','原液','—']],
 s:COATING_PREP.concat(COATING_RULES),
 x:['70% 物理 + 30% 化学镀膜，抗划、抗盐、柏油、酸雨、污染和 UV。','仅限授权用户。'],u:LABO+'stc-permanent-nano-ceramic-car-coating/'},

{id:'L-hpc-pro',b:'L',c:'coat',n:'HPC PRO',t:'混合聚硅氮烷镀膜',f:'30 ml · 50 ml',m:'车漆 · 塑料 · 铝 · 哑光/改色膜',
 d:[['—','原液','—']],
 s:['表面必须完全清洁、无污染。','去除旧镀膜、蜡等残留。','有划痕、旋纹或光环须先机器抛光。','用 VÈRITAS 充分脱脂后再施工。','如在已施工镀膜上加一层作为面层，两层之间不要再脱脂。','按包装内说明的方法与干燥时间均匀施工。'],
 x:['快速固化，当天可交车；Dust Out 技术可在开放环境施工，适合上门服务。','数小时后仍可修正施工失误；单位面积用量比上一代节省 26%。不含 PFAS。'],u:LABO+'hpc-pro/'},

{id:'L-hpc-2',b:'L',c:'coat',n:'HPC 2.0',t:'混合聚硅氧烷镀膜',f:'30 ml · 50 ml',m:'车漆 · 塑料 · 铝 · PPF · 哑光/改色膜',
 d:[['—','原液','—']],
 s:['表面必须完全清洁、无污染。','去除旧镀膜、蜡等残留。','有划痕、旋纹或光环须先机器抛光。','用 VÈRITAS 充分脱脂后再施工。','如作为面层叠加，两层之间不要再脱脂。','按包装内说明的方法与干燥时间均匀施工。'],
 x:['保护最长 24 个月或 30,000 km；超疏水、丝滑手感。'],u:LABO+'hpc-2-0/'},

{id:'L-kit-sam',b:'L',c:'coat',n:'SAM + HPC 2.0',t:'镀膜套装',f:'套装',m:'车漆 · 塑料 · 铝 · PPF · 轮毂',
 d:[['—','原液','—']],
 s:COATING_PREP.concat(COATING_RULES),
 x:['组合后耐久最长 4 年或 60,000 km。不含 PFAS。'],u:LABO+'kit-coating-sam-hpc-high-2-0-hydrophobic-nano-ceramic-shield/'},

{id:'L-kit-blindo',b:'L',c:'coat',n:'BLINDO PLUS + HPC PRO',t:'镀膜套装',f:'套装',m:'车漆 · 铝',
 d:[['—','原液','—']],
 s:COATING_PREP.concat(COATING_RULES),
 x:['BLINDO PLUS 打底、HPC PRO 作面层，强化抗水垢与抗污染。'],u:LABO+'kit-coating-blindo-hpc-glass-shield-protection-hydrophobic-scratch-resistence/'},

{id:'L-kit-stc',b:'L',c:'coat',n:'STC + HPC PRO',t:'镀膜套装（仅授权施工商）',f:'套装',m:'车漆 · 塑料 · 铝',
 d:[['—','原液','—']],
 s:COATING_PREP.concat(COATING_RULES),
 x:['HPC 与 SAM/BLINDO/STC 组合，耐久再增加 20,000–30,000 km。'],u:LABO+'kit-coating-stc-hpc-pro-nano-hybrid-ceramic-car-paint-protection/'},

{id:'L-beneficia',b:'L',c:'seal',n:'BENEFÌCIA',t:'Wet Coat 喷涂即冲镀膜增强剂',f:'1000 ml',m:'车漆 · PPF',
 d:[['冬季','原液','喷雾壶'],['夏季 / 高温','1:1','喷雾壶']],
 s:['洗车后车身清洁、湿润，引擎盖不能太热。','一次一个板块，距离 40–60 cm 由下往上喷，形成尽量宽而均匀的雾面。','数到 5 后立即用水冲洗。','可用水膜法或吹干；干燥时如有残留，用 PERFÈCTA 2.0 去除。'],
 x:['避免阳光直射，不要让产品干在表面。','与 REVÌTAX、CUPÌDO 同源，可层叠。'],u:LABO+'beneficia-best-hydrophobicity-booster-wet-coat/'},

{id:'L-cupido',b:'L',c:'seal',n:'CUPÌDO',t:'纳米复合封体',f:'500 ml',m:'车漆',
 d:[['车漆（施工棉）','原液','—']],
 s:['每次在 40×40 cm 区域喷 CUPÌDO。','用施工棉以十字交叉（Criss-Cross）方式推开。','用超纤布去除产品，再用 DOUBLE FACE 布去除残留。'],
 x:['可作为其他封体或纳米蜡上的维护层；与 VÉNERE 搭配可把维护周期由 4 个月延长到 9 个月。'],u:LABO+'cupido-best-spray-on-sealant-sio2-paint-ceramic-coated/'},

{id:'L-venere',b:'L',c:'seal',n:'VÉNERE',t:'Glaze 封体 / 底剂',f:'250 ml',m:'车漆',
 d:[['车漆（DA 偏心机 / 手工）','原液','—']],
 s:['DA 偏心机：1–3 档在漆面推开并叠加。','手工：2–3 滴在施工棉上，像固体蜡一样左右轻推一到两遍。','感觉表面略油时，用超纤布擦去。'],
 x:['作为 CUPÌDO 的底剂：帮助 CUPÌDO 完全附着，维护保护期由 4 个月延长至 9 个月。'],u:LABO+'venere-primer-sealant-paint-glaze-best-gloss/'},

{id:'L-perfecta',b:'L',c:'seal',n:'PERFÉCTA 2.0',t:'光泽快速美容剂（Quick Detailer）',f:'500 ml · 4.5 L',m:'车漆 · 塑料 · 铝 · PPF · 镀铬',
 d:[['车门','2 喷','—'],['引擎盖','4 喷','—'],['车顶','6 喷','—']],
 s:['湿车：在仍湿的板块上喷少量，用 SUPERDRYER 超纤布一次性把产品和水擦干。','干车（方式一）：喷在短毛超纤布上抹开，再用干净的长毛超纤布收尾。','干车（方式二）：直接喷在车身，用短毛超纤布轻抹，再用长毛超纤布擦干。'],
 x:['pH 4.5，干燥阶段可降低硬水斑风险。','出现条纹只会是用量过多，或用了湿用途的超纤布。','保质期 3 年。'],u:LABO+'perfecta/'},

{id:'L-perfecta-sio2',b:'L',c:'seal',n:'PERFÉCTA SiO2',t:'陶瓷快速美容剂',f:'500 ml',m:'车漆 · 塑料 · 铝 · PPF',
 d:[['湿车每区域（SUPER DRYER）','2–3 喷（小区域不超过 2 喷）','—']],
 s:['准备：彻底洗车，用 SIDERO 去除铁粉等沉积。','摇匀，湿车或干车均可，每次处理不超过约半平方米。','干车：喷在短毛超纤布或车身上抹开，用干净的长毛超纤布收尾。','湿车：直接喷在漆面，用 SUPER DRYER 超纤布擦开。','用高质量超纤布擦至镜面后再处理下一区域。'],
 x:['第二层须间隔 24 小时；完全固化 12 小时。','不要在阳光直射或热漆面使用，最佳 25 °C 以下；干车效果最佳。'],u:LABO+'perfecta-sio2/'},

{id:'L-hydra',b:'L',c:'trim',n:'HYDRA',t:'塑料 / 轮胎超级上光封体',f:'100 ml · 500 ml',m:'内外塑料 · 轮胎',
 d:[['内饰塑料（海绵 / 超纤施工棉）','1:3 – 1:5','—'],['外部塑料（海绵 / 超纤施工棉）','1:1','—'],['轮胎','原液','喷雾壶']],
 s:['在已清洁、脱脂的表面上，用海绵或超纤施工棉涂抹原液或稀释液。','均匀推开，再用干超纤布去除多余部分。','第二层可进一步加强效果。','轮胎要更亮：直接喷在轮胎肩部，待其自然干燥。'],
 x:['光泽和保护程度可通过稀释比例调节。'],u:LABO+'hydra-best-plastic-hyper-dressing-sealant-plastich-car-detailing/'},

{id:'L-nero',b:'L',c:'trim',n:'NERO',t:'即用型轮胎上光凝胶',f:'500 ml',m:'轮胎',
 d:[['轮胎（超纤施工棉）','即用原液','—']],
 s:['把产品挤在超纤施工棉上。','在轮胎表面均匀涂开。','让产品在表面自然干燥。'],
 x:['不油腻。'],u:LABO+'nero/'},

{id:'L-tpr',b:'L',c:'trim',n:'TPR',t:'外饰塑料修复（Trim Plastic Restore）',f:'—',m:'外部塑料',
 d:[['外饰塑料（海绵 / 超纤施工棉）','原液','—']],
 s:['清洁：视污垢用 DÙCTILE 或 LIBERA，再用 VÈRITAS 彻底脱脂，超纤布完全擦干。','施工：少量倒在海绵或施工棉上，小区域施工，推开至完全吸收。','收尾：停留约 1 分钟，用干布去除多余。','至少 24 小时不要接触水；7 天后再洗车或淋雨效果最佳。','维护：用 Labocosmetica 3pH 洗车流程；每 12–24 个月重涂。'],
 x:[],u:LABO+'tpr/'},

{id:'L-aquavelox',b:'L',c:'glass',n:'AQUAVÈLOX',t:'玻璃纳米封体（驱水）',f:'100 ml',m:'玻璃',
 d:[['玻璃（麂皮超纤布）','原液','—']],
 s:['前处理：用 ÈNERGO 配合粘土去除玻璃水垢，严重时用玻璃研磨剂；如有洗车房蜡残留，用 VÈRITAS。','在完全干燥的玻璃上距离 20–25 cm 均匀喷涂。','用干净干燥的麂皮超纤布横竖推开，直到覆盖整块玻璃。','用干超纤布收尾。'],
 x:['20 分钟后可上第二层，效果更强。','8 小时完全激活；官方建议给 12 小时固化以获得最佳性能。'],u:LABO+'aquavelox-best-strong-glass-hydrophobic-water-repellant-anti-rain/'},

{id:'L-nitido',b:'L',c:'glass',n:'NITIDO',t:'高透玻璃清洁剂',f:'500 ml',m:'玻璃',
 d:[['玻璃（超纤布）','即用原液','—']],
 s:['直接喷在玻璃上。','用干净超纤布擦拭。','用另一块干净干布擦到完全干爽无痕。'],
 x:['可在阳光直射下使用。'],u:LABO+'nitido-high-clarity-glass-cleaner/'},

{id:'L-vitreo',b:'L',c:'glass',n:'VITREO',t:'玻璃研磨剂（去划痕/氧化/腐蚀）',f:'250 ml',m:'玻璃',
 d:[['玻璃（旋转机 + 毛毡盘 / 手工超纤施工棉）','原液','—']],
 s:['用胶带遮蔽橡胶条、塑料等敏感部位。','每次处理约 20×20 cm。','湿润薄毛毡盘，均匀涂抹产品。','加工中喷水或 LUBRIFICA，避免过热产生微划痕。','去划痕：旋转机最高 1000 RPM，建议软背盘以减少毛毡震动；不要过度加压。','用干净、湿润的软超纤布去除残余（表面较热，用干布会留斑）。'],
 x:['同一区域连续不超过 2 遍；需要再处理时先换区域，待表面冷却后再继续。','去水垢或作为 AQUAVÈLOX 等驱水剂的前处理：可用 DA 偏心机或手工超纤施工棉；精抛用人造丝毛毡盘。'],u:LABO+'vitreo-glass-polish-removes-slight-scratches-oxidation-and-corrosion-on-car-glass-250g/'},

{id:'L-ductile',b:'L',c:'apc',n:'DÙCTILE',t:'浓缩多功能清洁剂 APC',f:'500 ml · 4.5 L',m:'织物 · 地毯 · 皮革 · 塑料 · Alcantara · 车漆 · 玻璃 · 发动机舱',
 d:[['发动机、合金轮毂、轮拱（刷）','1:3','喷雾壶'],['门槛 / 预洗','1:20 – 1:30','喷雾壶'],['织物和地毯（刷）','1:10','喷雾壶'],['塑料（刷）','1:20','喷雾壶']],
 s:['按污垢程度稀释，均匀喷涂。','用干净的刷子清除污垢。','最后用干净的布或刷子清理所有处理过的部位。'],
 x:['无残留，易冲洗。','与 GLICO 组成 2pH 内饰清洁流程（见 GLICO）。'],u:LABO+'ductile-best-apc-all-purpose-cleaner-all-around-detailing/'},

{id:'L-varius',b:'L',c:'apc',n:'VARIUS',t:'即用型多功能清洁剂',f:'500 ml',m:'内外饰各类表面',
 d:[['内外饰（超纤布）','即用原液','喷雾壶']],
 s:['直接喷在待处理表面或超纤布上。','直线擦拭去除污垢。'],
 x:['顽固污垢用刷子辅助。','也可喷在布上做快速维护；适合配合 Tornador。','一般无需过水，接触食品的表面等特殊情况除外。'],u:LABO+'varius/'},

{id:'L-omnia',b:'L',c:'int',n:'OMNÌA 2.0',t:'内饰清洁剂',f:'500 ml · 4.5 L',m:'塑料 · 皮革 · 织物 · 地毯 · Alcantara · 铝',
 d:[['顽固污垢（刷）','原液 – 1:1','喷雾壶'],['修复被强力 APC 伤害或晒褪色的塑料（刷）','原液 – 1:1','—'],['深度清洁（刷）','1:2','喷雾壶'],['皮革','1:4','喷雾壶'],['Tornador / Rotorjet（气动清洗枪）','1:7','—'],['日常 / 维护清洁（超纤布）','1:10','喷雾壶'],['快速内饰清洁（超纤布）','1:15','喷雾壶']],
 s:['深度清洁：喷在表面，用刷子或软毛刷打出细密泡沫，最后用干超纤布擦去。','日常维护：喷在表面后用超纤布擦拭。','提升塑料自然质感：喷上后停留 5 分钟，再用干超纤布擦去。','老车或洗坏的塑料：原液或最多 1:1，用刷子推开，停留约 10 分钟至干，先用湿超纤布擦，再用干净干布擦干。'],
 x:[],u:LABO+'omnia-2-0-500ml-interior-cleaner/'},

{id:'L-glico',b:'L',c:'int',n:'GLICO',t:'乙醇酸织物清洁剂（专利配方）',f:'500 ml · 4.5 L',m:'织物 · 地毯 · Alcantara · 塑料 · 铝',
 d:[['单独使用 / 维护（刷）','1:10','喷雾壶'],['重度脏污组合（COMBO）（刷）','1:5','喷雾壶'],['刷子浸泡软化（浸泡约 1 小时）','1:5','—'],['传统清洁后的最后过水','1:50','—']],
 s:['单独使用：1:10 喷满整个区域并刷开，停留 2–3 分钟，用干净超纤布擦拭后吸尘。','COMBO（很脏的座椅）：GLICO 1:5 喷涂并刷开，停留 2–3 分钟；不要冲洗，接着喷 DÙCTILE 1:10 再刷。','在出现皂化的地方吸尘，最后用喷抽机、蒸汽机或湿布清理。'],
 x:['Luminol 效果：喷涂时会让肉眼看不到的污渍显形。','误喷到 Alcantara、塑料、皮革、金属、碳纤维、凯夫拉上也安全。','用 1:50 作最后过水，可去除之前碱性表面活性剂的残留。'],u:LABO+'glico/'},

{id:'L-texia',b:'L',c:'int',n:'TEXIA',t:'即用型织物清洁剂',f:'500 ml',m:'织物',
 d:[['织物','即用原液','喷雾壶']],
 s:['摇匀后直接喷在表面。','等待 30–60 秒渗透，然后视污垢用布、刷子、DUO 刷垫或喷抽机处理。','用干净布擦干或吸尘。'],
 x:['不含阴离子表面活性剂和酶，泡沫少。'],u:LABO+'texia/'},

{id:'L-igea',b:'L',c:'int',n:'IGEA',t:'乙醇酸内饰快速焕新清洁剂',f:'500 ml',m:'内饰各类表面（黑色面板效果好）',
 d:[['内饰（喷在超纤布上）','即用原液','喷雾壶']],
 s:['摇匀，喷在超纤布上（不要直接喷在表面）。','直线、重叠地擦拭。','需要时用第二块干布收尾。'],
 x:[],u:LABO+'igea/'},

{id:'L-derma-cleaner',b:'L',c:'int',n:'DÈRMA CLEANER 2.0',t:'皮革清洁剂',f:'500 ml · 4.5 L',m:'皮革',
 d:[['深度清洁（软毛刷）','原液','—'],['维护清洁（超纤布）','1:1','喷雾壶']],
 s:['先用吸尘器去除灰尘和粗颗粒。','产品直接施于表面或软毛刷上。','用刷子刷到起泡。','用柔软超纤布擦去产品。','维护：喷上稀释液，用干净干燥的超纤布擦拭。'],
 x:[],u:LABO+'derma-cleaner-2-0-500ml-hydrating-purifying-leather-cleaner/'},

{id:'L-derma-sealant',b:'L',c:'int',n:'DÈRMA SEALANT',t:'皮革保护封体',f:'250 ml',m:'皮革',
 d:[['皮革（软超纤施工棉）','原液','—']],
 s:['先用 DÈRMA CLEANER 2.0 清洁皮革。','表面清洁干燥后摇匀，把 DÈRMA SEALANT 倒在软超纤施工棉上。','以轻柔的小圈按摩皮革。','用干超纤布收尾。'],
 x:['保持皮革柔软、透气和原厂质感。'],u:LABO+'derma-best-leather-sealant-nano-coating-protection/'},

{id:'L-bottle',b:'L',c:'acc',n:'刻度喷瓶',t:'500 ml 专业扳机喷瓶',f:'500 ml',m:'—',d:[],s:['按瓶身刻度调配稀释液。'],x:[],u:LABO+'graduated-bottle-with-professional-trigger/'},
{id:'L-duo-scrub-pad',b:'L',c:'acc',n:'DUO Scrub Pad',t:'塑料 / 织物 / 皮革双面刷垫',f:'—',m:'塑料 · 织物 · 皮革',d:[],
 s:['使用前先去除表面灰尘和碎屑。','短纤维面（100% 聚酰胺）：处理塑料和门槛上的顽固污垢。','长纤维面（85% 聚酯 / 15% 聚酰胺）：处理织物和车顶内衬。','用后以温水冲洗，完全晾干再收纳。'],
 x:['定期 30 °C 轻柔洗衣机清洗，勿用漂白剂和柔顺剂。'],u:LABO+'duo-scrub-pad/'},
{id:'L-fabric-seat-brush',b:'L',c:'acc',n:'FABRIC SEAT BRUSH',t:'织物座椅刷（2pH 流程）',f:'—',m:'织物座椅',d:[],s:['在 2pH 内饰流程中先刷出灰尘，为下一步清洁做准备。'],x:['波浪形四元黄铜刷毛，保护织物纤维。'],u:LABO+'fabric-seat-brush/'},
{id:'L-floor-carpet-brush',b:'L',c:'acc',n:'FLOOR CARPET BRUSH',t:'地毯刷（2pH 流程）',f:'—',m:'地毯',d:[],s:['刷出灰尘并让污渍显形，据此选择 GLICO 或 DÙCTILE。'],x:['蒸汽处理山毛榉木刷体，石蜡防水处理。'],u:LABO+'floor-carpet-brush/'},
{id:'L-ideale-ext',b:'L',c:'acc',n:'IDEALE for Exterior',t:'外部超纤布（Labo Weave）',f:'—',m:'—',d:[],s:['去除快速美容剂、蜡、研磨剂、封体、Glaze、镀膜残留。','配合无水洗 / 免冲洗产品；擦亮镀铬、金属、玻璃和镜面；清洁轮毂；擦干内外表面。'],x:['建议用 MICROFIBER WASH 清洗以延长寿命。'],u:LABO+'ideale-for-exterior/'},
{id:'L-ideale-int',b:'L',c:'acc',n:'IDEALE for Interior',t:'内饰超纤布（Labo Weave）',f:'—',m:'—',d:[],s:['内饰清洁和收尾。'],x:['建议用 MICROFIBER WASH 清洗以延长寿命。'],u:LABO+'ideale-for-interior/'},
{id:'L-buffing-towel',b:'L',c:'acc',n:'BUFFING TOWEL',t:'收光布 480 gsm',f:'—',m:'—',d:[],s:['用于去除产品残留和收光。'],x:['70% 聚酯 / 30% 聚酰胺。'],u:LABO+'buffing-towel/'},
{id:'L-drying-towel',b:'L',c:'acc',n:'DRYING TOWEL',t:'擦干布 90×70 cm',f:'—',m:'—',d:[],s:['洗车后擦干车身。'],x:['扭纹超纤结构，可吸收自重 10 倍的水。'],u:LABO+'drying-towel/'},
{id:'L-glass-towel',b:'L',c:'acc',n:'GLASS TOWEL',t:'玻璃布',f:'—',m:'玻璃',d:[],s:['湿用：玻璃准备和脱脂阶段。','干用：收尾擦亮。'],x:[],u:LABO+'glass-towel/'},
{id:'L-multi-towel',b:'L',c:'acc',n:'MULTI TOWEL',t:'激光切边多用途超纤布',f:'—',m:'—',d:[],s:['适用于日常和深度清洁的各类表面。'],x:[],u:LABO+'multi-towel/'},

// ───────────────────────── Maniac Line ─────────────────────────
{id:'M-foam-gun-prewash',b:'M',c:'pre',n:'Foam Gun Prewash',t:'PA壶碱性预洗',f:'1000 ml · 5 L',m:'外部全车',
 d:[['局部（飞虫、泥污、车身下部）','1:10','喷雾壶'],['冬季污垢','1:50（1 L 水加 2 瓶盖）','喷雾壶'],['夏季污垢','1:100（1 L 水加 1 瓶盖）','喷雾壶'],['冬季污垢（出液约 1:50）','1:5','PA壶'],['夏季污垢（出液约 1:110）','1:10','PA壶']],
 s:['车身下部和局部污垢：先用稀释液直接由下往上喷并冲洗。','PA壶按季节稀释，由下往上厚喷整车，等泡沫开始下滑（最多约 5 分钟）。','高压水由下往上冲洗。','泵壶用法：喷完等 1 分钟让产品软化污垢，再高压冲洗。'],
 x:['可在未打湿的车身上直接喷；有泥块先用水冲掉。车身不能热，在阴凉处施工；夏季先冲水降温。','夏天或高温下一次处理一个板块。','预洗阶段不要用刷子或海绵，让化学作用完成工作。','不可用于摩托车。'],u:MANIAC+'products-professional-cleaning-auto-exterior/prewash/foam-gun-prewash/'},

{id:'M-insect-remover',b:'M',c:'pre',n:'Insect Remover',t:'虫尸去除凝胶',f:'—',m:'车漆 · 塑料 · 玻璃 · 后视镜 · 镀铬 · 铝',
 d:[['虫尸','即用原液','喷雾壶']],
 s:['有高压清洗机：均匀喷在表面，停留 30 秒，高压水冲掉虫尸；残留处喷少量在 Comfort Car Wash Pad 上再擦一遍；之后用 Neutral Foam Shampoo 洗车。','手工：均匀喷涂，视温度和表面敏感度停留 30 秒–2 分钟，用浸湿产品的超纤布擦去虫尸，然后冲洗。'],
 x:['对各类封体和镀膜安全。'],u:MANIAC+'products-professional-cleaning-auto-exterior/prewash/insect-remover/'},

{id:'M-neutral-foam-shampoo',b:'M',c:'wash',n:'Neutral Foam Shampoo',t:'中性泡沫洗车香波（2 合 1）',f:'1000 ml · 5 L',m:'外部全车',
 d:[['预洗','1:10','PA壶'],['手洗','3 瓶盖 / 10 L 水','桶洗'],['最高稀释','1:400','桶洗']],
 s:['预洗：PA壶 1:10，整车由下往上喷，停留约 4 分钟让泡沫变薄（勿干），高压由上往下冲洗。','手洗：10 L 水加 3 瓶盖，另备一桶清水洗手套；车身保持湿润，从上往下，小区域、最小压力。','每个板块后在清水桶里冲洗手套，避免带砂划伤。','彻底冲洗，用 Super Dryer 擦干（车身和玻璃各用一条）。'],
 x:['WAX SAFE：不损伤包括棕榈蜡在内的底层保护，适合每周或双周维护洗。','车跑了很多公里或长时间暴露在外，先用 Foam Gun Prewash 预洗。'],u:MANIAC+'products-professional-cleaning-auto-exterior/wash/neutral-foam-shampoo/'},

{id:'M-ceramic-shampoo',b:'M',c:'wash',n:'Ceramic Shampoo',t:'SiO2 陶瓷香波（洗 + 封 + 护 3 合 1）',f:'—',m:'外部全车',
 d:[['手洗','4 瓶盖 / 1 桶水','桶洗'],['增效方法一（喷在手套上）','1:5','喷雾壶'],['增效方法二（泡沫）','1:3','PA壶']],
 s:['水桶加 4 瓶盖，像普通香波一样使用。','车身湿润、在阴凉处，一次一个板块，由下往上洗（与传统香波相反，避免聚合物流挂不均）。','分半车进行，避免产品干在车身上；冲洗后用 Super Dryer 擦干。','增效一：1:5 喷在洗车手套上，分半车再洗一遍，冲洗并擦干。','增效二：先 Foam Gun Prewash 预洗、Neutral Foam Shampoo 手洗，再用PA壶 1:3 由下往上喷，至少停留 1 分钟，由上往下高压冲洗后擦干。'],
 x:['保护约 90 天。施工前用 Iron Remover 和 Water Spot Mineral Remover 除染，效果最好。','约两周后可用 Neutral Foam Shampoo 做维护洗。'],u:MANIAC+'products-professional-cleaning-auto-exterior/wash/ceramic-shampoo/'},

{id:'M-black-wrap-shampoo',b:'M',c:'wash',n:'Black & Wrap Shampoo',t:'黑车 / 改色膜 / PPF 香波（防水垢）',f:'—',m:'深色漆 · 哑光 · 改色膜 · PPF',
 d:[['手洗','4 瓶盖 / 8 L 水（约 1:300）','桶洗'],['特别脏或发闷的表面','几滴直接倒在湿手套上','桶洗']],
 s:['先用 Foam Gun Prewash 彻底预洗。','两桶法：一桶香波溶液、一桶清水，配 Double Face 手套或 Microfiber Pad，桶里放隔砂网。','车身湿润、阴凉处，一次一个板块，从上往下；每个板块后在清水桶冲洗手套。','不要让香波干在车身上；完成后由上往下高压冲洗。','干燥：在湿车上喷 Exterior Quick Detailer，用 Super Dryer 擦干。'],
 x:['含矿物螯合剂，大幅减少干燥阶段的水垢斑。对各种纳米镀膜安全。'],u:MANIAC+'products-professional-cleaning-auto-exterior/wash/black-wrap-shampoo/'},

{id:'M-descale-foam-shampoo',b:'M',c:'wash',n:'Descale Foam Shampoo',t:'酸性去水垢泡沫香波（2 合 1）',f:'1000 ml · 5 L',m:'车漆 · 塑料 · 镀铬 · 轮毂',
 d:[['PA壶：顽固污垢','1:5','PA壶'],['PA壶：普通污垢','1:10','PA壶'],['Nebula Foam 2.0（橙色喷嘴）','1 L 水加 1 瓶盖','喷雾壶'],['水桶手洗','5 L 水加 3–5 瓶盖','桶洗'],['增加润滑 / 沙尘雨斑','水桶内加 1–3 瓶盖','桶洗'],['轮毂维护、车身下部水垢','1:10','喷雾壶']],
 s:['很脏时先用 Foam Gun Prewash 做碱性预洗。','Pillow Foam（泡沫垫）技术：泡沫喷满车身，不冲洗。','水桶按污染程度加 3–5 瓶盖，用 Double Face 手套或 Comfort Car Wash Pad 直接在泡沫上清洗。','彻底冲洗，用 Super Dryer 擦干。','轮毂维护：先用 Wheel & Tyre Cleaner 深度清洁，再喷 1:10 稀释液，停留几秒后彻底冲洗。'],
 x:['日常维护洗可与 Neutral Foam Shampoo 交替使用。','抛光或上蜡/封体前，可在 Iron Remover 除铁之后使用。'],u:MANIAC+'products-professional-cleaning-auto-exterior/wash/descale-foam-shampoo/'},

{id:'M-waterless',b:'M',c:'wash',n:'Waterless',t:'无水洗车液',f:'1000 ml · 5 L',m:'车漆 · 镀铬 · 外部各表面',
 d:[['无水洗','1:5 – 1:15','喷雾壶']],
 s:['稀释 1:5–1:15。','一次一小块（如一个板块）均匀喷涂。','让产品湿润表面、软化污垢。','超纤布折成四折，第一面朝一个方向擦过，边擦边逐渐抬起带走污垢。','用另一块干净干布收尾。','每一步换用布的干净面。'],
 x:['可在阳光直射和高温下使用。','不能完全替代传统洗车，尤其是泥浆和结块污垢。','全车建议准备 6–12 块高质量超纤布。'],u:MANIAC+'products-professional-cleaning-auto-exterior/wash/waterless/'},

{id:'M-wheel-tyre-cleaner',b:'M',c:'wheel',n:'Wheel & Tyre Cleaner',t:'轮毂轮胎清洁剂',f:'1000 ml · 5 L',m:'轮毂（含黑色喷漆、改色膜、Plastidip）· 轮胎 · 轮拱',
 d:[['特别顽固的污垢（Nebula Foam）','1:3','喷雾壶'],['冬季污垢（Nebula Foam）','1:5','喷雾壶'],['夏季较轻污垢（Nebula Foam）','1:10','喷雾壶']],
 s:['确认表面冷却后，直接喷在轮毂和轮胎胎面，并延伸到轮拱。','停留 2–5 分钟，不要干掉。','用刷子机械清洁顽固处，然后彻底冲洗。','仍有污垢可重复，用刷子深入缝隙。'],
 x:['每次洗车都可使用；能去除旧轮胎上光剂，为新上光做准备。','冲洗后轮毂缝隙仍有斑点，可能是铁粉污染，改用 Iron Remover。'],u:MANIAC+'products-professional-cleaning-auto-exterior/prewash/wheel-tyre-cleaner/'},

{id:'M-wheel-foam-cleaner',b:'M',c:'wheel',n:'Wheel Foam Cleaner',t:'即用型碱性轮毂泡沫清洁剂',f:'—',m:'喷漆合金轮毂 · 轮胎 · 轮拱 · 门框',
 d:[['轮毂和轮胎','即用原液','喷雾壶']],
 s:['直接喷在轮毂和轮胎上（红紫色泡沫便于看清覆盖范围）。冷表面，避开阳光。','让泡沫附着作用，不要干掉。','顽固污垢或辐条间、内圈用专用刷刷洗。','大量清水冲洗。'],
 x:['无需稀释。'],u:MANIAC+'products-professional-cleaning-auto-exterior/wash/wheel-foam-cleaner/'},

{id:'M-wheel-decontaminant',b:'M',c:'wheel',n:'Wheel Decontaminant',t:'即用型泡沫轮毂铁粉去除剂',f:'—',m:'喷漆轮毂 · 车身 · 玻璃',
 d:[['轮毂 / 车身 / 玻璃','即用原液','喷雾壶']],
 s:['均匀喷满待处理区域。冷表面，避开阳光。','等待与铁粉反应变紫，不要干在表面。','顽固或难达区域用软毛刷。','大量清水冲洗。','检查效果，严重区域可重复。'],
 x:[],u:MANIAC+'products-professional-cleaning-auto-exterior/decontamination/wheel-decontaminant/'},

{id:'M-iron-remover',b:'M',c:'deco',n:'Iron Remover',t:'铁粉去除剂（中性、无酸）',f:'1000 ml · 5 L',m:'钢/铝合金/喷漆/镀铬/抛光轮毂 · 车漆 · 玻璃',
 d:[['轮毂维护（每洗 3 次做一次）（软毛刷）','1:1（最高稀释）','喷雾壶'],['轮毂深度除铁（软毛刷）','原液','喷雾壶'],['车身除铁（距离约 40 cm）','原液','喷雾壶']],
 s:['阴凉处，确认表面冷却。','轮毂：喷上后停留 3–4 分钟（不要干），变紫说明在溶解铁粉；用刷子清理辐条间和缝隙，彻底冲洗后用超纤布擦干。','车身：洗车擦干后，距离约 40 cm 均匀喷原液，停留 3–5 分钟，彻底冲洗。'],
 x:['不可用于未涂装或无保护的金属、未喷漆卡钳和摩托车。','上蜡或做保护前必做，以提升附着。'],u:MANIAC+'products-professional-cleaning-auto-exterior/decontamination/iron-remover/'},

{id:'M-water-spot-mineral-remover',b:'M',c:'deco',n:'Water Spot Mineral Remover',t:'水斑 / 矿物去除剂',f:'—',m:'玻璃 · 车漆 · 镀铬 · 塑料',
 d:[['水斑（超纤施工棉 / 软毛刷）','即用原液','—']],
 s:['先完成轮毂轮胎、预洗和香波手洗。','局部斑点：直接施于表面，停留 30 秒，用湿超纤布擦去，再用干布收尾；顽固处最多停留 60 秒，不要干在车身上。','前后挡风玻璃：一次处理一半，充分冲洗。','整车大面积污染：用 Microfiber Pad 均匀涂开，处理完一个区域冲洗后再做下一个；车标、饰条用软毛刷。'],
 x:['建议用 Exterior Quick Detailer 辅助安全冲洗/擦拭。','不可用于摩托车；注意敏感塑料。'],u:MANIAC+'products-professional-cleaning-auto-exterior/decontamination/water-spot-mineral-remover/'},

{id:'M-ceramic-ultra-speed-wax',b:'M',c:'seal',n:'Ceramic Ultra Speed Wax',t:'SiO2 陶瓷喷雾蜡',f:'—',m:'车漆（汽车、摩托车、船、自行车）',
 d:[['车漆（短毛 + 长毛超纤布）','即用原液','—']],
 s:['喷在短毛干净超纤布上，横竖均匀推开。','每次不超过一张 A3 纸大小的区域。','用柔软干净的长毛超纤布收光（Buffing），去除多余。'],
 x:['可随时叠加施工，结合在下层保护上。','预先除染时保护可达 4 个月。'],u:MANIAC+'products-professional-cleaning-auto-exterior/polishing-and-protection/ceramic-ultra-speed-wax/'},

{id:'M-exterior-quick-detailer',b:'M',c:'seal',n:'Exterior Quick Detailer',t:'外部快速美容剂（清洁 + 上光 + 保护）',f:'—',m:'车漆 · 玻璃 · 外部各表面',
 d:[['干车 / 湿车（短毛 + 长毛超纤布 / Super Dryer）','即用原液','—']],
 s:['干车（新鲜轻污、指纹、鸟粪、雨渍）：均匀适量喷在一个板块上，用短毛超纤布横竖推开，再用长毛超纤布收尾。','湿车（洗后干燥辅助）：直接喷在湿表面，用 Super Dryer 擦干，减少水斑。'],
 x:['与纳米镀膜、封体和传统蜡兼容。鸟粪和飞虫要尽快处理。'],u:MANIAC+'products-professional-cleaning-auto-exterior/polishing-and-protection/exterior-quick-detailer/'},

{id:'M-wet-coat',b:'M',c:'seal',n:'Wet Coat',t:'喷涂即冲疏水保护（免擦）',f:'—',m:'车漆 · 玻璃 · 塑料 · 轮毂',
 d:[['湿车','即用原液','喷雾壶']],
 s:['洗车后在湿车上喷涂，最好距离约 60 cm。','等待约 10 秒让成分结合。','用高压水或大量清水冲洗。'],
 x:['无需布或海绵擦拭；与现有保护兼容，不叠层。','可维持约 2 个月或 4 次洗车。'],u:MANIAC+'products-professional-cleaning-auto-exterior/polishing-and-protection/wet-coat/'},

{id:'M-all-round-plastic-protectant',b:'M',c:'trim',n:'All Round Plastic Protectant',t:'内外塑料保护剂（抗 UV）',f:'—',m:'内外塑料 · 轮胎侧壁',
 d:[['外部塑料（超纤施工棉）','原液','—'],['外部塑料（超纤施工棉）','1:1','—'],['内饰塑料（含褪色塑料）（超纤施工棉）','1:1','—'],['内外塑料维护（超纤施工棉）','1:2','—']],
 s:['外部塑料和橡胶先用 APC 清洁，用干净超纤布擦干。','在刻度瓶中先加水到所需比例刻度，再加产品。','倒在超纤施工棉上，小区域均匀涂开。','用干净干燥的超纤布收尾。'],
 x:['水性、中性 pH，呈饱满原色而非亮面。'],u:MANIAC+'products-professional-cleaning-auto-exterior/finishing/all-round-plastic-protectant/'},

{id:'M-glass-cleaner-degreaser',b:'M',c:'glass',n:'Glass Cleaner & Degreaser',t:'玻璃清洁去油剂',f:'500 ml · 5 L',m:'玻璃（含深色玻璃）· 屏幕',
 d:[['玻璃（短毛超纤布）','即用原液','—']],
 s:['直接喷在玻璃上，用干净短毛超纤布擦去。','先擦外侧，再擦同一块玻璃的内侧。','用另一块干净干布收尾。','车内屏幕：先喷在布上再擦。'],
 x:['不含氨和甲醇；对 Alcantara、皮革、软触材料、防眩屏幕安全，不影响已有玻璃镀膜。','擦车窗时把玻璃降下几厘米，清洁密封条下的部分。'],u:MANIAC+'products-professional-cleaning-car-interior/glass-cleaning/glass-cleaner-degreaser/'},

{id:'M-rain-speed',b:'M',c:'glass',n:'Rain Speed',t:'玻璃驱水封体',f:'—',m:'玻璃',
 d:[['玻璃（超纤布）','即用原液','—']],
 s:['去水垢：Water Spot Mineral Remover 倒在超纤施工棉上处理；严重时用玻璃研磨剂。','有洗车房蜡残留：用 Glass Cleaner & Degreaser 清洁。','确认玻璃完全干燥后均匀喷涂，用干净干燥的超纤布横竖推开至全覆盖。','用另一块干超纤布轻擦收尾。'],
 x:[],u:MANIAC+'products-professional-cleaning-car-interior/glass-cleaning/rain-speed/'},

{id:'M-all-purpose-cleaner',b:'M',c:'apc',n:'All Purpose Cleaner',t:'多功能清洁剂 APC',f:'500 ml · 5 L',m:'织物 · 地毯 · 塑料 · 皮革 · 轮毂 · 发动机舱',
 d:[['内饰（织物、塑料、地毯）（刷）','1:5','喷雾壶'],['皮革','1:10','喷雾壶'],['内饰维护清洁','1:15','喷雾壶'],['发动机舱 / 轮毂（视脏污）（软刷）','1:1 – 1:3','喷雾壶'],['预洗 / 去虫（车身和挡风）','1:20','喷雾壶'],['重污 / 普通 / 定期维护','1:3 / 1:10 / 1:20','喷雾壶']],
 s:['内饰：先彻底吸尘；1:5 喷在表面，用刷子打出泡沫，用湿超纤布去除，再用干布擦干。','外部（发动机舱）：表面冷却，1:1–1:3 距离约 20 cm 喷涂，软刷刷洗，停留几分钟，用超纤布擦去；轮毂用高压水冲洗。','预洗/去虫：1:20。'],
 x:['只能用手动喷壶，不能用于PA壶。','Odor Stop 去异味。'],u:MANIAC+'products-professional-cleaning-car-interior/cleaning-leather-fabrics-and-carpets/all-purpose-cleaner/'},

{id:'M-multisurface-cleaner',b:'M',c:'apc',n:'Multisurface Cleaner',t:'即用型多表面清洁剂',f:'—',m:'内饰塑料 · 乙烯基 · 耐用织物 · 门框 · 轮胎 · 车漆 · 发动机舱',
 d:[['内外饰（超纤布）','即用原液','喷雾壶']],
 s:['直接喷在表面或超纤布上。','用布均匀擦过整个区域，让配方作用片刻。','用微湿超纤布去除。','用第二块干净干布擦干。'],
 x:[],u:MANIAC+'products-professional-cleaning-auto-exterior/wash/multisurface-cleaner/'},

{id:'M-interior-cleaner-purifier',b:'M',c:'int',n:'Interior Cleaner Purifier',t:'内饰清洁净化剂（抗菌抗病毒）',f:'500 ml · 5 L',m:'皮革 · 超纤 · 铝 · 碳纤维 · 织物 · 地毯',
 d:[['日常清洁（超纤布）','1:3','喷雾壶'],['中等污垢（地毯、内饰下部）（刷）','1:1','喷雾壶'],['顽固污垢和污渍（软毛刷）','原液','—']],
 s:['清空车内物品，彻底吸尘（防止干后出现水印）。','日常 1:3：均匀喷涂，用干净干超纤布擦拭，再用柔软湿超纤布收尾。','中等 1:1：喷在表面，用刷子打出泡沫，湿超纤布去除后再用干布擦干。','顽固污渍：原液 + 软毛刷，再用柔软超纤布收尾。'],
 x:['可刷涂、用泡沫扳机喷在立面，或直接喷在表面；最后都用干超纤布带走溶解的污垢。','通过 UNI EN 14476 病毒及 UNI EN 1276 / 1369 细菌测试。'],u:MANIAC+'products-professional-cleaning-car-interior/cleaning-leather-fabrics-and-carpets/interior-cleaner-purifier/'},

{id:'M-interior-quick-detailer',b:'M',c:'int',n:'Interior Quick Detailer',t:'内饰快速美容剂',f:'—',m:'屏幕 · 硬/软塑料 · 真皮/人造革 · 乙烯基 · 镀铬 · 钢琴黑',
 d:[['内饰（超纤布）','即用原液','—']],
 s:['使用前摇匀。','直接喷在表面；屏幕和亮面饰板先喷在超纤布上。','均匀擦拭整个区域，让配方作用片刻。','用布的干面或另一块干净布收尾。'],
 x:['快干、无痕。'],u:MANIAC+'products-professional-cleaning-car-interior/cleaning-leather-fabrics-and-carpets/interior-quick-detailer/'},

{id:'M-leather-cleaner',b:'M',c:'int',n:'Leather Cleaner',t:'泡沫皮革清洁剂',f:'—',m:'各类皮革（含打孔/通风皮革）',
 d:[['皮革（软毛刷 / 软刷 / 湿超纤布）','即用原液（自加压泡沫喷头）','—']],
 s:['摇匀。','把泡沫喷在刷子、软刷、布上或直接喷在表面。','打圈清洁。','用干净干燥的超纤布擦去，无需过水。顽固污垢可重复。'],
 x:['缝线、角落、打孔皮用软毛刷；座椅、靠背、门板大面积用软刷；维护或娇嫩表面用湿超纤布。','不含溶剂，可频繁使用。'],u:MANIAC+'products-professional-cleaning-car-interior/leather-cleaner/'},

{id:'M-alcantara-cleaner',b:'M',c:'int',n:'Alcantara® Cleaner',t:'Alcantara 专用清洁剂（官方认证）',f:'—',m:'Alcantara',
 d:[['污渍 / 深度清洁（软毛刷 + 超纤布）','即用原液','—'],['定期维护（软毛刷 + 超纤布）','1:1','—']],
 s:['先彻底吸尘。','喷在待处理表面，每次一小块。','用软毛刷轻压打圈。','用干净干燥的超纤布轻压吸走污垢。','对整块表面重复，即便只有局部污渍也要整体处理。'],
 x:['不含 VOC。油性污垢同样适用。'],u:MANIAC+'products-professional-cleaning-car-interior/cleaning-leather-fabrics-and-carpets/alcantara-cleaner/'},

{id:'M-all-round-towel',b:'M',c:'acc',n:'All Round Towel',t:'多用途超纤布 280 gsm',f:'60×40 cm',m:'—',d:[],s:['适合无水洗、玻璃、皮革座椅、门框，以及蜡、封体、快速美容剂的施工和收光。'],x:['85% 聚酯 / 15% 聚酰胺，包边；可吸收自重 7 倍的水，耐洗 1000 次。','建议用 MICROFIBER WASH 清洗。'],u:MANIAC+'products-professional-cleaning-car-interior/cleaning-leather-fabrics-and-carpets/all-round-towel/'},
{id:'M-glass',b:'M',c:'acc',n:'Glass',t:'玻璃超纤布 320 gsm',f:'60×40 cm',m:'玻璃',d:[],s:['强力清洁：打湿拧干，折成四折，湿用去污，配合 Glass Cleaner & Degreaser。','收尾：干用擦亮。'],x:['平纹编织，激光切边无包边。'],u:MANIAC+'products-professional-cleaning-car-interior/glass-cleaning/glass/'},
{id:'M-polish-sealant-remover',b:'M',c:'acc',n:'Polish & Sealant Remover',t:'抛光 / 封体残留去除布 380 gsm',f:'60×40 cm',m:'—',d:[],s:['去除抛光剂、Glaze、封体、镀膜和蜡的残留；镀膜擦拭（wipe-off）。','擦亮镀铬和亮面金属；清洁娇嫩表面和内饰。'],x:['毛圈编织，双面相同，无包边。'],u:MANIAC+'products-professional-cleaning-auto-exterior/polishing-and-protection/polish-sealant-remover/'},
{id:'M-be-twin',b:'M',c:'acc',n:'BE-TWIN',t:'出风口香氛',f:'6 种香型',m:'—',d:[],s:['搓包装上的 TEST 贴纸先闻香型。','把夹子插入香氛中心孔。','卡在空调出风口上。'],x:['持续约 30 天。'],u:MANIAC+'products-professional-cleaning-car-interior/cleaning-leather-fabrics-and-carpets/be-twin/'},
];
