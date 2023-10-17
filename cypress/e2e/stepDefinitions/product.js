import { When } from "@badeball/cypress-cucumber-preprocessor";
import ProductPage from "../pages/product";
import LandingPage from "../pages/landing";

const productPage = new ProductPage();
const landingPage = new LandingPage();

When("the user add the product to the cart from the detail view", () => {
  landingPage.openProductView();
  productPage.clickAddToCartButton();

  let productDetails = {};

  productPage.captureProductName().then((productName) => {
    productDetails.productName = productName;

    productPage.captureProductDescription().then((productDescription) => {
      productDetails.productDescription = productDescription;

      productPage.captureProductPrice().then((productPrice) => {
        productDetails.productPrice = productPrice;
        cy.wrap([productDetails]).as("selectedProducts");
      });
    });
  });

  landingPage.clickCartButton();
});

When("the user add multiple products from detailed view", () => {
  productPage
    .addMultipleProductsToCartFromDetails()
    .then((selectedProducts) => {
      cy.wrap(selectedProducts).as("selectedProducts");
    });
});
