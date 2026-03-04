import { expect } from '@playwright/test';
import { test } from '../custom-fixtures/custom-fixtures';

test.describe('Login Tests', () => {

    test('The user can log in successfully', async ({ page, loginPage }) => {
        await loginPage.open();
        await loginPage.login('ant@gmail.com', 'As251831@');
        await expect(page).toHaveURL("https://practicesoftwaretesting.com/account");
    });

    test('Should show error messages if the user clicks log in button without submitting username and password empty fields', async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.loginButton.click();
        await expect(loginPage.emailErrorMsg).toHaveText('Email is required');
        await expect(loginPage.passwordErrorMsg).toHaveText('Password is required');
    });

    test('Should show error for invalid credentials', async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.login('ant@gmail.com', 'WrongPassword');
        await expect(loginPage.loginErrorMsg).toBeVisible();
        await expect(loginPage.loginErrorMsg).toHaveText('Invalid email or password');
    });

    test('Should show error for invalid email format', async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.emailAddressField.fill('myemail');
        await loginPage.loginButton.click();
        await expect(loginPage.emailErrorMsg).toHaveText('Email format is invalid');
    });

    test('The user redirects to the Registration page if the user clicks Register your account link', async ({ loginPage, page }) => {
        await loginPage.open();
        await loginPage.registerYourAccountLink.click();
        await expect(page).toHaveURL("https://practicesoftwaretesting.com/auth/register");
    });

    test('The user redirects to the Forgot Password page if the user clicks Forgot your Password? link', async ({ loginPage, page }) => {
        await loginPage.open();
        await loginPage.forgotYourPasswordLink.click();
        await expect(page).toHaveURL("https://practicesoftwaretesting.com/auth/forgot-password");
    });

    test('Users can see their passwords', async ({ loginPage }) => {
        await loginPage.open();
        await expect(loginPage.passwordField).toHaveAttribute('type', 'password');
        await loginPage.eyeBtn.click();
        await expect(loginPage.passwordField).toHaveAttribute('type', 'text');
    });

    test('Google Sign-In button is displayed for the user', async ({ loginPage }) => {
        await loginPage.open();
        await expect(loginPage.googleSignInBtn).toBeVisible();
    });

    test('All fields on Login page should have correct labels', async ({ loginPage }) => {
        await loginPage.open();
        await expect(loginPage.emailAddressLabel).toHaveText('Email address *');
        await expect(loginPage.passwordLabel).toHaveText('Password *');
    });

    test('The user can log in using Enter keyboard button', async ({ loginPage, page }) => {
        await loginPage.open();
        await loginPage.emailAddressField.fill('ant@gmail.com');
        await loginPage.passwordField.fill('As251831@');
        await page.keyboard.press('Enter');
        await expect(page).toHaveURL("https://practicesoftwaretesting.com/account");
    });
});
