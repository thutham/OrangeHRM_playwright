// dashboardPage.js
class DashboardPage {
    constructor(page) {
      this.page = page;
  
      this.timeAtWorkWidgetLocators = {
          timeAtWorkWidget: page.locator('.orangehrm-dashboard-widget:has-text("Time at Work")'),
          btn: page.locator('.oxd-icon-button .orangehrm-attendance-card-action')
      };
  
      this.myActionsWidgetLocators = {
          myActionsWidget: page.locator('.orangehrm-dashboard-widget:has-text("My Actions")'),
          approveTimesheet: page.locator('.orangehrm-todo-list-item p:hasText("Timesheets to Approve")'),
          candidateInterview: page.locator('.orangehrm-todo-list-item p:hasText("Candidate to Interview")'),

      };
  
      this.quickLaunchWidgetLocators = {
          quickLaunchWidget: page.locator('.orangehrm-dashboard-widget:has-text("Quick Launch")'),
          assignLeaveBtn:page.locator('button[title="Assign Leave"]'),
          leaveListBtn:page.locator('button[title="Leave List"]'),
          timeSheetBtn:page.locator('button[title="Timesheets"]'),
          applyLeaveBtn:page.locator('button[title="Apply Leave"]'),
          myLeaveBtn:page.locator('button[title="My Leave"]'),
          myTimesheetBtn:page.locator('button[title="My Timesheet"]'),
      };
  
      this.buzzLatestPostsWidgetLocators = {
          buzzLatestPostsWidget: page.locator('.orangehrm-dashboard-widget:has-text("Buzz Latest Posts")')
      };
  
      this.employeeDistributionBySubUnitWidgetLocators = {
          employeeDistributionBySubUnitWidget: page.locator('.orangehrm-dashboard-widget:has-text("Employee Distribution by Sub Unit")')
      };
  
      this.employeeDistributionByLocationWidgetLocators = {
          employeeDistributionByLocationWidget: page.locator('.orangehrm-dashboard-widget:has-text("Employee Distribution by Location")')
      };
    }
  }
  
  module.exports = DashboardPage;
  