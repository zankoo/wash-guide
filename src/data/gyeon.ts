// GYEON（韩国）产品与流程数据。来源：gyeon.co 官方产品页，官方 Paint / Exterior / Interior / Certified Detailer
// Coatings Manual（2023–2025 版说明书 PDF）。2026-10 整理翻译。只收录汽车用产品，不含 Q²R 船艇 / 航空系列和礼盒套装。
// 比例写法沿用官方：1:10 = 1 份原液 + 10 份水
import type { Combo, Flow, Product } from './types';

const GYEON = 'https://gyeon.co/product/';
const G_MAN = 'https://gyeon.co/wp-content/uploads/2025/02/';
const G_COAT_PREP = [
  '先用 Q²M Foam 预洗，再用强去油力的洗车液（官方用 Q²M Degrease Tabs）彻底手洗。',
  '用 Q²M Iron、Q²M Tar 除染，必要时用 Q²M Clay 黏土。',
  '建议至少做一步抛光，去除缺陷、提升光泽。',
  '抛光后用 Q²M Degrease Tabs 加热水再洗一遍车。',
  '表面必须无油且完全干燥：Q²M Prep 脱脂是必需步骤，之后等 15 分钟。',
];
const G_COAT_RULES = [
  '不要在阳光直射下施工，保持通风；室外施工建议 15–25 °C，未来 24 小时有下雨风险时不要施工。',
  '施工后 12 小时内保持干燥、不淋雨；前 14 天不要用强力清洁剂洗车。',
];

export const products: Product[] = [
// ───────────────────────── 预洗 ─────────────────────────
{
 sds:{"url":"https://www.dropbox.com/scl/fi/sfdk3ruezfotjvt9b06zd/GYEON-Q2M-Foam_M-en_4-1.pdf?rlkey=s0rze2wpq5dsm2srxhk5tku9o&raw=1","source":"gyeon","language":"英文","version":"v4.1","hosting":"remote"},
 id:'G-foam',brand:'G',category:'pre',ph:{"category":"alk","value":"13","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/sfdk3ruezfotjvt9b06zd/GYEON-Q2M-Foam_M-en_4-1.pdf?rlkey=s0rze2wpq5dsm2srxhk5tku9o&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HA25-01-0003）：原液碱性。","registration":"HA25-01-0003"}],"conflict":false},name:'Q²M Foam',type:'高浓缩泡沫预洗',sizes:'1 L · 4 L',materials:'车漆 · 镀膜车',
 dilutions:[['泡沫预洗','1:15','PA壶']],
 steps:['按 PA壶或喷雾壶的设置稀释（官方比例 1:15，约 50 ml / 车）。','喷在干燥的车身上，由下往上均匀覆盖。','让泡沫停留，不要干掉。','用高压水彻底冲洗。','接着做接触式手洗。'],
 notes:["镀膜车和未镀膜车都可用，适合每次洗车的第一步。","不需要刷洗，高压冲洗即可；但它不能替代手洗，之后仍要接触式清洗。"],url:GYEON+'foam/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/lw37b8kkwsb1jzigafag0/GYEON-Q2M-Bug-Grime_M-en_7-2.pdf?rlkey=i3h8uudai0eektoesesrtwncp&raw=1","source":"gyeon","language":"英文","version":"v7.2","hosting":"remote"},
 id:'G-buggrime',brand:'G',category:'pre',ph:{"category":"alk","value":"11","basis":"raw","source":{"kind":"product-page","url":"https://gyeon.co/product/buggrime/"},"evidence":[],"conflict":false},name:'Q²M Bug&Grime',type:'即用型虫尸 / 路面油污预洗',sizes:'500 ml · 1 L · 4 L',materials:'车漆 · 镀膜车 · 车身外部各表面',
 dilutions:[['虫尸、路面污垢','即用','喷雾壶']],
 steps:['喷在虫尸或油污区域。','短暂停留，不要干掉。','用高压水彻底冲洗。','污染严重时重复，或轻轻刷洗。','接着正常洗车。'],
 notes:['已蚀入清漆层的虫尸痕迹无法去除。','镀膜车可用，但过量使用可能影响镀膜的疏水性。','用量约 80–150 ml / 车。'],url:GYEON+'buggrime/'},

// ───────────────────────── 洗车香波 / 免冲洗 ─────────────────────────
{
 sds:{"url":"https://www.dropbox.com/scl/fi/zik1zgs6f3cuzdwzi0l12/GYEON-Q2M-Bathe_M-en_6-1.pdf?rlkey=0jk6zpfzz3omc4pyr9c18vzym&raw=1","source":"gyeon","language":"英文","version":"v6.1","hosting":"remote"},
 id:'G-bathe',brand:'G',category:'wash',ph:{"category":"neu","value":"6","basis":"raw","source":{"kind":"product-page","url":"https://gyeon.co/product/bathe-2/"},"evidence":[{"kind":"statement","source":"sds","text":"SDS 第 9 节写 pH 8，与品牌官网的 pH 6 不一致；本站按品牌官网标注。"}],"conflict":true},name:'Q²M Bathe',type:'中性高润滑香波',sizes:'500 ml · 1 L · 4 L',materials:'车漆 · 镀膜车 · 镀铬 · 抛光金属 · 车身外部各表面',
 dilutions:[['手洗','1:500','桶洗']],
 steps:['先彻底冲洗，去掉浮尘。','按 1:500 稀释（约 15–20 ml / 车）。','用柔软洗车手套按正确手法清洗。','用清水彻底冲洗。','用擦干巾擦干。'],
 notes:['不会去除镀膜和封体。','高润滑，减少洗车造成的划痕。'],url:GYEON+'bathe-2/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/w31wjqhiz5mncgu3bfdtb/GYEON-Q2M-Bathe-_M-en_7-2.pdf?rlkey=loyo95gs0q1ipz8j8p6jpqce8&raw=1","source":"gyeon","language":"英文","version":"v7.2","hosting":"remote"},
 id:'G-bathe-plus',brand:'G',category:'wash',ph:{"category":"neu","value":"6","basis":"raw","source":{"kind":"product-page","url":"https://gyeon.co/product/batheplus/"},"evidence":[{"kind":"statement","source":"sds","text":"SDS 第 9 节写 pH 7，与品牌官网的 pH 6 不一致；本站按品牌官网标注。"}],"conflict":true},name:'Q²M Bathe+',type:'含 SiO₂ 的中性洗护香波',sizes:'500 ml · 1 L · 4 L',materials:'车漆 · 镀膜车 · 轮毂 · 玻璃 · 塑料',
 dilutions:[['手洗','1:500','桶洗']],
 steps:['先彻底冲洗，去掉浮尘。','按 1:500 稀释（约 15–20 ml / 车）。','用柔软洗车手套按正确手法清洗。','用清水彻底冲洗。','用擦干巾擦干。'],
 cautions:['sun','hot'],notes:['洗车同时留下疏水层，实际使用最长约 8 周；不能替代镀膜。','未镀膜的裸漆也可用。'],url:GYEON+'batheplus/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/uwdbeam530p0w0xoalp94/GYEON-Q2M-RestartWash-_M-en_2-1.pdf?rlkey=2taxdplxmhmu2k6p1ntn35ahq&raw=1","source":"gyeon","language":"英文","version":"v2.1","hosting":"remote"},
 id:'G-restartwash',brand:'G',category:'wash',ph:{"category":"acid","value":"4","basis":"raw","source":{"kind":"product-page","url":"https://gyeon.co/product/restartwash-redefined/"},"evidence":[{"kind":"statement","source":"sds","text":"SDS 第 9 节写 pH 7.5，与品牌官网的 pH 4 不一致；本站按品牌官网标注。"}],"conflict":true},name:'Q²M RestartWash REDEFINED',type:'镀膜车酸性除染香波（去水垢 + 去铁粉）',sizes:'500 ml · 1 L',materials:'镀膜车',
 dilutions:[['手洗 · 轻度（定期焕新）','1:500','桶洗'],['手洗 · 标准','1:250','桶洗'],['手洗 · 重度除染','1:100','桶洗'],['泡沫喷壶','40 ml 原液 + 水至 500 ml','喷雾壶']],
 steps:['使用前摇匀。','按脏污程度稀释：轻度 1:500、标准 1:250、重度 1:100；10 L 水桶约用 20–100 ml。泡沫喷壶用 40 ml 原液兑成 500 ml。','用柔软的优质洗车手套，从车顶开始直线来回清洗整车。','用清水彻底冲洗，不要让产品干在表面；再用擦干巾擦干。'],
 notes:['新的酸性配方一次洗车同时去除水斑、水垢等矿物污垢和铁粉，让镀膜恢复拒水和顺滑。','本身不增加保护，也不会修复已磨损的镀膜。','主要用于镀膜车；酸性除染可能影响部分蜡和封体，蜡 / 封体车先在不显眼处测试。','日常洗车用 Bathe；疏水变差时才用它做定期除染；更重的污染用 TotalRemover。','取代旧版中性配方的 Q²M RestartWash。'],url:GYEON+'restartwash-redefined/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/fayytuucx2bmqqey0n308/GYEON-Q2M-PPF-Wash_M-en_3-1.pdf?rlkey=n1qpti4rtzc6iw5om2eokyjr7&raw=1","source":"gyeon","language":"英文","version":"v3.1","hosting":"remote"},
 id:'G-ppf-wash',brand:'G',category:'wash',ph:{"category":"neu","value":"6","basis":"raw","source":{"kind":"product-page","url":"https://gyeon.co/product/ppf-wash/"},"evidence":[{"kind":"statement","source":"sds","text":"SDS 第 9 节写 pH 7.5，与品牌官网的 pH 6 不一致；本站按品牌官网标注。"}],"conflict":true},name:'Q²M PPF Wash',type:'PPF / 改色膜除染香波（含去铁成分）',sizes:'500 ml',materials:'PPF · 改色膜 · 车漆 · 镀膜车',
 dilutions:[['手洗或泡沫','1:500','桶洗']],
 steps:['按 1:500 稀释（约 20–30 ml / 车）。','装进泡沫喷壶喷泡沫，或当普通香波用。','用洗车手套轻压清洗。','用清水彻底冲洗。','用擦干巾擦干。'],
 notes:['不用黏土即可溶解轻度铁粉，恢复 PPF 和改色膜原本的表面状态。','所有外部表面都可用，镀膜与否均可。'],url:GYEON+'ppf-wash/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/ywjjls2y4uf5vhwgrqhft/GYEON-Q2M-ECO-Wash_M-en_1-1.pdf?rlkey=u9jw3t0odmqtx83341wzpmx0g&raw=1","source":"gyeon","language":"英文","version":"v1.1","hosting":"remote"},
 id:'G-ecowash',brand:'G',category:'wash',ph:{"category":"neu","value":"7–9","basis":"raw","source":{"kind":"product-page","url":"https://gyeon.co/product/ecowash/"},"evidence":[],"conflict":false},name:'Q²M EcoWash',type:'无水洗 / 免冲洗 / 擦干辅助三用（含 SiO₂）',sizes:'500 ml · 1 L · 4 L',materials:'车漆 · 镀膜车',
 dilutions:[['无水洗（喷雾）','1:10 – 1:15','喷雾壶'],['免冲洗（水桶）','1:150 – 1:256','桶洗'],['擦干辅助','1:20','喷雾壶']],
 steps:['按用途选择比例稀释。','把稀释液喷在车身或毛巾上。','用干净的超纤毛巾轻轻擦拭。','勤翻毛巾，避免拖着脏污擦。','当擦干辅助时轻轻抛干。'],
 notes:['适合没有自来水或不允许冲水的地方。','擦拭时带来润滑和轻微疏水；镀膜车可用。'],url:GYEON+'ecowash/'},

// ───────────────────────── 轮毂轮胎 ─────────────────────────
{
 sds:{"url":"https://www.dropbox.com/scl/fi/2ulojkblfau4vfzyp0twu/GYEON-Q2M-Iron-WheelCleaner_M-en_4-1.pdf?rlkey=h625bij41iam3mwfvkl2gnv3o&raw=1","source":"gyeon","language":"英文","version":"v4.1","hosting":"remote"},
 id:'G-iron-wheelcleaner',brand:'G',category:'wheel',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/2ulojkblfau4vfzyp0twu/GYEON-Q2M-Iron-WheelCleaner_M-en_4-1.pdf?rlkey=h625bij41iam3mwfvkl2gnv3o&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB23-01-1036）：原液中性。","registration":"HB23-01-1036"}],"conflict":false},name:'Q²M Iron WheelCleaner REDEFINED',type:'中性凝胶轮毂清洁剂（兼除铁粉）',sizes:'500 ml · 1 L · 4 L',materials:'轮毂（各类涂层，含镀膜轮毂）',
 dilutions:[['轮毂','即用','喷雾壶']],
 steps:['喷在冷却的轮毂上。','停留，让它与污垢和铁粉反应。','需要时用刷子轻刷。','用水彻底冲洗。','不要让它干在表面上。'],
 notes:["低气味，可作日常轮毂清洁。","镀膜和未镀膜轮毂都可用。","用量约 100 ml / 车。"],url:GYEON+'iron-wheelcleaner-redefined/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/jmrhuiv1drn0zw8nxbaq1/GYEON-Q2M-TireCleaner_M-en_4-1.pdf?rlkey=d0od13f6meedxvh3m8h4mqxes&raw=1","source":"gyeon","language":"英文","version":"v4.1","hosting":"remote"},
 id:'G-tirecleaner',brand:'G',category:'wheel',ph:{"category":"alk","value":"10","basis":"raw","source":{"kind":"product-page","url":"https://gyeon.co/product/tirecleaner/"},"evidence":[{"kind":"statement","source":"sds","text":"SDS 第 9 节写 pH 12（并据此按极端 pH 做危害分类），与品牌官网的 pH 10 不一致；本站按品牌官网标注。"}],"conflict":true},name:'Q²M Tire Cleaner',type:'轮胎 / 橡胶深层清洁剂',sizes:'500 ml · 1 L · 4 L',materials:'轮胎 · 橡胶',
 dilutions:[['轮胎侧壁','即用','喷雾壶']],
 steps:['直接喷在轮胎侧壁上。','用硬毛轮胎刷刷洗。','用水彻底冲洗。','需要时重复，直到泡沫变白。','等轮胎干透再上保护。'],
 notes:['去除旧轮胎油和深层污垢，为上光或镀膜做准备。','白边轮胎也可用；不影响轮毂镀膜。','用量约 20 ml / 条轮胎。'],url:GYEON+'tirecleaner/'},

