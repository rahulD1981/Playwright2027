import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { CartPage } from "./CartPage";

export class POManager {
  private readonly page: Page;
  readonly loginPage: LoginPage;
  readonly homePage: HomePage;
  readonly cartPage: CartPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.cartPage = new CartPage(page);
  }


  getLoginPage(){
    return this.loginPage
  }


  getHomePage(){
    return this.homePage

  }

  getCartPage(){
    return this.cartPage
  }
}
