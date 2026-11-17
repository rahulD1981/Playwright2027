import { test, expect } from "@playwright/test";

import { TestConfig } from '../TestConfig';
import { POManager } from "../pages/POManager";

const rawData = JSON.parse(JSON.stringify(require("../TestData/LoginPageTestData.json")));
const dataSet = Array.isArray(rawData) ? rawData : [rawData]; //convreted data set to array if not an array

let pOManager: POManager;

  test.beforeEach(async ({ page }) => {
    pOManager = new POManager(page);

//////////////////////////////////////
const config = new TestConfig();
    await page.goto(config.appUrl); // Navigate to application url


  });

for (const data of dataSet) {
  test(`Data Driven For Off ${data.productname}`, async ({ page }) => {
     
    // loginPage = pOManager.getLoginPage();
    // homePage = pOManager.getHomePage();
     //cartPage = pOManager.getCartPage();

    await pOManager.loginPage.navigateToLogin();
    await pOManager.loginPage.login(data.username, data.password);
    await page.waitForTimeout(2000);

    await pOManager.homePage.addProductToCart(data.productname);
    console.log(data.productname);
    await page.waitForTimeout(1000);

    await pOManager.homePage.navigateToCart();
    await page.waitForTimeout(1000);

    await pOManager.cartPage.waitForCartToLoad();
    const isProductInCart = await pOManager.cartPage.isProductInCart(data.productname);
    console.log(data.productname);
    expect(isProductInCart).toBe(true);
  });
}
