import LandingPage from "./landing";

const landingPage = new LandingPage();

class ProductPage {
  locators = {
    addToCartButton: ".inventory_details_desc_container button",
    priceLabel: "div.inventory_details_price",
    descriptionText: "div.inventory_details_desc",
    productNameText: "div.inventory_details_name",
    backToProductsButton: "button#back-to-products",
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

  clickBackToProducts() {
    cy.get(this.locators.backToProductsButton).click();
  }

  addMultipleProductsToCartFromDetails() {
    const addedProducts = [];
    const addedIndices = [];

    return cy
      .get(landingPage.locators.productContainer)
      .its("length")
      .then((totalProducts) => {
        const numberOfProductsToAdd =
          Math.floor(Math.random() * (totalProducts - 1)) + 2;

        let chain = cy.wrap(null);

        for (let i = 0; i < numberOfProductsToAdd; i++) {
          chain = chain.then(() => {
            let randomIndex;
            do {
              randomIndex = Math.floor(Math.random() * totalProducts);
            } while (addedIndices.includes(randomIndex));
            addedIndices.push(randomIndex);

            return cy
              .get(landingPage.locators.productName)
              .eq(randomIndex)
              .click()
              .then(() => {
                this.clickAddToCartButton();

                return this.captureProductName().then((productName) => {
                  const productDetails = { productName };

                  return this.captureProductDescription().then(
                    (productDescription) => {
                      productDetails.productDescription = productDescription;

                      return this.captureProductPrice().then((productPrice) => {
                        productDetails.productPrice = productPrice;
                        addedProducts.push(productDetails);

                        this.clickBackToProducts();
                      });
                    }
                  );
                });
              });
          });
        }

        return chain;
      })
      .then(() => {
        landingPage.clickCartButton();
      })
      .then(() => {
        return addedProducts;
      });
  }
}

export default ProductPage;
