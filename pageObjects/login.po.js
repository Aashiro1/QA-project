const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    // this.cross = '//*[@id="elementor-popup-modal-11619"]/div/a/i';
    this.loginClick = '//div[contains(@class,"gap-2 hidden md:flex")]/a[2]';
    this.usernameInput = '//*[@id="Username"]';
    this.passwordInput = '//*[@id="Password"]';
    this.loginButton = '//button[contains(@class,"bg-secondary border border-gray-400 px-4 py-2.5 text-md w-full text-white")]';
    this.validLoginValidation = '//div[contains(@class,"text-xs font-semibold")]';
    // this.errorMessage = '//*[@id="error"]';
    // this.successMessage = "";
  }

  async login(username, password) {
    
    await this.page.locator(this.loginClick).click();
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  };
  async verifyValidLogin() {
    await expect(this.page.locator('//div[contains(@class,"text-xs font-semibold")]').first()).toHaveText("Bob Limbu");

  }

  async invalidLogin(error) {
    await expect(this.page.locator(this.errorMessage)).toHaveText(error);
  }
};