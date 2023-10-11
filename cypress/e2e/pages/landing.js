import { SORT_CONFIGS } from "../../support/utils/sortConfig";

class LandingPage {
  locators = {
    productsTitle: "span.title",
    shoppingCart: "a.shopping_cart_link",
    sortingSelect: "select.product_sort_container",
    priceLabels: "div.inventory_item_price",
    nameLabels: "div.inventory_item_name",
    priceBar: "div.pricebar",
    productContainer: "div.inventory_item_description",
    productName: "div.inventory_item_name",
    productDescription: "div.inventory_item_desc",
  };

  verifyProductsTitle(expected) {
    cy.get(this.locators.productsTitle).should("have.text", expected);
  }

  verifyShoppingCartIsVisible() {
    cy.get(this.locators.shoppingCart).should("be.visible");
  }

  sortProductsBy(order) {
    cy.get(this.locators.sortingSelect).select(order);
  }

  verifyProductsSorted(order) {
    const type = Object.keys(SORT_CONFIGS).find((keyType) =>
      order.includes(keyType)
    );
    const match = order.match(/\((.+)\)/);
    const direction = match[1];

    const config = SORT_CONFIGS[type];

    const items = [];
    cy.get(this.locators[config.locator])
      .each(($el) => {
        cy.wrap($el)
          .invoke("text")
          .then((text) => {
            items.push(config.parser(text));
          });
      })
      .then(() => {
        const isInOrder = items
          .slice(1)
          .every((item, index) => config.orders[direction](item, items[index]));
        expect(isInOrder).to.be.true;
      });
  }

  addProductToCart() {
    let randomIndex;
    let selectedProductName;
    let selectedProductDescription;
    let selectedProductPrice;

    return cy
      .get(this.locators.productContainer)
      .its("length")
      .then((len) => {
        randomIndex = Math.floor(Math.random() * len);

        cy.get(this.locators.productContainer)
          .find(this.locators.productName)
          .eq(randomIndex)
          .invoke("text")
          .then((name) => {
            selectedProductName = name;

            return cy
              .get(this.locators.productContainer)
              .find(this.locators.productDescription)
              .eq(randomIndex)
              .invoke("text");
          })
          .then((description) => {
            selectedProductDescription = description;

            return cy
              .get(this.locators.productContainer)
              .find(this.locators.priceLabels)
              .eq(randomIndex)
              .invoke("text");
          })
          .then((priceText) => {
            selectedProductPrice = priceText;
          });
      })
      .then(() => {
        return cy
          .get(this.locators.productContainer)
          .find('button:contains("Add to cart")')
          .eq(randomIndex)
          .click()
          .then(() => {
            return {
              productName: selectedProductName,
              productDescription: selectedProductDescription,
              productPrice: selectedProductPrice,
            };
          });
      });
  }

  clickCartButton() {
    cy.get(this.locators.shoppingCart).click();
  }
}

export default LandingPage;
