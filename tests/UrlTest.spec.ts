import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { SignUpPage } from "../pages/SignUpPage";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { TestConfig } from '../TestConfig';
import { POManager } from "../pages/POManager";

dotenv.config();

const rawData = JSON.parse(JSON.stringify(require("../TestData/LoginPageTestData.json")));
const dataSet = Array.isArray(rawData) ? rawData : [rawData]; //convreted data set to array if not an array


let pOManager: POManager;
let loginPage: LoginPage;
let homePage: HomePage;
let cartPage: CartPage;
   
  test.beforeEach(async ({ page }) => {
   
   //loading url
   // await page.goto(baseURL);
//////////////////////////////////////
//Method 1 of passing URL
const config = new TestConfig();
    //await page.goto(config.appUrl); // Navigate to application url


  //Method 2 of passing url
  await page.goto('/')


    //page objects from po manager
    pOManager = new POManager(page);
    loginPage = pOManager.getLoginPage();
    homePage = pOManager.getHomePage();
    cartPage = pOManager.getCartPage();
  });

for (const data of dataSet) {
  test(`URL Differet ways ${data.productname}`, async ({ page }) => {
     pOManager = new POManager(page);
     loginPage = pOManager.getLoginPage();
     homePage = pOManager.getHomePage();
     cartPage = pOManager.getCartPage();

    const username = process.env.USER_NAME || process.env.username || 'aa';
    const password = process.env.PASSWORD || process.env.password || 'bb';

    await loginPage.navigateToLogin();
    //passing username and password thru json
    //await loginPage.login(data.username, data.password);

    //passing username and password thru environment
    await loginPage.login(username, password);

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
