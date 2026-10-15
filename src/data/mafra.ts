// MAFRA（MA-FRA，意大利）本家产品与流程数据。来源：mafra.it 英文版产品页（用法缺失时参考意大利文版），2026-10 整理翻译。
// MAFRA 是 Labocosmetica 与 Maniac Line 的母公司；这里只收录 MAFRA 品牌下的手工洗车 / 美容产品，
// 不含 Maniac Line（已单独收录）、隧道式 / 自助洗车房设备药剂、家政、船艇、香氛与工业清洗产品。
// 比例写法沿用官方：1:10 = 1 份原液 + 10 份水；官方写百分比的保留原文并附换算
import type { Combo, Flow, Product } from './types';

const MAFRA = 'https://mafra.it/en/';

export const products: Product[] = [
// ───────────────────────── 预洗 ─────────────────────────
{id:'F-valido',b:'F',c:'pre',n:'Valido（专业装）',t:'手工洗车用高去污力泡沫预洗',f:'25 kg',m:'车漆 · 铝 · 塑料饰条 · 橡胶',
 d:[['喷雾壶预洗','1:30 – 1:50','喷雾壶'],['泡沫枪预洗','1:3','PA壶'],['轮毂清洁','1:4','喷雾壶'],['自助洗车房','每车 30–40 ml','—']],
 s:['按脏污程度稀释，由下往上喷满车身。','让它溶解油脂、油污、交通膜、虫尸和柴油污渍，不要让它干在车上。','用高压水冲洗；在阳光下干掉后，再冲一次水即可恢复作用、不留水痕。'],
 x:['适合中硬度水质，不适合硬水。','不要用于摩托车。','高温下对车身安全，适用于所有车漆、铝和塑料饰条；无磷酸盐。'],u:MAFRA+'valido-prewash-power-foam-lavaggio-manuale/'},

{id:'F-iglu',b:'F',c:'pre',n:'Iglù 2.0（专业装）',t:'多用途泡沫预洗（N.A.R.T. 免压缩空气起泡）',f:'25 kg',m:'车漆 · 塑料 · 铝 · 轮毂',
 d:[['喷雾壶预洗','1:40 – 1:50','喷雾壶'],['泡沫枪预洗','1:4','PA壶'],['轮毂','1:5（15 %）','喷雾壶'],['虫尸','1:20（5 %）','喷雾壶'],['自助洗车房','每车 20–40 ml','—']],
 s:['按用途稀释，低压喷满车身（可用于手工洗车的低压预洗）。','停留让它渗透路面污垢，高温下也干得慢。','用高压水冲洗。'],
 x:['不适合很硬的水。','在推荐比例下对 BMW、奔驰、奥迪的铝和塑料件安全。','不需要热水也有效（Energy Safe）。'],u:MAFRA+'iglu-foam-prewash-schiumogeno-polivalente/'},

{id:'F-c1',b:'F',c:'pre',n:'C1（专业装）',t:'多用途泡沫预洗（软水 / 硬水均可）',f:'25 kg',m:'车漆 · 车身外部',
 d:[['泡沫枪','1:3','PA壶'],['喷雾壶','1:40 – 1:50','喷雾壶']],
 s:['按工具稀释，喷满车身。','停留让泡沫溶解污垢。','用高压水冲洗。'],
 x:['专为泡沫枪和泡沫喷壶设计，清洁后车身干净有光泽。'],u:MAFRA+'c1-prelavaggio-schiumogeno-polivalente/'},

{id:'F-docg3',b:'F',c:'pre',n:'DOC G3（专业装）',t:'快速泡沫预洗（ISO 14001）',f:'25 kg',m:'车漆 · 塑料 · 发动机',
 d:[['喷雾壶预洗','1:30 – 1:60','喷雾壶'],['泡沫枪','1:4 – 1:5','PA壶'],['轮毂','1:10','喷雾壶'],['虫尸','1:30','喷雾壶'],['自助洗车房','每车 20–40 ml','—']],
 s:['按用途稀释后喷涂。','停留让污垢松动、悬浮，不需要海绵或刷子。','用高压水冲洗。'],
 x:['不要用于摩托车。','能去除多年积累的虫尸和交通膜，不伤漆色和塑料；与洗车蜡兼容。','不含 NTA、EDTA 和磷酸盐。'],u:MAFRA+'doc-g3-detergente-auto-prelavaggio-schiumogeno-rapido/'},

{id:'F-jedy',b:'F',c:'pre',n:'Jedy 2.0（专业装）',t:'手工洗车 / 自助洗车房泡沫预洗',f:'25 kg · 60 kg · 220 kg',m:'车漆 · 塑料 · 橡胶',
 d:[['喷雾壶（按脏污程度）','1:20 – 1:70','喷雾壶'],['泡沫枪（按污垢厚度）','原液 – 1:10','PA壶']],
 s:['按污垢程度稀释。','由下往上喷涂，覆盖更均匀。','停留后用高压水冲洗；阳光下干得慢，冲洗容易。'],
 x:['深色、老旧或氧化的车漆，先用水冲凉车身再喷。','不要用于摩托车。','专业用途。'],u:MAFRA+'jedy-2-0/'},

{id:'F-mafrasol',b:'F',c:'pre',n:'Mafrasol 2.0（专业装）',t:'低 / 中泡预洗（带抛光效果）',f:'6 kg · 25 kg',m:'车漆 · 车身外部',
 d:[['喷雾壶预洗','1:30 – 1:50（约 3 % – 2 %）','喷雾壶'],['泡沫枪','1:3（20 %）','PA壶'],['自助洗车房','每车 30–40 g','—']],
 s:['按脏污程度在喷壶中稀释。','由下往上均匀喷涂。','用高压水冲洗。'],
 x:['不要用于摩托车或轻质、易损的合金。','老旧氧化的车漆不要在车身发热时洗。','与各类洗车蜡兼容。'],u:MAFRA+'mafrasol-2-0-detergente-prelavaggio-effetto-polish/'},

{id:'F-supermafrasol',b:'F',c:'pre',n:'Supermafrasol',t:'高浓缩重污预洗 / 去油剂（去交通膜）',f:'900 ml · 6 kg · 12 kg · 25 kg',m:'车漆 · 车身外部 · 发动机（不可用于铝和轻合金）',
 d:[['去油清洁（按污垢和停留时间）','1:5 – 1:55','喷雾壶'],['喷雾壶预洗（专业装）','1:30 – 1:80（1 L 原液加 30–80 L 水）','喷雾壶'],['自助洗车房 / 隧道自动预洗','每车 20–40 g','—']],
 s:['按污垢、表面和停留时间稀释。','在阴凉处由下往上喷涂，分布更均匀。','不要让溶液干在表面上，用水彻底冲洗。','擦干。'],
 x:['不要用于铝、轻合金件和摩托车。','深色、老旧或氧化的车漆不要在车身发热时洗。','可去除浅色车上的交通膜和雾斑；硬水中高倍稀释也有效。','专业用途。'],u:MAFRA+'pulire-e-sgrassare-auto-professionale-supermafrasol/'},

{id:'F-supermafrasol-evo',b:'F',c:'pre',n:'Super Mafrasol EVO',t:'碱性多用途去油预洗剂（交通膜 / 虫尸 / 鸟粪）',f:'900 ml',m:'车漆 · 轮毂 · 轮胎 · 塑料 · 橡胶饰条（不可用于铝和铝合金）',
 d:[['轻度日常维护','1:20 – 1:50','喷雾壶'],['重度脏污','1:5 – 1:10','喷雾壶'],['地面油污清洁','1:5 – 1:10','喷雾壶']],
 s:['先用水把灰尘和大颗粒脏污轻轻冲掉。','按脏污程度稀释（瓶盖带刻度，可直接量取）。','在阴凉处均匀喷在车身上，让它和污垢反应 30 秒 – 2 分钟，不要让它干掉。','干掉之前用高压水彻底冲净，不留残留；如果留下水痕，再喷一次后冲洗或擦掉。'],
 x:['标签注明为碱性原液，按 1:5–1:50 使用（20–200 ml / 1 L）。','不要用于铝和铝合金表面，不要在发热的表面或阳光直射下施工。','只用于外部，不要在车内使用。','镀膜车：高浓度反复使用会影响镀膜的持久度，只在需要的部位局部使用。','塑料和橡胶饰条在推荐比例内可用，用完要充分冲洗；其他敏感材质先小面积测试。','不要和其他产品混合；佩戴手套，保持通风。','这是 MAFRA 2025 年在韩国推出的新品，mafra.it 还没有收录，资料来自韩国官方商城 maframall.com 和韩国安全标示（EA25-01-0020）。'],u:'https://maframall.com/product/detail.html?product_no=1097'},

{id:'F-idrowash',b:'F',c:'pre',n:'Idrowash',t:'高压清洗机用超泡沫清洁剂（预洗 / 泡沫香波）',f:'1 L',m:'车漆 · 镀铬 · 车身外部',
 d:[['高压清洗机泡沫枪 / 泡沫壶','1:1','PA壶']],
 s:['原液和水 1:1 倒入高压清洗机的储液罐或 Nebula Foam 2.0。','喷满表面，停留几分钟，不需要刷洗。','彻底冲洗。'],
 x:['官方说明 pH 平衡，对车漆和镀铬安全，冷水也有效。','可去除冬季盐渍、夏季树脂、秋季泥土和春季灰尘。'],u:MAFRA+'idrowash/'},

{id:'F-killer',b:'F',c:'pre',n:'Killer',t:'即用型虫尸 / 鸟粪去除剂（弱碱性）',f:'250 ml · 500 ml',m:'车漆 · 玻璃 · 保险杠 · 大灯',
 d:[['虫尸、鸟粪、树脂斑','即用','喷雾壶']],
 s:['先冲洗车身，去掉粗大的污垢。','均匀喷在虫尸上，停留约 1 分钟。','用干燥超纤布擦掉（或用海绵 / 手套），再正常洗车。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 EB19-01-0428）。','不需要刷洗，能溶解已经干掉的虫尸。','对车漆、塑料、玻璃和大灯安全。'],u:MAFRA+'togliere-moscerini-auto-killer/'},

// ───────────────────────── 洗车香波 / 无水洗 ─────────────────────────
{id:'F-shampoo-power',b:'F',c:'wash',n:'Shampoo Power',t:'高浓缩自去油洗车香波（弱碱性）',f:'1 L',m:'车漆 · 哑光 / 缎面车漆 · 改色膜 · 铝 · 喷漆轮毂',
 d:[['桶洗','1 瓶盖 / 1 L 水（5 瓶盖 / 5 L）','桶洗'],['桶洗（韩国标签标准用量）','1:400（25 ml / 10 L）','桶洗']],
 s:['每升水加一瓶盖原液，5 L 水桶加 5 瓶盖。','用海绵或洗车手套洗车。','冲洗后擦干。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 EB20-01-0725）。','泡沫丰富、易冲洗，不留残留和水痕；一瓶约洗 30 次。','对铝条、喷漆轮毂、哑光 / 缎面漆和改色膜安全。'],u:MAFRA+'shampoo-auto-power-concentrato/'},

{id:'F-shampoo-cera',b:'F',c:'wash',n:'Car Wash Shampoo e Cera',t:'含蜡洗车香波（洗护一体）（弱碱性）',f:'1 L',m:'车漆 · 玻璃',
 d:[['桶洗','1 瓶盖 / 1 L 水','桶洗'],['桶洗（韩国标签标准用量）','1:100（100 ml / 10 L）','桶洗']],
 s:['先预洗，去掉大部分污垢并让车身降温。','每升水加一瓶盖原液，用手套或超纤海绵洗车。','用大量清水冲洗后擦干。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 EB22-01-0951）。','蜡成分让前挡上的水珠容易流走，擦干更快。'],u:MAFRA+'shampoo-e-cera-per-auto/'},

{id:'F-polish-express',b:'F',c:'wash',n:'Polish Express',t:'当香波用的纳米抛光剂（洗车同时上光）',f:'250 ml（套装附海绵）· 4.5 L',m:'车漆 · 车身外部',
 d:[['手洗上光','按瓶身刻度稀释（250 ml 约洗 5 辆车）','桶洗']],
 s:['按瓶身的稀释说明加水。','像香波一样手洗全车（套装附专用海绵）。','冲洗后擦干。'],
 x:['凝胶状，官方称保护最长 6 周。','官方建议在黏土除染后用它做「封闭洗车」。'],u:MAFRA+'kit-polish-express/'},

{id:'F-waterless',b:'F',c:'wash',n:'Waterless',t:'即用型无水洗车（润滑配方）（弱碱性）',f:'750 ml · 4.5 L',m:'车身外部',
 d:[['无水洗车','即用','喷雾壶']],
 s:['一次处理一小块（例如一块板），均匀喷涂，让产品润湿、软化污垢。','超纤布折成四折，向一个方向擦，污垢擦下时逐渐抬起布面；每次换干净的一面。','清洁完用另一条干净的干超纤布收尾；逐块重复到全车完成。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 EB24-02-0140）。','只直线擦拭，不要打圈。','按车大小准备 6–10 条超纤布；清洁和收尾时也可以往布上喷一点增加润滑。','有厚泥沙或层层积尘时先正常洗车，以免产生划痕。'],u:MAFRA+'waterless-750ml-lavaggio-a-secco-auto/'},

{id:'F-ecodry',b:'F',c:'wash',n:'Ecodry Detailer 2G（专业装）',t:'免水干洗剂（无溶剂，适合展厅）',f:'—',m:'车漆 · 塑料 · 玻璃 · 镜面 · 镀铬 · 不锈钢',
 d:[['无水洗车','即用','喷雾壶']],
 s:['从车顶开始，避开阳光。','在一小块车身上喷涂，等几秒让它包裹污垢。','用软布朝一个方向擦，不要来回搓；表面会留一层膜，再用第二条干软布擦净。','经常翻面，始终用布的干净部分。'],
 x:['有泥土、沙子结块的表面不要直接用，先用蒸汽机清理。','适合展厅、经销店等室内环境，节省时间和用水。'],u:MAFRA+'lavaggio-auto-a-vapore-detergente-senza-acqua1/'},

// ───────────────────────── 轮毂 ─────────────────────────
{id:'F-cerchi-gomme',b:'F',c:'wheel',n:'Pulitore Cerchi e Gomme',t:'即用型轮毂轮胎清洁剂（泡沫喷头）（碱性）',f:'125 ml · 750 ml · 4.5 L',m:'合金轮毂 · 轮胎',
 d:[['轮毂和轮胎','即用','喷雾壶']],
 s:['用泡沫喷头先喷轮胎，再抬高喷头喷到轮毂上。','用刷子把产品带进缝隙，停留约 1 分钟。','看到污垢大量流下时，用强水流冲洗。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：碱性（登记号 EA19-01-0317）。','溶解刹车粉、污垢、结垢和油烟，同时让轮胎恢复原色。','轮毂很脏时，官方建议先用它清洁，再用 Fallout Iron Remover 除铁。'],u:MAFRA+'pulire-cerchi-e-gomme/'},

{id:'F-splendorlega',b:'F',c:'wheel',n:'Splendorlega',t:'即用型合金轮毂清洁剂（无酸、无烧碱）',f:'500 ml',m:'合金 / 镁合金轮毂',
 d:[['合金轮毂','即用','喷雾壶']],
 s:['距离约 20 cm 均匀喷在轮毂上。','停留后用软毛刷或细刷刷遍每处，辐条轮毂尤其要刷到。','彻底冲洗，擦干轮毂。'],
 x:['专门溶解刹车片产生的含铁粉尘。','不含酸和烧碱，不会腐蚀或磨损轮毂。'],u:MAFRA+'pulire-cerchi-in-lega-splendorlega/'},

{id:'F-splendorlega-pro',b:'F',c:'wheel',n:'Splendorlega（专业装）',t:'浓缩合金 / 铝轮毂清洁剂',f:'6 kg · 12 kg · 25 kg',m:'合金 / 铝轮毂 · 塑料轮毂盖',
 d:[['按脏污 / 氧化程度','1:3 – 1:6（1 L 原液加 3–6 L 水）','喷雾壶']],
 s:['按脏污或氧化程度稀释。','喷在轮毂上，让它溶解污垢和含铁残留。','用高压水冲洗。'],
 x:['也可用于塑料轮毂盖。','专业用途。'],u:MAFRA+'splendorlega/'},

{id:'F-rimnet',b:'F',c:'wheel',n:'Rim Net（专业装）',t:'碱性轮毂 / 轮毂盖清洁剂',f:'25 kg',m:'轮毂 · 轮毂盖',
 d:[['轮毂','1:4 – 1:9（20 % – 10 %）','喷雾壶']],
 s:['稀释到 10 %–20 %。','用喷壶或专用设备喷涂。','用高压水冲洗。'],
 x:['快速溶解油脂、油烟和粉尘，不伤表面。'],u:MAFRA+'detergente-cerchi-auto-in-alluminio/'},

{id:'F-powerwheel',b:'F',c:'wheel',n:'Power Wheel（专业装）',t:'多用途碱性轮毂清洁剂',f:'25 kg',m:'金属 / 合金轮毂 · 塑料轮毂盖',
 d:[['手工清洗（按速度要求）','1:5 – 1:10','喷雾壶'],['自动洗车设备','每程序 20–30 g','—']],
 s:['按需要的速度稀释。','用喷壶或专用设备喷涂。','用高压水冲洗。'],
 x:['不要用于摩托车、摩托车轮毂或铝型材。','专业用途。'],u:MAFRA+'sgrassatore-cerchioni-in-lega-incrostati/'},

{id:'F-fallout',b:'F',c:'wheel',n:'Fallout Iron Remover',t:'铁粉去除剂（变紫）',f:'500 ml · 1 L · 4.5 L',m:'钢 / 合金 / 镀铬 / 抛光轮毂 · 车漆',
 d:[['轮毂','即用','喷雾壶'],['车身除铁','即用','喷雾壶']],
 s:['轮毂：喷上后停留 3–4 分钟，不要让表面干掉；变紫后用刷子刷到辐条缝隙，再用大量清水冲洗，用超纤布擦干。','车身：先洗车擦干；在约 60 cm 外喷涂，逐块、每次半辆车，停留 2–3 分钟变紫后冲洗。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱酸性（登记号 EB20-01-0464）。意大利官网写的是「无酸、pH 平衡」，韩国标签写弱酸性，两处说法不一致。','不要接触铸铁刹车卡钳；不要用于发热的表面。','有硫磺味，在通风处使用。','官方建议约每 3000 km 给轮毂除铁一次；轮毂很脏时先用 Pulitore Cerchi e Gomme 清洁、冲净擦干。'],u:MAFRA+'fallout-iron-remover-1l-decontaminante-rapido-cerchi-e-carrozzeria/'},

{id:'F-regenera-rims',b:'F',c:'wheel',n:'Kit Regénera Cerchi',t:'轮毂除染套装（Fallout 500 ml + 轮毂刷）',f:'套装',m:'钢 / 合金 / 镀铬轮毂（不可用于阳极氧化铝轮毂）',
 d:[['轮毂','即用','喷雾壶']],
 s:['把 Fallout Iron Remover 喷在轮毂上，停留 3–4 分钟，不要让表面干掉，等它变紫。','用随附的刷子刷掉辐条间和缝隙里的深层污垢。','用大量清水冲洗，再用超纤布擦干。'],
 x:['不可用于阳极氧化铝轮毂和发热表面；不要接触刹车卡钳。'],u:MAFRA+'kit-regenera-cerchi-trattamento-decontaminante/'},

// ───────────────────────── 除染 ─────────────────────────
{id:'F-iron-sniper',b:'F',c:'deco',n:'Iron Sniper（专业装）',t:'超浓缩除铁剂（慢干配方，变紫）',f:'5 kg · 20 kg',m:'车漆 · 轮毂',
 d:[['轮毂 / 车身（按污染程度）','原液 – 1:1','喷雾壶']],
 s:['按污染程度原液或 1:1 稀释，喷在轮毂或车身上。','停留 3–4 分钟，不要让表面干掉；变紫表示正在溶解铁粉。','彻底冲洗。'],
 x:['不要接触铸铁刹车卡钳。','pH 温和，可安全用于车身，例如停在火车站或电车轨道附近的车。','有硫磺味，在通风处使用。'],u:MAFRA+'iron-sniper/'},

{id:'F-decaflash',b:'F',c:'deco',n:'Deca Flash',t:'柏油 / 不干胶去除剂（中性）',f:'250 ml',m:'车漆 · 玻璃',
 d:[['柏油、不干胶残留','即用','喷雾壶']],
 s:['喷在柏油或胶痕上，停留几秒。','用干净超纤布擦掉残留。','彻底冲洗，再用另一条干净超纤布擦干。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：中性（登记号 FB22-02-0034）。','也适合去除撕掉车贴后留下的黏胶。'],u:MAFRA+'togliere-adesivi-auto-e-catrame-deca-flash/'},

{id:'F-resinoff',b:'F',c:'deco',n:'Resin Off',t:'树脂 / 盐渍去除剂（弱碱性）',f:'250 ml',m:'车漆 · 车身外部',
 d:[['树脂、松脂、盐渍','即用','喷雾壶']],
 s:['确认表面不热、不在阳光下，喷在树脂上。','停留 1 分钟后用软布擦掉，不要用力搓。','顽固树脂滴重复操作。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 FB22-01-0293）。','也能去除已经结晶的松树树脂。'],u:MAFRA+'togliere-resina-auto-resin-off/'},

{id:'F-clay-medium',b:'F',c:'deco',n:'Clay Bar Medium Soft',t:'中软清洁泥（浅色车）',f:'100 g',m:'车漆 · 镀铬 · 合金轮毂',
 d:[],
 s:['分成两块，用手揉成球再压扁。','在阴凉处、车身冷却时，用 Fast Cleaner 充分润滑车身，分小块施工。','轻压滑动，先横向再纵向，均匀处理，不要打圈。','一面脏了翻另一面，两面都脏就揉匀再用；多次后换新。','除染完用 Polish Express 做一次封闭洗车，用 Super Dryer 擦干。'],
 x:['适合污染较重的浅色车。','可去除工业落尘、交通膜、鸟粪、虫尸、树脂、铁粉、轮毂刹车粉、水泥和酸雨斑。','抛光前做黏土，可以提升抛光效果的持久度和亮度。'],u:MAFRA+'clay-bar-medium-soft-pasta-argilla-decontaminante-auto-chiare/'},

{id:'F-clay-soft',b:'F',c:'deco',n:'Clay Bar Soft',t:'软质清洁泥（深色车）',f:'100 g',m:'车漆 · 玻璃 · 保险杠 · 塑料 · 合金轮毂',
 d:[],
 s:['分成两块或更多，揉成球后压成圆饼。','在阴凉处、车身冷却时施工，持续用 Fast Cleaner 润滑车身和泥块。','轻轻纵横滑动，直到表面不再粗糙、泥块滑动顺畅。','喷 Fast Cleaner，用超纤布擦掉残留并擦干。'],
 x:['专为深色和黑色车设计。','可用于任何非多孔表面；车身和轮毂等「较硬」部位建议用不同的泥块，避免硬颗粒划伤车漆。','泥块可重复使用：脏了揉出新的干净面；收纳前润滑后放回原盒。'],u:MAFRA+'clay-bar-soft-pasta-argilla-decontaminante-auto-scure/'},

{id:'F-regenera-body',b:'F',c:'deco',n:'Kit Regénera Carrozzeria',t:'漆面物理除染套装（Fast Cleaner + Clay Bar Soft + 超纤布）',f:'套装',m:'车漆 · 玻璃 · 保险杠 · 塑料 · 合金轮毂',
 d:[],
 s:['洗车后，把手指伸进薄塑料袋轻摸车漆，感觉粗糙就需要除染。','在室内或阴凉处、车身冷却时施工；把 Clay Bar 分成几块，揉成球再压成圆饼。','持续用 Fast Cleaner 润滑车身和泥块，纵横轻滑，直到表面不再粗糙。','喷 Fast Cleaner，用套装里的 Heavy Work 超纤布擦掉残留并擦干。'],
 x:['除染前后都要彻底洗车。','完成后表面光滑，可以接着上保护蜡。'],u:MAFRA+'kit-regenera-carrozzeria-trattamento-decontaminante/'},

// ───────────────────────── 研磨抛光 ─────────────────────────
{id:'F-corrector',b:'F',c:'polish',n:'Corréctor 3.0',t:'Step 1 重切削研磨剂（水性、无硅无填充）',f:'1000 g · 4500 g',m:'车漆 · PPF',
 d:[],
 s:['每次在盘上加少量。','旋转机：先 600–900 rpm，逐步升到 1500–1800 rpm，最后轻压 600–900 rpm 收尾。','双动机：1–2 档把研磨剂在 40×40 cm 区域抹匀，升到最高档抛到研磨剂耗尽。'],
 x:['去除 P1500 以内的砂纸痕和划痕（不是填充遮盖），适用于抗刮清漆、原厂漆和补漆。','可用于透明保护膜（PPF），去除老化痕迹。','可配羊毛盘、海绵盘或超纤盘；低粉尘，残留容易擦除。'],u:MAFRA+'polish-corrector-3-0-1000-gr/'},

{id:'F-scratch-remover',b:'F',c:'polish',n:'Scratch Remover（SR · Rimuovi Graffi）',t:'手工去划痕膏套装（附海绵施工头和抛光垫）',f:'100 ml',m:'车漆',
 d:[],
 s:['表面须干净、不热、在阴凉处。','用管口的海绵施工头把去划痕膏涂在划痕上，来回擦拭。','用随附的抛光垫擦亮，去除残留。'],
 x:['去除轻微、表层划痕（如门把手周围的指甲划痕、车门细划痕），较深的划痕只能减轻。','适用于各种车漆；膏体不会干在管内。','官网没有给出详细步骤，以上按套装内容（施工头 + 抛光垫）整理。需要机器去旋纹时用 Scratch & Swirls Remover（SSR）。'],u:MAFRA+'togliere-graffi-auto-special-kit/'},

{id:'F-scratch',b:'F',c:'polish',n:'Scratch & Swirls Remover（SSR）',t:'去划痕 / 旋纹研磨剂（中性）',f:'500 ml',m:'车漆',
 d:[],
 s:['施工前先用黏土除染；表面须干净、不热、在阴凉处，用前摇匀。','手工：每次处理 30×30 cm，打圈并部分重叠，干掉前用干净超纤布擦掉。','双动机：装研磨盘，把研磨剂直接加在盘上，盘面平贴漆面，中等压力重叠走位，每次约 50×50 cm，直到研磨剂开始被吸收；干掉前擦掉残留。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：中性（登记号 EB23-02-0186）。','去除浅划痕、旋纹和氧化，适用于各种颜色的车漆。','官方建议最后用 Glazing Wax 收尾，获得湿润光泽。'],u:MAFRA+'scratch-swirls-remover-heavy-polish-compound/'},

{id:'F-illumina',b:'F',c:'polish',n:'Illúmina 2.0',t:'Step 2 收光抛光剂（防光环）',f:'250 g · 500 g',m:'车漆 · PPF',
 d:[],
 s:['每次在盘上加少量。','旋转机：先 600–900 rpm，逐步升到 1500–1800 rpm，最后轻压 600–900 rpm 收尾。','双动机：1–2 档在 40×40 cm 区域抹匀，升到最高档抛到研磨剂耗尽，再用超纤布擦掉多余。'],
 x:['去除研磨留下的光环，同时有一定切削力（去除 P2500 以内的砂纸痕），取代旧版 Step 3 和 Step 4。','可用于 PPF。','水性、无硅无填充。'],u:MAFRA+'polish-illumina-2-0-500-gr/'},

{id:'F-cleanerwax',b:'F',c:'polish',n:'Cleaner Wax',t:'含巴西棕榈蜡的轻研磨清洁蜡（中性）',f:'500 ml',m:'车漆 · 塑料 · 橡胶',
 d:[],
 s:['施工前建议先用黏土除染；表面干净、不热、在阴凉处，用前摇匀。','手工：取适量在干净的超纤布或手工海绵上，轻轻打圈擦拭，再用干净超纤布收尾。','双动机：装细抛盘，中等压力重叠走位，每次约 50×50 cm，直到开始被吸收；干掉前擦掉残留。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：中性（登记号 EB23-06-0204）。','去除发乌、氧化、褪色和轻微擦漆印，恢复普通漆和金属漆的颜色。','可接触塑料和橡胶，不会损伤。','官方建议之后用 Glazing Wax 收尾。'],u:MAFRA+'cleaner-wax-polish-lucidante/'},

{id:'F-polish-clever',b:'F',c:'polish',n:'Polish Clever',t:'手工车漆翻新抛光剂',f:'—',m:'车漆',
 d:[],
 s:['在超纤施工块上滴 2–3 滴。','先打圈、再直线涂抹，轻压。','用 Double Face 超纤布擦掉多余。'],
 x:['翻新、去氧化、上光，也可去除新车的运输蜡残留。'],u:MAFRA+'prodotti-per-carrozzeria-auto-rigenerante-polish/'},

{id:'F-sherlock',b:'F',c:'polish',n:'Sherlock',t:'旋纹显示 / 车身脱脂剂',f:'—',m:'车漆',
 d:[['抛光检查 / 脱脂','即用','—']],
 s:['倒在超纤布上，擦过车身。','等几秒让它完全作用，去掉油分后检查漆面。'],
 x:['去除润滑油、抛光剂和硅油，露出被遮盖的瑕疵，不会让车漆发白。'],u:MAFRA+'scherlock-detergente-evidenziatore-swirl-auto/'},

{id:'F-regenera-view',b:'F',c:'polish',n:'Regénera View',t:'大灯罩（PC / 亚克力）手工抛光剂',f:'—',m:'大灯 · 塑料',
 d:[],
 s:['每次在海绵施工块上加少量。','手工施工，改变压力抛光。'],
 x:['去除轻微氧化和化学污染，减轻斑点和划痕，并留下长效保护。','也可用于敞篷车塑料后窗和摩托车整流罩。','污染严重的灯罩需先用 Kit Regénera Headlight 打磨。'],u:MAFRA+'regenera-view-polish-policarbonato/'},

{id:'F-flashbright',b:'F',c:'polish',n:'Flash Bright',t:'不锈钢 / 铝 / 镀铬快速抛光剂',f:'—',m:'镀铬 · 不锈钢 · 黄铜 · 合金',
 d:[],
 s:['取少量涂在金属表面。','抛光后擦掉，不留油腻痕迹。'],
 x:['去除细小划痕和轻微氧化，提供防腐蚀、防紫外线保护。','官方页面未给出详细步骤。'],u:MAFRA+'flash-bright-polish-per-lucidare-e-rinnovare-acciaio-cromo-lega/'},

// ───────────────────────── 封体 / 蜡 / 快速美容 ─────────────────────────
{id:'F-splendida',b:'F',c:'seal',n:'Spléndida 2.0',t:'Glaze 增亮收尾蜡（天然 + 合成蜡）',f:'500 g',m:'车漆',
 d:[],
 s:['把产品抹在盘上。','用 Easytech 抛光机以 1–2 档铺开，或手工交叉涂抹。','擦掉残留。'],
 x:['一块钣金只需两小滴。','填平细小划痕，带来深层光泽和丝滑手感，并有防紫外线和疏水效果。','不在橡胶和塑料上留残留。'],u:MAFRA+'splendida-2-500g-cera-di-rifinitura-glaze-booster-gloss/'},

{id:'F-glazing',b:'F',c:'seal',n:'Glazing Wax',t:'合成聚合物 Glaze 上光蜡（中性）',f:'500 ml',m:'车漆',
 d:[],
 s:['表面干净、不热、在阴凉处，用前摇匀。','手工：取适量在干净的超纤布或施工块上，轻轻打圈擦拭，再用干净超纤布收尾。','双动机：装软的收光盘，中等压力重叠走位，每次约 50×50 cm，干掉前擦掉残留。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：中性（登记号 EB23-06-0205）。','覆盖旋纹和浅划痕，去除轻微污渍和水斑，带来湿润光泽和防紫外线保护。','官方建议在 Cleaner Wax 或 Scratch & Swirls Remover 之后作为最后一步。'],u:MAFRA+'glazing-wax-polish-lucidante-protettivo/'},

{id:'F-carlux',b:'F',c:'seal',n:'Carlux',t:'硅氧烷保护蜡',f:'—',m:'车漆',
 d:[],
 s:['用前摇匀，取少量在超纤布或 Microfiber Pad 上。','在车身上画直径约 40 cm 的圈，轻压抹开。','逐小块施工到全车，用干净柔软的超纤布擦掉多余。'],
 x:['每次洗车后会「自我激活」，能耐多次洗车；深色车增色明显。'],u:MAFRA+'cera-protettiva-auto-carlux/'},

{id:'F-metalcrem',b:'F',c:'seal',n:'Metal Crem',t:'金属漆增亮蜡乳（无研磨）',f:'250 ml',m:'车漆',
 d:[],
 s:['取适量用布涂在车身上。','抹匀后擦亮。'],
 x:['富含合成蜡，不含研磨剂，不会让塑料件发白。','官方页面未给出详细步骤。'],u:MAFRA+'cera-per-lucidare-carrozzeria-auto-metallizzate-metal-crem/'},

{id:'F-metalcar',b:'F',c:'seal',n:'Metal Car',t:'金属漆喷蜡（水性）',f:'500 ml',m:'车漆',
 d:[['擦拭上蜡','即用','喷雾壶']],
 s:['喷在各部位上。','用布抹开擦亮，形成丝滑手感。'],
 x:['水性配方，车身没完全擦干也能用；不含研磨剂，可用于任何车漆。','不会让塑料件发白。'],u:MAFRA+'cera-spray-lucidante-auto-nere_/'},

{id:'F-lasttouch',b:'F',c:'seal',n:'Last Touch Express 2.0',t:'含巴西棕榈蜡的快速喷蜡（干湿车都可用）',f:'500 ml · 4.5 L',m:'车漆 · 玻璃 · 塑料',
 d:[['干车或湿车','即用','喷雾壶']],
 s:['在约 20 cm 外少量均匀喷在要处理的部位。','用超纤布抹开。','用另一条干布擦干。'],
 x:['可用于玻璃和塑料，不留雾痕。','能防止污垢再次附着，留下丝滑手感。'],u:MAFRA+'cera-istantanea-per-lucidare-carrozzeria-last-touch-express/'},

{id:'F-fast-cleaner',b:'F',c:'seal',n:'Fast Cleaner 3in1',t:'快速美容剂 / 擦干辅助 / 黏土润滑液',f:'500 ml · 4.5 L',m:'车漆',
 d:[['快速清洁','即用','喷雾壶'],['擦干辅助（湿车）','即用','喷雾壶'],['黏土润滑','即用','喷雾壶']],
 s:['快速美容：约 20 cm 外喷在要处理的部位，用超纤布直线擦到完全干，再用第二条干净干布收尾。','擦干辅助：喷在湿车身上，再用 Super Dryer 擦干。','黏土润滑：喷在要除染的部位，过黏土时始终保持表面充分润滑。'],
 x:['去除新鲜鸟粪、虫尸，也能去除洗车后的水斑和水垢。','留下丝滑抗静电的保护层，减少灰尘附着。','不含硅。'],u:MAFRA+'fast-cleaner-500-ml/'},

// ───────────────────────── 轮胎 / 塑料养护 ─────────────────────────
{id:'F-nerissimo',b:'F',c:'trim',n:'Nerissimo',t:'高浓缩轮胎上光剂（可调光泽）',f:'1000 ml',m:'轮胎',
 d:[['湿润光泽','原液','—'],['中等光泽','1:1（50 %）','—']],
 s:['湿润光泽：用海绵把原液涂在轮胎上。','中等光泽：原液加等量水稀释后用海绵涂抹。'],
 x:['不油腻、不黏手，防止轮胎龟裂和老化。'],u:MAFRA+'nerissimo-gomme-auto/'},

{id:'F-nouveaunoir',b:'F',c:'trim',n:'Nouveau Noir（专业装）',t:'轮胎上光剂（专业装，可稀释）',f:'6 kg · 25 kg',m:'轮胎 · 橡胶脚垫',
 d:[['轮胎','原液 – 1:3','—']],
 s:['原液或加 1–3 份水稀释。','用海绵涂抹，让表面均匀。','擦掉多余产品。'],
 x:['不要过量使用。','不油腻、不黏手，也可用于车内橡胶脚垫。','专业用途。'],u:MAFRA+'nouveau-noir/'},

{id:'F-nouveaunoir-spray',b:'F',c:'trim',n:'Nouveau Noir（500 ml 喷雾）',t:'即用型轮胎上光喷雾（零售装）',f:'500 ml',m:'轮胎 · 橡胶',
 d:[['轮胎','即用','喷雾壶']],
 s:['彻底清洁要处理的橡胶或轮胎。','均匀喷在表面上。','用超纤施工块或软毛刷抹匀。'],
 x:['上光成分来自植物、易生物降解，不含磷酸盐。','防止轮胎龟裂并保持胎侧弹性。','需要稀释使用的专业桶装见 Nouveau Noir。'],u:MAFRA+'pulire-e-lucidare-gomme-nouveau-noir/'},

{id:'F-m1',b:'F',c:'trim',n:'Nero Gomme M1（专业装）',t:'高遮盖力轮胎上光剂（专业装）',f:'25 kg',m:'轮胎',
 d:[['轮胎','原液 – 1:4','—']],
 s:['原液或最多加 4 份水稀释。','用海绵或刷子涂抹，让表面均匀。'],
 x:['不要过量使用。','不油腻、不黏手，不会弄脏车身；无磷酸盐和色素。','也用于隧道洗车的自动喷涂系统，不在轮毂上留残留。'],u:MAFRA+'nero-gomme-m1/'},

{id:'F-extremeblack-pro',b:'F',c:'trim',n:'Extreme Black Professional（专业装）',t:'持久湿润效果轮胎上光剂（专业装）',f:'4.5 L · 25 L',m:'轮胎',
 d:[['轮胎','即用','—']],
 s:['彻底洗净并擦干轮胎。','用浸透产品的海绵涂抹。','让它自然干燥。'],
 x:['疏水原料，能维持数周、耐雨淋和洗车；不弄脏轮毂。','适合低扁平比轮胎，不会让轮胎变棕。','专业用途。'],u:MAFRA+'extreme-black-professional/'},

{id:'F-extremeblack',b:'F',c:'trim',n:'Extreme Black',t:'湿润效果轮胎上光喷雾',f:'—',m:'轮胎',
 d:[['光亮','即用（喷一圈）','喷雾壶'],['超光亮','即用（喷两圈）','喷雾壶']],
 s:['直接喷在轮胎上：喷一圈为光亮效果，喷两圈为超光亮效果。','10 分钟后用布擦掉多余。'],
 x:['避免喷到轮毂上；喷到时在干掉前用干布擦掉。','形成抗静电保护层，抵抗潮湿和灰尘。'],u:MAFRA+'nero-gomme-auto-extreme-black/'},

{id:'F-fastblack',b:'F',c:'trim',n:'Fast & Black',t:'抗静电轮胎上光喷雾',f:'200 ml · 500 ml',m:'轮胎 · 橡胶脚垫',
 d:[['轮胎','即用','喷雾壶']],
 s:['均匀喷在轮胎上。','让它自然干燥。'],
 x:['可耐 3 次洗车；不油腻、不黏手，也可用于橡胶脚垫。'],u:MAFRA+'rinnova-nero-gomme-fast-black/'},

{id:'F-black3',b:'F',c:'trim',n:'Black 3 Plus',t:'轮胎翻新软化喷雾',f:'500 ml',m:'轮胎 · 橡胶',
 d:[['轮胎胎侧和胎面','即用','喷雾壶']],
 s:['喷在轮胎上。','用海绵把产品均匀抹遍整个橡胶面。','干透后再开车。'],
 x:['换季收纳轮胎前使用，可防止龟裂；干爽不油腻。'],u:MAFRA+'nero-gomme-auto-black-3-plus/'},

{id:'F-diamant-dressing',b:'F',c:'trim',n:'Diamant Plast Dressing Pro',t:'内外塑料翻新保护剂（巴西棕榈蜡 + 聚合物）',f:'250 ml · 750 ml · 4.5 L · 25 L',m:'内外塑料 · 橡胶 · 乙烯基 · 中控 · 门板 · 外饰条 · 发动机舱塑料',
 d:[['擦拭养护','即用','喷雾壶']],
 s:['在约 20 cm 外少量均匀喷在表面上。','用干净干燥的超纤布擦匀，去除多余。'],
 x:['产品浓缩，不要过量使用。','自流平，光泽均匀，可维持数周；不油腻、防尘，不会让塑料发白。'],u:MAFRA+'diamant-plast-dressing-pro-750ml-rinnova-lucida-protegge-plastiche-auto/'},

{id:'F-faspoiler',b:'F',c:'trim',n:'Faspoiler',t:'外饰塑料 / 橡胶聚合物翻新喷雾',f:'300 ml',m:'保险杠 · 侧裙 · 扰流板 · 敞篷软顶 · FRP 树脂件 · 塑料 · 橡胶',
 d:[['擦拭养护','即用','喷雾壶']],
 s:['喷在保险杠、侧裙、扰流板等部位。','抹匀，形成透明光亮的保护层。'],
 x:['定期使用可防止外露部件褪色、老化；不油腻、不开裂。','官方页面未给出详细步骤。'],u:MAFRA+'prodotti-per-plastiche-auto-faspoiler/'},

// ───────────────────────── 玻璃 ─────────────────────────
{id:'F-glass-plus',b:'F',c:'glass',n:'Glass Cleaner Plus',t:'无氨玻璃去油清洁剂',f:'750 ml',m:'车窗 · 前挡 · 后视镜 · LCD 屏',
 d:[['玻璃清洁','即用','喷雾壶']],
 s:['喷在表面上。','用干净干燥的超纤布擦净。'],
 x:['无氨，快干不留雾痕；可用于导航 LCD 屏。'],u:MAFRA+'glass-cleaner-plus-cleaner-and-degreaser-car-750ml/'},

{id:'F-glass-clean',b:'F',c:'glass',n:'Glass Clean & Shine',t:'无氨泡沫玻璃清洁剂（罐装）',f:'—',m:'玻璃 · LCD 屏 · 贴膜车窗',
 d:[['玻璃清洁','即用','—']],
 s:['摇匀罐体。','在 15–25 cm 外喷在表面上。','用干净干布擦净收尾。'],
 x:['泡沫附着让布更顺滑；无氨，可用于贴了隔热膜的玻璃。'],u:MAFRA+'pulire-e-lucidare-vetri-auto-glass-clean/'},

{id:'F-glass-cleaner',b:'F',c:'glass',n:'Glass Cleaner',t:'活性泡沫车窗去油剂（中性）',f:'125 ml · 500 ml',m:'车窗 · 玻璃',
 d:[['玻璃清洁','即用','喷雾壶']],
 s:['在要清洁的区域喷少量。','用优质超纤布擦净。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：中性（登记号 EB22-01-0996）。','去除油污、指纹和雾痕。'],u:MAFRA+'pulire-e-sgrassare-vetri-auto-glass-cleaner/'},

{id:'F-cristalvetro',b:'F',c:'glass',n:'Cristalvetro（专业装）',t:'浓缩玻璃清洁剂（专业装）',f:'12 L · 25 L',m:'车窗 · 玻璃',
 d:[['玻璃清洁','1:1（50 %）','喷雾壶']],
 s:['原液加等量水稀释。','喷在玻璃上，用超纤布擦净。'],
 x:['去除油烟、尼古丁、油脂和洗车房的蜡；阳光下使用也不留雾痕。'],u:MAFRA+'cristalvetro/'},

{id:'F-cristalbel',b:'F',c:'glass',n:'Cristalbel',t:'浓缩雨刷水（-20 °C 不冻）',f:'250 ml · 1000 ml',m:'前挡',
 d:[['加入雨刷水箱','按瓶身说明稀释','—']],
 s:['按瓶身说明加入雨刷水箱。'],
 x:['四季通用，原液 -20 °C 才结冰。','防止雨刷跳动和异响，并防止喷水管路结垢。'],u:MAFRA+'pulire-vetri-e-parabrezza-auto-cristalbell/'},

{id:'F-notice',b:'F',c:'glass',n:'Not Ice Spray',t:'玻璃 / 门锁除冰喷雾',f:'—',m:'车窗 · 前挡 · 门锁 · 密封条',
 d:[['除冰','即用','—']],
 s:['充分摇匀罐体。','均匀喷在结冰处。','几秒后擦干，再开动雨刷。'],
 x:['可延缓再次结冰，保护门密封条，没有酒精味。'],u:MAFRA+'sghiacciare-il-parabrezza-not-ice-spray/'},

// ───────────────────────── 多功能清洁 ─────────────────────────
{id:'F-allpurpose',b:'F',c:'apc',n:'All Purpose（专业装）',t:'无溶剂浓缩万能清洁剂',f:'25 kg',m:'车身外部 · 发动机 · 底盘',
 d:[['洗车喷涂','1:25 – 1:40','喷雾壶'],['一般清洁（按脏污程度）','最稀 1:80','喷雾壶'],['发动机、底盘（高压喷）','最浓 1:5','喷雾壶']],
 s:['按脏污程度稀释，用手动喷壶喷涂。','停留几秒，不要让它干掉。','用湿布擦掉污垢，或先用水冲一遍再用高压冲洗。'],
 x:['不要用于摩托车或铝件。'],u:MAFRA+'all-purpose-detergente-universale/'},

{id:'F-superapc',b:'F',c:'apc',n:'Super APC',t:'重污工业去油 APC',f:'900 ml',m:'发动机 · 多种表面（不可用于铝和合金）',
 d:[['按污垢和表面','1:4 – 1:19（20 % – 5 %）','喷雾壶']],
 s:['按污垢种类、表面和停留时间稀释到 5 %–20 %。','喷涂后让它分解油污。','用水彻底冲洗。'],
 x:['不要让它干在表面上；不要用于铝和合金。','特殊表面或原液使用前先在不显眼处测试。'],u:MAFRA+'super-apc-detergente-universale-per-sporchi-gravosi/'},

{id:'F-hp12',b:'F',c:'apc',n:'HP 12',t:'即用型万能去油剂（发动机舱）（碱性）',f:'125 ml · 750 ml · 4.5 L',m:'发动机 · 镀铬 · 车身外部 · 轮毂',
 d:[['去油清洁','即用','喷雾壶']],
 s:['喷在要清洁的部位，等几秒。','需要时用布或刷子辅助。','用超纤布擦净，需要时用水冲洗。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：碱性（登记号 EB23-01-0530）。','可清洁发动机各部位的油污，也能去交通膜、油烟；可用于房车内饰和沙发织物污渍。','官方建议用它手洗 Microfiber Pad。'],u:MAFRA+'hp-12/'},

{id:'F-split',b:'F',c:'apc',n:'Split',t:'多表面清洁剂（植物表面活性剂）',f:'750 ml · 4.5 L',m:'玻璃 · 内饰 · 塑料 · 皮革 · 碳纤维 · 金属 · LCD 屏',
 d:[['多表面清洁','即用','喷雾壶']],
 s:['喷在表面上。','用干净干燥的优质超纤布擦到完全无残留。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 EB22-01-0996）。意大利官网写的是中性 pH，韩国标签写弱碱性，两处说法不一致。','免冲洗，不含磷酸盐、氯和氨。'],u:MAFRA+'split-750ml-detergente-multisuperficie/'},

// ───────────────────────── 内饰 ─────────────────────────
{id:'F-pulimax',b:'F',c:'int',n:'Pulimax 2.0（专业装）',t:'超浓缩内饰 APC（无酒精、无溶剂）',f:'1 L · 4.5 L',m:'中控 · 门板 · 塑料 · 人造革（skay）· 织物座椅',
 d:[['内饰清洁（按脏污程度）','1:5 – 1:20','喷雾壶']],
 s:['按脏污程度稀释。','用手动喷壶喷涂，等几秒。','用湿布擦掉污垢。'],
 x:['座椅磨损时先在不显眼处测试。','新旧材质都安全，无残留。'],u:MAFRA+'pulimax-2-0-pulitore-interni-auto/'},

{id:'F-pulimax-spray',b:'F',c:'int',n:'Pulimax（500 ml 喷雾）',t:'即用型内饰清洁喷雾（零售装）（弱碱性）',f:'500 ml',m:'织物座椅 · 人造革（skay）· 内饰塑料',
 d:[['内饰清洁','即用','喷雾壶']],
 s:['直接喷在要清洁的部位。','停留几分钟，不要让它干在表面上。','用布有规律地擦拭。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 EB24-01-0285，韩国标示的产品名为 Pulimax 2.0 500 ml）。','溶解织物纤维里的污垢和尼古丁，并去除异味。','需要稀释使用的专业浓缩装见 Pulimax 2.0。'],u:MAFRA+'puliziia-e-igienizzazione-auto-pulimax/'},

{id:'F-pulimax-ewo',b:'F',c:'int',n:'Pulimax Ewo（专业装）',t:'内饰多用途清洁剂（无 VOC，配气动清洁枪）',f:'4.5 kg · 25 kg',m:'中控 · 座椅 · 脚垫 · 门槛',
 d:[['手工清洁','原液 – 1:5','喷雾壶'],['Rotorjet / Tornador 气动清洁枪','1:3 – 1:5','—']],
 s:['按方式稀释。','用清洁枪或手工清洁。','用压缩空气吹干，再用超纤布收尾。'],
 x:['不含 VOC，可长时间在封闭空间使用；不在玻璃上留难以去除的残留。'],u:MAFRA+'pulimax-ewo/'},

{id:'F-deterjet',b:'F',c:'int',n:'Deterjet',t:'内饰通用清洁剂（车顶篷专用）',f:'500 ml',m:'车顶内衬 · 座椅 · 地毯 · 脚垫',
 d:[['内饰清洁','即用','喷雾壶']],
 s:['喷在污渍上。','用布擦净；官方推荐配合 Martina 麂皮布，可同时吸走松动的污垢和表面活性剂残留。'],
 x:['去除饮料、冰淇淋和油污，以及宠物和烟味。'],u:MAFRA+'pulire-vetri-interni-auto-deterjet/'},

{id:'F-3in1-plast',b:'F',c:'int',n:'Trattamento 3in1 Plastiche',t:'塑料清洁 + 养护 + 防紫外线（含蜂蜡）（弱碱性）',f:'500 ml',m:'中控 · 内饰塑料 · 密封条 · 保险杠',
 d:[['清洁养护','即用','喷雾壶']],
 s:['喷在塑料表面。','用超纤布擦拭清洁并抹匀。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：弱碱性（登记号 EB22-01-0707）。','留下抗静电、防紫外线保护层，并消除异味。'],u:MAFRA+'pulizia-interni-e-plastiche-auto-3-in-1/'},

{id:'F-plast-shine',b:'F',c:'int',n:'Diamant Plast Shine',t:'亮光中控上光喷雾（含 UV 滤剂）',f:'500 ml',m:'中控 · 内饰塑料',
 d:[['上光','即用','—']],
 s:['喷在中控和内饰塑料上。','用超纤布抹匀擦亮。'],
 x:['让被晒褪色的塑料恢复颜色；不油腻。'],u:MAFRA+'lucida-cruscootti-effetti-brillante-diamant-shine/'},

{id:'F-plast-satin',b:'F',c:'int',n:'Diamant Plast Satin',t:'缎面（哑光）中控养护喷雾',f:'500 ml',m:'中控 · 内饰塑料',
 d:[['养护','即用','—']],
 s:['喷在中控和内饰塑料上。','用超纤布抹匀，表面光滑不反光。'],
 x:['不含硅，抗静电。'],u:MAFRA+'lucida-cruscotti-effetto-opaco-diamant-satin/'},

{id:'F-scic-blu',b:'F',c:'int',n:'Scic Blu',t:'中等光泽中控养护喷雾',f:'600 ml',m:'中控 · 内饰塑料',
 d:[['养护','即用','—']],
 s:['在 20–25 cm 外少量均匀喷在要处理的部位。','用干净干燥的超纤布抹匀到整个表面。','再用第二条干净超纤布收尾。'],
 x:['不油腻，不会在前挡上反光。'],u:MAFRA+'ravvivante-plastiche-e-cruscotti-auto-scic-blu/'},

{id:'F-3in1-tessuti',b:'F',c:'int',n:'Trattamento Tessuti 3in1',t:'织物 / Alcantara® 活性泡沫清洁剂',f:'500 ml',m:'织物座椅 · Alcantara · 地毯 · 脚垫',
 d:[['织物清洁','即用','喷雾壶']],
 s:['在约 20 cm 外少量均匀喷在整个表面上。','用干净超纤布或软毛刷把泡沫抹匀。','去除多余，用第二条干净超纤布擦干。'],
 x:['不会把织物弄得太湿。'],u:MAFRA+'pulire-sedili-auto-3-in-1-tessuti/'},

{id:'F-flash',b:'F',c:'int',n:'Flash',t:'织物干洗泡沫（附刷子）',f:'400 ml',m:'织物座椅 · 丝绒 · Alcantara · 脚垫',
 d:[['织物干洗','即用','—']],
 s:['喷在污渍上。','用附带的刷子刷洗。','擦掉或吸走残留。'],
 x:['不弄湿织物，同时中和动物、食物和烟味。'],u:MAFRA+'lavaggio-tappezzeria-auto-flash-pulitore-interni-tessuto/'},

{id:'F-flash-liquido',b:'F',c:'int',n:'Flash Liquido（专业装）',t:'织物 / 丝绒 / Alcantara 清洁剂（抽洗机用）',f:'—',m:'织物 · 丝绒 · Alcantara',
 d:[['内饰抽洗机','1:5 – 1:10','—']],
 s:['按脏污程度稀释，倒进内饰清洗机的水箱。','用附带的刷头喷出并轻刷织物。','用清洗机吸走；需要时重复。'],
 x:['通过 Alcantara 实验室测试。','专业用途。'],u:MAFRA+'flash-liquido/'},

{id:'F-textile',b:'F',c:'int',n:'Textile Evo（专业装）',t:'低泡浓缩织物清洁剂（抽洗机 / 手工）',f:'—',m:'织物 · 丝绒 · Alcantara · 地毯',
 d:[['织物清洁','1:10 – 1:20','—']],
 s:['加水稀释 1:10–1:20，非常脏时提高浓度。','用抽洗机或手工清洁。'],
 x:['专业用途。'],u:MAFRA+'textile-evo-detergente-lavatessuti-velluti-alcantara/'},

{id:'F-3in1-pelle',b:'F',c:'int',n:'Trattamento 3in1 Pelle',t:'皮革清洁 + 滋养 + 保护（芦荟 + 天然蜡）（中性）',f:'500 ml',m:'皮革座椅',
 d:[['皮革日常养护','即用','—']],
 s:['用在皮革座椅和内饰皮件上，清洁后擦匀。'],
 x:['酸碱性来自韩国官方商城 maframall.com 的安全标示（액성）：中性（登记号 EB22-01-0892）。','适合定期使用，防止皱褶和开裂。','官方页面未给出详细步骤。'],u:MAFRA+'pulire-sedili-auto-3-in-1-pelle/'},

{id:'F-charming',b:'F',c:'int',n:'Charme Detergent',t:'中性皮革清洁泡沫',f:'150 ml',m:'皮革',
 d:[['皮革清洁','即用','—']],
 s:['直接涂在要处理的部位，抹匀覆盖整个表面。','在泡沫变成液体前打圈按摩，把污垢带出表面。','用柔软的湿布轻压擦掉多余泡沫和污垢。'],
 x:['新皮的日常保养和深度清洁都适用。'],u:MAFRA+'puulire-sedili-in-pelle-detergent/'},

{id:'F-nutrient',b:'F',c:'int',n:'Charme Nutrient',t:'皮革滋养霜',f:'—',m:'皮革',
 d:[],
 s:['先用 Charme 清洁泡沫清洁、去油。','小幅度打圈、朝同一方向轻轻涂抹滋养霜。','让它吸收 20 分钟，再用柔软干布擦掉多余；需要时重复。'],
 x:['敞篷车夏季应加强护理。','被晒老化的皮革，可以涂后放置过夜，缝线处多涂一些。'],u:MAFRA+'pulire-sedili-in-pelle-nutrient/'},

{id:'F-hydrating',b:'F',c:'int',n:'Charme Hydrating',t:'皮革保湿乳',f:'—',m:'皮革',
 d:[['皮革保湿','即用','—']],
 s:['均匀喷在表面上并抹开。','让它渗透几分钟。','用柔软的湿布擦掉多余。'],
 x:['每年做 3–4 次；敞篷车夏季应加强护理。'],u:MAFRA+'pelle-auto-rinnovo-dp/'},

{id:'F-odorbact',b:'F',c:'int',n:'Odorbact Out PMC',t:'空调系统 / 车厢消毒除味（一次性喷罐）',f:'—',m:'车厢 · 空调系统',
 d:[['空调循环消毒','整罐一次用完','—']],
 s:['先清洁或更换空调滤芯；摇匀罐体，打开车内的储物格、手套箱。','关紧车窗、打开出风口，启动发动机，开内循环并把风量开到最大。','把罐体竖放在副驾驶脚垫上（不要直喷中控），按下阀门锁定，下车关门。','等罐体喷完后再作用 15 分钟，然后打开车门通风再用车。'],
 x:['施工时不要吸烟，拔掉点烟器和其他电器。','意大利卫生部登记的 PMC 消毒产品，冷风暖风效果相同。'],u:MAFRA+'odorbact-out-pmc-sanificazione-igienizzazione-interni-abitacolo-climatizzatore-auto/'},

// ───────────────────────── 配件 ─────────────────────────
{id:'F-guanto',b:'F',c:'acc',n:'Guanto Double Face',t:'双面超纤洗车手套（30×20 cm）',f:'1 只',m:'—',d:[],
 s:['先用水冲车，把手套在清水桶里洗过。','浸入香波桶，用平稳的直线动作清洗：短毛面洗车身上部和玻璃，雪尼尔面洗下部、轮拱和缝隙。','经常在清水桶里清洗手套。'],
 x:['雪尼尔面在清水桶里会把污垢排出。'],u:MAFRA+'double-face-guanto-lavaggio-microfibra/'},

{id:'F-allseasons',b:'F',c:'acc',n:'All Seasons',t:'防水内衬微羊毛洗车手套',f:'1 只',m:'—',d:[],
 s:['用双桶法：先在清水桶、再在香波桶里浸透手套。','先在要洗的区域淋一点香波水，再把手套放上去。','由上往下、直线慢慢擦，不加压；逐小块进行，经常先在清水桶、再在香波桶里浸洗手套。'],
 x:['防水内衬不会弄湿手，低温下也舒适。'],u:MAFRA+'all-seasons-guanto-in-lana/'},

{id:'F-comfortpad',b:'F',c:'acc',n:'Comfort Car Wash Pad',t:'双面超纤洗车块',f:'1 块',m:'—',d:[],
 s:['用双桶法，先在清水桶、再在香波桶里浸透洗车块。','长毛雪尼尔面做初洗、处理顽固污垢；短毛面做一般清洁和收尾。','由上往下直线擦，不加压；经常在清水桶里清洗。'],x:[],u:MAFRA+'comfort-pad-microfibra/'},

{id:'F-booster',b:'F',c:'acc',n:'Spugna Booster',t:'六角蜂窝结构洗车海绵',f:'1 块',m:'—',d:[],s:[],
 x:['三维结构，提升产品效果、不划伤表面。'],u:MAFRA+'spugna-booster/'},

{id:'F-mfpad',b:'F',c:'acc',n:'Microfiber Pad',t:'超纤施工块（蜡 / 封体 / 抛光剂）',f:'1 块',m:'—',d:[],s:[],
 x:['背面有手插袋，施工更快更稳。','可用 HP 12 手洗或机洗；不要用漂白剂和柔顺剂。'],u:MAFRA+'microfiber-pad-applicator-microfibra/'},

{id:'F-foampad',b:'F',c:'acc',n:'Foam Pad',t:'细孔海绵施工块（2 只装）',f:'2 只',m:'—',d:[],s:[],
 x:['用于在橡胶、塑料、乙烯基和皮革上涂抹养护剂、蜡和封体；可水洗重复使用。'],u:MAFRA+'accessori-panni-foam-pad/'},

{id:'F-superdryer',b:'F',c:'acc',n:'Super Dryer',t:'超吸水擦干毛巾（大号）',f:'1 条',m:'—',d:[],
 s:['用无毛的一面擦密封条。','短毛面贴着车身铺开，轻轻拖动吸干。'],
 x:['可吸收自身重量 3.5 倍的水。'],u:MAFRA+'super-dryer-panno-ultra-assorbente-detailing/'},

{id:'F-extradry',b:'F',c:'acc',n:'Extra Dry',t:'超吸水合成擦干布',f:'1 条',m:'—',d:[],s:[],
 x:['耐磨，多次清洗后仍能快速擦干、不留水痕。'],u:MAFRA+'panno-microfibra-per-lavaggio-auto-extra-dry/'},

{id:'F-martina',b:'F',c:'acc',n:'Martina',t:'超吸水合成麂皮布',f:'1 条',m:'—',d:[],s:[],
 x:['擦干车身和玻璃不留水痕；也可配合 Deterjet 清洁车顶篷。','使用前后都要清洗，不要用滚烫的强水流冲。'],u:MAFRA+'panno-in-pelle-per-lavaggio-auto-martina/'},

{id:'F-heavywork',b:'F',c:'acc',n:'Heavy Work',t:'耐用超纤布（60×40 cm，6 条装）',f:'6 条',m:'—',d:[],s:[],
 x:['可用于擦干和内饰清洁。'],u:MAFRA+'panno-microfibra-auto-heavy-work/'},

{id:'F-topbuffing',b:'F',c:'acc',n:'Top Buffing',t:'无边超柔擦蜡布（60×40 cm，530 g/m²）',f:'1 条',m:'—',d:[],s:[],
 x:['激光切边，适合极软的车漆；安全擦除蜡残留，两面都超柔。'],u:MAFRA+'top-buffing-panno-microfibra-super-soft/'},

{id:'F-panno-df',b:'F',c:'acc',n:'Panno Double Face',t:'双层无边超纤布（40×40 cm，3 条装）',f:'3 条',m:'—',d:[],s:[],
 x:['短毛面用于清洁、施工和擦除封体 / 蜡，长毛面用于擦亮；也可用于内饰。'],u:MAFRA+'double-face-panno-microfibra-doppio-strato/'},

{id:'F-1shine-vetri',b:'F',c:'acc',n:'1Shine Vetri',t:'玻璃专用超纤布',f:'1 条',m:'—',d:[],s:[],
 x:['去除顽固污垢、不留雾痕。'],u:MAFRA+'panni-microfibra-vetri-auto/'},

{id:'F-pad-white',b:'F',c:'acc',n:'White Pad 2.0',t:'硬质白色研磨海绵盘（145 mm）',f:'Ø145 mm × 20 mm',m:'—',d:[],s:[],
 x:['切削力强，用于 Step 1 Corréctor 研磨；斜边设计、小魔术贴，可水洗。'],u:MAFRA+'white-pad-tampone-bianco-duro/'},

{id:'F-pad-blu',b:'F',c:'acc',n:'Blu Pad 2.0',t:'中硬蓝色研磨海绵盘（145 mm）',f:'Ø145 mm × 20 mm',m:'—',d:[],s:[],
 x:['用于 Step 1 Corréctor 研磨；斜边设计、小魔术贴，可水洗。'],u:MAFRA+'blu-pad-tampone-blu-medio-duro/'},

{id:'F-pad-yellow',b:'F',c:'acc',n:'Yellow Pad 2.0',t:'中软黄色抛光海绵盘（145 mm）',f:'Ø145 mm × 20 mm',m:'—',d:[],s:[],
 x:['用于 Step 1 Corréctor，也可接着做 Step 2 Illúmina；可水洗。'],u:MAFRA+'yellow-pad-tampone-medio-morbido/'},

{id:'F-pad-black',b:'F',c:'acc',n:'Black Pad L 2.0',t:'超软黑色收光海绵盘（145 mm）',f:'Ø145 mm × 25 mm · 5 片',m:'—',d:[],s:[],
 x:['用于 Step 2 Illúmina 收光；可水洗。'],u:MAFRA+'tampone-per-polish-auto-morbido/'},

{id:'F-microwool',b:'F',c:'acc',n:'Polish Pad Microwool',t:'硬海绵 + 微羊毛复合研磨盘（双动机）',f:'Ø145 mm × 20 mm',m:'—',d:[],s:[],
 x:['切削力强，推荐配 Corréctor；可水洗。'],u:MAFRA+'polish-pad-microwool/'},

{id:'F-hybrid',b:'F',c:'acc',n:'Hybrid Fiber Pad L',t:'硬海绵 + 超纤复合抛光盘（双动机）',f:'Ø145 mm × 20 mm',m:'—',d:[],s:[],
 x:['可配 Corréctor 或 Labocosmetica AUDACE、LEALE 使用；可水洗。'],u:MAFRA+'hybrid-fiber-pad-tampone-in-microfibra/'},

{id:'F-eskimo-white',b:'F',c:'acc',n:'Eskimo White',t:'白色羊毛研磨盘（150 mm，旋转机）',f:'Ø150 mm',m:'—',d:[],s:[],
 x:['研磨阶段切削更好，转动平稳。'],u:MAFRA+'tampone-lana-bianco/'},

{id:'F-eskimo-gold',b:'F',c:'acc',n:'Eskimo Gold',t:'黄色羊毛研磨盘（旋转机）',f:'—',m:'—',d:[],s:[],
 x:['切削力和速度更高，散热更好，纤维不易打结、容易清洁。'],u:MAFRA+'eskimo-gold-tampone-in-lana-gialla-pad-auto/'},

{id:'F-secchio-wash',b:'F',c:'acc',n:'Secchio Wash',t:'21 L 洗车桶',f:'21 L',m:'—',d:[],
 s:['按香波瓶身比例加入香波，用高压水冲出泡沫。','配一个装了 Grit Safe 隔砂网的 Secchio Rinse 清水桶，用于洗手套。'],
 x:['耐酸碱、耐冲击。'],u:MAFRA+'secchio-wash/'},

{id:'F-gritsafe',b:'F',c:'acc',n:'Grit Safe',t:'洗车桶隔砂网（Ø26 cm）',f:'Ø26 cm',m:'—',d:[],s:[],
 x:['装在 Secchio Rinse 清水桶底，洗手套时把砂砾隔在网下，减少旋纹和划痕。'],u:MAFRA+'grit-safe/'},

{id:'F-nebula',b:'F',c:'acc',n:'Nebula Foam 2.0',t:'手动 / 充气两用泡沫喷壶（2 L）',f:'2 L（可用 1.25 L）',m:'—',d:[],
 s:['先在 MAFRA 刻度瓶里稀释产品，装入壶内最多 1.25 L，旋紧壶头。','手动打气到阀门咔嗒响，或用轮胎气嘴接压缩机充气（最高 3 bar）。','解除扳机锁后喷涂；用完重新上锁，用安全阀泄压。'],
 x:['三个喷嘴：绿色干泡沫、灰色中等（标配）、橙色湿泡沫覆盖面更大。','没有高压清洗机和 PA 壶时也能做泡沫预洗。'],u:MAFRA+'nebula-foam-2-0-nebulizzatore-schiumogeno-bi-uso-accessori-lavaggio-auto/'},

{id:'F-mfwash',b:'F',c:'acc',n:'Microfiber Wash',t:'超纤布专用洗涤剂',f:'—',m:'—',
 d:[['洗衣机 / 手洗','每 kg 布约 15 ml','—']],
 s:['每 kg 超纤布加约 15 ml。','30 °C 洗涤，不要加柔顺剂。'],
 x:['去除抛光剂、研磨剂和蜡残留；不含柔顺剂和阳离子表面活性剂。'],u:MAFRA+'microfibra-wash/'},
];

