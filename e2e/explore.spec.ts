// 探索测试：每次运行随机点击一串操作，每一步都核对界面与独立计算的期望结果。
// 种子默认每次不同；失败信息里带种子和完整操作序列，用 EXPLORE_SEED=<种子> 可以原样重放。
import { expect, test, type Locator, type Page } from '@playwright/test';
import { productItems, flowItems } from '../src/data/catalog';
import { BRAND, CATS, FLOWS, MATERIALS, PRODUCTS, SCENES, materialsOf, phDisplay } from '../src/data';
import { isDead, selectCatalog } from '../src/lib/catalog-results';
import { parseFilters, type Filters } from '../src/lib/filters';
import { convert, VOLUMES } from '../src/lib/dilution';
import { rng, testSeed } from '../src/lib/rng';

const SEED = testSeed();
const FAV = ['C-reset', 'C-ironx', 'K-green-star', 'G-foam', 'L-primus', 'M-wet-coat', 'K-gsf', 'B-a55'];
const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))];
const MAT_NAME: Record<string, string> = Object.fromEntries(MATERIALS);
const SCENE_NAME: Record<string, string> = Object.fromEntries(SCENES);
// 搜索词：产品名片段、用途词、首字母、不存在的词
const WORDS = ['铁粉', '皮革', '镀膜', '玻璃', '轮毂', 'ppf', '1:10', 'gs', 'reset', '水斑', 'zzqx', '中性', 'Koch'];


const select = (s: Filters, favorites = FAV) => selectCatalog(productItems, flowItems, { ...s, query: s.query.trim() }, favorites);
const stateOf = (page: Page) => parseFilters(new URL(page.url()).search);
const mats = new Map(PRODUCTS.map((p) => [p.id, materialsOf(p)]));

/** 不经过应用代码，直接按条件过滤（不含搜索），用来核对共享的筛选逻辑本身 */
function independent(s: Filters, favorites = FAV) {
  return PRODUCTS.filter((p) => (!s.brand || p.brand === s.brand) && (!s.material || mats.get(p.id)!.includes(s.material))
    && (s.category === 'fav' ? favorites.includes(p.id) : !s.category || p.category === s.category)).map((p) => p.id).sort();
}

// 某一步卡住时尽快失败并报出操作序列，而不是等到整个测试超时
test.use({ actionTimeout: 15000, navigationTimeout: 15000 });

/** 执行一步操作；出错时把种子和之前的操作序列带进错误信息 */
async function attempt<T>(history: string[], run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (e) {
    throw new Error(`种子 ${SEED}：${history.join(' → ')} → （下一步出错）\n${(e as Error).message}`);
  }
}

test.beforeEach(async ({ page }, info) => {
  info.annotations.push({ type: 'seed', description: String(SEED) });
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  (page as Page & { errors?: string[] }).errors = errors;
  await page.goto('/');
  await page.evaluate((f) => localStorage.setItem('wash-favorites', JSON.stringify(f)), FAV);
});
test.afterEach(async ({ page }) => expect((page as Page & { errors?: string[] }).errors).toEqual([]));

const num = async (l: Locator) => parseInt((await l.textContent())?.match(/(\d+)\D*$/)?.[1] ?? 'NaN');

async function shownProducts(page: Page) {
  if (await page.locator('main .empty').count()) return 0;
  const ns = await page.locator('main .sec .sec-h .n').allTextContents();
  return ns.reduce((a, t) => a + parseInt(t), 0);
}

