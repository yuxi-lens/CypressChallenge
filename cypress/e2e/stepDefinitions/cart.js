import { When } from "@badeball/cypress-cucumber-preprocessor";
import CartPage from "../pages/cart";

const cartPage = new CartPage();

When("the user verify the product is in the cart", () => {
  cy.get("@selectedProductPrice").then((productPrice) => {
    cy.get("@selectedProductName").then((productName) => {
      cy.get("@selectedProductDescription").then((productDescription) => {
        cartPage.verifyProductPriceByIndex(productPrice);
        cartPage.verifyProductNameByIndex(productName);
        cartPage.verifyProductDescriptionByIndex(productDescription);
      });
    });
  });
});

When("the user verify the products are in the cart", () => {
  cy.get("@selectedProducts").then((selectedProducts) => {
    cartPage.verifyIndividualProductDetails(selectedProducts);
  });
});

When("the user navigates to the checkout page", () => {
  cartPage.clickCheckoutButton();
});
