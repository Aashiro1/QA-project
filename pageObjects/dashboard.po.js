const { expect } = require("@playwright/test");
const { text } = require("stream/consumers");

let count = 0;
let cross = 1;
exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;

    this.shop = '//*[@id="content"]/a[4]/div/img[2]';
    this.itemSelect = '//*[@id="item-list"]/div[1]/a/img';
    this.addButton = '//*[@id="btn-add-cart"]';
    this.basket = '//div[contains(@class,"gap-2 hidden md:flex")]/a';
    this.validcart = '//*[@id="cart-item-858584"]/td[5]';
    this.increase =
      '//*[@id="popup-fly-cart"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/ul/li/div[2]/div[2]/div/div/button[2]';
    this.remove = '//*[@id="cart-item-858596"]/td[7]/button';
    // this.emptyCart = '//h2[contains(text(),"Your basket is currently empty")]';
    this.searchBtn =
      '//form[contains(@class,"navbar-form navbar-left navbar-main-search navbar-main-search-category")]/input[3]';

    this.searchResult = '//*[@id="item-list"]/div[1]/div/a/h5';
    this.searchitem = '//*[@id="item-list"]/div[1]/div/a/h5';
  }

  async addToCart(message) {
    await this.page.locator(this.shop).click();
    await this.page.locator(this.itemSelect).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.addButton).click();

    await this.page.locator(this.basket).click();
    // await expect(this.page.locator(this.validcart)).toHaveText(message);
  }

  async removeQuantity() {
    await this.page.locator(this.remove).click();
    // await expect(this.page.locator(this.emptyCart)).toHaveText(
    //   "Your basket is currently empty"
    // );
  }

  async addMultipleItem() {
    await this.page.locator(this.shop).click();
    await this.page.locator(this.itemSelect).click();
    await this.page.waitForTimeout(2000);

    for (let i = 0; i < 3; i++) {
      await this.page.locator(this.addButton).click();
      count++;

    }

    await this.page.waitForTimeout(3000);

    // Wait for the input element to be visible
    const inputElement = await this.page.locator('.cart-item-85858').first();

    // Retrieve the value of the input element
    const value = await inputElement.inputValue();
    console.log("Input Value:", value);

    // Validate the value
    if (parseInt(count) === parseInt(value)) {
      console.log("Test Successful!");
    } else {
      console.log("Test Failed!");
    }
  }


  async searchOperation(item) {
    await this.page.locator(this.searchBtn).click();
    await this.page.locator(this.searchBtn).fill(item);

    await this.page.waitForTimeout(2000);
    await this.page.locator(this.searchBtn).press("Enter");
    await this.page.waitForTimeout(2000);

    const searchResultText = await this.page
      .locator(this.searchResult)
      .innerText();
    console.log("Search Result Text:", searchResultText);

    if (searchResultText.toLowerCase().includes(item.toLowerCase())) {
      console.log("Result found.");
    } else {
      console("Error!");
    }
    await this.page.locator(this.searchitem).click();
    await this.page.waitForTimeout(4000);
    await this.page.locator(this.addButton).click();
    await this.page.waitForTimeout(4000);
    await this.page.locator(this.basket).click();
    await this.page.waitForTimeout(4000);
  }
};