export const flows: Flow[] = [
{id:'f-f-wash',b:'F',name:'双桶手工洗车',en:'MAFRA Two-Bucket Hand Wash',sc:'daily',tags:['轮毂'],
 sum:'按 MAFRA 洗车桶、手套和毛巾产品页给出的做法：轮毂轮胎 → 泡沫预洗 → 双桶手洗 → 冲洗 → Fast Cleaner 辅助擦干 → 轮胎上光。',
 steps:[
  {ph:'轮毂轮胎',p:['F-cerchi-gomme'],r:'即用',how:'先喷轮胎，再抬高喷头喷轮毂，用刷子带进缝隙，停留约 1 分钟后用强水流冲洗。'},
  {ph:'泡沫预洗',p:['F-valido','F-iglu','F-idrowash'],alt:true,o:['Nebula Foam 2.0 或 PA 壶'],r:'Valido 泡沫枪 1:3 · Iglù 1:4 · Idrowash 1:1',how:'由下往上喷满车身，停留不要干掉，用高压水冲洗。没有 PA 壶时可用 Nebula Foam 2.0。'},
  {ph:'双桶手洗',p:['F-shampoo-power','F-guanto','F-secchio-wash','F-gritsafe'],r:'1 瓶盖 / 1 L 水',how:'Secchio Wash 装香波水，Secchio Rinse 装清水并放 Grit Safe。手套浸透香波水，由上往下轻压直线清洗，经常在清水桶的隔砂网上搓洗手套。'},
  {ph:'冲洗',how:'用清水彻底冲洗全车。'},
  {ph:'擦干',p:['F-fast-cleaner','F-superdryer'],r:'即用',how:'在湿车身上喷 Fast Cleaner，再用 Super Dryer 短毛面平铺轻拉吸干，毛巾更顺滑、不留水痕。'},
  {ph:'轮胎上光',p:['F-nerissimo','F-fastblack'],alt:true,r:'Nerissimo 原液或 1:1',how:'Nerissimo 用海绵涂：原液为湿润光泽，1:1 为中等光泽；或直接喷 Fast & Black 后自然干燥。'},
 ],
 x:['官方提醒：车身约 90 % 的划痕来自错误的洗车手法和配件。','不要在阳光直射下或热的车身上洗车。'],
 u:MAFRA+'secchio-wash/'},

{id:'f-f-deco',b:'F',name:'漆面除染（Regénera）',en:'MAFRA Kit Regénera Carrozzeria',sc:'tfr',tags:['抛光前'],
 sum:'按 Kit Regénera 和 Clay Bar 产品页：洗车 → Fallout 化学除铁 → Fast Cleaner 润滑过黏土 → 擦净 → Polish Express 封闭洗车 → Super Dryer 擦干。',
 steps:[
  {ph:'洗车并擦干',p:['F-shampoo-power'],r:'1 瓶盖 / 1 L 水',how:'正常洗车，去除表面松散污垢，擦干。'},
  {ph:'化学除铁',p:['F-fallout','F-iron-sniper'],alt:true,r:'Fallout 即用 · Iron Sniper 原液 – 1:1',how:'逐块、每次半辆车喷涂，停留 2–4 分钟变紫后冲洗；不要让它干掉，不要接触铸铁卡钳。'},
  {ph:'黏土',p:['F-clay-soft','F-clay-medium','F-fast-cleaner'],how:'在阴凉处、车身冷却时，用 Fast Cleaner 持续润滑，泥块纵横轻滑到表面不再粗糙。深色车用 Clay Soft，浅色、污染重的车用 Clay Medium Soft。'},
  {ph:'擦净',p:['F-fast-cleaner','F-heavywork'],how:'喷 Fast Cleaner，用 Heavy Work 超纤布擦掉黏土残留。'},
  {ph:'封闭洗车',p:['F-polish-express'],r:'按瓶身刻度',how:'用 Polish Express 像香波一样再洗一遍，同时上光保护。'},
  {ph:'擦干',p:['F-superdryer'],how:'用 Super Dryer 擦干。'},
 ],
 x:['薄塑料袋测试：洗车后隔着塑料袋轻摸车漆，粗糙就需要除染；除染后会顺滑无声。','车身和轮毂等「较硬」部位用不同的泥块。'],
 u:MAFRA+'kit-regenera-carrozzeria-trattamento-decontaminante/'},

{id:'f-f-polish',b:'F',name:'机器抛光两步（Corréctor → Illúmina）',en:'MAFRA Professional Polishing',sc:'tfr',tags:['抛光'],
 sum:'按 MAFRA 抛光剂和抛光盘产品页的搭配：Sherlock 检查 → Step 1 Corréctor 3.0 研磨 → Step 2 Illúmina 2.0 收光 → Spléndida 2.0 增亮收尾。',
 steps:[
  {ph:'检查漆面',p:['F-sherlock'],how:'倒在超纤布上擦过车身，去掉油分后检查漆面瑕疵。'},
  {ph:'Step 1 研磨',vars:[
    {n:'双动机',p:['F-corrector','F-pad-white','F-pad-blu','F-microwool'],how:'1–2 档在 40×40 cm 区域抹匀，升到最高档抛到研磨剂耗尽。硬漆用 White Pad，一般用 Blu Pad，需要更强切削用 Microwool。'},
    {n:'旋转机',p:['F-corrector','F-eskimo-white','F-eskimo-gold'],how:'羊毛盘：先 600–900 rpm，逐步升到 1500–1800 rpm，最后轻压 600–900 rpm 收尾。'},
  ]},
  {ph:'Step 2 收光',p:['F-illumina','F-pad-yellow','F-pad-black'],how:'同样的转速 / 档位，用 Yellow Pad 或超软 Black Pad，去除研磨留下的光环；用超纤布擦掉多余。'},
  {ph:'增亮收尾',p:['F-splendida','F-topbuffing'],how:'用 1–2 档抛光机或手工交叉涂一层（每块钣金两小滴），用 Top Buffing 擦掉。'},
 ],
 x:['每次在盘上只加少量研磨剂。','Corréctor 和 Illúmina 都可用于 PPF。'],
 u:MAFRA+'polish-corrector-3-0-1000-gr/'},

{id:'f-f-hand-polish',b:'F',name:'手工 / 双动机轻度翻新',en:'MAFRA Scratch & Swirls → Cleaner Wax → Glazing Wax',sc:'tfr',tags:['抛光'],
 sum:'按 MAFRA Car Detailing 系列产品页：黏土除染 → Scratch & Swirls Remover 去划痕 → Cleaner Wax 清洁上蜡 → Glazing Wax 收尾。',
 steps:[
  {ph:'除染',p:['F-clay-soft','F-clay-medium','F-fast-cleaner'],how:'官方建议施工前先用黏土除染。'},
  {ph:'去划痕（需要时）',p:['F-scratch'],how:'手工每次 30×30 cm 打圈；双动机每次约 50×50 cm，中等压力重叠走位，干掉前擦掉残留。'},
  {ph:'清洁上蜡',p:['F-cleanerwax','F-mfpad'],how:'去除发乌、氧化和轻微擦漆印；手工轻打圈，或双动机配细抛盘。'},
  {ph:'Glaze 收尾',p:['F-glazing','F-topbuffing'],how:'作为最后一步，手工打圈或双动机配软盘，干掉前用干净超纤布擦掉。'},
 ],
 x:['表面须干净、不热、在阴凉处，用前摇匀。'],
 u:MAFRA+'glazing-wax-polish-lucidante-protettivo/'},

{id:'f-f-wheel',b:'F',name:'轮毂深度除铁',en:'MAFRA Rim & Tyre Cleaner + Fallout Iron Remover',sc:'wheel',tags:[],
 sum:'Fallout 产品页的做法：轮毂很脏时先用 Pulitore Cerchi e Gomme 清洁、冲净擦干，再用 Fallout 除铁，最后给轮胎上光。约每 3000 km 做一次。',
 steps:[
  {ph:'轮毂轮胎清洁',p:['F-cerchi-gomme','F-splendorlega'],alt:true,r:'即用',how:'喷涂后用刷子刷到缝隙，停留约 1 分钟，用强水流冲洗，擦干。'},
  {ph:'除铁',p:['F-fallout','F-regenera-rims'],alt:true,r:'即用',how:'喷在轮毂上停留 3–4 分钟，不要干掉；变紫后用轮毂刷刷辐条和缝隙，大量清水冲洗，超纤布擦干。'},
  {ph:'轮胎上光',p:['F-nerissimo','F-extremeblack','F-black3'],alt:true,how:'轮胎干透后涂抹或喷涂，擦掉多余，干透再开车。'},
 ],
 x:['不要用于发热的轮毂；不要让除铁剂接触铸铁刹车卡钳。','Fallout 不可用于阳极氧化铝轮毂。'],
 u:MAFRA+'fallout-iron-remover-1l-decontaminante-rapido-cerchi-e-carrozzeria/'},

{id:'f-f-int',b:'F',name:'内饰清洁与皮革护理',en:'MAFRA Interior · Pulimax + Charme',sc:'int',tags:[],
 sum:'按内饰产品页：Pulimax 2.0 清洁硬表面 → 织物用 3in1 Tessuti 或抽洗机 → 皮革先 Charme 清洁泡沫、再 Nutrient 滋养 → 塑料养护。',
 steps:[
  {ph:'硬表面清洁',p:['F-pulimax','F-pulimax-spray'],alt:true,r:'浓缩装 1:5 – 1:20 · 喷雾装即用',how:'喷涂后等几秒（喷雾装可停留几分钟，不要让它干掉），用湿布擦掉污垢；座椅磨损时先测试。'},
  {ph:'织物',p:['F-3in1-tessuti','F-textile'],alt:true,r:'3in1 即用 · Textile Evo 1:10 – 1:20',how:'3in1 Tessuti 喷涂后用软毛刷抹匀泡沫、擦干；大面积用 Textile Evo 配抽洗机。'},
  {ph:'皮革清洁',p:['F-charming'],r:'即用',how:'涂开后在泡沫变液体前打圈按摩，用柔软湿布擦掉。'},
  {ph:'皮革滋养',p:['F-nutrient','F-hydrating'],alt:true,how:'Nutrient 同方向小圈涂抹，吸收 20 分钟后擦掉多余；或喷 Hydrating 渗透几分钟后擦掉。'},
  {ph:'塑料养护',p:['F-scic-blu','F-plast-satin','F-diamant-dressing'],alt:true,r:'即用',how:'少量喷涂，用超纤布抹匀，再用第二条干净布收尾。'},
 ],
 x:['敞篷车夏季加强皮革护理。'],
 u:MAFRA+'pulire-sedili-in-pelle-nutrient/'},

{id:'f-f-waterless',b:'F',name:'无水洗车',en:'MAFRA Waterless',sc:'nowater',tags:[],
 sum:'Waterless 产品页的做法：一次一块板喷涂 → 折四折的超纤布单向擦 → 干净布收尾；最后可用 Last Touch Express 上光。',
 steps:[
  {ph:'喷涂',p:['F-waterless','F-ecodry'],alt:true,r:'即用',how:'一次一块板，均匀喷涂，让产品软化污垢。'},
  {ph:'擦拭',p:['F-heavywork'],how:'超纤布折成四折，直线单向擦，逐步抬起布面，每次换干净的一面。'},
  {ph:'收尾',p:['F-topbuffing'],how:'用新的干净干燥超纤布擦净。'},
  {ph:'上光（可选）',p:['F-lasttouch'],r:'即用',how:'少量喷涂，用超纤布抹开，再用干布擦干。'},
 ],
 x:['准备 6–10 条超纤布。','有厚泥沙时先正常洗车。'],
 u:MAFRA+'waterless-750ml-lavaggio-a-secco-auto/'},
];

export const combos: Combo[] = [
{id:'c-f-wax',b:'F',name:'洗后快速上蜡',sc:'daily',tags:['保护'],base:'f-f-wash',at:'替换第 5 步「擦干」',
 sum:'擦干时把 Fast Cleaner 换成 Last Touch Express 2.0（干湿车都能用）或 Metal Car，洗完车顺手留下一层蜡；想要更持久的用 Carlux。',
 steps:[
  {ph:'擦干并上蜡',p:['F-lasttouch','F-metalcar'],alt:true,r:'即用',how:'在约 20 cm 外少量喷涂，用超纤布抹开，再用 Super Dryer 或另一条干布擦干。'},
  {ph:'持久保护（可选）',p:['F-carlux','F-mfpad'],how:'车身干燥后，用 Microfiber Pad 以直径约 40 cm 的圈轻压抹开，逐块施工后擦掉多余。'},
 ],
 x:['不要在阳光直射下施工。'],
 u:MAFRA+'cera-istantanea-per-lucidare-carrozzeria-last-touch-express/'},
];
