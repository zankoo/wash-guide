// MAFRA（MA-FRA，意大利）本家产品与流程数据。来源：mafra.it 英文版产品页（用法缺失时参考意大利文版），2026-10 整理翻译。
// MAFRA 是 Labocosmetica 与 Maniac Line 的母公司；这里只收录 MAFRA 品牌下的手工洗车 / 美容产品，
// 不收录大桶专业装；兼有零售与大桶规格的产品仅列零售规格。
// 不含 Maniac Line（已单独收录）、隧道式 / 自助洗车房设备药剂、家政、船艇、香氛与工业清洗产品。
// 比例写法沿用官方：1:10 = 1 份原液 + 10 份水；官方写百分比的保留原文并附换算
import type { Combo, Flow, Product } from './types';

const MAFRA = 'https://mafra.it/en/';

export const products: Product[] = [
// ───────────────────────── 预洗 ─────────────────────────
{
 sds:{"url":"https://docs.ebay.com/document/cd1b405e-1e46-4fd1-bf46-a2a0a7986b7b","source":"ebay","language":"意大利文","version":"2025","hosting":"remote"},
 id:'F-supermafrasol',brand:'F',category:'pre',ph:{"category":"alk","value":"> 12","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0267_1.pdf"},"evidence":[],"conflict":false},name:'Supermafrasol',type:'高浓缩重污预洗 / 去油剂（去交通膜）',sizes:'900 ml',materials:'车漆 · 车身外部 · 发动机（不可用于铝和轻合金）',
 dilutions:[['去油清洁（按污垢和停留时间）','1:5 – 1:55','喷雾壶']],
 steps:['按污垢、表面和停留时间稀释。','在阴凉处由下往上喷涂，分布更均匀。','不要让溶液干在表面上，用水彻底冲洗。','擦干。'],
 notes:['不要用于铝、轻合金件和摩托车。','深色、老旧或氧化的车漆不要在车身发热时洗。','可去除浅色车上的交通膜和雾斑；硬水中高倍稀释也有效。','专业用途。'],url:MAFRA+'pulire-e-sgrassare-auto-professionale-supermafrasol/'},

{id:'F-supermafrasol-evo',brand:'F',category:'pre',ph:{"category":"alk","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EA25-01-0020）：原液碱性","registration":"EA25-01-0020"}],"conflict":false},name:'Super Mafrasol EVO',type:'碱性多用途去油预洗剂（交通膜 / 虫尸 / 鸟粪）',sizes:'900 ml',materials:'车漆 · 轮毂 · 轮胎 · 塑料 · 橡胶饰条（不可用于铝和铝合金）',
 dilutions:[['轻度日常维护','1:20 – 1:50','喷雾壶'],['重度脏污','1:5 – 1:10','喷雾壶'],['地面油污清洁','1:5 – 1:10','喷雾壶']],
 steps:['先用水把灰尘和大颗粒脏污轻轻冲掉。','按脏污程度稀释（瓶盖带刻度，可直接量取）。','在阴凉处均匀喷在车身上，让它和污垢反应 30 秒 – 2 分钟，不要让它干掉。','干掉之前用高压水彻底冲净，不留残留；如果留下水痕，再喷一次后冲洗或擦掉。'],
 notes:["标签注明为碱性原液，按 1:5–1:50 使用（20–200 ml / 1 L）。","不要用于铝和铝合金表面，不要在发热的表面或阳光直射下施工。","只用于外部，不要在车内使用。","镀膜车：高浓度反复使用会影响镀膜的持久度，只在需要的部位局部使用。","塑料和橡胶饰条在推荐比例内可用，用完要充分冲洗；其他敏感材质先小面积测试。","不要和其他产品混合；佩戴手套，保持通风。","这是 MAFRA 2025 年在韩国推出的新品，mafra.it 还没有收录，资料来自韩国官方商城 maframall.com 和韩国安全标示（EA25-01-0020）。"],url:'https://maframall.com/product/detail.html?product_no=1097'},

{id:'F-idrowash',brand:'F',category:'pre',name:'Idrowash',type:'高压清洗机用超泡沫清洁剂（预洗 / 泡沫香波）',sizes:'1 L',materials:'车漆 · 镀铬 · 车身外部',
 dilutions:[['高压清洗机泡沫枪 / 泡沫壶','1:1','PA壶']],
 steps:['原液和水 1:1 倒入高压清洗机的储液罐或 Nebula Foam 2.0。','喷满表面，停留几分钟，不需要刷洗。','彻底冲洗。'],
 notes:['官网核对：1:1 是原液与水在泡沫设备储液罐内的配比，不是高压水混合后的最终出液浓度。','官方说明 pH 平衡，对车漆和镀铬安全，冷水也有效。','可去除冬季盐渍、夏季树脂、秋季泥土和春季灰尘。'],url:MAFRA+'idrowash/'},

