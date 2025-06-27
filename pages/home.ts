import { expect, type Locator, type Page } from '@playwright/test';
import { buffer } from 'stream/consumers';

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

    async openHomePage(url){
        await this.page.goto(url);
        await this.page.reload({waitUntil: "load"})
        await this.page.waitForLoadState("load")
        await expect(this.pageLogo).toBeVisible()
    }    

    async closePage(){
        await this.page.close()
        if (this.page.isClosed()){
            console.log("Browser page is closed!")
        } else {
            console.log("Browser page is not closed!")
        }
        expect (this.page.isClosed(), "Browser page is not closed!")
    }

    async searchProduct(product: string) {
        await this.searchBar.waitFor({state: 'visible'})
        await this.searchBar.pressSequentially(product)    
    }
}