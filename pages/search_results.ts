import { expect, type Locator, type Page } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;
    readonly searchSuggestionsLabel: Locator;
    readonly searchResultThumbImage: Locator;
    readonly searchResultThumbLabel: Locator;
    readonly searchResultThumbPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchSuggestionsLabel = page.locator(`//div[text()='Search Suggestions']`)
        this.searchResultThumbImage = page.locator(`//div[@data-testid='products-search-results']//img/parent::a`)
        this.searchResultThumbLabel = page.locator(`//div[@data-testid='products-search-results']/div//img/parent::a/parent::div/following-sibling::div/a`)
        this.searchResultThumbPrice = page.locator(`//div[@data-testid='products-search-results']/div//img/parent::a/parent::div/following-sibling::div/div//a`)
    }

    async verifySearchPage(){        
        await expect(this.searchSuggestionsLabel).toBeVisible()        
    }    

    async selectSearchResultByIndex(resultNumber: number){
        const productID = this.getProductIDFromThumbNail(resultNumber)
        await this.searchResultThumbImage.nth(resultNumber).click()
        return productID
    }

    async getProductIDFromThumbNail(resultNumber: number){
        let productID = ""
        const productLink = await this.searchResultThumbLabel.nth(resultNumber).getAttribute("href")
        if (productLink != null){
            productID = productLink.substring(productLink.indexOf("=") + 1, productLink.length)
        }
        return productID
    }

    async getPriceFromThumbNail(resultNumber: number){
        await this.searchResultThumbPrice.nth(resultNumber).waitFor({state: "visible"})
        return await this.searchResultThumbPrice.nth(resultNumber).textContent()
    }

}