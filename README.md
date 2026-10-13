# 洗车施工速查

Labocosmetica、Maniac Line、Koch-Chemie、CarPro 四个品牌汽美产品的官方稀释比例、施工步骤和洗车流程速查。

## 技术栈

- [Next.js 16](https://nextjs.org)（App Router + Turbopack）、React 19、TypeScript
- React Compiler：自动记忆化，不需要手写 `useMemo` / `useCallback`
- Cache Components / Partial Prerendering：全部页面在构建时静态生成（首页、流程页、244 个产品页）
- `next/image`：Koch-Chemie / CarPro 官网的 1248px PNG 产品图由 Vercel 图片优化转成 webp 并按卡片尺寸缩放
- `next/font`：Noto Sans SC / Saira Condensed / IBM Plex Mono 构建时下载并自托管，访问时不再请求 Google Fonts
- ESLint（`eslint-config-next`）、Vitest

## 页面与路由

| 路径 | 说明 |
| --- | --- |
| `/` | 产品速查：品牌 / 分类 / 关键词筛选 |
| `/flows` | 洗车流程与组合；`/flows#流程id` 会滚动并高亮该流程 |
| `/p/[id]` | 产品详情。从列表点开时以弹出面板显示（拦截路由），直接打开或刷新时是独立页面，便于分享和搜索引擎收录 |

旧版的 `/#产品id`、`/#flows`、`/#流程id` 链接会自动跳到新地址。

## 目录结构

```
src/
  app/
    (guide)/          首页和流程页共用的 hero + 筛选栏布局
    @modal/(.)p/[id]  拦截 /p/[id]，以弹出面板显示产品详情
    p/[id]/           独立产品页（含 SEO 元数据）
    globals.css       全部样式（颜色变量、深色模式）
  components/         卡片、详情、筛选栏等组件；带 'use client' 的是客户端组件
  data/
    labo-maniac.ts        Labocosmetica / Maniac Line 产品
    labo-maniac-flows.ts  Labocosmetica / Maniac Line 流程与组合
    koch.ts / carpro.ts   Koch-Chemie / CarPro 产品、流程与组合
    remote-images.ts      Koch-Chemie / CarPro 官网产品图地址
    taxonomy.ts           品牌、分类、场景
    types.ts              数据结构说明
  lib/                稀释换算、搜索
public/img/           Labocosmetica / Maniac Line 本地产品图（720px 白底 webp，文件名 = 产品 id）
```

产品卡片和流程卡片在服务端渲染，客户端只负责筛选，因此列表页不会把整份产品数据打包进 JS。

## 本地开发

需要 Node.js 20.9+ 和 pnpm。

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # 数据完整性 + 稀释换算测试
pnpm lint
pnpm typecheck
pnpm build        # 生产构建
```

新增或修改数据后跑一下 `pnpm test`：它会检查 id 是否重复、流程引用的产品是否存在，以及每款 Labocosmetica / Maniac Line 产品是否都有 `public/img/<id>.webp`。

## 部署到 Vercel

在 Vercel 导入此仓库即可：Framework Preset 会自动识别为 Next.js，构建命令和输出目录都用默认值，包管理器按 `pnpm-lock.yaml` 识别为 pnpm。推送到主分支后自动部署，其他分支生成预览地址。

- 站点地址、`sitemap.xml` 和 `robots.txt` 自动使用 Vercel 的生产域名（`VERCEL_PROJECT_PRODUCTION_URL`），不需要配置环境变量。
- 图片优化按「源图 × 尺寸档位」计入 Vercel 的图片转换额度。`next.config.ts` 已经只输出 webp、收窄了尺寸档位，并缓存 31 天。如果额度紧张，可以在 `images` 里加 `unoptimized: true` 关掉优化（官网 PNG 会按原图加载）。

## 数据说明

比例写法沿用官方：1:10 = 1 份原液 + 10 份水；PA壶比例指壶内调配比例。数据整理自各品牌官网产品页、技术资料与施工手册（2026 年 10 月）。施工前请先在不显眼处测试。