{id:'F-killer',brand:'F',category:'pre',ph:{"category":"alk","value":"10","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0785_1.pdf"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 EB19-01-0428）。","registration":"EB19-01-0428"}],"conflict":false},name:'Killer',type:'即用型虫尸 / 鸟粪去除剂（弱碱性）',sizes:'250 ml · 500 ml',materials:'车漆 · 玻璃 · 保险杠 · 大灯',
 dilutions:[['虫尸、鸟粪、树脂斑','即用','喷雾壶']],
 steps:['先冲洗车身，去掉粗大的污垢。','均匀喷在虫尸上，停留约 1 分钟。','用干燥超纤布擦掉（或用海绵 / 手套），再正常洗车。'],
 notes:["不需要刷洗，能溶解已经干掉的虫尸。","对车漆、塑料、玻璃和大灯安全。"],url:MAFRA+'togliere-moscerini-auto-killer/'},

// ───────────────────────── 洗车香波 / 无水洗 ─────────────────────────
{
 sds:{"url":"https://shop.gruppogesa.it/media/attachment/93683/scheda%20sicurezza.pdf","source":"gesa","language":"意大利文","hosting":"remote"},
 id:'F-shampoo-power',brand:'F',category:'wash',ph:{"category":"neu","value":"7.5","basis":"raw","source":{"kind":"sds","url":"https://shop.gruppogesa.it/media/attachment/93683/scheda%20sicurezza.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 EB20-01-0725）。","registration":"EB20-01-0725"},{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB20-01-0725）：原液弱碱性","registration":"EB20-01-0725"},{"kind":"resolution","rule":"sds-overrides-category","previousCategory":"alk"}],"conflict":true},name:'Shampoo Power',type:'高浓缩自去油洗车香波',sizes:'1 L',materials:'车漆 · 哑光 / 缎面车漆 · 改色膜 · 铝 · 喷漆轮毂',
 dilutions:[['桶洗','1 瓶盖 / 1 L 水（5 瓶盖 / 5 L）','桶洗'],['桶洗（韩国标签标准用量）','1:400（25 ml / 10 L）','桶洗']],
 steps:['每升水加一瓶盖原液，5 L 水桶加 5 瓶盖。','用海绵或洗车手套洗车。','冲洗后擦干。'],
 notes:["泡沫丰富、易冲洗，不留残留和水痕；一瓶约洗 30 次。","对铝条、喷漆轮毂、哑光 / 缎面漆和改色膜安全。"],url:MAFRA+'shampoo-auto-power-concentrato/'},

{
 sds:{"url":"https://www.bricocenter.it/prodotti/media/magma_akeneo_connector/media_files/3/4/f/f/34ff67aad5f0198d003d7e695107dfc22d3e8bab_490000708.pdf","source":"bricocenter","language":"意大利文","version":"2024","hosting":"remote"},
 id:'F-shampoo-cera',brand:'F',category:'wash',ph:{"category":"alk","value":"8.5","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/wp-content/uploads/2022/05/H0930_1.pdf"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 EB22-01-0951）。","registration":"EB22-01-0951"}],"conflict":false},name:'Car Wash Shampoo e Cera',type:'含蜡洗车香波（洗护一体）（弱碱性）',sizes:'1 L',materials:'车漆 · 玻璃',
 dilutions:[['桶洗','1 瓶盖 / 1 L 水','桶洗'],['桶洗（韩国标签标准用量）','1:100（100 ml / 10 L）','桶洗']],
 steps:['先预洗，去掉大部分污垢并让车身降温。','每升水加一瓶盖原液，用手套或超纤海绵洗车。','用大量清水冲洗后擦干。'],
 notes:["蜡成分让前挡上的水珠容易流走，擦干更快。"],url:MAFRA+'shampoo-e-cera-per-auto/'},

{
 sds:{"url":"/sds/F-polish-express.pdf","source":"mafra-fr","language":"法文","version":"2025-03-28","hosting":"local","sha256":"b089d528332a114c371b78a3c9d0208106efc80b0d33f28e0446b75745ac91d0","originalUrl":"https://algeria.mafra.com/files/POLISH%20EXPRESS_433_FR_5.pdf","checkedAt":"2026-11-10"},
 id:'F-polish-express',brand:'F',category:'wash',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0420_1.pdf"},"evidence":[],"conflict":false},name:'Polish Express',type:'当香波用的纳米抛光剂（洗车同时上光）',sizes:'250 ml（套装附海绵）· 4.5 L',materials:'车漆 · 车身外部',
 dilutions:[['手洗上光','按瓶身刻度稀释（250 ml 约洗 5 辆车）','桶洗']],
 steps:['按瓶身的稀释说明加水。','像香波一样手洗全车（套装附专用海绵）。','冲洗后擦干。'],
 notes:['凝胶状，官方称保护最长 6 周。','官方建议在黏土除染后用它做「封闭洗车」。'],url:MAFRA+'kit-polish-express/'},

{id:'F-waterless',brand:'F',category:'wash',ph:{"category":"alk","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 EB24-02-0140）。","registration":"EB24-02-0140"},{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB24-02-0140）：原液弱碱性","registration":"EB24-02-0140"}],"conflict":false},name:'Waterless',type:'即用型无水洗车（润滑配方）（弱碱性）',sizes:'750 ml',materials:'车身外部',
 dilutions:[['无水洗车','即用','喷雾壶']],
 steps:['一次处理一小块（例如一块板），均匀喷涂，让产品润湿、软化污垢。','超纤布折成四折，向一个方向擦，污垢擦下时逐渐抬起布面；每次换干净的一面。','清洁完用另一条干净的干超纤布收尾；逐块重复到全车完成。'],
 notes:["只直线擦拭，不要打圈。","按车大小准备 6–10 条超纤布；清洁和收尾时也可以往布上喷一点增加润滑。","有厚泥沙或层层积尘时先正常洗车，以免产生划痕。"],url:MAFRA+'waterless-750ml-lavaggio-a-secco-auto/'},

// ───────────────────────── 轮毂 ─────────────────────────
{id:'F-cerchi-gomme',brand:'F',category:'wheel',ph:{"category":"alk","value":"11","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0787_1.pdf"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：碱性（登记号 EA19-01-0317）。","registration":"EA19-01-0317"}],"conflict":false},name:'Pulitore Cerchi e Gomme',type:'即用型轮毂轮胎清洁剂（泡沫喷头）（碱性）',sizes:'125 ml · 750 ml',materials:'合金轮毂 · 轮胎',
 dilutions:[['轮毂和轮胎','即用','喷雾壶']],
 steps:['用泡沫喷头先喷轮胎，再抬高喷头喷到轮毂上。','用刷子把产品带进缝隙，停留约 1 分钟。','看到污垢大量流下时，用强水流冲洗。'],
 notes:["溶解刹车粉、污垢、结垢和油烟，同时让轮胎恢复原色。","轮毂很脏时，官方建议先用它清洁，再用 Fallout Iron Remover 除铁。"],url:MAFRA+'pulire-cerchi-e-gomme/'},

{
 sds:{"url":"https://shop.gruppogesa.it/media/attachment/66671/scheda%20sicurezza.pdf","source":"gesa","language":"意大利文","hosting":"remote"},
 id:'F-splendorlega',brand:'F',category:'wheel',ph:{"category":"alk","value":"11","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/wp-content/uploads/2022/05/H0871_1.pdf"},"evidence":[],"conflict":false},name:'Splendorlega',type:'即用型合金轮毂清洁剂（无酸、无烧碱）',sizes:'500 ml',materials:'合金 / 镁合金轮毂',
 dilutions:[['合金轮毂','即用','喷雾壶']],
 steps:['距离约 20 cm 均匀喷在轮毂上。','停留后用软毛刷或细刷刷遍每处，辐条轮毂尤其要刷到。','彻底冲洗，擦干轮毂。'],
 notes:['专门溶解刹车片产生的含铁粉尘。','不含酸和烧碱，不会腐蚀或磨损轮毂。'],url:MAFRA+'pulire-cerchi-in-lega-splendorlega/'},

{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/mafra-fallout-iron-remover/sds.pdf","source":"chemcx","language":"英文","version":"2022","hosting":"remote"},
 id:'F-fallout',brand:'F',category:'wheel',ph:{"category":"acid","value":"5.5","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H1112_1.pdf"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱酸性（登记号 EB20-01-0464）。意大利官网写的是「无酸、pH 平衡」，韩国标签写弱酸性，两处说法不一致。","registration":"EB20-01-0464"}],"conflict":true},name:'Fallout Iron Remover',type:'铁粉去除剂（变紫）',sizes:'500 ml · 1 L',materials:'钢 / 合金 / 镀铬 / 抛光轮毂 · 车漆',
 dilutions:[['轮毂','即用','喷雾壶'],['车身除铁','即用','喷雾壶']],
 steps:['轮毂：喷上后停留 3–4 分钟，不要让表面干掉；变紫后用刷子刷到辐条缝隙，再用大量清水冲洗，用超纤布擦干。','车身：先洗车擦干；在约 60 cm 外喷涂，逐块、每次半辆车，停留 2–3 分钟变紫后冲洗。'],
 notes:["不要接触铸铁刹车卡钳；不要用于发热的表面。","有硫磺味，在通风处使用。","官方建议约每 3000 km 给轮毂除铁一次；轮毂很脏时先用 Pulitore Cerchi e Gomme 清洁、冲净擦干。"],url:MAFRA+'fallout-iron-remover-1l-decontaminante-rapido-cerchi-e-carrozzeria/'},

{id:'F-regenera-rims',brand:'F',category:'wheel',ph:{"category":"acid","value":"5.5","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0956_1.pdf"},"evidence":[{"kind":"statement","source":"technical-sheet","text":"数值为套装内 Fall-Out Iron Remover 的技术资料表数据"}],"conflict":false},name:'Kit Regénera Cerchi',type:'轮毂除染套装（Fallout 500 ml + 轮毂刷）',sizes:'套装',materials:'钢 / 合金 / 镀铬轮毂（不可用于阳极氧化铝轮毂）',
 dilutions:[['轮毂','即用','喷雾壶']],
 steps:['把 Fallout Iron Remover 喷在轮毂上，停留 3–4 分钟，不要让表面干掉，等它变紫。','用随附的刷子刷掉辐条间和缝隙里的深层污垢。','用大量清水冲洗，再用超纤布擦干。'],
 notes:['不可用于阳极氧化铝轮毂和发热表面；不要接触刹车卡钳。'],url:MAFRA+'kit-regenera-cerchi-trattamento-decontaminante/'},

// ───────────────────────── 除染 ─────────────────────────
{id:'F-pulismog',brand:'F',category:'deco',name:'Pulismog',type:'液体清洁泥（去油烟 / 锈斑 / 氧化斑）',sizes:'—',materials:'车漆 · 车窗 · 保险杠 · 塑料件',
 dilutions:[['除蜡后整车处理','即用','海绵']],
 steps:['先完成除蜡。','用浸满 Pulismog 原液的海绵像用普通香波一样擦过要处理的部位。','用水冲洗车辆即可，不需要再冲第二遍。'],
 notes:['去除铁路运输或停在钢厂、火车站附近造成的油烟、锈斑和氧化斑，适合新车和二手车。','对车漆颜色呈惰性，不伤保险杠和塑料件（包括环保再生塑料）。'],url:MAFRA+'deceranti-copolimeri-pulismog/'},

{
 sds:{"url":"https://www.bricocenter.it/prodotti/media/magma_akeneo_connector/media_files/5/a/4/c/5a4c400273f42e7ae5d968ca6bcf9318d826bcc4_H0065_IT_1.pdf","source":"bricocenter","language":"意大利文","version":"2018","hosting":"remote"},
 id:'F-decaflash',brand:'F',category:'deco',ph:{"category":"neu","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：中性（登记号 FB22-02-0034）。","registration":"FB22-02-0034"},{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 FB22-02-0034）：原液中性","registration":"FB22-02-0034"}],"conflict":false},name:'Deca Flash',type:'柏油 / 不干胶去除剂（中性）',sizes:'250 ml',materials:'车漆 · 玻璃',
 dilutions:[['柏油、不干胶残留','即用','喷雾壶']],
 steps:['喷在柏油或胶痕上，停留几秒。','用干净超纤布擦掉残留。','彻底冲洗，再用另一条干净超纤布擦干。'],
 notes:["也适合去除撕掉车贴后留下的黏胶。"],url:MAFRA+'togliere-adesivi-auto-e-catrame-deca-flash/'},

{
 sds:{"url":"https://shop.gruppogesa.it/media/attachment/79712/scheda%20sicurezza.pdf","source":"gesa","language":"意大利文","hosting":"remote"},
 id:'F-resinoff',brand:'F',category:'deco',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 FB22-01-0293）。","registration":"FB22-01-0293"}],"conflict":false},name:'Resin Off',type:'树脂 / 盐渍去除剂（弱碱性）',sizes:'250 ml',materials:'车漆 · 车身外部',
 dilutions:[['树脂、松脂、盐渍','即用','喷雾壶']],
 steps:['确认表面不热、不在阳光下，喷在树脂上。','停留 1 分钟后用软布擦掉，不要用力搓。','顽固树脂滴重复操作。'],
 notes:["也能去除已经结晶的松树树脂。"],url:MAFRA+'togliere-resina-auto-resin-off/'},

{id:'F-clay-medium',brand:'F',category:'deco',name:'Clay Bar Medium Soft',type:'中软清洁泥（浅色车）',sizes:'100 g',materials:'车漆 · 镀铬 · 合金轮毂',
 dilutions:[],
 steps:['分成两块，用手揉成球再压扁。','在阴凉处、车身冷却时，用 Fast Cleaner 充分润滑车身，分小块施工。','轻压滑动，先横向再纵向，均匀处理，不要打圈。','一面脏了翻另一面，两面都脏就揉匀再用；多次后换新。','除染完用 Polish Express 做一次封闭洗车，用 Super Dryer 擦干。'],
 notes:['适合污染较重的浅色车。','可去除工业落尘、交通膜、鸟粪、虫尸、树脂、铁粉、轮毂刹车粉、水泥和酸雨斑。','抛光前做黏土，可以提升抛光效果的持久度和亮度。'],url:MAFRA+'clay-bar-medium-soft-pasta-argilla-decontaminante-auto-chiare/'},

{id:'F-clay-soft',brand:'F',category:'deco',name:'Clay Bar Soft',type:'软质清洁泥（深色车）',sizes:'100 g',materials:'车漆 · 玻璃 · 保险杠 · 塑料 · 合金轮毂',
 dilutions:[],
 steps:['分成两块或更多，揉成球后压成圆饼。','在阴凉处、车身冷却时施工，持续用 Fast Cleaner 润滑车身和泥块。','轻轻纵横滑动，直到表面不再粗糙、泥块滑动顺畅。','喷 Fast Cleaner，用超纤布擦掉残留并擦干。'],
 notes:['专为深色和黑色车设计。','可用于任何非多孔表面；车身和轮毂等「较硬」部位建议用不同的泥块，避免硬颗粒划伤车漆。','泥块可重复使用：脏了揉出新的干净面；收纳前润滑后放回原盒。'],url:MAFRA+'clay-bar-soft-pasta-argilla-decontaminante-auto-scure/'},

{id:'F-regenera-body',brand:'F',category:'deco',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0946.pdf"},"evidence":[{"kind":"statement","source":"technical-sheet","text":"数值为套装内 Fast Cleaner 的技术资料表数据"}],"conflict":false},name:'Kit Regénera Carrozzeria',type:'漆面物理除染套装（Fast Cleaner + Clay Bar Soft + 超纤布）',sizes:'套装',materials:'车漆 · 玻璃 · 保险杠 · 塑料 · 合金轮毂',
 dilutions:[],
 steps:['洗车后，把手指伸进薄塑料袋轻摸车漆，感觉粗糙就需要除染。','在室内或阴凉处、车身冷却时施工；把 Clay Bar 分成几块，揉成球再压成圆饼。','持续用 Fast Cleaner 润滑车身和泥块，纵横轻滑，直到表面不再粗糙。','喷 Fast Cleaner，用套装里的 Heavy Work 超纤布擦掉残留并擦干。'],
 notes:['除染前后都要彻底洗车。','完成后表面光滑，可以接着上保护蜡。'],url:MAFRA+'kit-regenera-carrozzeria-trattamento-decontaminante/'},

// ───────────────────────── 研磨抛光 ─────────────────────────
{id:'F-corrector',brand:'F',category:'polish',name:'Corréctor 3.0',type:'Step 1 重切削研磨剂（水性、无硅无填充）',sizes:'1000 g',materials:'车漆 · PPF',
 dilutions:[],
 steps:['每次在盘上加少量。','旋转机：先 600–900 rpm，逐步升到 1500–1800 rpm，最后轻压 600–900 rpm 收尾。','双动机：1–2 档把研磨剂在 40×40 cm 区域抹匀，升到最高档抛到研磨剂耗尽。'],
 notes:['去除 P1500 以内的砂纸痕和划痕（不是填充遮盖），适用于抗刮清漆、原厂漆和补漆。','可用于透明保护膜（PPF），去除老化痕迹。','可配羊毛盘、海绵盘或超纤盘；低粉尘，残留容易擦除。'],url:MAFRA+'polish-corrector-3-0-1000-gr/'},

{id:'F-scratch-remover',brand:'F',category:'polish',ph:{"category":"alk","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB20-01-0189，该申报已过期）：原液碱性","registration":"EB20-01-0189"}],"conflict":false},name:'Scratch Remover（SR · Rimuovi Graffi）',type:'手工去划痕膏套装（附海绵施工头和抛光垫）',sizes:'100 ml',materials:'车漆',
 dilutions:[],
 steps:['表面须干净、不热、在阴凉处。','用管口的海绵施工头把去划痕膏涂在划痕上，来回擦拭。','用随附的抛光垫擦亮，去除残留。'],
 notes:["去除轻微、表层划痕（如门把手周围的指甲划痕、车门细划痕），较深的划痕只能减轻。","适用于各种车漆；膏体不会干在管内。","官网没有给出详细步骤，以上按套装内容（施工头 + 抛光垫）整理。需要机器去旋纹时用 Scratch & Swirls Remover（SSR）。"],url:MAFRA+'togliere-graffi-auto-special-kit/'},

{id:'F-scratch',brand:'F',category:'polish',ph:{"category":"neu","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：中性（登记号 EB23-02-0186）。","registration":"EB23-02-0186"},{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB23-02-0186）：原液中性","registration":"EB23-02-0186"}],"conflict":false},name:'Scratch & Swirls Remover（SSR）',type:'去划痕 / 旋纹研磨剂（中性）',sizes:'500 ml',materials:'车漆',
 dilutions:[],
 steps:['施工前先用黏土除染；表面须干净、不热、在阴凉处，用前摇匀。','手工：每次处理 30×30 cm，打圈并部分重叠，干掉前用干净超纤布擦掉。','双动机：装研磨盘，把研磨剂直接加在盘上，盘面平贴漆面，中等压力重叠走位，每次约 50×50 cm，直到研磨剂开始被吸收；干掉前擦掉残留。'],
 notes:["去除浅划痕、旋纹和氧化，适用于各种颜色的车漆。","官方建议最后用 Glazing Wax 收尾，获得湿润光泽。"],url:MAFRA+'scratch-swirls-remover-heavy-polish-compound/'},

{id:'F-illumina',brand:'F',category:'polish',name:'Illúmina 2.0',type:'Step 2 收光抛光剂（防光环）',sizes:'250 g · 500 g',materials:'车漆 · PPF',
 dilutions:[],
 steps:['每次在盘上加少量。','旋转机：先 600–900 rpm，逐步升到 1500–1800 rpm，最后轻压 600–900 rpm 收尾。','双动机：1–2 档在 40×40 cm 区域抹匀，升到最高档抛到研磨剂耗尽，再用超纤布擦掉多余。'],
 notes:['去除研磨留下的光环，同时有一定切削力（去除 P2500 以内的砂纸痕），取代旧版 Step 3 和 Step 4。','可用于 PPF。','水性、无硅无填充。'],url:MAFRA+'polish-illumina-2-0-500-gr/'},

{id:'F-cleanerwax',brand:'F',category:'polish',ph:{"category":"neu","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：中性（登记号 EB23-06-0204）。","registration":"EB23-06-0204"},{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB23-06-0204）：原液中性","registration":"EB23-06-0204"}],"conflict":false},name:'Cleaner Wax',type:'含巴西棕榈蜡的轻研磨清洁蜡（中性）',sizes:'500 ml',materials:'车漆 · 塑料 · 橡胶',
 dilutions:[],
 steps:['施工前建议先用黏土除染；表面干净、不热、在阴凉处，用前摇匀。','手工：取适量在干净的超纤布或手工海绵上，轻轻打圈擦拭，再用干净超纤布收尾。','双动机：装细抛盘，中等压力重叠走位，每次约 50×50 cm，直到开始被吸收；干掉前擦掉残留。'],
 notes:["去除发乌、氧化、褪色和轻微擦漆印，恢复普通漆和金属漆的颜色。","可接触塑料和橡胶，不会损伤。","官方建议之后用 Glazing Wax 收尾。"],url:MAFRA+'cleaner-wax-polish-lucidante/'},

{id:'F-polish-clever',brand:'F',category:'polish',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/HN041_1.pdf"},"evidence":[],"conflict":false},name:'Polish Clever',type:'手工车漆翻新抛光剂',sizes:'—',materials:'车漆',
 dilutions:[],
 steps:['在超纤施工块上滴 2–3 滴。','先打圈、再直线涂抹，轻压。','用 Double Face 超纤布擦掉多余。'],
 notes:['翻新、去氧化、上光，也可去除新车的运输蜡残留。'],url:MAFRA+'prodotti-per-carrozzeria-auto-rigenerante-polish/'},

{id:'F-sherlock',brand:'F',category:'polish',name:'Sherlock',type:'旋纹显示 / 车身脱脂剂',sizes:'—',materials:'车漆',
 dilutions:[['抛光检查 / 脱脂','即用','—']],
 steps:['倒在超纤布上，擦过车身。','等几秒让它完全作用，去掉油分后检查漆面。'],
 notes:['去除润滑油、抛光剂和硅油，露出被遮盖的瑕疵，不会让车漆发白。'],url:MAFRA+'scherlock-detergente-evidenziatore-swirl-auto/'},

{id:'F-regenera-view',brand:'F',category:'polish',ph:{"category":"na","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0589_1.pdf"},"evidence":[],"conflict":false},name:'Regénera View',type:'大灯罩（PC / 亚克力）手工抛光剂',sizes:'—',materials:'大灯 · 塑料',
 dilutions:[],
 steps:['每次在海绵施工块上加少量。','手工施工，改变压力抛光。'],
 notes:['去除轻微氧化和化学污染，减轻斑点和划痕，并留下长效保护。','也可用于敞篷车塑料后窗和摩托车整流罩。','污染严重的灯罩需先用 Kit Regénera Headlight 打磨。'],url:MAFRA+'regenera-view-polish-policarbonato/'},

{id:'F-regenera-headlights',brand:'F',category:'polish',name:'Kit Regénera Headlights',type:'大灯翻新套装（砂纸 + 抛光剂 + 封体）',sizes:'套装：大灯抛光剂 · 大灯封体 · 16 张砂纸（1500 / 2500 / 4000 目）· 聚氨酯打磨托',materials:'聚碳酸酯大灯',
 dilutions:[['打磨','湿磨（用玻璃清洁剂润滑）','砂纸'],['抛光 / 封体','即用','超纤布']],
 steps:['用 Glass Cleaner 和 1Shine Vetri 清洁大灯，去掉可能在打磨时造成划痕的颗粒。','用美纹纸沿大灯外缘贴好，保护引擎盖和翼子板车漆，注意内侧边缘和密封条。','先用最粗的 1500 目砂纸湿磨，用玻璃清洁剂保持润滑；尽量顺着大灯弧度纵向（不要画圈）打磨，磨掉最粗的瑕疵后擦干检查是否均匀。','换 2500 目继续湿磨，方向与上一遍相反，磨掉前一遍的痕迹；擦干后换最细的 4000 目。','用 1Shine Exterior 涂大灯抛光剂，适当用力画圈抛光，再用布擦去多余部分；重复到表面透明均匀。如果仍然发雾，回到打磨步骤。','用 Glass Cleaner 清洁大灯，再用 Heavy Work 超纤布纵向涂一层均匀的封体；完全干燥后可按需再涂几层。'],
 notes:['大灯罩多为聚碳酸酯，受 UV 照射会发黄发雾；本套装恢复原有透明度并提升照明效果。','在阴凉、没有阳光直射的冷表面上施工。','不涂封体的话大灯很快会再次发黄。'],url:MAFRA+'kit-rinnova-fari-lucidante/'},

{id:'F-flashbright',brand:'F',category:'polish',name:'Flash Bright',type:'不锈钢 / 铝 / 镀铬快速抛光剂',sizes:'—',materials:'镀铬 · 不锈钢 · 黄铜 · 合金',
 dilutions:[],
 steps:['取少量涂在金属表面。','抛光后擦掉，不留油腻痕迹。'],
 notes:['去除细小划痕和轻微氧化，提供防腐蚀、防紫外线保护。','官方页面未给出详细步骤。'],url:MAFRA+'flash-bright-polish-per-lucidare-e-rinnovare-acciaio-cromo-lega/'},

// ───────────────────────── 封体 / 蜡 / 快速美容 ─────────────────────────
{id:'F-splendida',brand:'F',category:'seal',name:'Spléndida 2.0',type:'Glaze 增亮收尾蜡（天然 + 合成蜡）',sizes:'500 g',materials:'车漆',
 dilutions:[],
 steps:['把产品抹在盘上。','用 Easytech 抛光机以 1–2 档铺开，或手工交叉涂抹。','擦掉残留。'],
 notes:['一块钣金只需两小滴。','填平细小划痕，带来深层光泽和丝滑手感，并有防紫外线和疏水效果。','不在橡胶和塑料上留残留。'],url:MAFRA+'splendida-2-500g-cera-di-rifinitura-glaze-booster-gloss/'},

{id:'F-glazing',brand:'F',category:'seal',ph:{"category":"neu","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：中性（登记号 EB23-06-0205）。","registration":"EB23-06-0205"},{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB23-06-0205）：原液中性","registration":"EB23-06-0205"}],"conflict":false},name:'Glazing Wax',type:'合成聚合物 Glaze 上光蜡（中性）',sizes:'500 ml',materials:'车漆',
 dilutions:[],
 steps:['表面干净、不热、在阴凉处，用前摇匀。','手工：取适量在干净的超纤布或施工块上，轻轻打圈擦拭，再用干净超纤布收尾。','双动机：装软的收光盘，中等压力重叠走位，每次约 50×50 cm，干掉前擦掉残留。'],
 notes:["覆盖旋纹和浅划痕，去除轻微污渍和水斑，带来湿润光泽和防紫外线保护。","官方建议在 Cleaner Wax 或 Scratch & Swirls Remover 之后作为最后一步。"],url:MAFRA+'glazing-wax-polish-lucidante-protettivo/'},

{id:'F-carlux',brand:'F',category:'seal',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB20-06-0046，该申报已过期）：不适用","registration":"EB20-06-0046"}],"conflict":false},name:'Carlux',type:'硅氧烷保护蜡',sizes:'—',materials:'车漆',
 dilutions:[],
 steps:['用前摇匀，取少量在超纤布或 Microfiber Pad 上。','在车身上画直径约 40 cm 的圈，轻压抹开。','逐小块施工到全车，用干净柔软的超纤布擦掉多余。'],
 notes:["每次洗车后会「自我激活」，能耐多次洗车；深色车增色明显。"],url:MAFRA+'cera-protettiva-auto-carlux/'},

{
 sds:{"url":"https://shop.gruppogesa.it/media/attachment/76348/scheda%20sicurezza.pdf","source":"gesa","language":"意大利文","hosting":"remote"},
 id:'F-metalcrem',brand:'F',category:'seal',ph:{"category":"na","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0181_1.pdf"},"evidence":[],"conflict":false},name:'Metal Crem',type:'金属漆增亮蜡乳（无研磨）',sizes:'250 ml',materials:'车漆',
 dilutions:[],
 steps:['取适量用布涂在车身上。','抹匀后擦亮。'],
 notes:['富含合成蜡，不含研磨剂，不会让塑料件发白。','官方页面未给出详细步骤。'],url:MAFRA+'cera-per-lucidare-carrozzeria-auto-metallizzate-metal-crem/'},

{id:'F-metalcar',brand:'F',category:'seal',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB19-06-0159，该申报已过期）：不适用","registration":"EB19-06-0159"}],"conflict":false},name:'Metal Car',type:'金属漆喷蜡（水性）',sizes:'500 ml',materials:'车漆',
 dilutions:[['擦拭上蜡','即用','喷雾壶']],
 steps:['喷在各部位上。','用布抹开擦亮，形成丝滑手感。'],
 notes:["水性配方，车身没完全擦干也能用；不含研磨剂，可用于任何车漆。","不会让塑料件发白。"],url:MAFRA+'cera-spray-lucidante-auto-nere_/'},

{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/mafra-last-touch-express/sds.pdf","source":"chemcx","language":"英文","version":"2022","hosting":"remote"},
 id:'F-lasttouch',brand:'F',category:'seal',ph:{"category":"alk","value":"10","basis":"raw","source":{"kind":"sds","url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/mafra-last-touch-express/sds.pdf","section":9},"evidence":[],"conflict":false},name:'Last Touch Express 2.0',type:'含巴西棕榈蜡的快速喷蜡（干湿车都可用）',sizes:'500 ml',materials:'车漆 · 玻璃 · 塑料',
 dilutions:[['干车或湿车','即用','喷雾壶']],
 steps:['在约 20 cm 外少量均匀喷在要处理的部位。','用超纤布抹开。','用另一条干布擦干。'],
 notes:['可用于玻璃和塑料，不留雾痕。','能防止污垢再次附着，留下丝滑手感。'],url:MAFRA+'cera-istantanea-per-lucidare-carrozzeria-last-touch-express/'},

{
 sds:{"url":"https://shop.gruppogesa.it/media/attachment/92465/scheda%20sicurezza.pdf","source":"gesa","language":"意大利文","hosting":"remote"},
 id:'F-fast-cleaner',brand:'F',category:'seal',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/P0598_1.pdf"},"evidence":[],"conflict":false},name:'Fast Cleaner 3in1',type:'快速美容剂 / 擦干辅助 / 黏土润滑液',sizes:'500 ml',materials:'车漆',
 dilutions:[['快速清洁','即用','喷雾壶'],['擦干辅助（湿车）','即用','喷雾壶'],['黏土润滑','即用','喷雾壶']],
 steps:['快速美容：约 20 cm 外喷在要处理的部位，用超纤布直线擦到完全干，再用第二条干净干布收尾。','擦干辅助：喷在湿车身上，再用 Super Dryer 擦干。','黏土润滑：喷在要除染的部位，过黏土时始终保持表面充分润滑。'],
 notes:['去除新鲜鸟粪、虫尸，也能去除洗车后的水斑和水垢。','留下丝滑抗静电的保护层，减少灰尘附着。','不含硅。'],url:MAFRA+'fast-cleaner-500-ml/'},

// ───────────────────────── 轮胎 / 塑料养护 ─────────────────────────
{id:'F-nerissimo',brand:'F',category:'trim',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0772_1.pdf"},"evidence":[],"conflict":false},name:'Nerissimo',type:'高浓缩轮胎上光剂（可调光泽）',sizes:'1000 ml',materials:'轮胎',
 dilutions:[['湿润光泽','原液','—'],['中等光泽','1:1（50 %）','—']],
 steps:['湿润光泽：用海绵把原液涂在轮胎上。','中等光泽：原液加等量水稀释后用海绵涂抹。'],
 notes:['不油腻、不黏手，防止轮胎龟裂和老化。'],url:MAFRA+'nerissimo-gomme-auto/'},

{id:'F-nouveaunoir-spray',brand:'F',category:'trim',ph:{"category":"neu","value":"6","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0889_1.pdf"},"evidence":[],"conflict":false},name:'Nouveau Noir（500 ml 喷雾）',type:'即用型轮胎上光喷雾（零售装）',sizes:'500 ml',materials:'轮胎 · 橡胶',
 dilutions:[['轮胎','即用','喷雾壶']],
 steps:['彻底清洁要处理的橡胶或轮胎。','均匀喷在表面上。','用超纤施工块或软毛刷抹匀。'],
 notes:['上光成分来自植物、易生物降解，不含磷酸盐。','防止轮胎龟裂并保持胎侧弹性。','需要稀释使用的专业桶装见 Nouveau Noir。'],url:MAFRA+'pulire-e-lucidare-gomme-nouveau-noir/'},

{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/mafra-extreme-black/sds.pdf","source":"chemcx","language":"英文","version":"2022","hosting":"remote"},
 id:'F-extremeblack',brand:'F',category:'trim',name:'Extreme Black',type:'湿润效果轮胎上光喷雾',sizes:'—',materials:'轮胎',
 dilutions:[['光亮','即用（喷一圈）','喷雾壶'],['超光亮','即用（喷两圈）','喷雾壶']],
 steps:['直接喷在轮胎上：喷一圈为光亮效果，喷两圈为超光亮效果。','10 分钟后用布擦掉多余。'],
 notes:['避免喷到轮毂上；喷到时在干掉前用干布擦掉。','形成抗静电保护层，抵抗潮湿和灰尘。'],url:MAFRA+'nero-gomme-auto-extreme-black/'},

{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/mafra-fast-black/sds.pdf","source":"chemcx","language":"英文","version":"2021","hosting":"remote"},
 id:'F-fastblack',brand:'F',category:'trim',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB22-06-0259）：不适用","registration":"EB22-06-0259"}],"conflict":false},name:'Fast & Black',type:'抗静电轮胎上光喷雾',sizes:'200 ml · 500 ml',materials:'轮胎 · 橡胶脚垫',
 dilutions:[['轮胎','即用','喷雾壶']],
 steps:['均匀喷在轮胎上。','让它自然干燥。'],
 notes:["可耐 3 次洗车；不油腻、不黏手，也可用于橡胶脚垫。"],url:MAFRA+'rinnova-nero-gomme-fast-black/'},

{id:'F-black3',brand:'F',category:'trim',ph:{"category":"neu","value":"7.5","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0780_1.pdf"},"evidence":[],"conflict":false},name:'Black 3 Plus',type:'轮胎翻新软化喷雾',sizes:'500 ml',materials:'轮胎 · 橡胶',
 dilutions:[['轮胎胎侧和胎面','即用','喷雾壶']],
 steps:['喷在轮胎上。','用海绵把产品均匀抹遍整个橡胶面。','干透后再开车。'],
 notes:['换季收纳轮胎前使用，可防止龟裂；干爽不油腻。'],url:MAFRA+'nero-gomme-auto-black-3-plus/'},

// pH source: https://determashgroup.com/SCHEDE_PRODOTTO/MAFRA/ST/DIAMANT%20PLAST%20DRESSING%20PRO.PDF
{id:'F-diamant-dressing',brand:'F',category:'trim',ph:{"category":"alk","value":"9","basis":"raw","source":{"kind":"technical-sheet","url":"https://determashgroup.com/SCHEDE_PRODOTTO/MAFRA/ST/DIAMANT%20PLAST%20DRESSING%20PRO.PDF"},"evidence":[{"kind":"statement","source":"technical-sheet","text":"pH 9（20 °C）来自 MAFRA 技术表，适用 250 ml / 750 ml 包装（经销商托管）。"}],"conflict":false},name:'Diamant Plast Dressing Pro',type:'内外塑料翻新保护剂（巴西棕榈蜡 + 聚合物）',sizes:'250 ml · 750 ml',materials:'内外塑料 · 橡胶 · 乙烯基 · 中控 · 门板 · 外饰条 · 发动机舱塑料',
 dilutions:[['擦拭养护','即用','喷雾壶']],
 steps:['在约 20 cm 外少量均匀喷在表面上。','用干净干燥的超纤布擦匀，去除多余。'],
 notes:["产品浓缩，不要过量使用。","自流平，光泽均匀，可维持数周；不油腻、防尘，不会让塑料发白。"],url:MAFRA+'diamant-plast-dressing-pro-750ml-rinnova-lucida-protegge-plastiche-auto/'},

{id:'F-faspoiler',brand:'F',category:'trim',ph:{"category":"na","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/FASPOILER.pdf"},"evidence":[],"conflict":false},name:'Faspoiler',type:'外饰塑料 / 橡胶聚合物翻新喷雾',sizes:'300 ml',materials:'保险杠 · 侧裙 · 扰流板 · 敞篷软顶 · FRP 树脂件 · 塑料 · 橡胶',
 dilutions:[['擦拭养护','即用','喷雾壶']],
 steps:['喷在保险杠、侧裙、扰流板等部位。','抹匀，形成透明光亮的保护层。'],
 notes:['定期使用可防止外露部件褪色、老化；不油腻、不开裂。','官方页面未给出详细步骤。'],url:MAFRA+'prodotti-per-plastiche-auto-faspoiler/'},

// ───────────────────────── 玻璃 ─────────────────────────
{id:'F-glass-plus',brand:'F',category:'glass',name:'Glass Cleaner Plus',type:'无氨玻璃去油清洁剂',sizes:'750 ml',materials:'车窗 · 前挡 · 后视镜 · LCD 屏',
 dilutions:[['玻璃清洁','即用','喷雾壶']],
 steps:['喷在表面上。','用干净干燥的超纤布擦净。'],
 notes:['无氨，快干不留雾痕；可用于导航 LCD 屏。'],url:MAFRA+'glass-cleaner-plus-cleaner-and-degreaser-car-750ml/'},

{
 sds:{"url":"https://shop.gruppogesa.it/media/attachment/93135/scheda%20sicurezza.pdf","source":"gesa","language":"意大利文","hosting":"remote"},
 id:'F-glass-clean',brand:'F',category:'glass',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"sds","url":"https://shop.gruppogesa.it/media/attachment/93135/scheda%20sicurezza.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB19-01-0688，该申报已过期）：原液中性","registration":"EB19-01-0688"},{"kind":"statement","source":"technical-sheet","url":"https://mafra.it/wp-content/uploads/2022/05/H0791_1.pdf","text":"厂商技术资料表写 pH 11，与 SDS 第 9 节的 pH 7 不一致；本站按 SDS 标注"}],"conflict":true},name:'Glass Clean & Shine',type:'无氨泡沫玻璃清洁剂（罐装）',sizes:'—',materials:'玻璃 · LCD 屏 · 贴膜车窗',
 dilutions:[['玻璃清洁','即用','—']],
 steps:['摇匀罐体。','在 15–25 cm 外喷在表面上。','用干净干布擦净收尾。'],
 notes:["泡沫附着让布更顺滑；无氨，可用于贴了隔热膜的玻璃。"],url:MAFRA+'pulire-e-lucidare-vetri-auto-glass-clean/'},

