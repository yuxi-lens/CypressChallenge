import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LandingPage from "../pages/landing";

const landingPage = new LandingPage();

When("the user sort products by {string}", (order) => {
  landingPage.sortProductsBy(order);
});

When("the user add a product to the cart", () => {
  landingPage.addProductToCart().then((productDetailsList) => {
    const productsArray = Array.isArray(productDetailsList)
      ? productDetailsList
      : [productDetailsList];
    cy.wrap(productsArray).as("selectedProducts");
  });

  landingPage.clickCartButton();
});

When("the user add some products to the cart", () => {
  landingPage.addMultipleProductsToCart().then((products) => {
    cy.wrap(products).as("selectedProducts");
    landingPage.clickCartButton();
  });
});

When("the user open a product detailed view", () => {
  landingPage.openProductView();
});

Then("the user should be logged in successfully", () => {
  landingPage.verifyProductsTitle("Products");
  landingPage.verifyShoppingCartIsVisible();
});

Then("the products should be sorted by {string}", (order) => {
  landingPage.verifyProductsSorted(order);
});
