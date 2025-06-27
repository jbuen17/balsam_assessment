import { test } from './fixtures/balsam-page';
import { tree_config } from '../data/tree_configuration_data.json';


test.describe('Balsam Cart', () => {        

    test.beforeEach(async ({homePage}) => {      
      await homePage.openHomePage(process.env.BASE_URL)
    });
    
    test('Search product - Select third result - Add to cart - View cart - Remove from cart', async ({ homePage, searchPage, productPage, shoppingCartPage, assertions}) => {
      //Read the test data file
      
      await homePage.searchProduct('Christmas Tree')
      await searchPage.verifySearchPage()
      const priceFromThumbNail = await searchPage.getPriceFromThumbNail(2)
      const productID = await searchPage.selectSearchResultByIndex(2)
      await productPage.verifyProductPage(productID)
      const priceFromProductPage = await productPage.getProductPriceFromProductPage()      
      await productPage.customizeTreeProduct(tree_config.height, tree_config.shape, tree_config.lights, tree_config.setup )
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