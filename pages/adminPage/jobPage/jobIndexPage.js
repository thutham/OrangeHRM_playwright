//userManagement.js
const { expect } = require("../../../tests/common/testBase");
const AdminIndexPage = require("../adminIndexPage"); // Import AdminPage

class JobPage extends AdminIndexPage {
  constructor(page) {
    super(page); // Call the parent constructor
    this.addJobSection = {
      addBtn: page.locator('//button[contains(., "Add")]'),
    };
    this.editJobSection = {
    },
    this.UserTableSection = {
      userTable: page.locator(".oxd-table"),
      selectAll: page.locator(".bi-dash .oxd-checkbox-input-icon"),
      userRow: page.locator("//div[contains(@class, 'oxd-table-row')]"),
    };
    this.deletePopup = {
      cancelBtn: page.locator('button:has-text("No, Cancel")'),
      XBtn: page.locator(""),
      submitBtn: page.locator('button:has-text(" Yes, Delete ")'),
    };
  }
  //Common
  async navigateToJobTitleMenu() {
    await this.openMenuTab("jobTab", "jobTitleMenu");
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
  
}

module.exports = JobPage;