{id:'F-glass-cleaner',brand:'F',category:'glass',ph:{"category":"neu","value":"7","basis":"1%","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0539_1.pdf"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：中性（登记号 EB22-01-0996）。","registration":"EB22-01-0996"}],"conflict":false},name:'Glass Cleaner',type:'活性泡沫车窗去油剂（中性）',sizes:'125 ml · 500 ml',materials:'车窗 · 玻璃',
 dilutions:[['玻璃清洁','即用','喷雾壶']],
 steps:['在要清洁的区域喷少量。','用优质超纤布擦净。'],
 notes:["去除油污、指纹和雾痕。"],url:MAFRA+'pulire-e-sgrassare-vetri-auto-glass-cleaner/'},

{id:'F-cristalbel',brand:'F',category:'glass',ph:{"category":"neu","value":"6.0–8.0","basis":"1%","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0546_1.pdf"},"evidence":[],"conflict":false},name:'Cristalbel',type:'浓缩雨刷水（-20 °C 不冻）',sizes:'250 ml · 1000 ml',materials:'前挡',
 dilutions:[['加入雨刷水箱','按瓶身说明稀释','—']],
 steps:['按瓶身说明加入雨刷水箱。'],
 notes:['四季通用，原液 -20 °C 才结冰。','防止雨刷跳动和异响，并防止喷水管路结垢。'],url:MAFRA+'pulire-vetri-e-parabrezza-auto-cristalbell/'},

