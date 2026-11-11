// P&S Detail Products（美国 P&S Sales, Inc.，1961 年创立）产品与流程数据。2026-10 整理翻译。
// 来源：官方商城 psdetailproducts.com 的产品说明为主；比例和用法以官方商城产品图里的瓶身 / 5 加仑桶标签（DIRECTIONS）为准；
// 商城和标签都没写比例的 Absolute、Frostbite、Rags to Riches 参考美国经销商 Car Supplies Warehouse 的商品页，已在注意事项里注明。
// 收录 Double Black（Renny Doyle Collection）系列、Inspiration 镀膜系列和 Pro Series 产品（Pro Series 部分只有官方商城的产品说明，很多没有施工步骤）；
// 船艇 BABE'S、越野 Off Road、船 / 房车 / 飞机专用（Challenger）、改色膜施工液（Triple S）、ChemTROL 大桶稀释系统、香氛、抛光盘、刷具和喷壶不收录。
// 比例写法：P&S 标签写「5:1」= 5 份水 + 1 份原液，这里统一写成 1:5
import type { Flow, Product } from './types';

const PS = 'https://psdetailproducts.com/products/';
const CSW = 'https://www.carsupplieswarehouse.com/products/';

export const products: Product[] = [
// ───────────────────────── 预洗 ─────────────────────────
{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/F30_Bug_Off_NA_SDS_EN_12-25.pdf?v=1785872981","source":"ps","language":"英文","hosting":"remote"},
 id:'P-bug-off',brand:'P',category:'pre',ph:{"category":"alk","value":"12.4","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/F30_Bug_Off_NA_SDS_EN_12-25.pdf?v=1785872981","section":9},"evidence":[],"conflict":false},name:'Bug Off',type:'虫尸去除剂（洗车前预处理）',sizes:'16 oz · 32 oz · 1 gal · 5 gal',materials:'前格栅 · 饰条 · 车漆 · 保险杠',
 dilutions:[['重度虫尸','原液','喷雾壶'],['一般虫尸','1:5','喷雾壶']],
 steps:['戴好防护用品。','原液使用，或最多按 1:5 兑水。','喷在要清洁的部位，停留 1 分钟以上，让虫尸软化、松脱。','之后正常洗车，冲掉虫尸残渣。'],
 notes:['不要在阳光直射下施工；不要喷在发热的表面，也不要让它在表面干掉。','除虫剂较强，部分表面可能不耐受，每次使用前先在不显眼处测试。','标签：Pro Series F30。'],url:PS+'bug-off-insect-remover'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/Frostbite_Snow_Foam_US_EN_v1.0_DRAFT.pdf?v=1710278544","source":"ps","language":"英文","hosting":"remote"},
 id:'P-frostbite',brand:'P',category:'pre',ph:{"category":"alk","value":"9.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/Frostbite_Snow_Foam_US_EN_v1.0_DRAFT.pdf?v=1710278544","section":9},"evidence":[],"conflict":false},name:'Frostbite',type:'Surface Cleanse 雪泡预洗（泡沫枪 / 手洗两用）',sizes:'32 oz · 1 gal',materials:'车身外部',
 dilutions:[['泡沫枪','2–3 oz / 32 oz 壶','PA壶'],['手洗','1:128','桶洗']],
 steps:['泡沫枪：壶里加 2–3 oz（约 60–90 ml）原液，其余加水（壶容量 32 oz / 约 1 L）。','喷满车身，停留 3–5 分钟，不要让泡沫干掉。','用高压水冲净后再接触式洗车。','手洗：按瓶身标签 1:128 兑水。'],
 notes:['瓶身标签：高泡、可直接用于泡沫枪、手洗稀释 128:1。','泡沫枪用量按水压可调到 4–6 oz / 32 oz 壶（经销商 Car Supplies Warehouse 的说明）。','在阴凉处或气温较低时施工，避免泡沫干在车上。'],url:PS+'frostbite-surface-clesnse-snow-foam-quart'},

// ───────────────────────── 洗车香波 ─────────────────────────
{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/Pearl_Hand_Wash_NA_SDS_EN.pdf?v=1744646177","source":"ps","language":"英文","hosting":"remote"},
 id:'P-pearl',brand:'P',category:'wash',ph:{"category":"alk","value":"10","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/Pearl_Hand_Wash_NA_SDS_EN.pdf?v=1744646177","section":9},"evidence":[],"conflict":false},name:'Pearl Auto Shampoo',type:'中性浓缩洗车液（可生物降解）',sizes:'32 oz · 1 gal · 5 gal',materials:'车身外部',
 dilutions:[['桶洗（每加仑水 1 oz）','1:128','桶洗'],['较脏时 / 泡沫枪','1:80','PA壶']],
 steps:['在阴凉处、排水符合规定的洗车区施工。','每加仑（3.8 L）水加 1 oz（约 30 ml，两瓶盖）；最佳比例 1:80 – 1:128。','先冲车，再用手或泡沫枪涂上洗车液。','用洗车手套清洗后彻底冲净。','用擦干巾擦干。'],
 notes:['官网称 pH 平衡、不伤车漆也不伤手；SDS 第 9 节写原液 pH 10。泡沫稳定、润滑好。','也可以接比例稀释设备，用于手洗或洗车机。'],url:PS+'pearl-auto-shampoo-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_IRS.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-irs',brand:'P',category:'wash',ph:{"category":"alk","value":"8–9","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_IRS.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'IRS Foaming Auto Shampoo',type:'高浓缩高泡洗车香波（樱桃香，Pro Series）',sizes:'1 gal · 5 gal',materials:'车漆',
 dilutions:[['手洗 / 洗车设备','1:128','桶洗']],
 steps:['按 1:128 兑水，手洗或用洗车设备清洗。','冲洗干净。'],
 notes:['泡沫丰厚持久，冲洗性好不留痕；能去较重的脏污，又温和到可以日常使用。','官方未标 pH。'],url:PS+'irs-foaming-auto-shampoo-car-wash-soap'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Wash_Wax_0c5d3d6b-201a-42f1-9e4b-cc663ec530d1.pdf?v=1648503828","source":"ps","language":"英文","hosting":"remote"},
 id:'P-wash-wax',brand:'P',category:'wash',ph:{"category":"alk","value":"8–9","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Wash_Wax_0c5d3d6b-201a-42f1-9e4b-cc663ec530d1.pdf?v=1648503828","section":9},"evidence":[],"conflict":false},name:'Wash & Wax',type:'pH 平衡浓缩洗车香波（Pro Series）',sizes:'16 oz · 1 gal',materials:'车漆',
 dilutions:[],steps:[],
 notes:['高浓缩、pH 平衡、100% 可生物降解，适合各种洗车方式；对车漆和双手温和，清新香。','黏度较低，方便配合稀释设备使用。','官方商城未给出稀释比例和施工步骤。'],url:PS+'wash-wax-car-wash-soap'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Radiance_96a6193f-f66c-4d4e-86f2-abe5e3a6e255.pdf?v=1699558771","source":"ps","language":"英文","hosting":"remote"},
 id:'P-radiance',brand:'P',category:'wash',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Radiance_96a6193f-f66c-4d4e-86f2-abe5e3a6e255.pdf?v=1699558771","section":9},"evidence":[],"conflict":false},name:'Inspiration Radiance',type:'镀膜维护洗车液（洗后留下光泽和保护）',sizes:'32 oz · 1 gal · 5 gal',materials:'车漆 · 镀膜车',
 dilutions:[['桶洗（每加仑水 6 oz）','1:21','桶洗']],
 steps:['先把整车冲一遍，去掉浮尘。','每加仑（3.8 L）水加 6 oz（约 180 ml）。','用洗车手套或海绵洗掉污垢。','用清水彻底冲净。','用合适的麂皮或擦干巾擦干。'],
 notes:['专为 Inspiration 镀膜搭配，其他镀膜或保养良好的车漆也适用；冲洗后会留下一层光泽和保护，补强原有镀膜。','比例来自 5 加仑桶的旧版标签（当时叫 Radiance Premium Wash & Wax）。','不是打蜡的替代品；避免在阳光直射下洗车。'],url:PS+'radiance-premium-wash-wax-quart'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Absolute_Rinseless.pdf?v=1662675339","source":"ps","language":"英文","hosting":"remote"},
 id:'P-absolute',brand:'P',category:'wash',ph:{"category":"neu","value":"6.0","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Absolute_Rinseless.pdf?v=1662675339","section":9},"evidence":[],"conflict":false},name:'Absolute Rinseless Wash',type:'聚合物免冲洗洗车液（软化水质，可多用途稀释）',sizes:'32 oz · 1 gal',materials:'车漆 · 镀膜 · 改色膜 · PPF · 饰条 · 塑料 · 皮革 · 织物',
 dilutions:[['免冲洗（水桶）','1:256','桶洗'],['黏土润滑液','1:128','喷雾壶'],['快速美容剂','1:64','喷雾壶'],['玻璃 / 内饰清洁','1:256','喷雾壶']],
 steps:['水桶里每 2 加仑（约 7.6 L）水加 1 oz（约 30 ml）。','很脏的地方先用同样比例装进压力喷壶预喷，减少摩擦。','用洗车手套或毛巾逐块清洗，洗完马上擦干，不需要冲水。','其他用途按比例装进喷壶使用。'],
 notes:['官方说明：聚合物包裹并乳化污垢，加进水里立刻软化水质，减少水斑；车外车内各表面都能用。','比例来自经销商 Car Supplies Warehouse 的商品页，官方商城没有写比例。','阳光下或阴凉处都可以施工。'],url:PS+'absolute-rinseless-wash'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Epic_Waterless_Wash_-_NA_9aa794cf-5c10-45e7-a9c8-291c40b74b1c.pdf?v=1744646193","source":"ps","language":"英文","hosting":"remote"},
 id:'P-epic',brand:'P',category:'wash',ph:{"category":"alk","value":"8.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Epic_Waterless_Wash_-_NA_9aa794cf-5c10-45e7-a9c8-291c40b74b1c.pdf?v=1744646193","section":9},"evidence":[],"conflict":false},name:'Epic Waterless Wash',type:'无水洗 / 快速美容（聚合物增光）',sizes:'16 oz · 1 gal · 5 gal',materials:'车漆 · 金属 · 玻璃',
 dilutions:[['无水洗 / 快速美容','即用','喷雾壶']],
 steps:['在阴凉处、车身冷却且干燥时施工。','准备两块干净超纤布：一块擦拭，一块抛亮。','每次在约 60 × 60 cm 的范围喷一层薄雾。','用超纤布轻轻擦过喷涂区域，擦到雾膜消失。'],
 notes:['也可以当快速美容剂，或在冲洗后、擦干前喷在湿车上一起擦干。','标签：Eco-Detail Products EC37。'],url:PS+'epic-rinseless-and-waterless-wash'},

