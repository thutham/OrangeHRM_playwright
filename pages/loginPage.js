class LoginPage {
  constructor(page, request) {
    this.page = page;
    this.request = request; // Add request object for API interaction
    this.userNameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginBtn = page.locator("button.orangehrm-login-button");
    this.fieldErrorMessage = page.locator(".oxd-input-field-error-message");
    this.credentialError = page.locator(".oxd-alert--error .oxd-alert-content-text");
  }
  /**
   * Logs in with the provided username and password using the CSRF token
   * @param {string} username - The username
   * @param {string} password - The password
   */
  async login(username, password) {
    // Fill the login form with credentials and CSRF token
    console.log(`Filling login form with ${username}`);
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    // Submit the form
    console.log("Submitting the login form...");
    await this.loginBtn.click();
  }

  /**
   * Retrieves credential error message if login fails
   */
  async getCredentialError() {
    return await this.credentialError.innerText();
  }
  async getFieldRequiredErrorText(){
    await this.fieldErrorMessage.isVisible();
    return await this.fieldErrorMessage.innerText();

  }
}

module.exports = LoginPage;
