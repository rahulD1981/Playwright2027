import { test,expect } from "@playwright/test";
import { asyncWrapProviders } from "node:async_hooks";
import path from "node:path";


  test('Get By Label', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await page.waitForLoadState('domcontentloaded')
    await page.locator("//input[@value='radio1']").click() 
    await page.screenshot({path:'ss.png', fullPage : true})
    
  })

  test('Get By Label1', async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page.waitForLoadState('domcontentloaded')
    await page.getByLabel('E-Mail Address').fill("donkey")
 await page.screenshot({path:'ss.png', fullPage : true})
    
  })

    test('Get By Label2', async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
    await page.waitForLoadState('domcontentloaded')
    await page.getByLabel('First Name').fill("donkey")
    await page.getByLabel("Yes").check()
    await page.getByLabel("No").check()
 await page.screenshot({path:'ss.png', fullPage : true})
    
  })


