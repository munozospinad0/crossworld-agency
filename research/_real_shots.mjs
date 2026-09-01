// Capturas de las piezas nuevas: logo en nav, capitán real, reels y prueba real. Escritorio y celular.
import {chromium} from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
const browser = await chromium.launch();

async function run(viewport, prefix) {
  const page = await browser.newPage({viewport});
  await page.goto(`${BASE}/es`, {waitUntil: 'networkidle'});
  await page.screenshot({path: `/tmp/${prefix}_top.png`});
  for (const [name, sel] of [['captain', '#captain'], ['field', '#field'], ['proof', '#field + section']]) {
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    await el.screenshot({path: `/tmp/${prefix}_${name}.png`});
  }
  await page.goto(`${BASE}/es/about`, {waitUntil: 'networkidle'});
  await page.waitForTimeout(600);
  await page.screenshot({path: `/tmp/${prefix}_about.png`});
  await page.close();
}

await run({width: 1440, height: 900}, 'rd');
await run({width: 390, height: 844}, 'rm');
await browser.close();
console.log('ok');
