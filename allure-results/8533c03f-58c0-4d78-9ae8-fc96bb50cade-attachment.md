# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: perfect3Reports.spec.ts >> Data Driven For Off Samsung galaxy s6
- Location: tests\perfect3Reports.spec.ts:25:7

# Error details

```
Error: Product "Samsung galaxy s6" not found
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - text:             
  - navigation [ref=f1e2]:
    - link "PRODUCT STORE" [ref=f1e3] [cursor=pointer]:
      - /url: index.html
    - list [ref=f1e6]:
      - listitem [ref=f1e7]:
        - link "Home (current)" [ref=f1e8] [cursor=pointer]:
          - /url: index.html
          - text: Home
          - generic [ref=f1e9]: (current)
      - listitem [ref=f1e10]:
        - link "Contact" [ref=f1e11] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=f1e12]:
        - link "About us" [ref=f1e13] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=f1e14]:
        - link "Cart" [ref=f1e15] [cursor=pointer]:
          - /url: cart.html
      - listitem [ref=f1e16]:
        - link "Log in" [ref=f1e17] [cursor=pointer]:
          - /url: "#"
      - listitem
      - listitem
      - listitem [ref=f1e18]:
        - link "Sign up" [ref=f1e19] [cursor=pointer]:
          - /url: "#"
    - generic [ref=f1e21]:
      - list [ref=f1e22]:
        - listitem [ref=f1e23] [cursor=pointer]
        - listitem [ref=f1e24] [cursor=pointer]
        - listitem [ref=f1e25] [cursor=pointer]
      - img "First slide" [ref=f1e28]
      - button "Previous" [ref=f1e29] [cursor=pointer]
      - button "Next" [ref=f1e32] [cursor=pointer]
  - generic [ref=f1e36]:
    - generic [ref=f1e38]:
      - link "CATEGORIES" [ref=f1e39] [cursor=pointer]:
        - /url: ""
      - link "Phones" [ref=f1e40] [cursor=pointer]:
        - /url: "#"
      - link "Laptops" [ref=f1e41] [cursor=pointer]:
        - /url: "#"
      - link "Monitors" [ref=f1e42] [cursor=pointer]:
        - /url: "#"
    - list [ref=f1e45]:
      - listitem [ref=f1e46]:
        - button "Previous" [ref=f1e47]
      - listitem [ref=f1e48]:
        - button "Next" [ref=f1e49] [cursor=pointer]
  - generic [ref=f1e51]:
    - generic [ref=f1e54]:
      - heading "About Us" [level=4] [ref=f1e55]
      - paragraph [ref=f1e56]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=f1e59]:
      - heading "Get in Touch" [level=4] [ref=f1e60]
      - paragraph [ref=f1e61]: "Address: 2390 El Camino Real"
      - paragraph [ref=f1e62]: "Phone: +440 123456"
      - paragraph [ref=f1e63]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=f1e67]
  - contentinfo [ref=f1e69]:
    - paragraph [ref=f1e70]: Copyright © Product Store
```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  | 
  3  | export class HomePage {
  4  |   private readonly page: Page;
  5  |   private readonly productLinks: Locator;
  6  |   private readonly addToCartButton: Locator;
  7  |   private readonly cartLink: Locator;
  8  |   private readonly categoryLinks: Locator;
  9  | 
  10 |   constructor(page: Page) {
  11 |     this.page = page;
  12 |     this.productLinks = page.locator('div#tbodyid div.card h4.card-title a');
  13 |     this.addToCartButton = page.locator('a:has-text("Add to cart")');
  14 |     this.cartLink = page.locator('#cartur');
  15 |     this.categoryLinks = page.locator('.list-group a');
  16 |   }
  17 | 
  18 | 
  19 | 
  20 |   async navigateToCart(){
  21 |     await this.cartLink.click()
  22 |   }
  23 |   async addProductToCart(productName: string) {
  24 |     // Click on the product to view its details
  25 |     await this.selectProductByName(productName);
  26 |     
  27 | 
  28 |     // Click the "Add to cart" button
  29 |     await this.addToCartButton.click();
  30 |   }
  31 | 
  32 | 
  33 | 
  34 | 
  35 | 
  36 | 
  37 |   async selectProductByName(productName: string){
  38 |     const productElements = await this.productLinks.all();
  39 | 
  40 |     for (const product of productElements) {
  41 |       const name = (await product.textContent())?.trim();
  42 |       if (name === productName) {
  43 |         await product.click();
  44 |         await this.addToCartButton.waitFor({ state: 'visible' });
  45 |         return;
  46 |       }
  47 |     }
  48 | 
> 49 |     throw new Error(`Product "${productName}" not found`);
     |           ^ Error: Product "Samsung galaxy s6" not found
  50 |   }
  51 | 
  52 | 
  53 |   
  54 |   // Category filtering
  55 |   async selectCategory(categoryName: string) {
  56 |     const categories = await this.categoryLinks.all();
  57 |     
  58 |     for (const category of categories) {
  59 |       const name = await category.textContent();
  60 |       if (name?.trim().toLowerCase() === categoryName.toLowerCase()) {
  61 |         await category.click();
  62 |         await this.page.waitForLoadState('networkidle');
  63 |         return;
  64 |       }
  65 |     }
  66 |     
  67 |     throw new Error(`Category "${categoryName}" not found`);
  68 |   }
  69 | 
  70 |   // Verification methods
  71 |   async isProductVisible(productName: string) {
  72 |     const products = await this.productLinks.all();
  73 |     
  74 |     for (const product of products) {
  75 |       const name = await product.textContent();
  76 |       if (name?.trim() === productName) {
  77 |         return true;
  78 |       }
  79 |     }
  80 |     
  81 |     return false;
  82 |   }
  83 | 
  84 |   // Wait methods
  85 |   async waitForProductsToLoad() {
  86 |     await this.page.waitForSelector('div#tbodyid div.card', { state: 'visible' });
  87 |   }
  88 | 
  89 | }
  90 | 
```