// ───────────────────────── 轮毂轮胎 ─────────────────────────
{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Brake_Buster_NA_EN_10-24.pdf?v=1744646183","source":"ps","language":"英文","hosting":"remote"},
 id:'P-brake-buster',brand:'P',category:'wheel',ph:{"category":"alk","value":"12.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Brake_Buster_NA_EN_10-24.pdf?v=1744646183","section":9},"evidence":[],"conflict":false},name:'Brake Buster',type:'轮毂 + 轮胎凝胶清洁剂（附着停留，留防锈层）',sizes:'16 oz · 32 oz · 1 gal · 5 gal',materials:'轮毂 · 轮胎',
 dilutions:[['轮毂 / 轮胎','即用','喷雾壶'],['日常维护（经销商用法）','1:5','喷雾壶']],
 steps:['尽量在轮毂冷却时施工。','在轮毂和轮胎上大量喷涂。','停留 1 分钟以上。','需要时用刷子刷洗。','用高压水枪或强水流冲净。'],
 notes:['凝胶会附着在轮毂表面，渗透污垢；同时清洁轮胎，为上轮胎油做准备，并在轮毂上留下一层防锈成分。','每次使用前在轮毂上先做局部测试，避免染色或损伤。','标签按原液使用；经销商 Car Supplies Warehouse 建议日常维护 1:5 稀释，重度污垢用原液。'],url:PS+'brake-buster-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Undressed.pdf?v=1631822783","source":"ps","language":"英文","hosting":"remote"},
 id:'P-undressed',brand:'P',category:'wheel',ph:{"category":"alk","value":"9.0","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Undressed.pdf?v=1631822783","section":9},"evidence":[],"conflict":false},name:'Undressed',type:'碱性轮胎清洁剂（去旧轮胎油和发棕）',sizes:'1 gal · 5 gal',materials:'轮胎',
 dilutions:[['重度','原液','喷雾壶'],['一般','1:10','喷雾壶']],
 steps:['按轮胎状况原液使用，或最多 1:10 兑水。','喷在要清洁的部位。','让产品作用一会儿，需要时用刷子刷。','用水冲净或擦净。'],
 notes:['碱性清洁液 + 水性溶剂 + 洗涤剂，能去掉路面污垢、旧轮胎油和油污，让白字胎更白。','官方定位为上轮胎油前的准备步骤（之后接 Dressed 或 Shine All）。','标签：Pro Series N10。'],url:PS+'undressed-tire-prep'},

// ───────────────────────── 除染 ─────────────────────────
{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Iron_Buster_NA_SDS_EN_fa4a3c3f-f8c3-4de0-b799-41c32d5aa0c5.pdf?v=1727973279","source":"ps","language":"英文","hosting":"remote"},
 id:'P-iron-buster',brand:'P',category:'deco',ph:{"category":"acid","value":"5.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Iron_Buster_NA_SDS_EN_fa4a3c3f-f8c3-4de0-b799-41c32d5aa0c5.pdf?v=1727973279","section":9},"evidence":[],"conflict":false},name:'Iron Buster',type:'中性铁粉去除剂（轮毂 + 车漆，变紫）',sizes:'16 oz · 1 gal · 5 gal',materials:'车漆 · 轮毂',
 dilutions:[['车漆 / 轮毂除铁','即用','喷雾壶']],
 steps:['车漆：先洗车并擦干，效果最好；轮毂不需要先洗。','大量喷在车漆或轮毂上。','停留 2–5 分钟，有铁粉的地方会变紫。','不要让它在表面完全干掉。','用水管或高压水枪彻底冲净，需要时重复。'],
 notes:['官网称 pH 平衡；SDS 第 9 节写原液 pH 5.5。见效快。','每次使用前在轮毂上先做局部测试。'],url:PS+'iron-buster-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Crystal_Wash_NA_SDS_EN.pdf?v=1781810313","source":"ps","language":"英文","hosting":"remote"},
 id:'P-crystal-wash',brand:'P',category:'deco',ph:{"category":"acid","value":"1.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Crystal_Wash_NA_SDS_EN.pdf?v=1781810313","section":9},"evidence":[],"conflict":false},name:'Crystal Wash',type:'有机酸除染剂（工业落尘、铁路粉尘、锈斑；干燥时结晶）',sizes:'1 gal · 5 gal',materials:'车漆 · 轮毂',
 dilutions:[['车漆 / 轮毂除染','即用','喷雾壶']],
 steps:['在阴凉处、车身冷却时施工，不要在阳光直射下用。','用喷壶喷在车漆上，避开饰条和哑光表面，以免染色。','停留让产品开始结晶。','车漆用洗车液清洗后冲净；轮毂刷洗后冲净。'],
 notes:['官方用途：镀膜施工前和轮毂清洁的预处理。','酸性清洁剂较强，部分表面不耐受，使用前先局部测试。','危险提示：可能造成严重皮肤灼伤和眼睛损伤，戴好防护用品。','标签：Pro Series K35；标签较模糊，以实物为准。'],url:PS+'crystal-wash-fallout-remover-and-surface-cleaner'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Tree_Sap_Remover_NA-en_SDS_06-26.pdf?v=1781810313","source":"ps","language":"英文","hosting":"remote"},
 id:'P-tree-sap',brand:'P',category:'deco',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Tree_Sap_Remover_NA-en_SDS_06-26.pdf?v=1781810313","section":9},"evidence":[],"conflict":false},name:'Speedy Tree Sap Remover',type:'树脂去除剂（不溶于水的树胶）',sizes:'32 oz',materials:'车漆 · 玻璃',
 dilutions:[['树脂点','即用','—']],
 steps:['倒在超纤布上，轻轻擦拭树脂。','擦掉后用快速美容剂或洗车清洁残留。'],
 notes:['适合最后的细节处理。'],url:PS+'tree-sap-remover-fallout-remover-and-surface-cleaner'},

