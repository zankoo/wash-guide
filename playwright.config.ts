import { defineConfig, devices } from '@playwright/test';

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