// ───────────────────────── 除染 / 去水垢 ─────────────────────────
{
 sds:{"url":"https://www.dropbox.com/scl/fi/g0whhwqo1hyumrdhosne1/GYEON-Q2M-Iron_M-en_5-1.pdf?rlkey=n4uuuyjudi9im36dn54lnzl1z&raw=1","source":"gyeon","language":"英文","version":"v5.1","hosting":"remote"},
 id:'G-iron',brand:'G',category:'deco',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/g0whhwqo1hyumrdhosne1/GYEON-Q2M-Iron_M-en_5-1.pdf?rlkey=n4uuuyjudi9im36dn54lnzl1z&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB23-01-1036）：原液中性。","registration":"HB23-01-1036"}],"conflict":false},name:'Q²M Iron REDEFINED',type:'中性铁粉去除剂（低气味）',sizes:'500 ml · 1 L · 4 L',materials:'车漆 · 轮毂 · 车身外部各表面',
 dilutions:[['车漆、轮毂','即用','喷雾壶']],
 steps:['喷在冷却的表面上。','停留，让它与铁粉反应。','需要时轻轻揉开。','用水彻底冲洗。','不要让它干在表面上。'],
 notes:["去除刹车粉、铁路粉尘等铁质污染。","敏感表面也可用。","用量约 150 ml / 车。"],url:GYEON+'iron-redefined/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/5tlc7z5b3zodwix0e6dxc/GYEON-Q2M-Tar_M-en_4-2.pdf?rlkey=wlm1wtmekjnw0dzh5iqxdg2q7&raw=1","source":"gyeon","language":"英文","version":"v4.2","hosting":"remote"},
 id:'G-tar',brand:'G',category:'deco',ph:{"category":"acid","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 GB25-02-0020）：原液弱酸性；品牌官网写 pH 中性。","registration":"GB25-02-0020"}],"conflict":false},name:'Q²M Tar REDEFINED',type:'柏油 / 有机沉积去除剂（低 VOC）',sizes:'500 ml · 1 L · 4 L',materials:'车漆 · 玻璃 · 塑料饰条（喷漆或未喷漆） · 镀膜车',
 dilutions:[['局部柏油','即用','喷雾壶']],
 steps:['施于有柏油的区域。','停留，让它溶解柏油和残留。','擦掉或冲掉松动的污染。','污染重时重复。','需要时继续下一步除染。'],
 notes:["很多情况下可减少黏土的使用，但重度污染仍需黏土。","用量约 100 ml / 车。"],url:GYEON+'tar-redefined/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/a3zizew8djaegy8czhs3f/GYEON-Q2M-WaterSpot_M-en_6-2.pdf?rlkey=dy0208q8lzsa592ctas6lmdec&raw=1","source":"gyeon","language":"英文","version":"v6.2","hosting":"remote"},
 id:'G-waterspot',brand:'G',category:'deco',ph:{"category":"acid","value":"5","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/a3zizew8djaegy8czhs3f/GYEON-Q2M-WaterSpot_M-en_6-2.pdf?rlkey=dy0208q8lzsa592ctas6lmdec&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB22-01-0751）：原液弱酸性。","registration":"HB22-01-0751"}],"conflict":false},name:'Q²M WaterSpot',type:'酸性水斑 / 矿物沉积去除剂',sizes:'500 ml · 1 L',materials:'车漆',
 dilutions:[['水斑区域（超纤布）','即用','—']],
 steps:['先用中性香波洗车并擦干。','把 WaterSpot 喷在漆面或超纤布上。','轻轻擦拭水斑区域。','水斑严重时重复。','之后用水冲洗，或用 Q²M Prep 擦拭。'],
 notes:['多数情况下不用抛光即可去除水斑，通常也不必重新镀膜。','不要用于新做的镀膜上，可能永久降低镀膜性能；对已有镀膜是否安全取决于镀膜种类。','用量约 15 ml / 板块（喷 1–2 下）。'],url:GYEON+'waterspot/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/ptbcl805rh7otrdwurx5y/GYEON-Q2M-ClayLube_M-en_5-1.pdf?rlkey=apgm6ehd3i03vkby6nmd8wd2z&raw=1","source":"gyeon","language":"英文","version":"v5.1","hosting":"remote"},
 id:'G-claylube',brand:'G',category:'deco',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/ptbcl805rh7otrdwurx5y/GYEON-Q2M-ClayLube_M-en_5-1.pdf?rlkey=apgm6ehd3i03vkby6nmd8wd2z&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB20-01-1288）：原液中性。","registration":"HB20-01-1288"}],"conflict":false},name:'Q²M ClayLube REDEFINED',type:'浓缩黏土润滑液',sizes:'500 ml',materials:'车漆 · 车身外部各表面',
 dilutions:[['黏土润滑液','原液 – 1:25','喷雾壶']],
 steps:['按需要稀释（最高 1:25）或直接用原液。','大量喷在要过黏土的表面。','让黏土轻轻滑过润滑区域。','全程保持充分润滑。','完成后擦掉残留。'],
 notes:["适用于黏土块、黏土布和黏土盘。","不会在车漆或饰条上留印。"],url:GYEON+'claylube-redefined/'},