// ───────────────────────── 研磨 / 施工前处理 ─────────────────────────
{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Intervention.pdf?v=1761694179","source":"ps","language":"英文","hosting":"remote"},
 id:'P-intervention',brand:'P',category:'polish',ph:{"category":"neu","value":"8.0","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Intervention.pdf?v=1761694179","section":9},"evidence":[],"conflict":false},name:'Intervention',type:'高效切削研磨剂（Recovery 系列第一步）',sizes:'8 oz · 32 oz',materials:'车漆',
 dilutions:[['机器抛光','即用','—']],
 steps:['选择抛光机和切削盘（羊毛、超纤或海绵切削盘都可以）。','在盘上或直接在漆面点 4–5 小滴。','轻到中等压力，每次 60 × 60 cm 或更小，去除缺陷。','保持足够的润滑，不够就补产品。','整车做完后检查缺陷去除情况，再用收光步骤抛亮。'],
 notes:['在 Rehab 的基础上加强切削，可去砂纸痕、旋纹和划痕；好擦，省时间。'],url:PS+'intervention-high-performance-compound'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Ego_Maker.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-ego-maker',brand:'P',category:'polish',ph:{"category":"neu","value":"7.2","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Ego_Maker.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Ego Maker',type:'切削研磨剂（切削后仍很亮，Double Black）',sizes:'32 oz',materials:'车漆',
 dilutions:[['机器抛光','即用','—']],
 steps:['可用于大轨迹 DA、强制旋转或旋转抛光机，各种抛光盘都可以。','去除砂纸痕、划痕和其他漆面缺陷。','之后接收光步骤（Deep Finish 或 Envy）。'],
 notes:['高纯度精制氧化铝磨料，粒径和形状控制严格，所以切削后漆面仍然亮。','不含蜡和硅油，钣喷车间可用。'],url:PS+'ego-maker-compound-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Ballistic_Compound.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-ballistic',brand:'P',category:'polish',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Ballistic_Compound.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Ballistic Max Cut Compound',type:'最强切削粗蜡（硬漆 / 玻璃钢，Pro Series）',sizes:'32 oz',materials:'各类车漆（偏硬漆面）· 玻璃钢',
 dilutions:[['重切削','即用','羊毛盘 / 海绵切削盘']],
 steps:[],
 notes:['为较硬的漆面和玻璃钢（gel coat）设计，可去除 1000 目及更细的砂纸痕，以及氧化、落尘、水斑等表面瑕疵；适用于所有漆面。','可配旋转机或大行程偏心机，搭配羊毛或海绵切削盘。','官方商城未给出施工步骤。'],url:PS+'ballistic-max-cut-compound-paint-correction'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Extracut.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-smart-extra-cut',brand:'P',category:'polish',ph:{"category":"neu","value":"7.2","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Extracut.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Smart Extra Cut Compound',type:'高效粗蜡（硬漆，不含硅 / 蜡，Pro Series）',sizes:'32 oz · 1 gal',materials:'各类车漆（偏硬漆面）',
 dilutions:[['重切削','即用','羊毛盘 / 海绵盘']],
 steps:[],
 notes:['去除砂纸痕、划痕、氧化、落尘和水斑等瑕疵，抛后表面平滑，可进入最终抛光步骤。','按需要的效果搭配传统羊毛盘或海绵盘。不含硅油和蜡。','官方商城未给出施工步骤。'],url:PS+'smart-extra-cut-compund-paint-correction'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Rehab_Correction_Creme_NA_SDS_EN.pdf?v=1781551959","source":"ps","language":"英文","hosting":"remote"},
 id:'P-rehab',brand:'P',category:'polish',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Rehab_Correction_Creme_NA_SDS_EN.pdf?v=1781551959","section":9},"evidence":[],"conflict":false},name:'Rehab Correction Creme',type:'多用途研磨剂（切削到收光都能做）',sizes:'8 oz · 32 oz · 1 gal',materials:'车漆',
 dilutions:[['机器抛光','即用','—']],
 steps:['按漆面硬度选择抛光盘和机器：切削盘做切削，收光盘做收光。','点几小滴在盘上，每次 60 × 60 cm，抛到缺陷去除。','用超纤布擦净检查。'],
 notes:['切削力随漆面硬度、抛光盘和机器而变，可以从强切削一直做到收光；搭配各种海绵盘效果都很好。','可去除砂纸痕、旋纹和划痕。'],url:PS+'rehab-correction-creme-quart'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Deep_Finish.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-deep-finish',brand:'P',category:'polish',ph:{"category":"neu","value":"7.2","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Deep_Finish.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Deep Finish',type:'中度整平抛光剂（一步出深度和光泽）',sizes:'32 oz',materials:'车漆',
 dilutions:[['机器抛光','即用','—']],
 steps:['在 Ego Maker 之后，或直接用于一般旋纹的漆面。','点几小滴在抛光盘上，每次 60 × 60 cm 抛到缺陷去除。','用超纤布擦净检查。'],
 notes:['除了日常旋纹，也能去掉接近完美时才显出来的最后一些细痕；适合难处理的漆面，一步出光。','不含蜡和硅油，钣喷车间可用。'],url:PS+'deep-finish-restoration-polish-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Full_Throttle.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-full-throttle',brand:'P',category:'polish',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Full_Throttle.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Full Throttle Cleaner Polish',type:'中等研磨一步抛光（Pro Series）',sizes:'32 oz · 1 gal',materials:'车漆',
 dilutions:[['一步抛光','即用','羊毛盘 / 海绵盘']],
 steps:[],
 notes:['去除砂纸痕、太阳纹、划痕和轻到中度氧化，一步抛出亮度和深度；钣喷店和美容店都适用。','可配传统羊毛盘或海绵盘。','官方商城未给出施工步骤。'],url:PS+'full-throttle-cleaner-polish-paint-correction'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Therapy_Final_Polish_NA_SDS_EN.pdf?v=1781810313","source":"ps","language":"英文","hosting":"remote"},
 id:'P-therapy',brand:'P',category:'polish',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Therapy_Final_Polish_NA_SDS_EN.pdf?v=1781810313","section":9},"evidence":[],"conflict":false},name:'Therapy',type:'收光抛光剂（Recovery 系列最后一步）',sizes:'8 oz · 32 oz',materials:'车漆',
 dilutions:[['机器抛光','即用','—']],
 steps:['主要配收光海绵盘，特殊情况也可用羊毛或超纤盘。','在盘上点 4–5 小滴。','轻到中等压力，每次 60 × 60 cm 或更小，抛出光泽。','保持润滑，抛完用超纤布擦净检查。'],
 notes:['在 Rehab 的基础上调得更细，适合需要轻手的软漆。'],url:PS+'therapy-final-polish'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Headlight_Compound_163cf816-1ba2-42e0-a9ee-72b1489b1185.pdf?v=1651788054","source":"ps","language":"英文","hosting":"remote"},
 id:'P-headlight-compound',brand:'P',category:'polish',ph:{"category":"neu","value":"7.2","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Headlight_Compound_163cf816-1ba2-42e0-a9ee-72b1489b1185.pdf?v=1651788054","section":9},"evidence":[],"conflict":false},name:'Headlight Restoration Compound',type:'大灯翻新研磨剂（Pro Series）',sizes:'32 oz',materials:'大灯灯罩',
 dilutions:[['研磨','即用','羊毛盘 / 海绵盘']],
 steps:[],
 notes:['去除大灯灯罩上的砂纸痕、氧化和表面瑕疵，抛后表面平滑，可进入最终抛光步骤。','按需要的效果搭配传统羊毛盘或海绵盘。','之后用 Headlight Restoration Polish 收光。官方商城未给出施工步骤。'],url:PS+'headlight-restoration-compound-paint-correction'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Headlight_Polish_7da652d1-2f32-4abf-9fa9-14af67298330.pdf?v=1651788162","source":"ps","language":"英文","hosting":"remote"},
 id:'P-headlight-polish',brand:'P',category:'polish',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Headlight_Polish_7da652d1-2f32-4abf-9fa9-14af67298330.pdf?v=1651788162","section":9},"evidence":[],"conflict":false},name:'Headlight Restoration Polish',type:'大灯翻新抛光剂（Pro Series）',sizes:'32 oz',materials:'大灯灯罩',
 dilutions:[['抛光','即用','羊毛盘 / 海绵盘']],
 steps:[],
 notes:['去除大灯上的旋纹和划痕，恢复光学透明度；中等研磨，一步抛出亮度。','可配传统羊毛盘或海绵盘。官方商城未给出施工步骤。'],url:PS+'headlight-restoration-polish-paint-correction'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Metal_Bright.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-metal-brite',brand:'P',category:'polish',ph:{"category":"na","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Metal_Bright.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Metal Brite',type:'液体金属抛光剂（Pro Series）',sizes:'16 oz',materials:'镀铬 · 铝 · 铜 · 黄铜等金属 · 轮毂',
 dilutions:[],steps:[],
 notes:['清洁、抛光并保护镀铬、铝、铜、黄铜等金属，快速去除氧化、锈蚀和残留，让轮毂和车上金属件恢复展车光泽。','曾用于抛光波音 707「空军一号」SAM970 等历史飞机。','官方商城未给出施工步骤。'],url:PS+'metal-brite-liquid-metal-polish-paint-correction'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Envy.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-envy',brand:'P',category:'polish',ph:{"category":"neu","value":"7.2","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Envy.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Envy',type:'珠宝级收光抛光剂（无填充，适合镀膜前）',sizes:'16 oz',materials:'车漆',
 dilutions:[['机器抛光','即用','—']],
 steps:['可用于大轨迹 DA、强制旋转或传统抛光机。','作为最后一步收光，抛出湿润、深邃的光泽。'],
 notes:['超细磨料，不含填充物，光泽不会被填充物掩盖后又消失，适合接镀膜。'],url:PS+'envy-jeweling-polish-doubleblack-collection'},

{
 sds:{"url":"/sds/P-paint-prep.pdf","source":"mvp","language":"英文","version":"2017-03-06","hosting":"local","sha256":"f3fb3200807577b44750c5c7d8e57c56494e10896cd3a7d56fd234a0018eff58","originalUrl":"https://cdn.shopify.com/s/files/1/0026/8763/1409/files/SDS_Paint_Prep.pdf?v=1597940254","checkedAt":"2026-11-10"},
 id:'P-paint-prep',brand:'P',category:'polish',name:'Paint Coating Surface Prep',type:'镀膜前脱脂（也可清洁玻璃）',sizes:'16 oz · 1 gal',materials:'车漆 · 玻璃',
 dilutions:[['镀膜前脱脂','即用','喷雾壶']],
 steps:['抛光完成后施工。','大量喷在漆面上，让表面完全湿润。','停留 30 秒，用超纤布擦净，勤翻毛巾。','整车重复，镀膜前仔细检查漆面。'],
 notes:['专为 Inspiration 镀膜配套，去除蜡、硅油等影响镀膜附着的残留。','瓶身也写作「Paint Prep and Glass Cleaner」；官方推荐的玻璃镀膜流程也用它在 VUE 前处理玻璃。'],url:PS+'paint-coating-surface-prep-doubleblack-collection'},

// ───────────────────────── 镀膜 ─────────────────────────
{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Inspiration.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-inspiration-classic',brand:'P',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Inspiration.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Inspiration Classic',type:'专业陶瓷镀膜（车漆 · 轮毂 · 饰条）',sizes:'30 ml · 50 ml',materials:'车漆 · 轮毂 · 塑料饰条',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:['施工前必须完成整车抛光。','用 Paint Coating Surface Prep 清洁漆面。','按包装内的培训说明施工。','施工后至少 2–3 小时不要让车淋雨或暴露在外；48–72 小时完全固化。'],
 notes:['官方定位为专业产品，不建议未受训练的人施工；可在 inspirationcoating.com 申请认证施工店。','套装含 30 ml 镀膜、施工块、说明书和门框标签。','可罩 SOLE 或 Defender 作面层；日常用 Radiance 洗车。'],url:PS+'inspiration-ceramic-coating-30ml-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/2024_SDS_Stout_Ultimate_Ceramic_Coating_C3330.pdf?v=1732311035","source":"ps","language":"英文","hosting":"remote"},
 id:'P-stout',brand:'P',category:'coat',ph:{"category":"acid","value":"5–5.6","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/2024_SDS_Stout_Ultimate_Ceramic_Coating_C3330.pdf?v=1732311035","section":9},"evidence":[],"conflict":false},name:'Inspiration STOUT',type:'全能陶瓷镀膜（车漆、饰条、轮毂通用）',sizes:'30 ml · 50 ml',materials:'车漆 · 塑料饰条 · 轮毂',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:['完成抛光和脱脂（Paint Coating Surface Prep）。','用附带的施工块涂抹。','等它闪干 30 秒–2 分钟（看环境），用干净超纤布流平。','用第二块布擦净残留。','需要多层时，层间间隔 1 小时。','24 小时内不要淋水、不要碰化学品。'],
 notes:['Inspiration 系列最新的一款，强调好施工、高光泽和疏水。','闪干、层间和固化时间来自经销商 Car Supplies Warehouse 的商品页，以包装说明为准。'],url:PS+'inspiration-stout'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Inspiration_SOLE.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-sole',brand:'P',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Inspiration_SOLE.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Inspiration SOLE',type:'一年期镀膜 / Classic 的面层',sizes:'50 ml · 100 ml',materials:'车漆',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:['单独使用：抛光、Paint Coating Surface Prep 脱脂后施工，作为一年期镀膜。','作面层：在 Inspiration Classic 上直接罩一层，增加保护。','每年在 Classic 上补一层作为维护镀膜。'],
 notes:['比 Classic 好施工，专业和资深爱好者都能用；官方仍建议由专业人员施工。','100 ml 套装含施工块和 4 张门框标签。'],url:PS+'inspiration-sole-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Inspiration_Vue.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-vue',brand:'P',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Inspiration_Vue.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Inspiration VUE',type:'玻璃镀膜（6 个月以上）',sizes:'30 ml',materials:'车外玻璃',
 dilutions:[['玻璃镀膜（施工块）','即用','—']],
 steps:['用 Clarity Creme 研磨玻璃。','用 Paint Coating Surface Prep 清洁玻璃。','用附带的施工块涂 VUE。'],
 notes:['一瓶 30 ml 可做 10 块以上前挡。','官方定位为专业产品，需按规范施工。'],url:PS+'inspiration-vue-glass-coating-doubleblack-collection'},

