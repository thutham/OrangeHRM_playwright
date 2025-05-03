//userManagement.js
const { expect } = require("../../tests/common/testBase");
const AdminIndexPage = require("./adminIndexPage"); // Import AdminPage

class UserManagementPage extends AdminIndexPage {
  constructor(page) {
    super(page); // Call the parent constructor
    this.searchHeader = {
      userNameInput: page.locator(
        '//div[label[contains(text(), "Username")]]/following-sibling::div/input'
      ),
      userRoleSelectArrow: page.locator(
        '//div[label[contains(text(), "User Role")]]/following-sibling::div//i'
      ),
      employeeNameInput: page.locator('input[placeholder="Type for hints..."]'),
      statusSelectArrow: page.locator(
        '//div[label[contains(text(), "Status")]]/following-sibling::div//i'
      ),
      searchBtn: page.locator('button:has-text("Search")'),
      resetBtn: page.locator('button:has-text("Reset")'),
    };
    this.addUserSection = {
      addBtn: page.locator('//button[contains(., "Add")]'),
      userRoleSelectArrow: page.locator(
        '//div[label[contains(text(), "User Role")]]/following-sibling::div//i'
      ),
      employeeNameInput: page.locator('input[placeholder="Type for hints..."]'),
      statusSelectArrow: page.locator(
        '//div[label[contains(text(), "Status")]]/following-sibling::div//i'
      ),
      userNameInput: page.locator(
        '//div[label[contains(text(), "Username")]]/following-sibling::div/input'
      ),
      passwordInput: page.locator('(//input[@type="password"])[1]'),
      confirmPasswordInput: page.locator('(//input[@type="password"])[2]'),
      saveButton: page.locator('button[type="submit"]'),
      cancelButton: page.locator('button[type="button"]'),
    };
    this.editUserSection = {
      userRoleSelectArrow: page.locator(
        '//div[label[contains(text(), "User Role")]]/following-sibling::div//i'
      ),
      employeeNameInput: page.locator('input[placeholder="Type for hints..."]'),
      statusSelectArrow: page.locator(
        '//div[label[contains(text(), "Status")]]/following-sibling::div//i'
      ),
      userNameInput: page.locator(
        '//div[label[contains(text(), "Username")]]/following-sibling::div/input'
      ),
      changePassworkCheckbox: page.locator(".oxd-checkbox-input-icon"),
      passwordInput: page.locator('(//input[@type="password"])[1]'),
      confirmPasswordInput: page.locator('(//input[@type="password"])[2]'),
      saveButton: page.locator('button[type="submit"]'),
      cancelButton: page.locator('button[type="button"]'),
    };
    this.UserTableSection = {
      userTable: page.locator(".orangehrm-container"),
      selectAll: page.locator(".bi-dash .oxd-checkbox-input-icon"),
      userRow: page.locator("//div[contains(@class, 'oxd-table-row')]"),
      allUserNames: page.locator(
        "//div[contains(@class, 'oxd-table-row')]//div[2]"
      ),
      allUserRoles: page.locator(
        "//div[contains(@class, 'oxd-table-row')]//div[3]"
      ),
      allUserEmployeeNames: page.locator(
        "//div[contains(@class, 'oxd-table-row')]//div[4]"
      ),
      allUserStatus: page.locator(
        "//div[contains(@class, 'oxd-table-row')]//div[5]"
      ),
    };
    this.deletePopup = {
      cancelBtn: page.locator('button:has-text("No, Cancel")'),
      XBtn: page.locator(""),
      submitBtn: page.locator('button:has-text(" Yes, Delete ")'),
    };
  }
  //Common
  async navigateToUsers() {
    await this.openMenuTab("userManagementTab", "usermenu");
  }
  //User Table
  async checkUserExistence(userName, shouldExist = true) {
    const userRowLocator = this.page.locator(
      `//div[contains(@class, 'oxd-table-row oxd-table-row--with-border')][.//div[text()="${userName}"]]`
    );
    if (shouldExist) {
      await expect(userRowLocator).toHaveCount(1);
    } else {
      await expect(userRowLocator).toHaveCount(0);
    }
    return userRowLocator;
  }
  async checkUserInformation(
    userName,
    expectRole,
    expectEmployeeName,
    expectStatus
  ) {
    const userRow = await this.checkUserExistence(userName, true);
    const role = await userRow
      .locator(".oxd-padding-cell:nth-child(3)")
      .innerText();
    const employeeName = await userRow
      .locator(".oxd-padding-cell:nth-child(4)")
      .innerText();
    const status = await userRow
      .locator(".oxd-padding-cell:nth-child(5)")
      .innerText();
    expect(role).toBe(expectRole);
    expect(employeeName).toBe(expectEmployeeName);
    expect(status).toBe(expectStatus);
  }
  async getAllUsernames() {
    await this.UserTableSection.allUserNames.first().waitFor({ state: "visible" });
    const allValues = await this.UserTableSection.allUserNames.allInnerTexts();
    const allUsernames = allValues.slice(1);
    if (allUsernames.length === 0) {
      return [];
    }
    return allUsernames;
  }
  async getAllUserRoles() {
    await this.UserTableSection.allUserRoles
      .first()
      .waitFor({ state: "visible" });
    const allValues = await this.UserTableSection.allUserRoles.allInnerTexts();
    const allUserRoles = allValues.slice(1);
    if (allUserRoles.length === 0) {
      return [];
    }
    return allUserRoles;
  }
  async getAllUserStatus() {
    await this.UserTableSection.allUserStatus
      .first()
      .waitFor({ state: "visible" });
    const allValues = await this.UserTableSection.allUserStatus.allInnerTexts();
    const allUserStatus = allValues.slice(1);
    if (allUserStatus.length === 0) {
      return [];
    }
    return allUserStatus;
  }
  async getAllEmployeeNames() {
    await this.UserTableSection.allUserEmployeeNames
      .first()
      .waitFor({ state: "visible" });
    const allValues =
      await this.UserTableSection.allUserEmployeeNames.allInnerTexts();
    const allEmployeeNames = allValues.slice(1);
    if (allEmployeeNames.length === 0) {
      return [];
    }
    return allEmployeeNames;
  }
  //User Form
  async fillUserName(section, userName) {
    await this[section].userNameInput.fill(userName);
  }
  async fillEmployeeName(section, employeeName) {
    await this[section].employeeNameInput.fill(employeeName);
  }
  async selectEmployeeName(employeeName) {
    await this.page.waitForSelector(".oxd-autocomplete-dropdown");
    await this.page
      .locator(
        `.oxd-autocomplete-dropdown .oxd-autocomplete-option:has-text("${employeeName}")`
      )
      .click();
  }
  async selectUserRole(section, role) {
    if (!role || role.trim() === "") {
      return null;
    } // Enhance empty case

    await this[section].userRoleSelectArrow.click();

    // Select the correct option
    const roleOption =
      role === "-- Select --"
        ? `.oxd-select-dropdown .oxd-select-option:has-text("${role}")`
        : `.oxd-select-dropdown .oxd-select-option:has(span:has-text("${role}"))`;
    await this.page.locator(roleOption).click();
  }

