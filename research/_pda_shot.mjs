import {chromium} from '@playwright/test';
const BASE = process.env.BASE_URL ?? 'https://crossworld-agency-git-main-munozospinad0s-projects.vercel.app';
const browser = await chromium.launch();
for (const [name, vp] of [['pda_d', {width: 1440, height: 1000}], ['pda_m', {width: 390, height: 900}]]) {
  const page = await browser.newPage({viewport: vp});
  await page.goto(`${BASE}/es/guia-transito-canal-de-panama`, {waitUntil: 'networkidle'});
  const el = page.locator('#pda-panel');
  await el.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -260));
  await page.locator('[aria-controls="pda-panel"]').nth(5).click();
  await page.waitForTimeout(800);
  await page.screenshot({path: `/tmp/${name}.png`});
  await page.close();
}
await browser.close();
console.log('ok');
