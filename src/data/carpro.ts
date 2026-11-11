// CARPRO（以色列）产品与流程数据。来源：carpro.global 官方产品页、官方说明书 PDF（carpro.nyc3.digitaloceanspaces.com）、
// 官方 2026 产品目录、官方《CQUARTZ 镀膜车维护指南》PDF；部分规格参考英国官方经销商 Slim's Detailing。2026-10 整理翻译。
// 比例写法沿用官方：1:10 = 1 份原液 + 10 份水
import type { Combo, Flow, Product } from './types';

const CARPRO = 'https://carpro.global/product/';
const CP_MAN = 'https://carpro.nyc3.digitaloceanspaces.com/';
const CP_COAT_RULES = [
  '不要在阳光直射下或高温表面施工；在通风处施工，佩戴手套和呼吸防护。',
  '先在不显眼处测试。4" 麂皮布（suede）和擦除用的毛巾不要重复使用。',
];

export const products: Product[] = [
// ───────────────────────── 预洗 ─────────────────────────
{
 sds:{"url":"/sds/C-lift.pdf","source":"autonablask","language":"波兰文","version":"2023-04-11","hosting":"local","sha256":"a11e7c8359021260d92a0cbaaf0bd3a851dc630a445aa5a55556b60548bed828","originalUrl":"https://autonablask.pl/app/uploads/2026/02/lift-snow-foam_pl-pl_22.pdf","checkedAt":"2026-11-10"},
 id:'C-lift',brand:'C',category:'pre',ph:{"category":"alk","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 HA22-01-0406）：原液碱性","registration":"HA22-01-0406"}],"conflict":false},name:'Lift',type:'高浓缩碱性泡沫预洗',sizes:'500 ml · 1 L · 4 L',materials:'车身外部表面（官方页面未列具体材质）',
 dilutions:[['常规预洗','1:10','PA壶']],
 steps:['用水按 1:10 稀释（官方常规比例；可按需要的泡沫浓稠度加稀或加浓），装入 PA壶。','喷满车身，停留几分钟后再冲洗，通常约 5 分钟，停留越久效果越好。','冲洗后用 CARPRO Reset 洗车。'],
 notes:["1:10 为官方常规比例；想要更流动可调稀，想要更浓密的泡沫可调浓（官方未给出具体数值）。","即使是稀释液也不要让它在表面干掉。","只在冷却的表面上使用。","官方《CQUARTZ 维护指南》中预洗用 Lift 1:10，最好用PA壶或泡沫壶延长停留时间；冬季每 1–2 个月、夏季每 3 个月一次。"],url:CARPRO+'lift/'},

{
 sds:{"url":"/sds/C-bugout.pdf","source":"carpro-ws","language":"英文","version":"2018","hosting":"local","sha256":"9a4b17bcb8e36a41dd3cba0f7a5317ef1b6d990945aaf2267618866937b70445","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-bugout',brand:'C',category:'pre',ph:{"category":"alk","value":"≥ 11","basis":"raw","source":{"kind":"unrecorded"},"evidence":[],"conflict":false},name:'BugOut',type:'即用型虫尸清洁泡沫',sizes:'500 ml · 1 L · 4 L',materials:'车漆 · 镀膜表面 · 玻璃 · PPF',
 dilutions:[['虫尸污渍','即用','喷雾壶']],
 steps:['充分摇匀。','把泡沫喷在虫尸污渍上。','等待 5–30 秒，让污渍开始溶解。','需要时用超纤布轻轻擦拭。','用 CARPRO Reset 洗车或 ECH2O 去除全部残留。'],
 notes:['在表面停留不要超过 5 分钟；避免阳光直射下使用。','不飞溅的泡沫配方，对镀膜、玻璃和 PPF 安全。','虫尸留得太久可能永久损伤车漆；硬壳虫子要先软化再擦，不要干擦。'],url:CARPRO+'bugout/'},

// ───────────────────────── 洗车香波 / 免冲洗 ─────────────────────────
{
 sds:{"url":"/sds/C-reset.pdf","source":"carpro-ws","language":"英文","version":"2017","hosting":"local","sha256":"5bdb2d5a9de55c4b4759ff43b33cb1dc628083b674f10cf97b3370920c02b799","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-reset',brand:'C',category:'wash',ph:{"category":"alk","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 FB22-01-0719）：原液弱碱性；官网称稀释后为中性。","registration":"FB22-01-0719"}],"conflict":false,"claim":"官方称稀释后中性"},name:'Reset',type:'中性镀膜维护洗车香波',sizes:'50 ml · 500 ml · 1 L · 4 L',materials:'车漆 · 镀膜 · 封体 · 全部外部表面',
 dilutions:[['手洗','1:500（40 ml / 20 L）','桶洗']],
 steps:['按 1:500 稀释（40 ml Reset 加 20 L 水）。','用羊毛洗车手套彻底清洗整车。','用清水彻底冲洗。'],
 notes:["为纳米封体和镀膜专门开发：使用 pH 平衡的表面活性剂，清洁力接近碱性清洁剂，但稀释后仍为中性。","不含增光剂，用于让镀膜恢复原本性能，而不是额外增亮。","泡沫丰富、润滑好、易冲洗无残留。","官方维护指南：两桶法，窄缝处先用软毛细节刷；不要在阳光下洗，不要让香波干在车上。"],url:CARPRO+'reset/'},

{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/carpro-descale-acid-wash/sds.pdf","source":"chemcx","language":"英文","version":"2023","hosting":"remote"},
 id:'C-descale',brand:'C',category:'wash',ph:{"category":"acid","value":"2","basis":"raw","source":{"kind":"unrecorded"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 HB22-01-0138）：原液弱酸性","registration":"HB22-01-0138"}],"conflict":false},name:'Descale',type:'酸性洗车香波（去矿物沉积 / 交通膜）',sizes:'500 ml · 1 L · 4 L',materials:'镀膜车 · 未镀膜车',
 dilutions:[['手洗','1:100','桶洗'],['泡沫壶 / 喷壶','1:10','喷雾壶']],
 steps:['水桶洗车按 1:100 稀释；泡沫壶或喷壶按 1:10 稀释。','轻度污染：当作泡沫预洗喷上，尽量延长停留时间后冲洗，再接手洗。','较重污染：逐板施工，先做水平面；清洗每个板块并让 Descale 尽量多停留，但不要干掉；必要时重复。','用清水彻底冲洗。'],
 notes:["可安全恢复陶瓷镀膜的性能。","整个施工流程都能用：去除旧蜡和封体、抛光前预处理、抛光后脱脂；日常维护洗时也能去交通膜和矿物沉积。"],url:CARPRO+'descale/'},

{
 sds:{"url":"/sds/C-ech2o.pdf","source":"carpro-ws","language":"英文","version":"2019","hosting":"local","sha256":"6a632ba3b663983961809bd4d4d7e0300e476c9c08ec328931515832e8f8102e","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-ech2o',brand:'C',category:'wash',ph:{"category":"neu","value":"7.5","basis":"raw","source":{"kind":"sds","url":"/sds/C-ech2o.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GA24-01-0064）：原液弱碱性","registration":"GA24-01-0064"},{"kind":"resolution","rule":"sds-overrides-category","previousCategory":"alk"}],"conflict":true},name:'ECH2O',type:'无水洗车 / 增光剂',sizes:'—',materials:'车身外部各类表面 · 镀膜 · 打蜡表面',
 dilutions:[['无水洗车','1:10 – 1:15','喷雾壶'],['快速美容剂','1:15','喷雾壶']],
 steps:['按 1:10–1:15 加水稀释。','在一个完整板块上充分喷洒。','用 BOA 超纤布轻擦，经常翻到干净面。','再喷一次。','换一块干净的 BOA 超纤布再擦，去除剩余污垢。','换下一个板块，重复以上步骤绕车一圈。','最后用一块全新干净的毛巾轻擦收尾。'],
 notes:["专为陶瓷镀膜设计，也可清洁未镀膜或打蜡的表面。","作快速美容剂时 1:15 稀释，喷上擦掉即可。"],url:CARPRO+'echo/'},

{id:'C-rinsex',brand:'C',category:'wash',name:'RinseX',type:'高浓缩免冲洗洗车液',sizes:'500 ml · 1 L',materials:'车身外部各类表面',
 dilutions:[['预浸（泵式喷壶）','1:300 – 1:150（5–10 ml / 1.5 L）','喷雾壶'],['免冲洗洗车（水桶）','1:400 – 1:300（30–40 ml / 12 L）','桶洗']],
 steps:['预浸：按 1:300 – 1:150 稀释，大量喷在表面上停留，软化污垢、分解油污，再进行水桶清洗。','水桶清洗：按脏污程度 1:400 – 1:300 稀释，把免冲洗专用洗车媒介浸透。','拧到湿润但不滴水。','在选定区域用最小压力轻擦一遍。','翻到干净的一面，在同一区域再擦一遍。','擦干整个板块后再做下一块。'],
 notes:['分解交通膜和油污，安全带走附着的污垢，不会损伤已有的漆面保护。','一瓶可兼作预浸、免冲洗洗车、清洁泥毛巾润滑和抛光后残留清除（后两种官方未给比例）。','适合没法好好冲水或追求速度的日常维护。'],url:CARPRO+'rinsex/'},

{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/carpro-hydro2-foam/sds.pdf","source":"chemcx","language":"英文","version":"2023","hosting":"remote"},
 id:'C-hydro2-foam',brand:'C',category:'wash',ph:{"category":"acid","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB25-01-0085）：原液弱酸性；官网称其为中性（pH-neutral）。","registration":"GB25-01-0085"},{"kind":"statement","source":"sds","text":"SDS（2023 版）第 9 节写 pH 7，和韩国申报的「弱酸性」不一致，本站仍按申报数据标注"}],"conflict":true,"claim":"官方称中性"},name:'HydrO2 Foam',type:'中性洗涂一步香波（硅壳保护）',sizes:'50 ml · 500 ml · 1 L · 4 L',materials:'车漆 · 玻璃 · 塑料 · 轮毂 · 刹车卡钳 · 轮拱',
 dilutions:[['手洗','1:20','桶洗'],['PA壶（泡沫阀完全关闭）','1:9','PA壶']],
 steps:['PA壶：在阴凉处施工，先彻底冲湿车身 → 按 1:9 稀释并把泡沫枪阀门完全关闭 → 覆盖整车 → 立即用洗车手套清洗，再彻底冲洗。','手洗：在阴凉处施工，先彻底冲湿车身 → 水桶按 1:20 稀释 → 用洗车手套一次清洗一个区域 → 每洗完一个区域立即冲洗 → 用 DHydrate 毛巾擦干或吹干。'],
 notes:["洗车和镀膜一步完成，形成耐用的硅壳层，带 UV 防护，最长约 3 个月保护。","不要在阳光直射或高温表面使用，否则可能留下条纹；出现条纹时把产品喷在湿超纤布上擦拭即可。"],url:CARPRO+'hydro2foam/'},

// ───────────────────────── 轮毂轮胎 ─────────────────────────
{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/carpro-wheelx-wheel-cleaner/sds.pdf","source":"chemcx","language":"英文","version":"2024","hosting":"remote"},
 id:'C-wheelx',brand:'C',category:'wheel',ph:{"category":"acid","value":"5.7","basis":"raw","source":{"kind":"unrecorded"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 HB24-01-0939）：原液弱酸性","registration":"HB24-01-0939"}],"conflict":false},name:'WheelX',type:'酸性快速轮毂清洁剂',sizes:'50 ml · 500 ml · 1 L · 4 L',materials:'原厂 / 镀膜 / 镀铬 / 粉末喷涂 / 喷漆轮毂 · 刹车卡钳 · 轮拱 · 底盘 · 轮胎',
 dilutions:[['轮毂、轮拱、卡钳','即用','喷雾壶']],
 steps:['把 WheelX 大量喷在轮毂、轮拱或刹车卡钳上。','停留反应 1–2 分钟，不要让它干掉。','必要时用细节刷、WheelsMitt 或 Flat/Spot 轮毂刷刷洗。','5 分钟内彻底冲洗。'],
 notes:["不要用于裸铝，可能变色；如已变色，用 MetalliCut 手工或机器抛光恢复。","不能用于车漆（IronX 才可用于车漆）。","可用于碳陶刹车盘；也可去除轮毂、卡钳、轮拱上的旧封体。","与碱性的 MultiX 相比，WheelX 为酸性但更宽容，腐蚀风险更低。"],url:CARPRO+'wheelx/'},

{
 sds:{"url":"https://eunoffgsnusqmqgzpigj.supabase.co/storage/v1/object/public/product-media/sds/carpro-retyre.pdf","source":"sds-db","language":"英文","version":"2021","hosting":"remote"},
 id:'C-retyre',brand:'C',category:'wheel',ph:{"category":"alk","value":"13","basis":"raw","source":{"kind":"unrecorded"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 HA25-01-0013）：原液碱性","registration":"HA25-01-0013"}],"conflict":false},name:'ReTyre',type:'高 pH 泡沫轮胎清洁剂',sizes:'50 ml · 500 ml · 1 L · 4 L',materials:'轮胎橡胶 · 带清漆层的现代轮毂',
 dilutions:[['轮胎','即用','喷雾壶']],
 steps:['先用高压水冲掉轮胎上的浮尘。','把 ReTyre 大量喷在橡胶上，让其起泡并停留 30 秒。','再把产品喷在中硬毛刷上，彻底刷洗橡胶。','冲洗轮胎和刷子。','重复，直到轮胎上的泡沫变为白色。'],
 notes:["专为清洁轮胎橡胶设计；官方注明也可用于清洁大多数带清漆层的现代轮毂。","不要让产品干在轮毂或其他表面上；不要用于敏感表面或涂层。","如滴到轮毂上，用水冲淡该区域。","可去除旧轮胎油、防老化剂析出的发黄发棕，为镀膜或上光做准备。"],url:CARPRO+'retyre/'},

// ───────────────────────── 除染 / 去水垢 ─────────────────────────
{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/carpro-ironx/sds.pdf","source":"chemcx","language":"英文","version":"2023","hosting":"remote"},
 id:'C-ironx',brand:'C',category:'deco',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"unrecorded"},"evidence":[],"conflict":false},name:'IronX',type:'中性（pH 7）铁粉去除剂',sizes:'50 ml · 500 ml · 1 L · 4 L',materials:'车漆 · 塑料 · 镀铬 · 玻璃 · 合金轮毂',
 dilutions:[['车漆、轮毂','即用','喷雾壶']],
 steps:['先洗车。','充分摇匀。','喷上后等待 3–5 分钟，铁粉污染会变成紫红色。','用湿的软海绵揉开；避免在阳光直射下干掉。','用水彻底冲洗。'],
 notes:['新配方气味更小，有原味和柠檬味。','官方维护指南（轮毂）：喷上停留约 2 分钟 → 刷洗 → 再停 2 分钟 → 冲洗。已镀膜的车漆和轮毂每 6 个月做一次，未镀膜轮毂每 1–2 个月一次。','哑光或磨砂轮毂：先用 Lift 或 MultiX 预喷并冲洗，再用 IronX。'],url:CARPRO+'ironx/'},

{
 sds:{"url":"/sds/C-ironx-paste.pdf","source":"carpro-ws","language":"英文","version":"2017","hosting":"local","sha256":"41316f5c2a315d12dd3f59be7e24ada096ab0d6a5ff18c61e0b1811e30c9503e","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-ironx-paste',brand:'C',category:'deco',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"unrecorded"},"evidence":[],"conflict":false},name:'IronX Paste',type:'膏状铁粉去除剂（附着更久）',sizes:'—',materials:'车漆 · 塑料 · 镀铬 · 玻璃 · 合金轮毂',
 dilutions:[['局部污染区','即用（原膏）','—']],
 steps:['把产品涂在污染区域。','让其反应 5–6 分钟，必要时搅动刷洗。','用水彻底冲洗。'],
 notes:['IronX 的膏状版本，pH 7，在表面附着时间更长，适合轮毂等立面。','避免在阳光直射下干掉。'],url:CARPRO+'ironxpaste/'},

{
 sds:{"url":"/sds/C-ironx-ss.pdf","source":"carpro-ws","language":"英文","version":"2017","hosting":"local","sha256":"321b978c7aecdeb99c1f6a5039bfa83358067c9cbf0b51d96095171520711516","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-ironx-ss',brand:'C',category:'deco',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"unrecorded"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 FB21-01-0254）：原液中性","registration":"FB21-01-0254"}],"conflict":false},name:'IronX Snow Soap',type:'除铁泡沫 / 洗车香波',sizes:'500 ml · 1 L',materials:'整车 · CQUARTZ / DQUARTZ 镀膜',
 dilutions:[['PA壶（阀门关闭）','原液','PA壶'],['手套 / 预洗 / 水桶','1:8','桶洗']],
 steps:['PA壶：不稀释，关闭泡沫枪调节阀，覆盖整车。','手套 / 预洗 / 水桶：按 1:8 加水稀释，覆盖整车。','停留至铁粉反应变色，不要让它干在表面。','彻底冲洗。'],
 notes:["对所有 CQUARTZ 和 DQUARTZ 镀膜安全；薄荷香味。","改变稀释比例还可作维护用轮毂清洁剂或黏土 / 聚合物除染的润滑剂，但官方未给出具体比例。"],url:CARPRO+'ironxss/'},

{id:'C-ironx-limescale',brand:'C',category:'deco',ph:{"category":"acid","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB25-01-0118）：原液弱酸性","registration":"GB25-01-0118"}],"conflict":false},name:'IronX LimeScale',type:'弱酸性铁粉 + 水垢一步除染',sizes:'50 ml · 500 ml · 1 L · 4 L',materials:'车漆 · 玻璃 · 轮毂 · 其他外部表面',
 dilutions:[['全车除染','即用','喷雾壶']],
 steps:['先洗车。','充分摇匀。','喷上后等待 3–5 分钟，铁粉会变成紫红色。','用湿软海绵或 CARPRO 超纤布揉开；避免在阳光直射下干掉。','用水彻底冲洗。'],
 notes:["可能损伤陶瓷镀膜：定位为抛光、镀膜或封体前的处理步骤，不用于镀膜车日常维护。","同时去除铁粉和矿物沉积（水垢）。"],url:CARPRO+'ironxlimescale/'},

{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/carpro-trix-tar-iron-remover/sds.pdf","source":"chemcx","language":"英文","version":"2023","hosting":"remote"},
 id:'C-trix',brand:'C',category:'deco',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"unrecorded"},"evidence":[],"conflict":false},name:'TriX',type:'中性铁粉 + 柏油二合一去除剂',sizes:'500 ml · 1 L',materials:'大部分车身表面 · 合金轮毂',
 dilutions:[['车身、轮毂','即用','喷雾壶']],
 steps:['每次喷之前充分摇匀。','喷在表面上停留 5–7 分钟，污染物会变色。','用湿软海绵或细节刷搅动。','用洗车香波彻底清洗，再用水冲洗。'],
 notes:['结合 IronX 的除铁能力和 TarX 的溶柏油能力，pH 7。','常用于快速深度清洁合金轮毂。'],url:CARPRO+'trix/'},

