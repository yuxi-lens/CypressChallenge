import { When } from "@badeball/cypress-cucumber-preprocessor";
import CartPage from "../pages/cart";

const cartPage = new CartPage();

When("the user verify the product is in the cart", () => {
  cy.get("@selectedProductPrice").then((productPrice) => {
    cy.get("@selectedProductName").then((productName) => {
      cy.get("@selectedProductDescription").then((productDescription) => {
        cartPage.verifyProductDetails(
          productPrice,
          productName,
          productDescription
        );
      });
    });
  });
});

When("the user navigates to the checkout page", () => {
  cartPage.clickCheckoutButton();
});