// ───────────────────────── 封体 / 快速养护 ─────────────────────────
{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Bead_Maker_US_SDS_8de6acc3-b9d0-45fa-871e-ed89170305df.pdf?v=1727973279","source":"ps","language":"英文","hosting":"remote"},
 id:'P-bead-maker',brand:'P',category:'seal',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Bead_Maker_US_SDS_8de6acc3-b9d0-45fa-871e-ed89170305df.pdf?v=1727973279","section":9},"evidence":[],"conflict":false},name:'Bead Maker',type:'喷雾封体（湿车干车都能用，强拨水）',sizes:'16 oz · 32 oz · 1 gal · 5 gal',materials:'车漆 · 玻璃 · 塑料饰条 · 轮毂',
 dilutions:[['湿车 / 干车喷涂','即用','喷雾壶']],
 steps:['先洗车；需要时先用黏土处理漆面。','喷在漆面上；湿车、干车都可以，干车施工效果更好。','用超纤布擦掉，需要时翻面，确保擦净。','整车重复。','至少固化 8 小时，效果最好。'],
 notes:['聚合物会迁移到漆面、交联成疏水保护层，含 UV 吸收剂；新漆或刚美容过的车效果最好。','官方商城写固化约 2 小时（看环境），5 加仑桶标签写至少 8 小时。'],url:PS+'beadmaker-paint-protectant-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Spray_It.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-spray-it',brand:'P',category:'seal',ph:{"category":"neu","value":"6.8","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Spray_It.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Spray-It Quick Polymer Wax',type:'聚合物喷蜡（擦干时顺便上蜡，Pro Series）',sizes:'16 oz · 1 gal',materials:'车身外部各类表面',
 dilutions:[['湿车 / 干车','即用','喷雾壶']],
 steps:['洗车后可在擦干车身时一起喷涂施工，湿车、干车都可以用。'],
 notes:['聚合物蜡，一步得到持久亮光，可安全喷在所有外部表面上。'],url:PS+'spray-it-quick-polymer-wax-paint-protection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Matte_Finish.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-matte-protectant',brand:'P',category:'seal',ph:{"category":"neu","value":"7.2","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Matte_Finish.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Matte Finish Protectant',type:'哑光漆保护剂',sizes:'32 oz',materials:'哑光漆',
 dilutions:[],steps:[],
 notes:['保持哑光漆原有的外观并增加一层保护；不要在哑光漆上用普通蜡，会先变亮再不均匀地发雾。','瓶身标注：可在湿车漆上施工，不留蜡残留。','官方商城未给出施工步骤。'],url:PS+'matte-finish-protectant-paint-protection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Defender_US_SDS_05-26.pdf?v=1781810313","source":"ps","language":"英文","hosting":"remote"},
 id:'P-defender',brand:'P',category:'seal',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Defender_US_SDS_05-26.pdf?v=1781810313","section":9},"evidence":[],"conflict":false},name:'Inspiration Defender',type:'SiO₂ 喷雾封体（镀膜面层 / 单独使用）',sizes:'16 oz · 1 gal',materials:'车漆 · 金属 · 玻璃 · 塑料饰条',
 dilutions:[['喷上擦掉','即用','喷雾壶']],
 steps:['作镀膜面层时，等镀膜定型后再施工，一般至少 1 小时。','尽量在车身冷却、避开阳光的地方施工。','直接喷在漆面上，或喷在超纤布上擦。','在约 90 × 90 cm 的范围内均匀抹开，稍等片刻，翻面擦亮。','整车重复。'],
 notes:['可作 Inspiration 和其他镀膜的面层 / 维护，也可单独作 SiO₂ 保护。'],url:PS+'defender-sio2-protectant'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Paint_Gloss_US_SDS_05-26.pdf?v=1781810312","source":"ps","language":"英文","hosting":"remote"},
 id:'P-paint-gloss',brand:'P',category:'seal',ph:{"category":"neu","value":"7.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Paint_Gloss_US_SDS_05-26.pdf?v=1781810312","section":9},"evidence":[],"conflict":false},name:'Paint Gloss',type:'展厅级快速美容剂（也可当黏土润滑液）',sizes:'16 oz · 1 gal · 5 gal',materials:'车漆',
 dilutions:[['快速美容 / 黏土润滑','即用','喷雾壶']],
 steps:['先洗车；最好在阴凉处、车漆冷却时施工。','在 60 × 60 cm 的漆面上轻喷一层。','用干净的超纤布擦拭并抛亮。','当黏土润滑液时多喷一些，保证足够润滑。'],
 notes:['水性，去掉灰尘、指纹和污迹，不用做整车美容；配合 Perfect Putty 黏土使用。'],url:PS+'paint-gloss-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Dream_Maker_NA_SDS_EN_06-26.pdf?v=1781810313","source":"ps","language":"英文","hosting":"remote"},
 id:'P-dream-maker',brand:'P',category:'seal',ph:{"category":"alk","value":"8.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Dream_Maker_NA_SDS_EN_06-26.pdf?v=1781810313","section":9},"evidence":[],"conflict":false},name:'Dream Maker',type:'车展光泽增强喷雾（McCall 车队版）',sizes:'16 oz · 1 gal',materials:'车漆',
 dilutions:[['喷上擦亮','即用','喷雾壶']],
 steps:['喷在干净的漆面上。','用超纤布擦开、抛亮。'],
 notes:['为蒙特雷车展周的 McCall 美容团队开发：提升单工序漆和清漆的光泽。','可以叠在 Bead Maker 等现有保护上。','瓶身：交车前处理、车展日增艳、适用所有漆面。'],url:PS+'dream-maker-gloss-amplifier'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Ultracoat_Paint_Sealant_-_NA_7325207a-09b9-45ca-83e9-c136ce60a1d4.pdf?v=1744646198","source":"ps","language":"英文","hosting":"remote"},
 id:'P-ultracoat',brand:'P',category:'seal',name:'Ultracoat Paint Sealant',type:'聚合物 + 聚氨酯漆面封体（Pro Series 最持久）',sizes:'32 oz · 1 gal',materials:'聚氨酯清漆 · 硝基漆 · 瓷漆',
 dilutions:[['手工 / 轨道机','即用','—']],
 steps:[],
 notes:['P&S 同类中最持久、光泽最高、手感最丝滑的一款，适用所有颜色。','可手工或用轨道抛光机施工。官方商城未给出施工步骤。'],url:PS+'ultracoat-paint-sealant-paint-protection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Velocity.pdf?v=1631822783","source":"ps","language":"英文","hosting":"remote"},
 id:'P-velocity-glaze',brand:'P',category:'seal',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Velocity.pdf?v=1631822783","section":9},"evidence":[],"conflict":false},name:'Velocity Glaze',type:'乳液快速釉蜡（Pro Series）',sizes:'16 oz · 1 gal',materials:'汽车 · 货车 · 摩托车 · 船 · 飞机漆面',
 dilutions:[['手工 / 轨道机 / 偏心机','即用','—']],
 steps:[],
 notes:['快速提亮漆面；乳液质地易涂抹，擦除时不起粉尘。','可作快速手工蜡、轨道机蜡或偏心机抛光剂使用；配方偏湿润，适合深色或难打蜡的漆面。','官方商城未给出施工步骤。'],url:PS+'velocity-glaze-paint-protection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Cherry_Wax.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-cherry-speed-wax',brand:'P',category:'seal',ph:{"category":"neu","value":"7.2","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Cherry_Wax.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Cherry Speed Wax',type:'快干液体糊蜡（轻度清洁 + 增光，Pro Series）',sizes:'16 oz · 1 gal',materials:'汽车 · 货车 · 摩托车 · 飞机 · 船漆面',
 dilutions:[['手工 / 轨道机 / 偏心机 / 变速抛光机','即用','—']],
 steps:[],
 notes:['快干的快速蜡，增加深度和保护，同时轻度清洁漆面；适合日常和快速美容。','官方商城未给出施工步骤。'],url:PS+'cherry-speed-wax-paint-protection'},

// ───────────────────────── 塑料 / 轮胎养护 ─────────────────────────
{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Shine_All_81b32979-671f-4e6c-b3a0-f3896c2f3baa.pdf?v=1678488513","source":"ps","language":"英文","hosting":"remote"},
 id:'P-shine-all',brand:'P',category:'trim',ph:{"category":"neu","value":"8.0","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Shine_All_81b32979-671f-4e6c-b3a0-f3896c2f3baa.pdf?v=1678488513","section":9},"evidence":[],"conflict":false},name:'Shine All',type:'水性高光轮胎油（也可用于内饰）',sizes:'16 oz · 1 gal · 5 gal',materials:'轮胎 · 橡胶 · 人造革 · 皮革',
 dilutions:[['高光','即用','—'],['降低光泽 / 节省用量','兑水（比例自定）','—']],
 steps:['先把要上油的部位清洁、擦干。','喷涂或用施工块手涂，用量看效果需要。','等它干成光亮效果，擦掉多余的。'],
 notes:['主要是即用产品；想降低光泽或节省用量时可以兑水，标签没有给固定比例。','虽然主要用于外饰，也可以保养内饰的橡胶、人造革和皮革。'],url:PS+'shine-all-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Bumpercoat.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-bumpercoat',brand:'P',category:'trim',ph:{"category":"neu","value":"7.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Bumpercoat.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Bumpercoat',type:'浓缩高光橡胶 / 乙烯基保养剂（硅油型）',sizes:'32 oz',materials:'黑色保险杠 · 橡胶饰条 · 饰条 · 密封条',
 dilutions:[],steps:[],
 notes:['浓稠的硅油液体，恢复并保护褪色的黑色保险杠和橡胶饰条；收尾时也能遮盖饰条纹理里残留的蜡。','官方商城未给出施工步骤。'],url:PS+'bumpercoat-dressings-interior-exterior'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_RVS_198965c4-38a8-4cfa-a73e-7ea387a58c79.pdf?v=1755619702","source":"ps","language":"英文","hosting":"remote"},
 id:'P-rubber-vinyl-shine',brand:'P',category:'trim',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_RVS_198965c4-38a8-4cfa-a73e-7ea387a58c79.pdf?v=1755619702","section":9},"evidence":[],"conflict":false},name:'Rubber & Vinyl Shine',type:'水性硅油保养剂（经济型，Pro Series）',sizes:'1 gal · 5 gal',materials:'内外饰皮革 · 乙烯基 · 橡胶',
 dilutions:[],steps:[],
 notes:['调理、软化、保护皮革、乙烯基和橡胶，内外饰都能上光；成本较低的通用保养剂。','官方商城未给出施工步骤。'],url:PS+'rubber-and-vinyl-shine-dressings-interior-dressings'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Shape_Up.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-shape-up',brand:'P',category:'trim',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Shape_Up.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Shape-Up',type:'水性硅油乙烯基 / 橡胶保养剂（柠檬香）',sizes:'16 oz · 1 gal · 5 gal',materials:'内外饰皮革 · 乙烯基 · 橡胶',
 dilutions:[],steps:[],
 notes:['调理、软化、保护皮革、乙烯基和橡胶，内外饰都呈自然光泽；带柠檬香，保养同时除味。','官方商城未给出施工步骤。'],url:PS+'shape-up-dressings-interior-exterior'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_L450_No_Rub_Polish.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-no-rub',brand:'P',category:'trim',ph:{"category":"na","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_L450_No_Rub_Polish.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'No Rub Aerosol Coating',type:'免擦喷罐保养剂',sizes:'9 oz 喷罐',materials:'塑料 · 橡胶 · 乙烯基 · 空调出风口 · 中控 · 饰条 · 保险杠',
 dilutions:[['塑料 / 橡胶 / 乙烯基','即用','—']],
 steps:['喷在要保养的部位，不需要擦。'],
 notes:['又称「罐装美容」，适合快速修补出风口、中控、饰条和保险杠的外观。'],url:PS+'no-rub-dressings-interior-exterior'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Dressed.pdf?v=1648488530","source":"ps","language":"英文","hosting":"remote"},
 id:'P-dressed',brand:'P',category:'trim',ph:{"category":"neu","value":"6.8","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Dressed.pdf?v=1648488530","section":9},"evidence":[],"conflict":false},name:'Dressed',type:'聚合物水性轮胎油（缎面到高光）',sizes:'1 gal · 5 gal',materials:'轮胎',
 dilutions:[['轮胎','即用','—']],
 steps:['先用 Undressed 清洁轮胎并擦干。','用刷子（效果最好）或喷壶涂在轮胎上。'],
 notes:['100 % 水性、不属于危险品，用聚合物模拟溶剂型硅油轮胎油的效果，只用于轮胎。','即用产品；5 加仑桶背标的用法文字与 Undressed 相同，以实际用途为准。','标签：Pro Series L14。'],url:PS+'dressed-tire-finish'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Island_Shine_50b3f8ee-de45-40ec-88e0-d24a24ca466a.pdf?v=1667929796","source":"ps","language":"英文","hosting":"remote"},
 id:'P-island-shine',brand:'P',category:'trim',ph:{"category":"neu","value":"8.0","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Island_Shine_50b3f8ee-de45-40ec-88e0-d24a24ca466a.pdf?v=1667929796","section":9},"evidence":[],"conflict":false},name:'Island Shine',type:'高性能水性轮胎 / 饰件保养剂（Pro Series）',sizes:'1 gal · 5 gal',materials:'轮胎 · 外饰 · 内饰皮革 / 橡胶 / 乙烯基',
 dilutions:[],steps:[],
 notes:['为洗车房的工业化轮胎上光开发，让轮胎呈亮光；也可用于内外饰件，可调理、软化并保护皮革、橡胶和乙烯基。','可按需要加水稀释（官方未给比例）。官方商城未给出施工步骤。'],url:PS+'island-shine-dressings-interior-exterior'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/Multi_Dressing_NA_SDS_EN.pdf?v=1744646170","source":"ps","language":"英文","hosting":"remote"},
 id:'P-multi-dressing',brand:'P',category:'trim',name:'Multi-Dressing（VOC 合规）',type:'溶剂 + 硅油型多用途保养剂（蓝色，Pro Series）',sizes:'1 gal · 5 gal',materials:'轮胎 · 饰条 · 保险杠 · 乙烯基座椅 · 中控 · 乙烯基车顶',
 dilutions:[],steps:[],
 notes:['精选硅油配方，在轮胎和其他部位上光泽饱满；内外饰都可以用。','官方商城未给出施工步骤。'],url:PS+'multi-dressing-voc-compliant-dressings-interior-exterior'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_WNS.pdf?v=1631822783","source":"ps","language":"英文","hosting":"remote"},
 id:'P-wipe-n-shine',brand:'P',category:'trim',ph:{"category":"neu","value":"7.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_WNS.pdf?v=1631822783","section":9},"evidence":[],"conflict":false},name:'Wipe N Shine',type:'凝胶型轮胎 / 饰件保养剂（Pro Series）',sizes:'16 oz · 1 gal · 5 gal',materials:'轮胎 · 外饰 · 内饰乙烯基与橡胶',
 dilutions:[['轮胎 / 饰件','即用','施工块 / 毛巾']],
 steps:['直接擦涂在要保养的表面上，不需要喷壶；干、湿状态都可以施工。'],
 notes:['光泽在擦上后很快显现并逐渐变好；用于轮胎时不会流挂、不会甩到地上。'],url:PS+'wipe-n-shie-dressings-interior-exterior'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Dynamic_Dressing.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-dynamic',brand:'P',category:'trim',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Dynamic_Dressing.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Dynamic Dressing',type:'浓缩多用途保养剂（光泽可调）',sizes:'1 gal（浓缩）· 16 oz（即用版）',materials:'轮胎 · 外饰塑料 · 发动机舱 · 底盘 · 内饰塑料 · 皮革 · 人造革',
 dilutions:[['高光','1:1','喷雾壶'],['自然光泽','1:4','喷雾壶']],
 steps:['按需要的光泽兑水：1:1 高光，1:4 自然。','喷涂或用施工块涂抹，擦掉多余的。'],
 notes:['一个产品就能用在轮胎、外饰、发动机舱、底盘和内饰。','16 oz 的 Ready To Use 版就是 1:4 稀释好的版本。'],url:PS+'dynamic-dressing'},

