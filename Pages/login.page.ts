import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";

export class LoginPage extends BasePage {
    readonly titleOfPage: Locator;
    readonly googleSignInBtn: Locator;
    readonly emailAddressLabel: Locator;
    readonly emailAddressField: Locator;
    readonly passwordLabel: Locator;
    readonly passwordField: Locator;
    readonly eyeBtn: Locator;
    readonly loginButton: Locator;
    readonly notYetAccountLabel: Locator;
    readonly registerYourAccountLink: Locator;
    readonly forgotYourPasswordLink: Locator;
    readonly emailErrorMsg: Locator;
    readonly passwordErrorMsg: Locator;
    readonly loginErrorMsg: Locator;

    constructor(page: Page) {
        super(page, "https://practicesoftwaretesting.com/auth/login");
        this.titleOfPage = page.getByRole('heading', { name: 'Login', level: 3 });
        this.googleSignInBtn = page.getByLabel('Sign in with Google');
        this.emailAddressLabel = page.locator('label[for="email"]');
        this.emailAddressField = page.locator("[data-test=email]");
        this.passwordLabel = page.locator('label[for="password"]');
        this.passwordField = page.locator("[data-test=password]");
        this.eyeBtn = page.locator(".input-group-append button");
        this.loginButton = page.locator("[data-test=login-submit]");
        this.notYetAccountLabel = page.getByText("Not yet an account?");
        this.registerYourAccountLink = page.locator("[data-test=register-link]");
        this.forgotYourPasswordLink = page.locator("[data-test=forgot-password-link]");
        this.emailErrorMsg = page.locator("[data-test=email-error]");
        this.passwordErrorMsg = page.locator("[data-test=password-error]");
        this.loginErrorMsg = page.locator("[data-test=login-error]");
    }

    async login(username:string, password: string){
        await this.emailAddressField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}