{id:'C-tarx',brand:'C',category:'deco',name:'TarX LowVOC',type:'柏油 / 胶渍去除剂（低 VOC 新配方）',sizes:'500 ml · 1 L · 4 L',materials:'大部分车身表面',
 dilutions:[['柏油、橡胶、虫尸、胶渍','即用','喷雾壶']],
 steps:['充分摇匀。','喷在干燥表面上。','反应 2–3 分钟，或直接刷涂 / 擦涂。','用洗车香波清洗。'],
 notes:['停留不要超过 7–10 分钟。','TarX 的重新配方版本，以满足环保法规且保持清洁力；以天然活性成分为基础，不含氯化溶剂。','可减少对密集黏土处理的需要。'],url:CARPRO+'tarx-low-voc/'},

{
 sds:{"url":"/sds/C-tarx-original.pdf","source":"carpro-ws","language":"英文","version":"2017","hosting":"local","sha256":"9e224256b86b419e2a9b23fd5119ad9bd38beac0e57035b067c3531b06de43f4","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-tarx-original',brand:'C',category:'deco',ph:{"category":"acid","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB25-02-0019）：原液弱酸性","registration":"GB25-02-0019"}],"conflict":false},name:'TarX',type:'柏油 / 橡胶 / 虫尸去除剂（原版）',sizes:'—',materials:'大部分车身表面',
 dilutions:[['柏油、橡胶、虫尸','即用','喷雾壶']],
 steps:['充分摇匀。','喷在干燥表面上。','反应 2–3 分钟，或直接刷涂 / 擦涂。','用洗车香波清洗。'],
 notes:["停留不要超过 7–10 分钟。","以天然活性成分为基础，不含氯化溶剂等刺激性化学品，接触即开始溶解，无需用力擦洗。","有的地区已改售符合新环保法规的 TarX LowVOC。"],url:CARPRO+'tarx/'},

{
 sds:{"url":"/sds/C-spotless.pdf","source":"autonablask","language":"波兰文","version":"2023-04-04","hosting":"local","sha256":"aae67da469ad530c7cc8dbeb79004b9405c012d3d3efc16e4775b64b75934737","originalUrl":"https://autonablask.pl/app/uploads/2026/02/spotless-2.0_pl-pl_33.pdf","checkedAt":"2026-11-10"},
 id:'C-spotless',brand:'C',category:'deco',ph:{"category":"acid","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 FB22-01-0660）：原液弱酸性","registration":"FB22-01-0660"}],"conflict":false},name:'Spotless 2.0',type:'酸性水垢 / 水斑去除剂',sizes:'50 ml · 500 ml · 1 L · 4 L',materials:'车漆（含哑光） · 车标 · 轮毂 · 纹理塑料 · 玻璃 · CQUARTZ 镀膜',
 dilutions:[['车漆、车标、轮毂、塑料（超纤布）','即用','—'],['玻璃（不要直接喷）（超纤布）','即用','—']],
 steps:['车漆：用 Reset 洗车后冲洗并擦干；在室内或阴凉处、冷却的板块上施工，准备两条湿的 Terry Weave 毛巾。','把 Spotless 2.0 喷在板块上或其中一条湿毛巾上，涂抹在受影响区域。','停留 30 秒–1 分钟后擦拭，松动沉积物；不要让它干掉，用第二条湿毛巾擦掉或再补喷。','需要时重复；每个板块用流动清水冲洗并擦干后再做下一块。','车标 / 轮毂：先在不显眼处测试，涂在施工棉、超纤布或刷子上，一次一个区域，停留 30 秒–1 分钟后搅动。','玻璃：涂在 Terry Weave 毛巾上抹开，停留 30 秒–1 分钟后用同一条毛巾擦拭；顽固水斑可涂在抛光盘上用机器或手工抛光，然后彻底冲洗玻璃及相邻板块并擦干。'],
 notes:["禁止在阳光下或高温表面使用。","不要直接喷在玻璃上：擦入后立即擦掉并中和。","可能影响玻璃镀膜、传统封体和蜡。","所有表面停留时间均为 30 秒–1 分钟。"],url:CARPRO+'spotless/'},

{
 sds:{"url":"/sds/C-claylube.pdf","source":"autonablask","language":"波兰文","version":"2023-04-06","hosting":"local","sha256":"fd115994b6afc2aad9d2ff1b2f67f426dc459c7e26eedee5ed9981eb1be82cab","originalUrl":"https://autonablask.pl/app/uploads/2026/02/carpro-claylube.pdf","checkedAt":"2026-11-10"},
 id:'C-claylube',brand:'C',category:'deco',ph:{"category":"neu","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 FB21-01-0253）：原液中性","registration":"FB21-01-0253"}],"conflict":false},name:'Claylube',type:'黏土 / 打磨 / 抛光润滑剂',sizes:'—',materials:'车漆',
 dilutions:[['黏土、砂纸、抛光盘润滑','即用','喷雾壶']],
 steps:['充分摇匀。','喷在砂纸、抛光盘或黏土上，同时喷在车漆上。','抛光或磨泥过程中保持表面润滑。','完成后擦掉产品并洗车。'],
 notes:["不含保护聚合物或增光剂，不会带来保护或光泽。","可减少咬漆和划痕；适合局部修补、点磨（denibbing）和抛光盘预湿。","易于通过简单清洗或擦拭去除。"],url:CARPRO+'claylube/'},