/** 产品列表页每一步都要成立的规则 */
async function checkProducts(page: Page, where: string, mobile: boolean) {
  const s = stateOf(page);
  const r = select(s);
  await expect.poll(() => shownProducts(page), { message: `${where} 列表数量` }).toBe(r.products.length);
  if (!s.query) expect(r.products.map((p) => p.id).sort(), `${where} 筛选逻辑`).toEqual(independent(s));

  if (r.products.length === 0 && s.category === 'fav' && !r.favoriteTotal) {
    await expect(page.locator('main .empty')).toContainText('还没有常用产品');
  } else if (r.products.length === 0) {
    const empty = page.locator('main .empty');
    const relaxed: [string, number][] = [];
    if (s.category) relaxed.push([s.category === 'fav' ? '退出「我的常用」' : '去掉分类', select({ ...s, category: '' }).products.length]);
    if (s.brand) relaxed.push(['去掉品牌', select({ ...s, brand: '' }).products.length]);
    if (s.material) relaxed.push(['去掉材质', select({ ...s, material: '' }).products.length]);
    if (s.query) relaxed.push(['清空搜索', select({ ...s, query: '' }).products.length]);
    for (const [label, n] of relaxed) {
      const btn = empty.getByRole('button', { name: new RegExp(`^${label}`) });
      if (n) await expect(btn, `${where} 空结果应提供「${label}」`).toHaveText(new RegExp(`（${n} 款）$`));
      else await expect(btn, `${where} 去掉后仍无结果的条件不应列出`).toHaveCount(0);
    }
    await expect(empty.getByRole('button', { name: '清除全部筛选' })).toBeVisible();
    if (!s.query) await expect(empty, `${where} 没有搜索词时不推荐无关用途`).not.toContainText('试试相关用途');
  }

  if (!mobile) {
    const side = page.getByRole('complementary', { name: '索引' });
    const sec = (h: string) => side.locator('.side-sec', { has: page.getByRole('heading', { name: h, exact: true }) });
    const brands = sec('品牌').locator('button');
    for (const [i, b] of (['', ...BRANDS] as const).entries()) {
      const btn = brands.nth(i);
      const want = select({ ...s, brand: b }).products.length;
      expect(await num(btn), `${where} 品牌「${b || '全部'}」的数字 = 点它之后的结果数`).toBe(want);
      expect(await btn.isDisabled(), `${where} 品牌「${b || '全部'}」可点状态`).toBe(isDead(want, s.brand === b, !b));
      expect(await btn.getAttribute('aria-pressed')).toBe(String(s.brand === b));
    }
    const matBtns = sec('适用材质').locator('button');
    for (const [i, m] of (['', ...MATERIALS.map(([k]) => k)] as const).entries()) {
      const btn = matBtns.nth(i);
      const want = select({ ...s, material: m }).products.length;
      expect(await num(btn), `${where} 材质「${m ? MAT_NAME[m] : '全部'}」的数字`).toBe(want);
      expect(await btn.isDisabled(), `${where} 材质「${m || '全部'}」可点状态`).toBe(isDead(want, s.material === m, !m));
      expect(await btn.getAttribute('aria-pressed')).toBe(String(s.material === m));
    }
    const fav = side.getByRole('button', { name: /^我的常用/ });
    const favWant = select({ ...s, category: 'fav' }).products.length;
    expect(await num(fav), `${where} 我的常用的数字`).toBe(favWant);
    expect(await fav.getAttribute('aria-pressed')).toBe(String(s.category === 'fav'));
    const index = side.getByRole('navigation', { name: '分类目录' });
    await expect(index.getByRole('heading')).toHaveText(s.category === 'fav' ? '分类（我的常用）' : '分类');
    await expect(index.getByRole('button'), `${where} 分类目录始终是跳转链接`).toHaveCount(0);
    const base = s.category === 'fav' ? r.products : r.matchedProducts;
    const want = CATS.map(([k]) => [k, base.filter((p) => p.category === k).length] as const).filter(([, n]) => n);
    const got = await index.locator(':scope > ul > li > a').evaluateAll((as) => as.map((a) => [a.getAttribute('href')!.slice(5), parseInt(a.querySelector('small')!.textContent!)]));
    expect(got, `${where} 分类目录`).toEqual(want);
  } else {
    const favChip = page.locator('.chips .fav-chip');
    const favWant = select({ ...s, category: 'fav' }).products.length;
    expect(await num(favChip), `${where} 常用标签数字`).toBe(favWant);
    for (const [k, n] of [['', '全部'], ...CATS] as const) {
      const chip = page.locator('.chips button:not(.fav-chip)').filter({ hasText: new RegExp(`^${n.replace(/[()]/g, '\\$&')}\\d+$`) });
      const want = select({ ...s, category: k }).products.length;
      await expect(chip, `${where} 分类标签「${n}」`).toHaveCount(1);
      expect(await num(chip), `${where} 分类标签「${n}」的数字`).toBe(want);
      expect(await chip.isDisabled(), `${where} 分类标签「${n}」可点状态`).toBe(isDead(want, s.category === k, !k));
    }
    const bopts = await page.locator('.brand-pick select option').evaluateAll((os) => os.map((o) => [(o as HTMLOptionElement).value, o.textContent, (o as HTMLOptionElement).disabled] as const));
    for (const [v, text, disabled] of bopts) {
      if (!v) continue;
      const want = select({ ...s, brand: v as Filters['brand'] }).products.length;
      expect(text, `${where} 品牌下拉「${v}」`).toMatch(new RegExp(`（${want}）$`));
      expect(disabled, `${where} 品牌下拉「${v}」可选状态`).toBe(isDead(want, s.brand === v, false));
    }
    const mopts = await page.locator('.mat-pick select option').evaluateAll((os) => os.map((o) => [(o as HTMLOptionElement).value, o.textContent, (o as HTMLOptionElement).disabled] as const));
    expect(mopts.length).toBe(MATERIALS.length + 1);
    for (const [v, text, disabled] of mopts) {
      if (!v) continue;
      const want = select({ ...s, material: v as Filters['material'] }).products.length;
      expect(text, `${where} 材质下拉「${v}」`).toMatch(new RegExp(`（${want}）$`));
      expect(disabled, `${where} 材质下拉「${v}」可选状态`).toBe(isDead(want, s.material === v, false));
    }
  }
  // 每张卡片显示同样的字段，顺序一致
  const shapes = await page.locator('main .card .bd').evaluateAll((els) => [...new Set(els.map((el) => [...el.children].map((c) => c.classList[0]).join(' ')))]);
  if (r.products.length) expect(shapes, `${where} 卡片字段`).toEqual(['br nm ty phtag pills']);
  expect(await page.locator('main .card .pills').evaluateAll((els) => els.filter((el) => el.children.length !== 1).length), `${where} 每张卡片恰好一个比例标签`).toBe(0);
  // 已选条件的标签与 URL 一致
  const active = page.locator('.active-filters button');
  const labels = await active.allTextContents();
  if (s.brand) expect(labels, `${where} 品牌标签`).toContain(`${BRAND[s.brand]} ×`);
  if (s.material) expect(labels, `${where} 材质标签`).toContain(`材质：${MAT_NAME[s.material]} ×`);
  if (s.query) expect(labels, `${where} 搜索标签`).toContain(`搜索：${s.query} ×`);
}

