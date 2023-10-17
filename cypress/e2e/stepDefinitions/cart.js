import { When } from "@badeball/cypress-cucumber-preprocessor";
import CartPage from "../pages/cart";
import CheckoutPage from "../pages/checkout";
import { faker } from "@faker-js/faker";

const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

When("the user verify the product is in the cart", () => {
  cy.get("@selectedProductName").then((productName) => {
    cartPage.verifyProductNameByIndex(productName);
  });

  cy.get("@selectedProductDescription").then((productDescription) => {
    cartPage.verifyProductDescriptionByIndex(productDescription);
  });

  cy.get("@selectedProductPrice").then((productPrice) => {
    cartPage.verifyProductPriceByIndex(productPrice);
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

When("the user completes the purchase process", () => {
  cy.get("@selectedProducts").then((selectedProducts) => {
    cartPage.verifyIndividualProductDetails(selectedProducts);
  });
  cartPage.clickCheckoutButton();
  checkoutPage.fillCheckoutForm(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.location.zipCode()
  );
  checkoutPage.clickContinueButton();
  cy.get("@selectedProducts").then((selectedProducts) => {
    cartPage.verifyIndividualProductDetails(selectedProducts);
  });
  checkoutPage.verifyProductTotal();
  checkoutPage.clickFinishButton();
});