{id:'F-notice',brand:'F',category:'glass',ph:{"category":"na","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/HN083_1.pdf"},"evidence":[],"conflict":false},name:'Not Ice Spray',type:'玻璃 / 门锁除冰喷雾',sizes:'—',materials:'车窗 · 前挡 · 门锁 · 密封条',
 dilutions:[['除冰','即用','—']],
 steps:['充分摇匀罐体。','均匀喷在结冰处。','几秒后擦干，再开动雨刷。'],
 notes:['可延缓再次结冰，保护门密封条，没有酒精味。'],url:MAFRA+'sghiacciare-il-parabrezza-not-ice-spray/'},

// ───────────────────────── 多功能清洁 ─────────────────────────
{id:'F-superapc',brand:'F',category:'apc',name:'Super APC',type:'重污工业去油 APC',sizes:'900 ml',materials:'发动机 · 多种表面（不可用于铝和合金）',
 dilutions:[['按污垢和表面','1:4 – 1:19（20 % – 5 %）','喷雾壶']],
 steps:['按污垢种类、表面和停留时间稀释到 5 %–20 %。','喷涂后让它分解油污。','用水彻底冲洗。'],
 notes:['不要让它干在表面上；不要用于铝和合金。','特殊表面或原液使用前先在不显眼处测试。'],url:MAFRA+'super-apc-detergente-universale-per-sporchi-gravosi/'},

