class ProductPage {
  locators = {
    addToCartButton: ".inventory_details_desc_container button",
    priceLabel: "div.inventory_details_price",
    descriptionText: "div.inventory_details_desc",
    productNameText: "div.inventory_details_name",
  };

  clickAddToCartButton() {
    cy.get(this.locators.addToCartButton).click();
  }

  captureProductName() {
    return cy.get(this.locators.productNameText).invoke("text");
  }

  captureProductDescription() {
    return cy.get(this.locators.descriptionText).invoke("text");
  }

  captureProductPrice() {
    return cy.get(this.locators.priceLabel).invoke("text");
  }
}

export default ProductPage;
