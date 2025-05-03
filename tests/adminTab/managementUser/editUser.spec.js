const { test, expect } = require("../../common/testBase");
const { LoginPage, ManagementUserPage } = require("../../../pages/importsPage");
const { ToastMessage } = require("../../../constant/toastMessage");
const { ErrorMessage } = require("../../../constant/errorMessage");
const { ConstantSetting } = require("../../../constant/constantSetting");

const {
  createAdminUserOnDB,
  deleteAdminUserOnDB,
} = require("../../../utils/dbHelper");

// Test Data
const loginTestData = require("../../../testData/loginData.json");
const updateUserInformation = require("../../../testData/userData.json");
const passwordData = require("../../../testData/passwordData.json");

test.describe("Management User Test  - Edit User", () => {
  let loginPage, managementUserPage, userName, password, userNameUpdate;

  // Setup before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    managementUserPage = new ManagementUserPage(page);
    userName = `ThamAdmin_${Date.now()}`;
    password = "Admin@1234";
    //Create user in Database
    await createAdminUserOnDB(userName, password);
    await loginPage.login(
      loginTestData.validCredentials.admin.username,
      loginTestData.validCredentials.admin.password
    );
    await page.waitForLoadState("networkidle");
    await managementUserPage.clickAdminMenu();
    console.log("Navigating to User Management...");
    await managementUserPage.navigateToUsers();
    await page.waitForLoadState("load");
    console.log("Navigating to User Edit Page...");
    await managementUserPage.clickEditBtn(userName);
    await page.waitForLoadState("networkidle");
  });
  test.describe("Edit new user", { tags: ["happy-case"] }, () => {
    test.beforeEach(async () => {
      userNameUpdate = `ThamESS_${Date.now()}`;
    });
    test.afterEach(async () => {
      await deleteAdminUserOnDB(userNameUpdate);
    });
    test("Edit all information", async () => {
      await test.step("Edit user", async () => {
        await managementUserPage.editUser(
          userNameUpdate,
          updateUserInformation.updateUserInformation.role,
          updateUserInformation.updateUserInformation.status,
          updateUserInformation.updateUserInformation.employeeName,
          updateUserInformation.updateUserInformation.password,
          updateUserInformation.updateUserInformation.confirmPassword,
          false
        );
      });
      await test.step("Verify toast message", async () => {
        const toastMessage = await managementUserPage.getToastMsg();
        expect(toastMessage).toContain(ToastMessage.updateUserSuccess);
      });
      await test.step("Verify account is displayed on list with correct data", async () => {
        await managementUserPage.checkUserInformation(
          userNameUpdate,
          updateUserInformation.updateUserInformation.role,
          updateUserInformation.updateUserInformation.employeeName,
          updateUserInformation.updateUserInformation.status
        );
      });
    });
    test("Edit all user information and password", async () => {
      await test.step("Edit user", async () => {
        await managementUserPage.editUser(
          userNameUpdate,
          updateUserInformation.updateUserInformation.role,
          updateUserInformation.updateUserInformation.status,
          updateUserInformation.updateUserInformation.employeeName,
          updateUserInformation.updateUserInformation.password,
          updateUserInformation.updateUserInformation.confirmPassword,
          true
        );
      });
      await test.step("Verify toast message", async () => {
        const toastMessage = await managementUserPage.getToastMsg();
        expect(toastMessage).toContain(ToastMessage.updateUserSuccess);
      });
      await test.step("Verify account is displayed on list with correct data", async () => {
        await managementUserPage.checkUserInformation(
          userNameUpdate,
          updateUserInformation.updateUserInformation.role,
          updateUserInformation.updateUserInformation.employeeName,
          updateUserInformation.updateUserInformation.status
        );
      });
    });
  });
  test.describe("Fields Validation", { tags: ["validation-case"] }, () => {
    test.afterEach(async () => {
      await deleteAdminUserOnDB(userName);
    });
    test.describe("User Role Validation", () => {
      test("Validation on empty user role", async ({}) => {
        await managementUserPage.selectUserRole(
          "editUserSection",
          "-- Select --"
        );
        const errorMessage = await managementUserPage.getFieldErrorMsg();
        await expect(errorMessage).toBe(ErrorMessage.emptyFieldError);
      });
    });
    test.describe("Employee Name Validation", () => {
      test("Validation on empty employee name", async ({ page }) => {
        await managementUserPage.fillEmployeeName("editUserSection", "");
        await page.click("body");
        const errorMessage = await managementUserPage.getFieldErrorMsg();
        await expect(errorMessage).toBe(ErrorMessage.emptyFieldError);
      });
      test("Validation on invalid employee name", async ({ page }) => {
        console.log("Testing on invalid employee validation...");
        const invalidEmployee = "000";
        await managementUserPage.fillEmployeeName(
          "editUserSection",
          invalidEmployee
        );
        await page.click("body");
        const errorMessage = await managementUserPage.getFieldErrorMsg();
        await expect(errorMessage).toBe(ErrorMessage.employeeNameError);
      });
    });
    test.describe("User Status Validation", () => {
      test("Validation on empty user status", async ({ page }) => {
        console.log("Testing empty status validation...");
        await managementUserPage.selectStatus(
          "editUserSection",
          "-- Select --"
        );
        const errorMessage = await managementUserPage.getFieldErrorMsg();
        await expect(errorMessage).toBe(ErrorMessage.emptyFieldError);
      });
    });
    test.describe("UserName Validation", () => {
      test("Validation on empty password", async () => {
        await managementUserPage.fillUserName("editUserSection", "");
        const errorMessage = await managementUserPage.getFieldErrorMsg();
        await expect(errorMessage).toBe(ErrorMessage.emptyFieldError);
      });

      test("Validation on invalid username - min length", async () => {
        console.log("Testing invalid username validation - min length...");
        const invalidUsername = "min";
        await managementUserPage.fillUserName(
          "editUserSection",
          invalidUsername
        );
        const errorMessage = await managementUserPage.getFieldErrorMsg();
        await expect(errorMessage).toContain(
          ErrorMessage.userNameError.minLength
        );
      });
      test("Validation on existed username", async ({}) => {
        console.log("Testing existed username...");
        const existedUsername = loginTestData.validCredentials.admin.username;
        await managementUserPage.fillUserName(
          "editUserSection",
          existedUsername
        );
        const errorMessage = await managementUserPage.getFieldErrorMsg();
        await expect(errorMessage).toContain(
          ErrorMessage.userNameError.existedUser
        );
      });
    });
    test.describe("Password Validation", () => {
      test("Validation on empty password", async () => {
        await managementUserPage.toggleChangePassword(true);
        await managementUserPage.clickSaveBtn("editUserSection");
        const errorMessages = await managementUserPage.getPasswordFieldErrorMsg(
          ConstantSetting.hardTimeout
        );
        const passwordErrorMsg = errorMessages.passwordError;
        const confirmPasswordErrorMsg = errorMessages.confirmPasswordError;

        await expect(passwordErrorMsg).toBe(ErrorMessage.emptyFieldError);
        await expect(confirmPasswordErrorMsg).toBe(
          ErrorMessage.confirmPasswordError
        );
      });

      test("Validation on invalid password - min length", async ({}) => {
        const invalidPassword = passwordData.minLength;
        await managementUserPage.toggleChangePassword(true);
        await managementUserPage.fillPassword(
          "editUserSection",
          invalidPassword
        );
        const errorMessages = await managementUserPage.getPasswordFieldErrorMsg(
          ConstantSetting.hardTimeout
        );
        const passwordError = errorMessages.passwordError;
        await expect(passwordError).toContain(
          ErrorMessage.passwordError.minLength
        );
      });
      test("Validation on invalid password - miss number", async ({}) => {
        const invalidPassword = passwordData.missingNumber;
        await managementUserPage.toggleChangePassword(true);
        await managementUserPage.fillPassword(
          "editUserSection",
          invalidPassword
        );
        const errorMessages = await managementUserPage.getPasswordFieldErrorMsg(
          ConstantSetting.hardTimeout
        );
        const passwordError = errorMessages.passwordError;
        await expect(passwordError).toContain(
          ErrorMessage.passwordError.missingNumber
        );
      });
      test("Validation on invalid password - miss upper", async ({}) => {
        const invalidPassword = passwordData.missingUpperCase;
        await managementUserPage.toggleChangePassword(true);
        await managementUserPage.fillPassword(
          "editUserSection",
          invalidPassword
        );
        const errorMessages = await managementUserPage.getPasswordFieldErrorMsg(
          ConstantSetting.hardTimeout
        );
        const passwordError = errorMessages.passwordError;
        await expect(passwordError).toContain(
          ErrorMessage.passwordError.missingUpperCase
        );
      });
      test("Validation on invalid password - miss lower", async ({}) => {
        const invalidPassword = passwordData.missingLowerCase;
        await managementUserPage.toggleChangePassword(true);
        await managementUserPage.fillPassword(
          "editUserSection",
          invalidPassword
        );
        const errorMessages = await managementUserPage.getPasswordFieldErrorMsg(
          ConstantSetting.hardTimeout
        );
        const passwordError = errorMessages.passwordError;
        await expect(passwordError).toContain(
          ErrorMessage.passwordError.missingLowerCase
        );
      });
      test("Validation on invalid password - miss special character", async ({}) => {
        const invalidPassword = passwordData.missingSpecChar;
        await managementUserPage.toggleChangePassword(true);
        await managementUserPage.fillPassword(
          "editUserSection",
          invalidPassword
        );
        const errorMessages = await managementUserPage.getPasswordFieldErrorMsg(
          ConstantSetting.hardTimeout
        );
        const passwordError = errorMessages.passwordError;
        await expect(passwordError).toContain(
          ErrorMessage.passwordError.missingSpecialChar
        );
      });
    });
  });
});
