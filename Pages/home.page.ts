import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";

export enum SortOptions {
    NameAsc = 'name,asc',
    NameDesc = 'name,desc',
    PriceDesc = 'price,desc',
    PriceAsc = 'price,asc',
    CoAsc = 'co2_rating,asc',
    CoDesc = 'co2_rating,desc',
}

export class HomePage extends BasePage {
    readonly banner: Locator;
    readonly sortLabel: Locator;
    readonly sortDropdown: Locator;
    readonly priceRangeLabel: Locator;
    readonly priceRangeMin: Locator;
    readonly priceRangeMax: Locator;
    readonly searchLabel: Locator;
    readonly searchField: Locator;
    readonly searchResetBtn: Locator;
    readonly searchBtn: Locator;
    readonly filtersLabel: Locator;
    readonly categoryLabel: Locator
    readonly brandLabel: Locator
    readonly sustainabilityLabel: Locator
    readonly selectCard: Locator;
    readonly cardImg: Locator;
    readonly cardProductName: Locator;
    readonly co2RatingBadge: Locator;
    readonly co2RatingTitle: Locator;
    readonly productPrice: Locator;
    readonly outOfStockBadge: Locator;
    readonly paginationItem: Locator;
    readonly paginationPreviousBtn: Locator;
    readonly paginationNextBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.banner = page.getByAltText("Banner");
        this.sortLabel = page.getByText("Sort");
        this.sortDropdown = page.locator("[data-test=sort]");
        this.priceRangeLabel = page.getByText("Price Range");
        this.priceRangeMin = page.locator(".ngx-slider-pointer-min");
        this.priceRangeMax = page.locator(".ngx-slider-pointer-max");
        this.searchLabel = page.getByText("Search");
        this.searchField = page.locator("[data-test=search-query]");
        this.searchResetBtn = page.locator("[data-test=search-reset]");
        this.searchBtn = page.locator("[data-test=search-submit]");
        this.filtersLabel = page.getByText("Filters");
        this.categoryLabel = page.getByText("By category:");
        this.brandLabel = page.getByText("By brand:");
        this.sustainabilityLabel = page.getByText("Sustainability:");
        this.selectCard = page.locator(".card");
        this.cardImg = page.locator(".card-img-top");
        this.cardProductName = page.locator("[data-test=product-name]");
        this.co2RatingBadge = page.locator("[data-test=co2-rating-badge]");
        this.co2RatingTitle = page.getByText("A = most environmentally friendly, E = higher environmental impact");
        this.productPrice = page.locator("[data-test=product-price]");
        this.outOfStockBadge = page.locator("[data-test=out-of-stock]");
        this.paginationItem = page.locator(".page-item");
        this.paginationPreviousBtn = page.locator("[aria-label=Previous]");
        this.paginationNextBtn = page.locator("[aria-label=Next]");
    }

    async sortProductsBy(option: SortOptions) {
        await this.sortDropdown.selectOption(option);
    }

    async selectCategory(name: string) {
        await this.page.getByLabel(name).click();
    }

    async selectBrand(name: string) {
        await this.page.getByLabel(name).click();
    }

    async selectSustainability(name: string) {
        await this.page.getByLabel(name).click();
    }

    async setPriceRange(min: number, max: number) {
        const minClicks = Math.floor(min / 20);
        const maxClicks = Math.floor(max / 20);
        await this.priceRangeMin.focus();
        await this.page.keyboard.press('Home');
        for (let i = 0; i < minClicks; i++) {
            await this.page.keyboard.press('PageUp');
        }
        await this.priceRangeMin.click();
        await this.priceRangeMax.focus();
        await this.page.keyboard.press('Home');
        for (let i = 0; i < maxClicks; i++) {
            await this.page.keyboard.press('PageUp');
        }
        await this.priceRangeMax.click();
        await this.page.mouse.click(0, 0);
    }
}
