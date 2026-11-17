import {Page, Locator} from "@playwright/test";

export class SignUpPage {
    //Definer locator types
    private readonly page: Page;
    private readonly signUpLnk: Locator; 
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signUpButton:Locator;

    //Initialize page constructor and loctors
    constructor(page:Page)
    {
           this.page = page ;
           this.signUpLnk = this.page.locator('#signin2');
           this.userNameInput = this.page.locator('#sign-username');
           this.passwordInput = this.page.locator('#sign-password');
           this.signUpButton = this.page.locator('div.modal-footer button:has-text("Sign up")');

    }
//create resuable actions
    async navigateToSignUp(){
        await this.signUpLnk.click();
    }

    async fillUserName(username: string){
        await this.userNameInput.fill(username);
    }

    async fillPassword(password: string){
        await this.passwordInput.fill(password);
    }

   async submitSignUp() {
        await this.signUpButton.click();
    }

    async signUp(username : string, password:string):Promise<string> {
        await this.navigateToSignUp();
        await this.fillUserName(username);
        await this.fillPassword(password);
        const dialogPromise = this.page.waitForEvent('dialog') //inbuild keyword dialogPromise
        await this.submitSignUp();

        const dialog = await dialogPromise; // dialogue is also inbuilt
        const message = dialog.message();
        await dialog.accept();
    
        return message;
    }


}
