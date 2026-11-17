import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  
// Define properties
  private readonly page: Page;
  private readonly loginLink: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

// Initialize page context and elements
  constructor(page: Page) {
    this.page = page;
    this.loginLink = this.page.locator('#login2');
    this.usernameInput = this.page.locator('#loginusername');
    this.passwordInput = this.page.locator('#loginpassword');
    this.loginButton = this.page.locator('button:has-text("Log in")');
  }

  // Input methods
    // Navigation
  async navigateToLogin() {
    const modal = this.page.locator('#logInModal');

    if (!(await modal.isVisible().catch(() => false))) {
      await this.loginLink.click();
    }

    await modal.waitFor({ state: 'visible' });
  }



  async fillUsername(username: string) {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
  }

   async fillPassword(password: string) {
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
  }

  // Action methods
  async submitLogin() {
    await this.loginButton.click();
  }

    // Composite methods
  async login(username: string, password: string) {
    await this.navigateToLogin();
    await this.page.waitForLoadState('domcontentloaded');
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submitLogin();
  }

  // Helper methods
  async getUsernameValue(): Promise<string> {
    return await this.usernameInput.inputValue();
  }

  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

}