// ───────────────────────── 研磨抛光 / 施工前处理 ─────────────────────────
{
 sds:{"url":"/sds/C-eraser.pdf","source":"carpro-ws","language":"英文","version":"2017","hosting":"local","sha256":"f061d8a261b5b7a6501cf2c835a45df35f31a0abad0f7cc583f607957dd0f016","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-eraser',brand:'C',category:'polish',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"/sds/C-eraser.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 FB25-02-0035）：原液弱碱性","registration":"FB25-02-0035"},{"kind":"resolution","rule":"sds-overrides-category","previousCategory":"alk"}],"conflict":true},name:'Eraser',type:'油脂 / 硅油 / 抛光粉尘脱脂剂（镀膜前）',sizes:'500 ml · 1 L · 4 L',materials:'全部车身硬质表面 · 敏感表面',
 dilutions:[['镀膜前脱脂 / 抛光后检查（超纤布）','即用','—']],
 steps:['充分摇匀。','喷在表面上。','用超纤布擦掉。'],
 notes:["确保 CQUARTZ 系列纳米镀膜达到最佳附着；钣喷车间安全（Body Shop Safe）。","也可作抛光后检查液，去除填充物和产品残留。","含醇类和表面活性剂，不含石油馏分；有防静电效果。","官方说明书要求各类镀膜前用 Eraser 擦拭，表面需 100% 干燥、无油无湿气（DLUX 要求擦拭后挥发 20 分钟再施工）。"],url:CARPRO+'eraser/'},

{
 sds:{"url":"/sds/C-ultracut.pdf","source":"autonablask","language":"波兰文","version":"2023-04-11","hosting":"local","sha256":"4df288c5fb5aa59874cdf4560b805e7dd691f207a50374cc0ae818bd056280b7","originalUrl":"https://autonablask.pl/app/uploads/2026/02/ultracut-polish_pl-pl_12.pdf","checkedAt":"2026-11-10"},
 id:'C-ultracut',brand:'C',category:'polish',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB23-06-0034）：不适用","registration":"GB23-06-0034"}],"conflict":false},name:'UltraCut',type:'极强切削研磨剂',sizes:'250 ml · 500 ml · 1 L',materials:'所有车漆',
 dilutions:[['DA / 转盘抛光（抛光盘）','即用','—']],
 steps:['在干净干燥的抛光盘上先薄薄涂抹一层并揉入，再加 3–4 粒豌豆大小的 UltraCut。','把产品在一个区域内铺开。','DA：转速调到高档（4–5），前 2–3 遍几乎不加压，之后每遍逐步加压；经常对抛光盘吹气。','转盘机：低速（1000–1200 RPM），前 2–3 遍最小压力，逐步加至最大，最后低压收尾。','划痕消失或研磨剂变透明后，用超纤布擦净。','清洁抛光盘，下一区域加 2–4 粒豌豆大小产品后重复。'],
 notes:["切削力可通过抛光盘和手法调整；可配 CARPRO 羊毛、Flash、Cool 研磨盘或超纤盘。","用 CARPRO 橙色抛光盘收尾可达到无光环效果。","极低粉尘。"],url:CARPRO+'ultracut/'},

{
 sds:{"url":"/sds/C-clearcut.pdf","source":"carpro-ws","language":"英文","version":"2017","hosting":"local","sha256":"023e8f06e24c48fe174da8b33fdb74ed8d2b656b241b8150b46cac65af754900","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-clearcut',brand:'C',category:'polish',ph:{"category":"alk","value":"8.5","basis":"raw","source":{"kind":"sds","url":"/sds/C-clearcut.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB22-06-0254）：不适用","registration":"GB22-06-0254"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'ClearCut',type:'快速切削研磨剂',sizes:'250 ml · 500 ml · 1 L',materials:'所有车漆（两步） · 中硬漆面（一步）',
 dilutions:[['DA / 转盘抛光（抛光盘）','即用','—']],
 steps:['在干净干燥的抛光盘上先薄薄涂抹一层并揉入，再加 3–4 粒豌豆大小的 ClearCut。','把产品在一个区域内铺开。','DA：中 / 高速，前 2–3 遍最小压力，之后每遍逐步加压。','转盘机：低速低压，前 1–2 遍最小压力，只略微加压，转速不超过 1000–1200 RPM。','划痕消失或研磨剂变透明后，用超纤布擦净。','清洁抛光盘，下一区域加 2–4 粒豌豆大小产品后重复。'],
 notes:["切削极快，可去除深至 P1000 的砂痕；粉尘极少。","不含蜡、填充物或硅油；钣喷车间安全。"],url:CARPRO+'clearcut/'},

{
 sds:{"url":"/sds/C-fixer.pdf","source":"carpro-ws","language":"英文","version":"2017","hosting":"local","sha256":"9634161e48083bb29ff6faadeb54418e27e4c2780dda8b93d671e52167268a99","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-fixer',brand:'C',category:'polish',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"/sds/C-fixer.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB23-06-0034）：不适用","registration":"GB23-06-0034"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Fixer',type:'一步纳米抛光剂',sizes:'250 ml · 500 ml · 1 L',materials:'大多数车漆（软质亚洲清漆至硬质陶瓷清漆）',
 dilutions:[['DA / 转盘抛光（抛光盘）','即用','—']],
 steps:['在抛光盘上滴 4–5 滴。','低速在一个区域内铺开；抛光盘和漆面润滑后提高到约 4–5 档（600–1200 RPM）。','用零至中等压力抛光。','抛到研磨剂完全分解。'],
 notes:["可完成从去除 P1500 水磨砂痕到最终收光的修复；钣喷车间安全。"],url:CARPRO+'fixer/'},

{id:'C-allin',brand:'C',category:'polish',name:'ALLiN',type:'一步抛光 + 拒水保护（水性，仅限偏心机）',sizes:'250 ml · 500 ml · 1 L',materials:'车漆',
 dilutions:[['重度瑕疵（较硬漆面 / 较深划痕）','即用（3–4 滴豆大）','Ultra Pad'],['轻度瑕疵（较软漆面 / 收光）','即用（3–4 滴豆大）','Orange Pad']],
 steps:['先把抛光盘调理好，挤 3–4 滴豆大的产品。','每次处理 40×40 cm 的区域。','偏心机转速 3.5–4，零压力按十字交叉路线移动。','抛到残留完全变透明为止，再用干净的长毛超纤布擦去残留。','每组之间清理抛光盘，保持切削力。','完成后可直接留作基础保护，24 小时后达到完全拒水；也可再上 Reload、EliXir 或 HydrO2 加强。','如果之后要上陶瓷镀膜，先用 Eraser 彻底擦拭，确保表面无油。'],
 notes:['一步完成切削、抛光和基础拒水保护，可去除最深 2500 目砂纸痕；适合时间有限、上门服务或只做一步提升的场合。','只能配偏心机（DA）使用。'],url:CARPRO+'allin/'},

{
 sds:{"url":"/sds/C-reflect.pdf","source":"carpro-ws","language":"英文","version":"2017","hosting":"local","sha256":"c0e857171cbf7452d2ecb8f3abf5c2c2f5ee74b9a273d720dae7618c82a57533","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-reflect',brand:'C',category:'polish',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"/sds/C-reflect.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB23-06-0034）：不适用","registration":"GB23-06-0034"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Reflect',type:'超细收光抛光剂（镀膜前）',sizes:'250 ml · 500 ml · 1 L',materials:'软质与硬质车漆',
 dilutions:[['收光抛光（抛光盘）','即用','—']],
 steps:['充分摇匀，在海绵抛光盘上滴 4–5 滴。','低速一遍铺开，再提高到约 4–5 档（约 800–1000 RPM）。','用轻至中等压力抛光。','抛到产品完全分解。'],
 notes:["为 CQUARTZ 镀膜前打造极致光泽而开发；不遮盖缺陷（零填充）；钣喷车间安全。"],url:CARPRO+'reflect/'},

{
 sds:{"url":"/sds/C-essence.pdf","source":"carpro-ws","language":"英文","version":"2017","hosting":"local","sha256":"2404c7977db13a1545dc0e00245d6f29d40887efbb5d9b07e0f01b4903b8103a","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-essence',brand:'C',category:'polish',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"/sds/C-essence.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB22-06-0254）：不适用","registration":"GB22-06-0254"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Essence',type:'高光底剂 / 抛光剂（含纳米石英）',sizes:'—',materials:'车漆',
 dilutions:[['机器抛光（抛光盘）','即用','—'],['手工（施工海绵）','即用','—']],
 steps:['充分摇匀。','较重切削：用 CARPRO MF 研磨盘并充分预湿；追求最高光泽：用 Gloss 抛光盘少量施用。','低速在一个区域内铺开，中速抛光。','擦掉后进入下一区域。','手工：把产品涂在海绵上以画圈方式施工，等待 3 分钟后用干净超纤布擦掉。'],
 notes:["结合纳米石英、高光耐久树脂和细研磨颗粒：可作镀膜前高光底剂、半永久填充，并带 SiO2 保护。","经常清洁抛光盘；用完立即清洁抛光盘和毛巾。"],url:CARPRO+'essence/'},

{
 sds:{"url":"/sds/C-metallicut.pdf","source":"carpro-ws","language":"英文","version":"2019","hosting":"local","sha256":"42d8c9e8ae6cb9bb3dd72b6041ecf42cd555eb4530879ee2a81e8251b8ad98ec","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-metallicut',brand:'C',category:'polish',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 FB20-06-0043，该申报已过期）：不适用","registration":"FB20-06-0043"}],"conflict":false},name:'MetalliCut',type:'金属抛光剂',sizes:'250 ml · 500 ml · 1 L · 4 L',materials:'不锈钢 · 铝 · 镀铬 · 排气尾喉 · 镀铬轮毂 · 软金属',
 dilutions:[['机器（抛光盘）','即用','—'],['手工（超纤布）','即用','—']],
 steps:['机器：在较硬的海绵抛光盘上滴 6–8 滴 → 1–2 档铺开 → 提高到 4–5 档切削，直到研磨颗粒分解、出现高光 → 用干净超纤布擦掉残留，需要时重复。','手工：取少量涂在超纤布上（视金属类型也可用钢丝棉）→ 中到较大压力揉入，直到产品变得不那么浑浊 → 用干净超纤布擦亮，需要时重复。'],
 notes:["对软金属安全。","裸铝被 WheelX 弄变色时，官方建议用 MetalliCut 抛光恢复。"],url:CARPRO+'metallicut/'},

// ───────────────────────── 镀膜 ─────────────────────────
{
 sds:{"url":"/sds/C-cq-uk.pdf","source":"carpro-ws","language":"英文","version":"2019","hosting":"local","sha256":"8f806265aa98d20f0553ac7dfdb69fbdfd0b86a667cc71cd779ae254386169e7","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-cq-uk',brand:'C',category:'coat',name:'CQUARTZ UK 3.0',type:'消费级旗舰陶瓷镀膜（18–24 个月）',sizes:'10 ml · 30 ml · 50 ml · 100 ml',materials:'车漆',
 dilutions:[['—（施工块 + 麂皮布）','即用','—']],
 steps:['施工前摇匀。','把 4" 麂皮超纤布包在施工块灰色面上，慢慢打开瓶子，在施工块上划一到两条产品线。','以交叉纹路涂在车漆上，按条件每次约 50×50 cm。','一旦闪干（视温湿度 1–2 分钟）立即用 16"×16" CARPRO 2Face 超纤布擦除，进入下一区域前去除全部残留。','大约每 2 个板块换一块新麂皮布。','最多 2–3 层，层间 60 分钟。','最后一层 60 分钟后施工 CARPRO Reload。'].concat(CP_COAT_RULES),
 notes:['官方实际耐久 18–24 个月；可在 3–40 °C 施工，擦除后表面不发黏。','也可以立即擦除，或停留几分钟后仍能干净擦除。','易燃液体；吞咽并进入呼吸道可能致命，会刺激眼睛。'],url:CARPRO+'cq_uk/'},

{id:'C-cq-uk4',brand:'C',category:'coat',name:'CQUARTZ UK 4.0',type:'消费级旗舰陶瓷镀膜第四代（最长 3 年）',sizes:'30 ml · 50 ml · 100 ml',materials:'车漆',
 dilutions:[],steps:[],
 notes:['UK 3.0 的第四代：新的混合合成聚合物让表面更亮、更顺滑，抗水斑更好，实际耐久最长 3 年。','干燥时间放慢，施工更从容，不容易留高点。','截至 2026-11 官网尚未公开施工说明；在说明公开前可参考 UK 3.0 的施工步骤，但闪干时间会更长。'],url:CARPRO+'cq_uk4/'},

{id:'C-cq-aqua',brand:'C',category:'coat',name:'CQUARTZ Aqua',type:'水性低 VOC 多表面镀膜（最长 1 年）',sizes:'—',materials:'车身外部几乎所有表面（玻璃除外）',
 dilutions:[],steps:[],
 notes:['水性配方、VOC 极低：几乎没有刺鼻气味，对通风要求低，适合家用车库或封闭工位，也是 CQUARTZ 系列的入门选择。','强拒水自洁，防 UV 和化学品，耐久最长 1 年。','截至 2026-11 官网尚未公开施工说明和规格。'],url:CARPRO+'cq_aqua/'},

{
 sds:{"url":"/sds/C-cq-lite.pdf","source":"ingrijireauto","language":"英文","version":"2021-04-15","hosting":"local","sha256":"c5ecde6de5766bf135a5a07c62dcf6b66df55cb2d4b02bb0e167c034b4940f8c","originalUrl":"https://ingrijireauto.ro/index.php?controller=attachment&id_attachment=421","checkedAt":"2026-11-10"},
 id:'C-cq-lite',brand:'C',category:'coat',name:'CQUARTZ Lite 2.0',type:'入门级陶瓷镀膜（最长约 2 年）',sizes:'100 ml 套装 · 500 ml',materials:'车漆',
 dilutions:[['—（施工块 + 麂皮布）','即用','—']],
 steps:['完全除染：洗车后用 CARPRO IronX、TarX 和黏土去除所有污染。','用 CARPRO Eraser 脱脂，表面需冷却、干燥；如有缺陷可在 Eraser 前先抛光。','在超纤施工棉或包麂皮的施工块上挤一条 Lite 2.0，以交叉纹路涂满约 60×60 cm 区域，薄而均匀，再做下一块。','至少等待 5 分钟闪干，再用优质超纤布擦掉多余产品（最长可留 15 分钟仍容易擦除）；用合适光源检查高点和残留。','漏涂或高点：施工后 2 小时内，在施工棉上加几滴擦过该区域并立即擦亮。','保持干燥 4 小时后才可接触水；前 24 小时内出现水珠要在干掉前擦掉。','施工 4 小时后上 CARPRO Reload 或 Release，防止前 48 小时出现水斑。'],
 notes:['在 10–50 °C 测试，可室内或室外、阳光或微风下施工。','施工时佩戴面罩和耐溶剂丁腈手套，远离明火。'],url:CARPRO+'cq_lite/'},

{
 sds:{"url":"/sds/C-cq-sic.pdf","source":"autonablask","language":"波兰文","version":"2023-04-05","hosting":"local","sha256":"eb167efba8a752ce6b1466094bac8ed91a7a72f7f3df19b5ae4b960c18e822df","originalUrl":"https://autonablask.pl/app/uploads/2026/02/cquartz-sic_pl-pl_12.pdf","checkedAt":"2026-11-10"},
 id:'C-cq-sic',brand:'C',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 FB21-07-0897）：不适用","registration":"FB21-07-0897"}],"conflict":false},name:'CQUARTZ SiC',type:'碳化硅陶瓷镀膜（耐 pH 3–12）',sizes:'10 ml · 30 ml · 50 ml · 100 ml',materials:'车漆',
 dilutions:[['—（施工块 + 麂皮布）','即用','—']],
 steps:['施工前摇匀。','把 4" 麂皮超纤布包在施工块灰色面上，在施工块上划一到两条产品线。','以交叉纹路涂在车漆上，每次约 50×50 cm。','大约每两个板块换一块新麂皮布。','闪干后（视温湿度 1–10 分钟）立即用 16"×16" CARPRO 2Face 超纤布擦除，去除全部残留。','可在 60 分钟后加涂，最多 2–3 层。','施工后 48 小时内避免日晒雨淋等外部环境。'].concat(CP_COAT_RULES),
 notes:["施工后不需要再上 Reload 面层。","碳化硅提升耐化学性、抗水斑和矿物沉积能力，顺滑度和光泽深度更好，任何温度下都易施工。"],url:CARPRO+'cq_sic/'},

{
 sds:{"url":"/sds/C-cq-pro.pdf","source":"carpro-ws","language":"英文","version":"2019","hosting":"local","sha256":"0bc7f24237807bca2c115d07a314673e9d3e29d4b22fb36146ee888144515303","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-cq-pro',brand:'C',category:'coat',name:'CQUARTZ Professional',type:'专业级陶瓷镀膜（经授权施工店）',sizes:'—',materials:'清漆车漆 · 塑料件',
 dilutions:[['—','即用','—']],
 steps:['由官方授权施工店施工，官方网站提供「Find an installer」查询。'],
 notes:['低黏度、快速固化，使用环保溶剂；疏水疏油，耐油、水、硅、酸、碱和盐。','2020 配方针对盐分环境和严寒冬季改进；极高光泽、高密度、抗磨损。','官方页面施工说明仅为图片，未收录具体步骤。可与 DQUARTZ Pro 叠加作面层。'],url:CARPRO+'cqpro/'},

{
 sds:{"url":"/sds/C-cqfr.pdf","source":"carpro-ws","language":"英文","version":"2017","hosting":"local","sha256":"0baccb088ecb4dfca6f6730f3bc8374f0768716bb969f2653dedcf4db8a332be","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-cqfr',brand:'C',category:'coat',name:'CQUARTZ Finest Reserve',type:'旗舰陶瓷镀膜（仅认证施工店）',sizes:'—',materials:'车漆',
 dilutions:[['—','即用','—']],
 steps:['仅由 CARPRO 精选的认证施工店（CQFR installer）施工。'],
 notes:['官方称为最先进的陶瓷镀膜：更深的镜面光泽、更强的疏水疏油、更高硬度，更耐盐、融雪剂、酸性污染物和强力清洁剂。','官方页面未提供施工步骤、固化时间等说明。'],url:CARPRO+'cqfr/'},

{id:'C-dquartz',brand:'C',category:'coat',name:'DQUARTZ Pro',type:'纳米钻石陶瓷镀膜（专业）',sizes:'—',materials:'车漆 · 金属',
 dilutions:[['—','即用','—']],
 steps:['可单独使用，也可作 CQUARTZ Professional 的底层（官方称效果最佳）。','施工步骤请向官方授权施工店或经销商获取。'],
 notes:['以硅氧烷纳米钻石和专有硅树脂为基础，表面硬度最多提升 5 级，抗划痕和磨损；顶层叠加 CQUARTZ Professional 可再提升约 1 级铅笔硬度。','疏水、耐 UV 和化学品，高光泽、自清洁。'],url:CARPRO+'dquartz/'},

{
 sds:{"url":"https://eunoffgsnusqmqgzpigj.supabase.co/storage/v1/object/public/product-media/sds/carpro-dquartz-go.pdf","source":"sds-db","language":"英文","version":"2025","hosting":"remote"},
 id:'C-dq-go',brand:'C',category:'coat',name:'DQUARTZ Go',type:'DIY 纳米钻石陶瓷镀膜',sizes:'30 ml · 50 ml',materials:'车漆 · 金属',
 dilutions:[['—（施工块 + 麂皮布）','即用','—']],
 steps:['充分摇匀。','把 4" 麂皮超纤布包在施工块灰色面上，或使用 CARPRO MF 施工棉。','慢慢打开瓶子，在施工块上划一到两条产品线。','以交叉纹路涂在车漆上，每次约 50×50 cm。','大约每两个板块换一块新麂皮布。','24 °C 时等待 3–5 分钟（温度低则更久），手感微黏时即可擦除。','用 CARPRO 2Face 超纤布轻压擦除，进入下一区域前去除全部残留。','一层即可；需要更多保护可在 1 小时后加第二层。','施工后 48 小时内避免外部环境。'].concat(CP_COAT_RULES),
 notes:['把专业 DQUARTZ 纳米钻石技术改为易用 DIY 版，表面更顺滑；表面硬度最多提升 5 级，极强耐磨。'],url:CARPRO+'dq_go/'},

{id:'C-dq-gforce',brand:'C',category:'coat',name:'DQUARTZ GForce',type:'纳米钻石玻璃镀膜',sizes:'10 ml 套装 · 50 ml',materials:'玻璃',
 dilutions:[['—（随附棉片）','即用','—']],
 steps:['可选抛光：未抛光的玻璃需 2 层，抛光过的玻璃 1 层。','用 CARPRO Eraser 彻底清洁玻璃。','在随附棉片上滴几滴，每个区域（如半块前挡）不超过 3–4 滴，过多会拖花。','有条理地以画圈方式施工，尽量均匀覆盖。','立即擦掉多余产品和雾影；发雾的地方可再加少量液体擦除。','侧窗只需 1 层；前挡（未抛光）等待 30 分钟后再施工第 2 层。','保持干燥 4 小时；24 小时内不要使用雨刷。'],
 notes:['避免涂到橡胶条或车漆上，如有接触立即用湿超纤布擦掉。','通风处施工，佩戴皮肤和呼吸防护；易燃液体。','高透明、超耐久、极强疏水和耐磨。'],url:CARPRO+'dq_gforce/'},

{id:'C-cq-gliss',brand:'C',category:'coat',name:'CQUARTZ Gliss 2.0',type:'超滑面层镀膜',sizes:'30 ml · 50 ml · 100 ml',materials:'车漆（含哑光 / 缎面） · CQ / DQ 镀膜面层',
 dilutions:[['—（施工块 + 麂皮布）','即用','—']],
 steps:['彻底清洗并除染，用 Eraser 擦拭；车身须 100% 干燥、无油无湿气。','作为面层：在 CQUARTZ 镀膜施工超过 4 小时后再施工；镀膜经红外灯固化的，等待 45 分钟。','在包麂皮的施工块上沿长度挤两条 Gliss 2.0，需要时补充，保持湿润均匀。','每次约 50×50 cm，与下一区域的重叠部分在几分钟内涂好。','闪干很快：一出现白雾立即用超纤布擦掉全部多余产品；雾影停太久则再涂一次并立即擦掉。','多层 Gliss 时层间等待 1 小时。','施工后至少保持干燥 1 小时；前 24 小时擦掉表面水分；5–7 天内避免清洁剂和化学品。'],
 notes:['可单独作镀膜使用；与 CQUARTZ 和 DQUARTZ 全系兼容。','高度疏油，水接触角 >110°，抗水斑。'],url:CARPRO+'cq_gliss/'},

{
 sds:{"url":"/sds/C-cq-dlight.pdf","source":"ingrijireauto","language":"英文","version":"2024-08-29","hosting":"local","sha256":"8ce0e90ac03cf30bc6ed5effaf6067e70b5432009f79bb24058dfc3844787594","originalUrl":"https://ingrijireauto.ro/index.php?controller=attachment&id_attachment=420","checkedAt":"2026-11-10"},
 id:'C-cq-dlight',brand:'C',category:'coat',name:'CQUARTZ DLight',type:'抗 UV 镀膜（大灯 / PPF / 塑料）',sizes:'10 ml · 30 ml · 50 ml · 100 ml',materials:'大灯 · PPF · 塑料及饰条 · 其他镀膜面层',
 dilutions:[['—（施工块 + 麂皮布）','即用','—']],
 steps:['彻底清洗并除染，用 Eraser 擦拭，表面须完全干燥、无油无湿气。','摇匀后慢慢打开，在包麂皮的施工块上划一到两条（也可用 MF 施工棉或棉片）。','均匀涂抹，每次不超过约 50×50 cm。','闪干：25 °C 约 3–5 分钟，15 °C 约 5–7 分钟。','用超纤布擦掉全部多余产品；高点停留太久则再涂并立即擦掉。','至少 2 层，层间 1 小时。','24 小时内避免日晒雨淋等外部环境。'].concat(CP_COAT_RULES),
 notes:['阻挡 260–360 nm UVA/UVB，防止塑料发黄、褪色和开裂，抗 UV 最长 3 年；防静电防尘。','擦除用毛巾若要重复使用，需在强碱溶液（如 MultiX 1:5）中浸泡后彻底冲洗。'],url:CARPRO+'cq_dlight/'},

{
 sds:{"url":"/sds/C-cq-dlux.pdf","source":"carpro-ws","language":"英文","version":"2019","hosting":"local","sha256":"4bd0fb6aaa6b46b0556aa57e6f77cc604c44a778738c3e774b85954800248498","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-cq-dlux',brand:'C',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 FB21-07-0897）：不适用","registration":"FB21-07-0897"}],"conflict":false},name:'CQUARTZ DLUX',type:'轮毂 / 塑料 / 橡胶饰条镀膜',sizes:'30 ml · 100 ml',materials:'合金轮毂（喷漆 / 抛光 / 镀铬） · 塑料 · 橡胶饰条',
 dilutions:[['—（施工棉）','即用','—']],
 steps:['用 Eraser 擦拭表面后擦干，等待 20 分钟挥发再施工；车漆或镀铬面先用 IronX 除铁，需要时抛光，再用 Eraser 擦拭。','在施工棉上挤一条 DLUX，一次涂一个小区域。','从角落开始慢慢向外推，尽量均匀，不要一次涂大面积。','均匀但不要涂得太薄；在第一分钟内涂匀后进入相邻重叠区域。','纹理饰条：不需要擦除，只需涂匀；光滑塑料：在变得太黏之前擦掉（约 1 分钟），涂层更薄、寿命也更短。','1–3 小时内不要接触水；24 小时内如沾水，在干掉前擦掉。'],
 notes:["膜厚高于其他 CQUARTZ 镀膜，硅含量 50%（体积），用于高负荷表面；可恢复褪色饰条的光泽和颜色。","轮毂施工后抗刹车粉和路面污垢。","含石脑油、二甲苯、甲苯，易燃，通风处施工并做好防护。"],url:CARPRO+'cq_dlux/'},

{id:'C-cq-dlux2',brand:'C',category:'coat',name:'CQUARTZ DLUX 2.0',type:'轮毂 / 塑料 / 橡胶饰条镀膜第二代',sizes:'30 ml · 100 ml',materials:'合金轮毂（喷漆 / 抛光 / 镀铬） · 塑料 · 橡胶饰条',
 dilutions:[],steps:[],
 notes:['保留 DLUX 的厚膜和 50%（体积）硅含量，表面更顺滑，抗水斑更好；可恢复褪色饰条的光泽，轮毂上抗刹车粉和路面污垢。','加入混合合成硅氧烷降低黏度：涂得均匀时很多情况下不需要再擦；涂得不太均匀时残留也容易擦净。','截至 2026-11 官网尚未公开施工说明；在说明公开前可参考 DLUX 的施工步骤。'],url:CARPRO+'cq_dlux2/'},

{id:'C-cq-blackout',brand:'C',category:'coat',name:'CQUARTZ BlackOut 2.0',type:'轮胎 / 橡胶镀膜（缎面黑）',sizes:'50 ml · 100 ml',materials:'轮胎 · 橡胶 · 树脂件',
 dilutions:[['—（轮胎海绵）','即用','—']],
 steps:['用 CARPRO ReTyre 或 MultiX 彻底清洗轮胎，完全晾干。','摇匀，在轮胎施工海绵上倒一条 BlackOut 2.0。','涂满胎壁，看起来均匀湿润但不滴落。','等待 10 分钟，用麂皮超纤布擦拭胎壁使外观均匀（可把毛巾包在施工海绵上）。','可选第二层：1–2 小时后重复，增加深度和耐久。','初干：25 °C 1 小时 / 15 °C 2 小时；表干 4 小时；完全固化 12 小时。前 3 天避免香波和化学品。'],
 notes:['聚硅氧烷 + 溶剂型丙烯酸树脂；耐盐、化学品和 UV，耐磨、自清洁，无硅油类的黏腻残留。','高度易燃，可致严重皮肤灼伤和眼损伤：通风处施工，戴手套和护目镜。'],url:CARPRO+'cq_blackout/'},

{
 sds:{"url":"/sds/C-cq-skin.pdf","source":"carpro-ws","language":"英文","version":"2018","hosting":"local","sha256":"03f29ddef6820c2d4e124ab3204af6cfa797bcf99d283135ae3add5073fa932e","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-cq-skin',brand:'C',category:'coat',name:'CQUARTZ Skin',type:'PPF / 改色膜 / 塑料镀膜',sizes:'50 ml',materials:'PPF · 改色膜 · 透明保护膜 · 软硬塑料饰条（亮面 / 哑光）',
 dilutions:[['—（施工块 + 麂皮布）','即用','—']],
 steps:['用 CARPRO Eraser 处理，表面须 100% 干净无油。','摇匀，在包麂皮的施工块上滴几滴。','以交叉纹路均匀施工，每次约 50×50 cm，涂平涂顺，避免高点。','闪干 2–3 分钟后用 CARPRO 2Face 超纤布擦掉。','建议 2 层：第一层后等待 4 小时（若用红外灯烘烤可立即施工第二层）。','24 小时内避免外部环境，至少 3–5 天不要接触化学品。'],
 notes:['在不能抛光的表面上使用前，先熟练掌握施工并准备良好光源。','对 PVC、PU、TPU 膜附着最好；抗 UV，适合亮面和哑光膜。'],url:CARPRO+'cq_skin/'},

{id:'C-cq-fabric',brand:'C',category:'coat',name:'CQUARTZ Fabric 2.0',type:'透气织物镀膜',sizes:'50 ml · 100 ml · 500 ml',materials:'织物 · 敞篷软顶 · 各类材质',
 dilutions:[['—','即用','喷雾壶']],
 steps:['清除织物上的所有污垢和油脂并完全晾干。','充分摇匀。','均匀喷在表面，用海绵揉入织物。','再整体喷一遍，确保完全覆盖。','晾干 3 小时，期间不要接触水。'],
 notes:['超疏水、防污渍、干燥快，不改变织物手感；抗 UV、低 VOC，去除了刺激性溶剂气味。'],url:CARPRO+'cq_fabric/'},

{
 sds:{"url":"/sds/C-cq-leather.pdf","source":"autonablask","language":"波兰文","version":"2023-04-05","hosting":"local","sha256":"cb61e05ba081c035429c1e66aae078e939ed278188768a50a6f7b59e0993125e","originalUrl":"https://autonablask.pl/app/uploads/2026/02/cquartz-leather-2.0_pl-pl_22.pdf","checkedAt":"2026-11-10"},
 id:'C-cq-leather',brand:'C',category:'coat',name:'CQUARTZ Leather 2.0',type:'皮革 / 人造革水性镀膜',sizes:'30 ml · 50 ml · 100 ml',materials:'所有类型皮革（含 Nappa） · 人造革',
 dilutions:[['—（施工块）','即用','—']],
 steps:['用 CARPRO Inside 清除皮革上的污垢、湿气和油脂（不留封体或护理剂）；有残留时用湿毛巾擦掉。','在施工块海绵面上挤一条 Leather 2.0。','揉入皮革，覆盖所有褶皱和毛孔。','2–3 分钟内轻轻擦掉多余产品。','第二层前等待：用风扇 30 分钟，25 °C 1 小时，15 °C 2 小时。','表干 4 小时，完全干燥 12 小时；前 3 天不要清洁皮革。'],
 notes:['施工温度 15–30 °C；强烈建议用风扇，低温时尤其如此。','压力罐包装：不要摇晃，慢慢打开，戴手套，喷口不要对着人脸。','自清洁疏水，抗 UV，防牛仔裤染色、污渍和记号笔；无 VOC。'],url:CARPRO+'cq_leather/'},

{
 sds:{"url":"/sds/C-essence-plus.pdf","source":"carpro-ws","language":"英文","version":"2017","hosting":"local","sha256":"ecf3506502277a69beb52168710f5f844cac6ad14c84eeb222f428c0599fef9b","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-essence-plus',brand:'C',category:'coat',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"unrecorded"},"evidence":[],"conflict":false},name:'Essence Plus',type:'SiO2 纳米镀膜 / 镀膜修复增光',sizes:'250 ml · 500 ml · 1 L · 4 L',materials:'车漆 · 已老化的陶瓷镀膜',
 dilutions:[['机器（DA / 转盘）（抛光盘）','即用','—'],['手工（施工海绵）','即用','—']],
 steps:['彻底清洗并除染。','擦干并用 CARPRO Eraser 脱脂。','机器：在 CARPRO Gloss 抛光盘上加 4 粒豌豆大小，在 60×60 cm 区域内零压力、低速施工。','手工：涂在软海绵上以画圈方式施工。','至少干燥 30 分钟后用干净超纤布擦掉。'],
 notes:['半永久纳米修复剂：填补陶瓷镀膜缺陷，提升光泽和性能，延长镀膜寿命。'],url:CARPRO+'essenceplus/'},

// ───────────────────────── 封体 / 快速养护 ─────────────────────────
{
 sds:{"url":"/sds/C-hydro2.pdf","source":"carpro-ws","language":"英文","version":"2018","hosting":"local","sha256":"dfb9ccdcde153c96f7e870f51e4807b358259ca35116fa708ab62f795d341be5","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-hydro2',brand:'C',category:'seal',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"sds","url":"/sds/C-hydro2.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB24-07-0011）：不适用","registration":"GB24-07-0011"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'HydrO2',type:'浓缩喷涂即冲硅封体',sizes:'50 ml · 500 ml · 1 L · 4 L',materials:'全部车身硬质表面 · CQUARTZ 镀膜面层',
 dilutions:[['喷涂即冲','1:6（官方：至少稀释到 1:6）','喷雾壶']],
 steps:['洗车并冲洗。','按 1:6 稀释（最少）。','在一个区域上喷一层细雾。','30 秒内冲洗所有施工区域，以及可能被飘到的区域。','进入下一区域，绕车重复。','擦干车辆。','最后用全新干净毛巾轻擦收尾。'],
 notes:["除非 CARPRO 另有说明，不要在阳光下使用。","最长 6 个月以上保护；可单独作封体，也可叠加在任何 CQUARTZ 镀膜上增加保护和光泽。"],url:CARPRO+'hydro2/'},

{
 sds:{"url":"/sds/C-hydro2-lite.pdf","source":"carpro-ws","language":"英文","version":"2019","hosting":"local","sha256":"02c279601ef0266b7d8e23d0ba75e38ea371d9c7ae42010016f95f50ea57cfea","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-hydro2-lite',brand:'C',category:'seal',ph:{"category":"neu","value":"7–8","basis":"raw","source":{"kind":"sds","url":"/sds/C-hydro2-lite.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB24-07-0011）：不适用","registration":"GB24-07-0011"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'HydrO2 Lite',type:'即用型喷涂即冲硅封体',sizes:'500 ml · 1 L · 4 L',materials:'车身外部表面',
 dilutions:[['喷涂即冲 / 喷涂擦拭','即用','喷雾壶']],
 steps:['在阴凉处施工。','摇匀，只在 2–3 个板块上喷一层细雾。','立即彻底冲洗所有区域。','重复直到整车完成。','擦干剩余水分。'],
 notes:["也可用「喷上擦掉」方式，或每次洗车后作快速美容剂 / 封体。","正确使用不会留条纹；保护可超过 3 个月（浓缩版 HydrO2 最长约 6 个月）。"],url:CARPRO+'hydro2lite/'},

{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/carpro-reload-2-0/sds.pdf","source":"chemcx","language":"英文","version":"2024","hosting":"remote"},
 id:'C-reload',brand:'C',category:'seal',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/carpro-reload-2-0/sds.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB23-07-0166）：不适用","registration":"GB23-07-0166"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Reload 2.0',type:'硅 + 硅氧烷喷涂封体',sizes:'50 ml · 100 ml · 500 ml · 1 L · 4 L',materials:'全部车身表面（可湿车施工） · CQUARTZ 镀膜维护',
 dilutions:[['喷涂擦拭（超纤布）','即用','—']],
 steps:['充分摇匀。','在约 50×50 cm 区域喷上 Reload 2.0。','用超纤布均匀抹开。','等待 30–60 秒。','用第二条干净超纤布擦到通透。','进入下一区域；换板块时把毛巾翻到干净面。'],
 notes:["不要在阳光直射下施工。","水性配方，可在潮湿表面施工；日常用车最长约 3 个月保护。","原为维护 CQUARTZ 镀膜而开发，也可单独作封体；官方说明书建议 CQ UK 3.0 最后一层 60 分钟后、CQ Lite 2.0 施工 4 小时后上 Reload。"],url:CARPRO+'reload/'},

{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/carpro-elixir-ceramic-detailer/sds.pdf","source":"chemcx","language":"英文","version":"2025","hosting":"remote"},
 id:'C-elixir',brand:'C',category:'seal',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/carpro-elixir-ceramic-detailer/sds.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 HB22-06-0081）：不适用","registration":"HB22-06-0081"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'EliXir',type:'高光快速美容剂',sizes:'50 ml · 500 ml · 1 L · 4 L',materials:'车身外部表面',
 dilutions:[['快速美容（超纤布）','即用','—']],
 steps:['充分摇匀。','在半个板块上轻喷。','立即抹开、揉入并擦掉。','用另一条干毛巾做最后擦拭并检查条纹，再进入下一区域。'],
 notes:["少量使用；结合陶瓷纳米技术带来光泽深度和疏水性。","官方维护指南：EliXir 用双毛巾法作封体，每 3 个月一次。"],url:CARPRO+'elixir/'},

{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/carpro-carpro-release-quick-detailer/sds.pdf","source":"chemcx","language":"英文","version":"2022","hosting":"remote"},
 id:'C-release',brand:'C',category:'seal',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/carpro-carpro-release-quick-detailer/sds.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB23-06-0041）：不适用","registration":"GB23-06-0041"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Release',type:'蜡基纳米封体（新镀膜固化期保护）',sizes:'50 ml · 500 ml · 1 L · 4 L',materials:'刚施工的陶瓷镀膜 · 车身外部',
 dilutions:[['喷涂擦拭（超纤布）','即用','—']],
 steps:['充分摇匀。','把 Release 喷在表面上。','用超纤布均匀抹开。','用第二条超纤布擦亮。'],
 notes:["在新镀膜车上施工，可在固化期间隔绝水、虫尸和鸟粪，无需传统等待，主要面向繁忙的施工店。","也可单独作快速美容剂；CQ Lite 2.0 说明书建议施工 4 小时后上 Release 或 Reload。"],url:CARPRO+'release/'},

{id:'C-madmatte',brand:'C',category:'seal',name:'MadMatte',type:'哑光 / 缎面专用硅封体',sizes:'50 ml · 100 ml · 500 ml · 1 L · 4 L',materials:'哑光 / 缎面车漆 · PPF · 改色膜 · 轮毂',
 dilutions:[['喷涂擦拭（超纤布）','即用','—']],
 steps:['可在湿或干的表面施工。','把产品喷在干净的优质超纤布上。','以交叉或画圈方式揉入，直到覆盖均匀。','用干超纤布擦去多余产品，留下均匀表面。'],
 notes:['不改变非亮面表面的质感；镀膜或未镀膜表面均可用，可单独作保护或延长现有陶瓷镀膜的疏水性能。'],url:CARPRO+'madmatte/'},

// ───────────────────────── 塑料 / 轮胎养护 ─────────────────────────
{
 sds:{"url":"/sds/C-perl.pdf","source":"carpro-ws","language":"英文","version":"2019","hosting":"local","sha256":"c7c0f3074986310fc776cfbf3ab9739235518c92643c698abd5d868e1d0cb360","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-perl',brand:'C',category:'trim',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"sds","url":"/sds/C-perl.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB24-07-0006）：不适用","registration":"GB24-07-0006"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Perl',type:'水性硅氧化物塑料 / 橡胶 / 轮胎护理剂',sizes:'500 ml · 1 L · 4 L',materials:'内外塑料 · 橡胶 · 人造革 · 现代皮革 · 轮胎',
 dilutions:[['外部塑料','1:3','喷雾壶'],['发动机舱','1:1 – 1:3','喷雾壶'],['轮胎 / 橡胶（轮胎海绵）','原液 – 1:1','—'],['内饰 / 仪表台 / 皮革','1:5','喷雾壶']],
 steps:['清除表面上的污垢、油和灰尘。','按对应表面的比例加水稀释。','装入喷壶并摇匀。','喷在表面上。','用超纤布擦拭；轮胎用 CARPRO 轮胎海绵，其他橡胶用普通海绵施工棉。'],
 notes:["恢复褪色材质的颜色，呈哑光至半光泽；抗 UV、耐水，疏水性优于普通上光剂。","官方页面轮胎 / 橡胶比例印作「1:0 – 1:1」，即原液至 1:1。官方维护指南建议每月给轮胎上一次。"],url:CARPRO+'perl/'},

{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/carpro-darkside-tire-and-rubber-sealant/sds.pdf","source":"chemcx","language":"英文","version":"2023","hosting":"remote"},
 id:'C-darkside',brand:'C',category:'trim',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GA23-06-0040）：不适用","registration":"GA23-06-0040"}],"conflict":false},name:'DarkSide',type:'即用型高浓缩轮胎 / 橡胶封体',sizes:'50 ml · 500 ml · 1 L · 4 L',materials:'轮胎 · 橡胶',
 dilutions:[['轮胎（轮胎海绵）','即用','—']],
 steps:['彻底清洗并擦干轮胎（推荐 ReTyre）。','在施工海绵上挤 2–3 下，均匀抹满胎壁。','让轮胎远离水，晾干 1–2 小时。'],
 notes:["60% 聚二甲基硅氧烷；高疏水、缎面黑、抗 UV、低 VOC。","每次施工最长可维持约 3 个月。","可用专用轮胎刷 DarkSide BRUSH 或 CARPRO MF 施工棉施工。"],url:CARPRO+'darkside/'},

// ───────────────────────── 玻璃 ─────────────────────────
{
 sds:{"url":"/sds/C-clarify.pdf","source":"carpro-ws","language":"英文","version":"2019","hosting":"local","sha256":"9381a91414cb9b51e468e1a7dae321b802b8617088078933a547442c2c551f02","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-clarify',brand:'C',category:'glass',ph:{"category":"neu","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB25-01-0083）：原液中性","registration":"GB25-01-0083"}],"conflict":false},name:'Clarify',type:'无痕玻璃清洁剂（镀膜安全）',sizes:'500 ml · 1 L · 4 L',materials:'车窗玻璃内外 · 玻璃镀膜',
 dilutions:[['玻璃（超纤布）','即用','—']],
 steps:['在 CARPRO GlassFiber 玻璃巾或 GlassMitt 上喷 1–2 下。','用湿润的超纤布以较大压力擦拭玻璃。','把 GlassFiber 翻到干净干燥的一面，擦去残留，达到无痕效果。'],
 notes:["去除交通膜、油污、指纹等污染，不损伤疏水玻璃镀膜。"],url:CARPRO+'clarify/'},

{
 sds:{"url":"/sds/C-clarify-phobic.pdf","source":"autonablask","language":"波兰文","version":"2021-04-23","hosting":"local","sha256":"5a4c0b5e95d6e5d3ce9ddd4adf380ba8b41eeebf632dbaba6a87e634a10518cd","originalUrl":"https://autonablask.pl/app/uploads/2026/02/clarifyph2obic_pl-pl_12.pdf","checkedAt":"2026-11-10"},
 id:'C-clarify-phobic',brand:'C',category:'glass',ph:{"category":"acid","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB25-07-0012）：原液弱酸性","registration":"GB25-07-0012"}],"conflict":false},name:'Clarify PHOBIC',type:'即时疏水无痕玻璃清洁剂',sizes:'—',materials:'玻璃（已镀膜 / 未镀膜）',
 dilutions:[['玻璃（超纤布）','即用','—']],
 steps:['摇匀，干或湿的玻璃均可施工。','在 20×20 cm 玻璃上喷 2–3 下；已镀膜玻璃喷 1 下即可。','用短毛超纤布均匀抹开。','翻面擦拭，直到无痕。'],
 notes:["可为已镀膜玻璃补充疏水，也可用于未镀膜玻璃的日常维护；提升雨天视野、减少雨刷跳动。"],url:CARPRO+'clarifyphobic/'},

{id:'C-gofx',brand:'C',category:'glass',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB26-06-0016）：不适用","registration":"GB26-06-0016"}],"conflict":false},name:'GofX',type:'玻璃油膜去除剂（镀膜前处理）',sizes:'250 ml · 500 ml · 1 L · 4 L · 套装',materials:'全部外部玻璃（前挡、车窗）',
 dilutions:[['手工 / 机器（超纤布）','即用','—']],
 steps:['在 BUFF 施工棉、超纤布或抛光盘上滴 2–3 粒豌豆大小的 GofX。','按 40×40 cm 小区域施工，画圈抛擦，直到玻璃变为亲水（水不再被排斥）。','用另一块湿超纤布擦拭该区域，检查是否亲水。','需要时重复，或进入下一区域。'],
 notes:["湿或干的玻璃均可，手工或机器均可。","官方推荐作为陶瓷镀膜或封体前的处理，使表面便于结合。"],url:CARPRO+'gofx/'},

{
 sds:{"url":"/sds/C-ceriglass.pdf","source":"carpro-ws","language":"英文","version":"2017","hosting":"local","sha256":"6c59c93a890acdf1c8b4be80b044790d8871b3534f17c3db88c769addf348553","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-ceriglass',brand:'C',category:'glass',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"/sds/C-ceriglass.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB22-06-0247）：不适用","registration":"GB22-06-0247"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'CeriGlass',type:'氧化铈玻璃抛光剂',sizes:'150 ml · 500 ml',materials:'玻璃 · 有机玻璃 · 金属 · 镀铬',
 dilutions:[['手工 / DA / 转盘（抛光盘）','即用','—']],
 steps:['清除表面所有污垢、油和灰尘。','充分摇匀，涂在施工棉或抛光盘上。','彻底抛光玻璃。','用水冲洗。'],
 notes:["陶瓷研磨颗粒 + 氧化铈 + 纳米成分，可去除严重水斑和轻微划痕；不含强溶剂或酸。"],url:CARPRO+'ceriglass/'},

// ───────────────────────── 多功能清洁 APC ─────────────────────────
{
 sds:{"url":"/sds/C-multix.pdf","source":"carpro-ws","language":"英文","version":"2018","hosting":"local","sha256":"b2a9ccca7a697781095244330659b07cfb1841f543b951ccbc068918d6e925e8","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-multix',brand:'C',category:'apc',ph:{"category":"alk","value":"12","basis":"raw","source":{"kind":"unrecorded"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GA25-01-0001）：原液碱性","registration":"GA25-01-0001"}],"conflict":false},name:'MultiX',type:'浓缩碱性多功能清洁剂',sizes:'500 ml · 1 L · 4 L',materials:'多种表面（不含皮革、裸铝及未涂层金属）',
 dilutions:[['常规清洁','1:20','喷雾壶'],['高压清洗','1:100','—'],['预洗（官方维护指南）','1:20','PA壶'],['轮胎（官方维护指南，配硬刷）','1:5','喷雾壶']],
 steps:['加水稀释 MultiX。','用海绵、刷子或喷壶施工。','彻底冲洗。'],
 notes:["重度污垢可用比 1:20 更浓的比例（官方未给出具体数值）。","禁止原液使用；不要用于皮革；不要用于裸铝或其他未涂层金属。","可作预洗，也可在洗车最后用于已保护表面的深层清洁和去污渍。"],url:CARPRO+'multix/'},

// ───────────────────────── 内饰 ─────────────────────────
{
 sds:{"url":"/sds/C-inside.pdf","source":"carpro-ws","language":"英文","version":"2018","hosting":"local","sha256":"6e9b8b2318f0289c8d7cc31fff97d1bdcd0843570d6ecdc3d40548067c0c2ec7","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'C-inside',brand:'C',category:'int',ph:{"category":"alk","value":"10.8","basis":"raw","source":{"kind":"unrecorded"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 HA25-01-0015）：原液碱性","registration":"HA25-01-0015"}],"conflict":false},name:'Inside',type:'内饰 / 皮革多用途清洁剂',sizes:'500 ml · 1 L · 4 L',materials:'人造革 · 塑料 · 光面皮革 · 织物 · 木饰 · Alcantara',
 dilutions:[['轻度清洁 / 内饰塑料','1:5','喷雾壶'],['Alcantara','1:10','喷雾壶']],
 steps:['摇匀，喷在超纤布上。','用这块清洁布涂在污渍区域。','用 CARPRO 细节刷或超纤布搅动。','用干净超纤布擦掉。','用湿超纤布去除残留。'],
 notes:["在表面停留不要超过 5 分钟。","不油腻、见效快，不会损伤皮革染色层；也可去除皮衣上的污渍。","官方 Leather 2.0 说明书指定用 Inside 做镀膜前清洁。"],url:CARPRO+'inside/'},

// pH source: https://www.carpro.my/product/carpro-cleanse-leather-1l-leather-cleaner/
{
 sds:{"url":"/sds/C-cleanse.pdf","source":"autonablask","language":"波兰文","version":"2023-06-26","hosting":"local","sha256":"55e3d488706f4869f91f85a87326f02a691cc30d942966bb1ae684a338cde47d","originalUrl":"https://autonablask.pl/app/uploads/2026/02/leather-cleanse_pl-pl_10.pdf","checkedAt":"2026-11-10"},
 id:'C-cleanse',brand:'C',category:'int',ph:{"category":"neu","value":"7.6","basis":"raw","source":{"kind":"product-page","url":"https://www.carpro.my/product/carpro-cleanse-leather-1l-leather-cleaner/"},"evidence":[{"kind":"statement","source":"product-page","text":"pH 7.6 来自 CARPRO 马来西亚产品页；本站按 6–8 归入中性范围。韩国申报的弱碱性描述保留供对照。"},{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB25-01-0012）：原液弱碱性","registration":"GB25-01-0012"}],"conflict":true},name:'Cleanse',type:'泡沫皮革清洁剂',sizes:'500 ml · 1 L',materials:'所有类型皮革',
 dilutions:[['皮革','即用','喷雾壶']],
 steps:['用泡沫喷头把 Cleanse 同时喷在皮革刷和一块皮革区域上。','以轻压力从不同方向轻轻刷洗。','用 Terry 毛巾擦去清洁剂和污垢。','需要时重复，并不时用水冲洗皮革刷。','进入下一区域，重复以上步骤。'],
 notes:["不改变皮革外观；搭配 CARPRO 专用皮革刷，作为护理（Lotion）前的清洁步骤。"],url:CARPRO+'cleanse/'},

{
 sds:{"url":"/sds/C-lotion.pdf","source":"bb-carcare","language":"荷兰文","version":"2023-06-23","hosting":"local","sha256":"10ad1d2cd7f234ab323a8a8b97a289d17e60cab2115ad3326034ada53049d2ef","originalUrl":"https://www.bb-carcare.be/wp-content/uploads/2024/07/Leather-Lotion_B-nl_10.pdf","checkedAt":"2026-11-10"},
 id:'C-lotion',brand:'C',category:'int',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 GB25-06-0004）：不适用","registration":"GB25-06-0004"}],"conflict":false},name:'Lotion',type:'保护型皮革护理乳',sizes:'—',materials:'所有类型皮革（含重纹理皮革）',
 dilutions:[['皮革（施工棉）','即用','—']],
 steps:['清洁皮革并让表面干燥。','在 MicroBuff 施工棉上取豌豆大小的 Lotion，在 40×40 cm 区域内抹开。','轻轻按摩进皮革，直到表面均匀覆盖。','用 Terry 毛巾擦去多余部分。','进入下一区域重复。'],
 notes:["防汗渍、液体和轻度污染，不改变皮革外观，恢复柔软手感并抗 UV。","官方推荐先用 Cleanse 清洁（SkinCare 套装）。"],url:CARPRO+'lotion/'},

{
 sds:{"url":"/sds/C-innerqd.pdf","source":"autonablask","language":"波兰文","version":"2023-04-11","hosting":"local","sha256":"b80ebb7406fcd090c0e73b78f568201b2f9857b5060af95b2c2ae37c59c8ec14","originalUrl":"https://autonablask.pl/app/uploads/2026/02/innerqd-inner-detailer_pl-pl_11.pdf","checkedAt":"2026-11-10"},
 id:'C-innerqd',brand:'C',category:'int',ph:{"category":"neu","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 HB22-01-0075）：原液中性","registration":"HB22-01-0075"}],"conflict":false},name:'InnerQD',type:'内饰防静电抗菌快速美容剂',sizes:'50 ml · 500 ml · 1 L · 4 L',materials:'全部内饰表面 · 亮面饰板 · 玻璃 · 屏幕',
 dilutions:[['内饰（超纤布）','即用','—']],
 steps:['大量喷在超纤布或施工棉上，擦拭需要的内饰表面。','亮面饰板、玻璃或屏幕：30 秒后用另一条干 Terry Weave 毛巾做最后擦拭。'],
 notes:["留下干爽、缎面、无痕的防静电层，减少积尘，效果最长约 4 周。"],url:CARPRO+'innerqd/'},

{id:'C-so2pure',brand:'C',category:'int',name:'So2Pure 2.0',type:'光催化内饰除味镀层',sizes:'100 ml',materials:'所有内饰软硬表面',
 dilutions:[['内饰','即用','喷雾壶']],
 steps:['软表面：彻底清洁 → 充分摇匀 → 均匀喷在表面，在阳光下晾干。','硬表面：彻底清洁 → 充分摇匀 → 喷上后在室温下晾至目视干燥 → 擦掉残留避免不均，再移到阳光下完成光催化反应。'],
 notes:['光照到处理表面时才起作用，针对微生物、霉菌、尼古丁、宠物及化学异味；茉莉香味。'],url:CARPRO+'sopure/'},

// ───────────────────────── 配件 ─────────────────────────
{
 sds:{"url":"/sds/C-mfx.pdf","source":"ingrijireauto","language":"英文","version":"2023-04-11","hosting":"local","sha256":"9f4c5574ee073afe2a72bd2fdcd19c771fd0c2722ddddc8772262c0f0b34abf6","originalUrl":"https://ingrijireauto.ro/index.php?controller=attachment&id_attachment=224","checkedAt":"2026-11-10"},
 id:'C-mfx',brand:'C',category:'towel',name:'MFX',type:'超纤布 / 抛光盘清洗剂',sizes:'50 ml · 500 ml · 1 L · 4 L',materials:'超纤布 · 擦干巾 · 抛光盘',
 dilutions:[['洗衣机洗超纤布','50 ml / 次','—'],['浸泡抛光盘','1:200（50 ml / 10 L）','桶洗']],
 steps:['超纤布：在洗衣机洗涤剂盒中加 50 ml，选轻柔或化纤程序，40–60 °C。','抛光盘：50 ml MFX 加 10 L 水（1:200），浸泡至少 1 小时后挤干，再用清水冲净；需要时浸泡后用盘刷刷洗。','抛光盘清洗桶：加 30 ml MFX，加水到刻度线，按清洗桶说明操作。'],
 notes:[],url:CARPRO+'mfx/'},

{id:'C-dhydrate',brand:'C',category:'acc',name:'DHydrate',type:'扭绒擦干巾',sizes:'20×20" · 28×40"',materials:'裸漆 · 打蜡 · 封体 · 镀膜表面',dilutions:[],
 steps:['把毛巾平铺在湿表面上，慢慢拖过即可吸走水分。'],notes:['浅灰色便于看到脏污颗粒，减少洗车纹；无锁边。'],url:CARPRO+'dhydrate/'},

{id:'C-merino-mitt',brand:'C',category:'acc',name:'Merino Wool Mitt',type:'100% 美利奴羊毛洗车手套',sizes:'—',materials:'车漆',dilutions:[],
 steps:['官方维护指南：两桶法配合美利奴羊毛手套洗车，车身下部改用超纤手套。'],notes:['带手掌口袋，易穿脱、不易滑落；容易晾干，减少羊毛手套常见的腐烂。'],url:CARPRO+'merinowoolmitt/'},

{id:'C-detailing-brushes',brand:'C',category:'acc',name:'Detailing Brushes',type:'细节刷（两支装 / XL）',sizes:'2 支装 · XL',materials:'内外全部表面',dilutions:[],
 steps:['猪鬃刷：外饰条、车标和重污区域。','合成软毛刷（分叉毛尖）：需要无划痕清洁的细腻表面。','XL 刷：发动机舱、轮毂等较大区域。'],notes:['耐化学品。'],url:CARPRO+'detailingbrushes/'},

{id:'C-darkside-brush',brand:'C',category:'acc',name:'DarkSide BRUSH',type:'轮胎上光刷',sizes:'50 mm · 70 mm',materials:'轮胎 · 饰条 · 内饰',dilutions:[],
 steps:['用于施工 DarkSide 及其他轮胎护理剂，柔软致密的刷毛可把产品刷进胎壁的纹理和细节。'],notes:['耐溶剂尼龙毛，配专用收纳座。'],url:CARPRO+'darksidebrush/'},

{id:'C-mf-applicator',brand:'C',category:'acc',name:'MF Applicator',type:'超纤镀膜施工棉',sizes:'—',materials:'镀膜施工',dilutions:[],
 steps:['用于施工 CQUARTZ、DQUARTZ 等陶瓷镀膜，内芯不吸收镀膜，减少浪费。'],notes:['无绒、不留痕，可重复使用。'],url:CARPRO+'mfapplicator/'},

{id:'C-clays',brand:'C',category:'acc',name:'Clays X3',type:'除染黏土（温和 / 强力，3×100 g）',sizes:'3×100 g',materials:'车漆',dilutions:[],
 steps:['先洗车。','一次一个板块、小区域施工。','把黏土捏成合适形状，在板块上喷 ClayLube。','不加压，以重叠的直线在表面滑动。','经常折叠黏土，保持干净面接触表面。','保持充分润滑，直到黏土滑动顺畅。','彻底冲洗。','用后用原包装膜包好，防粘并延长寿命。'],
 notes:['耐香波和高 pH 清洁剂，分解较慢；温和与强力两种等级分别销售。'],url:CARPRO+'claysx3/'},

{id:'C-polyshave',brand:'C',category:'acc',name:'PolyShave',type:'橡胶聚合物除染块 / 巾 / 盘',sizes:'Block · Towel · Disc',materials:'车漆 · 玻璃',dilutions:[],
 steps:['用于代替传统黏土，去除路面污垢、柏油、飞漆、水斑、树汁和铁粉。'],notes:['可冲洗后重复使用；官方页面未给出施工步骤和润滑剂要求。'],url:CARPRO+'polyshave/'},

{id:'C-dilute',brand:'C',category:'acc',name:'Dilute',type:'多比例稀释喷瓶',sizes:'500 ml · 1 L',materials:'—',dilutions:[],
 steps:['先加水到所需比例刻度线（1:1 至 1:30）。','再加 CARPRO 产品到顶部满刻度线。','摇匀。'],notes:['易起泡的产品先加水更准确；产品多于水的浓配比，先加产品再轻轻加水。'],url:CARPRO+'dilute/'}
];

export const flows: Flow[] = [
{id:'f-c-cq-maint',brand:'C',name:'CQUARTZ 镀膜车维护洗车',en:'CARPRO How-To · CQUARTZ Maintenance',scene:'coated',tags:['日常洗车','轮毂'],
 summary:'CARPRO 官方镀膜车维护指南，分六步：除染、预洗、细节手洗、擦干、封体与上光、配件。按周期执行可保持 CQUARTZ 镀膜的疏水和光泽。',
 steps:[
  {phase:'轮毂轮胎除染',pH:'neu',products:['C-ironx'],extras:['轮毂刷'],ratio:'即用',how:'IronX 喷在轮毂上停约 2 分钟 → 刷洗 → 再停 2 分钟 → 冲洗。已镀膜车漆和轮毂每 6 个月一次，未镀膜轮毂每 1–2 个月一次。哑光 / 磨砂轮毂先用 Lift 或 MultiX 预喷冲洗。'},
  {phase:'轮胎清洁',pH:'alk',products:['C-multix'],extras:['较硬的刷子'],ratio:'1:5',how:'MultiX 1:5 配较硬的刷子刷洗轮胎。'},
  {phase:'预洗',pH:'alk',variants:[
    {name:'Lift 泡沫预洗',pH:'alk',products:['C-lift'],ratio:'1:10',how:'最好用PA壶或泡沫壶延长停留时间，内轮拱也要喷到，再从车顶往下冲洗。用热水效果更好。冬季每 1–2 个月、夏季每 3 个月一次。'},
    {name:'MultiX 预洗',pH:'alk',products:['C-multix'],ratio:'1:20',how:'同样建议用PA壶或泡沫壶，内轮拱也要喷到，从车顶往下冲洗。'},
  ]},
  {phase:'细节手洗',pH:'alk',products:['C-reset','C-merino-mitt','C-detailing-brushes'],extras:['两个水桶','超纤洗车手套（车身下部）'],ratio:'1:500',how:'Reset 1:500。先用软毛细节刷清洁窄缝，再用两桶法配美利奴羊毛手套手洗；车身下部用超纤手套。玻璃可用 Clarify。从车顶往下冲洗。不要在阳光直射下洗，不要让香波干掉。'},
  {phase:'擦干',products:['C-dhydrate'],extras:['GlassFiber 玻璃巾','吹水机 / 压缩空气'],how:'把 DHydrate 平铺拖过表面；玻璃用 GlassFiber 毛巾；剩余水分用吹水机或压缩空气吹掉。'},
  {phase:'封体',products:['C-reload','C-elixir'],alt:true,ratio:'即用',how:'每 3 个月一次：Reload 喷上擦掉；或 EliXir 快速美容剂双毛巾法施工。'},
  {phase:'轮胎饰条上光',products:['C-perl'],extras:['轮胎海绵 / 超纤施工棉'],ratio:'按标签稀释',how:'Perl 按标签比例稀释，用轮胎海绵或超纤施工棉施工；轮胎每月一次。'},
 ],
 notes:['指南还推荐：稀释瓶（Dilute）、施工棉、美利奴羊毛和超纤洗车手套、超纤毛巾和细节刷。','Perl 官方比例：轮胎 / 橡胶原液至 1:1，外部塑料 1:3，见 Perl 产品页。'],
 url:'https://carpro.global/wp-content/uploads/2021/03/CP_HOWTO_CQ-maintenance-1.pdf'},

{id:'f-c-coat-prep',brand:'C',name:'陶瓷镀膜施工（CQ Lite 2.0 说明书）',en:'CQUARTZ Lite 2.0 Application',scene:'coated',tags:['交通膜 / 深度清洁','新车'],
 summary:'官方 CQ Lite 2.0 说明书给出的完整施工顺序：洗车 → IronX / TarX / 黏土完全除染 → 需要时抛光 → Eraser 脱脂 → 镀膜 → 4 小时后 Reload 或 Release 保护。',
 steps:[
  {phase:'洗车',pH:'alk',products:['C-reset'],ratio:'1:500',how:'先洗车（说明书写作 Wash，香波以 Reset 为例，比例见 Reset 产品页）。'},
  {phase:'除铁',pH:'neu',products:['C-ironx'],ratio:'即用',how:'喷上停留 3–5 分钟至变紫红，用湿软海绵揉开后彻底冲洗。'},
  {phase:'去柏油',products:['C-tarx'],ratio:'即用',how:'喷在干燥表面反应 2–3 分钟（不超过 7–10 分钟），之后洗车。'},
  {phase:'黏土',products:['C-clays','C-claylube'],how:'喷 ClayLube 后不加压滑动黏土，经常折叠，彻底冲洗。'},
  {phase:'抛光（可选）',products:['C-ultracut','C-clearcut','C-fixer','C-reflect'],alt:true,how:'说明书写「可在 Eraser 前抛光去除缺陷」，未指定具体抛光剂；按漆面状况选择 CARPRO 研磨 / 抛光剂。'},
  {phase:'脱脂',products:['C-eraser'],ratio:'即用',how:'Eraser 喷上后用超纤布擦掉；表面须冷却且干燥。'},
  {phase:'镀膜',products:['C-cq-lite'],ratio:'即用',how:'交叉纹路涂满约 60×60 cm，薄而均匀；至少 5 分钟闪干后擦掉（最长 15 分钟）。2 小时内可修补漏涂或高点。保持干燥 4 小时，前 24 小时擦掉水珠。'},
  {phase:'固化期保护',products:['C-reload','C-release'],alt:true,ratio:'即用',how:'施工 4 小时后上 Reload 或 Release，防止前 48 小时出现水斑。'},
 ],
 notes:['其他 CQUARTZ / DQUARTZ 镀膜的施工细节（层数、闪干、层间时间）不同，见各产品条目。','CQ UK 3.0 说明书：最后一层 60 分钟后上 Reload；CQ SiC 说明书：不需要再上 Reload。'],
 url:CP_MAN+'CARPRO_CQ_Lite2_Manual_fde700b1ce.pdf'},

{id:'f-c-hydro2',brand:'C',name:'洗车 + HydrO2 喷涂即冲封体',en:'HydrO2 Spray & Rinse',scene:'daily',tags:['保护 / 镀膜车'],
 summary:'官方 HydrO2 用法：洗车冲洗后，湿车喷 1:6 的 HydrO2 细雾，30 秒内冲掉，再擦干收尾，最长 6 个月以上保护。',
 steps:[
  {phase:'洗车并冲洗',pH:'alk',products:['C-reset'],ratio:'1:500',how:'先洗车并冲洗（Reset 比例见产品页）。'},
  {phase:'喷涂即冲',variants:[
    {name:'HydrO2 浓缩',products:['C-hydro2'],ratio:'1:6',how:'按 1:6（最少）稀释，在一个区域上喷细雾，30 秒内冲洗该区域及被飘到的地方，绕车重复。'},
    {name:'HydrO2 Lite 即用',products:['C-hydro2-lite'],ratio:'即用',how:'阴凉处，一次在 2–3 个板块上喷细雾，立即彻底冲洗，绕车重复。'},
  ]},
  {phase:'擦干收尾',products:['C-dhydrate'],how:'擦干车辆，最后用干净毛巾轻擦一遍。'},
 ],
 notes:['除非官方另有说明，不要在阳光下施工。','HydrO2 可叠加在任何 CQUARTZ 镀膜上。'],
 url:CARPRO+'hydro2/'},

{id:'f-c-descale',brand:'C',name:'Descale 酸性除垢洗车',en:'Descale Acidic Wash',scene:'tfr',tags:['保护 / 镀膜车','水垢 / 水斑'],
 summary:'官方 Descale 用法：轻度污染当泡沫预洗再手洗；较重污染逐板手洗、延长停留。可去交通膜和矿物沉积，恢复镀膜性能。',
 steps:[
  {phase:'泡沫预洗',pH:'acid',products:['C-descale'],ratio:'1:10',how:'泡沫壶或喷壶 1:10，当作泡沫预洗喷上，尽量延长停留时间但不要干掉，然后冲洗。'},
  {phase:'手洗',pH:'acid',products:['C-descale'],extras:['洗车手套'],ratio:'1:100',how:'水桶 1:100。较重污染逐板施工，先做水平面，每块让 Descale 多停留一会儿但不要干掉，必要时重复。'},
  {phase:'冲洗',how:'用清水彻底冲洗。'},
 ],
 notes:['Descale 也可用于去除旧蜡 / 封体、抛光前处理和抛光后脱脂。'],
 url:CARPRO+'descale/'},

{id:'f-c-tyre',brand:'C',name:'轮胎清洁与封体',en:'ReTyre + DarkSide / BlackOut 2.0',scene:'wheel',tags:[],
 summary:'官方组合：先用 ReTyre 深层清洁轮胎直到泡沫变白，晾干后用 DarkSide 封体（约 3 个月），或用 CQUARTZ BlackOut 2.0 镀膜。',
 steps:[
  {phase:'轮毂清洁',pH:'acid',products:['C-wheelx'],extras:['Flat/Spot 轮毂刷 / WheelsMitt'],ratio:'即用',how:'大量喷在轮毂、轮拱、卡钳上，停留 1–2 分钟不要干掉，必要时刷洗，5 分钟内冲洗。不要用于裸铝和车漆。'},
  {phase:'轮胎深层清洁',pH:'alk',products:['C-retyre'],extras:['中硬刷'],ratio:'即用',how:'高压水冲掉浮尘 → 大量喷 ReTyre 停 30 秒 → 把产品喷在刷子上刷洗 → 冲洗 → 重复直到泡沫变白。'},
  {phase:'轮胎保护',variants:[
    {name:'DarkSide 封体',products:['C-darkside','C-darkside-brush'],ratio:'即用',how:'轮胎干燥后，在施工海绵或 DarkSide BRUSH 上挤 2–3 下抹满胎壁，远离水晾干 1–2 小时。最长约 3 个月。',src:CARPRO+'darkside/'},
    {name:'BlackOut 2.0 镀膜',products:['C-cq-blackout'],ratio:'即用',how:'轮胎完全干燥后（可用 ReTyre 或 MultiX 清洁），倒一条到轮胎海绵上涂满胎壁，10 分钟后用麂皮布擦匀；可 1–2 小时后上第二层。完全固化 12 小时，3 天内避免香波。',src:CP_MAN+'CARPRO_CQ_Black_Out_2_Manual_45cdf31f39.pdf'},
  ]},
 ],
 notes:['WheelX 步骤来自 WheelX 产品页；该页推荐 ReTyre 作为最佳轮胎清洁方案。'],
 url:CARPRO+'darkside/'},

{id:'f-c-leather',brand:'C',name:'皮革清洁与护理',en:'SkinCare · Cleanse + Lotion',scene:'int',tags:[],
 summary:'官方 SkinCare 套装：泡沫清洁剂 Cleanse 配皮革刷清洁毛孔，再用 Lotion 配 MicroBuff 施工棉护理。需要长效保护时改用 Inside 清洁 + CQUARTZ Leather 2.0 镀膜。',
 steps:[
  {phase:'清洁',products:['C-cleanse'],extras:['CARPRO 皮革刷','Terry 毛巾'],ratio:'即用',how:'泡沫喷在刷子和一块皮革上，轻压多方向刷洗，用 Terry 毛巾擦掉；不时冲洗刷子。'},
  {phase:'护理',products:['C-lotion'],extras:['MicroBuff 施工棉'],ratio:'即用',how:'皮革干燥后，取豌豆大小在 40×40 cm 区域抹开按摩，用 Terry 毛巾擦去多余部分。'},
 ],
 branch:{name:'改为皮革镀膜（Leather 2.0 说明书）',steps:[
  {phase:'清洁',products:['C-inside'],ratio:'1:5',how:'用 Inside 清除污垢、湿气和油脂（不留封体或护理剂），有残留用湿毛巾擦掉。'},
  {phase:'镀膜',products:['C-cq-leather'],ratio:'即用',how:'挤一条到施工块海绵面，揉入褶皱和毛孔，2–3 分钟内擦掉多余部分；第二层前等待 30 分钟（风扇）至 2 小时（15 °C）。前 3 天不要清洁皮革。'},
 ]},
 notes:['Inside 1:5 为官方「轻度清洁 / 内饰塑料」比例。'],
 url:CARPRO+'skincarekit/'}
];

export const combos: Combo[] = [
{id:'c-c-bugout',brand:'C',name:'夏季虫尸预处理',scene:'coated',tags:['日常洗车'],base:'f-c-cq-maint',at:'在第 3 步「预洗」之前',
 summary:'虫尸要尽早处理。BugOut 泡沫不飞溅，对镀膜、玻璃和 PPF 安全，处理后接着正常洗车。',
 steps:[
  {phase:'虫尸预处理',products:['C-bugout'],ratio:'即用',how:'摇匀后喷在虫尸上，等 5–30 秒开始溶解，需要时用超纤布轻擦；停留不超过 5 分钟，避免阳光直射。之后用 Reset 洗车或 ECH2O 去除残留。'},
 ],
 notes:[],url:CARPRO+'bugout/'},

{id:'c-c-ironxss',brand:'C',name:'除铁泡沫预洗',scene:'coated',tags:['交通膜 / 深度清洁'],base:'f-c-cq-maint',at:'替换第 3 步「预洗」',
 summary:'IronX Snow Soap 把除铁和泡沫预洗合为一步，对 CQUARTZ / DQUARTZ 镀膜安全，适合镀膜车半年一次的除染。',
 steps:[
  {phase:'除铁泡沫',pH:'neu',products:['C-ironx-ss'],ratio:'PA壶原液 · 桶洗 1:8',how:'PA壶不稀释、关闭调节阀覆盖整车；或手套 / 水桶 1:8。停留到铁粉反应变色，不要干掉，彻底冲洗。'},
 ],
 notes:[],url:CARPRO+'ironxss/'},

{id:'c-c-hydro2foam',brand:'C',name:'洗涂一步',scene:'coated',tags:['日常洗车'],base:'f-c-cq-maint',at:'替换第 4 步「细节手洗」',
 summary:'HydrO2 Foam 是中性香波，洗车同时留下硅壳保护（约 3 个月），省去单独封体步骤。',
 steps:[
  {phase:'洗涂一步',pH:'acid',products:['C-hydro2-foam'],ratio:'PA壶 1:9 · 桶洗 1:20',how:'阴凉处先冲湿整车。PA壶 1:9（阀门完全关闭）覆盖整车后立即用手套洗并冲洗；或水桶 1:20 一次洗一个区域并立即冲洗。用 DHydrate 擦干或吹干。'},
 ],
 notes:['阳光直射或高温表面可能出现条纹，用湿超纤布蘸产品擦掉即可。'],url:CARPRO+'hydro2foam/'},

{id:'c-c-spotless',brand:'C',name:'水斑 / 水垢处理',scene:'coated',tags:['水垢 / 水斑'],base:'f-c-cq-maint',at:'第 4 步「细节手洗」之后',
 summary:'Spotless 2.0 官方要求先用 Reset 洗车、冲洗并擦干，再逐板去除矿物沉积。对 CQUARTZ 镀膜安全。',
 steps:[
  {phase:'去水斑',pH:'acid',products:['C-spotless'],extras:['两条湿 Terry Weave 毛巾'],ratio:'即用',how:'室内或阴凉处、冷板施工。喷在板块或湿毛巾上抹开，停 30 秒–1 分钟后擦拭，不要干掉；用第二条湿毛巾擦掉。每块冲水擦干后再做下一块。'},
 ],
 notes:['可能影响玻璃镀膜、传统封体和蜡；不要直接喷玻璃。'],url:CARPRO+'spotless/'},

{id:'c-c-gliss',brand:'C',name:'镀膜加 Gliss 2.0 面层',scene:'coated',tags:[],base:'f-c-coat-prep',at:'替换第 8 步「固化期保护」',
 summary:'CQUARTZ Gliss 2.0 可作 CQ / DQ 镀膜的超滑面层，提升疏油性和抗水斑能力。',
 steps:[
  {phase:'面层',products:['C-cq-gliss'],ratio:'即用',how:'底层 CQUARTZ 施工超过 4 小时后（红外灯固化则 45 分钟）施工。每次 50×50 cm，出现白雾立即擦掉；多层间隔 1 小时。保持干燥 1 小时，24 小时内擦掉水分，5–7 天内避免清洁剂。'},
 ],
 notes:[],url:CP_MAN+'CARPRO_CQ_Gliss_Manual_68150d4031.pdf'}
];
