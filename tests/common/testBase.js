const fs = require("fs");
const path = require("path");
const { test: baseTest, expect } = require("@playwright/test");
const envConfig = require("../../config/env.config");
const { BASE_URL } = envConfig;

// Extend Playwright baseTest for reusable browser context
const test = baseTest.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext(); // Shared context across tests
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await createPage(context, BASE_URL); // Reusable function for creating a page
    await use(page);
    await page.close();
  },
});

/**
 * Creates a new page and navigates to the given URL.
 * @param {Object} context - Playwright BrowserContext object
 * @param {string} url - The URL to navigate to
 * @returns {Object} Playwright Page object
 */
async function createPage(context, url) {
  const page = await context.newPage();
  if (url) {
    await page.goto(url, { waitUntil: 'load' });
  }
  return page;
}

/**
 * Saves a screenshot for failed tests to aid debugging.
 * @param {Object} page - Playwright Page object
 * @param {Object} testInfo - Information about the test
 */
async function saveFailureScreenshot(page, testInfo) {
  const screenshotDir = process.env.SCREENSHOT_DIR || "playwright-report/screenshots";
  const testDate = new Date().toISOString().split("T")[0];
  const folderPath = path.join(screenshotDir, testDate);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const sanitizedTitle = sanitizeFileName(testInfo.title);
  const screenshotPath = path.join(folderPath, `${sanitizedTitle}.png`);

  try {
    console.log(`Saving screenshot for ${testInfo.title} to: ${screenshotPath}`);
    await page.screenshot({ path: screenshotPath });
  } catch (error) {
    console.error("Error saving screenshot:", error.message);
  }
}

/**
 * Sanitizes the test title to create a valid file name.
 * @param {string} title - The test title
 * @returns {string} Sanitized file name
 */
function sanitizeFileName(title) {
  return title.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
}

/**
 * Clears the page state (cookies, permissions, localStorage, sessionStorage).
 * @param {Object} page - Playwright Page object
 */
async function clearPageState(page) {
  const context = page.context();
  await context.clearPermissions();
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

// Hooks
test.beforeEach(async ({ page }) => {
  console.log("Running beforeEach...");
  await clearPageState(page); // Clear state before each test
});

test.afterEach(async ({ page }, testInfo) => {
  console.log("Running afterEach...");
  if (testInfo.status === "failed") {
    await saveFailureScreenshot(page, testInfo);
  }
});

// Export the custom test configuration and utilities
module.exports = { test, expect, BASE_URL };