{
 sds:{"url":"/sds/F-hp12.pdf","source":"mafra-fr","language":"法文","version":"2023-12-20","hosting":"local","sha256":"3e8e76efa29ba5b86370c6ff35eaed7bd176502e2df5b32877f618fe5ac58b7d","originalUrl":"https://algeria.mafra.com/files/HP12_1138_FR_4.pdf","checkedAt":"2026-11-10"},
 id:'F-hp12',brand:'F',category:'apc',ph:{"category":"alk","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：碱性（登记号 EB23-01-0530）。","registration":"EB23-01-0530"},{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB23-01-0530）：原液碱性","registration":"EB23-01-0530"}],"conflict":false},name:'HP 12',type:'即用型万能去油剂（发动机舱）（碱性）',sizes:'125 ml · 750 ml',materials:'发动机 · 镀铬 · 车身外部 · 轮毂',
 dilutions:[['去油清洁','即用','喷雾壶']],
 steps:['喷在要清洁的部位，等几秒。','需要时用布或刷子辅助。','用超纤布擦净，需要时用水冲洗。'],
 notes:["可清洁发动机各部位的油污，也能去交通膜、油烟；可用于房车内饰和沙发织物污渍。","官方建议用它手洗 Microfiber Pad。"],url:MAFRA+'hp-12/'},

{
 sds:{"url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/mafra-split/sds.pdf","source":"chemcx","language":"英文","version":"2021","hosting":"remote"},
 id:'F-split',brand:'F',category:'apc',ph:{"category":"alk","value":"9","basis":"raw","source":{"kind":"sds","url":"https://gaoazdxztmpb4haq.public.blob.vercel-storage.com/products/mafra-split/sds.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 EB22-01-0996）。意大利官网写的是中性 pH，韩国标签写弱碱性，两处说法不一致。","registration":"EB22-01-0996"},{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB22-01-0996）：原液弱碱性","registration":"EB22-01-0996"}],"conflict":true},name:'Split',type:'多表面清洁剂（植物表面活性剂）',sizes:'750 ml',materials:'玻璃 · 内饰 · 塑料 · 皮革 · 碳纤维 · 金属 · LCD 屏',
 dilutions:[['多表面清洁','即用','喷雾壶']],
 steps:['喷在表面上。','用干净干燥的优质超纤布擦到完全无残留。'],
 notes:["免冲洗，不含磷酸盐、氯和氨。"],url:MAFRA+'split-750ml-detergente-multisuperficie/'},

// ───────────────────────── 内饰 ─────────────────────────
{id:'F-pulimax-spray',brand:'F',category:'int',ph:{"category":"alk","value":"11","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0841_1.pdf"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 EB24-01-0285，韩国标示的产品名为 Pulimax 2.0 500 ml）。","registration":"EB24-01-0285"}],"conflict":false},name:'Pulimax（500 ml 喷雾）',type:'即用型内饰清洁喷雾（零售装）（弱碱性）',sizes:'500 ml',materials:'织物座椅 · 人造革（skay）· 内饰塑料',
 dilutions:[['内饰清洁','即用','喷雾壶']],
 steps:['直接喷在要清洁的部位。','停留几分钟，不要让它干在表面上。','用布有规律地擦拭。'],
 notes:["溶解织物纤维里的污垢和尼古丁，并去除异味。"],url:MAFRA+'puliziia-e-igienizzazione-auto-pulimax/'},

{id:'F-deterjet',brand:'F',category:'int',ph:{"category":"alk","value":"11","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0782_1.pdf"},"evidence":[],"conflict":false},name:'Deterjet',type:'内饰通用清洁剂（车顶篷专用）',sizes:'500 ml',materials:'车顶内衬 · 座椅 · 地毯 · 脚垫',
 dilutions:[['内饰清洁','即用','喷雾壶']],
 steps:['喷在污渍上。','用布擦净；官方推荐配合 Martina 麂皮布，可同时吸走松动的污垢和表面活性剂残留。'],
 notes:['去除饮料、冰淇淋和油污，以及宠物和烟味。'],url:MAFRA+'pulire-vetri-interni-auto-deterjet/'},

{id:'F-3in1-plast',brand:'F',category:'int',ph:{"category":"alk","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB22-01-0707）：原液弱碱性；意大利官方技术资料表写 pH 7。","registration":"EB22-01-0707"}],"conflict":false},name:'Trattamento 3in1 Plastiche',type:'塑料清洁 + 养护 + 防紫外线（含蜂蜡）（弱碱性）',sizes:'500 ml',materials:'中控 · 内饰塑料 · 密封条 · 保险杠',
 dilutions:[['清洁养护','即用','喷雾壶']],
 steps:['喷在塑料表面。','用超纤布擦拭清洁并抹匀。'],
 notes:["留下抗静电、防紫外线保护层，并消除异味。"],url:MAFRA+'pulizia-interni-e-plastiche-auto-3-in-1/'},

{
 sds:{"url":"https://shop.gruppogesa.it/media/attachment/86594/scheda%20sicurezza.pdf","source":"gesa","language":"意大利文","hosting":"remote"},
 id:'F-plast-shine',brand:'F',category:'int',name:'Diamant Plast Shine',type:'亮光中控上光喷雾（含 UV 滤剂）',sizes:'500 ml',materials:'中控 · 内饰塑料',
 dilutions:[['上光','即用','—']],
 steps:['喷在中控和内饰塑料上。','用超纤布抹匀擦亮。'],
 notes:['让被晒褪色的塑料恢复颜色；不油腻。'],url:MAFRA+'lucida-cruscootti-effetti-brillante-diamant-shine/'},

{id:'F-plast-satin',brand:'F',category:'int',ph:{"category":"na","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0052_1.pdf"},"evidence":[],"conflict":false},name:'Diamant Plast Satin',type:'缎面（哑光）中控养护喷雾',sizes:'500 ml',materials:'中控 · 内饰塑料',
 dilutions:[['养护','即用','—']],
 steps:['喷在中控和内饰塑料上。','用超纤布抹匀，表面光滑不反光。'],
 notes:['不含硅，抗静电。'],url:MAFRA+'lucida-cruscotti-effetto-opaco-diamant-satin/'},

{
 sds:{"url":"https://shop.gruppogesa.it/media/attachment/86139/scheda%20sicurezza.pdf","source":"gesa","language":"意大利文","hosting":"remote"},
 id:'F-scic-blu',brand:'F',category:'int',ph:{"category":"na","basis":"raw","source":{"kind":"sds","url":"https://shop.gruppogesa.it/media/attachment/86139/scheda%20sicurezza.pdf","section":9},"evidence":[{"kind":"statement","source":"product-page","text":"官网产品页挂的技术资料表实为 SCIC Green，本站按 SCIC Blue 自己的 SDS 标注"}],"conflict":false},name:'Scic Blu',type:'中等光泽中控养护喷雾',sizes:'600 ml',materials:'中控 · 内饰塑料',
 dilutions:[['养护','即用','—']],
 steps:['在 20–25 cm 外少量均匀喷在要处理的部位。','用干净干燥的超纤布抹匀到整个表面。','再用第二条干净超纤布收尾。'],
 notes:['不油腻，不会在前挡上反光。'],url:MAFRA+'ravvivante-plastiche-e-cruscotti-auto-scic-blu/'},

