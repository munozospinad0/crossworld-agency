// Captura el cruce del Canal en escritorio y celular, en varios puntos del scroll.
import {chromium} from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'https://crossworld-agency-git-main-munozospinad0s-projects.vercel.app';
const browser = await chromium.launch();

async function shots(viewport, prefix, fractions) {
  const page = await browser.newPage({viewport});
  await page.goto(`${BASE}/es`, {waitUntil: 'networkidle'});
  const box = await page.locator('#crossing > div > div:nth-child(2)').boundingBox();
  const total = box.height - viewport.height;
  let i = 0;
  for (const f of fractions) {
    await page.evaluate((y) => window.scrollTo(0, y), box.y + total * f);
    await page.waitForTimeout(1400);
    await page.screenshot({path: `/tmp/${prefix}_${i}.png`});
    i++;
  }
  await page.close();
}

await shots({width: 1440, height: 900}, 'j2d', [0.15, 0.55]);
await shots({width: 390, height: 844}, 'j2m', [0.15, 0.55, 0.9]);
await browser.close();
console.log('ok');
