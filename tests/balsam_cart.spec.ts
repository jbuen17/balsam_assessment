import { test, expect } from './fixtures/balsam-page';


test.describe('Balsam Cart', () => {        

    test.beforeEach(async ({homePage}) => {      
      await homePage.openHomePage(process.env.BASE_URL)      
    });

    
    test('Search product - select third result - add to cart - view cart', async ({ homePage, searchPage, productPage, shoppingCartPage, assertions}) => {
      await homePage.searchProduct('Christmas Tree')
      await searchPage.verifySearchPage()
      const priceFromThumbNail = await searchPage.getPriceFromThumbNail(2)
      const productID = await searchPage.selectSearchResultByIndex(2)
      await productPage.verifyProductPage(productID)
      const priceFromProductPage = await productPage.getProductPriceFromProductPage()
      await productPage.customizeTreeProduct(process.env.HEIGHT, process.env.SHAPE, process.env.LIGHTS, process.env.SETUP )
      await productPage.addProductToCart()
      await productPage.viewCart()
      await shoppingCartPage.verifyShoppingCartPage()
      const priceFromShoppingCart = await shoppingCartPage.getProductPriceFromShoppingCart(productID)
      const productCountFromShoppingCart = await shoppingCartPage.getProductCount(productID)
      await assertions.validatePriceDisplayed(priceFromThumbNail, priceFromProductPage, priceFromShoppingCart)
      await assertions.validateProductCount("1", productCountFromShoppingCart)
      await shoppingCartPage.removeItemFromCart(productID)      
    });

    
    test.afterEach(async ({homePage}) => {      
      await homePage.closePage()   
    });

});