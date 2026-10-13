// Koch-Chemie（德国 Unna，Koch-Chemie GmbH）产品与流程数据。
// 来源：koch-chemie.com 英文版产品页（/en/products/…）、官方产品信息 PDF（/pdf/datasheet/…_en.pdf）、
//       官方 ExpertBlog（KCx Protection Unit，2026-09），2026-10 整理翻译。
// 比例写法沿用官方：1:10 = 1 份原液 + 10 份水；官方给 ml/L 时换算为 1:x，括号内保留原文。
// 仅收录汽车美容（Detailing / Car Care）相关产品；洗车房龙门/隧道系统、货车、工业、地面、卫生、船舶、香精类不收录。
const KOCH = 'https://www.koch-chemie.com/en/products/';
const KOCH_BLOG_KCX = 'https://www.koch-chemie.com/en/company/expertblog/kcx-protection-unit';

const KOCH_COAT_PREP = [
  '用碱性清洁剂彻底预洗（官方示例：Green Star 1:10），不要使用带封体成分的香波。',
  '树脂、锈斑（铁粉）、柏油等重度污染先用清洁泥（Reinigungsknete）或 Teerwäsche A 预处理。',
  '按漆面状况机抛：重度至中度氧化用 Heavy Cut 或 Fine Cut；轻度氧化/去太阳纹用 Micro Cut（偏心机强制转动模式，如 Makita PO5000C）。',
  '用 Polish & Sealing Towel 去除所有抛光残留。',
  '用蘸有 Silicon- & Wachsentferner 或 Panel Preparation Spray 的布轻压擦拭全部表面，未干前立即用第二块干净布擦净；单层素色漆等敏感漆面将 Silicon- & Wachsentferner 用（最好是蒸馏）水 1:4 稀释，避免发哑。',
  '在良好光线下检查漆面无划痕、无太阳纹。处理后不要徒手触摸漆面，必须戴手套（皮肤接触会影响附着）。',
];
const KOCH_CERAMIC_RULES = [
  '产品遇空气湿度反应，开瓶时瓶口可能结晶；结晶若沾到施工布会划伤漆面，使用前务必检查并擦掉。',
  '温度和湿度越高，闪干时间越短（官方示例：20 °C、湿度 43% 约 6 分钟）；低于 15 °C 固化变慢。',
  '至少 24 小时后才耐候；首次洗车最早在 9 天后。前 9 天内鸟粪、虫尸要及时轻柔去除。',
  '24 小时后建议用 Spray Sealant 或 Hand Wax W0.01 作保护层。',
  '日常避免使用 pH 低于 3 或高于 12 的清洁剂。开封后最多保存 6 个月。',
];