// ───────────────────────── 玻璃 ─────────────────────────
{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Tru_Vue_a75db59f-8f7a-4aa7-b2f8-9b1c2a13e679.pdf?v=1727973279","source":"ps","language":"英文","hosting":"remote"},
 id:'P-true-vue',brand:'P',category:'glass',ph:{"category":"acid","value":"5.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Tru_Vue_a75db59f-8f7a-4aa7-b2f8-9b1c2a13e679.pdf?v=1727973279","section":9},"evidence":[],"conflict":false},name:'True Vue',type:'水性玻璃清洁剂（即用版 / 浓缩版）',sizes:'16 oz（即用）· 1 gal · 5 gal（浓缩）',materials:'车内外玻璃',
 dilutions:[['即用版','即用','喷雾壶'],['浓缩版','1:4 – 1:10','喷雾壶']],
 steps:['喷在玻璃或玻璃布上。','用干净的玻璃布擦干净，再用干布擦亮。'],
 notes:['去除路面油膜、烟渍和污垢；热天工作时间长，冷天挥发也够快。','浓缩版按需要的效果 1:4 – 1:10 稀释。'],url:PS+'true-vue-rtu-doubleblack-collection'},


{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Paste_Glass_Chrome.pdf?v=1720460853","source":"ps","language":"英文","hosting":"remote"},
 id:'P-paste-glass-chrome',brand:'P',category:'glass',ph:{"category":"na","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Paste_Glass_Chrome.pdf?v=1720460853","section":9},"evidence":[],"conflict":false},name:'Paste Glass & Chrome',type:'玻璃 / 镀铬清洁膏（玻璃蜡）',sizes:'—',materials:'玻璃 · 镀铬',
 dilutions:[['玻璃 / 镀铬','即用','—']],
 steps:['涂在玻璃上，干成一层薄雾。','擦掉即可，不留条纹和残留。'],
 notes:['俗称「玻璃蜡」，可去除玻璃和镀铬上的重污、虫尸和水斑。'],url:PS+'paste-glass-chrome-glass-cleaner'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Reflect_Glass_Cleaner_NA_EN.pdf?v=1744646188","source":"ps","language":"英文","hosting":"remote"},
 id:'P-reflect',brand:'P',category:'glass',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Reflect_Glass_Cleaner_NA_EN.pdf?v=1744646188","section":9},"evidence":[],"conflict":false},name:'REFLECT Glass Finisher',type:'玻璃清洁 + SiO₂ 保护（车内外）',sizes:'16 oz · 1 gal',materials:'车内外玻璃',
 dilutions:[['玻璃','即用','喷雾壶']],
 steps:['先擦掉或洗掉玻璃上的重污。','直接在玻璃上均匀喷一层薄雾；大面积分区施工。','用干净干燥的超纤布把产品抛进玻璃。','翻到干面继续擦，直到清晰无痕。'],
 notes:['留下一层 SiO₂ 保护，拨水、减少 UV 老化和污垢附着，以后更好清洁。','在阴凉处施工，避开阳光直射和发热的玻璃，以免留痕。'],url:PS+'reflect-glass-finisher'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Clarity_Creme.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-clarity',brand:'P',category:'glass',ph:{"category":"na","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Clarity_Creme.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Clarity Creme',type:'玻璃研磨乳（去水垢、矿物沉积、雨刷痕）',sizes:'16 oz',materials:'车外玻璃',
 dilutions:[['手工 / 机器研磨','即用','—']],
 steps:['先洗玻璃，需要时用黏土处理。','轻度：用超纤布手工研磨；中度以上：用机器配海绵或羊毛盘（看严重程度）。','手工或机器都用重叠的路线研磨，直到玻璃恢复原状，需要时重复。','完成后让残留干成雾状，再擦亮。'],
 notes:['也用于 Inspiration VUE 玻璃镀膜前的研磨。'],url:PS+'clarity-creme-glass-polish-doubleblack-collection'},

