import { expect } from '@playwright/test';
import { test } from '../custom-fixtures/custom-fixtures';

test.describe('Registration Tests', () => {

    test('Should show validation errors when submitting empty form', async ({ registerPage }) => {
        await registerPage.open();
        await registerPage.registerBtn.click();
        await expect(registerPage.firstNameErrorMsg).toBeVisible();
        await expect(registerPage.lastNameErrorMsg).toBeVisible();
        await expect(registerPage.dateOfBirthErrorMsg).toBeVisible();
        await expect(registerPage.streetErrorMsg).toBeVisible();
        await expect(registerPage.postalCodeErrorMsg).toBeVisible();
        await expect(registerPage.cityErrorMsg).toBeVisible();
        await expect(registerPage.stateErrorMsg).toBeVisible();
        await expect(registerPage.countryErrorMsg).toBeVisible();
        await expect(registerPage.phoneErrorMsg).toBeVisible();
        await expect(registerPage.emailErrorMsg).toBeVisible();
        await expect(registerPage.passwordErrorMsg).toBeVisible();
    });

    test('Check that the user can enter caraters in the Postal field', async ({ registerPage }) => {
        await registerPage.open();
        await registerPage.postalCodeField.fill("test postal code");
        await registerPage.registerBtn.click();
        await expect(registerPage.postalCodeErrorMsg).not.toBeVisible();
    });

    test('Check that the user cannot enter caraters in the Phone field', async ({ registerPage }) => {
        await registerPage.open();
        await registerPage.phoneField.fill("test postal code");
        await registerPage.registerBtn.click();
        await expect(registerPage.phoneErrorMsg).toBeVisible();
        await expect(registerPage.phoneErrorMsg).toHaveText("Only numbers are allowed.");
    });

    test('The "Weak" value is displayed if the user enters a simple password', async ({ registerPage }) => {
        await registerPage.open();
        await registerPage.passwordField.fill("123");
        await registerPage.registerBtn.click();
        await expect(registerPage.strengthBar).toHaveAttribute('style', 'width: 20%;')
    });

    test('The "Strong" value is displayed if the user enters a complex password', async ({ registerPage }) => {
        await registerPage.open();
        await registerPage.passwordField.fill("As6546468@$asda");
        await registerPage.registerBtn.click();
        await expect(registerPage.strengthBar).toHaveAttribute('style', 'width: 100%;')
    });

    test('The error is displayed if the user enters an invalid email', async ({ registerPage }) => {
        await registerPage.open();
        await registerPage.emailField.fill("invalid-email");
        await registerPage.registerBtn.click();
        await expect(registerPage.emailErrorMsg).toBeVisible();
        await expect(registerPage.emailErrorMsg).toHaveText("Email format is invalid");
    });

    test('The user can select a country from the dropdown', async ({ registerPage }) => {
        await registerPage.open();
        await registerPage.countryField.selectOption({ value: 'BY' });
        await expect(registerPage.countryField).toContainText('Belarus');
    });

    test('The user can return to Sign in page', async ({ page, registerPage }) => {
        await registerPage.open();
        await registerPage.signInButton.click();
        await expect(page).toHaveURL("https://practicesoftwaretesting.com/auth/login");
    });

    test('The user can use an invalid date for Date of Birth field', async ({ registerPage }) => {
        await registerPage.open();
        await registerPage.dateOfBirthField.fill("123");
        await registerPage.registerBtn.click();
        await expect(registerPage.dateOfBirthErrorMsg).toBeVisible();
    });

    test('The users can check their passwords', async ({ registerPage }) => {
        await registerPage.open();
        await registerPage.passwordField.fill("test");
        await registerPage.passwordEyeBtn.click();
        await expect(registerPage.passwordField).toHaveAttribute('type', 'text');
        await registerPage.passwordEyeBtn.click();
        await expect(registerPage.passwordField).toHaveAttribute('type', 'password');
    });
});