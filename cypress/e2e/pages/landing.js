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

  verifyProductsSortedByPrice(order) {
    const items = [];
    cy.get(this.locators.priceLabels)
      .each(($el) => {
        cy.wrap($el)
          .invoke("text")
          .then((text) => {
            items.push(parseFloat(text.match(/\d+/)[0]));
          });
      })
      .then(() => {
        if (order.includes("low to high")) {
          const isInAscendingOrder = items
            .slice(1)
            .every((item, index) => item >= items[index]);
          expect(isInAscendingOrder).to.be.true;
        } else if (order.includes("high to low")) {
          const isInDescendingOrder = items
            .slice(1)
            .every((item, index) => item <= items[index]);
          expect(isInDescendingOrder).to.be.true;
        }
      });
  }

  verifyProductsSortedByName(order) {
    const items = [];
    cy.get(this.locators.nameLabels)
      .each(($el) => {
        cy.wrap($el)
          .invoke("text")
          .then((text) => {
            items.push(text.trim());
          });
      })
      .then(() => {
        if (order.includes("A to Z")) {
          const isInAscendingOrder = items
            .slice(1)
            .every((item, index) => item.localeCompare(items[index]) >= 0);
          expect(isInAscendingOrder).to.be.true;
        } else if (order.includes("Z to A")) {
          const isInDescendingOrder = items
            .slice(1)
            .every((item, index) => item.localeCompare(items[index]) <= 0);
          expect(isInDescendingOrder).to.be.true;
        }
      });
  }
}

export default LandingPage;
