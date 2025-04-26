const { defineConfig } = require('@playwright/test');
const envConfig = require("./env.config");
const { currentEnv,BASE_URL } = envConfig;

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90000,
  fullyParallel: false,
  retries: 2,
  use: {
    headless: false,
    viewport: null, // Fullscreen viewport setting
    baseURL: BASE_URL,
    trace: 'on-first-retry', // Capture trace for debugging on the first retry
    video: 'on', // Capture video for all test runs
    workers: 2,
  },
  projects: [
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        channel: "chrome",
      },
    },
  ],
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
});

module.exports.envVariables = {
  currentEnv,
  BASE_URL
};
