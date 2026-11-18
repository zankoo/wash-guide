import { expect, test } from '@playwright/test';

test('产品纠错仅在打开后加载验证，重试保留同一条提交', async ({ page }) => {
  let scripts = 0;
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => {
    scripts++;
    return route.fulfill({ contentType: 'application/javascript', body: `
      window.turnstile = {
        render(node, options) { node.textContent = '测试验证'; this.done = options.callback; this.done('local-one'); return 'local-id'; },
        reset() { this.done('local-two'); }, remove() {}
      };
    ` });
  });
  const submissions: { id: string; product: string; message: string }[] = [];
  await page.route('**/api/platform/corrections', async route => {
    submissions.push(route.request().postDataJSON());
    if (submissions.length === 1) return route.abort('failed');
    return route.fulfill({ json: { ok:true }, status:201 });
  });
  await page.goto('/p/L-primus');
  await expect(page.getByText('反馈资料错误')).toBeVisible();
  expect(scripts).toBe(0);
  await page.getByText('反馈资料错误').click();
  await expect(page.getByText('测试验证')).toBeVisible();
  await page.getByLabel('需要修正的内容').fill('请核对产品说明书的施工比例');
  await page.getByRole('button', {name:'提交纠错'}).click();
  await expect(page.getByText(/暂时无法确认是否送达/)).toBeVisible();
  await page.getByRole('button', {name:'提交纠错'}).click();
  await expect(page.getByText(/纠错已送交审核/)).toBeVisible();
  expect(submissions).toHaveLength(2);
  expect(submissions[1]).toMatchObject({ id:submissions[0].id, product:'L-primus', message:'请核对产品说明书的施工比例' });
});
