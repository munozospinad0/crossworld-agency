// Captura el cruce del Canal en varios puntos del scroll, más el pie con las banderas.
import {chromium} from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'https://crossworld-agency-git-main-munozospinad0s-projects.vercel.app';
const browser = await chromium.launch();
const page = await browser.newPage({viewport: {width: 1440, height: 900}});
await page.goto(`${BASE}/en`, {waitUntil: 'networkidle'});

const box = await page.locator('#crossing > div > div:nth-child(2)').boundingBox();
const top = box.y;
const total = box.height - 900;
let i = 0;
for (const f of [0.12, 0.45, 0.8]) {
  await page.evaluate((y) => window.scrollTo(0, y), top + total * f);
  await page.waitForTimeout(1200);
  await page.screenshot({path: `/tmp/journey_${i}.png`});
  i++;
}
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1200);
await page.screenshot({path: '/tmp/journey_footer.png'});
await browser.close();
console.log('ok');