// ───────────────────────── 内饰 ─────────────────────────
{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Xpress_Interior_NA_SDS_EN_ecac1c78-38ff-490c-bbaa-3e3b77a04e76.pdf?v=1727973279","source":"ps","language":"英文","hosting":"remote"},
 id:'P-xpress',brand:'P',category:'int',ph:{"category":"alk","value":"8.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Xpress_Interior_NA_SDS_EN_ecac1c78-38ff-490c-bbaa-3e3b77a04e76.pdf?v=1727973279","section":9},"evidence":[],"conflict":false},name:'Xpress Interior Cleaner',type:'内饰多表面清洁剂（皮革、人造革、塑料）',sizes:'16 oz · 32 oz · 1 gal · 5 gal',materials:'皮革 · 人造革 · 内饰塑料',
 dilutions:[['重度','原液','喷雾壶'],['一般','1:1','喷雾壶']],
 steps:['先在不显眼处测试。','原液使用，或最多 1:1 兑水。','喷足量直到起泡。','用毛巾、软毛刷、百洁布或魔术擦等工具刷洗。','刷完用拧湿的毛巾擦净。','需要时再上 Leather Treatment 或其他保养剂提升外观。'],
 notes:['清洁不会让表面变干、变色或受损，擦完没有残留。'],url:PS+'xpress-interior-cleaner-doubleblack-collection'},

{id:'P-xpress-wipes',brand:'P',category:'int',name:'Xpress Interior Wipes',type:'内饰清洁湿巾',sizes:'—',materials:'皮革 · 乙烯基 · 塑料',
 dilutions:[],steps:['直接用湿巾擦拭要清洁的表面。'],
 notes:['与 Xpress Interior Cleaner 同类的湿巾版：清洁不发干、不褪色、不伤表面，擦后不留残留；能去污垢、油脂和日常使用留下的痕迹。','也可擦抛光机、工具箱等。'],url:PS+'xpress-interior-wipes'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Odor_Doc_US.pdf?v=1781537764","source":"ps","language":"英文","hosting":"remote"},
 id:'P-odor-doc',brand:'P',category:'int',name:'Odor Doc',type:'二氧化氯熏蒸除味套装',sizes:'单件',materials:'车内（封闭空间）',
 dilutions:[],
 steps:['处理前确保车内已清洁并干燥。','释放二氧化氯蒸汽熏蒸，处理约需 1 小时。'],
 notes:['以蒸汽释放的广谱杀菌剂，去除细菌、霉菌和烟味等顽固异味；官方称强度是传统二氧化氯处理的 8 倍。','官方商城未给出更详细的操作步骤；按包装说明操作。'],url:PS+'odor-doc-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Swift.pdf?v=1685482411","source":"ps","language":"英文","hosting":"remote"},
 id:'P-swift',brand:'P',category:'int',ph:{"category":"alk","value":"8.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Swift.pdf?v=1685482411","section":9},"evidence":[],"conflict":false},name:'Swift Clean & Shine',type:'内饰清洁 + 上光二合一快速美容',sizes:'16 oz · 1 gal · 5 gal',materials:'皮革 · 人造革 · 内饰塑料',
 dilutions:[['内饰快速美容','即用','喷雾壶']],
 steps:['用前摇匀。','喷在表面、施工海绵或 Xpress Side Kick 刷洗垫上。','需要时刷洗到干净。','擦掉多余的产品，擦到想要的效果。'],
 notes:['清洁后留下有保养感的上光效果，气味宜人。'],url:PS+'swift-clean-shine'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_APC.pdf?v=1631822781","source":"ps","language":"英文","hosting":"remote"},
 id:'P-apc',brand:'P',category:'apc',ph:{"category":"alk","value":"11","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_APC.pdf?v=1631822781","section":9},"evidence":[],"conflict":false},name:'All Purpose Cleaner',type:'浓缩通用清洁剂（Pro Series）',sizes:'1 gal · 5 gal',materials:'乙烯基 · 橡胶 · 地毯脚垫 · 轮胎 · 轮毂 · 织物 · 轮拱 · 发动机舱',
 dilutions:[['最高稀释','1:15','喷雾壶']],
 steps:['先小面积测试。','用原液或稀释后的溶液喷在要清洁的部位，短暂作用，需要时刷洗。','用水冲洗，或用湿毛巾擦净。'],
 notes:['高效、可生物降解，能分解油脂、去除污垢；适合车流量大、注重成本的美容店。','最高稀释比例 1:15 和施工步骤参考自美国经销商 Car Supplies Warehouse 的商品页和桶身标签。'],url:PS+'all-purpose-cleaner-cleaners-interior-cleaners'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Blast.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-blast',brand:'P',category:'apc',ph:{"category":"alk","value":"11","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Blast.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Blast Super Cleaner',type:'浓缩多用途强力清洁剂（Pro Series）',sizes:'1 gal',materials:'发动机 · 轮毂 · 轮胎 · 乙烯基 · 地毯 · 织物',
 dilutions:[],steps:[],
 notes:['洗涤剂加水性溶剂，松动发动机、轮毂、轮胎、乙烯基、地毯和织物上的油污。','顽固污渍可用原液，轻度清洁加水稀释（官方未给比例）。官方商城未给出施工步骤。'],url:PS+'blast-super-cleaner-cleaners-interior-cleaners'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/Hot_Shot_Degreaser_NA_SDS_EN.pdf?v=1744643780","source":"ps","language":"英文","hosting":"remote"},
 id:'P-hot-shot',brand:'P',category:'apc',ph:{"category":"alk","value":"> 13","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/Hot_Shot_Degreaser_NA_SDS_EN.pdf?v=1744643780","section":9},"evidence":[],"conflict":false},name:'Hot Shot',type:'强力除油浓缩液（Pro Series）',sizes:'1 gal',materials:'发动机及零件 · 轮毂 · 轮胎 · 底盘',
 dilutions:[['最高稀释','1:15','喷雾壶']],
 steps:[],
 notes:['高效、可生物降解的洗涤剂和溶剂，彻底溶解油脂和污垢；顽固处可用原液。','最高稀释比例 1:15 来自美国经销商 Car Supplies Warehouse 的商品页。官方商城未给出施工步骤。'],url:PS+'hot-shot-high-power-deg-cleaners-hd-cleaners'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Enviro.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-enviro-clean',brand:'P',category:'apc',ph:{"category":"alk","value":"10.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Enviro.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Enviro-Clean',type:'柑橘浓缩清洁除油剂',sizes:'16 oz',materials:'地毯 · 乙烯基 · 发动机 · 轮拱 · 车漆',
 dilutions:[['视用途','1:4 – 1:20','喷雾壶']],
 steps:[],
 notes:['柑橘衍生物、可生物降解清洁剂和水性溶剂，溶解油脂、带走污垢，冲走其他清洁剂留下的颗粒和污渍。','也用于地毯喷抽前的局部预处理（见 Extractor Shampoo）。官方商城未给出施工步骤。'],url:PS+'enviro-clean-concentrated-cleaner-cleaners-interior-cleaners'},