{
 sds:{"url":"https://shop.gruppogesa.it/media/attachment/86138/scheda%20sicurezza.pdf","source":"gesa","language":"意大利文","hosting":"remote"},
 id:'F-scic-green',brand:'F',category:'int',ph:{"category":"na","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0044_1.pdf"},"evidence":[],"conflict":false},name:'Scic Green',type:'中控清洁养护喷雾（除菌、去烟味，自然效果）',sizes:'600 ml',materials:'中控 · 内饰塑料 · 铝饰件',
 dilutions:[],steps:[],
 notes:['清洁中控并有除菌作用，可去除螨虫、灰尘和烟味，适合吸烟车；对铝饰件特别适用，留下自然效果；雪松香。','官网未给出施工步骤。'],url:MAFRA+'igienizzante-auto-e-cruscotti-scic-green/'},

{id:'F-scic-orange',brand:'F',category:'int',ph:{"category":"na","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0043_1.pdf"},"evidence":[],"conflict":false},name:'Scic Orange',type:'中控防尘养护喷雾（抗静电，中等光泽）',sizes:'600 ml',materials:'中控 · 内饰塑料 · 木饰件',
 dilutions:[],steps:[],
 notes:['抗静电，减少中控积灰；保护中控、防止开裂，对木饰件特别适用；中等光泽，橙香。','官网未给出施工步骤。'],url:MAFRA+'protettivo-lucida-cruscotti-scic-orange/'},

{id:'F-3in1-cruscotto',brand:'F',category:'int',name:'Trattamento 3in1 Cruscotto Lucido',type:'中控深层清洁 + 亮光养护（抗 UV、抗静电）',sizes:'—',materials:'中控 · 内饰塑料 · 外部黑色塑料',
 dilutions:[],steps:[],
 notes:['深入表面微孔清洁，填充式配方减轻老化痕迹，让中控恢复原貌并上光；长效抗 UVA、抗静电，减缓积灰、防止过早褪色。','去除车内异味，留下 Ocean 清新香。也可清洁、翻新褪色的外部黑色塑料。','官网未给出施工步骤。'],url:MAFRA+'lucida-cruscotti-3in1/'},

// pH source: https://determashgroup.com/SCHEDE_PRODOTTO/MAFRA/ST/TRATTAMENTO%203IN1%20TESSUTI.PDF
{id:'F-3in1-tessuti',brand:'F',category:'int',ph:{"category":"alk","value":"11","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/wp-content/uploads/2022/05/H0540_1.pdf"},"evidence":[{"kind":"statement","source":"technical-sheet","text":"pH 11（20 °C）来自 MAFRA 官网技术表。"}],"conflict":false},name:'Trattamento Tessuti 3in1',type:'织物 / Alcantara® 活性泡沫清洁剂',sizes:'500 ml',materials:'织物座椅 · Alcantara · 地毯 · 脚垫',
 dilutions:[['织物清洁','即用','喷雾壶']],
 steps:['在约 20 cm 外少量均匀喷在整个表面上。','用干净超纤布或软毛刷把泡沫抹匀。','去除多余，用第二条干净超纤布擦干。'],
 notes:["不会把织物弄得太湿。"],url:MAFRA+'pulire-sedili-auto-3-in-1-tessuti/'},

{id:'F-flash',brand:'F',category:'int',ph:{"category":"alk","value":"11","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0544_1.pdf"},"evidence":[],"conflict":false},name:'Flash',type:'织物干洗泡沫（附刷子）',sizes:'400 ml',materials:'织物座椅 · 丝绒 · Alcantara · 脚垫',
 dilutions:[['织物干洗','即用','—']],
 steps:['喷在污渍上。','用附带的刷子刷洗。','擦掉或吸走残留。'],
 notes:['不弄湿织物，同时中和动物、食物和烟味。'],url:MAFRA+'lavaggio-tappezzeria-auto-flash-pulitore-interni-tessuto/'},

{id:'F-flash-pet',brand:'F',category:'int',name:'Flash Pet',type:'织物干洗除味剂（带刷头，宠物车用）',sizes:'—',materials:'织物 · 皮革 · 丝绒 · Alcantara® 座椅',
 dilutions:[['织物干洗','即用','附带刷头']],
 steps:[],
 notes:['不会弄湿织物，可快速去除顽固污渍；带「Odor Stop」效果，持久去除异味。','带刷头，方便使用。官网未给出施工步骤。'],url:MAFRA+'flash-pet/'},

{id:'F-3in1-pelle',brand:'F',category:'int',ph:{"category":"neu","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：中性（登记号 EB22-01-0892）。","registration":"EB22-01-0892"},{"kind":"statement","source":"korean-registration","text":"酸碱性来自韩国生活化学品申报（申报号 EB22-01-0892）：原液中性","registration":"EB22-01-0892"}],"conflict":false},name:'Trattamento 3in1 Pelle',type:'皮革清洁 + 滋养 + 保护（芦荟 + 天然蜡）（中性）',sizes:'500 ml',materials:'皮革座椅',
 dilutions:[['皮革日常养护','即用','—']],
 steps:['用在皮革座椅和内饰皮件上，清洁后擦匀。'],
 notes:["适合定期使用，防止皱褶和开裂。","官方页面未给出详细步骤。"],url:MAFRA+'pulire-sedili-auto-3-in-1-pelle/'},

{id:'F-charming',brand:'F',category:'int',ph:{"category":"alk","value":"8.7","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0051_1.pdf"},"evidence":[{"kind":"statement","source":"technical-sheet","text":"官网称中性配方；官方技术资料表写 pH 8.7（弱碱性）。MAFRA 未公开 SDS。"}],"conflict":true},name:'Charme Detergent',type:'中性皮革清洁泡沫',sizes:'150 ml',materials:'皮革',
 dilutions:[['皮革清洁','即用','—']],
 steps:['直接涂在要处理的部位，抹匀覆盖整个表面。','在泡沫变成液体前打圈按摩，把污垢带出表面。','用柔软的湿布轻压擦掉多余泡沫和污垢。'],
 notes:["新皮的日常保养和深度清洁都适用。"],url:MAFRA+'puulire-sedili-in-pelle-detergent/'},

{id:'F-nutrient',brand:'F',category:'int',name:'Charme Nutrient',type:'皮革滋养霜',sizes:'—',materials:'皮革',
 dilutions:[],
 steps:['先用 Charme 清洁泡沫清洁、去油。','小幅度打圈、朝同一方向轻轻涂抹滋养霜。','让它吸收 20 分钟，再用柔软干布擦掉多余；需要时重复。'],
 notes:['敞篷车夏季应加强护理。','被晒老化的皮革，可以涂后放置过夜，缝线处多涂一些。'],url:MAFRA+'pulire-sedili-in-pelle-nutrient/'},

{id:'F-hydrating',brand:'F',category:'int',ph:{"category":"neu","value":"6.5–8.5","basis":"raw","source":{"kind":"technical-sheet","url":"https://mafra.it/mafra/download/schede-tecniche/H0053_1.pdf"},"evidence":[],"conflict":false},name:'Charme Hydrating',type:'皮革保湿乳',sizes:'—',materials:'皮革',
 dilutions:[['皮革保湿','即用','—']],
 steps:['均匀喷在表面上并抹开。','让它渗透几分钟。','用柔软的湿布擦掉多余。'],
 notes:['每年做 3–4 次；敞篷车夏季应加强护理。'],url:MAFRA+'pelle-auto-rinnovo-dp/'},

{id:'F-odorbact',brand:'F',category:'int',name:'Odorbact Out PMC',type:'空调系统 / 车厢消毒除味（一次性喷罐）',sizes:'—',materials:'车厢 · 空调系统',
 dilutions:[['空调循环消毒','整罐一次用完','—']],
 steps:['先清洁或更换空调滤芯；摇匀罐体，打开车内的储物格、手套箱。','关紧车窗、打开出风口，启动发动机，开内循环并把风量开到最大。','把罐体竖放在副驾驶脚垫上（不要直喷中控），按下阀门锁定，下车关门。','等罐体喷完后再作用 15 分钟，然后打开车门通风再用车。'],
 notes:['施工时不要吸烟，拔掉点烟器和其他电器。','意大利卫生部登记的 PMC 消毒产品，冷风暖风效果相同。'],url:MAFRA+'odorbact-out-pmc-sanificazione-igienizzazione-interni-abitacolo-climatizzatore-auto/'},

// ───────────────────────── 配件 ─────────────────────────
{id:'F-guanto',brand:'F',category:'acc',name:'Guanto Double Face',type:'双面超纤洗车手套（30×20 cm）',sizes:'1 只',materials:'—',dilutions:[],
 steps:['先用水冲车，把手套在清水桶里洗过。','浸入香波桶，用平稳的直线动作清洗：短毛面洗车身上部和玻璃，雪尼尔面洗下部、轮拱和缝隙。','经常在清水桶里清洗手套。'],
 notes:['雪尼尔面在清水桶里会把污垢排出。'],url:MAFRA+'double-face-guanto-lavaggio-microfibra/'},

{id:'F-allseasons',brand:'F',category:'acc',name:'All Seasons',type:'防水内衬微羊毛洗车手套',sizes:'1 只',materials:'—',dilutions:[],
 steps:['用双桶法：先在清水桶、再在香波桶里浸透手套。','先在要洗的区域淋一点香波水，再把手套放上去。','由上往下、直线慢慢擦，不加压；逐小块进行，经常先在清水桶、再在香波桶里浸洗手套。'],
 notes:['防水内衬不会弄湿手，低温下也舒适。'],url:MAFRA+'all-seasons-guanto-in-lana/'},

{id:'F-comfortpad',brand:'F',category:'acc',name:'Comfort Car Wash Pad',type:'双面超纤洗车块',sizes:'1 块',materials:'—',dilutions:[],
 steps:['用双桶法，先在清水桶、再在香波桶里浸透洗车块。','长毛雪尼尔面做初洗、处理顽固污垢；短毛面做一般清洁和收尾。','由上往下直线擦，不加压；经常在清水桶里清洗。'],notes:[],url:MAFRA+'comfort-pad-microfibra/'},

{id:'F-booster',brand:'F',category:'acc',name:'Spugna Booster',type:'六角蜂窝结构洗车海绵',sizes:'1 块',materials:'—',dilutions:[],steps:[],
 notes:['三维结构，提升产品效果、不划伤表面。'],url:MAFRA+'spugna-booster/'},

{id:'F-mfpad',brand:'F',category:'acc',name:'Microfiber Pad',type:'超纤施工块（蜡 / 封体 / 抛光剂）',sizes:'1 块',materials:'—',dilutions:[],steps:[],
 notes:['背面有手插袋，施工更快更稳。','可用 HP 12 手洗或机洗；不要用漂白剂和柔顺剂。'],url:MAFRA+'microfiber-pad-applicatore-microfibra/'},

