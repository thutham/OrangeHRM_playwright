const { test, expect } = require("../../common/testBase");
const { LoginPage, ManagementUserPage } = require("../../../pages/importsPage");
const { ToastMessage } = require("../../../constant/toastMessage");
const {
  createAdminUserOnDB,
  deleteAdminUserOnDB,
} = require("../../../utils/dbHelper");
// Test Data
const loginTestData = require("../../../testData/loginData.json");

test.describe("Management User Test  - Delete User", () => {
  let loginPage, managementUserPage;
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
  test("Verify search by Username", async ({ page }) => {
    await test.step("Submit Search By UserName", async () => {
      await managementUserPage.fillUserName(
        "searchHeader",
        loginTestData.validCredentials.admin.username
      );
      await managementUserPage.clickSearchBtn();
      await page.waitForLoadState("networkidle");
    });
    await test.step("Verify Search By UserName", async () => {
      const usernames = await managementUserPage.getAllUsernames();
      usernames.forEach((name) => {
        expect(name).toBe(loginTestData.validCredentials.admin.username);
      });
    });
  });
  test("Verify search by Role", async ({ page }) => {
    const searchRole = "Admin";
    await test.step("Submit Search By Role", async () => {
      await managementUserPage.selectUserRole("searchHeader", searchRole);
      await managementUserPage.clickSearchBtn();
      await page.waitForLoadState("networkidle");
    });
    await test.step("Verify Search By Role", async () => {
      const roles = await managementUserPage.getAllUserRoles();
      console.log(roles);
      roles.forEach((role) => {
        expect(role).toBe(searchRole);
      });
    });
  });
  test("Verify search by Status", async ({ page }) => {
    const searchStatus = "Enabled";
    await test.step("Submit Search By Status", async () => {
      await managementUserPage.selectStatus("searchHeader", searchStatus);
      await managementUserPage.clickSearchBtn();
    });
    await test.step("Verify Search By Status", async () => {
      const allStatus = await managementUserPage.getAllUserStatus();
      console.log(allStatus);
      allStatus.forEach((status) => {
        expect(status).toBe(searchStatus);
      });
    });
  });
  test("Verify search by EmployeeName", async ({ page }) => {
    const searchEmployeeName = "Tham Nguyen";
    await test.step("Submit Search By Employee Name", async () => {
      await managementUserPage.fillEmployeeName(
        "searchHeader",
        searchEmployeeName
      );
      await managementUserPage.selectEmployeeName(searchEmployeeName);
      await managementUserPage.clickSearchBtn();
      await page.waitForFunction(() => document.readyState === "complete");

    });
    await test.step("Verify Search By Employee Name", async () => {
      const allEmployeeNames = await managementUserPage.getAllEmployeeNames();
      console.log(allEmployeeNames);
      allEmployeeNames.forEach((name) => {
        expect(name).toBe(searchEmployeeName);
      });
    });
  });
});