{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Leather_trtmt.pdf?v=1633544875","source":"ps","language":"英文","hosting":"remote"},
 id:'P-leather-treatment',brand:'P',category:'int',ph:{"category":"neu","value":"7.8","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Leather_trtmt.pdf?v=1633544875","section":9},"evidence":[],"conflict":false},name:'Leather Treatment',type:'皮革保养 / 保护剂（含 UV 抑制剂和皮革香味）',sizes:'16 oz · 1 gal',materials:'皮革',
 dilutions:[['皮革保养','即用','—']],
 steps:['先用 Xpress Interior Cleaner 清洁皮革并擦干。','取适量在施工海绵或超纤布上，均匀涂开。','让它渗入几分钟，再用干净的超纤布擦掉多余的。'],
 notes:['滋润、保护皮革，含 UV 抑制剂，并带皮革香味。'],url:PS+'leather-treatment-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Terminator_-_NA_74aa10c2-c8fb-4cc8-afaf-6b130d10c755.pdf?v=1727973279","source":"ps","language":"英文","hosting":"remote"},
 id:'P-terminator',brand:'P',category:'int',ph:{"category":"alk","value":"8.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Terminator_-_NA_74aa10c2-c8fb-4cc8-afaf-6b130d10c755.pdf?v=1727973279","section":9},"evidence":[],"conflict":false},name:'Terminator',type:'酶清洁污渍去除剂（内饰清洁系统第 1 步）',sizes:'16 oz · 32 oz · 1 gal · 5 gal',materials:'地毯 · 织物',
 dilutions:[['地毯 / 织物污渍','即用','喷雾壶']],
 steps:['即用，不需要稀释。','开始前先干刷、吸尘地毯和座椅。','直接喷在污渍上，再处理整片区域。','接着喷 Carpet Bomber（第 2 步），用地毯刷刷洗，两步一起效果最好。','至少作用 3 分钟，用蒸汽机或地毯刷搅动，最后吸尘或抽洗。'],
 notes:['酶 + 清洁成分，针对嵌入的污垢、油脂和蛋白质类污渍；也可以单独使用。'],url:PS+'terminator-spot-and-stain-remover-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_CarpetBomber.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-carpet-bomber',brand:'P',category:'int',ph:{"category":"alk","value":"10.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_CarpetBomber.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Carpet Bomber',type:'地毯 / 织物清洁剂（内饰清洁系统第 2 步）',sizes:'16 oz · 32 oz · 1 gal · 5 gal',materials:'地毯 · 织物',
 dilutions:[['地毯 / 织物','1:5 – 1:8','喷雾壶']],
 steps:['按 1:5 – 1:8 兑水。','开始前先干刷、吸尘地毯和座椅。','作为系统第 2 步时，在 Terminator 之后使用。','在区域上轻喷一层，至少作用 3 分钟。','用蒸汽机或地毯刷刷洗（两者一起最好），最后吸尘或抽洗。'],
 notes:['柑橘成分 + 可生物降解清洁剂 + 水性溶剂，溶解油脂、带走污垢；也可以单独使用。'],url:PS+'carpet-bomber-carpet-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Upholstery.pdf?v=1631822784","source":"ps","language":"英文","hosting":"remote"},
 id:'P-upholstery-shampoo',brand:'P',category:'int',ph:{"category":"alk","value":"8–9","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Upholstery.pdf?v=1631822784","section":9},"evidence":[],"conflict":false},name:'Upholstery Shampoo',type:'高泡地毯 / 织物手洗香波（Pro Series）',sizes:'1 gal · 5 gal',materials:'地毯 · 织物内饰',
 dilutions:[['地毯 / 织物手洗','1:20','—']],
 steps:[],
 notes:['泡沫丰富，能把深层地毯里的污垢松动带出；不掉色，pH 平衡，适用所有地毯材质；含温和除味成分。','官方商城未给出施工步骤。'],url:PS+'upholstery-shampoo-cleaners-interior-cleaners'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Extractor.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-extractor-shampoo',brand:'P',category:'int',ph:{"category":"alk","value":"8.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Extractor.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Extractor Shampoo',type:'无泡喷抽机地毯香波（Pro Series）',sizes:'1 gal · 5 gal',materials:'地毯 · 织物内饰',
 dilutions:[['喷抽机','1:60（2 oz / 1 gal）','喷抽机']],
 steps:['按 1:60 兑水，加入喷抽机的溶液箱。','油污集中的地方先用 Enviro-Clean 预处理。'],
 notes:['无泡配方，不掉色，pH 平衡，适用所有地毯材质。'],url:PS+'extractor-shampoo-cleaners-interior-cleaners'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_G3520.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-extreme-carpet',brand:'P',category:'int',ph:{"category":"alk","value":"11–12","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_G3520.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'EXTREME Carpet Stain Remover',type:'速效地毯去渍喷罐',sizes:'18 oz 喷罐',materials:'地毯 · 织物',
 dilutions:[['局部去渍','即用','—']],
 steps:[],
 notes:['瓶身标注：含表面活性剂和润湿剂的速效去渍剂，不起泡，能迅速渗透，去除墨水、油脂、机油、咖啡、可乐、红酒、鞋油、口红和宠物污渍等。','也适合作喷抽前的预处理。官方商城未给出施工步骤。'],url:PS+'extreme-cerpet-stain-remover-cleaners-interior-cleaners'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_G3510_57a92bbf-5039-40fa-a214-b4ea8aa2ae67.pdf?v=1730306287","source":"ps","language":"英文","hosting":"remote"},
 id:'P-foaming-carpet',brand:'P',category:'int',ph:{"category":"alk","value":"11–12","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_G3510_57a92bbf-5039-40fa-a214-b4ea8aa2ae67.pdf?v=1730306287","section":9},"evidence":[],"conflict":false},name:'Foaming Carpet Cleaner & Deodorizer',type:'生物酶泡沫地毯清洁除味喷罐（薄荷香）',sizes:'18 oz 喷罐',materials:'地毯 · 织物',
 dilutions:[],steps:[],
 notes:['两段作用：先即刻除味并溶解嵌入的污垢和有机物，再由生物酶分解有机残留，从源头去除污渍和异味。','官方商城未给出施工步骤。'],url:PS+'foaming-carpet-cleaner-and-deo-cleaners-interior-cleaners'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Finisher_1.pdf?v=1761759988","source":"ps","language":"英文","hosting":"remote"},
 id:'P-finisher',brand:'P',category:'int',ph:{"category":"na","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Finisher_1.pdf?v=1761759988","section":9},"evidence":[],"conflict":false},name:'Finisher',type:'过氧化物除味除渍（内饰清洁系统第 3 步）',sizes:'16 oz · 1 gal',materials:'地毯 · 织物 · 布座椅',
 dilutions:[['地毯 / 织物','即用','喷雾壶']],
 steps:['在 Terminator 和 Carpet Bomber 清洁完之后使用。','喷在地毯、座椅等织物上，让它作用 5–10 分钟。','产品会分解成氧气和水，不需要冲洗或清除残留。'],
 notes:['针对清洁后残留的有机污渍、水印和霉味。','作用时间来自经销商 Car Supplies Warehouse 的商品页。'],url:PS+'finisher-peroxide-treatment-doubleblack-collection'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Release_Vacuum_Aid.pdf?v=1744048800","source":"ps","language":"英文","hosting":"remote"},
 id:'P-release',brand:'P',category:'int',ph:{"category":"neu","value":"6.8","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Release_Vacuum_Aid.pdf?v=1744048800","section":9},"evidence":[],"conflict":false},name:'Release Vacuum Aid',type:'吸尘辅助喷雾（宠物毛、防静电）',sizes:'16 oz · 1 gal',materials:'地毯 · 织物',
 dilutions:[['吸尘前喷涂','即用','喷雾壶']],
 steps:['吸尘前轻喷在地毯和织物上。','用刷子或吸尘器正常吸尘。'],
 notes:['瓶身：帮助去除宠物毛、防静电、给织物除味、减少吸尘时间、让吸头更顺滑。','标签：Pro Series G21。'],url:PS+'release-vacuum-aid'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Natural_Finish_88f07355-5401-44bb-a5aa-fc2ffbbf58c2.pdf?v=1648503942","source":"ps","language":"英文","hosting":"remote"},
 id:'P-natural-finish',brand:'P',category:'int',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Natural_Finish_88f07355-5401-44bb-a5aa-fc2ffbbf58c2.pdf?v=1648503942","section":9},"evidence":[],"conflict":false},name:'Natural Finish',type:'水性内饰保养剂（低光泽，含 UV 防护和香味）',sizes:'16 oz · 1 gal · 5 gal',materials:'皮革 · 人造革 · 橡胶',
 dilutions:[['内饰 / 橡胶','即用','—']],
 steps:['先把要保养的部位清洁、擦干。','喷涂或手涂，用量看效果需要。','等它干后擦掉多余的。'],
 notes:['当轮胎油用时不要涂太多，涂完把轮胎擦一遍；甩出来的保养剂会弄脏塑料饰条。','标签：Pro Series L60。'],url:PS+'natural-finish-dressings-interior-exterior'},

// ───────────────────────── 配件 ─────────────────────────
{id:'P-reset-clay',brand:'P',category:'acc',name:'RESET Clay Scrubber',type:'黏土 + 刷洗双面海绵（2 块装）',sizes:'4″ × 6″（约 10 × 15 cm）',materials:'车漆',dilutions:[],
 steps:['洗车时丢进洗车水桶，用红色面刷掉虫尸和顽固污垢。','或作最后一步，配黏土润滑液用黑色黏土面除染。'],
 notes:['不要用除虫剂当黏土润滑液，最好用专用润滑液（如 Paint Gloss）。','可重复使用几十次。'],url:PS+'reset-clay-scrubber-4-x-6-2-pack'},

{id:'P-perfect-putty',brand:'P',category:'acc',name:'Perfect Putty / Perfect Mitt',type:'黏土块（Cool Gray / Purple）与黏土手套（Fine / Medium）',sizes:'黏土 0.5 lb · 手套 6″ × 12″',materials:'车漆 · 玻璃 · 镀铬 · 塑料 · 铝',dilutions:[],
 steps:['洗车后，在表面喷足 Paint Gloss 当润滑液。','用黏土或黏土手套轻轻滑过，去掉工业落尘、漆雾、铁路粉尘和表面锈点。','擦干残留后进入下一步。'],
 notes:['黏土手套比黏土块快约 3 倍。'],url:PS+'perfect-putty-cool-grey-fallout-remover-surface-cleaner'},

{id:'P-perfect-putty-purple',brand:'P',category:'acc',name:'Perfect Putty – Purple',type:'重切黏土（紫色，比标准版更强）',sizes:'0.5 lb',materials:'车漆 · 玻璃 · 镀铬 · 塑料 · 铝',
 dilutions:[['润滑','即用（配 Paint Gloss）','—']],
 steps:['配合 Paint Gloss 作润滑剂使用。'],
 notes:['标准 Perfect Putty 的加强版，更柔软、更强一些；可去除工业落尘、漆雾、铁路粉尘、表面锈和其他污染物。'],url:PS+'perfect-putty-purple-fallout-remover-surface-cleaner'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Chamois_Cleaner.pdf?v=1631822782","source":"ps","language":"英文","hosting":"remote"},
 id:'P-chamois-cleaner',brand:'P',category:'towel',ph:{"category":"neu","value":"6.8","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Chamois_Cleaner.pdf?v=1631822782","section":9},"evidence":[],"conflict":false},name:'Chamois Cleaner/Conditioner',type:'麂皮清洁养护剂',sizes:'32 oz',materials:'天然 / 合成麂皮',
 dilutions:[['麂皮存放','加入漂洗桶','桶洗']],
 steps:['加入漂洗桶，用来存放麂皮。'],
 notes:['去除砂粒，并螯合会留下水斑的硬水离子，提升麂皮擦干效果；含软化剂和防腐剂，延长麂皮寿命。','官方未给出用量。'],url:PS+'chamois-cleaner-conditioner-cleaners-interior-cleaners'},

{id:'P-refine',brand:'P',category:'acc',name:'REFINE Extreme Drying Towel',type:'双面扭绒擦干巾',sizes:'20″ × 32″（约 50 × 80 cm）',materials:'车漆',dilutions:[],
 steps:['洗车后平铺在车身上，轻拉吸水。'],
 notes:[],url:PS+'refine-extreme-drying-towel'},

{id:'P-applicator',brand:'P',category:'acc',name:'Inspiration Coating Applicator',type:'镀膜超纤施工块',sizes:'4″ × 5″',materials:'—',dilutions:[],
 steps:['包在施工块上，倒上镀膜按说明涂抹。'],
 notes:[],url:PS+'inspiration-coating-applicator-grey-red-ceramic-coating'},

{id:'P-side-kick',brand:'P',category:'acc',name:'Xpress Side Kick',type:'内饰刷洗垫（2 块装）',sizes:'—',materials:'—',dilutions:[],
 steps:['配合 Xpress Interior Cleaner 或 Swift，喷在垫子上刷洗皮革、人造革和塑料。'],
 notes:[],url:PS+'xpress-side-kick-2-pack'},

{
 sds:{"url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Rags_2_Riches_-_EN_SDS_NA.pdf?v=1781810313","source":"ps","language":"英文","hosting":"remote"},
 id:'P-rags',brand:'P',category:'towel',ph:{"category":"alk","value":"9.5","basis":"raw","source":{"kind":"sds","url":"https://cdn.shopify.com/s/files/1/0317/0631/6932/files/SDS_Rags_2_Riches_-_EN_SDS_NA.pdf?v=1781810313","section":9},"evidence":[],"conflict":false},name:'Rags to Riches',type:'超纤毛巾专用洗涤剂',sizes:'32 oz · 1 gal',materials:'—',dilutions:[],
 steps:['洗衣机：小量或轻脏一次加 1 oz（约 30 ml），大量加 2 oz。','很脏或失去吸水性的毛巾，先在 2–3 加仑水里加 1–2 oz 浸泡，再机洗。'],
 notes:['恢复超纤吸水性和柔软度，所有面料都能用。','用量来自经销商 Car Supplies Warehouse 的商品页。'],url:CSW+'p-s-rags-to-riches-microfiber-detergent'},
];