{id:'F-foampad',brand:'F',category:'acc',name:'Foam Pad',type:'细孔海绵施工块（2 只装）',sizes:'2 只',materials:'—',dilutions:[],steps:[],
 notes:['用于在橡胶、塑料、乙烯基和皮革上涂抹养护剂、蜡和封体；可水洗重复使用。'],url:MAFRA+'accessori-panni-foam-pad/'},

{id:'F-superdryer',brand:'F',category:'acc',name:'Super Dryer',type:'超吸水擦干毛巾（大号）',sizes:'1 条',materials:'—',dilutions:[],
 steps:['用无毛的一面擦密封条。','短毛面贴着车身铺开，轻轻拖动吸干。'],
 notes:['可吸收自身重量 3.5 倍的水。'],url:MAFRA+'super-dryer-panno-ultra-assorbente-detailing/'},

{id:'F-extradry',brand:'F',category:'acc',name:'Extra Dry',type:'超吸水合成擦干布',sizes:'1 条',materials:'—',dilutions:[],steps:[],
 notes:['耐磨，多次清洗后仍能快速擦干、不留水痕。'],url:MAFRA+'panno-microfibra-per-lavaggio-auto-extra-dry/'},

{id:'F-martina',brand:'F',category:'acc',name:'Martina',type:'超吸水合成麂皮布',sizes:'1 条',materials:'—',dilutions:[],steps:[],
 notes:['擦干车身和玻璃不留水痕；也可配合 Deterjet 清洁车顶篷。','使用前后都要清洗，不要用滚烫的强水流冲。'],url:MAFRA+'panno-in-pelle-per-lavaggio-auto-martina/'},

{id:'F-heavywork',brand:'F',category:'acc',name:'Heavy Work',type:'耐用超纤布（60×40 cm，6 条装）',sizes:'6 条',materials:'—',dilutions:[],steps:[],
 notes:['可用于擦干和内饰清洁。'],url:MAFRA+'panno-microfibra-auto-heavy-work/'},

{id:'F-topbuffing',brand:'F',category:'acc',name:'Top Buffing',type:'无边超柔擦蜡布（60×40 cm，530 g/m²）',sizes:'1 条',materials:'—',dilutions:[],steps:[],
 notes:['激光切边，适合极软的车漆；安全擦除蜡残留，两面都超柔。'],url:MAFRA+'top-buffing-panno-microfibra-super-soft/'},

{id:'F-panno-df',brand:'F',category:'acc',name:'Panno Double Face',type:'双层无边超纤布（40×40 cm，3 条装）',sizes:'3 条',materials:'—',dilutions:[],steps:[],
 notes:['短毛面用于清洁、施工和擦除封体 / 蜡，长毛面用于擦亮；也可用于内饰。'],url:MAFRA+'double-face-panno-microfibra-doppio-strato/'},

{id:'F-1shine-vetri',brand:'F',category:'acc',name:'1Shine Vetri',type:'玻璃专用超纤布',sizes:'1 条',materials:'—',dilutions:[],steps:[],
 notes:['去除顽固污垢、不留雾痕。'],url:MAFRA+'panni-microfibra-vetri-auto/'},

{id:'F-pad-white',brand:'F',category:'acc',name:'White Pad 2.0',type:'硬质白色研磨海绵盘（145 mm）',sizes:'Ø145 mm × 20 mm',materials:'—',dilutions:[],steps:[],
 notes:['切削力强，用于 Step 1 Corréctor 研磨；斜边设计、小魔术贴，可水洗。'],url:MAFRA+'white-pad-tampone-bianco-duro/'},

{id:'F-pad-blu',brand:'F',category:'acc',name:'Blu Pad 2.0',type:'中硬蓝色研磨海绵盘（145 mm）',sizes:'Ø145 mm × 20 mm',materials:'—',dilutions:[],steps:[],
 notes:['用于 Step 1 Corréctor 研磨；斜边设计、小魔术贴，可水洗。'],url:MAFRA+'blu-pad-tampone-blu-medio-duro/'},

{id:'F-pad-yellow',brand:'F',category:'acc',name:'Yellow Pad 2.0',type:'中软黄色抛光海绵盘（145 mm）',sizes:'Ø145 mm × 20 mm',materials:'—',dilutions:[],steps:[],
 notes:['用于 Step 1 Corréctor，也可接着做 Step 2 Illúmina；可水洗。'],url:MAFRA+'yellow-pad-tampone-medio-morbido/'},

{id:'F-pad-black',brand:'F',category:'acc',name:'Black Pad L 2.0',type:'超软黑色收光海绵盘（145 mm）',sizes:'Ø145 mm × 25 mm · 5 片',materials:'—',dilutions:[],steps:[],
 notes:['用于 Step 2 Illúmina 收光；可水洗。'],url:MAFRA+'tampone-per-polish-auto-morbido/'},

{id:'F-microwool',brand:'F',category:'acc',name:'Polish Pad Microwool',type:'硬海绵 + 微羊毛复合研磨盘（双动机）',sizes:'Ø145 mm × 20 mm',materials:'—',dilutions:[],steps:[],
 notes:['切削力强，推荐配 Corréctor；可水洗。'],url:MAFRA+'polish-pad-microwool/'},

{id:'F-hybrid',brand:'F',category:'acc',name:'Hybrid Fiber Pad L',type:'硬海绵 + 超纤复合抛光盘（双动机）',sizes:'Ø145 mm × 20 mm',materials:'—',dilutions:[],steps:[],
 notes:['可配 Corréctor 或 Labocosmetica AUDACE、LEALE 使用；可水洗。'],url:MAFRA+'hybrid-fiber-pad-tampone-in-microfibra/'},

{id:'F-eskimo-white',brand:'F',category:'acc',name:'Eskimo White',type:'白色羊毛研磨盘（150 mm，旋转机）',sizes:'Ø150 mm',materials:'—',dilutions:[],steps:[],
 notes:['研磨阶段切削更好，转动平稳。'],url:MAFRA+'tampone-lana-bianco/'},

{id:'F-eskimo-gold',brand:'F',category:'acc',name:'Eskimo Gold',type:'黄色羊毛研磨盘（旋转机）',sizes:'—',materials:'—',dilutions:[],steps:[],
 notes:['切削力和速度更高，散热更好，纤维不易打结、容易清洁。'],url:MAFRA+'eskimo-gold-tampone-in-lana-gialla-pad-auto/'},

{id:'F-secchio-wash',brand:'F',category:'acc',name:'Secchio Wash',type:'21 L 洗车桶',sizes:'21 L',materials:'—',dilutions:[],
 steps:['按香波瓶身比例加入香波，用高压水冲出泡沫。','配一个装了 Grit Safe 隔砂网的 Secchio Rinse 清水桶，用于洗手套。'],
 notes:['耐酸碱、耐冲击。'],url:MAFRA+'secchio-wash/'},

{id:'F-gritsafe',brand:'F',category:'acc',name:'Grit Safe',type:'洗车桶隔砂网（Ø26 cm）',sizes:'Ø26 cm',materials:'—',dilutions:[],steps:[],
 notes:['装在 Secchio Rinse 清水桶底，洗手套时把砂砾隔在网下，减少旋纹和划痕。'],url:MAFRA+'grit-safe/'},

{id:'F-nebula',brand:'F',category:'acc',name:'Nebula Foam 2.0',type:'手动 / 充气两用泡沫喷壶（2 L）',sizes:'2 L（可用 1.25 L）',materials:'—',dilutions:[],
 steps:['先在 MAFRA 刻度瓶里稀释产品，装入壶内最多 1.25 L，旋紧壶头。','手动打气到阀门咔嗒响，或用轮胎气嘴接压缩机充气（最高 3 bar）。','解除扳机锁后喷涂；用完重新上锁，用安全阀泄压。'],
 notes:['三个喷嘴：绿色干泡沫、灰色中等（标配）、橙色湿泡沫覆盖面更大。','没有高压清洗机和 PA 壶时也能做泡沫预洗。'],url:MAFRA+'nebula-foam-2-0-nebulizzatore-schiumogeno-bi-uso-accessori-lavaggio-auto/'},

// pH source: https://www.mafra.it/wp-content/uploads/2022/05/H0746_1.pdf
{id:'F-mfwash',brand:'F',category:'towel',ph:{"category":"alk","value":"9","basis":"raw","source":{"kind":"technical-sheet","url":"https://www.mafra.it/wp-content/uploads/2022/05/H0746_1.pdf"},"evidence":[{"kind":"statement","source":"technical-sheet","text":"pH 9（20 °C，pH 计测量）来自 MAFRA 官网技术表。"}],"conflict":false},name:'Microfiber Wash',type:'超纤布专用洗涤剂',sizes:'—',materials:'—',
 dilutions:[['洗衣机 / 手洗','每 kg 布约 15 ml','—']],
 steps:['每 kg 超纤布加约 15 ml。','30 °C 洗涤，不要加柔顺剂。'],
 notes:["去除抛光剂、研磨剂和蜡残留；不含柔顺剂和阳离子表面活性剂。"],url:MAFRA+'microfibra-wash/'},
];