{id:'G-clay',brand:'G',category:'deco',name:'Q²M Clay Bars',type:'黏土（Mild EVO 温和 / Coarse EVO 强力）',sizes:'100 g',materials:'车漆',dilutions:[],
 steps:['先彻底洗车。','用 Q²M ClayLube REDEFINED 润滑表面。','不加压地让黏土滑过漆面。','经常检查并揉捏黏土。','完成后擦干净表面。'],
 notes:['Clay Mild 用于日常维护，所有漆面（包括软漆）都安全；Clay Coarse 用于重度污染，可能产生轻微雾痕，建议在抛光前使用。','只耐 Q²M Iron，不能与柏油去除剂一起使用。','用量约 20 g / 车。'],url:GYEON+'clay/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/6hqn486mkuf1uy4mrlsdr/GYEON-Q2M-PPF-Renew_M-en_3-2.pdf?rlkey=onhmkpjml8w2js1gctqkwazh4&raw=1","source":"gyeon","language":"英文","version":"v3.2","hosting":"remote"},
 id:'G-ppf-renew',brand:'G',category:'deco',ph:{"category":"alk","value":"8.5","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/6hqn486mkuf1uy4mrlsdr/GYEON-Q2M-PPF-Renew_M-en_3-2.pdf?rlkey=onhmkpjml8w2js1gctqkwazh4&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB26-06-0004）：不适用。","registration":"FB26-06-0004"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M PPF Renew',type:'PPF 深层清洁翻新膏（含轻微研磨颗粒与 SiO₂）',sizes:'120 ml · 1 L',materials:'PPF（含自修复膜）',
 dilutions:[['手工或机器（施工棉 / 抛光盘）','即用','—']],
 steps:['先洗车并擦干。','取少量在施工棉或抛光盘上。','手工或机器轻压施工。','用干净超纤布擦掉残留。','严重区域可重复。'],
 notes:["去除 PPF 发雾、氧化和嵌入膜孔的污垢，恢复通透和光泽，并留下 UV 与化学防护。","不含填充物和硅油。","用量约 60 ml / 车。官方 PPF EVO 说明书：PPF 有划痕、氧化或污染时，镀膜前先用它处理。"],url:GYEON+'ppf-renew/'},

// ───────────────────────── 研磨抛光 / 施工前处理 ─────────────────────────
{
 sds:{"url":"https://www.dropbox.com/scl/fi/beajuj2piyekqxhbcre14/GYEON-Q2M-Compound-_M-en_4-3.pdf?rlkey=bjon881ddrcxv66w5o0yh7oad&raw=1","source":"gyeon","language":"英文","version":"v4.3","hosting":"remote"},
 id:'G-compound-plus',brand:'G',category:'polish',ph:{"category":"alk","value":"10","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/beajuj2piyekqxhbcre14/GYEON-Q2M-Compound-_M-en_4-3.pdf?rlkey=bjon881ddrcxv66w5o0yh7oad&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB26-06-0004）：不适用。","registration":"FB26-06-0004"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M Compound+ REDEFINED',type:'重切削研磨剂（低粉尘、少二次缺陷）',sizes:'120 ml · 250 ml · 1 L',materials:'车漆',
 dilutions:[['机抛（抛光盘）','即用','—']],
 steps:['在抛光盘上取少量。','用合适的机器和抛光盘组合施工。','抛到缺陷去除、产品完全研磨开。','用干净超纤布擦掉残留。','需要时接一步收光抛光。'],
 notes:["用于深划痕和严重漆面缺陷；可能留下轻微光圈，一遍收光即可去除。","水性配方，不含硅油和填充物，可直接进入镀膜前处理。","用量约 15–40 ml / 板块。"],url:GYEON+'compound-plus-redefined/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/ltml7qbae4v097sojl2r9/GYEON-Q2M-Compound_M-en_3-3.pdf?rlkey=54mi5nrmemyskaji123jde75m&raw=1","source":"gyeon","language":"英文","version":"v3.3","hosting":"remote"},
 id:'G-compound',brand:'G',category:'polish',ph:{"category":"alk","value":"8.5","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/ltml7qbae4v097sojl2r9/GYEON-Q2M-Compound_M-en_3-3.pdf?rlkey=54mi5nrmemyskaji123jde75m&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB26-06-0001）：不适用。","registration":"FB26-06-0001"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M Compound',type:'高切削研磨剂（可一步抛光）',sizes:'120 ml · 1 L',materials:'车漆',
 dilutions:[['偏心机抛光（抛光盘）','即用','—']],
 steps:['在匹配的抛光盘上取少量。','用偏心抛光机按正确手法施工。','抛到缺陷减少、产品完全研磨开。','用干净超纤布擦掉残留。','需要时接一步收光抛光。'],
 notes:["配合偏心机和正确手法可作一步抛光。","低粉尘，不含硅油和填充物。","用量约 15–40 ml / 板块。"],url:GYEON+'compound/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/hb1841k1w8ujff5rqpvpa/GYEON-Q2M-Polish_M-en_3-3.pdf?rlkey=16z2ttggts0zz76dh2mvf9xq4&raw=1","source":"gyeon","language":"英文","version":"v3.3","hosting":"remote"},
 id:'G-polish',brand:'G',category:'polish',ph:{"category":"alk","value":"8.5","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/hb1841k1w8ujff5rqpvpa/GYEON-Q2M-Polish_M-en_3-3.pdf?rlkey=16z2ttggts0zz76dh2mvf9xq4&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB26-06-0001）：不适用。","registration":"FB26-06-0001"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M Polish',type:'精细收光抛光剂',sizes:'120 ml · 1 L',materials:'车漆',
 dilutions:[['机抛（抛光盘）','即用','—']],
 steps:['在抛光盘上取适量。','用抛光机以中速施工。','抛到缺陷消除、出现光泽。','用干净超纤布擦掉残留。','需要时做镀膜前处理。'],
 notes:["去除轻微缺陷、雾面和细微划痕，主要用于机器抛光，不是重切削产品。","不含硅油和填充物。","用量约 10 ml / 板块。"],url:GYEON+'polish/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/u0lb4j8cdido51ahtos1t/GYEON-Q2-Primer_M-en_3-3.pdf?rlkey=htoqvkypmjopxq9bott6n50oj&raw=1","source":"gyeon","language":"英文","version":"v3.3","hosting":"remote"},
 id:'G-primer',brand:'G',category:'polish',ph:{"category":"alk","value":"8.5","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/u0lb4j8cdido51ahtos1t/GYEON-Q2-Primer_M-en_3-3.pdf?rlkey=htoqvkypmjopxq9bott6n50oj&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB26-06-0004）：不适用。","registration":"FB26-06-0004"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q² Primer',type:'镀膜前收光抛光剂（抛光与前处理一步完成）',sizes:'120 ml · 1 L',materials:'车漆',
 dilutions:[['机抛（抛光盘 / 收光盘）','即用','—']],
 steps:['抛光前先洗车并除染。','在抛光盘或收光盘上取足量。','以低到中速施工，直到产品完全研磨开。','用干净超纤布擦掉残留。'],
 notes:["适用于所有 GYEON 镀膜；软漆也可用。","不含填充物和保护成分。如要马上镀膜，官方建议再用 Q²M Prep 脱脂。","认证说明书：不需要修复的新车，镀膜前用 Q² Primer 抛一遍，去除运输保护残留。"],url:GYEON+'primer/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/4baa2ts1rt9q9lblvq2gd/GYEON-Q2M-Prep_M-en_6-2.pdf?rlkey=65ks49okqelgrcjh2ft6358vp&raw=1","source":"gyeon","language":"英文","version":"v6.2","hosting":"remote"},
 id:'G-prep',brand:'G',category:'polish',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/4baa2ts1rt9q9lblvq2gd/GYEON-Q2M-Prep_M-en_6-2.pdf?rlkey=65ks49okqelgrcjh2ft6358vp&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB24-01-0925）：原液中性。","registration":"HB24-01-0925"}],"conflict":false},name:'Q²M Prep',type:'镀膜前脱脂剂（IPA >50%）',sizes:'500 ml · 1 L · 4 L',materials:'车漆 · PPF · 轮毂 · 塑料 · 玻璃 · 车身外部各表面',
 dilutions:[['镀膜前脱脂（超纤布）','即用','—']],
 steps:['大量喷在表面或干净超纤布上。','彻底擦拭，去除残留。','用第二条毛巾确保擦净。','抛光较重的区域重复一遍。','等 5–10 分钟再施工镀膜（各镀膜说明书写为 15 分钟）。'],
 notes:["去除抛光油、旧蜡残留等，留下干净、抗静电的表面。","任何镀膜或封体施工前都要用；抛光后是必需步骤。"],url:GYEON+'prep/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/m9253w5ravj0gebrdxdwn/GYEON-Q2M-TotalRemover_M-en_1-2.pdf?rlkey=9s1a90s2tmidgcnw8uzsrh2zs&raw=1","source":"gyeon","language":"英文","version":"v1.2","hosting":"remote"},
 id:'G-total-remover',brand:'G',category:'polish',ph:{"category":"acid","value":"5","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/m9253w5ravj0gebrdxdwn/GYEON-Q2M-TotalRemover_M-en_1-2.pdf?rlkey=9s1a90s2tmidgcnw8uzsrh2zs&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB22-01-0751）：原液弱酸性。","registration":"HB22-01-0751"}],"conflict":false},name:'Q²M TotalRemover',type:'镀膜 / 封体 / 原厂蜡化学去除剂',sizes:'500 ml · 1 L',materials:'车漆 · 哑光漆',
 dilutions:[['去除旧保护（超纤布或手套）','即用','—']],
 steps:['先清洁表面。','把 TotalRemover 施于要去除保护的表面。','用超纤布或手套在旧保护层上揉擦。','停留 2–3 分钟后冲掉。','保护层厚的区域重复。'],
 notes:["化学分解封体、旧镀膜和原厂蜡，让新保护正确结合，不一定需要抛光。","哑光等敏感漆面可用；适合镀膜前处理新车。"],url:GYEON+'total-remover/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/sf1yjvpnn8ae9kwk0xags/GYEON-Q2M-MetalPolish_M-en_5-3.pdf?rlkey=v8x391chqzhnb9a6nd1w652fn&raw=1","source":"gyeon","language":"英文","version":"v5.3","hosting":"remote"},
 id:'G-metalpolish',brand:'G',category:'polish',ph:{"category":"alk","value":"9.8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/sf1yjvpnn8ae9kwk0xags/GYEON-Q2M-MetalPolish_M-en_5-3.pdf?rlkey=v8x391chqzhnb9a6nd1w652fn&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB26-06-0007）：不适用。","registration":"FB26-06-0007"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M MetalPolish',type:'金属 / 排气尾喉抛光膏（高切削）',sizes:'120 ml',materials:'裸金属 · 排气尾喉',
 dilutions:[['手工（超纤布 / 施工棉）','即用','—']],
 steps:['确认金属表面冷却且干净。','取适量在超纤布或施工棉上。','在金属表面揉擦，直到污染去除。','用干净毛巾擦掉残留。','氧化严重的区域重复。'],
 notes:["去除氧化、热变色和污渍；用于裸金属，不适合有涂层的金属。","不留保护层，之后可再做保护。"],url:GYEON+'metalpolish-2/'},

// ───────────────────────── 镀膜 ─────────────────────────
{
 sds:{"url":"https://www.dropbox.com/scl/fi/y41b2qwwc1pbe4811fv91/GYEON-Q2-One-EVO_M-en_3-1.pdf?rlkey=eq3t7ss29m9sxkq4qla1cixw6&raw=1","source":"gyeon","language":"英文","version":"v3.1","hosting":"remote"},
 id:'G-one-evo',brand:'G',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB20-07-0062）：不适用。","registration":"FB20-07-0062"}],"conflict":false},name:'Q² One EVO',type:'入门级 SiO₂ 镀膜（最长 24 个月 / 2.5 万 km）',sizes:'30 ml · 50 ml · 100 ml',materials:'车漆',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:[...G_COAT_PREP,'把镀膜瓶摇匀，在 Q²M Coating Applicator 上倒足量；表面须冷却、无尘。','涂一层厚而均匀的镀膜，手法不限，关键是流平；建议整块板块施工，高温高湿时分小块。','涂完整块板块后立即擦掉（10–30 秒内），检查每块板有没有高点。'],
 cautions:['sun','ventilate'],notes:['可叠加第二层，层间至少间隔 1 小时。','室外施工建议 15–25 °C，未来 24 小时有下雨风险时不要施工。','施工后 12 小时内保持干燥、不淋雨；前 14 天不要用强力清洁剂洗车。','洗车时用 Q²M Cure 维护；镀膜 1 小时后可罩 Q² CanCoat EVO；第一次洗车后（至少 14 天）可罩 Q² Wax。','用量约 25–30 ml / 车。'],url:GYEON+'one-evo/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/pjcbxwsfz04selnyijltz/GYEON-Q2-Pure-EVO_M-en_3-1.pdf?rlkey=7jikd9shb2d3w8lwxy17tqeey&raw=1","source":"gyeon","language":"英文","version":"v3.1","hosting":"remote"},
 id:'G-pure-evo',brand:'G',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB20-07-0062）：不适用。","registration":"FB20-07-0062"}],"conflict":false},name:'Q² Pure EVO',type:'单层厚膜 SiO₂ 镀膜（最长 36 个月 / 4 万 km）',sizes:'30 ml · 50 ml · 100 ml',materials:'车漆',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:[...G_COAT_PREP,'把镀膜瓶摇匀，在 Q²M Coating Applicator 上倒足量；表面须冷却、无尘。','涂一层厚而均匀的镀膜，手法不限，关键是流平；建议整块板块施工，高温高湿时分小块。','擦除窗口最长约 10 分钟：炎热潮湿时立即擦，温和凉爽时 10 分钟内擦；仔细擦净，不留条纹。'],
 cautions:['sun','ventilate'],notes:['设计为单层镀膜，一层即可达到全部性能。','室外施工建议 15–25 °C，未来 24 小时有下雨风险时不要施工。','施工后 12 小时内保持干燥、不淋雨；前 14 天不要用强力清洁剂洗车。','洗车时用 Q²M Cure 维护；镀膜 1 小时后可罩 Q² CanCoat EVO；第一次洗车后（至少 14 天）可罩 Q² Wax。','用量约 25–30 ml / 车。'],url:GYEON+'pure-evo/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/bdpdnjps5142gys59jjui/GYEON-Q2-Mohs-EVO_M-en_3-1.pdf?rlkey=kcipsayi2hwk37ui5fsy0hq8w&raw=1","source":"gyeon","language":"英文","version":"v3.1","hosting":"remote"},
 id:'G-mohs-evo',brand:'G',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB20-07-0062）：不适用。","registration":"FB20-07-0062"}],"conflict":false},name:'Q² Mohs EVO',type:'改性聚硅氮烷镀膜（1 层 36 个月，2 层 48 个月）',sizes:'30 ml · 50 ml · 100 ml',materials:'车漆',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:[...G_COAT_PREP,'把镀膜瓶摇匀，在 Q²M Coating Applicator 上倒足量；表面须冷却、无尘。','涂一层厚而均匀的镀膜，手法不限，关键是流平；建议每次约一个肩宽的区域，高温高湿时缩小。','镀膜开始「出汗」时就擦掉（约 10 秒，炎热时立即擦），仔细擦净，不留条纹。','需要更高耐久时，至少 1 小时后按相同顺序上第二层（最多 2 层）。'],
 cautions:['sun','ventilate'],notes:['大多数车一层就够。','室外施工建议 15–25 °C，未来 24 小时有下雨风险时不要施工。','施工后 12 小时内保持干燥、不淋雨；前 14 天不要用强力清洁剂洗车。','洗车时用 Q²M Cure 维护；镀膜 1 小时后可罩 Q² CanCoat EVO；第一次洗车后（至少 14 天）可罩 Q² Wax。','用量约 15–25 ml / 车。'],url:GYEON+'mohs-evo/'},

{id:'G-syncro-evo',brand:'G',category:'coat',name:'Q² Syncro EVO',type:'双层镀膜系统（Mohs EVO 底层 + Skin EVO 面层，最长 50 个月）',sizes:'30 + 30 ml · 50 + 50 ml',materials:'车漆',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:[...G_COAT_PREP,'把 Q² Mohs EVO 摇匀，用 Q²M Coating Applicator 上底层：厚而均匀，开始「出汗」时（约 10 秒）擦掉。','需要时可上第二层 Mohs EVO（至少间隔 1 小时）。','最后一层 Mohs EVO 后 1 小时，用交叉纹路上一层厚的 Q² Skin EVO，10–30 秒内仔细擦掉；车顶、引擎盖、SUV 车门等大板块分区施工。'],
 notes:['产品页写「底层做完全车后立即上 Skin EVO」，官方说明书写「最后一层 Mohs EVO 后 1 小时」，本站按说明书。','深色车的深度和通透感提升最明显。',...G_COAT_RULES,'洗车时用 Q²M Cure 维护；第一次洗车后（至少 14 天）可罩 Q² Wax。'],url:GYEON+'syncro-evo/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/ci8h5ljttef6nkd0oiqyh/GYEON-Q2-Matte-EVO_M-en_5-1.pdf?rlkey=37j4zai7hzurbop8jbkz7y887&raw=1","source":"gyeon","language":"英文","version":"v5.1","hosting":"remote"},
 id:'G-matte-evo',brand:'G',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB20-07-0062）：不适用。","registration":"FB20-07-0062"}],"conflict":false},name:'Q² Matte EVO',type:'哑光漆 / 哑光膜专用镀膜（最长 24 个月 / 3 万 km）',sizes:'50 ml',materials:'哑光漆 · 缎面漆 · PPF · 改色膜',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:['先用 Q²M Foam 预洗，再用强去油力的洗车液（官方用 Q²M Degrease Tabs）彻底手洗。','用 Q²M Iron、Q²M Tar 化学除染（哑光面不抛光、不过黏土）。','用 Q²M Degrease Tabs 加热水再洗一遍车。','Q²M Prep 脱脂是必需步骤，之后等 15 分钟；表面须无油、完全干燥。','摇匀，在 Q²M Coating Applicator 上倒足量，涂一层厚而均匀的镀膜，仔细流平。','涂完整块板块后立即擦掉（10–30 秒内），不留条纹。'],
 cautions:['sun','ventilate'],notes:['不增加光泽、不改变纹理。','室外施工建议 15–25 °C，未来 24 小时有下雨风险时不要施工。','施工后 12 小时内保持干燥、不淋雨；前 14 天不要用强力清洁剂洗车。','维护用 Q²M Cure Matte；洗车用中性香波，避免用力擦洗，哑光面无法像亮面一样抛光修复。','用量约 30–50 ml / 车。'],url:GYEON+'matte-evo/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/3ezox4u8vaavvk3vcgfbh/GYEON-Q2-CanCoat-EVO_M-en_2-1.pdf?rlkey=s1g56k1patgaq6dhekan4p4qm&raw=1","source":"gyeon","language":"英文","version":"v2.1","hosting":"remote"},
 id:'G-cancoat-evo',brand:'G',category:'coat',name:'Q² CanCoat EVO',type:'喷雾型陶瓷镀膜（最长 12 个月 / 1.2 万 km）',sizes:'200 ml',materials:'车漆 · 塑料饰条 · 金属 · 轮毂 · 侧窗和后窗玻璃',
 dilutions:[['喷在超纤布上擦拭','即用','—']],
 steps:['抛光后用 Q²M Degrease Tabs 加热水洗车，确认表面干净。','表面须无油且完全干燥：用 Q²M Prep 脱脂，等 15 分钟。','离开车身，把镀膜喷在随附的超纤布上。','擦到选定表面上，再擦到完全光亮。','分小区域施工，避免条纹。'],
 notes:['玻璃只用于侧窗和后窗。','可叠层，层间至少 1 小时。','哑光 / 缎面漆可用，但可能带来很轻微的缎面感。','维护：中性香波洗车，需要时用 Q²M Cure 或 Q²M WetCoat 增强疏水。','用量约 10–15 ml / 车。'],url:GYEON+'cancoat-evo/'},

{
 sds:{"url":"https://www.gyeon.be/en/shop/8809432672661-q2-flash-light-box-909/document/1631","source":"gyeon-be","language":"德文","hosting":"remote"},
 id:'G-flash-evo',brand:'G',category:'coat',name:'Q² Flash EVO',type:'快速固化专业镀膜（认证施工店）',sizes:'30 ml',materials:'车漆',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:['官方产品页未列出施工步骤；随附说明书和 Q²M Degrease Tabs，按说明书施工。'],
 notes:['固化比传统镀膜快得多，施工后不久即可接触自然环境，适合户外和上门服务。','实际寿命取决于镀膜系统和用车情况。','用量约 30 ml / 车。'],url:GYEON+'flash-evo/'},

{
 sds:{"url":"/sds/G-infinite-base-1.pdf","source":"gyeon-cz","language":"英文","version":"v1.0","hosting":"local","sha256":"4a585fdcc2b69ca6212752db56b43a0eec18d1f8a43228074790e7e54d0c26e4","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'G-infinite-base-1',brand:'G',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB20-07-0062，已过期）：不适用。","registration":"FB20-07-0062"}],"conflict":false},name:'Q² INFINITE Base Type 1',type:'改性聚硅氮烷专业镀膜（认证施工店，可单用或作底层）',sizes:'30 ml',materials:'车漆',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:[...G_COAT_PREP,'把瓶子摇匀，在 Q²M Coating Applicator 上倒足量；表面须冷却、无尘。','涂一层厚而均匀的镀膜，手法不限，关键是流平；建议每次约一个肩宽的区域，高温高湿时缩小。','约 10 秒后擦掉（炎热时立即擦），仔细擦净，不留条纹。','需要时，全车涂完底层后立即按相同顺序上 INFINITE TopCoat，并立即擦掉。'],
 notes:["只供 GYEON 认证施工店使用。","施工后至少在店内放 12 小时；可用红外灯在全车施工完后以 55–60 °C 表面温度加热每块板 10 分钟，层间不要用。","完全固化最长约 3 周，前 14 天不要用强力清洁剂洗车。"],url:GYEON+'infinite-base-type-1/'},

{
 sds:{"url":"/sds/G-infinite-base-2.pdf","source":"gyeon-cz","language":"英文","version":"v1.0","hosting":"local","sha256":"cf842e40f1f40214b00fd60fdcd8ab9ffecbf7bfa818dc0ef36a908a79d4f1e7","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'G-infinite-base-2',brand:'G',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB20-07-0062，已过期）：不适用。","registration":"FB20-07-0062"}],"conflict":false},name:'Q² INFINITE Base Type 2',type:'高浓度 SiO₂ 专业镀膜（认证施工店，擦除窗口长）',sizes:'30 ml',materials:'车漆',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:[...G_COAT_PREP,'把瓶子摇匀，在 Q²M Coating Applicator 上倒足量；表面须冷却、无尘。','涂一层厚而均匀的镀膜并仔细流平；擦除窗口较长，大板块也容易控制。','仔细擦净，不留条纹。','可选：再上一层 INFINITE TopCoat 调整表面特性。'],
 notes:["只供 GYEON 认证施工店使用。","施工后至少在店内放 12 小时；前 14 天不要用强力清洁剂洗车。"],url:GYEON+'infinite-base-type-2/'},

