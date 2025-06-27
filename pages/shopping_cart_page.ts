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

    /*
    Author: Joey Buenaventura
    Method: verifyShoppingCartPage
    Description: To validate that the shopping cart page is displayed
    Parameters: none
    */
    async verifyShoppingCartPage(){
        await this.pageTitle.waitFor({state: "visible"})
        await expect(this.pageTitle).toBeVisible()
    }

    /*
    Author: Joey Buenaventura
    Method: getProductPriceFromShoppingCart
    Description: To retrieve the product price listed for the selected product using it's product ID
    Parameters: productID - A string parameter which holds the product ID recorded from the search results page
    */    
    async getProductPriceFromShoppingCart(productID: any){
        return await this.page.locator("//a[contains(@href, '" + productID + "')]/ancestor::div[@class='d-flex flex-wrap position-relative']//div[contains(@class, 'cartProductDetailItem_total')]/span/span").textContent()
    }

    /*
    Author: Joey Buenaventura
    Method: getProductCount
    Description: To retrieve the product quantity added to the cart
    Parameters: productID - A string parameter which holds the product ID recorded from the search results page
    */    
    async getProductCount(productID: any){
        return await this.page.locator("//a[contains(@href, '" + productID + "')]/ancestor::div[@class='d-flex flex-wrap position-relative']//input[@aria-live='polite']").last().getAttribute("value")
    }

    /*
    Author: Joey Buenaventura
    Method: removeItemFromCart
    Description: To remove the product from the cart using the product ID
    Parameters: productID - A string parameter which holds the product ID recorded from the search results page
    */        
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