P.push(
// ───────────────────────── Koch-Chemie · 预洗 ─────────────────────────
{id:'K-gsf',b:'K',c:'pre',n:'Gsf Gentle Snow Foam',t:'中性雪泡预洗 / 手洗香波（樱桃香）',f:'1 L · 5 L',m:'车漆 · 已打蜡 / 封体表面',
 d:[['雪泡预洗（泡沫喷壶）','1:50（20 ml/L）','喷雾壶'],['手洗','1:200（50 ml/10 L）','桶洗'],['活性泡沫（加强版）','预混液中另加 10–30 ml Green Star','喷雾壶']],
 s:['雪泡：每升水加约 20 ml，用泡沫喷壶把整车打满泡沫。','需要时再用洗车手套等清洗，然后用清水冲净。','手洗：10 L 水加 50 ml，用洗车手套清洗后冲水。','顽固污垢和虫尸：在已稀释好的 Gsf 溶液中加入 10–30 ml Green Star，变成活性泡沫。'],
 x:['pH 中性，不会侵蚀蜡和封体；泡沫均匀湿润、附着时间长。','官方注明也可用于 PA壶（Foam gun），但未给出壶内比例，请参照雪泡浓度自行调整。','不要让产品在表面干掉；使用前先确认材质兼容。'],u:KOCH+'gentle_snow_foam'},

{id:'K-green-star',b:'K',c:'pre',n:'Green Star',t:'浓缩碱性通用清洁剂（预洗 / APC）',f:'1 L · 5 L · 11 kg · 22 kg · 225 kg',m:'车漆 · 塑料 · 轮毂 · 发动机舱 · 内饰织物 · 阳极氧化铝',
 d:[['车身外部、发动机（视脏污）','1:5 – 1:30','喷雾壶'],['内饰与织物','1:10 – 1:20','喷雾壶'],['镀膜 / 封体施工前预洗（官方）','1:10','喷雾壶'],['VDA A 级上限','最浓 1:3，作用 ≤ 5 分钟','—']],
 s:['外部和发动机：整面喷涂，短暂作用后用高压水彻底冲洗。','内饰和织物：用湿布或干湿两用吸尘器去除残留。'],
 x:['不含磷酸盐和溶剂，含缓蚀剂，可保护阳极氧化铝等敏感材料；VDA A 级。','不要在热表面使用，不要让其干在表面。','用于喷抽机或地毯清洗机时，官方建议加入 KocEntschäumer 消泡剂。','也可加入 Gsf 溶液做活性泡沫（见 Gsf）。'],u:KOCH+'green_star'},

{id:'K-insect-dirt-remover',b:'K',c:'pre',n:'Insect & Dirt Remover',t:'碱性去虫尸 / 环境污垢预处理',f:'10 kg（另有 Insect & DirtRemover 零售装）',m:'车身外部 · 发动机舱',
 d:[['虫尸、油污等局部预处理','原液','喷雾壶']],
 s:['原液直接喷在污染表面。','作用约 1–3 分钟。','需要时用洗车海绵/手套辅助。','彻底冲洗。','再用 NanoMagic Shampoo 手洗，或进洗车房。'],
 x:['不要在热表面使用，不要让其干在表面。','使用前先确认材质兼容。'],u:KOCH+'insectdirt_remover'},

{id:'K-vorreiniger-b',b:'K',c:'pre',n:'Vorreiniger B',t:'高泡碱性预洗剂（高浓缩）',f:'1.1 kg · 5 kg · 11 kg · 22 kg · 225 kg',m:'轿车 · 商用车 · 钢圈 · 耐碱烤漆铝圈',
 d:[['预洗','1:30 – 1:50','喷雾壶'],['轮毂清洗','1:3 – 1:10','喷雾壶'],['去 Copolymer 蜡层','1:5 – 1:10','喷雾壶'],['自助高压洗车','1:300','—']],
 s:['整面喷涂。','短暂作用：VDA A 级最长 5 分钟，B 级最长 1 分钟。','用高压水彻底冲洗。'],
 x:['VDA A 级最高使用浓度 1:300，B 级 1:30。','不含磷酸盐，含缓蚀剂（保护阳极氧化铝）；适合非接触式高压洗车。','不要在热表面使用，不要让其干在表面。'],u:KOCH+'vorreiniger_b'},

// ───────────────────────── 洗车香波 / 免冲洗 ─────────────────────────
{id:'K-nanomagic-shampoo',b:'K',c:'wash',n:'NanoMagic Shampoo',t:'纳米保护洗车香波（一步清洁 + 长效保护）',f:'750 ml · 10 kg',m:'车漆',
 d:[['手洗','1:200（约 50 ml / 10 L 温水，5 瓶盖）','桶洗']],
 s:['10 L 温水中加入约 50 ml（5 瓶盖）。','用洗车海绵/手套清洗车辆。','用柔和水流冲洗。','用布擦去残余水分；可再用 AllroundQuickShine 让擦干更容易、提升光泽。'],
 x:['保留已施工的蜡和封体，并留下持久的拒水纳米层。','官方推荐用于 1K-Nano 封体的日常手洗维护。'],u:KOCH+'nanomagic_shampoo'},

{id:'K-ceramic-effect-shampoo',b:'K',c:'wash',n:'Ceramic Effect Shampoo',t:'陶瓷效果养护香波（洗护一步）',f:'1 L',m:'车漆 · 玻璃 · 塑料 · 镀膜 / 封体车',
 d:[['手洗','1:200（50 ml / 10 L）','桶洗']],
 s:['重度脏污先预洗。','在洗车桶中按比例稀释并短暂打泡。','用洗车海绵或 Exterior Wash Mitt 清洗。','用大量清水彻底冲洗，不要让产品干在表面。','用 Pro Drying Towel 擦干。','分区施工。'],
 x:['可延长 Ceramic Body、Spray Sealant 等已施工保护层的寿命；表面顺滑、强拒水；莓果杏仁香。','使用前摇匀；不要在热表面或阳光直射下使用；防冻防高温。'],u:KOCH+'ceramic_effect_shampoo'},

{id:'K-reactivation-shampoo',b:'K',c:'wash',n:'Reactivation Shampoo',t:'酸性镀膜除垢香波（激活镀膜）',f:'1 L',m:'车漆 · 玻璃 · 外部塑料 · 陶瓷镀膜',
 d:[['手洗','1:200（50 ml / 10 L）','桶洗'],['PA壶','按比例相应调整预稀释（官方未给数值）','PA壶']],
 s:['先用碱性预洗剂和高压水去除粗污。','预洗后车身仍湿时，用洗车海绵清洗。','彻底冲洗，避免留下水渍。','擦干残余水分。'],
 x:['1:200 时 pH 约 3.0。去除灰尘、水垢、盐分等吸水污垢，恢复镀膜的易洁和拒水性能。','不要让其干在表面；建议戴手套；防冻防高温。'],u:KOCH+'reactivation_shampoo'},

{id:'K-glanzwachsshampoo',b:'K',c:'wash',n:'Glanzwachsshampoo',t:'含蜡光亮手洗香波（速干）',f:'10 kg · 21 kg · 210 kg',m:'轿车 · 摩托车 · 房车 · 商用车',
 d:[['手洗','1:200（50 ml / 10 L）','桶洗']],
 s:['用洗车海绵或手套手洗，再用清水冲洗。','用擦干布擦干，避免水垢斑。'],
 x:['含阳离子表面活性剂和养护成分，冲水后水膜迅速散开、利于干燥；Daimler 认可，VDA A 级。','不要让其干在表面。'],u:KOCH+'glanzwachsshampoo'},

{id:'K-autoshampoo',b:'K',c:'wash',n:'Autoshampoo',t:'通用洗车香波（手洗 / 洗车设备）',f:'1 L · 21 kg · 210 kg',m:'车漆',
 d:[['手洗','1:150','桶洗'],['洗车设备（计量泵）','原液 – 1:10（每车 6–10 ml）','—']],
 s:['手洗：按 1:150 稀释后清洗。','洗车设备：用计量泵原液或 1:10 稀释加注，每车约 6–10 ml。'],
 x:['不含磷酸盐和 NTA；VDA A 级。','不要让其干在表面。'],u:KOCH+'autoshampoo'},

{id:'K-active-foam',b:'K',c:'wash',n:'Active Foam',t:'高浓缩芳香强力泡沫（檀香味）',f:'10 kg · 21 kg · 210 kg',m:'车身外部',
 d:[['洗车设备（计量泵）（计量泵）','原液 – 1:10','—'],['手洗','1:300','桶洗'],['VDA A 级最高使用浓度','1:100','—']],
 s:['手洗：按 1:300 在水桶中稀释，用洗车手套清洗后冲水。','洗车机 / 自助洗车：原液或稀释至 1:10 后经计量泵投加；建议用量每车泡沫 3–8 ml，香波 1–3 ml。','作用时间最长 5 分钟（VDA A 级），不要让其干在表面。'],
 x:['不含磷酸盐和 NTA，阴离子表面活性剂含量高，泡沫丰富；适用于洗车龙门、洗车房、自助洗车和手洗，可用于生物法循环水处理设备。','黏度较高，用计量泵投加时可能需要先预稀释。','官网未注明 pH 值和适用材质；使用前先确认材质兼容。'],u:KOCH+'active_foam'},

{id:'K-rapid-rinseless-wash',b:'K',c:'wash',n:'Rapid Rinseless Wash',t:'免冲洗洗车浓缩液',f:'1 L · 5 L',m:'车漆 · 玻璃 · 塑料',
 d:[['洗车桶','1:250（4 ml/L）','桶洗'],['喷壶','1:250','喷雾壶']],
 s:['在阴凉处、车身冷却且触感干燥时施工；阳光下逐块施工，每块擦干后再进行下一块。','洗车桶法：在 Detailing 桶（需要时加隔砂网）中调配，用洗车海绵或毛巾涂在轻度脏污的车上，再用干净干燥的 Polish & Sealing Towel 带走污垢。','喷壶法：按 1:250 装瓶，均匀喷在表面，用干净干燥的 Polish & Sealing Towel 擦去污垢。','必要时换干净毛巾重复。'],
 x:['只适合轻度脏污车辆；一步清洁、养护、保护，保留已施工的蜡和抛光层。','使用前摇匀；防冻防高温。'],u:KOCH+'rapid_rinseless_wash'},

{id:'K-wash-finish',b:'K',c:'wash',n:'Wash & Finish',t:'即用型无水洗车喷剂',f:'10 L',m:'车漆 · 玻璃 · 塑料 · 轮毂',
 d:[['轻至中度脏污','即用','喷雾壶']],
 s:['用喷壶均匀喷在待处理部位。','用超纤布擦去污垢。','用第二块超纤布擦亮。','重度脏污重复一次。'],
 x:['一步清洁、养护、封体，留下拒水光泽，保留已有的蜡和抛光层。','使用前先确认材质兼容。'],u:KOCH+'wash_finish'},

// ───────────────────────── 轮毂轮胎 ─────────────────────────
{id:'K-magic-wheel-cleaner',b:'K',c:'wheel',n:'Magic Wheel Cleaner',t:'无酸粘稠轮毂清洁剂（铁粉变色）',f:'500 ml · 10 L',m:'烤漆铝合金轮毂 · 高档镀铬轮毂 · 钢圈',
 d:[['轮毂与轮拱内圈','原液','喷雾壶']],
 s:['使用前短暂摇匀。','把轮毂表面和轮毂内圈彻底喷满。','视脏污程度作用 2–5 分钟。','用高压水彻底冲洗。'],
 x:['反应成分溶解铁粉，出现红色变色；粘稠配方附着久、作用期间保持湿润。','不要在发热的轮毂/表面或阳光直射下使用。','官方 Ceramic Rims 施工前推荐用它清洁轮毂。'],u:KOCH+'magic_wheel_cleaner'},

{id:'K-reactive-wheel-cleaner',b:'K',c:'wheel',n:'ReactiveWheelCleaner',t:'无酸反应型轮毂清洁剂（零售装）',f:'750 ml',m:'高档轮毂',
 d:[['整只轮毂','即用','喷雾壶']],
 s:['喷满已冷却的整只轮毂。','作用 1–3 分钟；重度脏污可延长到 10 分钟。','需要时用海绵或刷子辅助。','用强力水流彻底冲洗，或直接进洗车房。'],
 x:['红色反应指示，含光亮添加剂，留下光泽和荷叶效应。','使用前先确认材质兼容。'],u:KOCH+'reactivewheelcleaner'},

{id:'K-felgenblitz-saeurefrei',b:'K',c:'wheel',n:'Felgenblitz säurefrei',t:'中性粘稠轮毂凝胶（无酸）',f:'5 L · 11 kg · 19 kg',m:'铝合金 · 钢 · 镀铬轮毂',
 d:[['轮毂','原液','喷雾壶']],
 s:['原液喷在轮毂上。','作用约 3 分钟。','需要时用刷子刷洗。','用高压水彻底冲洗；顽固污垢重复一次。','敏感轮毂要把螺栓孔和凹槽内的残留冲净，必要时擦干。'],
 x:['pH 中性，去除烧结刹车粉、锈迹等无机污垢；红色显示清洁效果；含拒水和光亮添加剂。','抛光铝等敏感轮毂先在不显眼处测试。'],u:KOCH+'felgenblitz_saeurefrei'},

{id:'K-alkali-wheel-cleaner',b:'K',c:'wheel',n:'Alkali Wheel Cleaner',t:'强碱性轮毂清洁剂（低雾低泡）',f:'5 L · 20 L',m:'钢圈 · 耐碱烤漆铝圈',
 d:[['轮毂（视脏污）','1:2 – 1:10','喷雾壶']],
 s:['先冲湿轮毂，再把稀释液均匀涂满整只轮毂，避免流挂。','短暂作用。','需要时用刷子辅助。','用高压水彻底冲洗。'],
 x:['刹车粉溶解速度接近酸性轮毂清洁剂。','不可用于抛光铝、镀铬等不耐碱表面；不适合用来去饰条上的虫尸或锈膜。','不要在热表面使用，不要让其干在表面。'],u:KOCH+'alkali_wheel_cleaner'},

{id:'K-felgenreiniger-k',b:'K',c:'wheel',n:'Felgenreiniger K',t:'高浓缩酸性轮毂清洁剂',f:'1.2 kg · 12 kg · 23 kg · 250 kg',m:'耐酸表面：车漆 · 玻璃 · 陶瓷 · 金属件',
 d:[['轮毂 / 耐酸表面（视脏污）','1:3 – 1:20','喷雾壶']],
 s:['先冲湿表面，按脏污程度把稀释液涂满。','短暂作用。','需要时用刷子或海绵辅助。','用高压水彻底冲洗。'],
 x:['去除锈斑、水垢、刹车颗粒等无机污垢；含缓蚀剂，提供暂时防锈；Daimler 认可。','不要用于敏感的未涂装塑料（可能变色）；不要在热表面使用，不要让其干在表面。'],u:KOCH+'felgenreiniger_k'},

{id:'K-triple-acid-star',b:'K',c:'wheel',n:'Triple Acid Star',t:'强效酸性轮毂清洁剂（含氟氢化铵）',f:'11 kg · 23 kg · 225 kg',m:'钢圈 · 耐酸烤漆铝圈',
 d:[['轮毂（视脏污）','1:3 – 1:10','喷雾壶']],
 s:['先用水冲湿轮毂，避免浓液飞溅。','把稀释液涂在湿轮毂上。','短暂作用。','需要时用刷子辅助。','用高压水彻底冲洗。'],
 x:['不可用于玻璃、镜面、大理石及锌、铝等未保护金属。','不要在热表面使用，不要让其干在表面；请阅读安全数据表。'],u:KOCH+'triple_acid_star'},

// ───────────────────────── 除染 / 去水垢 ─────────────────────────
{id:'K-reactive-rust-remover',b:'K',c:'deco',n:'Reactive Rust Remover',t:'无酸除铁粉 / 除锈剂（变紫）',f:'500 ml · 11 kg',m:'车漆 · 玻璃 · 轮毂',
 d:[['车漆 / 玻璃 / 轮毂','原液','喷雾壶']],
 s:['原液喷在表面。','作用约 3–6 分钟，溶解后变为紫色。','需要时用刷子或海绵辅助。','彻底冲洗。'],
 x:['去除表面锈斑、金属颗粒、烧结刹车粉等无机污染。','抛光铝等敏感表面先在不显眼处测试。','不要在热表面使用，不要让其干在表面。'],u:KOCH+'reactive_rust_remover'},

{id:'K-flugrostentferner-bmp',b:'K',c:'deco',n:'Flugrostentferner BMP',t:'高浓缩酸性除锈斑剂',f:'12 kg · 23 kg · 250 kg',m:'耐酸表面：车漆 · 玻璃 · 陶瓷 · 金属件',
 d:[['锈斑 / 水垢 / 刹车颗粒（视脏污）','1:3 – 1:20','喷雾壶']],
 s:['先冲湿表面。','把稀释液涂满整个已冲湿的区域。','短暂作用。','需要时用刷子或海绵辅助。','用高压水彻底冲洗。'],
 x:['含缓蚀剂；Daimler 认可。','不要用于敏感的未涂装塑料（可能变色）；不要在热表面使用，不要让其干在表面。'],u:KOCH+'flugrostentferner_bmp'},

{id:'K-teerwaesche-a',b:'K',c:'deco',n:'Teerwäsche A',t:'溶剂型柏油 / 沥青清洁剂',f:'1 L · 10 L · 20 L',m:'耐溶剂表面',
 d:[['柏油 / 沥青','原液（干燥表面）','喷雾壶']],
 s:['原液施用于干燥表面。','短暂作用。','需要时手工辅助。','用高压水冲掉，或用布擦去。'],
 x:['不含卤代烃；Daimler 认可。官方镀膜施工前处理中推荐用于去柏油。','与乳化型清洁剂一起使用会影响油水分离器；禁止排入下水道。'],u:KOCH+'teerwaesche_a'},

{id:'K-eulex',b:'K',c:'deco',n:'Eulex',t:'速干型除胶 / 去污剂',f:'1 L',m:'耐溶剂表面：车漆 · 玻璃 · 陶瓷 · 金属',
 d:[['胶痕、树脂、漆雾、墨水、油脂、柏油（超纤布）','原液','—']],
 s:['用干燥吸水布蘸原液敷在污渍上。','擦除。'],
 x:['快速挥发、无残留，不含卤代烃；Daimler 认可。','不适用于聚碳酸酯、亚克力等塑料（如 PC 大灯）。','不要在热表面使用；先检查色牢度和材质兼容性。'],u:KOCH+'eulex'},

{id:'K-eulex-m',b:'K',c:'deco',n:'Eulex M',t:'低气味除胶剂（可用于哑光漆）',f:'1 L',m:'车漆（含哑光漆）· 玻璃 · 陶瓷 · 金属',
 d:[['胶痕、树液、橡胶印','原液','喷雾壶']],
 s:['哑光漆：原液喷在已冷却的表面。','停留 1–3 分钟。','需要时用软海绵不加压擦拭，避免改变反光或颜色。','用高压水彻底冲洗。','再用 NanoMagic Shampoo 清洗、冲水，不加压小心擦干。','普通车漆和玻璃：松动的残留可直接用布擦去，无需高压水。'],
 x:['不易燃、挥发慢、低气味，不含卤代烃；Daimler 认可。','不适用于聚碳酸酯、亚克力等塑料。不要让其干在表面，不要在热表面使用。'],u:KOCH+'eulex_m'},

{id:'K-orange-power',b:'K',c:'deco',n:'Orange Power',t:'橙油除胶 / 树脂 / 橡胶印',f:'1 L · 10 L',m:'耐溶剂表面：车漆 · 玻璃 · 陶瓷 · 金属',
 d:[['胶痕、橡胶、树脂、墨水、柏油、口香糖（超纤布）','原液','—']],
 s:['用干燥吸水布把原液擦或喷在污渍上。','作用 1–3 分钟。','擦去，或用高压/蒸汽设备冲掉。'],
 x:['天然橙提取物，挥发慢，不含卤代烃，适合去车身贴纸残胶。','先检查色牢度和材质兼容性。'],u:KOCH+'orange_power'},

{id:'K-reinigungsknete-blau',b:'K',c:'deco',n:'Reinigungsknete blau',t:'清洁泥（温和型）',f:'1 块',m:'车漆 · 玻璃等光滑表面',
 d:[['配合 Clay Spray','—','—']],
 s:['先用合适的产品彻底洗车。','取掌心大小一块捏扁。','在表面喷 Clay Spray。','不加压在表面来回移动，直到表面光滑干净。','把污垢揉进泥块内部，直到泥面重新干净。','可用到泥块几乎被污染颗粒饱和为止。','用后保持湿润，放回盒中保存，防止变干。'],
 x:['去除树脂、虫尸、锈斑、工业粉尘、漆雾、柏油、水垢斑；用于抛光前或更换雨刮前的深度清洁。','官方 Ceramic Glass 流程建议玻璃用蓝色清洁泥。'],u:KOCH+'reinigungsknete_blau'},

{id:'K-reinigungsknete-rot',b:'K',c:'deco',n:'Reinigungsknete rot',t:'清洁泥（研磨型）',f:'1 块',m:'车漆 · 玻璃等光滑表面',
 d:[['配合 Clay Spray','—','—']],
 s:['用法同蓝色清洁泥：洗车后喷 Clay Spray，不加压移动泥块直至表面光滑。'],
 x:['研磨力强于蓝色版，污染较重时使用；之后可能需要抛光。'],u:KOCH+'reinigungsknete_rot'},

{id:'K-clay-spray',b:'K',c:'deco',n:'Clay Spray',t:'清洁泥润滑剂（不含硅油）',f:'500 ml · 10 L',m:'车漆 · 玻璃',
 d:[['清洁泥 / 泥垫润滑','原液','喷雾壶']],
 s:['原液喷满整个区域。','在湿润表面上用清洁泥或泥垫处理。','用超纤布擦去残留。'],
 x:['低残留、不留膜，减少过泥划痕，不会溶解泥块或泥垫。'],u:KOCH+'clay_spray'},

{id:'K-spotless-ceramic-finish',b:'K',c:'deco',n:'Spotless Ceramic Finish',t:'镀膜车水斑 / 水垢去除剂',f:'Art. 628500 · 628088',m:'车漆（Koch-Chemie Cb0.01 / C0.02 镀膜）',
 d:[['新鲜水斑、水垢（超纤布）','即用（喷在超纤布上）','—']],
 s:['重度脏污先清洁；镀膜车先用 Green Star 预洗。','按说明用 Reactivation Shampoo 洗车，彻底冲洗并彻底擦干。','把 Spotless Ceramic Finish 喷在超纤布上，均匀擦涂，应可见一层薄膜。','视水斑程度停留最多 3 分钟。','用专业超纤布擦亮，必要时再用一块干净干布擦拭。'],
 x:['温和去除镀膜表面的水斑和水垢而不伤镀膜，恢复色深、光泽和顺滑。','使用前摇匀；不要在热表面或阳光下使用；防冻防高温。'],u:KOCH+'spotless_ceramic_finish'},

// ───────────────────────── 研磨抛光 / 施工前处理 ─────────────────────────
{id:'K-heavy-cut-h902',b:'K',c:'polish',n:'Heavy Cut H9.02',t:'粗蜡（研磨 9.0 / 光泽 6.0，不含硅油）',f:'250 ml · 1 L',m:'所有车漆（软漆和耐刮漆）',
 d:[['机抛','原液','—']],
 s:['十字交叉走位施工，中速、中压。','1200–2500 砂痕用羊毛盘；1500–3000 砂痕用 Heavy Cut Pad。','之后用 Micro Cut M3.02 或 Micro Cut & Finish P3.01 精抛，效果最佳。'],
 x:['可快速修复严重氧化漆面，去除深划痕、漆雾和 1200 目以内砂痕；长时间操作不粘、低粉尘。','使用前摇匀；不要在热表面使用；防冻防高温。'],u:KOCH+'heavy_cut_h902'},

{id:'K-heavy-quick-cut-b901',b:'K',c:'polish',n:'Heavy Quick Cut B9.01',t:'快速粗蜡（研磨 9.0 / 光泽 5.5，不含硅）',f:'250 ml · 1 L',m:'修补漆与原厂漆（各类漆面）',
 d:[['机抛','原液','—']],
 s:['用抛光机和抛光盘十字交叉施工。','中速、中压抛出。','之后用 Micro Cut M3.02 精抛，效果最佳。'],
 x:['去除 1200 目及更细的漆雾和砂痕；可用于新喷漆面，不飞溅、低粉尘。','使用前摇匀；不要在热表面使用；防冻防高温。'],u:KOCH+'heavy_quick_cut_b901'},

{id:'K-schleifpaste-h701',b:'K',c:'polish',n:'Schleifpaste H7.01',t:'粗蜡（研磨 7.5 / 光泽 3.0，不含硅油）',f:'250 ml · 1 L',m:'车漆（不适用耐刮漆）',
 d:[['机抛','原液','—']],
 s:['挤在硬白盘或中硬黄盘上。','在已预清洁的表面十字交叉抛光，转速不超过 2000 rpm。','先低速高压，再逐渐减压、高速收尾；研磨力可通过压力、盘和转速调节。','用 Profi 超声波切边超纤布去除残留；残留抛痕用高光去太阳纹抛光剂处理。'],
 x:['去除漆雾和 P2000 以内砂痕。不适用于耐刮漆。','使用前摇匀；不要在热表面使用；防冻防高温。'],u:KOCH+'schleifpaste_h701'},

{id:'K-fine-cut-f601',b:'K',c:'polish',n:'Fine Cut F6.01',t:'中蜡（研磨 6.0 / 光泽 7.0，不含硅油）',f:'250 ml · 1 L',m:'车漆（含耐刮漆）',
 d:[['机抛','原液','—']],
 s:['挤在 Fine Cut Pad 或羊毛盘上。','在已预清洁的表面十字交叉抛光，转速不超过 2000 rpm。','先低速高压，再减压提速直至高光。','用 Profi 超声波切边超纤布去除残留；残留抛痕用 Micro Cut M3.02 去除。'],
 x:['快速彻底去除洗车划痕等使用痕迹，去除 2500 目砂痕；适合中度至重度氧化漆面，专为耐刮漆设计。','使用前摇匀；不要在热表面使用；防冻防高温。'],u:KOCH+'fine_cut_f601'},

{id:'K-one-cut-finish-p602',b:'K',c:'polish',n:'One Cut & Finish P6.02',t:'一步抛光 + 封体（研磨 6.0 / 光泽 8.0）',f:'250 ml · 1 L',m:'车漆（不可用于涂装塑料和橡胶）',
 d:[['机抛','原液','—']],
 s:['搭配 One Cut Pad；用行程 ≥ 15 mm 的大行程偏心机或强制转动偏心机。','在盘上均匀点 5 颗豌豆大小。','最低速把抛光剂铺开，再中压十字交叉抛光。','用超声波切边 Polish & Sealing Towel 去除残留。'],
 x:['一步去除抛光雾、太阳纹、划痕和 P2000 砂痕并封体；含巴西棕榈蜡和不挥发硅，不是无硅产品（不适合镀膜前使用）。','该产品用过的海绵盘不要换用其他产品。不要在热表面使用；防冻防高温。'],u:KOCH+'one_cut_finish_p602'},

{id:'K-micro-cut-m302',b:'K',c:'polish',n:'Micro Cut M3.02',t:'细蜡 / 去太阳纹（研磨 3.2 / 光泽 9.0，不含硅油）',f:'250 ml · 1 L',m:'所有车漆（含耐刮漆）',
 d:[['机抛','原液','—']],
 s:['用强制转动偏心机（如 Makita PO5000C，最高档），或旋转机配 Micro Cut Pad。','新盘或已干的盘先用抛光剂完全浸润；不要用沾过其他产品的盘。','机器停止时把抛光剂均匀涂在表面，再中压十字交叉抛光，直到出现透明薄膜（氧化铝已完全破碎）。','用无包边、超声波切边的 Profi 超纤布去除残留。'],
 x:['机械去除抛痕、太阳纹、细划痕和 P3000 砂痕，而非填充遮盖；深色漆也能高光。','使用前摇匀；不要在热表面使用；防冻防高温。'],u:KOCH+'micro_cut_m302'},

{id:'K-micro-cut-finish-p301',b:'K',c:'polish',n:'Micro Cut & Finish P3.01',t:'细蜡 + 巴西棕榈蜡封体（研磨 3.2 / 光泽 9.5）',f:'250 ml · 1 L',m:'所有车漆（含耐刮漆）',
 d:[['机抛','原液','—']],
 s:['用 Micro Cut Pad 配强制转动偏心机（如 Makita PO5000C，最高档），或旋转机。','新盘或已干的盘先用抛光剂完全浸润。','机器停止时把抛光剂均匀涂在表面，中压十字交叉充分抛开，最后轻压收尾。','用超声波切边 Profi 超纤布去除残留。'],
 x:['去除抛痕、太阳纹、细划痕和 P3000 砂痕，同时留下长效封体；含巴西棕榈蜡和不挥发硅，不是无硅产品。','该产品用过的盘不要换用其他产品。使用前摇匀；不要在热表面使用。'],u:KOCH+'micro_cut_finish_p301'},

{id:'K-micro-cut-m202',b:'K',c:'polish',n:'Micro Cut M2.02',t:'高光去太阳纹抛光剂（研磨 2.5 / 光泽 9.0，不含硅油）',f:'250 ml · 1 L',m:'所有车漆（不可用于涂装塑料和橡胶）',
 d:[['机抛','原液','—']],
 s:['用行程 ≥ 15 mm 的偏心机或强制转动偏心机，配 Micro Cut Pad。','均匀点在盘上，最低速铺开。','中压十字交叉抛光，直到出现透明薄膜。','用超声波切边 Polish & Sealing Towel 去除残留。'],
 x:['去除 4000 目起的抛光雾、太阳纹、细划痕，适合深色等敏感颜色；易抛、易擦、无残留。','该产品用过的盘不要换用其他产品。不要在热表面使用；防冻防高温。'],u:KOCH+'micro_cut_m202'},

{id:'K-lack-polish-violett',b:'K',c:'polish',n:'Lack-Polish violett P2.03',t:'研磨光亮抛光剂（研磨 2.0 / 光泽 9.3）',f:'1 L · 5 L',m:'车漆（轻至中度氧化）',
 d:[['机抛 / 手抛','原液','—']],
 s:['追求切削：旋转机中速 + Fine Cut Pad。','追求收尾：偏心机 + Polish & Sealing Pad（轻度氧化、高光）。','也可手工施工。','用 Polish & Sealing Towel 把残留擦到高光。'],
 x:['使用前摇匀；不要在热表面使用；防冻防高温。'],u:KOCH+'lack_polish_violett_p203'},

{id:'K-lack-polish-gruen',b:'K',c:'polish',n:'Lack-Polish grün P1.03',t:'收尾抛光剂（研磨 1.0 / 光泽 9.5）',f:'1 L',m:'新车或近新车漆',
 d:[['机抛 / 手抛','原液','—']],
 s:['推荐偏心机 + Polish & Sealing Pad，薄而均匀地施工。','手工施工用同样柔软的海绵。','用 KCX Polish & Sealing Towel 擦去残留。','需要一点研磨力时，可用旋转机 + Fine Cut Pad。'],
 x:['保护、养护并提升新车漆的光泽深度和色深。','使用前摇匀；不要在热表面使用；防冻防高温。'],u:KOCH+'lack_polish_gruen_p103'},

{id:'K-headlight-polish-set',b:'K',c:'polish',n:'Headlight Polish Set',t:'PMMA 大灯翻新套装（Headlight Polish 1 + 2）',f:'套装（Polish 1、2 各 250 ml，约可做 50 只大灯）',m:'PMMA 大灯',
 d:[['机抛','原液','—']],
 s:['清洁大灯，用胶带遮蔽引擎盖、翼子板、格栅和保险杠边缘。','视老化程度用手磨块或偏心机打磨：严重发黄从 1000 目开始，再依次 2000、4000 目直到均匀；轻微发哑可跳过打磨。','去砂痕：Headlight Polish 1 + Heavy Cut Pad 或羊毛盘，旋转机中速、中压、十字交叉。','终抛：Headlight Polish 2（含封体成分）+ Thermo Pad，旋转机中速、中压、十字交叉直至高光。'],
 x:['套装含 Heavy Cut Pad 76×23 mm、羊毛盘 80 mm、Thermo Pad 76×23 mm（变色显示表面温度）、Abralon 1000/2000/4000 目砂纸和魔术贴手磨块。','施工前请遵守当地有关大灯处理的法规。'],u:KOCH+'headlight_polish_set'},

{id:'K-metal-polish',b:'K',c:'polish',n:'Metal Polish',t:'金属抛光剂（去锈 + 保养）',f:'Art. 507075',m:'金属 · 镀铬',
 d:[['手抛（超纤布）','原液','—']],
 s:['把抛光剂挤在超纤布上，轻压在表面擦开。','再用干净柔软的超纤布擦亮。'],
 x:['一步去锈去污并保养，提升金属本色光泽，留下强拒水效果。','不适用于铝和阳极氧化饰条。'],u:KOCH+'metal_polish'},

{id:'K-silicon-wachsentferner',b:'K',c:'polish',n:'Silicon- & Wachsentferner',t:'醇基除硅除蜡剂（镀膜 / 喷漆前脱脂）',f:'5 L',m:'耐溶剂漆面与塑料 · 玻璃 · 金属',
 d:[['常规漆面（超纤布）','原液 – 1:4','—'],['单层素色漆等敏感漆面（超纤布）','1:4（防发哑）','—']],
 s:['按表面情况原液或稀释至 1:4 施用。','用干净干燥的布擦去。','镀膜前：先用蘸湿的布轻压擦拭，未干前立即用第二块干净布擦净。'],
 x:['去除硅油、蜡、抛光残留等油性物质，为喷漆或 1K-Nano / 陶瓷镀膜做准备；不含卤代烃。','先检查色牢度和材质兼容性。'],u:KOCH+'silicon_wachsentferner'},

{id:'K-panel-preparation-spray',b:'K',c:'polish',n:'Panel Preparation Spray',t:'即用型漆面检查 / 脱脂喷剂',f:'500 ml · 5 L',m:'耐溶剂漆面 · 塑料 · 金属',
 d:[['镀膜 / 封体前脱脂（超纤布）','原液','—']],
 s:['原液施用。','用干净干燥的超纤布（Profi 超纤布）擦去。'],
 x:['醇基，去除油、蜡和抛光残留，同时暴露太阳纹和划痕便于检查；适用于所有镀膜和封体（含 C0.01、1K、W0.01）。不含卤代烃。','先检查色牢度和材质兼容性。'],u:KOCH+'panel_preparation_spray'},

// ───────────────────────── 镀膜 ─────────────────────────
{id:'K-ceramic-body-cb001',b:'K',c:'coat',n:'Ceramic Body Cb0.01',t:'车漆陶瓷镀膜（36 个月以上）',f:'30 ml',m:'车身漆面（轿车 · 商用车 · 摩托车 · 房车 · 船）',
 d:[['整车（用量约 15–30 ml）（施工海绵）','原液','—']],
 s:[...KOCH_COAT_PREP,'用 Application Sponge，或施工块包 Application Towel，按部件逐块施工，用量充足。','两道十字交叉涂抹，直到可见一层薄而连续的液膜。','闪干后先去除多余部分，再用 Coating Towel 干净的一面不加压画圈擦拭；在良好光线下检查高点。','可叠加两层：第一层后约 30 分钟再上第二层（视温湿度）。'],
 x:['预期耐久 36 个月以上；强拒水，耐酸碱清洁剂，抗氧化、盐、酸和虫尸。',...KOCH_CERAMIC_RULES],u:KOCH+'ceramic_body_cb001'},

{id:'K-ceramic-allround-c002',b:'K',c:'coat',n:'Ceramic Allround C0.02',t:'多表面陶瓷镀膜（20–24 个月）',f:'75 ml',m:'车漆 · 外部塑料 · 轮毂',
 d:[['整车（用量约 15–30 ml）（施工海绵）','原液','—']],
 s:[...KOCH_COAT_PREP,'把 Application Towel 包在施工块上，用量充足，按部件快速铺开。','两道十字交叉涂抹，直到可见一层薄而连续的液膜。','闪干后先去除多余部分，再用 Coating Towel 新的一面不加压画圈擦拭；检查高点。','双层施工：两层间隔约 45 分钟（视温湿度）。'],
 x:['耐久 20–24 个月（视负荷），双层 26–30 个月；完全硬化约 9 天。','洗后维护推荐 Hydro Foam Sealant（1:50 – 1:150）或 Spray Sealant。',...KOCH_CERAMIC_RULES],u:KOCH+'ceramic_allround_c002'},

{id:'K-ceramic-neo-c003',b:'K',c:'coat',n:'Ceramic Neo C0.03',t:'KCx 高端陶瓷镀膜（2026 新品）',f:'两种规格',m:'车漆',
 d:[['整车（施工海绵）','原液','—']],
 s:['用碱性清洁剂彻底预洗（Green Star 1:10）。','按需机抛：Heavy Cut 或 Fine Cut，再用 Micro Cut。','用 Polish & Sealing Towel 去除全部抛光残留。','用浸有 Silicon- & Wachsentferner 的干净布轻压擦拭全部表面，未干前立即用另一块干净布擦净，同时检查划痕和太阳纹。','用 Application Sponge 按部件两道十字交叉施工。','闪干后用 Coating Towel 擦至无痕。','至少 24 小时后耐候；首次洗车至少等 9 天。之后温和手洗并做专业养护。'],
 x:['2026 年 9 月 Automechanika 发布的 KCx Protection Unit 之一，提供拒水、光泽和色深，防 UV、融雪盐、鸟粪和腐蚀。','截至 2026-10 官网尚无独立产品页，资料取自官方 ExpertBlog。'],u:KOCH_BLOG_KCX},

{id:'K-1k-nano',b:'K',c:'coat',n:'1K-Nano',t:'单组份纳米漆面封体（约 1 年）',f:'250 ml 铝瓶（附 75 ml 分装瓶）',m:'完全固化的车漆',
 d:[['中型车约 75 ml','原液','—']],
 s:['基础清洁：用碱性产品（如 Green Star）彻底洗车，不用封体香波；树脂、锈斑、柏油用清洁泥、Teerwäsche A 等预处理。','按氧化程度机抛并去除残留；新漆或已抛光漆面戴手套，用 Silicon- & Wachsentferner 擦拭（敏感漆 1:4），未干前用第二块干净布擦干。','在 15–30 °C、通风良好的室内施工。摇匀铝瓶，倒入附带的 75 ml 塑料瓶（中型车通常够用）。','首选偏心机低速、不开强制转动，配黑色收光盘；也可手工用白色海绵分区不加压施工（单层漆和深色素色漆强烈建议机器施工）。','抛约 2–3 分钟，期间补加产品并紧密重叠走位；随后不再加料，继续抛至形成连续、无流挂的薄膜。','再等 2–3 分钟，用干净超纤布手工把干膜擦到高光。','约 1–2 小时硬化；多余残留可在固化后擦掉，或在首次洗车（最早 3 天后）时消失。'],
 x:['耐久约 1 年；配合定期养护（手洗用 NanoMagic Shampoo）及每年检查，最长可达 3 年。','不要用于新补漆（需硬化 6–8 周）；新车原厂漆可直接施工。','只用超声波切边的 Profi 超纤布并准备多块；瓶子拧紧、直立保存，开封后约 1 年内用完。'],u:KOCH+'1k_nano'},

{id:'K-ceramic-rims-cr001',b:'K',c:'coat',n:'Ceramic Rims Cr0.01',t:'烤漆轮毂陶瓷镀膜（最长 12 个月）',f:'30 ml',m:'烤漆轮毂',
 d:[['每只轮毂约 5–7 ml','原液','—']],
 s:['用 Magic Wheel Cleaner 等彻底清洁轮毂，刹车粉等粗污用 Detail Wheel Brush 等工具去除。','用 Polish & Sealing Towel 蘸 Panel Preparation Spray 或 Silicon- & Wachsentferner（1:4，最好用蒸馏水）擦拭全部表面，再用干净毛巾擦干；戴手套，不要徒手触摸。','在 15–25 °C、湿度 40–50% 条件下，用 Application Pen 涂满整个表面并均匀推开，应可见薄而连续的液膜。','闪干后整平，用 Coating Towel 去除多余残留。','可做两层：第一层后约 30 分钟（视温湿度）。'],
 x:['耐久最长 12 个月（视维护）；强拒水，耐酸碱清洁剂，抗盐和刹车粉。',...KOCH_CERAMIC_RULES],u:KOCH+'ceramic_rims_cr001'},

{id:'K-ceramic-glass-cg001',b:'K',c:'coat',n:'Ceramic Glass Cg0.01',t:'KCx 无氟玻璃镀膜（2026 新品）',f:'—',m:'外部玻璃',
 d:[['挡风玻璃等外部玻璃（施工海绵）','原液','—']],
 s:['用 Glass Cleaner 彻底清洁玻璃，需要时用蓝色清洁泥。','按说明用 Glass Pre Polish 去除被侵蚀的表层。','只在干净、干燥、15–25 °C 的玻璃上施工，先做挡风玻璃的一半。','用 Application Sponge 十字交叉推开，直到形成均匀薄膜。','停留 12 分钟后，用 Polish & Sealing Towel 擦亮；已干残留可再加少量镀膜溶解后擦掉。','24 小时内不要扰动，完全固化需 5 天。','日常养护用醇基玻璃清洁剂。'],
 x:['不含氟（PFAS-free），提升雨天视线、减少雨刮使用。','截至 2026-10 官网尚无独立产品页，资料取自官方 ExpertBlog；Glass Pre Polish 未收录。'],u:KOCH_BLOG_KCX},

{id:'K-plast-shield',b:'K',c:'coat',n:'Plast Shield',t:'KCx 未涂装塑料镀膜（2026 新品）',f:'—',m:'未涂装外部塑料（侧裙、保险杠等）',
 d:[['未涂装外部塑料（施工海绵）','原液','—']],
 s:['彻底预清洁（如 Green Star），不要使用溶剂型清洁剂，确保无残留。','用 Application Sponge 均匀涂抹。','停留 12 分钟。','如有多余，用 Coating Towel 擦去。','24 小时内避免机械摩擦。'],
 x:['截至 2026-10 官网尚无独立产品页，资料取自官方 ExpertBlog。'],u:KOCH_BLOG_KCX},

// ───────────────────────── 封体 / 快速养护 ─────────────────────────
{id:'K-hand-wax-w001',b:'K',c:'seal',n:'Hand Wax W0.01',t:'巴西棕榈蜡封体（手工施工）',f:'175 ml',m:'车漆 · 外部塑料件',
 d:[['手工施工（施工海绵）','原液（随附海绵）','—']],
 s:['施工前处理同镀膜：碱性预洗（如 Green Star）、去除重污染、按需机抛并用 Silicon- & Wachsentferner（1:4）脱脂，再在阳光或钠灯下检查。','把随附海绵轻按在罐中蘸取，均匀涂在表面。','等蜡闪干后用超纤布擦亮。','分部件施工（如整块引擎盖做完再做下一块）。'],
 x:['用量少、经济；形成顺滑拒水的高光表面。官方推荐作为陶瓷镀膜 24 小时后的保护层。','前处理后不要徒手触摸漆面（影响交联），请戴手套。','硬或粗糙的洗车工具会更快去掉蜡层；如进洗车房只用纺织布刷系统。'],u:KOCH+'hand_wax_w001'},

{id:'K-spray-sealant',b:'K',c:'seal',n:'Spray Sealant',t:'喷雾封体（高光 + 拒水）',f:'500 ml',m:'车漆',
 d:[['喷在超纤布上（超纤布）','原液（每次 1–2 喷）','—']],
 s:['向干净超纤布喷 1–2 下。','逐部件施工，引擎盖、车顶等大面积分区。','短暂挥发后用干净超纤布擦净所有残留。','不要让产品干在表面；当天不要用化学品洗车。'],
 x:['漆面丝滑、明显加深色泽。官方推荐用于陶瓷镀膜 24 小时后的保护及洗后维护。','使用前摇匀；防冻防高温。'],u:KOCH+'spray_sealant'},

{id:'K-perfectfinish-sealant',b:'K',c:'seal',n:'PerfectFinish Sealant',t:'喷雾封体（可作镀膜面层）',f:'5 L 等',m:'车漆',
 d:[['手工 / 机器（超纤布）','原液（喷在毛巾或海绵盘上）','—']],
 s:['按脏污程度预洗/洗车并彻底擦干。','视漆面情况先用无硅抛光剂处理，再用 Panel Preparation Spray 脱脂。','喷在干净的 Polish & Sealing Towel 上，在连续区域均匀推开，不要直接喷在漆面上。','用干燥的 Polish & Sealing Towel 去除残留。','机器施工：喷在 Polish & Sealing 海绵盘上，用气动或电动偏心机分区抛入，再用干毛巾擦净。','施工后 24 小时内不要洗车。'],
 x:['可单独使用，也可作为现有陶瓷镀膜的面层；强拒水，后续洗车更容易。','不要在热表面、阳光直射或环境温度低于 10 °C 时使用；不要让其干在表面；使用前摇匀。'],u:KOCH+'perfectfinish_sealant'},

{id:'K-hydro-foam-sealant',b:'K',c:'seal',n:'Hydro Foam Sealant',t:'高端湿式封体浓缩液（樱桃香）',f:'1 L',m:'车漆 · 玻璃 · 塑料 · 敞篷软顶',
 d:[['泡沫喷壶 / 泵壶','1:50 – 1:150','喷雾壶'],['PA壶','按比例相应调整预稀释（官方未给数值）','PA壶']],
 s:['把稀释液用泡沫喷壶或泵壶施用在已洗净、仍湿润的车身上。','短暂作用。','彻底冲洗，避免留斑。','擦干残余水分。','每次只调配一次的用量，不要存放稀释液。'],
 x:['手感顺滑、深度光泽，防塑料件褪色和变脆，并可浸润保护敞篷软顶。官方推荐作为 Ceramic Allround 的洗后养护。','防冻防高温。'],u:KOCH+'hydro_foam_sealant'},

{id:'K-wetgloss',b:'K',c:'seal',n:'WetGloss',t:'即用型湿式封体（数周保护）',f:'500 ml · 5 L',m:'所有车身外部表面',
 d:[['整车（约 250 ml，视车型）','即用','喷雾壶']],
 s:['先预洗/洗车。','使用前摇匀。','喷在湿润的车漆上。','用水流彻底冲洗。','彻底擦干，避免水斑。'],
 x:['独立使用的封体，顺滑、光亮、强拒水，保护数周。','不要在热表面使用，不要让其干在表面；防冻防高温。'],u:KOCH+'wetgloss'},

{id:'K-protectorwax',b:'K',c:'seal',n:'ProtectorWax',t:'高端保护水蜡（荷叶效应）',f:'1 L · 10 L · 20 L',m:'车漆 · 洗车设备 / 自助洗车 / 泡沫枪',
 d:[['手工（泡沫喷壶 / 泵壶）','1:33（约 30 ml/L）','喷雾壶'],['计量泵（洗车设备）','原液 – 1:2','—'],['PA壶','按比例相应调整预稀释（官方未给数值）','PA壶']],
 s:['可作热蜡、冷蜡或泡沫蜡使用。','手工：把稀释液用泡沫喷壶或泵壶施用在已洗净、仍湿润的车身上，让其渗透。','用高压水彻底冲洗，避免留斑。','擦干残余水分。','每次只调配一次的用量，不要存放。'],
 x:['不含矿物油烃；高光、长效拒水、易清洁，干燥时不留微水珠；VDA A 级。','洗车设备每车用量：冷/热蜡及泡沫蜡 13–19 ml，Premium 蜡 16–23 ml。','防冻防高温。'],u:KOCH+'protectorwax'},

{id:'K-finish-spray-exterior',b:'K',c:'seal',n:'Finish Spray exterior',t:'带去水垢功能的快速美容剂',f:'1 L',m:'车漆 · 玻璃 · 外部塑料',
 d:[['外部表面','即用','喷雾壶']],
 s:['用喷壶均匀喷在待处理部位。','用 Profi 超纤布擦亮。'],
 x:['无残留去除顽固水垢，一步清洁和保护，恢复色深，留下无痕高光并防止再次脏污。','不要用于内饰或不耐酸表面；不要在热表面使用。'],u:KOCH+'finish_spray_exterior'},

{id:'K-quick-shine-plus',b:'K',c:'seal',n:'Quick & Shine +',t:'全能快速美容喷剂（2026 新版）',f:'1 L · 10 L',m:'车漆 · 玻璃 · 塑料件 · 中控 · 不锈钢 · 漆面家具等',
 d:[['光滑及漆面表面','即用','喷雾壶']],
 s:['均匀喷在待处理表面。','用 Polish & Sealing Towel 擦亮。'],
 x:['一步清洁、养护、保护，保留已施工的蜡和封体；适合展厅车辆和快速整备。旧版 Quick & Shine 已清货。','不要在热表面使用。'],u:KOCH+'quick_shine_1'},

{id:'K-quick-finish',b:'K',c:'seal',n:'Quick Finish',t:'全能快速美容喷剂（不含硅油）',f:'1 L',m:'车漆 · 玻璃 · 塑料件 · 中控 · 不锈钢等',
 d:[['光滑及漆面表面','即用','喷雾壶']],
 s:['均匀喷在待处理表面。','用 Profi 超纤布擦亮。'],
 x:['去除指纹和轻度污垢，留下拒水光泽，保留已有的蜡和抛光层；不含硅油，也适合喷漆车间使用。','不要在热表面使用。'],u:KOCH+'quick_finish'},

{id:'K-allround-quick-shine',b:'K',c:'seal',n:'AllroundQuickShine',t:'全能快速美容剂（零售装）',f:'500 ml',m:'车漆 · 玻璃 · 塑料 · 家具',
 d:[['光滑及漆面表面','即用','喷雾壶']],
 s:['少量均匀地喷在表面。','用干净的布擦亮。'],
 x:['适合中控养护和洗车后的收尾；官方建议在 NanoMagic Shampoo 洗车后使用，让擦干更容易、提升光泽。保留已施工的蜡。','不要在热表面使用。'],u:KOCH+'allroundquickshine'},

// ───────────────────────── 塑料 / 轮胎养护 ─────────────────────────
{id:'K-plast-star-siliconoelfrei',b:'K',c:'trim',n:'Plast Star siliconölfrei',t:'高端外部塑料养护（不含硅油，半哑光）',f:'1 L · 10 L',m:'外部塑料和橡胶件 · 轮胎 · 门密封条',
 d:[['外部塑料 / 橡胶（施工海绵）','原液','—']],
 s:['用海绵均匀涂在干净、干燥的表面。','充分揉入。','完全晾干。'],
 x:['微乳液体系与表面结合，保护数月、高度抗 UV，还原半哑光外观；防止门密封条冻住；Daimler 认可。','不要用于需要防滑的表面（踏板、方向盘、轮胎胎面）。'],u:KOCH+'plast_star_siliconoelfrei'},

{id:'K-plast-star-96',b:'K',c:'trim',n:'Plast Star 96',t:'外部塑料养护 plus（蜡硅分散体）',f:'1 L · 10 L',m:'外部塑料和橡胶件 · 轮胎 · 门密封条',
 d:[['外部塑料 / 橡胶（施工海绵）','原液','—']],
 s:['使用前摇匀。','用海绵均匀涂在干净、干燥的表面。','充分揉入并充分晾干。'],
 x:['长效焕新外观，防止橡胶密封条冻住。','不要用于需要防滑的表面（踏板、方向盘、轮胎胎面）。'],u:KOCH+'plast_star_96'},

{id:'K-hydro-plast-care',b:'K',c:'trim',n:'Hydro Plast Care',t:'水性塑料养护浓缩液（稀释调光泽，香草香）',f:'1 L · 5 L',m:'内外塑料与橡胶：中控 · 门板 · 轮胎 · 保险杠',
 d:[['高光','原液 – 1:1','喷雾壶'],['中等光泽','1:2','喷雾壶'],['缎面','1:3','喷雾壶'],['自然','1:4','喷雾壶']],
 s:['原液或按需稀释，用喷壶或海绵均匀施用。','晾干。','必要时用超纤布擦拭。'],
 x:['不含溶剂，防污防 UV，保持原厂质感。','使用前摇匀；防冻防高温。','不要用于需要防滑的表面（踏板、方向盘、轮胎胎面），不要用于显示屏或聚碳酸酯。'],u:KOCH+'hydro_plast_care'},

{id:'K-gummi-kunststoff-vinylpflege',b:'K',c:'trim',n:'Gummi-, Kunststoff- & Vinylpflege',t:'外部橡胶 / 塑料 / 乙烯基养护（半光）',f:'10 L · 20 L',m:'外部塑料和橡胶件 · 轮胎 · 乙烯基',
 d:[['外部塑料 / 橡胶 / 轮胎（施工海绵）','原液','—']],
 s:['用海绵均匀涂在干净、干燥的表面。','充分揉入。','完全晾干。'],
 x:['清洁并保护，半光效果；Daimler 认可。','不要用于需要防滑的表面（踏板、方向盘、轮胎胎面）。'],u:KOCH+'gummi_kunststoff_vinylpflege'},

{id:'K-gummi-kunststoffpflege-glaenzend',b:'K',c:'trim',n:'Gummi- & Kunststoffpflege glänzend',t:'外部橡胶 / 塑料养护（高光）',f:'10 L',m:'外部塑料和橡胶件 · 轮胎',
 d:[['外部塑料 / 橡胶 / 轮胎（施工海绵）','原液','—']],
 s:['用海绵均匀涂在干净、干燥的表面。','充分揉入。','完全晾干。'],
 x:['清洁并保护，高光效果。','不要用于需要防滑的表面（踏板、方向盘、轮胎胎面）。'],u:KOCH+'gummi_kunststoffpflege_glaenzend'},

{id:'K-kcu-reifenschaum',b:'K',c:'trim',n:'Kcu-Reifenschaum',t:'轮胎养护泡沫（喷罐）',f:'600 ml 喷罐',m:'轮胎侧壁',
 d:[['轮胎侧壁','即用','—']],
 s:['先把轮胎上的污垢全部清除。','用前充分摇匀喷罐。','距离约 20 cm 喷满整个胎侧。','等泡沫开始消退。','需要时用布揉开。'],
 x:['一步清洁、养护、保护，留下持久光泽。','不要用于轮毂、胎面以及摩托车和自行车轮胎。'],u:KOCH+'kcu_reifenschaum'},

{id:'K-nanomagic-plast-care',b:'K',c:'trim',n:'NanoMagicPlastCare',t:'外部塑料 / 橡胶养护（零售装）',f:'500 ml',m:'外部塑料饰条 · 橡胶',
 d:[['外部塑料 / 橡胶（施工海绵）','原液','—']],
 s:['喷在干净海绵上。','均匀涂在已清洁、干燥的表面。','完全晾干。','必要时用软布擦拭。'],
 x:['还原原始外观，抵御环境侵害。','不要用于需要防滑的表面（踏板、方向盘、轮胎）。'],u:KOCH+'nanomagicplastcare'},

{id:'K-kunststoff-faerber-schwarz',b:'K',c:'trim',n:'Kunststoff-Färber schwarz',t:'黑色塑料上色膏（翻新褪色塑料）',f:'软管装（8 支/包）',m:'车外塑料件',
 d:[['褪色 / 老化塑料（施工海绵）','原液（膏状）','—']],
 s:['彻底清洁塑料，去除污垢、油脂和蜡残留。','遮蔽不需要处理的部位。','室温下用细孔、微湿的海绵薄涂一层。','必要时重复。','约 1 小时表干，约 1 周达到完全耐受。'],
 x:['防水，着色、浸润并养护塑料，遮盖力强、耐久性高。','软管用后务必密封。'],u:KOCH+'kunststoff_faerber_schwarz'},

{id:'K-motorplast',b:'K',c:'trim',n:'Motorplast',t:'发动机舱保护剂（耐温 250 °C）',f:'500 ml · 5 L · 20 L · 200 L',m:'发动机 · 壳体 · 橡胶软管 · 动力总成',
 d:[['发动机舱（干或湿表面）','原液','喷雾壶']],
 s:['先预清洁。','用喷壶（最好用 Cyclone 喷枪）均匀喷一层薄膜，干湿表面均可。','晾干。'],
 x:['自然光泽、排水，不留润滑膜所以不粘灰；弹性保护膜防腐蚀；Daimler 认可。','不要用于需要防滑的表面。'],u:KOCH+'motorplast'},

{id:'K-cabriodach-versiegelung',b:'K',c:'trim',n:'Cabriodach-Versiegelung',t:'敞篷软顶封体喷罐（氟树脂）',f:'400 ml 喷罐',m:'敞篷织物软顶 · 户外织物',
 d:[['织物软顶','即用','—']],
 s:['清洁织物并彻底冲洗，确保无清洁剂（表面活性剂）残留，树脂才能结合。','完全晾干。','摇匀喷罐。','距离约 30 cm 先横向、再纵向喷涂。','晾干约 10 分钟。','用后倒置喷罐把喷嘴喷空。'],
 x:['防水防污，加深颜色，形成拒水防污保护。'],u:KOCH+'cabriodach_versiegelung'},

// ───────────────────────── 玻璃 ─────────────────────────
{id:'K-glas-star',b:'K',c:'glass',n:'Glas Star',t:'醇基高端玻璃清洁浓缩液',f:'10 L · 20 L · 200 L',m:'玻璃 · 镜面 · 瓷砖 · 金属板等光滑耐醇表面',
 d:[['玻璃（顽固污垢）','原液','喷雾壶'],['日常玻璃','最稀 1:3（最好用去离子水）','喷雾壶']],
 s:['原液或最多稀释至 1:3（最好用去离子水）喷上。','擦净。'],
 x:['去除油、脂、硅、蜡残留、轻度漆雾和虫尸，无痕；含光滑添加剂使擦拭更顺，醇含量让布干得快，适合冬季；Daimler 认可。','官方 Nano-Glasversiegelung 施工前用它清洁玻璃。'],u:KOCH+'glas_star'},

{id:'K-glass-cleaner',b:'K',c:'glass',n:'Glass Cleaner',t:'即用型专业玻璃清洁剂',f:'10 L · 20 L · 200 L',m:'玻璃 · 镜面 · 瓷砖 · 金属板等光滑表面',
 d:[['玻璃','即用','喷雾壶']],
 s:['原液喷上。','擦净。'],
 x:['去除油、脂、虫尸，无痕；含光滑添加剂；清新香味。官方 Ceramic Glass 镀膜前用它清洁玻璃。'],u:KOCH+'glass_cleaner'},

{id:'K-speed-glass-cleaner',b:'K',c:'glass',n:'SpeedGlassCleaner',t:'即用型玻璃清洁剂（零售装）',f:'750 ml',m:'玻璃 · 镜面等光滑表面',
 d:[['玻璃','即用','喷雾壶']],
 s:['原液喷上。','擦净。'],
 x:['与 Glass Cleaner 同类配方的零售装：去油、脂和虫尸，无痕。'],u:KOCH+'speedglasscleaner'},

{id:'K-nano-glasversiegelung',b:'K',c:'glass',n:'Nano-Glasversiegelung Set',t:'纳米玻璃镀膜套装（研磨乳 + 封体）',f:'套装：组份 1、2 各 250 ml',m:'外部玻璃 · 镜面 · 陶瓷',
 d:[['玻璃（封体约 25–30 ml/m²）（超纤布）','原液（两组份依次使用，不混合）','—']],
 s:['用 Glas Star 把玻璃彻底清洁至无残留，顽固污垢先用温和清洁泥。','组份 1（研磨乳，仅玻璃）：摇匀，用超纤垫（机器低速或手工）薄涂并研磨数分钟，直到表面顺滑、形成干膜，用干纸巾擦去残留；之后戴一次性手套，不要徒手碰玻璃。','组份 2（封体）：在完全干燥、10–30 °C（最好 15–25 °C）、无阳光直射的表面施工；挡风玻璃先用纸巾涂一半，推成均匀液膜，期间补加。','约 2–3 分钟后液膜应均匀无液滴，再约 2 分钟后用纸巾擦去；难擦残留可用少量组份 2 溶解后立即擦掉。','15–60 分钟硬化（温度越高越快），完全硬化前防水防污。'],
 x:['耐久最长 1 年或 2 万公里；减少污垢、虫尸和结冰附着，减少雨刮使用。','不要用于车内玻璃（会加重起雾）；研磨乳不要碰塑料和橡胶（留白痕）。不要在发热表面施工。','开封后立即盖紧，保质期约 1 年；强亲水的玻璃水添加剂可能降低拒水效果。'],u:KOCH+'nano_glasversiegelung_set'},

// ───────────────────────── 多功能清洁 APC ─────────────────────────
{id:'K-mehrzweckreiniger',b:'K',c:'apc',n:'Mehrzweckreiniger',t:'碱性强力内饰 / 特殊清洁剂',f:'1 L · 11 kg · 21 kg · 225 kg',m:'耐碱表面 · 地毯 · 座椅织物 · 车顶内衬 · 塑料',
 d:[['视脏污程度','1:5 – 1:50','喷雾壶']],
 s:['按脏污程度选择稀释比例。','用喷壶或超纤手套等施用，短暂作用。','需要时用刷子或布机械辅助。','用湿布擦去残留，或用干湿两用吸尘器吸走。','用于喷抽机或地毯/座椅清洗机时，加入 KocEntschäumer 消泡剂。'],
 x:['去除油、脂、墨水、烟灰、尼古丁和道路污垢；Daimler 认可。官方推荐作为 Allround Textile Sealant 前的织物清洁剂之一。','不要在热表面使用，不要让其干在表面；不易分离，不适合经轻油分离器排放。'],u:KOCH+'mehrzweckreiniger'},

// ───────────────────────── 内饰 ─────────────────────────
{id:'K-pol-star',b:'K',c:'int',n:'Pol Star',t:'中性织物 / 皮革 / Alcantara 清洁剂',f:'1 L · 5 L',m:'皮革 · Alcantara · 座椅织物 · 地毯',
 d:[['视脏污程度','1:5 – 1:20','喷雾壶']],
 s:['用喷壶、超纤手套等施用稀释液，短暂作用。','用海绵或超纤布顺着主纤维方向仔细揉洗。','用湿布或干湿两用吸尘器去除残留和泡沫。','用于喷抽机或地毯/座椅清洗机时，加入 KocEntschäumer 消泡剂。'],
 x:['深入纤维去污、不留水印，保留原有防水处理并减缓再次脏污。','先检查色牢度和材质兼容性。','比例与规格取自官方产品信息 PDF（美国版 Pol_Star_en.pdf），产品页信息不完整。'],u:KOCH+'pol_star'},

{id:'K-multi-interior-cleaner',b:'K',c:'int',n:'MultiInteriorCleaner',t:'即用型内饰清洁剂（零售装）',f:'750 ml',m:'座椅 · 织物 · 车顶内衬 · 地面 · 塑料饰板',
 d:[['内饰各类材质','即用','喷雾壶']],
 s:['喷在脏污部位。','短暂作用。','用布或软刷擦拭。','再用清水和干净的布处理一遍。'],
 x:['深入材料内部去除重度污垢，留下清新香味。','不要让其干在表面，不要在热表面使用；先检查材质兼容性。'],u:KOCH+'multiinteriorcleaner'},

{id:'K-allround-surface-cleaner',b:'K',c:'int',n:'Allround Surface Cleaner',t:'即用型表面清洁剂（内饰 / 家居）',f:'500 ml · 10 L',m:'光滑表面 · 不锈钢 · 塑料 · 皮革 · 织物（仅配清洁枪）',
 d:[['手工（超纤布）','即用','—'],['清洁枪（Tornador 类）','即用','—']],
 s:['手工：原液施用于污渍处，短暂渗透后用超纤布擦拭。','清洁枪：原液喷出后关闭药液，再用压缩空气吹干。'],
 x:['去除指纹、灰尘、油脂，光滑表面无痕（含非极性塑料）；不留水印或化学残留。','先检查材质兼容性。'],u:KOCH+'allround_surface_cleaner'},

{id:'K-leather-star',b:'K',c:'int',n:'Leather Star',t:'皮革深层养护乳（自然半光）',f:'—',m:'光面皮 · 麂皮 · 打孔皮',
 d:[['皮革养护（超纤布）','原液','—']],
 s:['先用合适的清洁剂（如 Pol Star）去污。','用湿布擦拭并彻底晾干。','使用前摇匀。','用海绵或柔软超纤布大面积均匀涂抹，晾干。','用软布擦去多余部分。'],
 x:['焕活皮革，色泽更饱满，柔软不滑，防再次脏污和脆化。'],u:KOCH+'leather_star'},

{id:'K-protect-leather-care',b:'K',c:'int',n:'ProtectLeatherCare',t:'皮革养护乳（零售装）',f:'500 ml',m:'皮革',
 d:[['皮革养护（施工海绵）','原液','—']],
 s:['皮革很脏时先用合适的清洁剂清洁并晾干。','摇匀。','用软布或海绵薄而均匀地涂一层。','作用后必要时擦亮。'],
 x:['焕新颜色、表面顺滑，保持皮革柔软并增强自然皮革气味。'],u:KOCH+'protectleathercare'},

{id:'K-top-star',b:'K',c:'int',n:'Top Star',t:'内饰塑料养护乳（半哑光）',f:'1 L · 10 L',m:'中控 · 内饰板 · 橡胶密封条',
 d:[['内饰塑料 / 橡胶（施工海绵）','原液','—']],
 s:['喷在软海绵上，均匀涂在表面。','晾干，必要时用超纤布擦拭。'],
 x:['深层清洁并焕新，半光自然质感，防污防 UV，保持塑料柔韧，抗静电；Daimler 认可。','使用前摇匀；防冻防高温。','不要用于踏板、方向盘、轮胎等需防滑表面，不要用于显示屏或聚碳酸酯。'],u:KOCH+'top_star'},

{id:'K-cockpit-super-pflege',b:'K',c:'int',n:'Cockpit-Super-Pflege',t:'内饰塑料养护（高光）',f:'1 L · 10 L',m:'中控 · 内饰板 · 橡胶密封条',
 d:[['内饰塑料 / 橡胶（施工海绵）','原液','—']],
 s:['喷在软海绵上。','均匀涂在表面。','晾干。','可再用超纤布擦拭。'],
 x:['清洁并保护，长效防污防 UV，清新香味。','不要用于踏板、方向盘、轮胎等需防滑表面。'],u:KOCH+'cockpit_super_pflege'},

{id:'K-gummifix',b:'K',c:'int',n:'Gummifix',t:'内饰橡胶 / 塑料防滑养护（不含硅油）',f:'1 L · 10 L',m:'橡胶脚垫 · 塑料地面 · 需防滑的内饰部位',
 d:[['橡胶脚垫 / 塑料地面（施工海绵）','原液','—']],
 s:['用海绵或喷壶施用。','均匀涂在干净、干燥的表面。','晾干。'],
 x:['不油腻、不打滑，焕新外观。'],u:KOCH+'gummifix'},

{id:'K-allround-textile-sealant',b:'K',c:'int',n:'Allround Textile Sealant',t:'织物封体（最长 24 个月）',f:'500 ml',m:'内外各类织物：敞篷软顶 · 座椅面料',
 d:[['织物（施工海绵）','原液','—']],
 s:['用 Pol Star 或 Mehrzweckreiniger 彻底清洁织物并完全晾干，确保干净、干燥、无产品残留。','用美纹纸遮蔽不需要封体的表面。','用超纤海绵均匀涂抹，形成薄而均匀的湿膜。','用合适的海绵十字交叉揉入纤维，完全晾干。','施工温度 10–40 °C；完全干燥并显效最多需 24 小时。'],
 x:['水性、不含溶剂和氟碳，防水、防污、防渍，不改变外观和手感；耐久最长 24 个月（约相当于 30 °C 洗涤 50 次）。','封体后只做温和清洁；效果减弱且织物不太脏时可补涂。','使用前摇匀；防冻防高温；不要用于显示屏、聚碳酸酯或需防滑的表面。'],u:KOCH+'allround_textile_sealant'},

{id:'K-tinten-kuli-ex',b:'K',c:'int',n:'Tinten- & Kuli-Ex',t:'织物墨水 / 圆珠笔印去除剂',f:'250 ml',m:'耐溶剂织物',
 d:[['墨水 / 圆珠笔印（超纤布）','原液','—']],
 s:['用超纤布蘸取施用。','轻拍（不要揉搓）让污渍松动。','用干燥吸水布轻拍吸走。','重度污渍重复。','最后用合适的清洁剂（如 Pol Star）整面清洁。'],
 x:['不含卤代烃，橙香。','不适用于人造革和塑料；先检查色牢度和材质兼容性。'],u:KOCH+'tinten_kuli_ex'},

{id:'K-schmutzradierer',b:'K',c:'int',n:'Schmutzradierer 5er Pack',t:'魔术去污海绵（硬表面）',f:'5 块装',m:'硬表面（漆面、皮革慎用）',
 d:[['硬表面顽固污渍','用水润湿，不加清洁剂','—']],
 s:['使用前润湿。','脏了冲洗后可继续用；重度污垢勤换。','切勿与清洁剂同时使用。'],
 x:['去除橡胶印、圆珠笔、茶渍咖啡渍、油脂、口香糖和柏油。','先在不显眼处测试：漆面有发哑风险，皮革有变色风险。'],u:KOCH+'schmutzradierer_5er_pack'},

// ───────────────────────── 配件 ─────────────────────────
{id:'K-exterior-wash-mitt',b:'K',c:'acc',n:'Exterior Wash Mitt',t:'超纤洗车手套 640 gsm',f:'26×21 cm',m:'车漆',d:[],
 s:['手洗时使用；洗车过程中经常在 Detailing Bucket Set 中涮洗，去除污垢颗粒、避免划伤。','用后放入防水袋，再清洗晾干。'],
 x:['中间内缝 + 弹性腕口；不要湿着存放在袋中。','手洗 ≤ 30 °C，不可烘干、熨烫、漂白。'],u:KOCH+'exterior_wash_mitt'},

{id:'K-pro-drying-towel',b:'K',c:'acc',n:'Pro Drying Towel',t:'擦干布 950 gsm',f:'50×80 cm',m:'车漆',d:[],
 s:['洗车后轻柔擦干漆面。'],x:['70% 聚酯 / 30% 聚酰胺，圆角；按洗涤说明清洗。'],u:KOCH+'pro_drying_towel'},

{id:'K-coating-towel',b:'K',c:'acc',n:'Coating Towel',t:'镀膜收光布 300 gsm（5 条装）',f:'40×40 cm',m:'—',d:[],
 s:['用于擦去陶瓷镀膜等封体产品的多余部分，不留划痕。'],x:['80% 聚酯 / 20% 聚酰胺，经编，超声波切边。'],u:KOCH+'coating_towel'},

{id:'K-application-sponge',b:'K',c:'acc',n:'Application Sponge',t:'镀膜施工海绵（麂皮包面，2 只装）',f:'80×35×35 mm · 80×80×35 mm',m:'—',d:[],
 s:['把镀膜滴在海绵上，按产品说明施工外部陶瓷和玻璃镀膜。'],x:['泡棉芯与麂皮面之间有隔层，镀膜不会渗入泡棉，更省料。','一次性使用，用后丢弃。'],u:KOCH+'application_sponge'},

{id:'K-allround-microfiber-sponge',b:'K',c:'acc',n:'Allround Microfiber Sponge',t:'超纤施工海绵（2 只装）',f:'12×9×4 cm',m:'—',d:[],
 s:['用于施工抛光剂、封体和养护产品，按各产品说明使用。'],x:[],u:KOCH+'allround_microfiber_sponge'},

{id:'K-detail-wheel-brush',b:'K',c:'acc',n:'Detail Wheel Brush',t:'耐酸轮毂刷',f:'—',m:'各类轮毂',d:[],
 s:['用于各类轮毂的快速清洁，可配合碱性和酸性轮毂清洁剂。'],x:['官方 Ceramic Rims 前处理中用它去除刹车粉等粗污。'],u:KOCH+'detail_wheel_brush'},

{id:'K-pressure-foam-sprayer',b:'K',c:'acc',n:'Pressure Foam Sprayer 2l',t:'2 L 手压泡沫喷壶',f:'2 L',m:'—',d:[],
 s:['使用前阅读操作说明，并按所装产品的施工说明使用。','用后泄压并用温水冲洗。'],x:['可换喷嘴调节泡沫多少；EPDM 密封圈。','只可装中性和碱性产品；带压时避免撞击。'],u:KOCH+'pressure_foam_sprayer_2l'},
);

