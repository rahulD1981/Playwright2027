import { test, expect } from "@playwright/test";

import { TestConfig } from '../TestConfig';
import { POManager } from "../pages/POManager";

const rawData = JSON.parse(JSON.stringify(require("../TestData/LoginPageTestData.json")));
const dataSet = Array.isArray(rawData) ? rawData : [rawData]; //convreted data set to array if not an array



let pOManager: POManager;

test.beforeEach(async ({ page }) => {
  pOManager = new POManager(page);

  const config = new TestConfig();
  await page.goto(config.appUrl);
});

test('User can log in with an existing account', async () => {
  await pOManager.loginPage.login('rahuldhoke', 'rahuldhoke');
});

for (const data of dataSet) {
  test(`Data Driven For Off ${data.productname}`, async ({ page }) => {
  

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
