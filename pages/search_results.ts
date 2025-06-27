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

    /*
    Author: Joey Buenaventura
    Method: verifySearchPage
    Description: To verify that the Search Page is displayed
    Parameters: none
    */     
    async verifySearchPage(){
        await this.page.waitForLoadState("load")
        await expect(this.searchSuggestionsLabel).toBeVisible()        
    }    

    /*
    Author: Joey Buenaventura
    Method: selectSearchResultByIndex
    Description: To select the product from the search results using a specific index number/identifier
    Parameters: resultNumber - A numeric value to determine the index of the product to be selected from the list
    */    
    async selectSearchResultByIndex(resultNumber: number){
        const productID = this.getProductIDFromThumbNail(resultNumber)
        await this.searchResultThumbImage.nth(resultNumber).click()
        return productID
    }

    /*
    Author: Joey Buenaventura
    Method: getProductIDFromThumbNail
    Description: To retrieve the product Id from the item link which will be used for other methods
    Parameters: resultNumber - A numeric value to determine the index of the product to be selected from the list
    */    
    async getProductIDFromThumbNail(resultNumber: number){
        let productID = ""
        const productLink = await this.searchResultThumbLabel.nth(resultNumber).getAttribute("href")
        if (productLink != null){
            productID = productLink.substring(productLink.indexOf("=") + 1, productLink.length)
        }
        return productID
    }

    /*
    Author: Joey Buenaventura
    Method: getPriceFromThumbNail
    Description: To retrieve the price of the item selected from the list
    Parameters: resultNumber - A numeric value to determine the index of the product to be selected from the list
    */        
    async getPriceFromThumbNail(resultNumber: number){
        await this.searchResultThumbPrice.nth(resultNumber).waitFor({state: "visible"})
        return await this.searchResultThumbPrice.nth(resultNumber).textContent()
    }

}