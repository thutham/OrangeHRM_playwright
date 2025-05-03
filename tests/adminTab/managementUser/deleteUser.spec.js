const { test, expect } = require("../../common/testBase");
const { LoginPage, ManagementUserPage } = require("../../../pages/importsPage");
const { ToastMessage } = require("../../../constant/toastMessage");
const { createAdminUserOnDB,deleteAdminUserOnDB } = require("../../../utils/dbHelper");

// Test Data
const loginTestData = require("../../../testData/loginData.json");

test.describe("Management User Test  - Delete User", () => {
  let loginPage, managementUserPage, userName, password;

  // Setup before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    managementUserPage = new ManagementUserPage(page);

    await loginPage.login(
      loginTestData.validCredentials.admin.username,
      loginTestData.validCredentials.admin.password
    );

    await page.waitForLoadState("networkidle"); // Ensure full page load
    await managementUserPage.clickAdminMenu();
    console.log("Navigating to User Management...");
    await managementUserPage.navigateToUsers();
    await page.waitForLoadState("load");
  });
  test.describe("Delete Fail", { tags: ["happy-case"] },()=>{
    test("Verify cannot delete myself", async () => {
        await test.step("Delete myselft", async () => {
          await managementUserPage.clickDeleteBtn(loginTestData.validCredentials.admin.username);
        });
        await test.step("Verify toast message", async () => {
          const toastMessage = await managementUserPage.getToastMsg();
          expect(toastMessage).toContain(ToastMessage.deleteUserFail);
        });
        await test.step("Verify account is still displayed on list", async () => {
            await managementUserPage.checkUserExistence(loginTestData.validCredentials.admin.username, true);
        });
      });

  });
  test.describe("Delete success/Cancel", { tags: ["happy-case"] },()=>{
    test.beforeEach(async ({ page }) => {
        userName = `ThamAdmin_${Date.now()}`;
        password = "Admin@1234";
        //Create user in Database
        await createAdminUserOnDB(userName, password);
        await page.reload({ waitUntil: "domcontentloaded" });
    });
    test.afterEach(async ({ page }) => {
        await deleteAdminUserOnDB(userName);
    
    });
    test("Verify delete a user successfully", async () => {
        await test.step("Delete User", async () => {
          await managementUserPage.clickDeleteBtn(userName);
          await managementUserPage.confirmDeteleUser();
        });
        await test.step("Verify toast message", async () => {
          const toastMessage = await managementUserPage.getToastMsg();
          expect(toastMessage).toContain(ToastMessage.deleteUserSuccess);
        });
        await test.step("Verify account is not displayed on list", async () => {
            await managementUserPage.checkUserExistence(userName, false);
        });
      });
      
      test("Verify cancel delete by clicking Cancel", async () => {
        await test.step("Cancel Delete User", async () => {
          await managementUserPage.clickDeleteBtn(userName);
          await managementUserPage.cancelDeteleUser();
        });
        await test.step("Verify account is still displayed on list", async () => {
            await managementUserPage.checkUserExistence(userName, true);
        });
      });
  });
  
});
