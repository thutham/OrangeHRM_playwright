const { test, expect } = require("./common/testBase");
const { LoginPage } = require("../pages/importsPage");
const {ErrorMessage}= require("../constant/errorMessage");
const {URLS} = require("../constant/constantUrls");
//data
const loginTestData = require("../testData/loginData.json");

test.describe("Login Test Suites", () => {
  let loginPage;

  // Run before each test
  test.beforeEach(async ({ page,request }) => {
    loginPage = new LoginPage(page,request);
  });

  // Login failure test
  test("Should show error message for invalid credentials", async ({  }) => {
    await loginPage.login(loginTestData.invalidCredentials.username, loginTestData.invalidCredentials.password);
    const error = await loginPage.getCredentialError();
    expect(error).toBe(ErrorMessage.credentialLoginError);
  });
  test("Should show error message when username is missing", async ({  }) => {
    await loginPage.login(loginTestData.missingUsername.username,loginTestData.missingUsername.password);
    const error = await loginPage.getFieldRequiredErrorText();
    expect(error).toBe(ErrorMessage.emptyFieldError);
  });
  test("Should show error message when password is missing", async ({  }) => {
    await loginPage.login(loginTestData.missingPassword.username, loginTestData.missingPassword.password);
    const error = await loginPage.getFieldRequiredErrorText();
    expect(error).toBe(ErrorMessage.emptyFieldError);
  });
  //Valid login
  test("Successful admin login with valid credentials", async ({ page }) => {
    await loginPage.login(
      loginTestData.validCredentials.admin.username,
      loginTestData.validCredentials.admin.password
    );
    await page.waitForLoadState("load");
    expect(page.url()).toBe(URLS.Dashboard);
  });
  // test("Successful employee login with valid credentials", async ({ page }) => {
  //   await loginPage.login(
  //     loginTestData.validCredentials.employee.username,
  //     loginTestData.validCredentials.employee.password
  //   );
  //   await page.waitForLoadState("load");
  //   expect(page.url()).toBe(URLS.Dashboard);
  // });
});
