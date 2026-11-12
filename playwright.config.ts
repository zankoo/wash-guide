import { defineConfig, devices } from '@playwright/test';

// 探索测试的随机种子在这里定一次：所有 worker 和失败重试都用同一个，重试不会换成另一串随机操作而掩盖问题。
// 失败时用 EXPLORE_SEED=<种子> 原样重放。
process.env.EXPLORE_SEED ||= String(Math.floor(Math.random() * 1e9));
if (!process.env.TEST_WORKER_INDEX) console.log(`探索测试种子：${process.env.EXPLORE_SEED}`);

export default defineConfig({
  testDir: './e2e',
  timeout: 45000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:3130',
    channel: 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } }],
  webServer: {
    command: process.env.PLAYWRIGHT_SKIP_BUILD ? 'node node_modules/next/dist/bin/next start --port 3130' : 'pnpm build && pnpm check:payload && pnpm start --port 3130',
    url: 'http://127.0.0.1:3130',
    reuseExistingServer: !process.env.CI,
    timeout: 180000,
  },
});
