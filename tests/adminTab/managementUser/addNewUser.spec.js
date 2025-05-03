const { test, expect } = require("../../common/testBase");
const { LoginPage, ManagementUserPage } = require("../../../pages/importsPage");
const { URLS } = require("../../../constant/constantUrls");
const { ErrorMessage } = require("../../../constant/errorMessage");
const { ToastMessage } = require("../../../constant/toastMessage");
const { ConstantSetting } = require("../../../constant/constantSetting");

// Test Data
const loginTestData = require("../../../testData/loginData.json");
const registrationInfo = require("../../../testData/userData.json");
const passwordData = require("../../../testData/passwordData.json");

test.describe("Management User Test  - Add New User", () => {
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
    await managementUserPage.clickAddNewUserBtn();
    await page.waitForLoadState("load");
  });

  test.describe;("Add new user", { tags: ["happy-case"] }, () => {
    test("Verify adding a new admin user", async ({ page }) => {
      const dynamicName = `ThamAdmin_${Date.now()}`;
      console.log(`Adding new admin: ${dynamicName}`);

      await test.step("Fill user details", async () => {
        await managementUserPage.createNewUser(
          dynamicName,
          registrationInfo.newUserInformation.admin.role,
          registrationInfo.newUserInformation.admin.status,
          registrationInfo.newUserInformation.admin.employeeName,
          registrationInfo.newUserInformation.admin.password,
          registrationInfo.newUserInformation.admin.confirmPassword
        );
      });

      await test.step("Verify toast message", async () => {
        const toastMessage = await managementUserPage.getToastMsg();
        expect(toastMessage).toContain(ToastMessage.createUseruccess);
      });

      await test.step("Verify navigation", async () => {
        await page.waitForURL(URLS.Admin.userManagement.viewSystemUsers);
        expect(await page.url()).toBe(
          URLS.Admin.userManagement.viewSystemUsers
        );
      });
    });
    test("Verify adding a new ESS user", async ({ page }) => {
      const dynamicName = `ThamEmployee_${Date.now()}`;
      console.log(`Adding new ESS user: ${dynamicName}`);

      await test.step("Fill user details", async () => {
        await managementUserPage.createNewUser(
          dynamicName,
          registrationInfo.newUserInformation.employee.role,
          registrationInfo.newUserInformation.employee.status,
          registrationInfo.newUserInformation.employee.employeeName,
          registrationInfo.newUserInformation.employee.password,
          registrationInfo.newUserInformation.employee.confirmPassword
        );
      });

      await test.step("Verify toast message", async () => {
        const toastMessage = await managementUserPage.getToastMsg();
        expect(toastMessage).toContain("Successfully Saved");
      });

      await test.step("Verify navigation", async () => {
        await page.waitForURL(URLS.Admin.userManagement.viewSystemUsers);
        expect(await page.url()).toBe(
          URLS.Admin.userManagement.viewSystemUsers
        );
      });
    });
  });
  test.describe("Fields Validation", { tags: ["validation-case"] }, () => {
    test.describe("User Role Validation", () => {
      test("Validation on empty user role", async () => {
        console.log("Testing empty username validation...");
        await managementUserPage.createNewUser(
          `InvalidUser_${Date.now()}`,
          "",
          registrationInfo.newUserInformation.employee.status,
          registrationInfo.newUserInformation.employee.employeeName,
          registrationInfo.newUserInformation.employee.password,
          registrationInfo.newUserInformation.employee.confirmPassword
        );

        const errorMessage = await managementUserPage.getFieldErrorMsg();
        await expect(errorMessage).toBe(ErrorMessage.emptyFieldError);
      });
    });
    test.describe("Employee Name Validation", () => {
      test("Validation on empty employee name", async ({ page }) => {
        console.log("Testing empty employee validation...");
        await managementUserPage.createNewUser(
          `InvalidUser_${Date.now()}`,
          registrationInfo.newUserInformation.employee.role,
          registrationInfo.newUserInformation.employee.status,
          "",
          registrationInfo.newUserInformation.employee.password,
          registrationInfo.newUserInformation.employee.confirmPassword
        );
        const errorMessage = await managementUserPage.getFieldErrorMsg();
        await expect(errorMessage).toBe(ErrorMessage.emptyFieldError);
      });
      test("Validation on invalid employee name", async ({ page }) => {
        console.log("Testing on invalid employee validation...");
        const invalidEmployee = "000";
        await managementUserPage.fillEmployeeName(
          "addUserSection",
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
        await managementUserPage.createNewUser(
          `InvalidUser_${Date.now()}`,
          registrationInfo.newUserInformation.employee.role,
          "",
          registrationInfo.newUserInformation.employee.employeeName,
          registrationInfo.newUserInformation.employee.password,
          registrationInfo.newUserInformation.employee.confirmPassword
        );

        const errorMessage = await managementUserPage.getFieldErrorMsg();
        await expect(errorMessage).toBe(ErrorMessage.emptyFieldError);
      });
    });
    test.describe("UserName Validation", () => {
      test("Validation on empty password", async () => {
        console.log("Testing empty username validation...");
        await managementUserPage.createNewUser(
          "",
          registrationInfo.newUserInformation.employee.role,
          registrationInfo.newUserInformation.employee.status,
          registrationInfo.newUserInformation.employee.employeeName,
          registrationInfo.newUserInformation.employee.password,
          registrationInfo.newUserInformation.employee.confirmPassword
        );

        const errorMessage = await managementUserPage.getFieldErrorMsg();

        await expect(errorMessage).toBe(ErrorMessage.emptyFieldError);
      });

      test("Validation on invalid username - min length", async ({}) => {
        console.log("Testing invalid username validation - min length...");
        const invalidUsername = "min";
        await managementUserPage.fillUserName(
          "addUserSection",
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
          "addUserSection",
          existedUsername
        );
        const errorMessage = await managementUserPage.getFieldErrorMsg();
        await expect(errorMessage).toContain(
          ErrorMessage.userNameError.existedUser
        );
      });
    });
    test.describe("Password Validation", () => {
      test("Validation on empty password", async ({ page }) => {
        console.log("Testing empty password validation...");
        await managementUserPage.createNewUser(
          `InvalidUser_${Date.now()}`,
          registrationInfo.newUserInformation.employee.role,
          registrationInfo.newUserInformation.employee.status,
          registrationInfo.newUserInformation.employee.employeeName,
          "",
          ""
        );

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
        await managementUserPage.fillPassword("addUserSection",invalidPassword);
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
        await managementUserPage.fillPassword("addUserSection",invalidPassword);
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
        await managementUserPage.fillPassword("addUserSection",invalidPassword);
        const errorMessages = await managementUserPage.getPasswordFieldErrorMsg(
          ConstantSetting.hardTimeout
        );
        const passwordError = errorMessages.passwordError;
        await expect(passwordError).toContain(
          ErrorMessage.passwordError.missingUpperCase
        );
      });
      test("Validation on invalid password - miss lower", async ({}) => {
        console.log("Testing invalid password validation - miss lower...");

        const invalidPassword = passwordData.missingLowerCase;
        await managementUserPage.fillPassword("addUserSection",invalidPassword);
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
        await managementUserPage.fillPassword("addUserSection",invalidPassword);
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
