// P&S Detail Products（美国 P&S Sales, Inc.，1961 年创立）产品与流程数据。2026-10 整理翻译。
// 来源：官方商城 psdetailproducts.com 的产品说明为主；比例和用法以官方商城产品图里的瓶身 / 5 加仑桶标签（DIRECTIONS）为准；
// 商城和标签都没写比例的 Absolute、Frostbite、Rags to Riches 参考美国经销商 Car Supplies Warehouse 的商品页，已在注意事项里注明。
// 收录 Double Black（Renny Doyle Collection）系列、Inspiration 镀膜系列和常用的 Pro Series 产品；
// 船艇 BABE'S、越野 Off Road、ChemTROL 大桶稀释系统、香氛、抛光盘、刷具和喷壶不收录。
// 比例写法：P&S 标签写「5:1」= 5 份水 + 1 份原液，这里统一写成 1:5
import type { Flow, Product } from './types';

const PS = 'https://psdetailproducts.com/products/';
const CSW = 'https://www.carsupplieswarehouse.com/products/';

export const products: Product[] = [
// ───────────────────────── 预洗 ─────────────────────────
{id:'P-bug-off',b:'P',c:'pre',n:'Bug Off',t:'虫尸去除剂（洗车前预处理）',f:'16 oz · 32 oz · 1 gal · 5 gal',m:'前格栅 · 饰条 · 车漆 · 保险杠',
 d:[['重度虫尸','原液','喷雾壶'],['一般虫尸','1:5','喷雾壶']],
 s:['戴好防护用品。','原液使用，或最多按 1:5 兑水。','喷在要清洁的部位，停留 1 分钟以上，让虫尸软化、松脱。','之后正常洗车，冲掉虫尸残渣。'],
 x:['不要在阳光直射下施工；不要喷在发热的表面，也不要让它在表面干掉。','除虫剂较强，部分表面可能不耐受，每次使用前先在不显眼处测试。','标签：Pro Series F30。'],u:PS+'bug-off-insect-remover'},

{id:'P-frostbite',b:'P',c:'pre',n:'Frostbite',t:'Surface Cleanse 雪泡预洗（泡沫枪 / 手洗两用）',f:'32 oz · 1 gal',m:'车身外部',
 d:[['泡沫枪','2–3 oz / 32 oz 壶','PA壶'],['手洗','1:128','桶洗']],
 s:['泡沫枪：壶里加 2–3 oz（约 60–90 ml）原液，其余加水（壶容量 32 oz / 约 1 L）。','喷满车身，停留 3–5 分钟，不要让泡沫干掉。','用高压水冲净后再接触式洗车。','手洗：按瓶身标签 1:128 兑水。'],
 x:['瓶身标签：高泡、可直接用于泡沫枪、手洗稀释 128:1。','泡沫枪用量按水压可调到 4–6 oz / 32 oz 壶（经销商 Car Supplies Warehouse 的说明）。','在阴凉处或气温较低时施工，避免泡沫干在车上。'],u:PS+'frostbite-surface-clesnse-snow-foam-quart'},

// ───────────────────────── 洗车香波 ─────────────────────────
{id:'P-pearl',b:'P',c:'wash',n:'Pearl Auto Shampoo',t:'中性浓缩洗车液（可生物降解）',f:'32 oz · 1 gal · 5 gal',m:'车身外部',
 d:[['桶洗（每加仑水 1 oz）','1:128','桶洗'],['较脏时 / 泡沫枪','1:80','PA壶']],
 s:['在阴凉处、排水符合规定的洗车区施工。','每加仑（3.8 L）水加 1 oz（约 30 ml，两瓶盖）；最佳比例 1:80 – 1:128。','先冲车，再用手或泡沫枪涂上洗车液。','用洗车手套清洗后彻底冲净。','用擦干巾擦干。'],
 x:['pH 平衡，不伤车漆也不伤手；泡沫稳定、润滑好。','也可以接比例稀释设备，用于手洗或洗车机。'],u:PS+'pearl-auto-shampoo-doubleblack-collection'},

{id:'P-radiance',b:'P',c:'wash',n:'Inspiration Radiance',t:'镀膜维护洗车液（洗后留下光泽和保护）',f:'32 oz · 1 gal · 5 gal',m:'车漆 · 镀膜车',
 d:[['桶洗（每加仑水 6 oz）','1:21','桶洗']],
 s:['先把整车冲一遍，去掉浮尘。','每加仑（3.8 L）水加 6 oz（约 180 ml）。','用洗车手套或海绵洗掉污垢。','用清水彻底冲净。','用合适的麂皮或擦干巾擦干。'],
 x:['专为 Inspiration 镀膜搭配，其他镀膜或保养良好的车漆也适用；冲洗后会留下一层光泽和保护，补强原有镀膜。','比例来自 5 加仑桶的旧版标签（当时叫 Radiance Premium Wash & Wax）。','不是打蜡的替代品；避免在阳光直射下洗车。'],u:PS+'radiance-premium-wash-wax-quart'},

{id:'P-absolute',b:'P',c:'wash',n:'Absolute Rinseless Wash',t:'聚合物免冲洗洗车液（软化水质，可多用途稀释）',f:'32 oz · 1 gal',m:'车漆 · 镀膜 · 改色膜 · PPF · 饰条 · 塑料 · 皮革 · 织物',
 d:[['免冲洗（水桶）','1:256','桶洗'],['黏土润滑液','1:128','喷雾壶'],['快速美容剂','1:64','喷雾壶'],['玻璃 / 内饰清洁','1:256','喷雾壶']],
 s:['水桶里每 2 加仑（约 7.6 L）水加 1 oz（约 30 ml）。','很脏的地方先用同样比例装进压力喷壶预喷，减少摩擦。','用洗车手套或毛巾逐块清洗，洗完马上擦干，不需要冲水。','其他用途按比例装进喷壶使用。'],
 x:['官方说明：聚合物包裹并乳化污垢，加进水里立刻软化水质，减少水斑；车外车内各表面都能用。','比例来自经销商 Car Supplies Warehouse 的商品页，官方商城没有写比例。','阳光下或阴凉处都可以施工。'],u:PS+'absolute-rinseless-wash'},

{id:'P-epic',b:'P',c:'wash',n:'Epic Waterless Wash',t:'无水洗 / 快速美容（聚合物增光）',f:'16 oz · 1 gal · 5 gal',m:'车漆 · 金属 · 玻璃',
 d:[['无水洗 / 快速美容','即用','喷雾壶']],
 s:['在阴凉处、车身冷却且干燥时施工。','准备两块干净超纤布：一块擦拭，一块抛亮。','每次在约 60 × 60 cm 的范围喷一层薄雾。','用超纤布轻轻擦过喷涂区域，擦到雾膜消失。'],
 x:['也可以当快速美容剂，或在冲洗后、擦干前喷在湿车上一起擦干。','标签：Eco-Detail Products EC37。'],u:PS+'epic-rinseless-and-waterless-wash'},

// ───────────────────────── 轮毂轮胎 ─────────────────────────
{id:'P-brake-buster',b:'P',c:'wheel',n:'Brake Buster',t:'轮毂 + 轮胎凝胶清洁剂（附着停留，留防锈层）',f:'16 oz · 32 oz · 1 gal · 5 gal',m:'轮毂 · 轮胎',
 d:[['轮毂 / 轮胎','即用','喷雾壶'],['日常维护（经销商用法）','1:5','喷雾壶']],
 s:['尽量在轮毂冷却时施工。','在轮毂和轮胎上大量喷涂。','停留 1 分钟以上。','需要时用刷子刷洗。','用高压水枪或强水流冲净。'],
 x:['凝胶会附着在轮毂表面，渗透污垢；同时清洁轮胎，为上轮胎油做准备，并在轮毂上留下一层防锈成分。','每次使用前在轮毂上先做局部测试，避免染色或损伤。','标签按原液使用；经销商 Car Supplies Warehouse 建议日常维护 1:5 稀释，重度污垢用原液。'],u:PS+'brake-buster-doubleblack-collection'},

{id:'P-undressed',b:'P',c:'wheel',n:'Undressed',t:'碱性轮胎清洁剂（去旧轮胎油和发棕）',f:'1 gal · 5 gal',m:'轮胎',
 d:[['重度','原液','喷雾壶'],['一般','1:10','喷雾壶']],
 s:['按轮胎状况原液使用，或最多 1:10 兑水。','喷在要清洁的部位。','让产品作用一会儿，需要时用刷子刷。','用水冲净或擦净。'],
 x:['碱性清洁液 + 水性溶剂 + 洗涤剂，能去掉路面污垢、旧轮胎油和油污，让白字胎更白。','官方定位为上轮胎油前的准备步骤（之后接 Dressed 或 Shine All）。','标签：Pro Series N10。'],u:PS+'undressed-tire-prep'},

// ───────────────────────── 除染 ─────────────────────────
{id:'P-iron-buster',b:'P',c:'deco',n:'Iron Buster',t:'中性铁粉去除剂（轮毂 + 车漆，变紫）',f:'16 oz · 1 gal · 5 gal',m:'车漆 · 轮毂',
 d:[['车漆 / 轮毂除铁','即用','喷雾壶']],
 s:['车漆：先洗车并擦干，效果最好；轮毂不需要先洗。','大量喷在车漆或轮毂上。','停留 2–5 分钟，有铁粉的地方会变紫。','不要让它在表面完全干掉。','用水管或高压水枪彻底冲净，需要时重复。'],
 x:['pH 平衡，见效快。','每次使用前在轮毂上先做局部测试。'],u:PS+'iron-buster-doubleblack-collection'},

{id:'P-crystal-wash',b:'P',c:'deco',n:'Crystal Wash',t:'有机酸除染剂（工业落尘、铁路粉尘、锈斑；干燥时结晶）',f:'1 gal · 5 gal',m:'车漆 · 轮毂',
 d:[['车漆 / 轮毂除染','即用','喷雾壶']],
 s:['在阴凉处、车身冷却时施工，不要在阳光直射下用。','用喷壶喷在车漆上，避开饰条和哑光表面，以免染色。','停留让产品开始结晶。','车漆用洗车液清洗后冲净；轮毂刷洗后冲净。'],
 x:['官方用途：镀膜施工前和轮毂清洁的预处理。','酸性清洁剂较强，部分表面不耐受，使用前先局部测试。','危险提示：可能造成严重皮肤灼伤和眼睛损伤，戴好防护用品。','标签：Pro Series K35；标签较模糊，以实物为准。'],u:PS+'crystal-wash-fallout-remover-and-surface-cleaner'},

{id:'P-tree-sap',b:'P',c:'deco',n:'Speedy Tree Sap Remover',t:'树脂去除剂（不溶于水的树胶）',f:'32 oz',m:'车漆 · 玻璃',
 d:[['树脂点','即用','—']],
 s:['倒在超纤布上，轻轻擦拭树脂。','擦掉后用快速美容剂或洗车清洁残留。'],
 x:['适合最后的细节处理。'],u:PS+'tree-sap-remover-fallout-remover-and-surface-cleaner'},

// ───────────────────────── 研磨 / 施工前处理 ─────────────────────────
{id:'P-intervention',b:'P',c:'polish',n:'Intervention',t:'高效切削研磨剂（Recovery 系列第一步）',f:'8 oz · 32 oz',m:'车漆',
 d:[['机器抛光','即用','—']],
 s:['选择抛光机和切削盘（羊毛、超纤或海绵切削盘都可以）。','在盘上或直接在漆面点 4–5 小滴。','轻到中等压力，每次 60 × 60 cm 或更小，去除缺陷。','保持足够的润滑，不够就补产品。','整车做完后检查缺陷去除情况，再用收光步骤抛亮。'],
 x:['在 Rehab 的基础上加强切削，可去砂纸痕、旋纹和划痕；好擦，省时间。'],u:PS+'intervention-high-performance-compound'},

{id:'P-ego-maker',b:'P',c:'polish',n:'Ego Maker',t:'切削研磨剂（切削后仍很亮，Double Black）',f:'32 oz',m:'车漆',
 d:[['机器抛光','即用','—']],
 s:['可用于大轨迹 DA、强制旋转或旋转抛光机，各种抛光盘都可以。','去除砂纸痕、划痕和其他漆面缺陷。','之后接收光步骤（Deep Finish 或 Envy）。'],
 x:['高纯度精制氧化铝磨料，粒径和形状控制严格，所以切削后漆面仍然亮。','不含蜡和硅油，钣喷车间可用。'],u:PS+'ego-maker-compound-doubleblack-collection'},

{id:'P-rehab',b:'P',c:'polish',n:'Rehab Correction Creme',t:'多用途研磨剂（切削到收光都能做）',f:'8 oz · 32 oz · 1 gal',m:'车漆',
 d:[['机器抛光','即用','—']],
 s:['按漆面硬度选择抛光盘和机器：切削盘做切削，收光盘做收光。','点几小滴在盘上，每次 60 × 60 cm，抛到缺陷去除。','用超纤布擦净检查。'],
 x:['切削力随漆面硬度、抛光盘和机器而变，可以从强切削一直做到收光；搭配各种海绵盘效果都很好。','可去除砂纸痕、旋纹和划痕。'],u:PS+'rehab-correction-creme-quart'},

{id:'P-deep-finish',b:'P',c:'polish',n:'Deep Finish',t:'中度整平抛光剂（一步出深度和光泽）',f:'32 oz',m:'车漆',
 d:[['机器抛光','即用','—']],
 s:['在 Ego Maker 之后，或直接用于一般旋纹的漆面。','点几小滴在抛光盘上，每次 60 × 60 cm 抛到缺陷去除。','用超纤布擦净检查。'],
 x:['除了日常旋纹，也能去掉接近完美时才显出来的最后一些细痕；适合难处理的漆面，一步出光。','不含蜡和硅油，钣喷车间可用。'],u:PS+'deep-finish-restoration-polish-doubleblack-collection'},

{id:'P-therapy',b:'P',c:'polish',n:'Therapy',t:'收光抛光剂（Recovery 系列最后一步）',f:'8 oz · 32 oz',m:'车漆',
 d:[['机器抛光','即用','—']],
 s:['主要配收光海绵盘，特殊情况也可用羊毛或超纤盘。','在盘上点 4–5 小滴。','轻到中等压力，每次 60 × 60 cm 或更小，抛出光泽。','保持润滑，抛完用超纤布擦净检查。'],
 x:['在 Rehab 的基础上调得更细，适合需要轻手的软漆。'],u:PS+'therapy-final-polish'},

{id:'P-envy',b:'P',c:'polish',n:'Envy',t:'珠宝级收光抛光剂（无填充，适合镀膜前）',f:'16 oz',m:'车漆',
 d:[['机器抛光','即用','—']],
 s:['可用于大轨迹 DA、强制旋转或传统抛光机。','作为最后一步收光，抛出湿润、深邃的光泽。'],
 x:['超细磨料，不含填充物，光泽不会被填充物掩盖后又消失，适合接镀膜。'],u:PS+'envy-jeweling-polish-doubleblack-collection'},

{id:'P-paint-prep',b:'P',c:'polish',n:'Paint Coating Surface Prep',t:'镀膜前脱脂（也可清洁玻璃）',f:'16 oz · 1 gal',m:'车漆 · 玻璃',
 d:[['镀膜前脱脂','即用','喷雾壶']],
 s:['抛光完成后施工。','大量喷在漆面上，让表面完全湿润。','停留 30 秒，用超纤布擦净，勤翻毛巾。','整车重复，镀膜前仔细检查漆面。'],
 x:['专为 Inspiration 镀膜配套，去除蜡、硅油等影响镀膜附着的残留。','瓶身也写作「Paint Prep and Glass Cleaner」；官方推荐的玻璃镀膜流程也用它在 VUE 前处理玻璃。'],u:PS+'paint-coating-surface-prep-doubleblack-collection'},

// ───────────────────────── 镀膜 ─────────────────────────
{id:'P-inspiration-classic',b:'P',c:'coat',n:'Inspiration Classic',t:'专业陶瓷镀膜（车漆 · 轮毂 · 饰条）',f:'30 ml · 50 ml',m:'车漆 · 轮毂 · 塑料饰条',
 d:[['镀膜（施工块）','即用','—']],
 s:['施工前必须完成整车抛光。','用 Paint Coating Surface Prep 清洁漆面。','按包装内的培训说明施工。','施工后至少 2–3 小时不要让车淋雨或暴露在外；48–72 小时完全固化。'],
 x:['官方定位为专业产品，不建议未受训练的人施工；可在 inspirationcoating.com 申请认证施工店。','套装含 30 ml 镀膜、施工块、说明书和门框标签。','可罩 SOLE 或 Defender 作面层；日常用 Radiance 洗车。'],u:PS+'inspiration-ceramic-coating-30ml-doubleblack-collection'},

{id:'P-stout',b:'P',c:'coat',n:'Inspiration STOUT',t:'全能陶瓷镀膜（车漆、饰条、轮毂通用）',f:'30 ml · 50 ml',m:'车漆 · 塑料饰条 · 轮毂',
 d:[['镀膜（施工块）','即用','—']],
 s:['完成抛光和脱脂（Paint Coating Surface Prep）。','用附带的施工块涂抹。','等它闪干 30 秒–2 分钟（看环境），用干净超纤布流平。','用第二块布擦净残留。','需要多层时，层间间隔 1 小时。','24 小时内不要淋水、不要碰化学品。'],
 x:['Inspiration 系列最新的一款，强调好施工、高光泽和疏水。','闪干、层间和固化时间来自经销商 Car Supplies Warehouse 的商品页，以包装说明为准。'],u:PS+'inspiration-stout'},

{id:'P-sole',b:'P',c:'coat',n:'Inspiration SOLE',t:'一年期镀膜 / Classic 的面层',f:'50 ml · 100 ml',m:'车漆',
 d:[['镀膜（施工块）','即用','—']],
 s:['单独使用：抛光、Paint Coating Surface Prep 脱脂后施工，作为一年期镀膜。','作面层：在 Inspiration Classic 上直接罩一层，增加保护。','每年在 Classic 上补一层作为维护镀膜。'],
 x:['比 Classic 好施工，专业和资深爱好者都能用；官方仍建议由专业人员施工。','100 ml 套装含施工块和 4 张门框标签。'],u:PS+'inspiration-sole-doubleblack-collection'},

{id:'P-vue',b:'P',c:'coat',n:'Inspiration VUE',t:'玻璃镀膜（6 个月以上）',f:'30 ml',m:'车外玻璃',
 d:[['玻璃镀膜（施工块）','即用','—']],
 s:['用 Clarity Creme 研磨玻璃。','用 Paint Coating Surface Prep 清洁玻璃。','用附带的施工块涂 VUE。'],
 x:['一瓶 30 ml 可做 10 块以上前挡。','官方定位为专业产品，需按规范施工。'],u:PS+'inspiration-vue-glass-coating-doubleblack-collection'},

// ───────────────────────── 封体 / 快速养护 ─────────────────────────
{id:'P-bead-maker',b:'P',c:'seal',n:'Bead Maker',t:'喷雾封体（湿车干车都能用，强拨水）',f:'16 oz · 32 oz · 1 gal · 5 gal',m:'车漆 · 玻璃 · 塑料饰条 · 轮毂',
 d:[['湿车 / 干车喷涂','即用','喷雾壶']],
 s:['先洗车；需要时先用黏土处理漆面。','喷在漆面上；湿车、干车都可以，干车施工效果更好。','用超纤布擦掉，需要时翻面，确保擦净。','整车重复。','至少固化 8 小时，效果最好。'],
 x:['聚合物会迁移到漆面、交联成疏水保护层，含 UV 吸收剂；新漆或刚美容过的车效果最好。','官方商城写固化约 2 小时（看环境），5 加仑桶标签写至少 8 小时。'],u:PS+'beadmaker-paint-protectant-doubleblack-collection'},

{id:'P-defender',b:'P',c:'seal',n:'Inspiration Defender',t:'SiO₂ 喷雾封体（镀膜面层 / 单独使用）',f:'16 oz · 1 gal',m:'车漆 · 金属 · 玻璃 · 塑料饰条',
 d:[['喷上擦掉','即用','喷雾壶']],
 s:['作镀膜面层时，等镀膜定型后再施工，一般至少 1 小时。','尽量在车身冷却、避开阳光的地方施工。','直接喷在漆面上，或喷在超纤布上擦。','在约 90 × 90 cm 的范围内均匀抹开，稍等片刻，翻面擦亮。','整车重复。'],
 x:['可作 Inspiration 和其他镀膜的面层 / 维护，也可单独作 SiO₂ 保护。'],u:PS+'defender-sio2-protectant'},

{id:'P-paint-gloss',b:'P',c:'seal',n:'Paint Gloss',t:'展厅级快速美容剂（也可当黏土润滑液）',f:'16 oz · 1 gal · 5 gal',m:'车漆',
 d:[['快速美容 / 黏土润滑','即用','喷雾壶']],
 s:['先洗车；最好在阴凉处、车漆冷却时施工。','在 60 × 60 cm 的漆面上轻喷一层。','用干净的超纤布擦拭并抛亮。','当黏土润滑液时多喷一些，保证足够润滑。'],
 x:['水性，去掉灰尘、指纹和污迹，不用做整车美容；配合 Perfect Putty 黏土使用。'],u:PS+'paint-gloss-doubleblack-collection'},

{id:'P-dream-maker',b:'P',c:'seal',n:'Dream Maker',t:'车展光泽增强喷雾（McCall 车队版）',f:'16 oz · 1 gal',m:'车漆',
 d:[['喷上擦亮','即用','喷雾壶']],
 s:['喷在干净的漆面上。','用超纤布擦开、抛亮。'],
 x:['为蒙特雷车展周的 McCall 美容团队开发：提升单工序漆和清漆的光泽。','可以叠在 Bead Maker 等现有保护上。','瓶身：交车前处理、车展日增艳、适用所有漆面。'],u:PS+'dream-maker-gloss-amplifier'},

// ───────────────────────── 塑料 / 轮胎养护 ─────────────────────────
{id:'P-shine-all',b:'P',c:'trim',n:'Shine All',t:'水性高光轮胎油（也可用于内饰）',f:'16 oz · 1 gal · 5 gal',m:'轮胎 · 橡胶 · 人造革 · 皮革',
 d:[['高光','即用','—'],['降低光泽 / 节省用量','兑水（比例自定）','—']],
 s:['先把要上油的部位清洁、擦干。','喷涂或用施工块手涂，用量看效果需要。','等它干成光亮效果，擦掉多余的。'],
 x:['主要是即用产品；想降低光泽或节省用量时可以兑水，标签没有给固定比例。','虽然主要用于外饰，也可以保养内饰的橡胶、人造革和皮革。'],u:PS+'shine-all-doubleblack-collection'},

{id:'P-dressed',b:'P',c:'trim',n:'Dressed',t:'聚合物水性轮胎油（缎面到高光）',f:'1 gal · 5 gal',m:'轮胎',
 d:[['轮胎','即用','—']],
 s:['先用 Undressed 清洁轮胎并擦干。','用刷子（效果最好）或喷壶涂在轮胎上。'],
 x:['100 % 水性、不属于危险品，用聚合物模拟溶剂型硅油轮胎油的效果，只用于轮胎。','即用产品；5 加仑桶背标的用法文字与 Undressed 相同，以实际用途为准。','标签：Pro Series L14。'],u:PS+'dressed-tire-finish'},

{id:'P-dynamic',b:'P',c:'trim',n:'Dynamic Dressing',t:'浓缩多用途保养剂（光泽可调）',f:'1 gal（浓缩）· 16 oz（即用版）',m:'轮胎 · 外饰塑料 · 发动机舱 · 底盘 · 内饰塑料 · 皮革 · 人造革',
 d:[['高光','1:1','喷雾壶'],['自然光泽','1:4','喷雾壶']],
 s:['按需要的光泽兑水：1:1 高光，1:4 自然。','喷涂或用施工块涂抹，擦掉多余的。'],
 x:['一个产品就能用在轮胎、外饰、发动机舱、底盘和内饰。','16 oz 的 Ready To Use 版就是 1:4 稀释好的版本。'],u:PS+'dynamic-dressing'},

// ───────────────────────── 玻璃 ─────────────────────────
{id:'P-true-vue',b:'P',c:'glass',n:'True Vue',t:'水性玻璃清洁剂（即用版 / 浓缩版）',f:'16 oz（即用）· 1 gal · 5 gal（浓缩）',m:'车内外玻璃',
 d:[['即用版','即用','喷雾壶'],['浓缩版','1:4 – 1:10','喷雾壶']],
 s:['喷在玻璃或玻璃布上。','用干净的玻璃布擦干净，再用干布擦亮。'],
 x:['去除路面油膜、烟渍和污垢；热天工作时间长，冷天挥发也够快。','浓缩版按需要的效果 1:4 – 1:10 稀释。'],u:PS+'true-vue-rtu-doubleblack-collection'},

{id:'P-reflect',b:'P',c:'glass',n:'REFLECT Glass Finisher',t:'玻璃清洁 + SiO₂ 保护（车内外）',f:'16 oz · 1 gal',m:'车内外玻璃',
 d:[['玻璃','即用','喷雾壶']],
 s:['先擦掉或洗掉玻璃上的重污。','直接在玻璃上均匀喷一层薄雾；大面积分区施工。','用干净干燥的超纤布把产品抛进玻璃。','翻到干面继续擦，直到清晰无痕。'],
 x:['留下一层 SiO₂ 保护，拨水、减少 UV 老化和污垢附着，以后更好清洁。','在阴凉处施工，避开阳光直射和发热的玻璃，以免留痕。'],u:PS+'reflect-glass-finisher'},

{id:'P-clarity',b:'P',c:'glass',n:'Clarity Creme',t:'玻璃研磨乳（去水垢、矿物沉积、雨刷痕）',f:'16 oz',m:'车外玻璃',
 d:[['手工 / 机器研磨','即用','—']],
 s:['先洗玻璃，需要时用黏土处理。','轻度：用超纤布手工研磨；中度以上：用机器配海绵或羊毛盘（看严重程度）。','手工或机器都用重叠的路线研磨，直到玻璃恢复原状，需要时重复。','完成后让残留干成雾状，再擦亮。'],
 x:['也用于 Inspiration VUE 玻璃镀膜前的研磨。'],u:PS+'clarity-creme-glass-polish-doubleblack-collection'},

// ───────────────────────── 内饰 ─────────────────────────
{id:'P-xpress',b:'P',c:'int',n:'Xpress Interior Cleaner',t:'内饰多表面清洁剂（皮革、人造革、塑料）',f:'16 oz · 32 oz · 1 gal · 5 gal',m:'皮革 · 人造革 · 内饰塑料',
 d:[['重度','原液','喷雾壶'],['一般','1:1','喷雾壶']],
 s:['先在不显眼处测试。','原液使用，或最多 1:1 兑水。','喷足量直到起泡。','用毛巾、软毛刷、百洁布或魔术擦等工具刷洗。','刷完用拧湿的毛巾擦净。','需要时再上 Leather Treatment 或其他保养剂提升外观。'],
 x:['清洁不会让表面变干、变色或受损，擦完没有残留。'],u:PS+'xpress-interior-cleaner-doubleblack-collection'},

{id:'P-swift',b:'P',c:'int',n:'Swift Clean & Shine',t:'内饰清洁 + 上光二合一快速美容',f:'16 oz · 1 gal · 5 gal',m:'皮革 · 人造革 · 内饰塑料',
 d:[['内饰快速美容','即用','喷雾壶']],
 s:['用前摇匀。','喷在表面、施工海绵或 Xpress Side Kick 刷洗垫上。','需要时刷洗到干净。','擦掉多余的产品，擦到想要的效果。'],
 x:['清洁后留下有保养感的上光效果，气味宜人。'],u:PS+'swift-clean-shine'},

{id:'P-leather-treatment',b:'P',c:'int',n:'Leather Treatment',t:'皮革保养 / 保护剂（含 UV 抑制剂和皮革香味）',f:'16 oz · 1 gal',m:'皮革',
 d:[['皮革保养','即用','—']],
 s:['先用 Xpress Interior Cleaner 清洁皮革并擦干。','取适量在施工海绵或超纤布上，均匀涂开。','让它渗入几分钟，再用干净的超纤布擦掉多余的。'],
 x:['滋润、保护皮革，含 UV 抑制剂，并带皮革香味。'],u:PS+'leather-treatment-doubleblack-collection'},

{id:'P-terminator',b:'P',c:'int',n:'Terminator',t:'酶清洁污渍去除剂（内饰清洁系统第 1 步）',f:'16 oz · 32 oz · 1 gal · 5 gal',m:'地毯 · 织物',
 d:[['地毯 / 织物污渍','即用','喷雾壶']],
 s:['即用，不需要稀释。','开始前先干刷、吸尘地毯和座椅。','直接喷在污渍上，再处理整片区域。','接着喷 Carpet Bomber（第 2 步），用地毯刷刷洗，两步一起效果最好。','至少作用 3 分钟，用蒸汽机或地毯刷搅动，最后吸尘或抽洗。'],
 x:['酶 + 清洁成分，针对嵌入的污垢、油脂和蛋白质类污渍；也可以单独使用。'],u:PS+'terminator-spot-and-stain-remover-doubleblack-collection'},

{id:'P-carpet-bomber',b:'P',c:'int',n:'Carpet Bomber',t:'地毯 / 织物清洁剂（内饰清洁系统第 2 步）',f:'16 oz · 32 oz · 1 gal · 5 gal',m:'地毯 · 织物',
 d:[['地毯 / 织物','1:5 – 1:8','喷雾壶']],
 s:['按 1:5 – 1:8 兑水。','开始前先干刷、吸尘地毯和座椅。','作为系统第 2 步时，在 Terminator 之后使用。','在区域上轻喷一层，至少作用 3 分钟。','用蒸汽机或地毯刷刷洗（两者一起最好），最后吸尘或抽洗。'],
 x:['柑橘成分 + 可生物降解清洁剂 + 水性溶剂，溶解油脂、带走污垢；也可以单独使用。'],u:PS+'carpet-bomber-carpet-doubleblack-collection'},

{id:'P-finisher',b:'P',c:'int',n:'Finisher',t:'过氧化物除味除渍（内饰清洁系统第 3 步）',f:'16 oz · 1 gal',m:'地毯 · 织物 · 布座椅',
 d:[['地毯 / 织物','即用','喷雾壶']],
 s:['在 Terminator 和 Carpet Bomber 清洁完之后使用。','喷在地毯、座椅等织物上，让它作用 5–10 分钟。','产品会分解成氧气和水，不需要冲洗或清除残留。'],
 x:['针对清洁后残留的有机污渍、水印和霉味。','作用时间来自经销商 Car Supplies Warehouse 的商品页。'],u:PS+'finisher-peroxide-treatment-doubleblack-collection'},

{id:'P-release',b:'P',c:'int',n:'Release Vacuum Aid',t:'吸尘辅助喷雾（宠物毛、防静电）',f:'16 oz · 1 gal',m:'地毯 · 织物',
 d:[['吸尘前喷涂','即用','喷雾壶']],
 s:['吸尘前轻喷在地毯和织物上。','用刷子或吸尘器正常吸尘。'],
 x:['瓶身：帮助去除宠物毛、防静电、给织物除味、减少吸尘时间、让吸头更顺滑。','标签：Pro Series G21。'],u:PS+'release-vacuum-aid'},

{id:'P-natural-finish',b:'P',c:'int',n:'Natural Finish',t:'水性内饰保养剂（低光泽，含 UV 防护和香味）',f:'16 oz · 1 gal · 5 gal',m:'皮革 · 人造革 · 橡胶',
 d:[['内饰 / 橡胶','即用','—']],
 s:['先把要保养的部位清洁、擦干。','喷涂或手涂，用量看效果需要。','等它干后擦掉多余的。'],
 x:['当轮胎油用时不要涂太多，涂完把轮胎擦一遍；甩出来的保养剂会弄脏塑料饰条。','标签：Pro Series L60。'],u:PS+'natural-finish-dressings-interior-exterior'},

// ───────────────────────── 配件 ─────────────────────────
{id:'P-reset-clay',b:'P',c:'acc',n:'RESET Clay Scrubber',t:'黏土 + 刷洗双面海绵（2 块装）',f:'4″ × 6″（约 10 × 15 cm）',m:'车漆',d:[],
 s:['洗车时丢进洗车水桶，用红色面刷掉虫尸和顽固污垢。','或作最后一步，配黏土润滑液用黑色黏土面除染。'],
 x:['不要用除虫剂当黏土润滑液，最好用专用润滑液（如 Paint Gloss）。','可重复使用几十次。'],u:PS+'reset-clay-scrubber-4-x-6-2-pack'},

{id:'P-perfect-putty',b:'P',c:'acc',n:'Perfect Putty / Perfect Mitt',t:'黏土块（Cool Gray / Purple）与黏土手套（Fine / Medium）',f:'黏土 0.5 lb · 手套 6″ × 12″',m:'车漆 · 玻璃 · 镀铬 · 塑料 · 铝',d:[],
 s:['洗车后，在表面喷足 Paint Gloss 当润滑液。','用黏土或黏土手套轻轻滑过，去掉工业落尘、漆雾、铁路粉尘和表面锈点。','擦干残留后进入下一步。'],
 x:['黏土手套比黏土块快约 3 倍。'],u:PS+'perfect-putty-cool-grey-fallout-remover-surface-cleaner'},

{id:'P-refine',b:'P',c:'acc',n:'REFINE Extreme Drying Towel',t:'双面扭绒擦干巾',f:'20″ × 32″（约 50 × 80 cm）',m:'车漆',d:[],
 s:['洗车后平铺在车身上，轻拉吸水。'],
 x:[],u:PS+'refine-extreme-drying-towel'},

{id:'P-applicator',b:'P',c:'acc',n:'Inspiration Coating Applicator',t:'镀膜超纤施工块',f:'4″ × 5″',m:'—',d:[],
 s:['包在施工块上，倒上镀膜按说明涂抹。'],
 x:[],u:PS+'inspiration-coating-applicator-grey-red-ceramic-coating'},

{id:'P-side-kick',b:'P',c:'acc',n:'Xpress Side Kick',t:'内饰刷洗垫（2 块装）',f:'—',m:'—',d:[],
 s:['配合 Xpress Interior Cleaner 或 Swift，喷在垫子上刷洗皮革、人造革和塑料。'],
 x:[],u:PS+'xpress-side-kick-2-pack'},

{id:'P-rags',b:'P',c:'acc',n:'Rags to Riches',t:'超纤毛巾专用洗涤剂',f:'32 oz · 1 gal',m:'—',d:[],
 s:['洗衣机：小量或轻脏一次加 1 oz（约 30 ml），大量加 2 oz。','很脏或失去吸水性的毛巾，先在 2–3 加仑水里加 1–2 oz 浸泡，再机洗。'],
 x:['恢复超纤吸水性和柔软度，所有面料都能用。','用量来自经销商 Car Supplies Warehouse 的商品页。'],u:CSW+'p-s-rags-to-riches-microfiber-detergent'},
];

