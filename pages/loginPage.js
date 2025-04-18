class LoginPage {
    constructor(page) {
      this.page = page;
    }
  
    get userNameInputLocator() {
      return this.page.locator('input[name="username"]');
    }
  
    get passwordInputLocator() {
      return this.page.locator('input[name="password"]');
    }
  
    get loginBtnLocator() {
      return this.page.locator("button.orangehrm-login-button");
    }
  
    get forgotPasswordLocator() {
      return this.page.locator(".orangehrm-login-forgot");
    }
  
    get fieldErrorMessageLocator() {
      return this.page.locator(".oxd-input-field-error-message");
    }
  
    get credentialErrorLocator() {
      return this.page.locator(".oxd-alert.oxd-alert--error");
    }
  
    async login(username, password) {
      await this.userNameInputLocator.fill(username);
      await this.passwordInputLocator.fill(password);
      await this.loginBtnLocator.click();
    }
  }
  
  module.exports = LoginPage;  