FLOWS.push(
{id:'f-k-wash',b:'K',name:'Gsf 雪泡 + 手洗日常洗车',en:'Koch-Chemie Snow Foam & Hand Wash',sc:'daily',tags:['保护 / 镀膜车','虫尸'],
 sum:'官方产品页给出的日常洗车做法：重污局部预处理 → Gsf 中性雪泡（重污加 Green Star 成活性泡沫）→ 两桶手洗 → 擦干收尾。pH 中性，不伤蜡和封体。',
 steps:[
  {ph:'局部预处理',pH:'alk',p:['K-insect-dirt-remover'],r:'原液',how:'虫尸、油污等顽固污垢处原液喷涂，作用 1–3 分钟，必要时用海绵辅助，再彻底冲洗。'},
  {ph:'雪泡预洗',vars:[
    {n:'Gsf 中性雪泡',pH:'neu',p:['K-gsf'],r:'1:50（20 ml/L）',how:'每升水加约 20 ml，用泡沫喷壶把整车打满泡沫，停留后冲水。不要让泡沫干掉。'},
    {n:'Gsf + Green Star 活性泡沫',pH:'alk',p:['K-gsf','K-green-star'],r:'Gsf 1:50 + 10–30 ml Green Star',how:'顽固污垢和虫尸较多时，在预混好的 Gsf 溶液中加入 10–30 ml Green Star，变成活性泡沫。'},
  ]},
  {ph:'手洗',pH:'neu',p:['K-nanomagic-shampoo','K-gsf','K-ceramic-effect-shampoo'],alt:true,o:['两只洗车桶（隔砂网）'],r:'均为 1:200（50 ml/10 L）',how:'任选其一：NanoMagic Shampoo（留下纳米拒水层）、Gsf 手洗模式，或镀膜/封体车用 Ceramic Effect Shampoo。用 Exterior Wash Mitt 清洗，经常涮洗手套，分区施工并彻底冲洗。'},
  {ph:'擦干收尾',p:['K-pro-drying-towel','K-allround-quick-shine'],how:'用 Pro Drying Towel 擦干；需要时喷 AllroundQuickShine，让擦干更容易并提升光泽。'},
 ],
 x:['本流程由 Gsf、Insect & Dirt Remover、NanoMagic Shampoo、Ceramic Effect Shampoo 官方产品页中的步骤串联而成。','Gsf 用 PA壶时官方未给壶内比例，请按雪泡浓度调整。'],
 u:KOCH+'gentle_snow_foam'},

{id:'f-k-ceramic',b:'K',name:'陶瓷镀膜施工（Ceramic Body / Allround / Neo）',en:'Koch-Chemie Ceramic Coating Procedure',sc:'coated',tags:['新车','漆面修复'],
 sum:'官方镀膜产品页给出的完整施工程序：Green Star 1:10 碱性预洗 → 除染 → 机抛 → 脱脂检查 → 陶瓷镀膜 → 24 小时后上保护层，首次洗车至少等 9 天。',
 steps:[
  {ph:'碱性预洗',pH:'alk',p:['K-green-star'],r:'1:10',how:'用 Green Star 1:10 彻底预洗/清洗，不要用带封体成分的香波。'},
  {ph:'除染',p:['K-reinigungsknete-blau','K-clay-spray','K-teerwaesche-a'],how:'树脂、锈斑、柏油等重污染用清洁泥（配 Clay Spray）或 Teerwäsche A 处理。'},
  {ph:'机抛',p:['K-heavy-cut-h902','K-fine-cut-f601','K-micro-cut-m302'],how:'重度至中度氧化：Heavy Cut 或 Fine Cut；轻度氧化/去太阳纹：Micro Cut，偏心机强制转动模式（如 Makita PO5000C）。之后用 Polish & Sealing Towel 去除全部抛光残留。'},
  {ph:'脱脂与检查',p:['K-silicon-wachsentferner','K-panel-preparation-spray'],alt:true,r:'原液 · 敏感漆面 1:4',how:'用蘸湿的布轻压擦拭全部表面，未干前用第二块干净布擦净；单层素色漆把 Silicon- & Wachsentferner 用蒸馏水 1:4 稀释防发哑。良好光线下确认无划痕、无太阳纹，之后全程戴手套。'},
  {ph:'镀膜',vars:[
    {n:'Ceramic Body Cb0.01（36 个月+）',p:['K-ceramic-body-cb001','K-application-sponge','K-coating-towel'],r:'原液 · 整车约 15–30 ml',how:'用 Application Sponge 逐块两道十字交叉涂抹成薄而连续的液膜；闪干（20 °C / 43% 约 6 分钟）后先去除多余，再用 Coating Towel 干净面不加压画圈擦拭，检查高点。第二层间隔约 30 分钟。',src:KOCH+'ceramic_body_cb001'},
    {n:'Ceramic Allround C0.02（漆面 + 塑料 + 轮毂）',p:['K-ceramic-allround-c002','K-coating-towel'],r:'原液 · 整车约 15–30 ml',how:'施工块包 Application Towel，用量充足快速铺开，两道十字交叉；闪干后用 Coating Towel 擦拭。双层间隔约 45 分钟，耐久 20–24 个月（双层 26–30 个月）。',src:KOCH+'ceramic_allround_c002'},
    {n:'Ceramic Neo C0.03（KCx 2026 新品）',p:['K-ceramic-neo-c003','K-application-sponge','K-coating-towel'],r:'原液',how:'用 Application Sponge 按部件两道十字交叉施工，闪干后用 Coating Towel 擦至无痕。',src:KOCH_BLOG_KCX},
  ]},
  {ph:'固化与保护层',p:['K-spray-sealant','K-hand-wax-w001'],alt:true,how:'至少 24 小时后耐候，24 小时后可用 Spray Sealant 或 Hand Wax W0.01 作保护层。首次洗车至少等 9 天；前 9 天及时、轻柔地去除鸟粪和虫尸。'},
 ],
 branch:{n:'同步保护玻璃与塑料（KCx Protection Unit）',steps:[
  {ph:'玻璃镀膜',p:['K-glass-cleaner','K-reinigungsknete-blau','K-ceramic-glass-cg001'],o:['Glass Pre Polish'],how:'Glass Cleaner 清洁（必要时蓝色清洁泥）→ Glass Pre Polish 去除被侵蚀表层 → 15–25 °C 下先做半块挡风玻璃，Application Sponge 十字交叉推开，停留 12 分钟后用 Polish & Sealing Towel 擦亮；24 小时内勿扰动，5 天完全固化。'},
  {ph:'未涂装塑料',p:['K-plast-shield'],how:'用 Green Star 等彻底预清洁（不用溶剂型清洁剂），用 Application Sponge 均匀涂抹，停留 12 分钟，多余用 Coating Towel 擦去；24 小时内避免摩擦。'},
 ]},
 x:['日常避免使用 pH 低于 3 或高于 12 的清洁剂；维护见「镀膜车维护除垢」流程。','1K-Nano 前处理相同（Silicon- & Wachsentferner 脱脂），施工方式见其产品卡片。'],
 u:KOCH+'ceramic_body_cb001'},

{id:'f-k-coat-maint',b:'K',name:'镀膜车维护除垢',en:'Ceramic Coating Maintenance · Reactivation',sc:'coated',tags:['水垢 / 水斑'],
 sum:'官方为 Koch-Chemie 陶瓷镀膜（Cb0.01 / C0.02）车辆给出的维护顺序：Green Star 碱性预洗 → Reactivation Shampoo 酸性洗车去水垢盐分 → 擦干 → Spotless Ceramic Finish 去除残余水斑。',
 steps:[
  {ph:'碱性预洗',pH:'alk',p:['K-green-star'],how:'镀膜车先用 Green Star 预洗，再用高压水去除粗污。'},
  {ph:'酸性洗车',pH:'acid',p:['K-reactivation-shampoo'],r:'1:200（50 ml/10 L）',how:'车身仍湿时用洗车海绵清洗，彻底冲洗防止留斑，然后彻底擦干。'},
  {ph:'去水斑',p:['K-spotless-ceramic-finish'],r:'即用',how:'喷在超纤布上均匀擦涂成薄膜，视水斑程度停留最多 3 分钟，用专业超纤布擦亮。'},
  {ph:'洗后补强（可选）',p:['K-hydro-foam-sealant','K-spray-sealant'],alt:true,r:'Hydro Foam Sealant 1:50 – 1:150',how:'官方推荐的 Ceramic Allround 洗后养护：湿车用泡沫喷壶施用 Hydro Foam Sealant 后冲洗擦干；或干车用 Spray Sealant。'},
 ],
 x:['Spotless Ceramic Finish 不要在热表面或阳光下使用。','Reactivation Shampoo 建议戴手套。'],
 u:KOCH+'spotless_ceramic_finish'},

{id:'f-k-wheel',b:'K',name:'轮毂清洁与轮毂镀膜',en:'Wheel Cleaning & Ceramic Rims',sc:'wheel',tags:['保护 / 镀膜车'],
 sum:'官方 Ceramic Rims 产品页的轮毂施工顺序：Magic Wheel Cleaner 清洁 → Detail Wheel Brush 去粗污 → 脱脂 → Ceramic Rims Cr0.01 镀膜。',
 steps:[
  {ph:'轮毂清洁',p:['K-magic-wheel-cleaner'],r:'原液',how:'摇匀后喷满轮毂表面和内圈，视脏污作用 2–5 分钟（铁粉处变红），高压水彻底冲洗。不要在发热轮毂或阳光直射下使用。'},
  {ph:'机械去污',p:['K-detail-wheel-brush'],how:'刹车粉等粗污用 Detail Wheel Brush 刷除，再冲洗擦干。'},
  {ph:'脱脂',p:['K-panel-preparation-spray','K-silicon-wachsentferner'],alt:true,r:'原液 · Silicon- & Wachsentferner 1:4',how:'用 Polish & Sealing Towel 蘸取擦拭全部表面，再用干净毛巾擦干；戴手套，不要徒手触摸。'},
  {ph:'轮毂镀膜',p:['K-ceramic-rims-cr001','K-coating-towel'],r:'每只约 5–7 ml',how:'15–25 °C、湿度 40–50% 下用 Application Pen 涂满并推开成薄而连续的液膜，闪干后整平并用 Coating Towel 去除多余。可在约 30 分钟后上第二层；24 小时耐候，9 天后再洗。'},
 ],
 x:['不做镀膜时，只需第 1–2 步；重度刹车粉可按材质改用 Alkali Wheel Cleaner（碱性）或 Felgenreiniger K / Triple Acid Star（酸性），注意各自的材质限制。'],
 u:KOCH+'ceramic_rims_cr001'},

{id:'f-k-int',b:'K',name:'内饰织物 / 皮革清洁与保护',en:'Interior Textile & Leather Care',sc:'int',tags:['皮革','织物封体'],
 sum:'按官方产品页的衔接说明串联：Tinten- & Kuli-Ex 去墨渍 → Pol Star 整面清洁织物/皮革/Alcantara → 皮革用 Leather Star 养护，织物用 Allround Textile Sealant 封体。',
 steps:[
  {ph:'局部去渍',p:['K-tinten-kuli-ex'],r:'原液',how:'墨水和圆珠笔印用超纤布轻拍（不要揉），再用干燥吸水布吸走；不适用于人造革和塑料。'},
  {ph:'整面清洁',vars:[
    {n:'Pol Star（织物 / 皮革 / Alcantara）',pH:'neu',p:['K-pol-star'],r:'1:5 – 1:20',how:'喷壶或超纤手套施用，短暂作用后顺纤维方向用海绵或超纤布揉洗，再用湿布或干湿吸尘器带走泡沫残留。',src:KOCH+'pol_star'},
    {n:'Mehrzweckreiniger（重污耐碱织物）',pH:'alk',p:['K-mehrzweckreiniger'],r:'1:5 – 1:50',how:'按脏污程度稀释，施用后短暂作用，用刷子或布辅助，湿布擦或干湿吸尘器吸走残留。',src:KOCH+'mehrzweckreiniger'},
  ]},
  {ph:'皮革养护',p:['K-leather-star'],how:'清洁后用湿布擦拭并彻底晾干，摇匀 Leather Star，用海绵或柔软超纤布大面积均匀涂抹，晾干后擦去多余。'},
  {ph:'织物封体',p:['K-allround-textile-sealant'],how:'织物完全干燥、无残留后，遮蔽周边，用超纤海绵涂成均匀湿膜，十字交叉揉入纤维；10–40 °C 施工，最多 24 小时显效。'},
 ],
 x:['使用喷抽机时，Pol Star 和 Mehrzweckreiniger 都要加 KocEntschäumer 消泡剂。','每一步的衔接（如「之后用 Pol Star 整面清洁」「先用 Pol Star 清洁再封体」）均来自对应产品页，非单独的官方流程页。'],
 u:KOCH+'pol_star'},
);

