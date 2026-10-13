# 洗车施工速查

Labocosmetica、Maniac Line、Koch-Chemie、CarPro 四个品牌汽美产品的官方稀释比例、施工步骤和洗车流程速查。纯静态网站，无需构建。

## 文件结构

- `index.html`：页面（样式与逻辑都在里面）
- `data.js`：Labocosmetica / Maniac Line 产品数据
- `flows.js`：Labocosmetica / Maniac Line 洗车流程与组合
- `brands/K.js`、`brands/C.js`：Koch-Chemie、CarPro 的产品与流程
- `img/`：本地产品图（720px 白底 webp）
- `imglist.js`：已有本地图的产品 id 列表
- `remote.js`：Koch-Chemie / CarPro 官网产品图地址（加载失败时显示名称卡片）

## 本地预览

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## 部署

在 Vercel 导入此仓库，Framework Preset 选 Other，不需要 Build Command，推送后自动部署。

## 数据说明

比例写法沿用官方：1:10 = 1 份原液 + 10 份水；PA壶比例指壶内调配比例。数据整理自各品牌官网产品页、技术资料与施工手册（2026 年 10 月）。施工前请先在不显眼处测试。
