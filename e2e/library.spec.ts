import { test, expect, type BrowserContext } from '@playwright/test';
import { localLibraryApi } from '../scripts/local-library-api.mjs';

test('两台设备合并原有收藏，同步私人清单并在断网后补交收藏', async ({ browser, baseURL }) => {
  test.skip(
    !['localhost', '127.0.0.1'].includes(new URL(baseURL!).hostname),
    'Uses only the isolated local Worker and database',
  );
  const api = await localLibraryApi();
  const origin = 'https://wash.kokoda.fun';
  const a = await browser.newContext({ serviceWorkers: 'block' });
  const b = await browser.newContext({ serviceWorkers: 'block' });
  const install = (ctx: BrowserContext) =>
    ctx.route('**/*', async (route) => {
      const req = route.request(),
        url = new URL(req.url());
      if (url.origin !== origin) return route.abort();
      if (url.pathname.startsWith('/api/platform/library/')) {
        const res = await api.dispatchFetch(url.href, {
          method: req.method(),
          headers: await req.allHeaders(),
          body: req.postData() ?? undefined,
        });
        return route.fulfill({
          status: res.status,
          headers: Object.fromEntries(res.headers),
          body: await res.text(),
        });
      }
      return route.fulfill({
        response: await route.fetch({ url: new URL(url.pathname + url.search, baseURL).href }),
      });
    });
  try {
    await Promise.all([install(a), install(b)]);
    const first = await a.newPage(),
      second = await b.newPage();
    await first.goto(origin + '/library');
    await first.evaluate(() => localStorage.setItem('wash-favorites', '["L-primus"]'));
    await first.getByRole('button', { name: '为本机启用同步' }).click();
    await first.getByRole('button', { name: '配对另一台设备' }).click();
    const pair = await first.getByLabel(/一次性配对码/).inputValue();
    await second.goto(origin + '/library#pair=' + pair);
    await expect(second.getByLabel('另一台设备的配对码')).toHaveValue(pair);
    expect(second.url()).not.toContain(pair);
    await second.evaluate(() => localStorage.setItem('wash-favorites', '["C-reset"]'));
    await second.getByRole('button', { name: '连接已有资料库' }).click();
    await expect(second.getByRole('link', { name: '查看本机的 2 个常用产品' })).toBeVisible();
    await second.getByRole('button', { name: '新建清单' }).click();
    await second.getByLabel('清单名称').fill('周末洗车');
    await second.getByRole('textbox', { name: '第 1 步', exact: true }).fill('准备手套');
    let releaseSave!: () => void;
    const saving = new Promise<void>((resolve) => {
      releaseSave = resolve;
    });
    await b.route('**/api/platform/library/checklist', async (route) => {
      await saving;
      await route.fallback();
    });
    await second.getByRole('button', { name: '保存清单' }).click();
    try {
      await expect(second.getByLabel('清单名称')).toBeDisabled();
      await expect(second.getByRole('textbox', { name: '第 1 步', exact: true })).toBeDisabled();
    } finally {
      releaseSave();
    }
    await expect(second.getByText('清单已保存。')).toBeVisible();
    await first.getByRole('button', { name: '立即同步' }).click();
    await first.getByRole('button', { name: /周末洗车/ }).click();
    await expect(first.getByRole('textbox', { name: '第 1 步', exact: true })).toHaveValue('准备手套');
    await first.goto(origin + '/p/L-primus');
    await expect(first.getByRole('button', { name: '已加入常用' })).toBeVisible();
    await a.route('**/api/platform/library/**', (route) => route.abort('internetdisconnected'));
    await first.getByRole('button', { name: '已加入常用' }).click();
    await expect(first.getByRole('button', { name: '加入常用', exact: true })).toBeVisible();
    await a.unroute('**/api/platform/library/**');
    await first.goto(origin + '/library');
    await first.getByRole('button', { name: '立即同步' }).click();
    await expect(first.getByText('已同步。')).toBeVisible();
    await second.getByRole('button', { name: '立即同步' }).click();
    await expect(second.getByRole('link', { name: '查看本机的 1 个常用产品' })).toBeVisible();

    // Device A commits an add but loses the response. While A has no network,
    // B removes that item and A queues an unrelated change.
    await first.goto(origin + '/p/L-primus');
    let receipt!: () => void;
    const committed = new Promise<void>((resolve) => {
      receipt = resolve;
    });
    await a.route('**/api/platform/library/favorites', async (route) => {
      const req = route.request();
      const response = await api.dispatchFetch(req.url(), {
        method: 'POST',
        headers: await req.allHeaders(),
        body: req.postData(),
      });
      expect(response.status).toBe(200);
      await a.route('**/api/platform/library/**', (r) => r.abort('internetdisconnected'));
      await route.abort('connectionreset');
      receipt();
    });
    await first.getByRole('button', { name: '加入常用', exact: true }).click();
    await committed;
    await second.getByRole('button', { name: '立即同步' }).click();
    await expect(second.getByRole('link', { name: '查看本机的 2 个常用产品' })).toBeVisible();
    await second.goto(origin + '/p/L-primus');
    const removal = second.waitForResponse(
      (r) => r.url().endsWith('/library/favorites') && r.status() === 200,
    );
    await second.getByRole('button', { name: '已加入常用' }).click();
    await removal;
    await first.goto(origin + '/p/C-reset');
    await first.getByRole('button', { name: '已加入常用' }).click();
    await expect(first.getByRole('button', { name: '加入常用', exact: true })).toBeVisible();
    await a.unroute('**/api/platform/library/**');
    await a.unroute('**/api/platform/library/favorites');
    await first.goto(origin + '/library');
    await first.getByRole('button', { name: '立即同步' }).click();
    await expect(first.getByRole('link', { name: '查看本机的 0 个常用产品' })).toBeVisible();
  } finally {
    await Promise.all([a.close(), b.close()]);
    await api.dispose();
  }
});
