import { test, expect } from "@playwright/test";
const dataSet = JSON.parse(JSON.stringify(require("../TestData/LoginPageTestData.json")))
const {POManager} = require('../pages/POManager');



let signedUpUser: { username: string; password: string } | undefined;

  const baseURL = "https://www.demoblaze.com/index.html";
  const testProduct = "Nexus 6";
  const testPassword = "Test@1234";

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });


  test("Data Driven 1", async ({ page }) => {
  
    const pOManager = new POManager(page);
   const loginPage = pOManager.getLoginPage();
   const homePage = pOManager.getHomePage();
   const cartPage = pOManager.getCartPage();

      await loginPage.navigateToLogin();
        await loginPage.login(dataSet.username,dataSet.password);
 await page.waitForTimeout(2000);
    await homePage.addProductToCart(dataSet.productname);
    await page.waitForTimeout(1000);

    await homePage.navigateToCart();
    await page.waitForTimeout(1000);

    await cartPage.waitForCartToLoad();
    const isProductInCart = await cartPage.isProductInCart(dataSet.productname);
    expect(isProductInCart).toBe(true);

  });

