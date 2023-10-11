import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LandingPage from "../pages/landing";

const landingPage = new LandingPage();

When("the user sort products by {string}", (order) => {
  landingPage.sortProductsBy(order);
});

When("the user adds a product to the cart", () => {
  landingPage.addProductToCart().then((productDetails) => {
    cy.wrap(productDetails.productPrice).as("selectedProductPrice");
    cy.wrap(productDetails.productName).as("selectedProductName");
    cy.wrap(productDetails.productDescription).as("selectedProductDescription");
  });

  landingPage.clickCartButton();
});

Then("the user should be logged in successfully", () => {
  landingPage.verifyProductsTitle("Products");
  landingPage.verifyShoppingCartIsVisible();
});

Then("the products should be sorted by {string}", (order) => {
  landingPage.verifyProductsSorted(order);
});