export const flows: Flow[] = [
{id:'f-f-wash',brand:'F',name:'双桶手工洗车',en:'MAFRA Two-Bucket Hand Wash',scene:'daily',tags:['轮毂'],
 summary:'按 MAFRA 洗车桶、手套和毛巾产品页给出的做法：轮毂轮胎 → 泡沫预洗 → 双桶手洗 → 冲洗 → Fast Cleaner 辅助擦干 → 轮胎上光。',
 steps:[
  {phase:'轮毂轮胎',products:['F-cerchi-gomme'],ratio:'即用',how:'先喷轮胎，再抬高喷头喷轮毂，用刷子带进缝隙，停留约 1 分钟后用强水流冲洗。'},
  {phase:'泡沫预洗',products:['F-idrowash'],extras:['Nebula Foam 2.0 或 PA 壶'],ratio:'泡沫设备储液罐 1:1',how:'由下往上喷满车身，停留不要干掉，用高压水冲洗。没有 PA 壶时可用 Nebula Foam 2.0。'},
  {phase:'双桶手洗',products:['F-shampoo-power','F-guanto','F-secchio-wash','F-gritsafe'],ratio:'1 瓶盖 / 1 L 水',how:'Secchio Wash 装香波水，Secchio Rinse 装清水并放 Grit Safe。手套浸透香波水，由上往下轻压直线清洗，经常在清水桶的隔砂网上搓洗手套。'},
  {phase:'冲洗',how:'用清水彻底冲洗全车。'},
  {phase:'擦干',products:['F-fast-cleaner','F-superdryer'],ratio:'即用',how:'在湿车身上喷 Fast Cleaner，再用 Super Dryer 短毛面平铺轻拉吸干，毛巾更顺滑、不留水痕。'},
  {phase:'轮胎上光',products:['F-nerissimo','F-fastblack'],alt:true,ratio:'Nerissimo 原液或 1:1',how:'Nerissimo 用海绵涂：原液为湿润光泽，1:1 为中等光泽；或直接喷 Fast & Black 后自然干燥。'},
 ],
 notes:['官方提醒：车身约 90 % 的划痕来自错误的洗车手法和配件。','不要在阳光直射下或热的车身上洗车。'],
 url:MAFRA+'secchio-wash/'},

{id:'f-f-deco',brand:'F',name:'漆面除染（Regénera）',en:'MAFRA Kit Regénera Carrozzeria',scene:'tfr',tags:['抛光前'],
 summary:'按 Kit Regénera 和 Clay Bar 产品页：洗车 → Fallout 化学除铁 → Fast Cleaner 润滑过黏土 → 擦净 → Polish Express 封闭洗车 → Super Dryer 擦干。',
 steps:[
  {phase:'洗车并擦干',products:['F-shampoo-power'],ratio:'1 瓶盖 / 1 L 水',how:'正常洗车，去除表面松散污垢，擦干。'},
  {phase:'化学除铁',products:['F-fallout'],ratio:'即用',how:'逐块、每次半辆车喷涂，停留 2–4 分钟变紫后冲洗；不要让它干掉，不要接触铸铁卡钳。'},
  {phase:'黏土',products:['F-clay-soft','F-clay-medium','F-fast-cleaner'],how:'在阴凉处、车身冷却时，用 Fast Cleaner 持续润滑，泥块纵横轻滑到表面不再粗糙。深色车用 Clay Soft，浅色、污染重的车用 Clay Medium Soft。'},
  {phase:'擦净',products:['F-fast-cleaner','F-heavywork'],how:'喷 Fast Cleaner，用 Heavy Work 超纤布擦掉黏土残留。'},
  {phase:'封闭洗车',products:['F-polish-express'],ratio:'按瓶身刻度',how:'用 Polish Express 像香波一样再洗一遍，同时上光保护。'},
  {phase:'擦干',products:['F-superdryer'],how:'用 Super Dryer 擦干。'},
 ],
 notes:['薄塑料袋测试：洗车后隔着塑料袋轻摸车漆，粗糙就需要除染；除染后会顺滑无声。','车身和轮毂等「较硬」部位用不同的泥块。'],
 url:MAFRA+'kit-regenera-carrozzeria-trattamento-decontaminante/'},

{id:'f-f-polish',brand:'F',name:'机器抛光两步（Corréctor → Illúmina）',en:'MAFRA Professional Polishing',scene:'tfr',tags:['抛光'],
 summary:'按 MAFRA 抛光剂和抛光盘产品页的搭配：Sherlock 检查 → Step 1 Corréctor 3.0 研磨 → Step 2 Illúmina 2.0 收光 → Spléndida 2.0 增亮收尾。',
 steps:[
  {phase:'检查漆面',products:['F-sherlock'],how:'倒在超纤布上擦过车身，去掉油分后检查漆面瑕疵。'},
  {phase:'Step 1 研磨',variants:[
    {name:'双动机',products:['F-corrector','F-pad-white','F-pad-blu','F-microwool'],how:'1–2 档在 40×40 cm 区域抹匀，升到最高档抛到研磨剂耗尽。硬漆用 White Pad，一般用 Blu Pad，需要更强切削用 Microwool。'},
    {name:'旋转机',products:['F-corrector','F-eskimo-white','F-eskimo-gold'],how:'羊毛盘：先 600–900 rpm，逐步升到 1500–1800 rpm，最后轻压 600–900 rpm 收尾。'},
  ]},
  {phase:'Step 2 收光',products:['F-illumina','F-pad-yellow','F-pad-black'],how:'同样的转速 / 档位，用 Yellow Pad 或超软 Black Pad，去除研磨留下的光环；用超纤布擦掉多余。'},
  {phase:'增亮收尾',products:['F-splendida','F-topbuffing'],how:'用 1–2 档抛光机或手工交叉涂一层（每块钣金两小滴），用 Top Buffing 擦掉。'},
 ],
 notes:['每次在盘上只加少量研磨剂。','Corréctor 和 Illúmina 都可用于 PPF。'],
 url:MAFRA+'polish-corrector-3-0-1000-gr/'},

{id:'f-f-hand-polish',brand:'F',name:'手工 / 双动机轻度翻新',en:'MAFRA Scratch & Swirls → Cleaner Wax → Glazing Wax',scene:'tfr',tags:['抛光'],
 summary:'按 MAFRA Car Detailing 系列产品页：黏土除染 → Scratch & Swirls Remover 去划痕 → Cleaner Wax 清洁上蜡 → Glazing Wax 收尾。',
 steps:[
  {phase:'除染',products:['F-clay-soft','F-clay-medium','F-fast-cleaner'],how:'官方建议施工前先用黏土除染。'},
  {phase:'去划痕（需要时）',products:['F-scratch'],how:'手工每次 30×30 cm 打圈；双动机每次约 50×50 cm，中等压力重叠走位，干掉前擦掉残留。'},
  {phase:'清洁上蜡',products:['F-cleanerwax','F-mfpad'],how:'去除发乌、氧化和轻微擦漆印；手工轻打圈，或双动机配细抛盘。'},
  {phase:'Glaze 收尾',products:['F-glazing','F-topbuffing'],how:'作为最后一步，手工打圈或双动机配软盘，干掉前用干净超纤布擦掉。'},
 ],
 notes:['表面须干净、不热、在阴凉处，用前摇匀。'],
 url:MAFRA+'glazing-wax-polish-lucidante-protettivo/'},

{id:'f-f-wheel',brand:'F',name:'轮毂深度除铁',en:'MAFRA Rim & Tyre Cleaner + Fallout Iron Remover',scene:'wheel',tags:[],
 summary:'Fallout 产品页的做法：轮毂很脏时先用 Pulitore Cerchi e Gomme 清洁、冲净擦干，再用 Fallout 除铁，最后给轮胎上光。约每 3000 km 做一次。',
 steps:[
  {phase:'轮毂轮胎清洁',products:['F-cerchi-gomme','F-splendorlega'],alt:true,ratio:'即用',how:'喷涂后用刷子刷到缝隙，停留约 1 分钟，用强水流冲洗，擦干。'},
  {phase:'除铁',products:['F-fallout','F-regenera-rims'],alt:true,ratio:'即用',how:'喷在轮毂上停留 3–4 分钟，不要干掉；变紫后用轮毂刷刷辐条和缝隙，大量清水冲洗，超纤布擦干。'},
  {phase:'轮胎上光',products:['F-nerissimo','F-extremeblack','F-black3'],alt:true,how:'轮胎干透后涂抹或喷涂，擦掉多余，干透再开车。'},
 ],
 notes:['不要用于发热的轮毂；不要让除铁剂接触铸铁刹车卡钳。','Fallout 不可用于阳极氧化铝轮毂。'],
 url:MAFRA+'fallout-iron-remover-1l-decontaminante-rapido-cerchi-e-carrozzeria/'},

{id:'f-f-int',brand:'F',name:'内饰清洁与皮革护理',en:'MAFRA Interior · Pulimax + Charme',scene:'int',tags:[],
 summary:'按内饰产品页：Pulimax 喷雾清洁硬表面 → 3in1 Tessuti 清洁织物 → 皮革先 Charme 清洁泡沫、再 Nutrient 滋养 → 塑料养护。',
 steps:[
  {phase:'硬表面清洁',products:['F-pulimax-spray'],ratio:'即用',how:'喷涂后停留几分钟，不要让它干掉，用布擦掉污垢；座椅磨损时先测试。'},
  {phase:'织物',products:['F-3in1-tessuti'],ratio:'即用',how:'3in1 Tessuti 喷涂后用软毛刷抹匀泡沫、擦干。'},
  {phase:'皮革清洁',products:['F-charming'],ratio:'即用',how:'涂开后在泡沫变液体前打圈按摩，用柔软湿布擦掉。'},
  {phase:'皮革滋养',products:['F-nutrient','F-hydrating'],alt:true,how:'Nutrient 同方向小圈涂抹，吸收 20 分钟后擦掉多余；或喷 Hydrating 渗透几分钟后擦掉。'},
  {phase:'塑料养护',products:['F-scic-blu','F-plast-satin','F-diamant-dressing'],alt:true,ratio:'即用',how:'少量喷涂，用超纤布抹匀，再用第二条干净布收尾。'},
 ],
 notes:['敞篷车夏季加强皮革护理。'],
 url:MAFRA+'pulire-sedili-in-pelle-nutrient/'},

{id:'f-f-waterless',brand:'F',name:'无水洗车',en:'MAFRA Waterless',scene:'nowater',tags:[],
 summary:'Waterless 产品页的做法：一次一块板喷涂 → 折四折的超纤布单向擦 → 干净布收尾；最后可用 Last Touch Express 上光。',
 steps:[
  {phase:'喷涂',products:['F-waterless'],ratio:'即用',how:'一次一块板，均匀喷涂，让产品软化污垢。'},
  {phase:'擦拭',products:['F-heavywork'],how:'超纤布折成四折，直线单向擦，逐步抬起布面，每次换干净的一面。'},
  {phase:'收尾',products:['F-topbuffing'],how:'用新的干净干燥超纤布擦净。'},
  {phase:'上光（可选）',products:['F-lasttouch'],ratio:'即用',how:'少量喷涂，用超纤布抹开，再用干布擦干。'},
 ],
 notes:['准备 6–10 条超纤布。','有厚泥沙时先正常洗车。'],
 url:MAFRA+'waterless-750ml-lavaggio-a-secco-auto/'},
];

export const combos: Combo[] = [
{id:'c-f-wax',brand:'F',name:'洗后快速上蜡',scene:'daily',tags:['保护'],base:'f-f-wash',at:'替换第 5 步「擦干」',
 summary:'擦干时把 Fast Cleaner 换成 Last Touch Express 2.0（干湿车都能用）或 Metal Car，洗完车顺手留下一层蜡；想要更持久的用 Carlux。',
 steps:[
  {phase:'擦干并上蜡',products:['F-lasttouch','F-metalcar'],alt:true,ratio:'即用',how:'在约 20 cm 外少量喷涂，用超纤布抹开，再用 Super Dryer 或另一条干布擦干。'},
  {phase:'持久保护（可选）',products:['F-carlux','F-mfpad'],how:'车身干燥后，用 Microfiber Pad 以直径约 40 cm 的圈轻压抹开，逐块施工后擦掉多余。'},
 ],
 notes:['不要在阳光直射下施工。'],
 url:MAFRA+'cera-istantanea-per-lucidare-carrozzeria-last-touch-express/'},
];