/** 后退；退到浏览器的空白起始页时再前进回来（那已经不是本站页面） */
async function goBack(page: Page) {
  await page.goBack();
  if (!page.url().startsWith('http')) await page.goForward();
}

/** 随机挑一个可点的元素 */
async function pickEnabled(list: Locator, r: (n: number) => number) {
  const n = await list.count();
  const ok: number[] = [];
  for (let i = 0; i < n; i++) if (await list.nth(i).isEnabled()) ok.push(i);
  return ok.length ? list.nth(ok[r(ok.length)]) : null;
}

async function randomState(r: (n: number) => number): Promise<string> {
  const q = new URLSearchParams();
  if (r(2)) q.set('brand', BRANDS[r(BRANDS.length)]);
  if (r(2)) q.set('material', MATERIALS[r(MATERIALS.length)][0]);
  const c = r(4);
  if (c === 1) q.set('category', 'fav');
  if (c === 2) q.set('category', CATS[r(CATS.length)][0]);
  if (!r(3)) q.set('q', WORDS[r(WORDS.length)]);
  return `/?${q}`;
}

async function productAction(page: Page, r: (n: number) => number, mobile: boolean): Promise<string> {
  const roll = r(20);
  const empty = page.locator('main .empty button.scope-clear');
  if (roll === 0) { const url = await randomState(r); await page.goto(url); return `打开链接 ${url}`; }
  if (roll === 1) { await page.reload(); return '刷新'; }
  if (roll === 2) { await goBack(page); return '后退'; }
  if (roll === 3 && (await empty.count())) { const b = await pickEnabled(empty, r); const t = await b!.textContent(); await b!.click(); return `空结果:${t}`; }
  if (roll === 4) {
    const chips = page.locator('.active-filters button');
    const b = await pickEnabled(chips, r);
    if (b) { const t = await b.textContent(); await b.click(); return `移除:${t}`; }
  }
  if (roll === 5) {
    const box = page.getByRole('searchbox');
    if (r(3) === 0) { await box.fill(''); await expect.poll(() => stateOf(page).query).toBe(''); return '清空搜索框'; }
    const w = WORDS[r(WORDS.length)]; await box.fill(w);
    await expect.poll(() => stateOf(page).query).toBe(w);
    return `搜索:${w}`;
  }
  if (!mobile) {
    const side = page.getByRole('complementary', { name: '索引' });
    const sec = (h: string) => side.locator('.side-sec', { has: page.getByRole('heading', { name: h, exact: true }) });
    if (roll < 9) { const b = await pickEnabled(side.getByRole('button', { name: /^我的常用/ }), r); if (b) { await b.click(); return '点我的常用'; } }
    if (roll < 13) { const b = await pickEnabled(sec('品牌').locator('button'), r); const t = await b!.textContent(); await b!.click(); return `品牌:${t}`; }
    if (roll < 17) { const b = await pickEnabled(sec('适用材质').locator('button'), r); const t = await b!.textContent(); await b!.click(); return `材质:${t}`; }
    const links = side.getByRole('navigation', { name: '分类目录' }).locator(':scope > ul > li > a');
    const n = await links.count();
    if (!n) return '分类目录为空';
    const link = links.nth(r(n));
    const href = (await link.getAttribute('href'))!;
    await link.click();
    await expect.poll(() => page.locator(href).evaluate((el) => Math.abs(el.getBoundingClientRect().top) < 200 || innerHeight + scrollY >= document.documentElement.scrollHeight - 2), { message: `跳到 ${href}` }).toBe(true);
    return `跳分类:${href}`;
  }
  if (roll < 9) { const b = await pickEnabled(page.locator('.chips .fav-chip'), r); if (b) { await b.click(); return '点常用'; } }
  if (roll < 13) { const b = await pickEnabled(page.locator('.chips button:not(.fav-chip)'), r); const t = await b!.textContent(); await b!.click(); return `分类:${t}`; }
  if (roll < 17) {
    const opts = await page.locator('.brand-pick select option:not([disabled])').evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value));
    const v = opts[r(opts.length)]; await page.locator('.brand-pick select').selectOption(v); return `品牌:${v || '全部'}`;
  }
  const opts = await page.locator('.mat-pick select option:not([disabled])').evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value));
  const v = opts[r(opts.length)]; await page.locator('.mat-pick select').selectOption(v); return `材质:${v || '全部'}`;
}

