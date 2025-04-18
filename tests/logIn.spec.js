const { test, expect } = require("./common/testBase");
const { LoginPage } = require("../pages/index");

test.describe("Login Test Suites", () => {
  let loginPage;

  // Run before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  // Login failure test
  test("Login Fail", async ({ page }) => { // Mark the function as async
    await loginPage.login("Admin", "123");
  });
});
