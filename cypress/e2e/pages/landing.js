import { SORT_CONFIGS } from "../../support/utils/sortConfig";

class LandingPage {
  locators = {
    productsTitle: "span.title",
    shoppingCart: "a.shopping_cart_link",
    sortingSelect: "select.product_sort_container",
    priceLabels: "div.inventory_item_price",
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
          .find("div.pricebar button")
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

  addProductToCartByIndex(index) {
    let selectedProductName;
    let selectedProductDescription;
    let selectedProductPrice;

    return cy
      .get(this.locators.productContainer)
      .find(this.locators.productName)
      .eq(index)
      .invoke("text")
      .then((name) => {
        selectedProductName = name;

        return cy
          .get(this.locators.productContainer)
          .find(this.locators.productDescription)
          .eq(index)
          .invoke("text");
      })
      .then((description) => {
        selectedProductDescription = description;

        return cy
          .get(this.locators.productContainer)
          .find(this.locators.priceLabels)
          .eq(index)
          .invoke("text");
      })
      .then((priceText) => {
        selectedProductPrice = priceText;
      })
      .then(() => {
        return cy
          .get(this.locators.productContainer)
          .find("div.pricebar button")
          .eq(index)
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

  addMultipleProductsToCart() {
    const addedProducts = [];

    return cy
      .get(this.locators.productContainer)
      .its("length")
      .then((totalProducts) => {
        const numberOfProductsToAdd =
          Math.floor(Math.random() * (totalProducts - 1)) + 2;

        const selectedIndices = [];
        while (selectedIndices.length < numberOfProductsToAdd) {
          const randomIndex = Math.floor(Math.random() * totalProducts);
          if (selectedIndices.indexOf(randomIndex) === -1) {
            selectedIndices.push(randomIndex);
          }
        }

        let chain = cy.wrap(null);
        selectedIndices.forEach((index) => {
          chain = chain.then(() => {
            return this.addProductToCartByIndex(index).then(
              (productDetails) => {
                addedProducts.push(productDetails);
              }
            );
          });
        });

        return chain.then(() => addedProducts);
      });
  }

  clickCartButton() {
    cy.get(this.locators.shoppingCart).click();
  }

  openProductView() {
    cy.get(this.locators.productName).then((productNames) => {
      const randomIndex = Math.floor(Math.random() * productNames.length);
      cy.wrap(productNames).eq(randomIndex).click();
    });
  }
}

export default LandingPage;
