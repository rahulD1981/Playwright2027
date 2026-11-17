import { test,expect } from "@playwright/test";
import { config } from "dotenv";



 test('betbyrole', async ({ page },testInfo) => {
    console.log(`Cofig run time configuration are -- ${JSON.stringify(testInfo.config)}`)
 })