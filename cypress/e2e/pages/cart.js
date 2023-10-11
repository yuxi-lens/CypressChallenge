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

  verifyIndividualProductDetails(products) {
    products.forEach((product, index) => {
      this.verifyProductPriceByIndex(product.productPrice, index);
      this.verifyProductNameByIndex(product.productName, index);
      this.verifyProductDescriptionByIndex(product.productDescription, index);
    });
  }
}

export default CartPage;