COMBOS.push(
{id:'c-k-decon',b:'K',name:'漆面除染加做',sc:'tfr',tags:['铁粉','柏油 / 胶痕'],base:'f-k-wash',at:'手洗冲水后、擦干前',
 sum:'洗车后按污染类型依次除铁粉、去柏油胶痕、过泥，为抛光或镀膜做准备。',
 steps:[
  {ph:'除铁粉 / 锈斑',p:['K-reactive-rust-remover'],r:'原液',how:'喷在表面作用 3–6 分钟，溶解后变紫，必要时用海绵辅助，彻底冲洗。不要在热表面使用。'},
  {ph:'去柏油 / 胶痕',p:['K-teerwaesche-a','K-eulex','K-eulex-m'],alt:true,r:'原液',how:'柏油用 Teerwäsche A（干燥表面）；胶痕、树脂、漆雾用 Eulex 布敷擦除；哑光漆用 Eulex M，作用 1–3 分钟后高压冲洗并用 NanoMagic Shampoo 补洗。PC/亚克力塑料禁用 Eulex。'},
  {ph:'过泥',p:['K-reinigungsknete-blau','K-reinigungsknete-rot','K-clay-spray'],r:'Clay Spray 原液',how:'喷 Clay Spray 后不加压移动清洁泥直到表面顺滑；一般用蓝色（温和），污染重时用红色（研磨型，之后可能需抛光）。'},
 ],
 x:['之后可接「陶瓷镀膜施工」流程的机抛步骤。'],
 u:KOCH+'reactive_rust_remover'},

{id:'c-k-wetseal',b:'K',name:'洗车后湿式封体',sc:'daily',tags:['保护 / 镀膜车'],base:'f-k-wash',at:'第 3 步手洗冲水后、擦干前插入',
 sum:'车身洗净仍湿时直接上湿式封体或水蜡，冲洗后擦干，几分钟获得光泽与拒水。',
 steps:[
  {ph:'湿式封体',p:['K-hydro-foam-sealant','K-wetgloss','K-protectorwax'],alt:true,r:'Hydro Foam 1:50 – 1:150 · WetGloss 即用 · ProtectorWax 1:33（30 ml/L）',how:'Hydro Foam Sealant 或 ProtectorWax 用泡沫喷壶/泵壶施用在湿车身上，短暂作用后彻底冲洗；WetGloss 摇匀后直接喷在湿漆面上（整车约 250 ml）再冲洗。稀释液每次现配，不要存放。'},
  {ph:'擦干',p:['K-pro-drying-towel'],how:'彻底擦干，避免水斑。'},
 ],
 x:['不要在热表面使用，不要让产品干在表面。'],
 u:KOCH+'hydro_foam_sealant'},

{id:'c-k-tyre-trim',b:'K',name:'轮胎与外部塑料养护',sc:'wheel',tags:['塑料饰条'],base:'f-k-wheel',at:'轮毂清洁、擦干后追加',
 sum:'轮毂洗净后给胎侧和外部塑料上养护，按需要的光泽度选择产品。',
 steps:[
  {ph:'轮胎',p:['K-kcu-reifenschaum'],r:'即用',how:'清除轮胎所有污垢后，摇匀喷罐，距离约 20 cm 喷满胎侧，等泡沫开始消退，需要时用布揉开。不要喷到轮毂和胎面。'},
  {ph:'外部塑料 / 橡胶',p:['K-plast-star-siliconoelfrei','K-hydro-plast-care','K-plast-star-96'],alt:true,r:'Hydro Plast Care：原液–1:1 高光 · 1:2 中光 · 1:3 缎面 · 1:4 自然',how:'用海绵涂在干净干燥的表面并揉入、晾干。Plast Star siliconölfrei 为半哑光、不含硅油；Hydro Plast Care 可稀释调光泽。'},
 ],
 x:['这些产品都不要用于踏板、方向盘、胎面等需要防滑的表面。'],
 u:KOCH+'plast_star_siliconoelfrei'},

{id:'c-k-rinseless',b:'K',name:'免冲洗 / 无水洗',sc:'nowater',tags:[],base:'f-k-wash',at:'无高压水、车辆轻度脏污时替代整套水洗',
 sum:'轻度脏污时用 Rapid Rinseless Wash 免冲洗，或用 Wash & Finish 即用型无水洗。',
 steps:[
  {ph:'免冲洗 / 无水洗',p:['K-rapid-rinseless-wash','K-wash-finish'],alt:true,r:'Rapid Rinseless Wash 1:250（4 ml/L）· Wash & Finish 即用',how:'在阴凉处、车身冷却时逐块施工。Rapid Rinseless Wash 可用洗车桶（海绵/毛巾涂抹）或喷壶 1:250，再用干净干燥的 Polish & Sealing Towel 带走污垢；Wash & Finish 直接喷涂，超纤布擦去污垢后用第二块布擦亮。'},
  {ph:'收尾',p:['K-quick-shine-plus','K-finish-spray-exterior'],alt:true,r:'即用',how:'需要更高光泽时喷 Quick & Shine +；有水垢斑时用 Finish Spray exterior（不可用于内饰和不耐酸表面）。'},
 ],
 x:['重度脏污不适合免冲洗，请回到常规水洗流程。'],
 u:KOCH+'rapid_rinseless_wash'},
);
