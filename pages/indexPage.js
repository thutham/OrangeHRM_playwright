class IndexPage {
  constructor(page) {
    this.page = page;
    this.collapeBtn = page.locator(".oxd-main-menu-button");
    this.searchInput = page.locator(".oxd-main-menu-search input"); // Fixed typo
    this.userDropdownTab = page.locator(".oxd-userdropdown-tab");
    this.toastMessage = page.locator("#oxd-toaster_1");
    this.menuItems = {
      admin: 'a[href="/web/index.php/admin/viewAdminModule"]',
      pim: 'a[href="/web/index.php/pim/viewPimModule"]',
      leave: 'a[href="/web/index.php/leave/viewLeaveModule"]',
      time: 'a[href="/web/index.php/time/viewTimeModule"]',
      recruitment: 'a[href="/web/index.php/recruitment/viewRecruitmentModule"]',
      myInfo: 'a[href="/web/index.php/pim/viewMyDetails"]',
      performance: 'a[href="/web/index.php/performance/viewPerformanceModule"]',
      directory: 'a[href="/web/index.php/directory/viewDirectory"]',
      maintenance: 'a[href="/web/index.php/maintenance/viewMaintenanceModule"]',
      claim: 'a[href="/web/index.php/claim/viewClaimModule"]',
      buzz: 'a[href="/web/index.php/buzz/viewBuzz"]',
    };
  }

  async clickMenu(menuName) {
    if (!this.menuItems[menuName]) {
      throw new Error(`Menu '${menuName}' does not exist.`);
    }
    await this.page.waitForSelector(this.menuItems[menuName], {
      state: "visible",
    });
    await this.page.locator(this.menuItems[menuName]).click();
  }

  async clickCollapeBtn() {
    await this.collapeBtn.click();
  }

  async fillSearchInput(searchKey) {
    await this.searchInput.fill(searchKey);
  }

  async getToastMsg() {
    await this.page.waitForFunction(() => {
      const toaster = document.querySelector("#oxd-toaster_1");
      return toaster && toaster.innerText.length > 0;
    });
    return await this.toastMessage.innerText();
  }

  async getFieldErrorMsg() {
    await this.page.waitForSelector(".oxd-input-field-error-message", {
      state: "visible",
    });
    return await this.page
      .locator(".oxd-input-field-error-message")
      .innerText();
  }
}

module.exports = IndexPage;
