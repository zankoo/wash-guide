import { expect, test, type Page } from '@playwright/test';

const errors = new WeakMap<Page, string[]>();
test.beforeEach(({ page }) => {
  const messages: string[] = [];
  errors.set(page, messages);
  page.on('pageerror', (error) => messages.push(error.message));
});
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

async function workerReady(page: Page) {
  await page.evaluate(() => navigator.serviceWorker.ready.then(() => undefined));
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
}
async function cacheFavorite(page: Page, id: string) {
  return page.evaluate(async (id) => {
    const registration = await navigator.serviceWorker.ready;
    return new Promise<string[]>((resolve) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = (event) => { channel.port1.close(); resolve(event.data.cached); };
      registration.active!.postMessage({ type: 'cache-pages', urls: [`/p/${id}`] }, [channel.port2]);
    });
  }, id);
}

test('筛选分享、刷新恢复、材质交集与实时换算', async ({ page }) => {
  await page.goto('/?brand=K&category=trim&material=plastic,rubber');
  await expect(page.locator('.active-filters')).toContainText('Koch');
  await expect(page.locator('main .card').first()).toBeVisible();
  const count = await page.locator('main .card').count();
  await page.reload();
  await expect(page.locator('main .card')).toHaveCount(count);
  await expect(page.locator('.active-filters')).toContainText('橡胶轮胎');
  await page.goto('/p/L-primus');
  await page.getByRole('button', { name: '自定义', exact: true }).click();
  await page.getByRole('textbox', { name: '我的水量' }).fill('750');
  await expect(page.locator('.cc').first()).toContainText('75 ml');
  await page.reload();
  await expect(page.locator('.cc').first()).toContainText('750 ml');
});

test('产品详情弹窗关闭、浏览器前进后退及直接链接', async ({ page }) => {
  await page.goto('/?q=Reset');
  const card = page.locator('main .card[href^="/p/C-reset?"]');
  await expect(card).toBeVisible();
  await card.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: '关闭', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page).toHaveURL(/\?q=Reset$/);
  await page.goForward();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.goto('/p/C-clearcut');
  await expect(page.locator('.ph-evidence')).toContainText('本站按 SDS 标注');
  const response = await page.request.get('/sds/C-clearcut.pdf');
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

test('流程搜索目录与主列表一致，空结果没有失效目录链接', async ({ page }) => {
  await page.goto('/flows');
  await page.getByRole('searchbox').fill('zzzznonexistent');
  await expect(page.locator('main .empty')).toBeVisible();
  await expect(page.locator('aside nav[aria-label="流程目录"] a')).toHaveCount(0);
  await page.getByRole('searchbox').fill('PPF');
  await expect(page.locator('main .flow').first()).toBeVisible();
  const ids = await page.locator('main .flow').evaluateAll((els) => els.map((el) => `#${el.id}`).sort());
  expect(await page.locator('aside nav[aria-label="流程目录"] a').evaluateAll((els) => els.map((el) => el.getAttribute('href')).sort())).toEqual(ids);
});

test('离线刷新带筛选参数的页面，收藏详情可交互且能返回', async ({ page, context }) => {
  await page.goto('/');
  await workerReady(page);
  await page.evaluate(() => { localStorage.setItem('wash-favorites', JSON.stringify(['C-reset'])); dispatchEvent(new StorageEvent('storage', { key: 'wash-favorites' })); });
  expect(await cacheFavorite(page, 'C-reset')).toEqual(['/p/C-reset']);
  await page.getByRole('searchbox').fill('铁粉');
  await expect(page.locator('main .found').first()).toContainText('铁粉');
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('searchbox')).toHaveValue('铁粉');
  await expect(page.locator('main .card').first()).toBeVisible();
  await page.getByRole('button', { name: '清除全部', exact: true }).click();
  await page.getByRole('button', { name: /我的常用 · 1/ }).click();
  await page.locator('main .card[href^="/p/C-reset"]').click();
  await expect(page.locator('#d-name')).toHaveText('Reset');
  await expect(page.locator('.sh-stage img')).toBeVisible();
  await expect.poll(() => page.locator('.sh-stage img').evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.getByRole('button', { name: '自定义', exact: true }).click();
  await page.getByRole('textbox', { name: '我的水量' }).fill('1000');
  await expect(page.locator('.cc').first()).toContainText('2 ml');
  // 完整文档导航离线回退，返回列表同样保留收藏筛选。
  await page.goBack();
  await expect(page.locator('main .card')).toHaveCount(1);
  await expect(page.locator('.offline-status')).toBeVisible();
});

test('未缓存详情离线有明确回退，RSC 缓存不会返回 HTML', async ({ page, context }) => {
  await page.goto('/');
  await workerReady(page);
  await context.setOffline(true);
  const rsc = await page.evaluate(async () => {
    const response = await fetch('/p/not-cached?_rsc=never-seen', { headers: { RSC: '1' } });
    return { status: response.status, type: response.headers.get('content-type'), body: await response.text() };
  });
  expect(rsc.status).toBe(503);
  expect(rsc.type).not.toContain('text/html');
  await page.goto('/p/not-cached');
  await expect(page.getByRole('heading', { name: '这个页面尚未缓存' })).toBeVisible();
  await page.getByRole('link', { name: '返回产品速查' }).click();
  await expect(page.locator('main .card').first()).toBeVisible();
});

test('手机布局与产品图片替代文字', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?q=铁粉');
  await expect(page.locator('main .card').first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator('img:not([alt]), img[alt=""]')).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('mobile.png') });
});
