import { When } from "@badeball/cypress-cucumber-preprocessor";
import ProductPage from "../pages/product";
import LandingPage from "../pages/landing";

const productPage = new ProductPage();
const landingPage = new LandingPage();

When("the user add the product to the cart", () => {
  productPage.clickAddToCartButton();
  productPage.captureProductName().then((productName) => {
    cy.wrap(productName).as("selectedProductName");
  });

  productPage.captureProductDescription().then((productDescription) => {
    cy.wrap(productDescription).as("selectedProductDescription");
  });

  productPage.captureProductPrice().then((productPrice) => {
    cy.wrap(productPrice).as("selectedProductPrice");
  });
  landingPage.clickCartButton();
});