{
 sds:{"url":"/sds/G-infinite-top-1.pdf","source":"gyeon-cz","language":"英文","version":"2026","hosting":"local","sha256":"b78feffdd9545890b6f29cbbaec93e8485685efbe355847e7bb124b27ea4fe37","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'G-infinite-top-1',brand:'G',category:'coat',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"/sds/G-infinite-top-1.pdf","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB20-07-0062，已过期）：不适用。","registration":"FB20-07-0062"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q² INFINITE TopCoat Type 1',type:'INFINITE 面层：更亮、更深、更耐久',sizes:'30 ml',materials:'车漆',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:['全车涂完 INFINITE Base 后立即施工，按与底层相同的板块顺序。','在 Q²M Coating Applicator 上倒足量，均匀涂开。','立即仔细擦掉，不留条纹；车顶、引擎盖、SUV 车门等大板块分区施工。'],
 notes:["只供 GYEON 认证施工店使用。","提升通透感和深度，并增强耐化学性和长期疏水。"],url:GYEON+'infinite-top-coat-type-1/'},

{id:'G-infinite-top-2',brand:'G',category:'coat',name:'Q² INFINITE TopCoat Type 2',type:'INFINITE 面层：更滑、更耐化学污渍',sizes:'30 ml',materials:'车漆',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:['全车涂完 INFINITE Base 后立即施工，按与底层相同的板块顺序。','在 Q²M Coating Applicator 上倒足量，均匀涂开。','立即仔细擦掉，不留条纹；车顶、引擎盖、SUV 车门等大板块分区施工。'],
 notes:['只供 GYEON 认证施工店使用。','明显提升滑度和自洁性，污染物更容易脱落。'],url:GYEON+'infinite-top-coat-type-2/'},

{
 sds:{"url":"/sds/G-cancoat-pro-evo.pdf","source":"gyeon-cz","language":"英文","version":"2026","hosting":"local","sha256":"78e22c670d0f85741701d78ef04bb1e0037e372dac8197e456e18a8b73e549b4","provenanceNote":"旧合集转存文件；历史记录未保存原始下载地址。"},
 id:'G-cancoat-pro-evo',brand:'G',category:'coat',ph:{"category":"neu","value":"6.5","basis":"raw","source":{"kind":"sds","url":"/sds/G-cancoat-pro-evo.pdf","section":9},"evidence":[],"conflict":false},name:'Q² CanCoat Pro EVO',type:'专业级喷雾镀膜（认证施工店维护 / 补层，12 个月以上）',sizes:'200 ml',materials:'车漆 · 塑料饰条 · 金属 · 轮毂 · 侧窗和后窗玻璃 · 摩托车 · 房车',
 dilutions:[['喷在超纤布上擦拭','即用','—']],
 steps:['抛光后用 Q²M Degrease Tabs 加热水洗车，确认表面干净。','表面须无油且完全干燥：用 Q²M Prep 脱脂，等 15 分钟。','离开车身，把镀膜喷在随附的超纤布上。','擦到选定表面上，再擦到完全光亮。','分小区域施工，避免条纹。'],
 notes:['用于每年或每半年一次的镀膜维护：只在底层镀膜性能下降、并已完全除染后使用。','可让 INFINITE 镀膜恢复光泽和疏水，不改变原有外观；也可作无需 INFINITE 质保项目的入门保护。','有效成分比 CanCoat EVO 高，擦除更轻松。'],url:GYEON+'cancoat-pro-evo/'},

{id:'G-view-evo',brand:'G',category:'coat',name:'Q² View EVO',type:'前挡玻璃镀膜套装（Repel EVO + GlassPolish，最长 24 个月）',sizes:'20 ml 套装',materials:'前挡 · 车外玻璃',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:['用 Q²M Glass 清洁玻璃。','用随附施工块手工，或用抛光机配 Q²M Polish Pad 施工 Q²M GlassPolish，小区域操作到只剩薄薄一层残留。','用干净湿布擦掉残留，等表面完全干透。','把 Q² Repel EVO 倒在施工块上，小区域画圈大量涂抹；第一层不擦，晾 15 分钟后上第二层。','15 分钟后用湿的 Q²M BaldWipe EVO 擦掉残留，需要时重复。','想要更耐久，可在雨刷片上抹少量，或换新雨刷；施工后几小时内不要沾水。'],
 notes:['一瓶 20 ml 可做一块前挡和两扇侧窗。','车速约 50 km/h 起开始明显驱水；完全耐酒精，可正常用雨刷和玻璃水。','维护用普通玻璃清洁剂，避免用研磨性擦片。'],url:GYEON+'view-evo/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/ocsyfkhnnfvmcfzibrjph/GYEON-Q2-AntiFog_M-en_4-1.pdf?rlkey=lgccsaudeqbl7x01xc4yrk6le&raw=1","source":"gyeon","language":"英文","version":"v4.1","hosting":"remote"},
 id:'G-antifog',brand:'G',category:'coat',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/ocsyfkhnnfvmcfzibrjph/GYEON-Q2-AntiFog_M-en_4-1.pdf?rlkey=lgccsaudeqbl7x01xc4yrk6le&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB23-07-0290）：不适用。","registration":"HB23-07-0290"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q² AntiFog',type:'内侧玻璃防雾镀膜（2 个月以上）',sizes:'120 ml',materials:'玻璃（车内侧）',
 dilutions:[['镀膜（麂皮施工块）','即用','—']],
 steps:['用 Q²M Glass 把玻璃清洁干净，建议再用 Q²M Prep 脱脂。','取少量在麂皮施工块上，抹到玻璃上。','交叉纹路涂抹，直到只剩几乎看不见的雾面。','2–5 分钟后用柔软超纤布擦净。'],
 notes:["全车用量约 15 ml，一瓶可做多台车或用过不止一个冬季。","全年有起雾的情况都适用。"],url:GYEON+'antifog/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/5jy0nfmy1qtytp0kb2ep7/GYEON-Q2-Rim-EVO_M-en_5-1.pdf?rlkey=41f3z1xdnkbpfxo3mf5t9s5m5&raw=1","source":"gyeon","language":"英文","version":"v5.1","hosting":"remote"},
 id:'G-rim-evo',brand:'G',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB20-07-1257）：不适用。","registration":"HB20-07-1257"}],"conflict":false},name:'Q² Rim EVO',type:'轮毂镀膜（耐 800 °C，最长 18 个月）',sizes:'30 ml',materials:'轮毂（喷漆、粉末涂层、阳极氧化、抛光） · 卡钳（有清漆）',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:['用 Q²M Iron WheelCleaner 和 Q²M Tar 清洁轮毂，可见杂质再用 Q²M Clay 去除。','表面须无油、完全干燥：用 Q²M Prep 脱脂（异丙醇不能完全脱脂），等 15 分钟。','把瓶子充分摇匀，用随附施工块倒足量。','均匀涂抹，关键是流平；表面须冷却、无尘。','涂后立即擦掉（10–30 秒内）；造型复杂的轮毂分区施工。'],
 notes:["不增加光泽，保持中性外观、加深颜色。","维护用中性香波，避免强酸强碱清洁剂。","镀膜 12 小时后完全干燥，之后才能开车。"],url:GYEON+'rim-evo/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/d5rn5jvlsble7fatwfldm/GYEON-Q2-Trim-EVO_M-en_6-1.pdf?rlkey=6o941bu4f5f60au7v5j4oiva4&raw=1","source":"gyeon","language":"英文","version":"v6.1","hosting":"remote"},
 id:'G-trim-evo',brand:'G',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB20-07-1257）：不适用。","registration":"HB20-07-1257"}],"conflict":false},name:'Q² Trim EVO',type:'外饰塑料镀膜 / 永久修复（最长 36 个月）',sizes:'30 ml',materials:'未喷漆塑料 · 纹理塑料 · 大灯 / 尾灯（翻新后有清漆）',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:['用 Q²M TrimCleaner 清洁塑料，去掉旧上光剂和污染。','表面须无油、完全干燥：用 Q²M Prep 脱脂，等 15 分钟。','把瓶子摇匀，用随附施工块倒足量；表面须冷却、无尘。','交叉纹路涂抹，确保形成厚的一层。','10–30 秒内擦掉（擦除时间视气候而定）。'],
 notes:["恢复褪色塑料、保护新塑料，留下自然哑光或缎面，不会发亮。","维护用中性香波，不需要再上塑料养护剂。","镀膜 12 小时后完全干燥。"],url:GYEON+'trim-evo/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/3axrwlbbgzmjfh9u1tmbd/GYEON-Q2-PPF-EVO_M-en_2-1.pdf?rlkey=js0ppt22p5qlb92zn173plw9y&raw=1","source":"gyeon","language":"英文","version":"v2.1","hosting":"remote"},
 id:'G-ppf-evo',brand:'G',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB20-07-0062）：不适用。","registration":"FB20-07-0062"}],"conflict":false},name:'Q² PPF EVO',type:'PPF 专用镀膜（最长 24 个月 / 2.5 万 km）',sizes:'50 ml',materials:'PPF（亮面、缎面、哑光）',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:['先用 Q²M Foam 预洗，再用强去油力的洗车液（官方用 Q²M Degrease Tabs）彻底手洗。','PPF 有划痕、氧化或污染时，先用 Q²M PPF Renew 抛光处理。','表面须无油且完全干燥：Q²M Prep 脱脂是必需步骤，之后等 15 分钟。','把瓶子摇匀，在 Q²M Coating Applicator 上倒足量；表面须冷却、无尘。','涂一层厚而均匀的镀膜，关键是流平；建议每次约一个肩宽的区域。','立即擦掉（10–30 秒内），不留条纹。'],
 notes:["不增加光泽，提高抗 UV、减缓发黄。","镀膜 12 小时后完全干燥，之后才能开车；前 14 天不要用强力清洁剂洗车。","维护用中性香波，避免研磨性清洁剂。"],url:GYEON+'ppf-evo/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/p0anwvrrpietbhsrp9jcm/GYEON-Q2-LeatherShield-EVO_M-en_4-2.pdf?rlkey=3ghs3amf7h9i3kmeep9qk0be9&raw=1","source":"gyeon","language":"英文","version":"v4.2","hosting":"remote"},
 id:'G-leathershield-evo',brand:'G',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FA20-07-0113）：不适用。","registration":"FA20-07-0113"}],"conflict":false},name:'Q² LeatherShield EVO',type:'汽车皮革镀膜（最长 18 个月）',sizes:'50 ml · 100 ml',materials:'封闭结构的现代汽车皮革 · 高品质人造革',
 dilutions:[['镀膜（施工块 / MF Applicator）','即用','—']],
 steps:['吸尘，确保皮革上没有碎屑和灰尘。','用 Q²M LeatherCleaner 清洁皮革；不要用含柔软剂的清洁剂。','用湿毛巾擦掉清洁剂残留，检查皮革。','确认表面完全干燥。','在随附施工块（或 Q²M MF Applicator）上倒足量，一次做一个部件，均匀涂开。','停留 3–5 分钟，检查后用 Q²M BaldWipe EVO 擦掉残留。','至少固化 6 小时再使用。'],
 cautions:['test'],notes:['不要用于苯胺皮、半苯胺皮等开放结构皮革，也不要用于老旧、磨损或翻新过的皮革。','注意检查是否变色或掉色。','前 15 分钟内发现高点或条纹，补一点产品抹匀后立即擦掉。','保护后的皮革用温和皮革清洁剂和柔软超纤布清洁。'],url:GYEON+'leathershield-evo/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/v0e2qi19ct5tcp8n89j4x/GYEON-Q2-FabricCoat_M-en_5-1.pdf?rlkey=wtreg8avgkirw16rfs2n2g127&raw=1","source":"gyeon","language":"英文","version":"v5.1","hosting":"remote"},
 id:'G-fabriccoat',brand:'G',category:'coat',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HA20-07-1268，已过期）：不适用。","registration":"HA20-07-1268"}],"conflict":false},name:'Q² FabricCoat',type:'织物防水镀膜（最长 6 个月）',sizes:'120 ml · 400 ml',materials:'汽车织物 · 地毯 · 敞篷软顶',
 dilutions:[['喷涂','即用','喷雾壶']],
 steps:['彻底清洁织物，等它完全干燥。','均匀喷在表面上。','让织物充分浸润但不要湿透。','完全干燥后再使用。','固化前避免接触水。'],
 notes:["保持织物透气，不改变颜色和手感。","敞篷软顶效果很好。","用量约 80 ml / 平方米。"],url:GYEON+'fabriccoat/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/ufr0b24o4grhib6cwuqkr/GYEON-Q2-Purify-Coat_M-en_1-1.pdf?rlkey=be17h25j6oc4hgrhjd8akv88f&raw=1","source":"gyeon","language":"英文","version":"v1.1","hosting":"remote"},
 id:'G-purify-coat',brand:'G',category:'coat',ph:{"category":"alk","value":"7–10","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/ufr0b24o4grhib6cwuqkr/GYEON-Q2-Purify-Coat_M-en_1-1.pdf?rlkey=be17h25j6oc4hgrhjd8akv88f&raw=1","section":9},"evidence":[{"kind":"statement","source":"sds","text":"这份 SDS 的 pH 和黏度数值与同品牌另外两款完全相同，可能是厂家套用，pH 仅供参考。"}],"conflict":false},name:'Q² Purify Coat',type:'内饰抗菌镀膜（SiO₂ + 铜离子，最长 12 个月）',sizes:'100 ml',materials:'内饰塑料 · 皮革 · 织物',
 dilutions:[['镀膜（施工块）','即用','—']],
 steps:['用专用清洁剂清洁表面，擦掉清洁剂残留。','确认表面完全干燥。','在随附施工块（或 Q²M MF Applicator）上倒足量。','一次做一个部件，均匀涂开，不要过量。','让它干燥，擦掉可能的残留。','发现涂得不均匀时再涂一遍并擦掉。'],
 notes:["不含酒精，干燥后为自然哑光，不改变外观。","用于方向盘、把手等常接触的部位；维护用 Q²M Purify Maintain。"],url:GYEON+'q2-purify-coat/'},

