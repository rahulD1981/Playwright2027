# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: perfect3Reports.spec.ts >> Data Driven For Off Samsung galaxy s6
- Location: tests\perfect3Reports.spec.ts:25:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=f3e1]:
  - text:             
  - navigation [ref=f3e2]:
    - generic [ref=f3e3]:
      - link "PRODUCT STORE" [ref=f3e4] [cursor=pointer]:
        - /url: index.html
      - list [ref=f3e7]:
        - listitem [ref=f3e8]:
          - link "Home (current)" [ref=f3e9] [cursor=pointer]:
            - /url: index.html
            - text: Home
            - generic [ref=f3e10]: (current)
        - listitem [ref=f3e11]:
          - link "Contact" [ref=f3e12] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=f3e13]:
          - link "About us" [ref=f3e14] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=f3e15]:
          - link "Cart" [ref=f3e16] [cursor=pointer]:
            - /url: "#"
        - listitem
        - listitem [ref=f3e17]:
          - link "Log out" [ref=f3e18] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=f3e19]:
          - link "Welcome rahuldhoke" [ref=f3e20] [cursor=pointer]:
            - /url: "#"
        - listitem
  - generic [ref=f3e22]:
    - generic [ref=f3e23]:
      - heading "Products" [level=2] [ref=f3e24]
      - table [ref=f3e26]:
        - rowgroup [ref=f3e27]:
          - row [ref=f3e28]:
            - columnheader "Pic" [ref=f3e29]
            - columnheader "Title" [ref=f3e30]
            - columnheader "Price" [ref=f3e31]
            - columnheader "x" [ref=f3e32]
        - rowgroup [ref=f3e33]:
          - row [ref=f3e34]:
            - cell [ref=f3e35]
            - cell "Nexus 6" [ref=f3e37]
            - cell "650" [ref=f3e38]
            - cell [ref=f3e39]:
              - link "Delete" [ref=f3e40] [cursor=pointer]:
                - /url: "#"
    - generic [ref=f3e41]:
      - heading "Total" [level=2] [ref=f3e42]
      - heading "650" [level=3] [ref=f3e45]
      - button "Place Order" [ref=f3e46]
  - generic [ref=f3e48]:
    - generic [ref=f3e51]:
      - heading "About Us" [level=4] [ref=f3e52]
      - paragraph [ref=f3e53]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=f3e56]:
      - heading "Get in Touch" [level=4] [ref=f3e57]
      - paragraph [ref=f3e58]: "Address: 2390 El Camino Real"
      - paragraph [ref=f3e59]: "Phone: +440 123456"
      - paragraph [ref=f3e60]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=f3e64]
  - contentinfo [ref=f3e66]:
    - paragraph [ref=f3e67]: Copyright © Product Store
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | import { TestConfig } from '../TestConfig';
  4  | import { POManager } from "../pages/POManager";
  5  | 
  6  | const rawData = JSON.parse(JSON.stringify(require("../TestData/LoginPageTestData.json")));
  7  | const dataSet = Array.isArray(rawData) ? rawData : [rawData]; //convreted data set to array if not an array
  8  | 
  9  | 
  10 | 
  11 | let pOManager: POManager;
  12 | 
  13 | test.beforeEach(async ({ page }) => {
  14 |   pOManager = new POManager(page);
  15 | 
  16 |   const config = new TestConfig();
  17 |   await page.goto(config.appUrl);
  18 | });
  19 | 
  20 | test('User can log in with an existing account', async () => {
  21 |   await pOManager.loginPage.login('rahuldhoke', 'rahuldhoke');
  22 | });
  23 | 
  24 | for (const data of dataSet) {
  25 |   test(`Data Driven For Off ${data.productname}`, async ({ page }) => {
  26 |   
  27 | 
  28 |     await pOManager.loginPage.navigateToLogin();
  29 |     await pOManager.loginPage.login(data.username, data.password);
  30 |     await page.waitForTimeout(2000);
  31 | 
  32 |     await pOManager.homePage.addProductToCart(data.productname);
  33 |     console.log(data.productname);
  34 |     await page.waitForTimeout(1000);
  35 | 
  36 |     await pOManager.homePage.navigateToCart();
  37 |     await page.waitForTimeout(1000);
  38 | 
  39 |     await pOManager.cartPage.waitForCartToLoad();
  40 |     const isProductInCart = await pOManager.cartPage.isProductInCart(data.productname);
  41 |     console.log(data.productname);
> 42 |     expect(isProductInCart).toBe(true);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  43 |   });
  44 | }
  45 | 
```