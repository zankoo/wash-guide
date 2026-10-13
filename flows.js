// 官方洗车流程（FLOWS）与基于官方流程的产品组合（COMBOS）
// 来源：labocosmetica.com/3ph-labocosmetica/（3pH® 页面）、LIBERA / RENOVA / IDROSAVE / PRELUDIO / GLICO / REVÌTAX 等产品页；
//       maniacline.com 官方宣传册 mappa_fasi_lavaggio.pdf（洗车步骤图）及各产品页。2026-10 整理翻译。
// 每个流程 sc = 唯一主场景（用于筛选），tags = 次要场景（仅显示）
// 步骤字段：ph 阶段名；p 产品 id（可点击）；alt = p 中任选其一；o 本页未收录的工具/产品；r 比例；pH 'alk'|'neu'|'acid'；how 做法
//          vars = 可切换的变体 [{n 名称, p, r, pH, how, src}]；流程级 branch = {n, steps} 追加分支

const SCENES = [
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

const FLOWS = [
// ───────────── Labocosmetica 官方循环 ─────────────
{id:'f-3ph-wash',b:'L',name:'3pH® 维护 / 保护洗车',en:'3pH Combined Wash Cycle',sc:'daily',tags:['保护 / 镀膜车','水垢 / 水斑'],
 sum:'官方核心洗车流程。碱性去有机污垢，酸性去无机污垢，中性配合手洗去静态污垢，三种 pH 依次作用，去污彻底又不伤已施工的蜡、封体或镀膜。',
 steps:[
  {ph:'碱性预洗',pH:'alk',p:['L-primus'],r:'冬季 1:30 · 夏季 1:50',how:'以预洗模式施用，冬季污垢多用 1:30，夏季用 1:50。门板下部、后备箱下沿和车头飞虫等重污区域，先用 1:5 或 1:10 局部预处理。'},
  {ph:'酸性除染',pH:'acid',p:['L-purifica'],r:'1:60（泡沫）· 局部 1:10',how:'预洗后，用泡沫方式施用 1:60 的 PURÌFICA，由下往上。冬季盐分、水渍集中的门板下部和后备箱下沿可用 1:10 局部预处理。也可在水桶中按 1:60 作为香波使用。'},
  {ph:'中性手洗',vars:[
    {n:'SÈMPER 手洗',pH:'neu',p:['L-semper'],r:'1:1000',how:'机械清洗阶段用 SÈMPER 1:1000 手洗，中性 pH 不会影响前一步 PURÌFICA 的除染效果。不含蜡和增亮剂，也可用于玻璃。'},
    {n:'REVÌTAX 保护收尾',pH:'neu',p:['L-revitax'],r:'1:100',how:'需要保护时以 REVÌTAX 1:100 收尾：可泡沫喷涂、Nebula 泵壶或水桶施用，再用手套或海绵推开。推开时用软海绵附着最快；夏季高温附着太快，改用超纤手套更安全。'},
  ]},
 ],
 x:['REVÌTAX 在未做保护的车上可提供至少 3 个月、相当于纳米封体的光泽和保护。','本流程的比例取自 3pH® 官方页面，与单品页（如 PRÌMUS PA壶 1:5–1:10）数值不同，因为施用方式和设备不同。'],
 u:'https://www.labocosmetica.com/3ph-labocosmetica/'},

{id:'f-3ph-rim',b:'L',name:'3pH® 轮毂清洗',en:'3pH Rim Wash',sc:'wheel',tags:[],
 sum:'先碱性去刹车油污、烟尘等有机污垢，再酸性去水垢和酸雨残留，并焕新轮毂上的蜡或封体。',
 steps:[
  {ph:'碱性',pH:'alk',p:['L-primus'],r:'1:5',how:'泡沫或喷雾施用，由下往上均匀覆盖。顺带清洁轮胎肩部和轮拱上沿，这两处常被漏掉。'},
  {ph:'酸性',pH:'acid',p:['L-purifica'],r:'1:10（泡沫）',how:'泡沫方式施用，附着时间更长；配合软毛刷刷洗，让化学和机械作用一步完成。'},
 ],
 x:['轮毂装在车上清洗时，用专用刷子才能清洁到所有部位。','铁粉明显时，可另用 SIDERO（原液至 1:4）除铁。'],
 u:'https://www.labocosmetica.com/3ph-labocosmetica/'},

{id:'f-3ph-engine',b:'L',name:'3pH® 发动机舱清洗',en:'3pH Engine Wash',sc:'engine',tags:[],
 sum:'先用 180 °C 饱和蒸汽配合碱性清洁剂去油污，顽固油渍用溶剂型产品，最后用酸性产品去除水垢。',
 steps:[
  {ph:'碱性去油',pH:'alk',p:['L-ductile'],o:['180 °C 饱和蒸汽枪（如 Geyser）'],r:'1:3',how:'施用后用中软毛刷推开，再用蒸汽冲走多余产品，超纤布擦净。'},
  {ph:'顽固油渍',o:['DECAFLASH（溶剂型）'],r:'即用',how:'摇匀后喷在相应部位，用中软毛刷刷洗，再用蒸汽和超纤布去除残余。'},
  {ph:'酸性去水垢',pH:'acid',p:['L-energo'],r:'1:3',how:'用中软毛刷把稀释液涂在积水处或水垢处，停留几分钟，用蒸汽和超纤布去除。'},
 ],
 x:['全程以温和为原则，靠合适的工具和产品，不要用力擦洗。','DECAFLASH 未列入本页产品库。'],
 u:'https://www.labocosmetica.com/3ph-labocosmetica/'},

{id:'f-2ph-plus',b:'L',name:'2pH+ 洗车循环（TFR）',en:'2pH+ Wash · LIBERA + RENOVA',sc:'tfr',tags:['PPF / 改色膜','白车发灰'],
 sum:'先用碱性 TFR 溶解交通膜和油污，再用酸性 TFR 去除矿物与水垢。适合交通膜严重、白车发灰，以及贴 PPF 前的深度清洁。',
 steps:[
  {ph:'碱性 TFR',pH:'alk',p:['L-libera'],r:'1:5 – 1:20',how:'车辆在阴凉处、车身冷却。用压力喷壶以雾状喷在干燥车身上（不要当泡沫预洗用），由下往上，停留 3–6 分钟且不要干掉，高压水由下往上冲洗。'},
  {ph:'第二遍清洁',vars:[
    {n:'RENOVA 酸性 TFR',pH:'acid',p:['L-renova'],r:'手洗 1:50 · 局部 1:10',how:'针对矿物与无机污染，去除水垢和硬水斑，恢复表面 pH 和光泽。官方建议作为抛光或贴膜前的最后清洁步骤。'},
    {n:'LIBERA 手套二次预洗',pH:'alk',p:['L-libera'],r:'1:20',how:'不用酸性产品时，用手套以 LIBERA 1:20 再洗一遍。车标、轮毂等复杂部位用软毛刷。'},
  ]},
 ],
 branch:{n:'贴 PPF 前追加',steps:[
  {ph:'干燥与检查',how:'擦干后逐面检查，为 PPF 施工做准备。'},
  {ph:'贴膜润滑',p:['L-lubrifica'],r:'1:15',how:'车身表面和膜的胶面都要喷。'},
 ]},
 x:['RENOVA 在 1:5–1:50 时本身就是 2 合 1，可不先做碱性预洗（日常用法见下方「PPF / 改色膜日常养护」组合）。','PRÌMUS 2.0 可作为较温和的替代：喷雾模式也能处理部分交通膜，更适合轻度或维护性脏污。'],
 u:'https://www.labocosmetica.com/product/libera/'},

{id:'f-2ph-int',b:'L',name:'2pH® 内饰织物清洁',en:'2pH Interior Cycle',sc:'int',tags:[],
 sum:'GLICO（乙醇酸）和 DÙCTILE（碱性 APC）组成的内饰双 pH 流程，官方称可将工时减半。适合很脏的座椅和地毯。',
 steps:[
  {ph:'刷尘与判断',p:['L-floor-carpet-brush','L-fabric-seat-brush'],how:'用 2pH 刷先刷出灰尘，让污渍显形，据此判断用 GLICO 还是 DÙCTILE。'},
  {ph:'酸性',pH:'acid',p:['L-glico'],r:'1:5',how:'喷满整个区域并刷开，停留 2–3 分钟。'},
  {ph:'碱性（不冲洗直接接上）',pH:'alk',p:['L-ductile'],r:'1:10',how:'不要先冲洗，直接喷 DÙCTILE 并刷洗。'},
  {ph:'吸尘与清理',o:['吸尘器','喷抽机 / 蒸汽机 / 湿布'],how:'在出现皂化的位置吸尘，最后用喷抽机、蒸汽机或湿布清理。'},
 ],
 x:['单独使用或日常维护时，GLICO 1:10 即可。','传统清洁后用 GLICO 1:50 作最后过水，可去除碱性表面活性剂的残留。'],
 u:'https://www.labocosmetica.com/product/glico/'},

// ───────────── Maniac Line 官方循环 ─────────────
{id:'f-m-ext',b:'M',name:'外部 5 步洗车循环',en:'Maniac Line 5-Phase Exterior',sc:'daily',tags:['轮毂','黑车 / 改色膜','水垢 / 水斑'],
 sum:'Maniac Line 官方宣传册中的外部洗车流程：预洗 → 除染 → 洗车 → 抛光与保护 → 收尾。官方建议按行驶里程每 1–2 周做一次完整洗车。第 3 步可按车况切换香波。',
 steps:[
  {ph:'预洗',p:['M-wheel-tyre-cleaner','M-foam-gun-prewash','M-all-purpose-cleaner'],r:'轮毂 1:3–1:10 · PA壶 冬 1:5 / 夏 1:10',how:'先清洁轮毂轮胎，再做车身预洗：PA壶厚喷整车，由下往上，等泡沫开始下滑后冲洗。APC 1:20 可局部处理飞虫和下部重污。'},
  {ph:'除染',p:['M-iron-remover','M-water-spot-mineral-remover'],r:'铁粉原液 / 1:1 · 水斑即用',how:'Iron Remover 去除轮毂、车身和玻璃上的铁粉；Water Spot Mineral Remover 去除水垢斑。'},
  {ph:'洗车',vars:[
    {n:'日常维护',pH:'neu',p:['M-neutral-foam-shampoo'],r:'PA壶 1:10 · 桶洗 3 瓶盖 / 10 L',how:'先用 PA壶 1:10 由下往上喷满，停留约 4 分钟后冲洗；再用两桶法手洗，车身湿润，从上往下，小区域、最小压力。WAX SAFE，不伤包括棕榈蜡在内的底层保护，适合每周或双周维护洗。'},
    {n:'黑车 / 改色膜 / PPF',p:['M-black-wrap-shampoo'],r:'4 瓶盖 / 8 L（约 1:300）',how:'两桶法，阴凉处从上往下逐板清洗；特别脏或发闷处在湿手套上再加几滴原液。含矿物螯合剂，可减少擦干时的水垢斑；擦干时喷 Exterior Quick Detailer，用 Super Dryer 擦干，车身和玻璃各用一条。'},
    {n:'洗护一步（90 天）',p:['M-ceramic-shampoo'],r:'桶洗 4 瓶盖 · 增效 1:5 / 1:3',how:'水桶加 4 瓶盖，由下往上洗（与传统香波相反）。要加强保护有两种方法：一是 1:5 喷在洗车手套上再洗一遍；二是先用 Neutral Foam Shampoo 手洗，再用 PA壶 1:3 由下往上喷满，至少停留 1 分钟后冲洗。'},
    {n:'水垢 / 水斑',pH:'acid',p:['M-descale-foam-shampoo'],r:'PA壶 1:5 / 1:10 · 桶洗 3–5 瓶盖 / 5 L',how:'Pillow Foam（泡沫垫）技术：泡沫铺满车身后不冲洗，直接用手套在泡沫上清洗。沙尘雨、雪后或擦干不当留下水斑时使用；日常可与 Neutral Foam Shampoo 交替。',src:'此款为宣传册之后推出的新品，用法取自产品页'},
  ]},
  {ph:'抛光与保护',p:['M-exterior-quick-detailer','M-ceramic-ultra-speed-wax'],r:'即用',how:'擦干时用 Exterior Quick Detailer 辅助，避免后视镜下、门框等处留下水垢斑；之后施工 Ceramic Ultra Speed Wax。'},
  {ph:'收尾',p:['M-glass-cleaner-degreaser','M-all-round-plastic-protectant'],r:'玻璃即用 · 塑料 1:1 / 原液',how:'清洁玻璃，处理外饰塑料。'},
 ],
 x:['在阴凉处洗，不要在阳光直射下；车身热时先用冷水降温。','手洗从车顶开始（最干净的部分）；用两桶法；小区域逐段洗；轮毂用能够到缝隙的刷子。'],
 u:'https://maniacline.com/wp-content/uploads/2023/12/mappa_fasi_lavaggio.pdf'},

{id:'f-m-int',b:'M',name:'内饰 4 步清洁',en:'Maniac Line Interior',sc:'int',tags:[],
 sum:'官方宣传册中的内饰流程：吸尘 → 皮革、织物和地毯清洁 → 塑料保护 → 玻璃。',
 steps:[
  {ph:'吸尘',o:['吸尘器'],how:'清空车内物品，取出脚垫单独吸尘清洗；座椅、后备箱和缝隙彻底吸尘。'},
  {ph:'皮革 / 织物 / 地毯',p:['M-interior-cleaner-purifier','M-all-purpose-cleaner','M-alcantara-cleaner'],r:'ICP 1:3 / 1:1 / 原液 · APC 1:5',how:'按材质选用专用清洁剂，配柔软干净的超纤布。Alcantara 用专用的 Alcantara Cleaner。'},
  {ph:'塑料保护',p:['M-all-round-plastic-protectant'],r:'内饰 1:1',how:'倒在超纤施工棉上，小区域涂开，用干布收尾。'},
  {ph:'玻璃',p:['M-glass-cleaner-degreaser'],r:'即用',how:'最后清洁玻璃。用两块超纤布：一块去污，一块收尾防止光晕。'},
 ],
 x:['定期清洁和消毒内饰表面及空调系统，有助减少过敏源，对儿童和宠物尤其重要。'],
 u:'https://maniacline.com/wp-content/uploads/2023/12/mappa_fasi_lavaggio.pdf'},

{id:'f-m-self',b:'M',name:'自助洗车房必备',en:'Self-Service Box',sc:'self',tags:[],
 sum:'官方宣传册中，在自助洗车房洗车的推荐组合。',
 steps:[
  {ph:'除铁',p:['M-iron-remover'],r:'原液 / 1:1',how:'处理轮毂和车身的铁粉污染。'},
  {ph:'刷洗',o:['Condom Wash 超纤刷套'],how:'套在洗车房的刷子上再刷洗，避免刷毛划伤车漆。'},
  {ph:'擦干',p:['M-exterior-quick-detailer'],o:['Super Dryer 擦干布'],r:'即用',how:'用 Exterior Quick Detailer 辅助擦干，避免后视镜下、门框等处留下水垢斑。'},
  {ph:'收尾与保护',p:['M-ceramic-ultra-speed-wax','M-glass-cleaner-degreaser','M-all-round-plastic-protectant'],how:'车漆上 Ceramic Ultra Speed Wax，玻璃用 Glass Cleaner & Degreaser，塑料用 All Round Plastic Protectant。'},
 ],
 x:['不想用洗车房自带的终末蜡时，可用 Wet Coat 喷涂即冲代替（见下方组合）。'],
 u:'https://maniacline.com/wp-content/uploads/2023/12/mappa_fasi_lavaggio.pdf'},
];

// 产品组合：只列特有步骤，base 指向套用的官方循环，at 说明插入位置
const COMBOS = [
{id:'c-coat',b:'L',name:'镀膜 / 封体车保护叠加',sc:'coated',tags:[],base:'f-3ph-wash',at:'替换第 3 步「中性手洗」',
 sum:'REVÌTAX、BENEFÌCIA、CUPÌDO 使用同一种母粒子，可以层叠施工。',
 steps:[
  {ph:'镀膜香波',pH:'neu',p:['L-revitax'],r:'桶洗 1:100–1:150 · PA壶 1:10',how:'镀膜或封体车维护最高可稀释到 1:150。施工 8 小时后保护最强。'},
  {ph:'喷涂即冲',p:['L-beneficia'],r:'冬季原液 · 夏季 1:1',how:'车身湿润时逐板距离 40–60 cm 由下往上喷，数到 5 后立即冲洗；可水膜法或吹干。'},
  {ph:'干燥 / 补强',p:['L-perfecta','L-perfecta-sio2','L-cupido'],alt:true,how:'干燥时有残留用 PERFÈCTA 2.0 去除；镀膜车可用 PERFÈCTA SiO2 作面层；或在干车上施工 CUPÌDO。'},
 ],
 x:['VÉNERE 作 CUPÌDO 的底剂时，维护周期可由 4 个月延长到 9 个月。','检查镀膜状态：洗后车身湿润时，距离 60 cm 喷 VÈRITAS 在引擎盖上，再用水冲。'],
 u:'https://www.labocosmetica.com/product/revitax-best-sio2-shampoo-maintenance-ceramic-coated-car/'},

{id:'c-ppf',b:'L',name:'PPF / 改色膜日常养护',sc:'ppf',tags:['哑光'],base:'f-2ph-plus',at:'日常维护版（无需碱性预洗）',
 sum:'RENOVA 在 1:5–1:50 时本身是 2 合 1，日常可单独使用；哑光膜可改用 SÀTINO；定期用 LIMPIA 深层清洁膜孔。',
 steps:[
  {ph:'维护洗',pH:'acid',p:['L-renova','L-satino'],alt:true,r:'RENOVA 1:200 / 1:50 · SÀTINO 1:60',how:'PPF 用 RENOVA，在已湿润的表面用手套或海绵均匀清洗后彻底冲洗。哑光漆或改色膜可改用 SÀTINO 水桶 1:60（PA壶 1:5），并留下至少 2 周的抗 UV 保护。'},
  {ph:'季节性深层清洁',p:['L-limpia'],r:'即用',how:'喷上后用超纤布擦拭，无需冲水。适合 PPF 发灰发闷，或清理膜孔内积累的污垢。'},
 ],
 x:['RENOVA 和 PURÌFICA 都是酸性：PURÌFICA 让外观焕新，RENOVA 深入 PPF 内部去除渗入的污垢。'],
 u:'https://www.labocosmetica.com/product/renova/'},

{id:'c-rinseless',b:'L',name:'免冲洗 / 无水洗体系',sc:'nowater',tags:[],base:'f-3ph-wash',at:'无高压水时替代整套水洗',
 sum:'先按污垢性质用 PRELUDIO 预浸，再用 IDROSAVE 免冲洗清洗。',
 steps:[
  {ph:'预浸',p:['L-preludio-alkaline','L-preludio-acidic'],alt:true,r:'碱性 1:5–1:20 · 酸性 1:5–1:50',how:'虫尸、刹车粉、交通膜等有机污垢用 ALKALINE；水垢、沙尘雨等无机污垢用 ACIDIC。喷在污染区，停留约 1 分钟。'},
  {ph:'免冲洗清洗',pH:'neu',p:['L-idrosave'],r:'桶洗 1:250 · 无水洗 1:100',how:'带隔砂网的水桶按 1:250 调配，喷壶先喷湿板块。超纤手套浸湿拧干后不加压轻擦，用柔软超纤布擦干，一次一个板块。'},
 ],
 x:[],u:'https://www.labocosmetica.com/product/idrosave-polymer-rinseless-wash-neutral-ph/'},

{id:'c-m-wetcoat',b:'M',name:'洗后快速疏水（Wet Coat）',sc:'coated',tags:['自助洗车房'],base:'f-m-ext',at:'第 3 步洗车后追加',
 sum:'无需擦拭，保护约 2 个月或 4 次洗车；也可在自助洗车房代替终末蜡。',
 steps:[
  {ph:'喷涂',p:['M-wet-coat'],r:'即用',how:'车身保持湿润，距离约 60 cm 喷涂，等待约 10 秒。'},
  {ph:'冲洗',how:'高压水或大量清水冲洗，水会立即成片滑落。'},
 ],
 x:['与现有保护兼容，不叠层。'],
 u:'https://maniacline.com/shop/products-professional-cleaning-auto-exterior/polishing-and-protection/wet-coat/'},

{id:'c-m-insect',b:'M',name:'虫尸预处理',sc:'daily',tags:[],base:'f-m-ext',at:'第 1 步预洗前追加',
 sum:'夏季长途后的车头、挡风玻璃和后视镜。',
 steps:[
  {ph:'软化虫尸',p:['M-insect-remover'],r:'即用',how:'均匀喷涂，停留 30 秒（手工清洁可停留 30 秒–2 分钟），高压水冲掉；残留处喷在 Comfort Car Wash Pad 上再擦。之后按官方循环继续。'},
 ],
 x:['APC 1:20 也可用于预洗和去虫。'],
 u:'https://maniacline.com/shop/products-professional-cleaning-auto-exterior/prewash/insect-remover/'},
];
