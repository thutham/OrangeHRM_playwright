const IndexPage = require("../indexPage"); // Import AdminPage
class AdminIndexPage extends IndexPage {
  constructor(page) {
    super(page);
    this.topbarMenu = {
      userManagementTab: {
        mainTab: page.locator(
          'li.oxd-topbar-body-nav-tab:has(span:has-text("User Management"))'
        ),
        usermenu: page.locator(
          '.oxd-topbar-body-nav-tab-link:has-text("Users")'
        ),
      },
      jobTab: {
        mainTab: page.locator(
          'li.oxd-topbar-body-nav-tab:has(span:has-text("Job "))'
        ),
        jobTitleMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Job Titles",
        }),
        payGradesMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Pay Grades",
        }),
        employmentStatusMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Employment Status",
        }),
        jobCategoriesenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Job Categories",
        }),
        workShiftsMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Work Shifts",
        }),
      },
      organizationTab: {
        mainTab: page.locator(
          'li.oxd-topbar-body-nav-tab:has(span:has-text("Organization "))'
        ),
        generalInforMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "General Information",
        }),
        locationsMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Locations",
        }),
        structureMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Structure",
        }),
        jobCategoriesMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Job Categories",
        }),
        workShiftsMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Work Shifts",
        }),
      },
      qualificationsTab: {
        mainTab: page.locator(
          'li.oxd-topbar-body-nav-tab:has(span:has-text("Qualifications  "))'
        ),
        skillsMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Skills",
        }),
        educationMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Education",
        }),
        licensesMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Licenses",
        }),
        languagesMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Languages",
        }),
        membershipsMenu: page.locator("a.oxd-topbar-body-nav-tab-link", {
          hasText: "Memberships",
        }),
      },
      nationalitiesTab: {
        mainTab: page.locator(
          'li.oxd-topbar-body-nav-tab:has(span:has-text("Nationalities"))'
        ),
      },
      corporateBrandingTab: {
        mainTab: page.locator(
          'li.oxd-topbar-body-nav-tab:has(span:has-text("Corporate Branding"))'
        ),
      },
      configurationTab: {
        mainTab: page.locator(
          'li.oxd-topbar-body-nav-tab:has(span:has-text("Configuration"))'
        ),
      },
      helpBtn: page.locator('button[title="Help"]'),
    };
  }
  async clickAdminMenu(){
    await this.clickMenu("admin");
  }
  async openMenuTab(mainTab, dropdownMenu) {
    await this.topbarMenu[mainTab].mainTab.click();
    await this.topbarMenu[mainTab][dropdownMenu].click();
  }
}

module.exports = AdminIndexPage;
