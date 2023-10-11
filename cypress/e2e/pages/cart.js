class CartPage {
  locators = {
    productName: "div.inventory_item_name",
    productDescription: "div.inventory_item_desc",
    productPrice: "div.inventory_item_price",
    checkoutButton: "#checkout",
  };

  clickCheckoutButton() {
    cy.get(this.locators.checkoutButton).click();
  }

  verifyProductPrice(expectedPrice) {
    cy.get(this.locators.productPrice).should("have.text", expectedPrice);
  }

  verifyProductName(expectedName) {
    cy.get(this.locators.productName).should("have.text", expectedName);
  }

  verifyProductDescription(expectedDescription) {
    cy.get(this.locators.productDescription).should(
      "have.text",
      expectedDescription
    );
  }
  verifyProductDetails(expectedPrice, expectedName, expectedDescription) {
    this.verifyProductPrice(expectedPrice);
    this.verifyProductName(expectedName);
    this.verifyProductDescription(expectedDescription);
  }
}

export default CartPage;
