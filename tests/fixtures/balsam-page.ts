import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/home';
import { SearchResultsPage } from '../../pages/search_results';
import { ProductPage } from '../../pages/product_page';
import { ShoppingCartPage } from '../../pages/shopping_cart_page';
import { Assertions } from '../../common/validate';

type BalsamFixtures = {
  homePage: HomePage;
  searchPage: SearchResultsPage
  productPage: ProductPage
  shoppingCartPage: ShoppingCartPage
  assertions: Assertions
};

export const test = base.extend<BalsamFixtures>({
  
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  
  searchPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },

  assertions: async ({}, use) => {
    await use(new Assertions());
  },

});

export { expect } from '@playwright/test';