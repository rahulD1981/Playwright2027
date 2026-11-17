import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/SignUpPage";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";

let signedUpUser: { username: string; password: string } | undefined;

test.describe.configure({ mode: "serial" });

test.describe("All Login related test cases", () => {
  const baseURL = "https://www.demoblaze.com/index.html";
  const testProduct = "Nexus 6";
  const testPassword = "Test@1234";

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test("User Can Sign up with a new Account", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    signedUpUser = {
      username: `rahul_${Date.now()}`,
      password: testPassword,
    };

    const alertMessage = await signUpPage.signUp(
      signedUpUser.username,
      signedUpUser.password
    );
    expect(alertMessage).toContain("Sign up successful");
  });

  test("User can login, add a product to cart and verify it", async ({ page }) => {
    expect(signedUpUser).toBeDefined();

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await page.locator("#login2").click();
    await loginPage.fillUsername(signedUpUser!.username);
    await loginPage.fillPassword(signedUpUser!.password);
    await loginPage.submitLogin();
    await page.waitForTimeout(2000);

    await homePage.addProductToCart(testProduct);
    await page.waitForTimeout(1000);

    await homePage.navigateToCart();
    await page.waitForTimeout(1000);

    await cartPage.waitForCartToLoad();
    const isProductInCart = await cartPage.isProductInCart(testProduct);
    expect(isProductInCart).toBe(true);
  });




});
