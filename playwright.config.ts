import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 1,
  reporter: [['list']],
  use: {viewport: {width: 1280, height: 900}, locale: 'en-US'},
  projects: [{name: 'chromium', use: {browserName: 'chromium'}}],
});
