# 洗车施工速查

覆盖 Labocosmetica、Maniac Line、MAFRA、Koch-Chemie、CarPro、GYEON、BolaSolution、FEYNLAB、P&S 九个品牌的洗车施工速查。支持配比换算、材质交集筛选、收藏，以及 SDS 和 pH 依据查询。

## 技术栈

- Next.js App Router API、React 19、TypeScript；生产使用 [vinext](https://vinext.dev/) + Vite 构建并部署到 Cloudflare Workers
- React Compiler：自动记忆化，不需要手写 `useMemo` / `useCallback`
- 首页、流程页和产品页在构建时预渲染，HTML / RSC 随版本保存到 Workers Static Assets；拦截路由由 Worker 处理
- `next/image`：产品图统一来自 `public/img/`，直接分发已有 WebP，不做在线图片转换；缺图产品使用品牌占位图
- `next/font`：Saira Condensed 构建时下载并自托管
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
    (guide)/          产品与流程路由，各自提供所需的目录投影
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

列表使用精简的展示与搜索投影，首屏仍生成静态 HTML，浏览器按投影筛选并渲染卡片。产品与流程路由各自提供所需数据，完整产品记录、SDS 和施工证据只用于服务端详情页。

`filter-state` 管理 URL 筛选，`guide-state` 管理展开和滚动导航；`catalog-state` 统一计算列表、侧栏、分类和材质计数。共享筛选函数位于 `src/lib/catalog-results.ts`，不会通过 effect 把派生结果写回全局状态。

## 本地开发

需要官方 Node.js 22.18+（须包含原生 TypeScript 支持）和 pnpm。

```bash
pnpm install
pnpm dev          # http://localhost:3000，本地 Workers 运行时
pnpm test         # 数据完整性、搜索、pH 证据、报告和稀释换算测试
pnpm data:report  # 当前 SDS / pH 覆盖与来源缺口
pnpm lint
pnpm typecheck
pnpm build        # 生成有内容版本的 Service Worker，构建并预渲染
pnpm start        # 本地预览生产 Worker
pnpm deploy       # 构建并部署到 Cloudflare Workers
pnpm exec playwright install --no-shell chromium
pnpm test:e2e     # 自动构建并启动生产服务，运行浏览器回归
pnpm check:payload # 对已有生产构建检查 HTML/RSC gzip 预算
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

## CI 与部署到 Cloudflare Workers

CI 用 GitHub Actions（`.github/workflows/ci.yml`），只在 PR 上运行，测的是合入 main 后的结果，合并后不在 main 上重跑；只改 Markdown 或 `research/` 时跳过。依次运行 lint、类型检查、单元测试、生产构建、传输预算检查和 Playwright 浏览器测试；失败时把 `test-results/` 的 trace 和截图作为构件上传。探索测试每次运行换一个随机种子，单次轮数较少，覆盖面靠多次运行累积。


`cloudflare.config.ts` 定义账号、Worker、静态资源路由和日志/追踪。`vite.config.ts` 配置 vinext、React Compiler 和只读预渲染缓存。使用匹配的 Cloudflare Vite 插件与 `cf` 版本，避免 Build Output 格式不兼容。

首次部署先运行 `pnpm exec cf auth login`。之后运行 `pnpm deploy`；已构建时可以执行 `pnpm exec cf deploy --prebuilt --mode production`。不要提交登录凭据。

- 正式地址为 `https://wash.kokoda.fun`；SEO、`sitemap.xml` 和 `robots.txt` 使用这个地址，可在构建时用 `SITE_URL` 覆盖。
- `/img/*`、`/sds/*` 和哈希 JS/CSS 由 Static Assets 直接提供。页面和 RSC 经过 Worker，私有预渲染缓存目录不会公开访问。
- 静态页面缓存随部署替换，无需 KV、R2 或数据库；收藏仍保存在用户浏览器。保留正式域名可以继续使用原有收藏和离线缓存更新机制。
- Vercel Analytics / Speed Insights 已移除。运行错误和请求可在 Cloudflare Workers Logs / Traces 中查看。
- GitHub 仓库 `zankoo/wash-guide` 已连接 Workers Builds：`main` 自动生产部署，其他分支生成独立预览；构建依赖缓存已开启，Markdown / research 变更跳过构建。生产部署前运行 lint、类型检查、单元测试、构建和传输预算检查，GitHub Actions 另跑完整浏览器回归。

保留 `pnpm dev:next`、`pnpm build:next` 和 `pnpm start:next` 用于比较 Next.js 行为。关闭尚未完整兼容的 Cache Components / 分段预取，使用完整预渲染；React ViewTransition 的支持与 Next.js 不完全相同。页面导航、弹窗、离线、慢网络交互和 404 行为由浏览器回归保护。

### 域名与边缘配置

`wash.kokoda.fun` 直接绑定 Worker Custom Domain，证书由 Cloudflare 管理；已移除原 Vercel CNAME 和 ACME 安全豁免。以下为 2026-11-17 的配置记录，域名设置在 Cloudflare 控制台管理：

| 能力 | 配置与用途 |
| --- | --- |
| HTTPS | 强制 HTTPS、自动重写、Full (strict)、最低 TLS 1.2、TLS 1.3、ECH；HSTS 86400 秒，不含子域、不 preload |
| 传输 | HTTP/2、HTTP/3、0-RTT、IPv6、Brotli；Early Hints 已实测返回 103，提前加载首屏图片和自托管字体 |
| 静态资源 | Workers Static Assets 自动边缘缓存和分层取回；哈希 JS/CSS 使用 immutable，图片/PDF 通过 ETag 验证版本 |
| 更新一致性 | 移除旧图片 30 天强制 TTL；Service Worker 和 RSC 请求绕过域名缓存，预渲染内容随 Worker 版本更新 |
| 安全 | DNSSEC active、自动 DDoS 防护、Free Managed Ruleset 默认防护；nosniff 和 strict-origin-when-cross-origin 响应头 |
| 可观测性 | Workers Logs / Traces；已有 Cloudflare Web Analytics 自动安装，避免重复添加统计脚本 |
| 持续交付 | Workers Builds GitHub 连接、依赖缓存、生产分支部署与分支预览；GitHub Actions 浏览器回归 |

静态资源已经具有分层缓存，不需要额外引入 R2/KV 才能缓存。Speed Brain 不预取经过 Worker 的页面，应用自己的路由预取与离线缓存负责这一部分。Rocket Loader 保持关闭，避免改写 React 脚本执行顺序；现有 WebP 无需再次进行在线有损转换。Turnstile、Queues、D1、Durable Objects 等在出现表单、后台任务或服务端持久化需求时再引入；当前浏览器收藏不需要登录或服务端数据库。

参考：[Static Assets 缓存](https://developers.cloudflare.com/workers/static-assets/)、[Speed Brain 限制](https://developers.cloudflare.com/speed/optimization/content/speed-brain/)、[Free WAF 默认部署](https://developers.cloudflare.com/waf/get-started/)。

### 重构中的 R2 费用约束

用户允许接入 R2，并以邮件告警辅助监控，要求合理使用、不能无限浪费。公开图片和 PDF 继续由 Static Assets 提供；R2 用于后台来源文档的有限期快照，不承担公开页面或文件的直接回源。

截至 2026-11-17，[Spend Management](https://developers.cloudflare.com/billing/manage/spend-management/) 的产品限额只覆盖 Workers 和 Durable Objects，不覆盖 R2；预算告警也不会停止请求。不能把告警、缓存命中率或应用计数器描述为账户级零费用保证。[R2 免费额度](https://developers.cloudflare.com/r2/pricing/) 包括 Standard 存储及 A/B 类操作，三者都必须纳入控制，且免费额度由账户共享。

私有桶 `wash-guide-archive` 已在 APAC 创建，Standard 存储，r2.dev 公开访问关闭；已回读确认 `platform/archive-lifecycle.json` 中的 90 天快照清理和 1 天未完成上传清理规则。

`platform/archive.ts` 使用 D1 持久化预留记录，在 R2 操作之前通过原子 SQL 检查额度。内部上限为单文件 5 MB、总容量 1 GB、每日写入尝试 100 次、读取尝试 1,000 次；同一来源相同 SHA-256 不重复上传，每个对象最多尝试 3 次。失败也消耗操作预算，结果不明的上传继续占用容量，只有确认 R2 删除成功才释放预留；数据库或预算不可用时停止归档。日期按 UTC，故任意 31 天最多 3,100 次写入尝试和 31,000 次读取尝试，不依赖账单周期起始日。

`platform/jobs/cloudflare.config.ts` 定义独立后台 Worker：每日最多检查 50 个已登记来源，队列消费者并发 1、每批 1 条、失败最多重试 2 次且间隔 300 秒；来源请求总超时 20 秒，最多跟随 4 次跳转，使用 ETag/Last-Modified 条件请求。归档超额、类型不支持或文件过大时记录跳过，不反复重试。来源变化进入 D1 待审核记录，不自动改写产品说明。没有公开上传、抓取或桶列表接口。

D1 `wash-guide` 已创建于 APAC 并启用自动读副本；已导入 585 个产品、70 个流程和 997 个来源，外键检查通过。现有网站仍使用原来的发布数据，尚未切换到 D1 读取。`scripts/catalog-export.mjs <output.sql>` 生成建表及初始数据，`--data-only` 只生成初始数据；它用于首次迁移，不能当作生产更新或重复导入命令。后续表结构变更按 `platform/migrations/` 顺序执行。后台 Worker 独立构建命令为 `pnpm build:jobs`，已加入 CI。

这些应用限额只约束通过本模块产生的用量，不覆盖控制台、S3 客户端或同账户其他应用。生命周期清理非即时，不能代替容量预留。进程在上传或删除途中崩溃时会保守保留预留记录，需要核对对象后修复，避免凭空释放容量。上述代码已通过本地 D1/R2 模拟运行测试；后台 Worker 已部署，每天北京时间 11:00 检查来源。用户表示已有邮件告警，本次没有创建或验证告警收件人。

## 数据说明

比例写法沿用官方：1:10 = 1 份原液 + 10 份水；PA壶比例指壶内调配比例。数据整理自各品牌官网产品页、技术资料与施工手册（2026 年 10 月）。施工前请先在不显眼处测试。

## 离线与缓存更新

`src/offline/service-worker.js` 是源文件；`pnpm build` 根据代码、资源和依赖生成版本及 `public/sw.js`，不要手工编辑生成文件。

- 首次安装仅预存首页、流程页和必要脚本/样式，不后台下载全目录产品图。
- HTML 与 RSC 分库存储。只有完整页面导航会移除已知的筛选参数；RSC 保留完整 URL 和 Vary 匹配。
- 断网点击产品或视图链接使用已缓存的 HTML；未缓存页面显示明确的离线回退。
- 联网、重新聚焦、收藏变化及 worker 更新时刷新收藏页，同时预存其脚本、样式与图片。每批最多预存 80 个收藏，缓存空间不足或未完成下载时不能保证离线可用。
- 页面最多 100 项（保留首页和流程页），RSC 160 项，图片 128 项，哈希静态资源 256 项。产品图后台更新；构建更新会清理本应用旧版本页面和图片，不清除其他应用的缓存。
- 外部 SDS 不在离线预存范围内。

浏览器回归覆盖筛选刷新恢复、材质交集、换算、弹窗历史导航、流程目录一致性、离线刷新、收藏详情交互和移动端布局。`check:payload` 限制构建后 HTML/RSC 的 gzip 体积，这不是包含图片、字体和 JS 的整页体积。

### Cloudflare 资料检索

主站 `wash-guide` 使用静态资源、目录数据库 `DB` 和内部服务 `PLATFORM`。后台作业 `wash-guide-jobs` 独占私有 R2 归档绑定，并向 AI Search 写入索引。资料检索页面将请求通过服务绑定发给 `wash-guide-api`，API 使用 D1 预留查询额度，检索 AI Search，再按当前发布版本核对引用。公开搜索不读取归档桶。原产品速查可继续离线使用。

在目录或检索表有更新时，先执行对应的 D1 迁移。部署顺序为后台 Worker、API Worker、主站。后台 Worker 每 15 分钟最多处理 6 份产品资料或站内 SDS，按 UTC 每日最多上传 100 次、400 万字节，每月最多 2400 万字节。公开检索全站每天最多 25 次，单个客户端每分钟最多 4 次（Cloudflare 区域限速）。搜索返回命中片段及出处。API 和后台 Worker 通过各自目录的 Cloudflare 配置构建，均关闭 workers.dev 和预览地址。