export const flows: Flow[] = [
{id:'f-p-interior',b:'P',name:'地毯与织物三步清洁（Double Black 内饰清洁系统）',en:'P&S Double Black Interior Cleaning System',sc:'int',tags:['地毯','除味'],
 sum:'官方标签写明的三步系统：Terminator 酶清洁先处理污渍 → Carpet Bomber 1:5 – 1:8 整片清洁 → Finisher 过氧化物除味除渍，最后吸尘或抽洗。',
 steps:[
  {ph:'准备',o:['地毯刷','吸尘器'],how:'先干刷、吸尘地毯和座椅。'},
  {ph:'Step 1 污渍',p:['P-terminator'],r:'即用',how:'直接喷在污渍上，再处理整片区域。'},
  {ph:'Step 2 整片清洁',p:['P-carpet-bomber'],r:'1:5 – 1:8',how:'在 Terminator 之后轻喷一层，至少作用 3 分钟，用蒸汽机或地毯刷刷洗，然后吸尘或抽洗。'},
  {ph:'Step 3 除味',p:['P-finisher'],r:'即用',how:'喷在织物上作用 5–10 分钟，不需要冲洗。'},
 ],
 x:['Terminator 和 Carpet Bomber 也可以单独使用。'],
 u:PS+'carpet-bomber-carpet-doubleblack-collection'},

{id:'f-p-leather',b:'P',name:'皮革 / 塑料内饰清洁与保养',en:'P&S Interior Leather & Trim',sc:'int',tags:['皮革'],
 sum:'Xpress Interior Cleaner 标签的做法：原液或 1:1 喷到起泡，刷洗后用湿毛巾擦净，再上 Leather Treatment；平时用 Swift 一步清洁上光。',
 steps:[
  {ph:'清洁',p:['P-xpress','P-side-kick'],r:'原液 – 1:1',how:'喷足量直到起泡，用刷洗垫、软毛刷或毛巾刷洗，再用拧湿的毛巾擦净。'},
  {ph:'保养',p:['P-leather-treatment','P-natural-finish'],alt:true,r:'即用',how:'皮革用 Leather Treatment，人造革和橡胶也可用 Natural Finish；涂匀后渗入几分钟，擦掉多余的。'},
  {ph:'日常维护',p:['P-swift'],r:'即用',how:'摇匀，喷在表面或刷洗垫上，擦到干净并留下上光效果。'},
 ],
 x:['先在不显眼处测试。'],
 u:PS+'xpress-interior-cleaner-doubleblack-collection'},

{id:'f-p-wash',b:'P',name:'日常洗车 + Bead Maker 封体',en:'P&S Wash & Protect',sc:'daily',tags:['保护'],
 sum:'按各瓶身标签的顺序：Bug Off 预处理虫尸 → Pearl 洗车（每加仑水 1 oz）→ 需要时 Paint Gloss + 黏土 → Bead Maker 喷涂擦掉，至少固化 8 小时。',
 steps:[
  {ph:'虫尸预处理（需要时）',p:['P-bug-off'],r:'原液 – 1:5',how:'喷在前脸，停留 1 分钟以上，不要干掉。'},
  {ph:'预洗（可选）',p:['P-frostbite'],how:'泡沫枪喷满，停留 3–5 分钟后冲净。'},
  {ph:'洗车',p:['P-pearl'],r:'1:128',how:'每加仑水 1 oz，洗车手套清洗后彻底冲净。'},
  {ph:'黏土（需要时）',p:['P-paint-gloss','P-perfect-putty'],r:'即用',how:'多喷 Paint Gloss 当润滑液，用黏土或黏土手套除染。'},
  {ph:'封体',p:['P-bead-maker'],r:'即用',how:'湿车或干车都可以喷，用超纤布擦掉；干车施工效果更好。'},
  {ph:'擦干',p:['P-refine'],how:'湿车施工时最后擦干。'},
 ],
 x:['Bead Maker 至少固化 8 小时效果最好。','不要在阳光直射下洗车。'],
 u:PS+'beadmaker-paint-protectant-doubleblack-collection'},

{id:'f-p-wheel',b:'P',name:'轮毂轮胎清洁与轮胎油',en:'P&S Wheels & Tires',sc:'wheel',tags:['轮胎'],
 sum:'Brake Buster 清洁轮毂和轮胎 → Iron Buster 去铁粉（变紫）→ 轮胎再用 Undressed 去旧轮胎油 → Dressed 或 Shine All 上光。',
 steps:[
  {ph:'轮毂轮胎清洁',p:['P-brake-buster'],r:'即用',how:'轮毂冷却时大量喷涂，停留 1 分钟以上，刷洗后用强水流冲净。'},
  {ph:'除铁（需要时）',p:['P-iron-buster'],r:'即用',pH:'neu',how:'喷涂后停留 2–5 分钟，不要干掉，冲净。'},
  {ph:'轮胎深度清洁',p:['P-undressed'],r:'原液 – 1:10',how:'喷在轮胎上，作用后刷洗，冲净并擦干。'},
  {ph:'轮胎上光',p:['P-dressed','P-shine-all'],alt:true,r:'即用',how:'Dressed 用刷子涂效果最好；Shine All 喷或手涂，干后擦掉多余的。'},
 ],
 x:['每次使用 Brake Buster、Iron Buster 前先在轮毂上做局部测试。'],
 u:PS+'brake-buster-doubleblack-collection'},

{id:'f-p-correction',b:'P',name:'漆面抛光（Recovery / Double Black 研磨系列）',en:'P&S Paint Correction',sc:'tfr',tags:['镀膜前'],
 sum:'两条官方系列：Recovery 系列 Intervention 切削 → Rehab 中间步 → Therapy 收光；Double Black 系列 Ego Maker 切削 → Deep Finish 整平 → Envy 珠宝级收光。完成后用 Paint Coating Surface Prep 脱脂。',
 steps:[
  {ph:'除染',p:['P-iron-buster','P-paint-gloss'],how:'先除铁，再用 Paint Gloss + 黏土处理。'},
  {ph:'切削',vars:[
    {n:'Recovery 系列',p:['P-intervention'],r:'即用',how:'4–5 小滴，轻到中等压力，每次 60 × 60 cm。'},
    {n:'Double Black 系列',p:['P-ego-maker'],r:'即用',how:'配强制旋转或旋转机，去砂纸痕和划痕。'},
  ]},
  {ph:'整平（需要时）',p:['P-rehab','P-deep-finish'],alt:true,r:'即用',how:'去掉切削留下的细痕。'},
  {ph:'收光',p:['P-therapy','P-envy'],alt:true,r:'即用',how:'收光盘、轻压，抛出最高光泽。'},
  {ph:'脱脂',p:['P-paint-prep'],r:'即用',how:'喷湿漆面，停留 30 秒后用超纤布擦净，勤翻毛巾。'},
 ],
 x:['Ego Maker、Deep Finish 不含蜡和硅油，钣喷车间可用。'],
 u:PS+'paint-coating-surface-prep-doubleblack-collection'},

{id:'f-p-coat',b:'P',name:'Inspiration 镀膜与维护',en:'P&S Inspiration Coating',sc:'coated',tags:['镀膜前'],
 sum:'官方商城和 inspirationcoating.com 的流程：完成抛光 → Paint Coating Surface Prep 清洁 → 涂 Inspiration Classic 或 STOUT → 至少 1 小时后可罩 SOLE 或 Defender → 2–3 小时内不要淋雨，48–72 小时完全固化；日常用 Radiance 洗车。',
 steps:[
  {ph:'抛光',p:['P-rehab','P-deep-finish'],alt:true,how:'按漆面状况完成抛光（见「漆面抛光」流程）。'},
  {ph:'脱脂',p:['P-paint-prep'],r:'即用',how:'喷湿漆面，停留 30 秒后擦净，镀膜前仔细检查。'},
  {ph:'镀膜',p:['P-inspiration-classic','P-stout','P-applicator'],how:'Classic 或 STOUT 任选，按包装说明施工；STOUT 闪干 30 秒–2 分钟后用两块布流平。'},
  {ph:'面层（可选）',p:['P-sole','P-defender'],alt:true,r:'即用',how:'镀膜定型后（至少 1 小时）再罩；Defender 喷上抹开，稍等后翻面擦亮。'},
  {ph:'日常维护',p:['P-radiance'],r:'1:21',how:'每加仑水 6 oz 洗车，冲净擦干，补强镀膜。'},
 ],
 x:['镀膜后至少 2–3 小时不要让车淋雨，48–72 小时完全固化。','Inspiration 官方定位为专业产品，建议由认证施工店施工。'],
 u:'https://inspirationcoating.com/process/'},

{id:'f-p-glass',b:'P',name:'玻璃研磨与 VUE 玻璃镀膜',en:'P&S Glass Restoration & VUE',sc:'coated',tags:['玻璃'],
 sum:'VUE 产品页推荐的组合：Clarity Creme 研磨玻璃 → Paint Coating Surface Prep 清洁 → VUE 玻璃镀膜；平时用 True Vue 或 REFLECT 清洁。',
 steps:[
  {ph:'玻璃研磨',p:['P-clarity'],r:'即用',how:'轻度手工、中度以上用机器配海绵或羊毛盘，重叠研磨，干成雾状后擦亮。'},
  {ph:'清洁',p:['P-paint-prep'],r:'即用',how:'喷湿玻璃后擦净。'},
  {ph:'玻璃镀膜',p:['P-vue'],r:'即用',how:'用附带的施工块涂抹。'},
  {ph:'日常清洁',p:['P-true-vue','P-reflect'],alt:true,r:'即用',how:'喷上后用玻璃布擦净、擦亮；REFLECT 同时补一层 SiO₂ 保护。'},
 ],
 x:['VUE 约可保持 6 个月以上。'],
 u:PS+'inspiration-vue-glass-coating-doubleblack-collection'},
];
