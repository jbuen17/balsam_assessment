import { expect } from '@playwright/test';


export class Assertions {
    async validatePriceDisplayed(priceFromThumbNail: any, priceFromProductPage: any, priceFromShoppingCart: any){
        if (priceFromThumbNail == priceFromProductPage && priceFromProductPage == priceFromShoppingCart && priceFromThumbNail == priceFromShoppingCart){
            console.log("Price from search result: " + priceFromThumbNail + "\n" +
                        "Price from product page: " + priceFromProductPage + "\n" + 
                        "Price from shopping cart: " + priceFromProductPage + "\n" +  
                        "All prices are the same!")
        } else {
            console.log("Price from search result: " + priceFromThumbNail + "\n" +
                        "Price from product page: " + priceFromProductPage + "\n" + 
                        "Price from shopping cart: " + priceFromProductPage + "\n" +  
                        "Prices are NOT the same!")
        }
        expect(priceFromThumbNail == priceFromProductPage && priceFromProductPage == priceFromShoppingCart && priceFromThumbNail == priceFromShoppingCart, "Prices are NOT the same!").toBe(true)
    }

    async validateProductCount(expectedProductCount: any, actualProductCount: any){
        if (expectedProductCount == actualProductCount){
            console.log("Expected product count: " + expectedProductCount + "\n" +
                        "Actual product count: " + actualProductCount + "\n" + 
                        "Product counts are the same!")
        } else {
            console.log("Expected product count: " + expectedProductCount + "\n" +
                        "Actual product count: " + actualProductCount + "\n" + 
                        "Product counts are NOT the same!")
        }
        expect(expectedProductCount == actualProductCount, "Product counts are NOT the same!").toBe(true)
    }
}