// ───────────────────────── 封体 / 快速养护 ─────────────────────────
{
 sds:{"url":"https://www.dropbox.com/scl/fi/7wutv9fwviczvhi6yz57l/GYEON-Q2M-WetCoat_M-en_4-2.pdf?rlkey=am976j6rbnitsd8tjv4xffinp&raw=1","source":"gyeon","language":"英文","version":"v4.2","hosting":"remote"},
 id:'G-wetcoat',brand:'G',category:'seal',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/7wutv9fwviczvhi6yz57l/GYEON-Q2M-WetCoat_M-en_4-2.pdf?rlkey=am976j6rbnitsd8tjv4xffinp&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB20-07-0052）：不适用。","registration":"FB20-07-0052"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M WetCoat',type:'喷涂即冲疏水封体（最长 12 周）',sizes:'500 ml · 1 L · 4 L',materials:'车漆 · 塑料饰条 · 金属 · 轮毂 · 玻璃 · 镀膜车',
 dilutions:[['湿车喷涂','即用','喷雾壶']],
 steps:['彻底洗车。','车身仍湿时，逐块板件均匀喷 1–2 下。','立即用较强的水压冲洗。','不要让它干在表面上。','用擦干巾擦干。'],
 notes:["不需要固化时间，冲洗后立即疏水。","镀膜车和未镀膜车都可用，但不能替代镀膜。","耐 pH 2–11；用量约 80 ml / 车。"],url:GYEON+'wetcoat/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/owd14uw5ambhl6u6q6diw/GYEON-Q2M-WetCoat-Essence_M-en_3-1.pdf?rlkey=pinpup6st8vxwjdh7r5j6mdgw&raw=1","source":"gyeon","language":"英文","version":"v3.1","hosting":"remote"},
 id:'G-wetcoat-essence',brand:'G',category:'seal',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/owd14uw5ambhl6u6q6diw/GYEON-Q2M-WetCoat-Essence_M-en_3-1.pdf?rlkey=pinpup6st8vxwjdh7r5j6mdgw&raw=1","section":9},"evidence":[],"conflict":false},name:'Q²M WetCoat Essence',type:'浓缩型喷涂即冲封体（WetCoat 浓缩版）',sizes:'100 ml · 250 ml',materials:'车漆 · 塑料饰条 · 金属 · 轮毂 · 玻璃 · 镀膜车',
 dilutions:[['湿车喷涂','1:5 – 1:15','喷雾壶']],
 steps:['按 1:5–1:15 稀释后装进喷雾壶。','彻底洗车。','车身仍湿时，逐块板件均匀喷 1–2 下。','立即用较强的水压冲洗，不要让它干在表面上。','用擦干巾擦干。'],
 notes:['和 WetCoat 效果相同，每次用量更少；最长约 12 周。','不需要固化时间。'],url:GYEON+'wet-coat-essence/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/731i12dj74ixwhahev9zl/GYEON-Q2M-Cure_M-en_5-1.pdf?rlkey=9nythfhyq1f3wp0sclgcn1b88&raw=1","source":"gyeon","language":"英文","version":"v5.1","hosting":"remote"},
 id:'G-cure',brand:'G',category:'seal',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/731i12dj74ixwhahev9zl/GYEON-Q2M-Cure_M-en_5-1.pdf?rlkey=9nythfhyq1f3wp0sclgcn1b88&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB23-07-0297）：不适用。","registration":"HB23-07-0297"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M Cure REDEFINED',type:'SiO₂ 喷雾封体 / 镀膜维护（6 周以上）',sizes:'100 ml · 250 ml · 500 ml',materials:'车漆 · 镀膜车',
 dilutions:[['喷涂擦拭（超纤布）','即用','—']],
 steps:['喷在干净的表面或超纤布上。','均匀抹开。','擦掉残留到通透。','定期使用以维持镀膜性能。','不要用太多，避免条纹。'],
 notes:["镀膜后不久即可使用，减少新镀膜前期出现水斑。","未镀膜的车漆也可当喷雾封体。","用于亮面漆；哑光漆请用 Cure Matte。","耐 pH 4–9；用量约 30 ml / 车。"],url:GYEON+'cure-redefined/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/5hagmnr1zdh2e9hciaqkd/GYEON-Q2M-Cure-Matte_M-en_4-1.pdf?rlkey=gu5s5a1xzz25ylwtjrtau2i9d&raw=1","source":"gyeon","language":"英文","version":"v4.1","hosting":"remote"},
 id:'G-cure-matte',brand:'G',category:'seal',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/5hagmnr1zdh2e9hciaqkd/GYEON-Q2M-Cure-Matte_M-en_4-1.pdf?rlkey=gu5s5a1xzz25ylwtjrtau2i9d&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB23-07-0297）：不适用。","registration":"HB23-07-0297"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M Cure Matte REDEFINED',type:'哑光漆专用 SiO₂ 喷雾封体（6 周以上）',sizes:'500 ml',materials:'哑光漆',
 dilutions:[['喷涂擦拭（超纤布）','即用','—']],
 steps:['喷在干净的表面或超纤布上。','在哑光表面均匀抹开。','轻轻擦掉多余产品。','定期使用以维持保护和外观。','不要过量使用，以免留印。'],
 notes:["不增加光泽，保持原有哑光效果；可单独作为保护使用。","Q² Matte EVO 镀膜的官方维护产品。","用量约 30 ml / 车。"],url:GYEON+'cure-matte-redefined/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/be5ttmutnmb8edbaz5wgy/GYEON-Q2M-PPF-Maintain_M-en_4-1.pdf?rlkey=4rwwf0p793jmhkwt6ayq7pga5&raw=1","source":"gyeon","language":"英文","version":"v4.1","hosting":"remote"},
 id:'G-ppf-maintain',brand:'G',category:'seal',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/be5ttmutnmb8edbaz5wgy/GYEON-Q2M-PPF-Maintain_M-en_4-1.pdf?rlkey=4rwwf0p793jmhkwt6ayq7pga5&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB23-07-0297）：不适用。","registration":"HB23-07-0297"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M PPF Maintain REDEFINED',type:'PPF / 改色膜 SiO₂ 喷雾封体（6 周以上）',sizes:'500 ml',materials:'PPF（亮面、哑光） · 改色膜',
 dilutions:[['喷涂擦拭（超纤布）','即用','—']],
 steps:['先洗车并彻底擦干。','在膜面或超纤布上喷少量。','均匀抹开。','擦到干净均匀。','定期使用以维持效果。'],
 notes:["适用于市面上所有 PPF，也是 Q² PPF EVO 的理想维护产品。","提升滑度、疏水和自洁，并增加抗 UV 和抗氧化保护。","用量约 30 ml / 车。"],url:GYEON+'ppf-maintain-redefined/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/4oap0i2tqk24i1g5jtn1o/GYEON-Q2-Wax_M-en_2-3.pdf?rlkey=grc32vgd4t9mm45m5kljzla8c&raw=1","source":"gyeon","language":"英文","version":"v2.3","hosting":"remote"},
 id:'G-wax',brand:'G',category:'seal',ph:{"category":"neu","value":"7","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/4oap0i2tqk24i1g5jtn1o/GYEON-Q2-Wax_M-en_2-3.pdf?rlkey=grc32vgd4t9mm45m5kljzla8c&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB21-07-1268，已过期）：不适用。","registration":"HB21-07-1268"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q² Wax',type:'固体蜡（最长 6 个月）',sizes:'175 g',materials:'车漆 · 镀膜车',
 dilutions:[['打蜡（打蜡海绵）','即用','—']],
 steps:['先洗车、除染，并用 Q²M Prep 脱脂。','在干燥漆面上薄而均匀地涂一层。','至少固化 30 分钟再擦掉。','建议用 Q²M PolishWipe EVO 擦除。'],
 notes:['可叠多层，也可作为任何优质镀膜的面层；镀膜须已干燥固化（GYEON 镀膜在第一次洗车后、至少 14 天后）。','不能在湿车上施工。','用量约 15 g / 车。','SDS 第 3 节列有 0.1–0.2% 的六氟硅酸（含氟无机酸），含量很低，产品整体只按「对水生生物有害」分类。'],url:GYEON+'wax/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/326w5dybzwu9epenixqv9/GYEON-Q2M-CeramicDetailer_M-en_2-2.pdf?rlkey=lwa91s21hrvmzcedvgjc0msbh&raw=1","source":"gyeon","language":"英文","version":"v2.2","hosting":"remote"},
 id:'G-ceramicdetailer',brand:'G',category:'seal',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/326w5dybzwu9epenixqv9/GYEON-Q2M-CeramicDetailer_M-en_2-2.pdf?rlkey=lwa91s21hrvmzcedvgjc0msbh&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 FB20-07-0052）：不适用。","registration":"FB20-07-0052"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M CeramicDetailer',type:'SiO₂ 快速美容剂（镀膜车维护，最长 6 周）',sizes:'500 ml · 1 L',materials:'车漆 · 镀膜车',
 dilutions:[['干车或湿车（超纤布）','即用','—']],
 steps:['喷在表面或超纤布上。','擦拭表面。','把毛巾翻面抛到干净。','可在湿车上当擦干辅助使用。','定期使用以维持镀膜性能。'],
 notes:["主要为镀膜车设计，未镀膜的表面也可用；不能替代镀膜。","官方说明书：室外施工镀膜后 1 小时可上 Cure 或 CeramicDetailer。","用量约 40–50 ml / 车。"],url:GYEON+'ceramicdetailer/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/3x3evt7kcimt1md0qker1/GYEON-Q2M-QuickDetailer_M-en_4-1.pdf?rlkey=o6wszjfyzz9cyxgycir2jnpy3&raw=1","source":"gyeon","language":"英文","version":"v4.1","hosting":"remote"},
 id:'G-quickdetailer',brand:'G',category:'seal',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/3x3evt7kcimt1md0qker1/GYEON-Q2M-QuickDetailer_M-en_4-1.pdf?rlkey=o6wszjfyzz9cyxgycir2jnpy3&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB24-06-0161）：不适用。","registration":"HB24-06-0161"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M QuickDetailer',type:'含棕榈蜡的快速美容剂',sizes:'500 ml · 1 L · 4 L',materials:'车漆 · 镀膜车 · 车身外部各表面',
 dilutions:[['干车或湿车（超纤布）','即用','—']],
 steps:['喷在表面或超纤布上。','轻轻擦拭，去除浮尘、水印和指纹。','把毛巾翻面抛到无条纹。','可在湿车上当擦干辅助使用。','需要时随时使用。'],
 notes:["可日常使用；镀膜、蜡和封体表面都安全。","增加光泽和滑度，但不算保护产品。","用量约 40–50 ml / 车。"],url:GYEON+'quickdetailer/'},

// ───────────────────────── 塑料 / 轮胎养护 ─────────────────────────
{
 sds:{"url":"https://www.dropbox.com/scl/fi/kgljvrzebyy0jg24x6uil/GYEON-Q2M-Preserve_M-en_4-1.pdf?rlkey=ugoshmg766kkvg07jwevfam13&raw=1","source":"gyeon","language":"英文","version":"v4.1","hosting":"remote"},
 id:'G-preserve',brand:'G',category:'trim',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/kgljvrzebyy0jg24x6uil/GYEON-Q2M-Preserve_M-en_4-1.pdf?rlkey=ugoshmg766kkvg07jwevfam13&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB20-06-0400）：不适用；品牌官网写「PH LEVEL NEUTRAL」。","registration":"HB20-06-0400"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M Preserve',type:'塑料修复与保护剂（最长 3 个月）',sizes:'250 ml',materials:'内外饰塑料 · 发动机舱塑料',
 dilutions:[['涂抹（施工棉 / 超纤布）','即用','—']],
 steps:['先把塑料清洁干净。','用施工棉或超纤布均匀涂抹。','抹开，确保覆盖均匀。','让它被表面吸收。','需要时擦掉多余产品。'],
 notes:["适合轻度褪色的塑料，严重褪色的效果有限。","保持自然的原厂外观，不会发亮；有 UV 保护。","用量约 50 ml / 车。"],url:GYEON+'preserve/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/6237r7d1a5xp51eh17fkt/GYEON-Q2M-TireExpress_M-en_4-1.pdf?rlkey=9z6yud7idzl16m0wwee73a2ox&raw=1","source":"gyeon","language":"英文","version":"v4.1","hosting":"remote"},
 id:'G-tire-express',brand:'G',category:'trim',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/6237r7d1a5xp51eh17fkt/GYEON-Q2M-TireExpress_M-en_4-1.pdf?rlkey=9z6yud7idzl16m0wwee73a2ox&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB20-06-0391）：不适用。","registration":"HB20-06-0391"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M Tire Express',type:'水性日常轮胎上光（自然哑光）',sizes:'500 ml · 1 L · 4 L',materials:'轮胎 · 橡胶',
 dilutions:[['涂抹（轮胎海绵 / 刷子）','即用','—']],
 steps:['在干净的轮胎上施工。','用轮胎海绵或刷子均匀抹开。','让产品在表面流平。','需要时擦掉多余产品。','等轮胎干了再开车。'],
 notes:["干胎、湿胎都可施工。","自然哑光效果，可维持 2 次洗车以上。","用量约 10–15 ml / 4 条轮胎。"],url:GYEON+'tire-express/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/3hemkrqorx0nxu47sr6xm/GYEON-Q2-Tire_M-en_3-4.pdf?rlkey=s3eh6p3tnvwgg6r9qkwpwwz56&raw=1","source":"gyeon","language":"英文","version":"v3.4","hosting":"remote"},
 id:'G-tire',brand:'G',category:'trim',ph:{"category":"na","basis":"raw","source":{"kind":"korean-registration"},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HA21-07-1240）：不适用。","registration":"HA21-07-1240"}],"conflict":false},name:'Q² Tire',type:'SiO₂ 轮胎封体（光泽可调，5 次洗车以上）',sizes:'500 ml',materials:'轮胎 · 橡胶',
 dilutions:[['涂抹（轮胎海绵）','即用','—']],
 steps:['用 Q²M Tire Cleaner 彻底清洁轮胎，去除旧轮胎油和污染。','确认轮胎完全干燥。','用轮胎海绵均匀涂抹。','让产品与橡胶结合。','需要时擦掉多余产品，等它固化再开车。'],
 notes:["薄涂为自然缎面，多涂一些光泽更深。","正确施工不会甩胎油；按里程约可维持 6 次洗车。","用量约 10–15 ml / 4 条轮胎。"],url:GYEON+'tire/'},

// ───────────────────────── 玻璃 ─────────────────────────
{
 sds:{"url":"https://www.dropbox.com/scl/fi/7bm5lzvcjab4onwyu2f0i/GYEON-Q2M-Glass_M-en_5-2.pdf?rlkey=1uqvd07th29ulog7si1ako0wf&raw=1","source":"gyeon","language":"英文","version":"v5.2","hosting":"remote"},
 id:'G-glass',brand:'G',category:'glass',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/7bm5lzvcjab4onwyu2f0i/GYEON-Q2M-Glass_M-en_5-2.pdf?rlkey=1uqvd07th29ulog7si1ako0wf&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB24-01-0925）：原液中性。","registration":"HB24-01-0925"}],"conflict":false},name:'Q²M Glass',type:'内外玻璃清洁剂',sizes:'500 ml · 1 L · 4 L',materials:'车内外玻璃 · 贴膜玻璃',
 dilutions:[['玻璃（超纤布）','即用','—']],
 steps:['喷在玻璃或超纤布上。','均匀擦拭去除污染。','把毛巾翻面擦到通透。','很脏的区域重复。','定期使用保持视野清晰。'],
 notes:["对大多数贴膜玻璃安全，不留条纹。","可作玻璃镀膜前的清洁。","用量约 40 ml / 车。"],url:GYEON+'glass/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/ue1zxw4w9y1erwe09r3iz/GYEON-Q2M-Glass-_M-en_2-1.pdf?rlkey=wkkxp4th3pbt3whwxvb7ky83m&raw=1","source":"gyeon","language":"英文","version":"v2.1","hosting":"remote"},
 id:'G-glass-plus',brand:'G',category:'glass',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/ue1zxw4w9y1erwe09r3iz/GYEON-Q2M-Glass-_M-en_2-1.pdf?rlkey=wkkxp4th3pbt3whwxvb7ky83m&raw=1","section":9},"evidence":[],"conflict":false},name:'Q²M Glass+',type:'带驱水效果的玻璃清洁剂',sizes:'500 ml · 1 L',materials:'车内外玻璃 · 镀膜玻璃',
 dilutions:[['玻璃（超纤布）','即用','—']],
 steps:['喷在玻璃或超纤布上。','均匀擦拭去除污染。','用第二条毛巾擦到通透。','确保均匀覆盖，驱水效果才一致。','需要时再次使用。'],
 notes:['只有短期驱水效果，不能替代玻璃镀膜。','不要用太多，并使用干净合适的超纤布，以免留条纹。'],url:GYEON+'glass-plus/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/1cxovs5fmnaocb7wlngwh/GYEON-Q2M-DeFrost_M-en_1-1.pdf?rlkey=noj775u0149k8uylxocmqxgnd&raw=1","source":"gyeon","language":"英文","version":"v1.1","hosting":"remote"},
 id:'G-defrost',brand:'G',category:'glass',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/1cxovs5fmnaocb7wlngwh/GYEON-Q2M-DeFrost_M-en_1-1.pdf?rlkey=noj775u0149k8uylxocmqxgnd&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB24-01-0925）：原液中性。","registration":"HB24-01-0925"}],"conflict":false},name:'Q²M Defrost',type:'玻璃除冰剂（–40 °C 有效）',sizes:'500 ml · 4 L',materials:'玻璃 · 镀膜玻璃',
 dilutions:[['结冰玻璃','即用','喷雾壶']],
 steps:['均匀喷在结冰的玻璃上。','让它反应、削弱冰层。','冰层会自然与玻璃分离。','冰厚时再喷一次。','视野恢复后清理表面。'],
 notes:["几秒内起效，不需要刮冰。","对镀膜和未镀膜玻璃、周围的密封条和饰条都安全。"],url:GYEON+'defrost/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/upvpq6reztzu36mt7pb1f/GYEON-Q2-QuickView_M-en_2-1.pdf?rlkey=06hpn42xxnxk1srdqppc7ub1x&raw=1","source":"gyeon","language":"英文","version":"v2.1","hosting":"remote"},
 id:'G-quickview',brand:'G',category:'glass',ph:{"category":"acid","value":"4","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/upvpq6reztzu36mt7pb1f/GYEON-Q2-QuickView_M-en_2-1.pdf?rlkey=06hpn42xxnxk1srdqppc7ub1x&raw=1","section":9},"evidence":[],"conflict":false},name:'Q² QuickView',type:'快速玻璃驱水剂（最长 6 个月）',sizes:'120 ml',materials:'前挡 · 车外玻璃 · 镀膜玻璃',
 dilutions:[['涂抹','即用','—']],
 steps:['先把玻璃彻底清洁干净。','在玻璃上挤一次 QuickView。','适度加压均匀抹开，直到形成均匀、干燥的雾状薄膜。','固化 5–20 分钟（低温时更久），用湿超纤布擦到玻璃通透。'],
 notes:['车速约 70 km/h 起明显驱水。','擦净后即可使用；可叠在玻璃镀膜上作补充或快速翻新。','用量约 30 ml / 车。'],url:GYEON+'quickview/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/ndrrjcn8px3m4pxukhgko/GYEON-Q2M-GlassPolish_M-en_1-3.pdf?rlkey=f3b08ljlca139t479vdb0outm&raw=1","source":"gyeon","language":"英文","version":"v1.3","hosting":"remote"},
 id:'G-glasspolish',brand:'G',category:'glass',ph:{"category":"alk","value":"10","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/ndrrjcn8px3m4pxukhgko/GYEON-Q2M-GlassPolish_M-en_1-3.pdf?rlkey=f3b08ljlca139t479vdb0outm&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB26-06-0019）：不适用。","registration":"HB26-06-0019"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q²M GlassPolish',type:'玻璃抛光 / 镀膜前清洁',sizes:'120 ml · 250 ml',materials:'玻璃',
 dilutions:[['手工或机器（施工块 / 玻璃抛光盘）','即用','—']],
 steps:['先把玻璃彻底清洁干净。','把 GlassPolish 涂在玻璃抛光盘或施工块上。','在玻璃上均匀施工，直到只剩薄薄一层雾。','用干净超纤布擦掉残留。','需要时接着做玻璃保护。'],
 notes:["去除轻度水斑和表面污染；建议在玻璃镀膜前使用，确保结合。","用于施工前处理，不是日常清洁产品。"],url:GYEON+'glass-polish/'},

// ───────────────────────── 多功能清洁 APC ─────────────────────────
{
 sds:{"url":"https://www.dropbox.com/scl/fi/xrsqugyph6l55oo7j9kmg/GYEON-Q2M-APC_M-en_4-1.pdf?rlkey=tu8a7heszy7ghh00ygh5e3mfw&raw=1","source":"gyeon","language":"英文","version":"v4.1","hosting":"remote"},
 id:'G-apc',brand:'G',category:'apc',ph:{"category":"alk","value":"13","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/xrsqugyph6l55oo7j9kmg/GYEON-Q2M-APC_M-en_4-1.pdf?rlkey=tu8a7heszy7ghh00ygh5e3mfw&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HA25-01-0004）：原液碱性。","registration":"HA25-01-0004"}],"conflict":false},name:'Q²M APC',type:'浓缩多功能清洁剂（强度可调）',sizes:'1 L · 4 L',materials:'内外饰各类表面 · 发动机舱 · 轮拱',
 dilutions:[['常规（官方标注范围）','1:5 – 1:15','喷雾壶'],['重污染 / 外部','1:1 – 1:5','喷雾壶'],['内饰轻度清洁','1:10 – 1:20','喷雾壶']],
 steps:['按清洁任务稀释。','把稀释液施于表面或清洁工具。','需要时轻轻刷洗。','擦掉或冲掉松动的污染，不要让它干掉。','效果不够时调整比例再做一次。'],
 notes:["用于专用清洁剂不够用的场合；内饰稀释后可用。","用量约 150 ml / 车。"],url:GYEON+'apc/'},