for (const mobile of [false, true]) {
  test(`探索：产品筛选（${mobile ? '手机' : '桌面'}）任意点击顺序`, async ({ page }) => {
    test.setTimeout(240000);
    if (mobile) await page.setViewportSize({ width: 390, height: 844 });
    const r = rng(SEED + (mobile ? 1 : 0));
    for (let run = 0; run < 5; run++) {
      await page.goto(run === 0 ? '/' : await randomState(r));
      const history: string[] = [page.url().replace(/^https?:\/\/[^/]+/, '')];
      for (let step = 0; step < 8; step++) {
        history.push(await attempt(history, () => productAction(page, r, mobile)));
        await checkProducts(page, `种子 ${SEED}：${history.join(' → ')}`, mobile);
      }
    }
  });
}

test('探索：流程页筛选任意点击顺序', async ({ page }) => {
  test.setTimeout(180000);
  const r = rng(SEED + 2);
  const side = page.getByRole('complementary', { name: '索引' });
  const sec = (h: string) => side.locator('.side-sec', { has: page.getByRole('heading', { name: h, exact: true }) });
  for (let run = 0; run < 4; run++) {
    await page.goto('/flows');
    const history: string[] = [];
    for (let step = 0; step < 8; step++) {
      const roll = r(10);
      if (roll < 3) { const b = await pickEnabled(sec('品牌').locator('button'), r); const t = await b!.textContent(); await b!.click(); history.push(`品牌:${t}`); }
      else if (roll < 6) { const b = await pickEnabled(sec('场景').locator('button'), r); const t = await b!.textContent(); await b!.click(); history.push(`场景:${t}`); }
      else if (roll < 8) { const w = r(3) ? WORDS[r(WORDS.length)] : ''; await page.getByRole('searchbox').fill(w); await expect.poll(() => stateOf(page).query).toBe(w); history.push(`搜索:${w || '（清空）'}`); }
      else if (roll < 9 && (await page.locator('main .empty button').count())) { const b = await pickEnabled(page.locator('main .empty button'), r); const t = await b!.textContent(); await b!.click(); history.push(`空结果:${t}`); }
      else { history.push('后退'); await goBack(page); }
      const where = `种子 ${SEED}：${history.join(' → ')}`;
      const s = stateOf(page);
      if (!new URL(page.url()).pathname.startsWith('/flows')) break;
      const res = select(s);
      await expect.poll(() => page.locator('main .flow').count(), { message: `${where} 流程数量` }).toBe(res.flows.length);
      if (!s.query) expect(res.flows.length, `${where} 流程筛选逻辑`).toBe(FLOWS.filter((f) => (!s.brand || f.brand === s.brand) && (!s.scene || f.scene === s.scene)).length);
      for (const [i, k] of (['', ...SCENES.map(([k]) => k)] as const).entries()) {
        const btn = sec('场景').locator('button').nth(i);
        const want = select({ ...s, scene: k }).flows.length;
        expect(await num(btn), `${where} 场景「${k ? SCENE_NAME[k] : '全部'}」数字`).toBe(want);
        expect(await btn.isDisabled(), `${where} 场景「${k || '全部'}」可点状态`).toBe(isDead(want, s.scene === k, !k));
      }
      for (const [i, b] of (['', ...BRANDS] as const).entries()) {
        const want = select({ ...s, brand: b }).flows.length;
        expect(await num(sec('品牌').locator('button').nth(i)), `${where} 品牌「${b || '全部'}」数字`).toBe(want);
      }
      const ids = await page.locator('main .flow').evaluateAll((els) => els.map((el) => `#${el.id}`).sort());
      expect(await page.locator('aside nav[aria-label="流程目录"] a').evaluateAll((els) => els.map((el) => el.getAttribute('href')).sort()), `${where} 流程目录`).toEqual(ids);
      if (!res.flows.length) {
        const empty = page.locator('main .empty');
        await expect(empty).toContainText(s.query ? `没有与「${s.query}」相关的流程` : '没有同时符合这些条件的流程');
        const relaxed: [string, number, boolean][] = [['去掉场景', res.flowRelaxed.scene, !!s.scene], ['去掉品牌', res.flowRelaxed.brand, !!s.brand], ['清空搜索', res.flowRelaxed.query, !!s.query]];
        for (const [label, n, active] of relaxed) {
          const btn = empty.getByRole('button', { name: new RegExp(`^${label}`) });
          if (active && n) await expect(btn, `${where} 空结果应提供「${label}」`).toHaveText(new RegExp(`（${n} 个）$`));
          else await expect(btn, `${where} 不能放宽的条件不应列出`).toHaveCount(0);
        }
      }
    }
  }
});

