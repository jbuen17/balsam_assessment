import { expect } from '@playwright/test';


export class Assertions {
    /*
    Author: Joey Buenaventura
    Method: validatePriceDisplayed
    Description: To validate the displayed prices accross the pages
    Parameters: priceFromThumbNail - This is a string parameter which holds the product price from teh search result page
                priceFromProductPage - This is a string paramerter which holds the product price from the actual product page
                priceFromShoppingCart - This is a string paramerter which holds the product price from the shopping cart page
    */
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

    /*
    Author: Joey Buenaventura
    Method: validateProductCount
    Description: To validate the product count added in the cart
    Parameters: expectedProductCount - This is a string parameter which holds the expected product count
                actualProductCount - This is a string parameter which holds the actual product count recorded from the cart page
    */
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