import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productHeadingTitle: Locator;
    readonly addToCartButton: Locator;
    readonly viewCartButton: Locator;
    readonly productPriceFromProductPage: Locator;
    
    constructor(page: Page) {
        
        this.page = page;
        this.productHeadingTitle = page.locator(`//div[contains(@class, 'productDetailNameRating_product-title-rating-wrapper')]/h1`)     
        this.addToCartButton = page.locator(`//div[contains(@class, 'productDetailContainer_buybox-gold-box')]//button[text()='Add to Cart']`)
        this.viewCartButton = page.locator(`//button[text()='View Cart']`)
        this.productPriceFromProductPage = page.locator(`//span[contains(@class, 'productPrice_new-price')]/span`)

    }

    /*
    Author: Joey Buenaventura
    Method: verifyProductPage
    Description: To verify that the product page is opened by using the product id and compared the the actual page url
    Parameters: productID - A string value to be used to compare against the page url
    */  
    async verifyProductPage(productID: any){
        await this.page.waitForLoadState("load")
        await this.productHeadingTitle.waitFor({state: "visible"})
        let productIDPlaceholder = await this.page.evaluate(() => window.location.href)
        productIDPlaceholder = productIDPlaceholder.substring(productIDPlaceholder.indexOf("=") + 1, productIDPlaceholder.length)
        expect(productID == productIDPlaceholder, "Recorded Product ID: " + productID + " is not equal to opened URL with Product ID: " + productIDPlaceholder).toBe(true)
    }    

    /*
    Author: Joey Buenaventura
    Method: customizeTreeProduct
    Description: To set Tree Product customizations
    Parameters: height
                shape
                lights
                setup
    */  
    async customizeTreeProduct(height: any, shape: any, lights: any, setup: any){
        await this.page.waitForLoadState("load")
        await this.setHeightCategoryForTree(height)
        await this.setShapeForTree(shape)
        await this.setLightsForTree(lights)
        await this.setSetup(setup)        
    }

    async setHeightCategoryForTree(height: any){      
        await this.page.locator("//span[text()='" + height + "']/ancestor::div[@role='radio']").click()
    }

    async setShapeForTree(shape: any){
        await this.page.locator("//span[text()='" + shape + "']/ancestor::div[@role='radio']").click()
    }

    async setLightsForTree(lights: any){
        await this.page.locator("//span[text()='" + lights + "']/ancestor::div[@role='radio']").click()
    }

    async setSetup(setup: any){
        await this.page.locator("//span[text()='" + setup + "']/ancestor::div[@role='radio']").click()
    }

    /*
    Author: Joey Buenaventura
    Method: addProductToCart
    Description: To invoke the Add to Cart Button
    Parameters: none
    */  
    async addProductToCart(){
        await this.addToCartButton.click()
    }

    /*
    Author: Joey Buenaventura
    Method: viewCart
    Description: To invoke the View Cart Button
    Parameters: none
    */  
    async viewCart(){
        await this.viewCartButton.click()
    }

    /*
    Author: Joey Buenaventura
    Method: getProductPriceFromProductPage
    Description: To retrieve the price of the product selected
    Parameters: none
    */  
    async getProductPriceFromProductPage(){
        return await this.productPriceFromProductPage.textContent()
    }

}