import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../Pages/login.page';
import { HomePage } from '../Pages/home.page';
import { RegisterPage } from '../Pages/register.page';

type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    registerPage: RegisterPage;
};

export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
    registerPage: async ({page}, use) => {
        await use(new RegisterPage(page));
    },
});