test('探索：详情弹窗、常用收藏与浏览器前进后退', async ({ page }) => {
  test.setTimeout(180000);
  const r = rng(SEED + 3);
  await page.evaluate(() => localStorage.setItem('wash-favorites', '[]'));
  await page.goto('/?brand=K');
  const history: string[] = ['/?brand=K'];
  let favs: string[] = [];
  for (let step = 0; step < 18; step++) {
    await attempt(history, async () => {
      const dialog = page.getByRole('dialog');
      // 正在播放关闭动画（data-closing）的面板不算打开
      const open = (await page.locator('dialog.sheet[open]:not([data-closing])').count()) > 0;
      const roll = r(8);
      if (!open && roll < 4) {
        const cards = page.locator('main .card:visible');
        const n = await cards.count();
        if (n) { const c = cards.nth(r(Math.min(n, 12))); const id = (await c.getAttribute('href'))!.match(/\/p\/([^?]+)/)![1]; history.push(`打开 ${id}`); await c.click(); await expect(dialog).toBeVisible(); }
      } else if (open && roll < 2) { history.push('关闭'); await page.getByRole('button', { name: '关闭', exact: true }).click(); }
      else if (open && roll < 3) { history.push('Esc'); await page.keyboard.press('Escape'); }
      else if (open && roll < 5) {
        const id = new URL(page.url()).pathname.split('/')[2];
        // 面板的无障碍名称就是当前产品（前进后退留下的隐藏详情不能被引用）
        await expect(page.getByRole('dialog', { name: PRODUCTS.find((p) => p.id === id)!.name, exact: true })).toBeVisible();
        const btn = dialog.getByRole('button', { name: /加入常用$/ });
        await btn.click();
        favs = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
        history.push(`切换常用 ${id}`);
      } else if (roll < 6) { history.push('后退'); await goBack(page); }
      else if (roll < 7) { history.push('前进'); await page.goForward(); }
      else { const b = BRANDS[r(BRANDS.length)]; if (!open) { history.push(`品牌:${b}`); await page.getByRole('complementary', { name: '索引' }).locator('.side-sec').first().getByRole('button').nth(BRANDS.indexOf(b) + 1).click(); } }
    });
    const where = `种子 ${SEED}：${history.join(' → ')}`;
    // 关闭有动画：等界面稳定后，详情只在 /p/ 路径出现，其他路径没有弹窗
    await expect.poll(async () => {
      const onDetail = new URL(page.url()).pathname.startsWith('/p/');
      if (await page.locator('dialog[data-closing]').count()) return false;
      return onDetail ? (await page.locator('.sh-name:visible').count()) === 1 : (await page.getByRole('dialog').count()) === 0;
    }, { message: where }).toBe(true);
    const path = new URL(page.url()).pathname;
    expect(JSON.parse((await page.evaluate(() => localStorage.getItem('wash-favorites'))) ?? '[]').sort(), `${where} 收藏记录`).toEqual([...favs].sort());
    if (!path.startsWith('/p/')) {
      const fav = page.getByRole('complementary', { name: '索引' }).getByRole('button', { name: /^我的常用/ });
      const s = stateOf(page);
      expect(await num(fav), `${where} 我的常用数字`).toBe(select({ ...s, category: 'fav' }, favs).products.length);
    }
  }
});