// ───────────────────────── 内饰 ─────────────────────────
{
 sds:{"url":"https://www.dropbox.com/scl/fi/qoozr5fxlmx1swcjsst94/GYEON-Q2M-TrimCleaner_M-en_3-2.pdf?rlkey=e5jrydhj5j2hcxofgkqvtmawu&raw=1","source":"gyeon","language":"英文","version":"v3.2","hosting":"remote"},
 id:'G-trimcleaner',brand:'G',category:'int',ph:{"category":"alk","value":"10","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/qoozr5fxlmx1swcjsst94/GYEON-Q2M-TrimCleaner_M-en_3-2.pdf?rlkey=e5jrydhj5j2hcxofgkqvtmawu&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HA25-01-0008）：原液碱性；品牌官网写「PH LEVEL NEUTRAL」。","registration":"HA25-01-0008"},{"kind":"resolution","rule":"sds-overrides-category","previousCategory":"neu"}],"conflict":true},name:'Q²M TrimCleaner',type:'即用型塑料饰件清洁剂（自然哑光、轻度抗静电）',sizes:'500 ml',materials:'内饰塑料 · 外饰塑料',
 dilutions:[['饰件（超纤布或刷子）','即用','—']],
 steps:['喷在超纤布上或直接喷在表面。','轻轻擦拭，去除灰尘和轻度污垢。','把毛巾翻面擦干净。','常用部位需要时重复。','定期用于内饰维护。'],
 notes:["不留残留；清洁后可接 Q²M Preserve。","官方说明书：Q² Trim EVO 施工前用它清洁外饰塑料。","用量约 100 ml / 车。"],url:GYEON+'trim-cleaner/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/rfd3hm57uj2zmpqcfhm3a/GYEON-Q2M-FabricCleaner-_M-en_3-1.pdf?rlkey=pd6optyh2en3b6b1zlr34arvj&raw=1","source":"gyeon","language":"英文","version":"v3.1","hosting":"remote"},
 id:'G-fabriccleaner',brand:'G',category:'int',ph:{"category":"alk","value":"13","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/rfd3hm57uj2zmpqcfhm3a/GYEON-Q2M-FabricCleaner-_M-en_3-1.pdf?rlkey=pd6optyh2en3b6b1zlr34arvj&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HA25-01-0010）：原液碱性。","registration":"HA25-01-0010"}],"conflict":false},name:'Q²M FabricCleaner',type:'织物清洁剂 / 预喷剂（低泡）',sizes:'1 L',materials:'座椅织物 · 地毯 · 织物饰件',
 dilutions:[['织物','即用','喷雾壶']],
 steps:['先吸尘。','喷在织物上或刷子上。','轻轻刷洗松动污垢。','用干净毛巾擦掉或抽洗。','让织物完全干燥。'],
 notes:["不留残留，可在 Q² FabricCoat 施工前使用。"],url:GYEON+'fabriccleaner/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/4e4h5h8u8sak8i94fzeh4/GYEON-Q2M-LeatherCleaner-Natural_M-en_1-1.pdf?rlkey=4f95lzuqe9mq8co3pvgsxx59q&raw=1","source":"gyeon","language":"英文","version":"v1.1","hosting":"remote"},
 id:'G-leathercleaner-natural',brand:'G',category:'int',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/4e4h5h8u8sak8i94fzeh4/GYEON-Q2M-LeatherCleaner-Natural_M-en_1-1.pdf?rlkey=4f95lzuqe9mq8co3pvgsxx59q&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB24-01-0107）：原液弱碱性；品牌官网写 pH 中性。","registration":"HB24-01-0107"},{"kind":"resolution","rule":"sds-overrides-category","previousCategory":"alk"}],"conflict":true},name:'Q²M LeatherCleaner Natural',type:'温和皮革清洁剂（日常维护）',sizes:'500 ml · 1 L',materials:'皮革（Nappa、半苯胺等现代汽车皮革）',
 dilutions:[['皮革（皮革刷 / 海绵）','即用','—']],
 steps:['取适量在柔软的皮革刷或海绵上。','在皮革表面轻轻揉擦。','用干净超纤布擦掉残留。','常用部位需要时重复。','需要时接着上保护。'],
 notes:["留下原厂哑光表面；不会去除已有的皮革镀膜。","可作皮革镀膜前的清洁。","用量约 100 ml / 车。"],url:GYEON+'leathercleaner-natural/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/h0cxiufbxeg4fwu2m5ygq/GYEON-Q2M-LeatherCleaner-Strong_M-en_4-1.pdf?rlkey=1qzsp8ry838vqenhp6iixyg89&raw=1","source":"gyeon","language":"英文","version":"v4.1","hosting":"remote"},
 id:'G-leathercleaner-strong',brand:'G',category:'int',ph:{"category":"alk","value":"10","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/h0cxiufbxeg4fwu2m5ygq/GYEON-Q2M-LeatherCleaner-Strong_M-en_4-1.pdf?rlkey=1qzsp8ry838vqenhp6iixyg89&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB20-01-1248，已过期）：原液弱碱性。","registration":"HB20-01-1248"}],"conflict":false},name:'Q²M LeatherCleaner Strong',type:'强力皮革清洁剂（深层清洁 / 镀膜前处理）',sizes:'500 ml · 1 L',materials:'现代汽车皮革',
 dilutions:[['皮革（皮革刷 / 海绵）','即用','—']],
 steps:['取适量在皮革刷或海绵上。','在皮革表面轻轻揉擦。','用超纤布擦掉松动的污垢。','很脏的区域需要时重复。','清洁后接着上皮革保护。'],
 notes:["用于严重脏污或镀膜前的深层清洁，不用于日常维护。","不留残留，不会去除已有的皮革镀膜。","用量约 100 ml / 车。"],url:GYEON+'leathercleaner-strong/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/74kwir64z9a1bmxzq222c/GYEON-Q2-LeatherCoat_M-en_4-1.pdf?rlkey=jy9z3qarubcf896ctwhw9k7zb&raw=1","source":"gyeon","language":"英文","version":"v4.1","hosting":"remote"},
 id:'G-leathercoat',brand:'G',category:'int',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/74kwir64z9a1bmxzq222c/GYEON-Q2-LeatherCoat_M-en_4-1.pdf?rlkey=jy9z3qarubcf896ctwhw9k7zb&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB23-07-0305）：不适用。","registration":"HB23-07-0305"},{"kind":"resolution","rule":"sds-overrides-na"}],"conflict":true},name:'Q² LeatherCoat REDEFINED',type:'皮革封体（Nappa / 半苯胺皮，3 个月以上）',sizes:'120 ml · 500 ml',materials:'皮革（Nappa、半苯胺等各类汽车皮革）',
 dilutions:[['涂抹（超纤布 / 施工棉）','即用','—']],
 steps:['先把皮革彻底清洁干净。','把产品倒在柔软超纤布或施工棉上。','在皮革表面均匀抹开。','让皮革吸收。','擦掉可见的残留。'],
 notes:["形成看不见的疏水层，防液体、汗水、污垢和衣物掉色，保持原厂哑光。","防牛仔裤掉色的效果有限；要最强防护用 Q² LeatherShield EVO。"],url:GYEON+'leathercoat-redefined/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/aobigj13dv85khnrh7bu7/GYEON-Q2M-InteriorDetailer_M-en_3-1.pdf?rlkey=9vg4df7rns3hz3vsaft1v3ust&raw=1","source":"gyeon","language":"英文","version":"v3.1","hosting":"remote"},
 id:'G-interior-detailer',brand:'G',category:'int',ph:{"category":"neu","value":"8","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/aobigj13dv85khnrh7bu7/GYEON-Q2M-InteriorDetailer_M-en_3-1.pdf?rlkey=9vg4df7rns3hz3vsaft1v3ust&raw=1","section":9},"evidence":[{"kind":"statement","source":"korean-registration","text":"韩国生活化学品申报（申报号 HB20-01-1288）：原液中性。","registration":"HB20-01-1288"}],"conflict":false},name:'Q²M InteriorDetailer',type:'内饰快速美容剂（含酒精，可杀灭 99% 细菌）',sizes:'500 ml · 1 L · 4 L',materials:'内饰硬塑料 · 屏幕',
 dilutions:[['喷在超纤布上擦拭','即用','—']],
 steps:['喷在超纤布上。','轻轻擦拭内饰表面。','重点擦方向盘和按键等常接触的部位。','让表面自然风干。','定期使用做快速内饰维护。'],
 notes:["可日常使用，留下自然无残留的表面。","用量约 80 ml / 车。"],url:GYEON+'interior-detailer/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/tb4g0ulhr74lpu8gekm3f/GYEON-Q2M-Purify-Maintain_M-en_1-1.pdf?rlkey=lyxhm4uzyebacixo8b6ibw5cm&raw=1","source":"gyeon","language":"英文","version":"v1.1","hosting":"remote"},
 id:'G-purify-maintain',brand:'G',category:'int',ph:{"category":"alk","value":"7–10","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/tb4g0ulhr74lpu8gekm3f/GYEON-Q2M-Purify-Maintain_M-en_1-1.pdf?rlkey=lyxhm4uzyebacixo8b6ibw5cm&raw=1","section":9},"evidence":[{"kind":"statement","source":"sds","text":"这份 SDS 的 pH 和黏度数值与同品牌另外两款完全相同，可能是厂家套用，pH 仅供参考。"}],"conflict":false},name:'Q²M Purify Maintain',type:'内饰抗菌维护喷雾（最长 6 个月）',sizes:'500 ml · 4 L',materials:'内饰塑料 · 皮革 · 织物',
 dilutions:[['喷在超纤布上擦拭','即用','—']],
 steps:['喷在超纤布上。','轻轻擦拭内饰表面，清洁并补充保护。','均匀覆盖，不要过湿。','让表面自然干燥。','作为内饰维护定期使用。'],
 notes:["用于维护 Q² Purify Coat 的抗菌保护，不能替代它。"],url:GYEON+'q2m-purify-maintain/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/z79f3a9wjooh75eonkbld/GYEON-Q2M-Odor-Remover_M-en_1-2.pdf?rlkey=m0cv377v4dr9uain59jn6y25h&raw=1","source":"gyeon","language":"英文","version":"v1.2","hosting":"remote"},
 id:'G-odorremover',brand:'G',category:'int',ph:{"category":"alk","value":"7–10","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/z79f3a9wjooh75eonkbld/GYEON-Q2M-Odor-Remover_M-en_1-2.pdf?rlkey=m0cv377v4dr9uain59jn6y25h&raw=1","section":9},"evidence":[{"kind":"statement","source":"sds","text":"这份 SDS 的 pH 和黏度数值与同品牌另外两款完全相同，可能是厂家套用，pH 仅供参考。"}],"conflict":false},name:'Q²M OdorRemover',type:'车内除味喷雾（分解异味，不掩盖）',sizes:'500 ml',materials:'内饰织物 · 塑料',
 dilutions:[['异味源','即用','喷雾壶']],
 steps:['清除松散污垢，找到异味来源。','喷在异味区域。','让产品作用于异味源。','视表面擦掉或让它自然干燥。','异味重时重复。'],
 notes:["针对食物、潮湿和日常使用造成的有机异味；不留香味。"],url:GYEON+'q2m-odor-remover/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/p4zn4zolaxkfa84tcw0z1/GYEON-Q2M-OdorRemover-pads_M-en_1-1.pdf?rlkey=fx9vn24gbx884t6i8qfof6v5m&raw=1","source":"gyeon","language":"英文","version":"v1.1","hosting":"remote"},
 id:'G-odorremover-pads',brand:'G',category:'int',ph:{"category":"alk","value":"7–10","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/p4zn4zolaxkfa84tcw0z1/GYEON-Q2M-OdorRemover-pads_M-en_1-1.pdf?rlkey=fx9vn24gbx884t6i8qfof6v5m&raw=1","section":9},"evidence":[],"conflict":false},name:'Q²M OdorRemover Pads',type:'持续除味贴片（无香味）',sizes:'—',materials:'车内',dilutions:[],
 steps:['撕掉贴片背胶。','贴在车内隐蔽处，例如座椅下方或后备箱。','让它持续作用。','效果下降时更换，一片约可用 3–4 周。'],
 notes:['可与 Q²M OdorRemover 喷雾搭配使用。'],url:GYEON+'q2m-odor-remover-pad/'},

