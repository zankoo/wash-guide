// Browser Run evaluates this fixed Playwright function in a fresh session.
// No URL, script, or search term is accepted from visitors.
export const browserScenario = `async ({ page, context }) => {
  page.setDefaultTimeout(8000);
  page.setDefaultNavigationTimeout(12000);
  let stage = 'online-filter';
  try {
    await page.goto('https://wash.kokoda.fun/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('searchbox').fill('铁粉');
    await page.locator('main .found').filter({ hasText: '铁粉' }).first().waitFor();
    await page.locator('main .card').first().waitFor();

    stage = 'offline-cache';
    await page.waitForFunction(() => !!navigator.serviceWorker.controller, undefined, {timeout:22000});
    const cached = await page.evaluate(async () => {
      const worker = (await navigator.serviceWorker.ready).active;
      return new Promise(resolve => {
        const channel = new MessageChannel();
        channel.port1.onmessage = event => {
          channel.port1.close();
          resolve(event.data.cached.includes('/p/L-primus'));
        };
        worker.postMessage({ type: 'cache-pages', urls: ['/p/L-primus'] }, [channel.port2]);
      });
    });
    if (!cached) throw new Error('detail_cache_failed');

    stage = 'offline-filter';
    await context.setOffline(true);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.locator('main .card').first().waitFor();
    await page.locator('main .found').filter({hasText:'铁粉'}).first().waitFor();
    if (await page.getByRole('searchbox').inputValue() !== '铁粉') throw new Error('offline_filter_lost');
    stage = 'offline-calculation';
    await page.goto('https://wash.kokoda.fun/p/L-primus', { waitUntil: 'domcontentloaded' });
    await page.getByRole('heading', {name: 'PRÌMUS 2.0', exact: true}).waitFor();
    await page.getByRole('button', {name: '自定义', exact: true}).click();
    await page.getByRole('textbox', {name: '我的水量'}).fill('750');
    await page.locator('.cc').filter({ hasText: '75 ml' }).first().waitFor();
    return 'offline-calculation-passed';
  } catch {
    return 'failed:' + stage;
  }
}`;
