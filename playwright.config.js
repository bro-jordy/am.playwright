const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    // baseURL: 'https://aladinmall.id',
    baseURL: 'https://ui-frontstore-stg.aladinmall.id/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