// ───────────────────────── 配件 ─────────────────────────
{id:'G-silkdryer',brand:'G',category:'acc',name:'Q²M SilkDryer EVO',type:'扭绒擦干巾（530 GSM）',sizes:'50×55 cm · 70×90 cm',materials:'车漆',dilutions:[],
 steps:['把毛巾平铺在湿表面上。','轻拉或轻拍吸走水分。','擦干时不要加压。','吸饱水后拧干继续用。','用后清洗以保持性能。'],
 notes:['吸水量比旧版高约 50%；几乎无锁边，复杂曲面也安全。'],url:GYEON+'silkdryer-evo/'},

{id:'G-softwipe',brand:'G',category:'acc',name:'Q²M SoftWipe EVO',type:'厚绒超纤布（擦镀膜 / 快速美容剂）',sizes:'40×40 cm',materials:'车漆',dilutions:[],
 steps:['用于干净或轻度脏污的表面。','需要时把产品喷在表面或毛巾上。','轻压擦拭。','需要时翻到干净的一面。','用后清洗以保持柔软。'],
 notes:['适合最软的漆面，适合配 Q²M CeramicDetailer 或 Q²M Cure；超声波切边。'],url:GYEON+'softwipe-evo/'},

{id:'G-polishwipe',brand:'G',category:'acc',name:'Q²M PolishWipe EVO',type:'抛光残留擦除布（双面，310 GSM）',sizes:'40×40 cm',materials:'车漆',dilutions:[],
 steps:['抛光后在冷却的漆面上使用。','轻轻擦掉抛光残留。','经常翻到干净的一面。','擦除时不要加压。','用后清洗以保持柔软。'],
 notes:['官方建议也用它擦除 Q² Wax。'],url:GYEON+'polishwipe-evo/'},

{id:'G-glasswipe',brand:'G',category:'acc',name:'Q²M GlassWipe EVO',type:'玻璃专用超纤布（390 GSM）',sizes:'40×40 cm',materials:'玻璃',dilutions:[],
 steps:['把玻璃清洁剂喷在玻璃或毛巾上。','均匀擦拭去除污染。','翻到干的一面收尾，去除条纹。','轻压即可。','用后清洗以保持性能。'],
 notes:[],url:GYEON+'glasswipe-evo/'},

{id:'G-suede',brand:'G',category:'acc',name:'Q²M Suede EVO',type:'镀膜施工用超短绒麂皮布（200 GSM）',sizes:'10×10 cm · 20×20 cm · 40×40 cm',materials:'车漆 · 玻璃',dilutions:[],
 steps:['把麂皮布包在镀膜施工块上。','把镀膜倒在麂皮面上。','以重叠的手法均匀抹开。','吸饱后更换。','用后丢弃。'],
 notes:['也可作镀膜擦除的最后一遍「保险布」，减少条纹和高点。','可去除玻璃驱水镀膜固化后的薄雾。'],url:GYEON+'suede-evo/'},

{id:'G-smoothie',brand:'G',category:'acc',name:'Q²M Smoothie EVO',type:'超纤洗车手套（1250 GSM）',sizes:'—',materials:'车漆',dilutions:[],
 steps:['配香波以正确手法洗车，让手套在表面滑动带走污垢。'],
 notes:['三种纤维组合，加入扭绒纤维，清洁力比旧版更强；无锁边。','寿命 200 次洗车以上。'],url:GYEON+'smoothie-evo/'},

{id:'G-silkmitt',brand:'G',category:'acc',name:'Q²M SilkMitt EVO',type:'擦干手套（难擦部位 / 除染辅助）',sizes:'—',materials:'车漆 · 轮毂',dilutions:[],
 steps:['用于擦干车身低处、复杂轮毂、出风口和后备箱边缘等 SilkDryer 不方便的部位。'],
 notes:['也可辅助安全去除柏油、树胶等沉积，不在漆面留痕。'],url:GYEON+'silkmitt-evo/'},

{id:'G-wheelmitt',brand:'G',category:'acc',name:'Q²M WheelMitt EVO',type:'轮毂清洗手套（1250 GSM）',sizes:'—',materials:'轮毂',dilutions:[],
 steps:['用于清洗轮毂和难以触及的部位。'],
 notes:['三种纤维组合，加入扭绒纤维，清洁力比旧版更强。'],url:GYEON+'wheelmitt-evo/'},

{id:'G-coating-applicator',brand:'G',category:'acc',name:'Q²M Coating Applicator',type:'镀膜施工块',sizes:'—',materials:'车漆 · 车身外部各表面',dilutions:[],
 steps:['按表面大小选择合适尺寸。','把镀膜直接倒在麂皮或短绒面上。','以重叠的手法均匀抹开。','注意饱和程度，需要时更换。','按所用镀膜丢弃或清洁。'],
 notes:['漆面镀膜官方推荐用它，而不是 MF Applicator。'],url:GYEON+'coating-applicator/'},

{id:'G-mf-applicator',brand:'G',category:'acc',name:'Q²M MF Applicator EVO',type:'超纤施工棉（2 片装）',sizes:'120×95×25 mm',materials:'车漆 · 塑料饰条 · 轮毂 · 皮革 · 金属',dilutions:[],
 steps:['用于快速均匀地涂抹镀膜、封体或塑料 / 皮革养护剂。'],
 notes:['漆面镀膜官方推荐用 Q²M Coating Applicator。'],url:GYEON+'mf-applicator-evo-2-pack/'},

{id:'G-tire-applicator',brand:'G',category:'acc',name:'Q²M Tire Applicator',type:'轮胎上光海绵（2 个装，大 / 小）',sizes:'2 个装',materials:'轮胎',dilutions:[],
 steps:['按轮胎扁平比选择尺寸。','把轮胎上光剂直接倒在海绵面上。','在轮胎侧壁均匀抹开。','控制压力，覆盖均匀。','用后冲洗或更换。'],
 notes:[],url:GYEON+'tire-applicator/'},

{id:'G-wheelbrush',brand:'G',category:'acc',name:'Q²M WheelBrush',type:'超纤轮毂刷',sizes:'—',materials:'轮毂',dilutions:[],
 steps:['先冲掉轮毂上的浮尘。','按需要施加轮毂清洁剂或香波。','用 WheelBrush 轻轻刷洗。','控制力度清洁轮毂内圈和窄缝。','彻底冲洗，用后清洗刷子。'],
 notes:[],url:GYEON+'wheelbrush/'},

{id:'G-tirebrush',brand:'G',category:'acc',name:'Q²M TireBrush',type:'耐化学品硬毛轮胎刷',sizes:'—',materials:'轮胎 · 橡胶',dilutions:[],
 steps:['配 Q²M Tire Cleaner 刷洗轮胎侧壁。'],
 notes:[],url:GYEON+'tire-brush/'},

{id:'G-leatherbrush',brand:'G',category:'acc',name:'Q²M LeatherBrush',type:'马毛皮革刷（木柄）',sizes:'—',materials:'皮革',dilutions:[],
 steps:['配 Q²M LeatherCleaner 轻刷皮革表面。'],
 notes:['天然马毛，适用于各类汽车皮革。'],url:GYEON+'leatherbrush/'},

{id:'G-pad-heavy-cut',brand:'G',category:'acc',name:'Q²M Heavy Cut',type:'最强切削海绵抛光盘',sizes:'145/80 mm · 厚 20 mm 或 25 mm',materials:'车漆',dilutions:[],
 steps:['只在干净、冷却的漆面上使用。','用重切削研磨剂预涂抛光盘。','控制转速和压力施工。','保持抛光盘平贴表面。','需要时换较软的抛光盘精修。'],
 notes:['用于深划痕、氧化和砂纸痕。'],url:GYEON+'heavy-cut/'},

{id:'G-pad-cut',brand:'G',category:'acc',name:'Q²M Cut',type:'高切削海绵抛光盘',sizes:'145/80 mm · 厚 20 mm 或 25 mm',materials:'车漆',dilutions:[],
 steps:['只在干净、冷却的漆面上使用。','用合适的研磨剂预涂抛光盘。','用抛光机以可控的转速施工。','保持抛光盘平贴表面。','需要时再精修一步。'],
 notes:['比羊毛盘更好控制，抛后表面更均匀。'],url:GYEON+'cut/'},

{id:'G-pad-polish',brand:'G',category:'acc',name:'Q²M Polish（抛光盘）',type:'中等海绵抛光盘',sizes:'145/80 mm · 厚 20 mm 或 25 mm',materials:'车漆',dilutions:[],
 steps:['只在干净、冷却的漆面上使用。','用中等抛光剂预涂抛光盘。','以可控转速、轻压施工。','保持抛光盘平贴表面。','检查表面，需要时重复。'],
 notes:['用于研磨后的精修，去除轻微缺陷和雾面。'],url:GYEON+'polish-2/'},

{id:'G-pad-finish',brand:'G',category:'acc',name:'Q²M Finish',type:'收光海绵抛光盘',sizes:'145/80 mm · 厚 20 mm 或 25 mm',materials:'车漆',dilutions:[],
 steps:['只在干净、冷却的漆面上使用。','用收光抛光剂预涂抛光盘。','以低转速、轻压施工。','保持抛光盘平贴表面。','擦掉残留并检查表面。'],
 notes:[],url:GYEON+'finish/'},

{id:'G-wool-heavy-cut',brand:'G',category:'acc',name:'Q²M Rotary Wool Heavy Cut',type:'转盘机重切削羊毛盘（美利奴羊毛）',sizes:'130/80 mm',materials:'车漆',dilutions:[],
 steps:['只在干净、冷却的漆面上使用。','用重切削研磨剂预涂羊毛盘。','用转盘机以可控转速施工。','保持羊毛盘平贴表面。','需要时再精修一步。'],
 notes:['用于第一步快速去除严重缺陷。'],url:GYEON+'wool-heavy-cut/'},

{id:'G-wool-cut',brand:'G',category:'acc',name:'Q²M Rotary Wool Cut',type:'转盘机中切削羊毛盘',sizes:'130/80 mm',materials:'车漆',dilutions:[],
 steps:['只在干净、冷却的漆面上使用。','用合适的研磨剂预涂羊毛盘。','用转盘机以可控转速施工。','保持压力均匀、羊毛盘平贴表面。','需要时再精修一步。'],
 notes:['比重切削羊毛盘更好控制，抛后表面更干净。'],url:GYEON+'wool-cut/'},

{
 sds:{"url":"https://www.dropbox.com/scl/fi/zsu40e5xen7fyfh5gtgp2/GYEON-Q2M-TowelWash_M-en_3-1.pdf?rlkey=5elznd1s0uyqai7j8ptrjty2g&raw=1","source":"gyeon","language":"英文","version":"v3.1","hosting":"remote"},
 id:'G-towelwash',brand:'G',category:'towel',ph:{"category":"alk","value":"9","basis":"raw","source":{"kind":"sds","url":"https://www.dropbox.com/scl/fi/zsu40e5xen7fyfh5gtgp2/GYEON-Q2M-TowelWash_M-en_3-1.pdf?rlkey=5elznd1s0uyqai7j8ptrjty2g&raw=1","section":9},"evidence":[{"kind":"resolution","rule":"sds-overrides-category","previousCategory":"neu"}],"conflict":true},name:'Q²M TowelWash',type:'超纤布 / 羊毛清洗剂',sizes:'500 ml',materials:'超纤布 · 羊毛手套',
 dilutions:[['洗衣机（每次）','15–30 ml','—']],
 steps:['抖掉毛巾上的碎屑。','在洗衣机里加 15–30 ml TowelWash，不要过量。','用温水、轻柔程序洗。','不要用柔顺剂或漂白剂。','自然晾干。'],
 notes:["可分解抛光残留；擦过镀膜的毛巾不要再重复使用。"],url:GYEON+'towelwash/'},
];

