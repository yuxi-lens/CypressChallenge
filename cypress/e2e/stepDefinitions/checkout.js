import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CheckoutPage from "../pages/checkout";
import { faker } from "@faker-js/faker";

const checkoutPage = new CheckoutPage();

When("the user fills the checkout information", () => {
  checkoutPage.fillCheckoutForm(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.location.zipCode()
  );
  checkoutPage.clickContinueButton();
});

When("the user confirms the product checkout information", () => {
  cy.get("@selectedProductPrice").then((productPrice) => {
    cy.get("@selectedProductName").then((productName) => {
      cy.get("@selectedProductDescription").then((productDescription) => {
        checkoutPage.verifyProductDetailsByIndex(
          productPrice,
          productName,
          productDescription
        );
      });
    });
  });
  checkoutPage.verifyProductTotal();
  checkoutPage.clickFinishButton();
});

When("the user confirms the products checkout information", () => {
  cy.get("@selectedProducts").then((products) => {
    let subtotal = 0;

    products.forEach((product, index) => {
      subtotal += parseFloat(product.productPrice.replace(/[^0-9.]/g, ""));

      checkoutPage.verifyProductDetailsByIndex(
        product.productPrice,
        product.productName,
        product.productDescription,
        index
      );
    });

    checkoutPage.verifyProductSubtotal(subtotal);
  });

  checkoutPage.verifyProductTotal();
  checkoutPage.clickFinishButton();
});

Then("confirmation order message will be displayed", () => {
  checkoutPage.verifySuccessfulOrderHeader();
  checkoutPage.verifySuccessfulOrderMessage();
});
