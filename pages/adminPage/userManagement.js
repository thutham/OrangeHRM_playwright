//userManagement.js
const { TIMEOUT } = require("dns");
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

    this.userTable = page.locator("table.oxd-table");
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
    this.UserTableSection = {
      userTable: page.locator(".oxd-table"),
      selectAll: page.locator(".bi-dash .oxd-checkbox-input-icon"),
      userRow: page.locator("//div[contains(@class, 'oxd-table-row')]"),
      deleteBtn: page.locator(".oxd-icon bi-trashN"),
    };
    this.deletePopup = {
      cancelBtn: page.locator('button:has-text("No, Cancel")'),
      XBtn: page.locator(""),
      submitBtn: page.locator('button:has-text(" Yes, Delete ")'),
    };
  }
  //Delete User
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
  async clickDeleteBtn(userName) {
    console.log("Click  Delete User Button...");
    const userRow = await this.checkUserExistence(userName, true); // Await the locator function
    await userRow.locator("//i[contains(@class, 'oxd-icon bi-trash')]").click();
  }
  async cancelDeteleUser() {
    await this.deletePopup.cancelBtn.click();
  }
  async confirmDeteleUser() {
    await this.deletePopup.submitBtn.click();
  }

  //Search and Add new
  async navigateToUsers() {
    await this.openMenuTab("userManagementTab", "usermenu");
  }
  async clickAddNewUserBtn() {
    await this.addUserSection.addBtn.click();
  }
  async fillUserName(section, userName) {
    await this[section].userNameInput.fill(userName);
  }
  async fillEmployeeName(section, employeeName) {
    await this[section].employeeNameInput.fill(employeeName);
  }
  async selectEmployeeName(page, employeeName) {
    await page.waitForSelector(".oxd-autocomplete-dropdown");
    await this.page
      .locator(
        `.oxd-autocomplete-dropdown .oxd-autocomplete-option:has-text("${employeeName}")`
      )
      .click();
  }
  async selectUserRole(section, role) {
    if (!role || role.trim() === "") {
      return null;
    } //enhance empty case
    await this[section].userRoleSelectArrow.click();
    await this.page
      .locator(
        `.oxd-select-dropdown .oxd-select-option:has(span:has-text("${role}"))`
      )
      .click();
  }
  async selectStatus(section, status) {
    if (!status || status.trim() === "") {
      return null;
    } //enhance empty case
    await this[section].statusSelectArrow.click();
    await this.page
      .locator(
        `.oxd-select-dropdown .oxd-select-option:has(span:has-text("${status}"))`
      )
      .click();
  }
  async fillPassword(password) {
    await this.addUserSection.passwordInput.fill(password);
  }
  async fillConfirmPassword(password) {
    await this.addUserSection.confirmPasswordInput.fill(password);
  }
  async clickSaveBtn() {
    await this.addUserSection.saveButton.click();
  }
  async createNewUser(
    page,
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
      await this.selectEmployeeName(page, employeeName);
    }
    await this.fillPassword(password);
    await this.fillConfirmPassword(confirmPassword);
    await this.clickSaveBtn();
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
}

module.exports = UserManagementPage;
