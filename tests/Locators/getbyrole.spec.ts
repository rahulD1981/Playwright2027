import { test,expect } from "@playwright/test";
import { asyncWrapProviders } from "node:async_hooks";
import path from "node:path";


 test('betbyrole', async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page.waitForLoadState('domcontentloaded')
    await page.getByRole("button", {name:"Login"}).click()
    await page.getByText("Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.").isVisible()
 
await  page.getByRole("link", {name : 'Desktops'}).click();
await page.getByRole("link", {name : "Mac (1)"}).click()
 await page.screenshot({path:'ss.png', fullPage : true})
   })

