import {Locator, Page} from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly url: string;
    readonly header: Locator;
    readonly notificationBar: Locator;
    readonly testingNotificationBar: Locator;
    readonly labelForTestingNotificationBar: Locator;
    readonly TestingGuideButton: Locator;
    readonly BugHuntingButton: Locator;
    readonly logo: Locator;
    readonly homeButton: Locator;
    readonly categoriesButton: Locator;
    readonly categoriesHandTools: Locator;
    readonly categoriesPowerTools: Locator;
    readonly categoriesOther: Locator;
    readonly categoriesSpecialTools: Locator;
    readonly categoriesRentals: Locator;
    readonly contactButton: Locator;
    readonly signInButton: Locator;
    readonly languageFilter: Locator;
    readonly languageDe: Locator;
    readonly languageEn: Locator;
    readonly languageEs: Locator;
    readonly languageFr: Locator;
    readonly languageNl: Locator;
    readonly languageTr: Locator;
    readonly footer: Locator;
    readonly footerText: Locator;
    readonly footerGitHubLink: Locator;
    readonly footerPrivacyPolicyLink: Locator;
    readonly footerBarnImagesLink: Locator;
    readonly footerUnsplashLink: Locator;

    constructor(page: Page, url: string = "https://practicesoftwaretesting.com/") {
        this.page = page;
        this.url = url;
        this.notificationBar = page.locator("[data-test=notification-bar]");
        this.testingNotificationBar = page.locator(".testing-notification-bar");
        this.labelForTestingNotificationBar = page.getByText("Practice Black Box Testing & Bug Hunting");
        this.TestingGuideButton = page.locator(".testing-guide-btn");
        this.BugHuntingButton = page.locator(".bug-hunting-btn");
        this.logo = page.locator("#Layer_1");
        this.homeButton = page.locator("[data-test=nav-home]");
        this.categoriesButton = page.locator("[data-test=nav-categories]");
        this.categoriesHandTools = page.locator("[data-test=nav-hand-tools]");
        this.categoriesPowerTools = page.locator("[data-test=nav-power-tools]");
        this.categoriesOther = page.locator("[data-test=nav-other]");
        this.categoriesSpecialTools = page.locator("[data-test=nav-special-tools]");
        this.categoriesRentals = page.locator("[data-test=nav-rentals]");
        this.contactButton = page.locator("[data-test=nav-contact]");
        this.signInButton = page.locator("[data-test=nav-sign-in]");
        this.languageFilter = page.locator("[data-test=language-select]");
        this.languageDe = page.locator("[data-test=lang-de]");
        this.languageEn = page.locator("[data-test=lang-en]");
        this.languageEs = page.locator("[data-test=lang-es]");
        this.languageFr = page.locator("[data-test=lang-fr]");
        this.languageNl = page.locator("[data-test=lang-nl]");
        this.languageTr = page.locator("[data-test=lang-tr]");
        this.header = page.locator("app-header");
        this.footer = page.locator("[app-footer]");
        this.footerText = page.getByText(/This is a DEMO application/);
        this.footerGitHubLink = page.getByText("GitHub repo");
        this.footerPrivacyPolicyLink = page.getByText("Privacy Policy");
        this.footerBarnImagesLink = page.getByText("Barn Images");
        this.footerUnsplashLink = page.getByText("Unsplash");
    }

    async open() {
        await this.page.goto(this.url);
    }
}
