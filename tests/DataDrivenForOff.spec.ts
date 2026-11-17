import { test, expect } from "@playwright/test";

const rawData = JSON.parse(JSON.stringify(require("../TestData/LoginPageTestData.json")));
const dataSet = Array.isArray(rawData) ? rawData : [rawData]; //convreted data set to array if not an array
const { POManager } = require("../pages/POManager");

const baseURL = "https://www.demoblaze.com/index.html";

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

for (const data of dataSet) {
  test(`Data Driven For Off ${data.productname}`, async ({ page }) => {
    const pOManager = new POManager(page);
    const loginPage = pOManager.getLoginPage();
    const homePage = pOManager.getHomePage();
    const cartPage = pOManager.getCartPage();

    await loginPage.navigateToLogin();
    await loginPage.login(data.username, data.password);
    await page.waitForTimeout(2000);

    await homePage.addProductToCart(data.productname);
    console.log(data.productname);
    await page.waitForTimeout(1000);

    await homePage.navigateToCart();
    await page.waitForTimeout(1000);

    await cartPage.waitForCartToLoad();
    const isProductInCart = await cartPage.isProductInCart(data.productname);
    console.log(data.productname);
    expect(isProductInCart).toBe(true);
  });
}
