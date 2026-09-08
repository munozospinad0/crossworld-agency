import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE = process.env.BASE_URL ?? 'https://crossworld-agency-git-main-munozospinad0s-projects.vercel.app';

test('home EN renders hero, credentials and services', async ({page}) => {
  await page.goto(`${BASE}/en`);
  await expect(page.getByRole('heading', {level: 1})).toContainText('Shipping agency');
  await expect(page.getByRole('region', {name: 'Credentials'})).toBeVisible();
  await expect(page.getByRole('link', {name: /Request a port call/}).first()).toBeVisible();
  const html = await page.content();
  expect(html).toContain('hreflang="es"');
  expect(html).toContain('application/ld+json');
});

test('locale switch keeps the route', async ({page}) => {
  await page.goto(`${BASE}/en/services`);
  await page.getByRole('link', {name: 'Español'}).first().click();
  await expect(page).toHaveURL(/\/es\/servicios$/);
  await expect(page.getByRole('heading', {level: 1})).toContainText('Servicios');
});

test('redirects and 410 for legacy WordPress routes', async ({request}) => {
  const root = await request.get(`${BASE}/`, {maxRedirects: 0});
  expect([301, 308]).toContain(root.status());
  const about = await request.get(`${BASE}/about`, {maxRedirects: 0});
  expect([301, 308]).toContain(about.status());
  const gone = await request.get(`${BASE}/wp-login.php`);
  expect(gone.status()).toBe(410);
  const nf = await request.get(`${BASE}/en/does-not-exist`);
  expect(nf.status()).toBe(404);
});

test('service pages exist in both languages', async ({page}) => {
  await page.goto(`${BASE}/en/services/ship-agency-panama-canal-transit`);
  await expect(page.getByRole('heading', {level: 1})).toContainText('Panama Canal transit agent');
  await page.goto(`${BASE}/es/servicios/agencia-naviera-transito-canal-de-panama`);
  await expect(page.getByRole('heading', {level: 1})).toContainText('Agente de tránsito');
});

test('port call form: invalid IMO shows an error, valid submission opens WhatsApp with the request', async ({page}) => {
  // El envío abre WhatsApp; se intercepta window.open para leer la URL sin abrir pestaña.
  await page.addInitScript(() => {
    (window as unknown as {__opened: string[]}).__opened = [];
    window.open = ((url: string) => { (window as unknown as {__opened: string[]}).__opened.push(String(url)); return null; }) as typeof window.open;
  });
  await page.goto(`${BASE}/en/request-port-call`);
  await page.fill('#vesselName', 'MV Playwright Test');
  await page.fill('#imo', '1234568'); // dígito de control inválido (el correcto para 123456 es 7)
  await page.fill('#eta', '2026-09-20T06:00');
  await page.check('input[name="ports"][value="balboa"]');
  await page.getByRole('button', {name: /Continue to services/}).click();
  await page.fill('#contactName', 'QA Bot');
  await page.fill('#company', 'ECUS QA');
  await page.fill('#email', 'qa@example.com');
  await page.fill('#phone', '+50760000000');
  await page.check('input[name="consent"]');
  await page.getByRole('button', {name: /Send by WhatsApp/}).click();
  await expect(page.locator('#imo-error')).toContainText('check digit');
  expect(await page.evaluate(() => (window as unknown as {__opened: string[]}).__opened.length)).toBe(0);
  // IMO válido (9074729 = ejemplo con checksum correcto)
  await page.fill('#imo', '9074729');
  await page.getByRole('button', {name: /Continue to services/}).click();
  await page.getByRole('button', {name: /Send by WhatsApp/}).click();
  await expect(page.getByRole('status')).toContainText('ready in WhatsApp');
  const opened = await page.evaluate(() => (window as unknown as {__opened: string[]}).__opened);
  expect(opened).toHaveLength(1);
  const text = new URL(opened[0]).searchParams.get('text') ?? '';
  expect(new URL(opened[0]).pathname).toBe('/50762664242');
  for (const bit of ['MV Playwright Test', '9074729', 'QA Bot', 'ECUS QA', 'qa@example.com', '+50760000000', 'Balboa']) {
    expect(text, `falta "${bit}" en el mensaje`).toContain(bit);
  }
});

test('accessibility: no serious or critical violations on key templates', async ({page}) => {
  for (const path of ['/en', '/en/services/marine-surveys', '/en/panama-canal-transit-guide', '/en/contact', '/en/request-port-call']) {
    await page.goto(`${BASE}${path}`);
    const results = await new AxeBuilder({page}).analyze();
    const bad = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(bad, `${path}: ${bad.map((b) => b.id).join(', ')}`).toEqual([]);
  }
});