  async selectStatus(section, status) {
    if (!status || status.trim() === "") {
      return null;
    } //enhance empty case
    await this[section].statusSelectArrow.click();
    // Select the correct option
    const statusOption =
      status === "-- Select --"
        ? `.oxd-select-dropdown .oxd-select-option:has-text("${status}")`
        : `.oxd-select-dropdown .oxd-select-option:has(span:has-text("${status}"))`;

    await this.page.locator(statusOption).click();
  }
  async fillPassword(section, password) {
    await this[section].passwordInput.fill(password);
  }
  async fillConfirmPassword(section, password) {
    await this[section].confirmPasswordInput.fill(password);
  }
  async clickSaveBtn(section) {
    await this[section].saveButton.click();
  }

  async getPasswordFieldErrorMsg(hardTimeout) {
    try {
      await this.page.waitForSelector(".oxd-input-field-error-message", {
        state: "visible",
        timeout: hardTimeout,
      });

      const errorElements = await this.page
        .locator(".oxd-input-field-error-message")
        .allInnerTexts();

      if (errorElements.length > 1) {
        return {
          passwordError: errorElements[0],
          confirmPasswordError: errorElements[1],
        }; // Return both password and confirm password errors
      } else if (errorElements.length === 1) {
        return { passwordError: errorElements[0] }; // Return only password error
      } else {
        throw new Error("No password error messages found."); // No errors detected
      }
    } catch (error) {
      throw new Error(
        `Failed to retrieve password error message: ${error.message}`
      );
    }
  }
  //Search
  async clickSearchBtn() {
    await this.searchHeader.searchBtn.click();
  }
  //Delete User
  async clickDeleteBtn(userName) {
    console.log("Click Delete User Button...");
    const userRow = await this.checkUserExistence(userName, true); // Await the locator function
    await userRow.locator("//i[contains(@class, 'oxd-icon bi-trash')]").click();
  }
  async cancelDeteleUser() {
    await this.deletePopup.cancelBtn.click();
  }
  async confirmDeteleUser() {
    await this.deletePopup.submitBtn.click();
  }
  //Edit
  async clickEditBtn(userName) {
    const userRow = await this.checkUserExistence(userName, true); // Await the locator function
    await userRow
      .locator("//i[contains(@class, 'oxd-icon bi-pencil-fill')]")
      .click();
  }
  async toggleChangePassword(shouldChange) {
    const checkbox = await this.editUserSection.changePassworkCheckbox;
    if (shouldChange) {
      await checkbox.click();
    }
  }
  async editUser(
    userName,
    role,
    status,
    employeeName,
    password,
    confirmPassword,
    shouldCheck
  ) {
    console.log("Edit User Information...");

    await this.fillUserName("editUserSection", userName);
    await this.selectUserRole("editUserSection", role);
    await this.selectStatus("editUserSection", status);
    await this.fillEmployeeName("editUserSection", employeeName);

    if (employeeName !== "") {
      await this.selectEmployeeName(employeeName);
    }
    const isChecked =
      await this.editUserSection.changePassworkCheckbox.isChecked();
    if (shouldCheck === true && !isChecked) {
      await this.toggleChangePassword(true);
      await this.fillPassword("editUserSection", password);
      await this.fillConfirmPassword("editUserSection", confirmPassword);
    }
    await this.clickSaveBtn("editUserSection");
  }

  //Add User
  async clickAddNewUserBtn() {
    await this.addUserSection.addBtn.click();
  }
  async createNewUser(
    userName,
    role,
    status,
    employeeName,
    password,
    confirmPassword
  ) {
    await this.fillUserName("addUserSection", userName);
    await this.selectUserRole("addUserSection", role);
    await this.selectStatus("addUserSection", status);
    await this.fillEmployeeName("addUserSection", employeeName);
    if (employeeName != "") {
      await this.selectEmployeeName(employeeName);
    }
    await this.fillPassword("addUserSection", password);
    await this.fillConfirmPassword("addUserSection", confirmPassword);
    await this.clickSaveBtn("addUserSection");
  }
}

module.exports = UserManagementPage;
