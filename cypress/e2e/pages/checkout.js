import { extractNumericValue } from "../../support/utils/extractNumericValue";

const SUCCESSFUL_ORDER_HEADER = "Thank you for your order!";
const SUCCESSFUL_ORDER_MESSAGE =
  "Your order has been dispatched, and will arrive just as fast as the pony can get there!";

class CheckoutPage {
  locators = {
    firstNameInput: "#first-name",
    lastNameInput: "#last-name",
    zipCodeInput: "#postal-code",
    continueButton: "#continue",
    productName: "div.inventory_item_name",
    productDescription: "div.inventory_item_desc",
    productPrice: "div.inventory_item_price",
    finishButton: "#finish",
    productSubtotalLabel: "div.summary_subtotal_label",
    taxLabel: "div.summary_tax_label",
    summaryTotalLabel: "div.summary_total_label",
    completedOrderHeader: "h2.complete-header",
    completedOrderMessage: "div.complete-text",
  };

  fillFirstName(firstName) {
    cy.get(this.locators.firstNameInput).type(firstName);
  }

  fillLastName(lastName) {
    cy.get(this.locators.lastNameInput).type(lastName);
  }

  fillZipCode(zipCode) {
    cy.get(this.locators.zipCodeInput).type(zipCode);
  }

  fillCheckoutForm(firstName, lastName, zipCode) {
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillZipCode(zipCode);
  }

  clickContinueButton() {
    cy.get(this.locators.continueButton).click();
  }

  clickFinishButton() {
    cy.get(this.locators.finishButton).click();
  }

  verifyProductPriceByIndex(expectedPrice, index = 0) {
    cy.get(this.locators.productPrice)
      .eq(index)
      .should("have.text", expectedPrice);
  }

  verifyProductNameByIndex(expectedName, index = 0) {
    cy.get(this.locators.productName)
      .eq(index)
      .should("have.text", expectedName);
  }

  verifyProductDescriptionByIndex(expectedDescription, index = 0) {
    cy.get(this.locators.productDescription)
      .eq(index)
      .should("have.text", expectedDescription);
  }

  verifyProductSubtotal(expectedSubtotal) {
    cy.get(this.locators.productSubtotalLabel).should(
      "contain.text",
      expectedSubtotal
    );
  }

  verifyProductDetailsByIndex(
    expectedPrice,
    expectedName,
    expectedDescription,
    index = 0
  ) {
    this.verifyProductPriceByIndex(expectedPrice, index);
    this.verifyProductNameByIndex(expectedName, index);
    this.verifyProductDescriptionByIndex(expectedDescription, index);
  }

  verifyProductTotal() {
    this.getProductSubtotal().then((subtotal) => {
      this.getTax().then((tax) => {
        this.getTotal().then((total) => {
          expect(Number((subtotal + tax).toFixed(2))).to.eq(total);
        });
      });
    });
  }

  getProductSubtotal() {
    return cy
      .get(this.locators.productSubtotalLabel)
      .invoke("text")
      .then(extractNumericValue);
  }

  getTax() {
    return cy
      .get(this.locators.taxLabel)
      .invoke("text")
      .then(extractNumericValue);
  }

  getTotal() {
    return cy
      .get(this.locators.summaryTotalLabel)
      .invoke("text")
      .then(extractNumericValue);
  }

  verifySuccessfulOrderHeader() {
    cy.get(this.locators.completedOrderHeader).should(
      "have.text",
      SUCCESSFUL_ORDER_HEADER
    );
  }

  verifySuccessfulOrderMessage() {
    cy.get(this.locators.completedOrderMessage).should(
      "have.text",
      SUCCESSFUL_ORDER_MESSAGE
    );
  }
}

export default CheckoutPage;
