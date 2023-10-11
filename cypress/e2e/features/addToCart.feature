Feature: Purchase Products

Scenario Outline: Purchase one product from general view
Given the user is logged in with "<username>" and "<password>"
When the user adds a product to the cart
And the user verify the product is in the cart
And the user navigates to the checkout page
And the user fills the checkout information
And the user confirms the checkout information
Then confirmation order message will be displayed


  Examples:
    | username                  | password     |
    | standard_user             | secret_sauce |
    | performance_glitch_user   | secret_sauce |