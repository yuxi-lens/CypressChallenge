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

When("the user confirms the checkout information", () => {
  cy.get("@selectedProductPrice").then((productPrice) => {
    cy.get("@selectedProductName").then((productName) => {
      cy.get("@selectedProductDescription").then((productDescription) => {
        checkoutPage.verifyProductDetails(
          productPrice,
          productName,
          productDescription,
          productPrice
        );
      });
    });
  });
  checkoutPage.verifyProductTotal();
  checkoutPage.clickFinishButton();
});

Then("confirmation order message will be displayed", () => {
  checkoutPage.verifySuccessfulOrderHeader();
  checkoutPage.verifySuccessfulOrderMessage();
});
