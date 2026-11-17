import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/SignUpPage";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
const {POManager} = require('../pages/POManager');

let signedUpUser: { username: string; password: string } | undefined;

  const baseURL = "https://www.demoblaze.com/index.html";
  const testProduct = "Nexus 6";
  const testPassword = "Test@1234";

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });


  test("SignInToApp and add product1", async ({ page }) => {
  
    const pOManager = new POManager(page);
   const loginPage = pOManager.getLoginPage();
   const homePage = pOManager.getHomePage();
   const cartPage = pOManager.getCartPage();

      await loginPage.navigateToLogin();
        await loginPage.login("rahuldhoke", "rahuldhoke");
 await page.waitForTimeout(2000);
    await homePage.addProductToCart(testProduct);
    await page.waitForTimeout(1000);

    await homePage.navigateToCart();
    await page.waitForTimeout(1000);

    await cartPage.waitForCartToLoad();
    const isProductInCart = await cartPage.isProductInCart(testProduct);
    expect(isProductInCart).toBe(true);

  });

