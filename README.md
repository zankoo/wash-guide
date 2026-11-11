# 洗车施工速查

覆盖 Labocosmetica、Maniac Line、MAFRA、Koch-Chemie、CarPro、GYEON、BolaSolution、FEYNLAB、P&S 九个品牌的洗车施工速查。支持配比换算、材质交集筛选、收藏，以及 SDS 和 pH 依据查询。

## 技术栈

- [Next.js 16](https://nextjs.org)（App Router + Turbopack）、React 19、TypeScript
- React Compiler：自动记忆化，不需要手写 `useMemo` / `useCallback`
- Cache Components / Partial Prerendering：全部页面在构建时静态生成（首页、流程页、全部产品页）
- `next/image`：产品图统一来自 `public/img/`，按卡片尺寸优化；缺图产品使用品牌占位图
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
    mafra.ts / gyeon.ts / bola.ts / feynlab.ts / ps.ts  其他品牌产品与流程
    sds-sources.ts        SDS 来源机构
    ph.ts                 pH 证据说明与来源标签
    audit.ts              从当前产品生成资料覆盖报告
    taxonomy.ts           品牌、分类、场景
    types.ts              数据结构说明
  lib/                稀释换算、搜索
public/img/           本地产品图（文件名 = 产品 id）
public/sds/           需转存的 SDS PDF
scripts/              开发维护命令
research/             历史核验记录，不作为当前产品数据库
```

产品卡片和流程卡片在服务端渲染，客户端只负责筛选，因此列表页不会把整份产品数据打包进 JS。

## 本地开发

需要 Node.js 20.9+ 和 pnpm。

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # 数据完整性、搜索、pH 证据、报告和稀释换算测试
pnpm data:report  # 当前 SDS / pH 覆盖与来源缺口
pnpm lint
pnpm typecheck
pnpm build        # 生产构建
```

新增或修改数据后运行 `pnpm test`：检查 ID、流程引用、分类、图片、SDS 来源和本地 PDF 校验和等约束。SDS、危险成分、图片例外与 pH 证据直接保存在各品牌的产品记录中；子分类排序由 `subcategories.ts` 管理。

### 资料报告

`pnpm data:report` 打印按品牌统计的摘要。需要完整产品清单时运行：

```bash
pnpm --silent data:report --json > /tmp/wash-guide-audit.json
```

报告只读当前产品数据，不联网、不修改目录。统计排除 `category: acc` 的配件，保留洗车泥和套装。pH 分为有数值、仅定性、不适用和未记录四种互斥状态；来源未关联、口径差异是另外两个可重叠的指标。未关联 SDS 不代表网上不存在公开文件，有链接也不等于本次已验证可下载。

JSON 的 `sds.missing`、`ph` 各项和 `localSds.missingOriginalUrl` 包含产品 ID、名称、品牌及分类。输出不含运行时间，同一份数据生成相同结果，便于比较。

`research/sds-snapshot-2026-11-10.json` 是删除 MAFRA 专业装后的历史快照，保留当时的删除清单；其余日期文件也是历史核验依据。当前数量以报告命令为准，不手工更新历史文件。

## CI 与部署到 Vercel

Vercel CI 根据 `turbo.json` 中标为 `ci` 的任务运行 lint、类型检查和测试。生产构建由 Vercel 部署运行；仓库不再重复运行 GitHub Actions。


在 Vercel 导入此仓库即可：Framework Preset 会自动识别为 Next.js，构建命令和输出目录都用默认值，包管理器按 `pnpm-lock.yaml` 识别为 pnpm。推送到主分支后自动部署，其他分支生成预览地址。

- 站点地址、`sitemap.xml` 和 `robots.txt` 自动使用 Vercel 的生产域名（`VERCEL_PROJECT_PRODUCTION_URL`），不需要配置环境变量。
- 图片优化按「源图 × 尺寸档位」计入 Vercel 的图片转换额度。`next.config.ts` 已经只输出 webp、收窄了尺寸档位，并缓存 31 天。如果额度紧张，可以在 `images` 里加 `unoptimized: true` 关掉优化（本地 webp 会按原图加载）。

## 数据说明

比例写法沿用官方：1:10 = 1 份原液 + 10 份水；PA壶比例指壶内调配比例。数据整理自各品牌官网产品页、技术资料与施工手册（2026 年 10 月）。施工前请先在不显眼处测试。
