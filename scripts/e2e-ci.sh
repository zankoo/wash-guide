#!/bin/sh
set -eu

# Vercel CI 主机不是 Debian；浏览器使用与依赖版本一致的官方镜像。
# 主机先构建，容器只运行本地生产服务和测试，无需部署 URL 或保护绕过密钥。
pnpm build
pnpm check:payload
browser_version=$(node -p 'require("@playwright/test/package.json").version')
repo_root=$(git rev-parse --show-toplevel)
exec vercel-ci-docker-run --rm --init --ipc=host --user root \
  --volume "$repo_root:$repo_root" \
  --workdir "$repo_root" \
  --env CI=1 \
  --env PLAYWRIGHT_SKIP_BUILD=1 \
  "mcr.microsoft.com/playwright:v$browser_version" \
  ./node_modules/.bin/playwright test
