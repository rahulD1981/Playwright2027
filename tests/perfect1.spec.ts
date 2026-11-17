import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/SignUpPage";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { TestConfig } from '../TestConfig';
import { POManager } from "../pages/POManager";

const rawData = JSON.parse(JSON.stringify(require("../TestData/LoginPageTestData.json")));
const dataSet = Array.isArray(rawData) ? rawData : [rawData]; //convreted data set to array if not an array
/*
const baseURL = "https://www.demoblaze.com/index.html";
const testProduct = "Nexus 6";
const testPassword = "Test@1234";
*/

let pOManager: POManager;
let loginPage: LoginPage;
let homePage: HomePage;
let cartPage: CartPage;
   
  test.beforeEach(async ({ page }) => {
   
   //loading url
   // await page.goto(baseURL);
//////////////////////////////////////
const config = new TestConfig();
    await page.goto(config.appUrl); // Navigate to application url


    //page objects from po manager
    pOManager = new POManager(page);
    loginPage = pOManager.getLoginPage();
    homePage = pOManager.getHomePage();
    cartPage = pOManager.getCartPage();
  });

for (const data of dataSet) {
  test(`Data Driven For Off ${data.productname}`, async ({ page }) => {
     pOManager = new POManager(page);
     loginPage = pOManager.getLoginPage();
     homePage = pOManager.getHomePage();
     cartPage = pOManager.getCartPage();

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
