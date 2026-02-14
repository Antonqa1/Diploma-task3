import {expect} from '@playwright/test';
import {test} from '../custom-fixtures/custom-fixtures';
import { SortOptions } from '../Pages/home.page';

test.describe('Home page tests', () => {

    test('The user can search for a product', async ({homePage}) => {
        await homePage.open();
        await homePage.searchField.fill("Pliers");
        await homePage.searchBtn.click();
        await expect(homePage.cardProductName.first()).toContainText("Pliers");
    });

    test.only('The user can filter products by price range', async ({ homePage }) => {
        await homePage.open();
        await homePage.setPriceRange(100, 160);
        await expect(async () => {
            const priceValue = await homePage.productPrice.first().innerText();
            const price = priceValue.replace("$", "");
            expect(Number(price)).toBeGreaterThanOrEqual(100);
            expect(Number(price)).toBeLessThanOrEqual(160);
        }).toPass();
    });

    test('The user can reset the search results', async ({ homePage }) => {
        await homePage.open();
        await homePage.searchField.fill("Pliers");
        await homePage.searchBtn.click();
        await homePage.searchResetBtn.click();
        await expect(homePage.searchField).toHaveValue("");
    });

    test('The user can sort products by price: low to high', async ({ homePage }) => {
        await homePage.open();
        await homePage.sortProductsBy(SortOptions.PriceAsc);
        const firstPriceValue = await homePage.productPrice.nth(1).innerText();
        const secondPriceValue = await homePage.productPrice.nth(2).innerText();
        const firstPrice = firstPriceValue.replace("$","");
        const secondPrice = secondPriceValue.replace("$","");
        expect(Number(firstPrice)).toBeLessThanOrEqual(Number(secondPrice));
    });

    test('The number of pages should change after filtering by category', async ({ homePage }) => {
        await homePage.open();
        await homePage.paginationItem.first().waitFor();
        const pagesBefore = await homePage.paginationItem.count();
        await homePage.selectCategory('Hand Tools');
        await expect(async () => {
            const pagesAfter = await homePage.paginationItem.count();
            expect(pagesAfter).toBeLessThan(pagesBefore);
        }).toPass();
    });

    test('The number of pages should change after filtering by brand', async ({ homePage }) => {
        await homePage.open();
        await homePage.paginationItem.first().waitFor();
        const pagesBefore = await homePage.paginationItem.count();
        await homePage.selectBrand('ForgeFlex Tools');
        await expect(async () => {
            const pagesAfter = await homePage.paginationItem.count();
            expect(pagesAfter).toBeLessThan(pagesBefore);
        }).toPass();
    });

    test('The number of pages should change after filtering by sustainability', async ({ homePage }) => {
        await homePage.open();
        await homePage.paginationItem.first().waitFor();
        const pagesBefore = await homePage.paginationItem.count();
        await homePage.selectSustainability('Show only eco-friendly products');
        await expect(async () => {
            const pagesAfter = await homePage.paginationItem.count();
            expect(pagesAfter).toBeLessThan(pagesBefore);
        }).toPass();
    });

    test('The user can navigate to the next page using Next button', async ({ homePage }) => {
        await homePage.open();
        await expect(homePage.paginationItem.nth(1)).toHaveClass(/active/);
        await homePage.paginationNextBtn.click();
        await expect(homePage.paginationItem.nth(2)).toHaveClass(/active/);
    });

    test('The user can navigate to the previous page using Previous button', async ({ homePage }) => {
        await homePage.open();
        await homePage.paginationNextBtn.click();
        await homePage.paginationPreviousBtn.click();
        await expect(homePage.paginationItem.nth(1)).toHaveClass(/active/);
    });

    test('Should display "There are no products found." message for non-existent search', async ({ homePage }) => {
        await homePage.open();
        await homePage.searchField.fill("123");
        await homePage.searchBtn.click();
        await expect(homePage.page.getByText('There are no products found.')).toBeVisible();
    });
});