test('收藏记录损坏或含已删除产品时页面照常使用，数字只算有效收藏', async ({ page }) => {
  const side = page.getByRole('complementary', { name: '索引' });
  for (const [raw, n] of [['{bad json', 0], ['"C-reset"', 0], ['[1, null, "C-reset", "deleted-x", "C-reset"]', 1], ['[]', 0]] as const) {
    await page.evaluate((v) => localStorage.setItem('wash-favorites', v), raw);
    await page.goto('/');
    await expect(side.getByRole('button', { name: /^我的常用/ }), raw).toHaveText(new RegExp(`${n}$`));
    await page.goto('/?category=fav');
    if (n) await expect(page.locator('main .card:visible')).toHaveCount(n);
    else await expect(page.locator('main .empty')).toContainText('还没有常用产品');
  }
});

test('不存在的产品页每次都返回 404，收藏了已删除产品也不会让服务器出错', async ({ page, request }) => {
  const r = rng(SEED + 6);
  const bad = ['deleted-x', `zz-${r(1e6)}`, encodeURIComponent('中文'), 'L-primus-old', '%E0'];
  for (const id of bad) {
    for (let i = 0; i < 3; i++) expect((await request.get(`/p/${id}`)).status(), `/p/${id} 第 ${i + 1} 次`).toBe(404);
    expect((await request.get(`/p/${id}?_rsc=x`, { headers: { RSC: '1' } })).status(), `/p/${id} RSC`).toBe(404);
  }
  const ok = PRODUCTS[r(PRODUCTS.length)].id;
  expect((await request.get(`/p/${ok}`)).status(), ok).toBe(200);
  await page.goto('/p/deleted-x');
  await expect(page.locator('main, body').getByText('没有找到这个页面')).toBeVisible();
  await page.getByRole('link', { name: '回到产品速查' }).click();
  await expect(page).toHaveURL(/\/$/);
});