export const flows: Flow[] = [
{id:'f-p-interior',brand:'P',name:'地毯与织物三步清洁（Double Black 内饰清洁系统）',en:'P&S Double Black Interior Cleaning System',scene:'int',tags:['地毯','除味'],
 summary:'官方标签写明的三步系统：Terminator 酶清洁先处理污渍 → Carpet Bomber 1:5 – 1:8 整片清洁 → Finisher 过氧化物除味除渍，最后吸尘或抽洗。',
 steps:[
  {phase:'准备',extras:['地毯刷','吸尘器'],how:'先干刷、吸尘地毯和座椅。'},
  {phase:'Step 1 污渍',products:['P-terminator'],ratio:'即用',how:'直接喷在污渍上，再处理整片区域。'},
  {phase:'Step 2 整片清洁',products:['P-carpet-bomber'],ratio:'1:5 – 1:8',how:'在 Terminator 之后轻喷一层，至少作用 3 分钟，用蒸汽机或地毯刷刷洗，然后吸尘或抽洗。'},
  {phase:'Step 3 除味',products:['P-finisher'],ratio:'即用',how:'喷在织物上作用 5–10 分钟，不需要冲洗。'},
 ],
 notes:['Terminator 和 Carpet Bomber 也可以单独使用。'],
 url:PS+'carpet-bomber-carpet-doubleblack-collection'},

{id:'f-p-leather',brand:'P',name:'皮革 / 塑料内饰清洁与保养',en:'P&S Interior Leather & Trim',scene:'int',tags:['皮革'],
 summary:'Xpress Interior Cleaner 标签的做法：原液或 1:1 喷到起泡，刷洗后用湿毛巾擦净，再上 Leather Treatment；平时用 Swift 一步清洁上光。',
 steps:[
  {phase:'清洁',products:['P-xpress','P-side-kick'],ratio:'原液 – 1:1',how:'喷足量直到起泡，用刷洗垫、软毛刷或毛巾刷洗，再用拧湿的毛巾擦净。'},
  {phase:'保养',products:['P-leather-treatment','P-natural-finish'],alt:true,ratio:'即用',how:'皮革用 Leather Treatment，人造革和橡胶也可用 Natural Finish；涂匀后渗入几分钟，擦掉多余的。'},
  {phase:'日常维护',products:['P-swift'],ratio:'即用',how:'摇匀，喷在表面或刷洗垫上，擦到干净并留下上光效果。'},
 ],
 notes:['先在不显眼处测试。'],
 url:PS+'xpress-interior-cleaner-doubleblack-collection'},

{id:'f-p-wash',brand:'P',name:'日常洗车 + Bead Maker 封体',en:'P&S Wash & Protect',scene:'daily',tags:['保护'],
 summary:'按各瓶身标签的顺序：Bug Off 预处理虫尸 → Pearl 洗车（每加仑水 1 oz）→ 需要时 Paint Gloss + 黏土 → Bead Maker 喷涂擦掉，至少固化 8 小时。',
 steps:[
  {phase:'虫尸预处理（需要时）',products:['P-bug-off'],ratio:'原液 – 1:5',how:'喷在前脸，停留 1 分钟以上，不要干掉。'},
  {phase:'预洗（可选）',products:['P-frostbite'],how:'泡沫枪喷满，停留 3–5 分钟后冲净。'},
  {phase:'洗车',products:['P-pearl'],ratio:'1:128',how:'每加仑水 1 oz，洗车手套清洗后彻底冲净。'},
  {phase:'黏土（需要时）',products:['P-paint-gloss','P-perfect-putty'],ratio:'即用',how:'多喷 Paint Gloss 当润滑液，用黏土或黏土手套除染。'},
  {phase:'封体',products:['P-bead-maker'],ratio:'即用',how:'湿车或干车都可以喷，用超纤布擦掉；干车施工效果更好。'},
  {phase:'擦干',products:['P-refine'],how:'湿车施工时最后擦干。'},
 ],
 notes:['Bead Maker 至少固化 8 小时效果最好。','不要在阳光直射下洗车。'],
 url:PS+'beadmaker-paint-protectant-doubleblack-collection'},

{id:'f-p-wheel',brand:'P',name:'轮毂轮胎清洁与轮胎油',en:'P&S Wheels & Tires',scene:'wheel',tags:['轮胎'],
 summary:'Brake Buster 清洁轮毂和轮胎 → Iron Buster 去铁粉（变紫）→ 轮胎再用 Undressed 去旧轮胎油 → Dressed 或 Shine All 上光。',
 steps:[
  {phase:'轮毂轮胎清洁',products:['P-brake-buster'],ratio:'即用',how:'轮毂冷却时大量喷涂，停留 1 分钟以上，刷洗后用强水流冲净。'},
  {phase:'除铁（需要时）',products:['P-iron-buster'],ratio:'即用',pH:'acid',how:'喷涂后停留 2–5 分钟，不要干掉，冲净。'},
  {phase:'轮胎深度清洁',products:['P-undressed'],ratio:'原液 – 1:10',how:'喷在轮胎上，作用后刷洗，冲净并擦干。'},
  {phase:'轮胎上光',products:['P-dressed','P-shine-all'],alt:true,ratio:'即用',how:'Dressed 用刷子涂效果最好；Shine All 喷或手涂，干后擦掉多余的。'},
 ],
 notes:['每次使用 Brake Buster、Iron Buster 前先在轮毂上做局部测试。'],
 url:PS+'brake-buster-doubleblack-collection'},

{id:'f-p-correction',brand:'P',name:'漆面抛光（Recovery / Double Black 研磨系列）',en:'P&S Paint Correction',scene:'tfr',tags:['镀膜前'],
 summary:'两条官方系列：Recovery 系列 Intervention 切削 → Rehab 中间步 → Therapy 收光；Double Black 系列 Ego Maker 切削 → Deep Finish 整平 → Envy 珠宝级收光。完成后用 Paint Coating Surface Prep 脱脂。',
 steps:[
  {phase:'除染',products:['P-iron-buster','P-paint-gloss'],how:'先除铁，再用 Paint Gloss + 黏土处理。'},
  {phase:'切削',variants:[
    {name:'Recovery 系列',products:['P-intervention'],ratio:'即用',how:'4–5 小滴，轻到中等压力，每次 60 × 60 cm。'},
    {name:'Double Black 系列',products:['P-ego-maker'],ratio:'即用',how:'配强制旋转或旋转机，去砂纸痕和划痕。'},
  ]},
  {phase:'整平（需要时）',products:['P-rehab','P-deep-finish'],alt:true,ratio:'即用',how:'去掉切削留下的细痕。'},
  {phase:'收光',products:['P-therapy','P-envy'],alt:true,ratio:'即用',how:'收光盘、轻压，抛出最高光泽。'},
  {phase:'脱脂',products:['P-paint-prep'],ratio:'即用',how:'喷湿漆面，停留 30 秒后用超纤布擦净，勤翻毛巾。'},
 ],
 notes:['Ego Maker、Deep Finish 不含蜡和硅油，钣喷车间可用。'],
 url:PS+'paint-coating-surface-prep-doubleblack-collection'},

{id:'f-p-coat',brand:'P',name:'Inspiration 镀膜与维护',en:'P&S Inspiration Coating',scene:'coated',tags:['镀膜前'],
 summary:'官方商城和 inspirationcoating.com 的流程：完成抛光 → Paint Coating Surface Prep 清洁 → 涂 Inspiration Classic 或 STOUT → 至少 1 小时后可罩 SOLE 或 Defender → 2–3 小时内不要淋雨，48–72 小时完全固化；日常用 Radiance 洗车。',
 steps:[
  {phase:'抛光',products:['P-rehab','P-deep-finish'],alt:true,how:'按漆面状况完成抛光（见「漆面抛光」流程）。'},
  {phase:'脱脂',products:['P-paint-prep'],ratio:'即用',how:'喷湿漆面，停留 30 秒后擦净，镀膜前仔细检查。'},
  {phase:'镀膜',products:['P-inspiration-classic','P-stout','P-applicator'],how:'Classic 或 STOUT 任选，按包装说明施工；STOUT 闪干 30 秒–2 分钟后用两块布流平。'},
  {phase:'面层（可选）',products:['P-sole','P-defender'],alt:true,ratio:'即用',how:'镀膜定型后（至少 1 小时）再罩；Defender 喷上抹开，稍等后翻面擦亮。'},
  {phase:'日常维护',products:['P-radiance'],ratio:'1:21',how:'每加仑水 6 oz 洗车，冲净擦干，补强镀膜。'},
 ],
 notes:['镀膜后至少 2–3 小时不要让车淋雨，48–72 小时完全固化。','Inspiration 官方定位为专业产品，建议由认证施工店施工。'],
 url:'https://inspirationcoating.com/process/'},

{id:'f-p-glass',brand:'P',name:'玻璃研磨与 VUE 玻璃镀膜',en:'P&S Glass Restoration & VUE',scene:'coated',tags:['玻璃'],
 summary:'VUE 产品页推荐的组合：Clarity Creme 研磨玻璃 → Paint Coating Surface Prep 清洁 → VUE 玻璃镀膜；平时用 True Vue 或 REFLECT 清洁。',
 steps:[
  {phase:'玻璃研磨',products:['P-clarity'],ratio:'即用',how:'轻度手工、中度以上用机器配海绵或羊毛盘，重叠研磨，干成雾状后擦亮。'},
  {phase:'清洁',products:['P-paint-prep'],ratio:'即用',how:'喷湿玻璃后擦净。'},
  {phase:'玻璃镀膜',products:['P-vue'],ratio:'即用',how:'用附带的施工块涂抹。'},
  {phase:'日常清洁',products:['P-true-vue','P-reflect'],alt:true,ratio:'即用',how:'喷上后用玻璃布擦净、擦亮；REFLECT 同时补一层 SiO₂ 保护。'},
 ],
 notes:['VUE 约可保持 6 个月以上。'],
 url:PS+'inspiration-vue-glass-coating-doubleblack-collection'},
];
