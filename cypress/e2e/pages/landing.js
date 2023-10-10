import { SORT_CONFIGS } from "../../support/utils/sortConfig";

class LandingPage {
  locators = {
    productsTitle: "span.title",
    shoppingCart: "a.shopping_cart_link",
    sortingSelect: "select.product_sort_container",
    priceLabels: "div.inventory_item_price",
    nameLabels: "div.inventory_item_name",
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
}

export default LandingPage;