test('页面上的 id 不重复（前进后退留下的隐藏页面也算）', async ({ page }) => {
  await page.goto('/');
  for (const i of [0, 3, 7]) {
    await page.locator('main .card:visible').nth(i).click();
    await expect(page.locator('dialog.sheet[open]')).toBeVisible();
    await page.goBack();
    await page.goForward();
    await page.goBack();
  }
  const dupes = await page.evaluate(() => {
    const seen = new Map<string, number>();
    for (const el of document.querySelectorAll('[id]')) seen.set(el.id, (seen.get(el.id) ?? 0) + 1);
    return [...seen].filter(([, n]) => n > 1).map(([id]) => id);
  });
  expect(dupes).toEqual([]);
});

test('探索：稀释换算在任意水量下都和比例一致', async ({ page }) => {
  test.setTimeout(120000);
  const r = rng(SEED + 4);
  const candidates = PRODUCTS.filter((p) => p.dilutions.some(([, ratio, tool]) => convert(ratio, tool, 1000)));
  for (let i = 0; i < 6; i++) {
    const p = candidates[r(candidates.length)];
    await page.goto(`/p/${p.id}`);
    const custom = r(3) === 0;
    let vol: number | 'auto';
    if (custom) {
      vol = 10 + r(99990);
      await page.locator('.vol button').last().click();
      await page.getByRole('textbox', { name: '我的水量' }).fill(String(vol));
      await page.getByRole('button', { name: '完成' }).click();
    } else {
      const [v, label] = VOLUMES[r(VOLUMES.length)];
      vol = v;
      await page.getByRole('group', { name: '按水量换算' }).getByRole('button', { name: label, exact: true }).click();
    }
    const want = p.dilutions.map(([, ratio, tool]) => convert(ratio, tool, vol).split('　～　').join(''));
    const got = await page.locator('.dil .dl').evaluateAll((rows) => rows.map((row) => row.querySelector('.cc')?.textContent ?? ''));
    expect(got, `种子 ${SEED}：${p.id} 水量 ${vol}`).toEqual(want);
  }
});