export const flows: Flow[] = [
{id:'f-g-coat',brand:'G',name:'漆面镀膜施工（Paint Coatings Manual）',en:'GYEON Paint Coatings · One / Pure / Mohs / Syncro EVO',scene:'coated',tags:['交通膜 / 深度清洁','新车'],
 summary:'官方 2025 版漆面镀膜说明书的施工顺序：Foam 预洗 → 强去油洗车 → Iron / Tar / Clay 除染 → 至少一步抛光 → 再洗一次 → Prep 脱脂等 15 分钟 → 镀膜 → 12 小时保持干燥，之后用 Cure 维护。',
 steps:[
  {phase:'预洗',products:['G-foam'],ratio:'1:15',how:'先用 Q²M Foam 预洗车身，高压冲洗。'},
  {phase:'去油洗车',extras:['Q²M Degrease Tabs（本站未收录）','两个水桶'],how:'用强去油力的洗车液（官方用 Q²M Degrease Tabs）彻底手洗，去掉旧蜡和油脂。'},
  {phase:'除铁',pH:'neu',products:['G-iron'],ratio:'即用',how:'喷在冷却的漆面上，让它反应，需要时轻轻揉开，彻底冲洗，不要干掉。'},
  {phase:'去柏油',products:['G-tar'],ratio:'即用',how:'施于柏油区域，溶解后擦掉或冲掉。'},
  {phase:'黏土（需要时）',products:['G-clay','G-claylube'],how:'用 ClayLube 充分润滑，不加压滑动黏土，经常揉捏翻面。'},
  {phase:'抛光',products:['G-compound-plus','G-compound','G-polish','G-primer'],alt:true,extras:['抛光盘'],how:'建议至少一步抛光去除缺陷、提升光泽。不需要修复的新车，用 Q² Primer 抛一遍去除运输保护残留。'},
  {phase:'再洗一次',extras:['Q²M Degrease Tabs（本站未收录）','热水'],how:'抛光后用 Q²M Degrease Tabs 加热水洗车，去除抛光残留。'},
  {phase:'脱脂',products:['G-prep'],ratio:'即用',how:'必需步骤。表面须无油、完全干燥；擦完等 15 分钟再进行下一步。'},
  {phase:'镀膜',variants:[
    {name:'One EVO',products:['G-one-evo'],ratio:'即用',how:'涂厚而均匀的一层并流平，整块板涂完后 10–30 秒内擦掉。可叠第二层，间隔至少 1 小时。'},
    {name:'Pure EVO',products:['G-pure-evo'],ratio:'即用',how:'单层镀膜。擦除窗口最长约 10 分钟：炎热潮湿时立即擦，温和凉爽时 10 分钟内擦。'},
    {name:'Mohs EVO',products:['G-mohs-evo'],ratio:'即用',how:'每次约一个肩宽的区域，开始「出汗」时（约 10 秒）擦掉。需要时 1 小时后上第二层（最多 2 层）。'},
    {name:'Syncro EVO',products:['G-syncro-evo'],ratio:'即用',how:'先上 Mohs EVO 底层；最后一层 Mohs 后 1 小时，交叉纹路上一层厚的 Skin EVO，10–30 秒内擦掉。'},
  ]},
  {phase:'固化与维护',products:['G-cure','G-ceramicdetailer','G-cancoat-evo','G-wax'],alt:true,how:'保持干燥 12 小时；前 14 天不要用强力清洁剂洗车。室外施工的，1 小时后可上 Cure 或 CeramicDetailer。日常维护用 Cure；One / Pure / Mohs 镀膜 1 小时后可罩 CanCoat EVO；第一次洗车后（至少 14 天）可罩 Q² Wax。'},
 ],
 notes:['不要在阳光直射下施工；室外施工建议 15–25 °C，未来 24 小时有下雨风险时不要施工。','温度和湿度越高，镀膜闪干越快；没经验时不要等，立即擦掉。每层准备 4–6 条优质超纤布，最后用 Q²M Suede 擦一遍。','用反射光（灯照墙或天花板）检查高点。'],
 url:G_MAN+'2025paintcoatingsmanual.pdf'},

{id:'f-g-infinite',brand:'G',name:'INFINITE 认证镀膜施工',en:'GYEON Certified Detailer · Q² INFINITE',scene:'coated',tags:['新车'],
 summary:'官方认证施工店说明书：与漆面镀膜相同的前处理，INFINITE Base 涂完全车后可立即上 TopCoat；至少在店内放 12 小时，可用红外灯加速干燥但不能代替固化。',
 steps:[
  {phase:'预洗',products:['G-foam'],ratio:'1:15',how:'Q²M Foam 预洗，再用 Q²M Degrease Tabs 等强去油洗车液彻底手洗。'},
  {phase:'除染',products:['G-iron','G-tar','G-clay'],how:'Q²M Iron、Q²M Tar 除染，需要时用 Q²M Clay。'},
  {phase:'抛光',products:['G-compound-plus','G-compound','G-polish','G-primer'],alt:true,how:'建议至少一步抛光。不需要修复的新车用 Q² Primer 抛一遍，去除运输保护残留。'},
  {phase:'再洗一次并脱脂',products:['G-prep'],extras:['Q²M Degrease Tabs（本站未收录）','热水'],ratio:'即用',how:'用 Degrease Tabs 加热水洗车，再用 Q²M Prep 脱脂（必需），等 15 分钟。'},
  {phase:'底层镀膜',products:['G-infinite-base-1','G-infinite-base-2'],alt:true,ratio:'即用',how:'厚而均匀地涂，关键是流平；每次约一个肩宽的区域，约 10 秒后擦掉（炎热时立即擦）。Type 2 擦除窗口更长。'},
  {phase:'面层（可选）',products:['G-infinite-top-1','G-infinite-top-2'],alt:true,ratio:'即用',how:'全车涂完底层后立即按同样的板块顺序施工面层，立即擦掉；大板块分区。'},
  {phase:'固化',extras:['红外灯（可选）'],how:'至少在店内放 12 小时。可在全车完成后用红外灯以 55–60 °C 表面温度加热每块板 10 分钟，层间不要用。完全固化最长约 3 周；交车时提醒客户前 14 天不要用强力清洁剂洗车。'},
 ],
 notes:['INFINITE 系列只供 GYEON 认证施工店使用。','Base Type 1 可作单层独立镀膜。','年度 / 半年度维护：完全除染后，如底层性能下降，可补一层 Q² CanCoat Pro EVO。'],
 url:G_MAN+'2025certifieddetailercoatingsmanual.pdf'},

{id:'f-g-matte',brand:'G',name:'哑光漆镀膜施工（Matte EVO）',en:'GYEON Q² Matte EVO',scene:'coated',tags:['哑光'],
 summary:'官方说明书：哑光面不抛光、不过黏土，只做化学除染，Prep 脱脂后上 Matte EVO，之后用 Cure Matte 维护。',
 steps:[
  {phase:'预洗与去油洗车',products:['G-foam'],extras:['Q²M Degrease Tabs（本站未收录）'],ratio:'1:15',how:'Q²M Foam 预洗，再用强去油洗车液彻底手洗。'},
  {phase:'化学除染',products:['G-iron','G-tar'],how:'用 Q²M Iron 和 Q²M Tar 去除铁粉和柏油。'},
  {phase:'再洗一次并脱脂',products:['G-prep'],extras:['Q²M Degrease Tabs（本站未收录）','热水'],ratio:'即用',how:'Degrease Tabs 加热水洗车，再用 Q²M Prep 脱脂（必需），等 15 分钟。'},
  {phase:'镀膜',products:['G-matte-evo'],ratio:'即用',how:'摇匀，厚而均匀地涂一层，仔细流平；整块板涂完后 10–30 秒内擦掉，不留条纹。'},
  {phase:'固化与维护',products:['G-cure-matte'],how:'保持干燥 12 小时；前 14 天不要用强力清洁剂洗车。洗车时用 Q²M Cure Matte 维护。'},
 ],
 notes:['Matte EVO 也适用于哑光 PPF 和改色膜。','洗车避免用力擦，哑光面无法像亮面一样抛光修复。'],
 url:G_MAN+'2025paintcoatingsmanual.pdf'},

{id:'f-g-ppf',brand:'G',name:'PPF 镀膜与维护（PPF EVO）',en:'GYEON Q² PPF EVO + PPF Maintain',scene:'ppf',tags:['保护 / 镀膜车'],
 summary:'官方说明书：PPF 有划痕或氧化时先用 PPF Renew 处理，Prep 脱脂后上 PPF EVO；日常用 PPF Wash 洗车、PPF Maintain 维护。',
 steps:[
  {phase:'预洗与去油洗车',products:['G-foam'],extras:['Q²M Degrease Tabs（本站未收录）'],ratio:'1:15',how:'Q²M Foam 预洗，再用强去油洗车液彻底手洗。'},
  {phase:'膜面翻新（需要时）',products:['G-ppf-renew'],ratio:'即用',how:'PPF 有划痕、氧化或污染时，手工或机器轻压施工 PPF Renew，擦掉残留。'},
  {phase:'脱脂',products:['G-prep'],ratio:'即用',how:'必需步骤。表面须无油、完全干燥，等 15 分钟。'},
  {phase:'镀膜',products:['G-ppf-evo'],ratio:'即用',how:'摇匀，每次约一个肩宽的区域，厚而均匀地涂并流平，10–30 秒内擦掉。12 小时后完全干燥才能开车。'},
  {phase:'日常洗车',pH:'neu',products:['G-ppf-wash'],ratio:'1:500',how:'前 14 天不要用强力清洁剂洗车。之后用 PPF Wash 1:500 手洗或打泡沫，同时溶解轻度铁粉。'},
  {phase:'维护',products:['G-ppf-maintain'],ratio:'即用',how:'洗车擦干后喷少量在膜面或毛巾上，抹开擦匀；效果 6 周以上。'},
 ],
 notes:['PPF EVO 适用于亮面、缎面和哑光 PPF，不增加光泽。','PPF Wash 和 PPF Maintain 也适用于改色膜。'],
 url:G_MAN+'2025paintcoatingsmanual.pdf'},

{id:'f-g-maint',brand:'G',name:'镀膜车维护洗车',en:'GYEON Maintenance Wash',scene:'coated',tags:['日常洗车','轮毂'],
 summary:'按官方说明书「先 Foam 预洗再手洗、日常用 Cure 维护」的顺序，加上各产品页的用法：轮毂 → 泡沫预洗 → Bathe 手洗 → WetCoat 湿车封体 → 擦干。',
 steps:[
  {phase:'轮毂',pH:'neu',products:['G-iron-wheelcleaner','G-wheelbrush'],ratio:'即用',how:'喷在冷却的轮毂上，停留反应，需要时用 WheelBrush 轻刷，彻底冲洗，不要干掉。'},
  {phase:'泡沫预洗',products:['G-foam'],ratio:'1:15',how:'由下往上喷在干燥车身上，停留不要干掉，高压冲洗。虫尸多时先局部喷 Bug&Grime。'},
  {phase:'手洗',pH:'neu',products:['G-bathe','G-bathe-plus'],alt:true,extras:['两个水桶'],ratio:'1:500',how:'用 Smoothie 等柔软洗车手套按正确手法洗车，再彻底冲洗。Bathe+ 洗车时同时留下疏水层。'},
  {phase:'湿车封体（可选）',products:['G-wetcoat'],ratio:'即用',how:'车身仍湿时逐块喷 1–2 下，立即用较强水压冲洗，不要让它干掉；最长约 12 周。'},
  {phase:'擦干',products:['G-silkdryer'],how:'平铺在湿表面上轻拉或轻拍吸水，不要加压。'},
  {phase:'维护（可选）',products:['G-cure','G-ceramicdetailer'],alt:true,ratio:'即用',how:'擦干后用 Cure 喷涂擦拭，或用 CeramicDetailer 在湿车上当擦干辅助。'},
 ],
 notes:['不要在阳光直射下或热的车身上洗车。','镀膜车用中性香波，避免强力清洁剂。'],
 url:GYEON+'bathe-2/'},

{id:'f-g-wheel',brand:'G',name:'轮毂与轮胎镀膜（Rim EVO / Q² Tire）',en:'GYEON Q² Rim EVO + Q² Tire',scene:'wheel',tags:[],
 summary:'官方外饰镀膜说明书和产品页：Iron WheelCleaner + Tar 清洁轮毂，Tire Cleaner 洗轮胎，Prep 脱脂后上 Rim EVO，轮胎干透后上 Q² Tire。',
 steps:[
  {phase:'轮毂清洁',products:['G-iron-wheelcleaner','G-tar'],ratio:'即用',how:'用 Iron WheelCleaner 和 Tar 清洁轮毂，可见杂质再用 Q²M Clay 去除。'},
  {phase:'轮胎清洁',pH:'alk',products:['G-tirecleaner','G-tirebrush'],ratio:'即用',how:'喷在轮胎侧壁，用硬毛刷刷洗后冲洗，重复到泡沫变白；之后让轮胎干透。'},
  {phase:'脱脂',products:['G-prep'],ratio:'即用',how:'轮毂须无油、完全干燥；用 Q²M Prep（异丙醇不能完全脱脂），等 15 分钟。'},
  {phase:'轮毂镀膜',products:['G-rim-evo'],ratio:'即用',how:'充分摇匀，用随附施工块厚涂一层，涂后立即擦掉；造型复杂的轮毂分区施工。'},
  {phase:'轮胎封体',products:['G-tire','G-tire-applicator'],ratio:'即用',how:'用轮胎海绵均匀涂抹，薄涂为缎面，多涂更深；擦掉多余，固化后再开车。'},
 ],
 notes:['镀膜 12 小时后完全干燥。','镀膜轮毂用中性香波清洗，避免强酸强碱清洁剂。'],
 url:G_MAN+'2023exteriorcoatingsmanual.pdf'},

{id:'f-g-leather',brand:'G',name:'皮革镀膜（LeatherShield EVO）',en:'GYEON Q² LeatherShield EVO',scene:'int',tags:[],
 summary:'官方内饰镀膜说明书：吸尘 → LeatherCleaner 清洁 → 湿毛巾擦净并晾干 → LeatherShield EVO 一次一个部件 → 3–5 分钟后擦掉 → 固化 6 小时。',
 steps:[
  {phase:'吸尘',extras:['吸尘器'],how:'确保皮革上没有碎屑和灰尘。'},
  {phase:'清洁',products:['G-leathercleaner-strong','G-leathercleaner-natural'],alt:true,extras:['皮革刷'],ratio:'即用',how:'用 Q²M LeatherCleaner 清洁皮革（脏污重或首次镀膜用 Strong）。不要用含柔软剂的清洁剂。'},
  {phase:'擦净并晾干',how:'用湿毛巾擦掉清洁剂残留，检查皮革，确认完全干燥。'},
  {phase:'镀膜',products:['G-leathershield-evo','G-mf-applicator'],ratio:'即用',how:'在施工块或 MF Applicator 上倒足量，一次做一个部件，均匀涂开；停留 3–5 分钟，检查后用 BaldWipe EVO 擦掉残留。'},
  {phase:'固化',how:'至少固化 6 小时再使用；24 小时后完全干燥。前 15 分钟内发现高点，补一点产品抹匀后立即擦掉。'},
 ],
 notes:['只用于封闭结构的现代汽车皮革和高品质人造革；不要用于苯胺 / 半苯胺皮、老旧或翻新过的皮革。','先在不显眼处测试，检查是否变色或掉色。'],
 url:G_MAN+'2023interiorcoatingsmanual.pdf'},
];

export const combos: Combo[] = [
{id:'c-g-restart',brand:'G',name:'镀膜疏水恢复洗车',scene:'tfr',tags:['保护 / 镀膜车'],base:'f-g-maint',at:'替换第 3 步「手洗」',
 summary:'镀膜车疏水变差时，把 Bathe 换成 RestartWash REDEFINED（1:500 – 1:100），洗车同时去除水垢和铁粉，让镀膜恢复原本的水珠表现；之后可接 WetCoat 补强。',
 steps:[
  {phase:'除染手洗',pH:'acid',products:['G-restartwash'],extras:['两个水桶'],ratio:'1:500 – 1:100',how:'按脏污程度稀释（轻度 1:500、标准 1:250、重度 1:100），用柔软手套从车顶开始直线清洗；也可在泡沫喷壶里用 40 ml 兑成 500 ml。彻底冲洗、不要让它干在表面，然后擦干。'},
  {phase:'补强（可选）',products:['G-wetcoat','G-cure'],alt:true,ratio:'即用',how:'RestartWash REDEFINED 本身不增加保护，需要更强疏水时接 WetCoat 湿车封体或 Cure。'},
 ],
 notes:['主要用于镀膜车；蜡 / 封体车先小面积测试。'],
 url:GYEON+'restartwash-redefined/'},

{id:'c-g-ppf-daily',brand:'G',name:'PPF / 改色膜日常养护',scene:'ppf',tags:['改色膜'],base:'f-g-ppf',at:'日常版（不做镀膜）',
 summary:'没做 PPF EVO 的膜也能用：PPF Wash 除染洗车，擦干后上 PPF Maintain；膜面发雾、氧化时用 PPF Renew 翻新。',
 steps:[
  {phase:'泡沫预洗',products:['G-foam'],ratio:'1:15',how:'由下往上喷在干燥车身上，停留不要干掉，高压冲洗。'},
  {phase:'除染洗车',pH:'neu',products:['G-ppf-wash'],ratio:'1:500',how:'手洗或打泡沫，手套轻压清洗，彻底冲洗后擦干。'},
  {phase:'维护',products:['G-ppf-maintain'],ratio:'即用',how:'喷少量抹开，擦到均匀。'},
  {phase:'定期翻新（需要时）',products:['G-ppf-renew'],ratio:'即用',how:'膜面发雾、氧化时手工或机器轻压施工，擦掉残留。'},
 ],
 notes:['PPF Maintain 适用于亮面和哑光 PPF 及改色膜。'],
 url:GYEON+'ppf-maintain-redefined/'},
];
