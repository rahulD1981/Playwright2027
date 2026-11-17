import { test, expect } from "@playwright/test";

async function addProductToCartByText(page: any, productText: string, buttonName: string = 'ADD TO CART') {
  await page
    .locator('.product')
    .filter({ hasText: productText })
    .getByRole('button', { name: buttonName })
    .click();
}

 test('betbyrole', async ({ page }) => {
    //best works for boxes
    //logic is first find out all child elements which has same tag exam products below has multiple child obj with tag name products
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    await page.waitForLoadState('domcontentloaded')
    await page.locator(".product").filter({hasText : 'Beetroot - 1 Kg'}).getByRole("button",{name : 'ADD TO CART'}).click()
    await page.screenshot({path:'ss.png', fullPage : true})
   })

   test('add product to cart using reusable helper', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    await page.waitForLoadState('domcontentloaded');
    await addProductToCartByText(page, 'Beetroot - 1 Kg', 'ADD TO CART');
    await expect(page.locator('.cart').first()).toBeVisible();
   })