import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/login";

const loginPage = new LoginPage();

Given("the user navigates to the login page", () => {
  loginPage.visit();
});

Given(
  "the user is logged in with {string} and {string}",
  (username, password) => {
    loginPage.visit();
    loginPage.login(username, password);
  }
);

When("the user send {string} and {string}", (username, password) => {
  loginPage.login(username, password);
});

Then("the user should see an {string}", (errorMessage) => {
  loginPage.verifyErrorMessage(errorMessage);
});