test('探索：随机直接打开产品页、流程锚点和旧版链接', async ({ page }) => {
  test.setTimeout(180000);
  const r = rng(SEED + 5);
  const ORDER = ['稀释比例', '施工步骤', '注意事项', '出现在这些流程', '备注'];
  for (let i = 0; i < 10; i++) {
    const p = PRODUCTS[r(PRODUCTS.length)];
    const where = `种子 ${SEED}：/p/${p.id}`;
    await page.goto(`/p/${p.id}`);
    const sheet = page.locator('.page-sheet');
    await expect(sheet.locator('.sh-name'), where).toHaveText(p.name);
    await expect(sheet.locator('.sh-type'), where).toHaveText(p.type);
    const ph = phDisplay(p);
    await expect(sheet.locator('.sh-ph .phtag'), where).toHaveText(ph.basis ? `${ph.label} · ${ph.basis}` : ph.label);
    if (p.dilutions.length) await expect(sheet.locator('.dil .dl'), where).toHaveCount(p.dilutions.length);
    else await expect(sheet.locator('.none-msg'), where).toBeVisible();
    // 各部分固定顺序：有的部分可以没有，但出现的顺序不变
    const heads = (await sheet.locator('h3').allTextContents()).filter((h) => ORDER.includes(h));
    expect(heads, `${where} 段落顺序`).toEqual(ORDER.filter((h) => heads.includes(h)));
    expect(await sheet.locator('.facts dt').allTextContents(), `${where} 资料栏`).toEqual(p.category === 'acc' || !p.ph ? ['规格', '适用材质'] : ['规格', '适用材质', 'pH 依据']);
    // 从「出现在这些流程」随机跳到一个流程，目标流程出现在可视范围
    const rel = sheet.locator('.rel button');
    const n = await rel.count();
    if (n && r(2)) {
      await rel.nth(r(n)).click();
      await expect(page, where).toHaveURL(/\/flows/);
      const id = new URL(page.url()).hash.slice(1);
      await expect.poll(() => page.locator(`article[id="${id}"]`).evaluate((el) => el.getBoundingClientRect().top < innerHeight && el.getBoundingClientRect().bottom > 0), { message: `${where} → 流程 ${id}` }).toBe(true);
    }
  }
  for (let i = 0; i < 5; i++) {
    const f = FLOWS[r(FLOWS.length)];
    await page.goto(`/flows#${f.id}`);
    await expect.poll(() => page.locator(`article[id="${f.id}"]`).evaluate((el) => Math.abs(el.getBoundingClientRect().top) < innerHeight / 2), { message: `种子 ${SEED}：/flows#${f.id}` }).toBe(true);
  }
  // 旧版静态站的 /#产品id 链接会以弹窗打开对应产品，关闭后回到列表
  const legacy = PRODUCTS.filter((p) => /^[LMKC]-/.test(p.id));
  for (let i = 0; i < 3; i++) {
    const p = legacy[r(legacy.length)];
    // 从站外打开旧链接：每次都是完整加载页面
    await page.goto('about:blank');
    await page.goto(`/#${p.id}`);
    await expect(page, `种子 ${SEED}：/#${p.id}`).toHaveURL(new RegExp(`/p/${p.id}$`));
    await expect(page.getByRole('dialog', { name: p.name, exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page).toHaveURL(/\/$/);
  }
  // 已经在首页时再打开旧链接：只有 hash 变化，页面不会重新加载
  await expect(page.locator('dialog.sheet[open]')).toHaveCount(0);
  const p = legacy[r(legacy.length)];
  await page.evaluate((id) => { location.hash = id; }, p.id);
  await expect(page, `种子 ${SEED}：首页改 hash → ${p.id}`).toHaveURL(new RegExp(`/p/${p.id}$`));
  await expect(page.getByRole('dialog', { name: p.name, exact: true })).toBeVisible();
});
