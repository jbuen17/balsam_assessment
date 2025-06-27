import { expect, type Locator, type Page } from '@playwright/test';

export class ShoppingCartPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly totalAmount: Locator;    

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator(`//h2[text()='Your Shopping Cart']`)              
        this.totalAmount = page.locator(`//span/strong[text()='Total']/parent::span/following-sibling::span//span`)        
    }

    async verifyShoppingCartPage(){
        await this.pageTitle.waitFor({state: "visible"})        
        await expect(this.pageTitle).toBeVisible()
    }

    async getProductPriceFromShoppingCart(productID: any){
        return await this.page.locator("//a[contains(@href, '" + productID + "')]/ancestor::div[@class='d-flex flex-wrap position-relative']//div[contains(@class, 'cartProductDetailItem_total')]/span/span").textContent()
    }

    async getProductCount(productID: any){
        return await this.page.locator("//a[contains(@href, '" + productID + "')]/ancestor::div[@class='d-flex flex-wrap position-relative']//input[@aria-live='polite']").last().getAttribute("value")
    }

    async removeItemFromCart(productID: any){
        await this.page.locator("//a[contains(@href, '" + productID + "')]/ancestor::div[@class='d-flex flex-wrap position-relative']//button[contains(@class, 'cartProductDetailItem_delete-btn')]").click()
        
        await this.page.locator("//a[contains(@href, '" + productID + "')]//span").waitFor({state: "visible"})
        if (await this.page.locator("//a[contains(@href, '" + productID + "')]//span").isVisible()) {
            console.log("Product removed successfully!")
        } else {
            console.log("Product was NOT removed successfully!")
        }

        expect (this.page.locator("//a[contains(@href, '" + productID + "')]//span")).toBeVisible()
    }

}