import { expect, test, type Page } from '@playwright/test';
import { PRODUCTS } from '../src/data';

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
  await page.goto('/?brand=K&category=trim&material=rubber');
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

test('分类标题吸顶时紧贴筛选栏，中间不露出滚动内容', async ({ page }) => {
  for (const width of [1440, 1000, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    // 等筛选栏把实测高度写入 --bar-h（注水完成）后再量，避免只测到 CSS 默认值
    await page.waitForFunction(() => document.documentElement.style.getPropertyValue('--bar-h') !== '');
    await page.evaluate(() => {
      const sec = document.querySelector('.sec')!;
      window.scrollTo(0, sec.getBoundingClientRect().top + window.scrollY + 40);
    });
    const gap = await page.evaluate(
      () => document.querySelector('.sec-h')!.getBoundingClientRect().top - document.querySelector('.bar')!.getBoundingClientRect().bottom,
    );
    expect(gap, `${width}px`).toBeLessThanOrEqual(0);
    expect(gap, `${width}px`).toBeGreaterThan(-2);
  }
});

test('桌面左栏按 品牌 → 材质 → 分类 排列', async ({ page }) => {
  for (const width of [1440, 1100]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const side = page.getByRole('complementary', { name: '索引' });
    const top = async (name: RegExp) => (await side.getByRole('heading', { name }).boundingBox())!.y;
    const [brand, material, category] = [await top(/^品牌$/), await top(/^适用材质/), await top(/^分类/)];
    expect(brand, `${width}px`).toBeLessThan(material);
    expect(material, `${width}px`).toBeLessThan(category);
  }
});

test('适用材质单选：选另一个材质会替换当前选择', async ({ page }) => {
  await page.goto('/');
  const side = page.getByRole('complementary', { name: '索引' });
  const mats = side.locator('.side-sec', { has: page.getByRole('heading', { name: '适用材质' }) });
  await mats.getByRole('button', { name: /^塑料/ }).click();
  await mats.getByRole('button', { name: /^车漆/ }).click();
  await expect(page).toHaveURL(/[?&]material=paint(&|$)/);
  await expect(mats.locator('button[aria-pressed="true"]')).toHaveCount(1);
  await expect(mats.locator('button[aria-pressed="true"] .ind')).toHaveCount(1);
  await expect(page.locator('.active-filters')).toContainText('材质：车漆');
  await expect(page.locator('.active-filters')).not.toContainText('塑料');
  await mats.getByRole('button', { name: /^全部/ }).click();
  await expect(page).not.toHaveURL(/material=/);
});

test('左栏「我的常用」：分类目录只统计常用、点击跳转不退出常用', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => { localStorage.setItem('wash-favorites', JSON.stringify(['C-reset', 'C-ironx'])); dispatchEvent(new StorageEvent('storage', { key: 'wash-favorites' })); });
  const side = page.getByRole('complementary', { name: '索引' });
  await side.getByRole('button', { name: /^我的常用 2$/ }).click();
  await expect(page.locator('main .card')).toHaveCount(2);
  const index = side.getByRole('navigation', { name: '分类目录' });
  await expect(index.getByRole('heading')).toHaveText('分类（我的常用）');
  await expect(index.getByRole('button')).toHaveCount(0);
  const links = index.getByRole('link');
  await expect(links).toHaveCount(2);
  await links.last().click();
  await expect(page.locator('main .card')).toHaveCount(2);
  await expect(side.getByRole('button', { name: /^我的常用/ })).toHaveAttribute('aria-pressed', 'true');
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
  // 资料表只给 1% 稀释液 pH 时，标签和资料区都写明口径
  await page.goto('/p/F-cristalbel');
  await expect(page.locator('.sh-ph')).toContainText('pH 6.0–8.0 · 1% 稀释液');
  await expect(page.locator('.ph-evidence')).toContainText('1% 稀释液数据 · 厂商技术资料表');
  await expect(page.locator('.ph-evidence a')).toHaveAttribute('href', /H0546_1\.pdf$/);
  // 来源未关联且没有任何依据时，不渲染空壳 pH 区块和空提示框；随来源回填，这类产品会越来越少
  const bare = PRODUCTS.find((p) => p.ph?.value && p.ph.source.kind === 'unrecorded' && !p.ph.conflict && p.ph.evidence.length === 0);
  if (bare) {
    await page.goto(`/p/${bare.id}`);
    await expect(page.locator('.sh-ph')).toContainText(`pH ${bare.ph!.value}`);
    await expect(page.locator('.ph-evidence')).toHaveCount(0);
    await expect(page.locator('.sh-body .notes:empty')).toHaveCount(0);
  }
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
  await page.getByRole('button', { name: /^我的常用 1$/ }).click();
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
