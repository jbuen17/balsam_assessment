import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly pageLogo: Locator;
    readonly searchBar: Locator;
    readonly searchButton: Locator;    

    constructor(page: Page) {
        this.page = page;
        this.pageLogo = page.locator(`//img[@alt='logo']`)
        this.searchBar = page.getByTestId('constructor-search-input')        
    }

    /*
    Author: Joey Buenaventura
    Method: openHomePage
    Description: To invoke the browser and access the homepage specified on the .env file
    Parameters: none
    */
    async openHomePage(url){
        await this.page.goto(url,{timeout: 320000});
        await this.page.waitForLoadState("load")
        await expect(this.pageLogo).toBeVisible()
    }    

    /*
    Author: Joey Buenaventura
    Method: closePage
    Description: To close the browser session and validate if the browser is indeed closed.
    Parameters: none
    */
    async closePage(){
        await this.page.close()
        if (this.page.isClosed()){
            console.log("Browser page is closed!")
        } else {
            console.log("Browser page is not closed!")
        }
        expect (this.page.isClosed(), "Browser page is not closed!")
    }

    /*
    Author: Joey Buenaventura
    Method: searchProduct
    Description: To search for a product from the homepage using sequential key strokes
    Parameters: product - This is a string parameter which holds the product to be searched
    */
    async searchProduct(product: string) {
        await this.searchBar.waitFor({state: 'visible'})
        await this.searchBar.pressSequentially(product)    
    }
}