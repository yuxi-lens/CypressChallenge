class LoginPage {
  locators = {
    usernameField: "#user-name",
    passwordField: "#password",
    loginButton: "#login-button",
    errorMessage: "h3[data-test='error']",
  };

  visit() {
    cy.visit("/");
  }

  typeUsername(username) {
    if (username) {
      cy.get(this.locators.usernameField).type(username);
    } else {
      cy.get(this.locators.usernameField).clear();
    }
  }

  typePassword(password) {
    if (password) {
      cy.get(this.locators.passwordField).type(password);
    } else {
      cy.get(this.locators.passwordField).clear();
    }
  }

  clickLoginButton() {
    cy.get(this.locators.loginButton).click();
  }

  login(email, password) {
    this.typeUsername(email);
    this.typePassword(password);
    this.clickLoginButton();
  }

  verifyErrorMessage(expected) {
    cy.get(this.locators.errorMessage)
      .should("be.visible")
      .should("contain.text", expected);
  }
}

export default LoginPage;
