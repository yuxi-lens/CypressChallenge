Feature: Purchase Products

Scenario Outline: Purchase one product from general view
    Given the user is logged in with "<username>" and "<password>"
    When the user add a product to the cart
    And the user verify the product is in the cart
    And the user navigates to the checkout page
    And the user fills the checkout information
    And the user confirms the product checkout information
    Then confirmation order message will be displayed


  Examples:
    | username                  | password     |
    | standard_user             | secret_sauce |
    | performance_glitch_user   | secret_sauce |



Scenario Outline: Purchase multiple products from general view
    Given the user is logged in with "<username>" and "<password>"
    When the user add some products to the cart
    And the user verify the products are in the cart
    And the user navigates to the checkout page
    And the user fills the checkout information
    And the user confirms the products checkout information
    Then confirmation order message will be displayed


  Examples:
    | username                  | password     |
    | standard_user             | secret_sauce |
    | performance_glitch_user   | secret_sauce |



Scenario Outline: Purchase one product from detailed view
    Given the user is logged in with "<username>" and "<password>"
    When the user open a product detailed view
    And the user add the product to the cart
    And the user verify the product is in the cart
    And the user navigates to the checkout page
    And the user fills the checkout information
    And the user confirms the product checkout information
    Then confirmation order message will be displayed


  Examples:
    | username                  | password     |
    | standard_user             | secret_sauce |
    | performance_glitch_user   | secret_sauce |


   
Scenario Outline: Purchase multiple products from detailed view
    Given the user is logged in with "<username>" and "<password>"
    When the user add multiple products from detailed view
    And the user verify the products are in the cart
    And the user navigates to the checkout page
    And the user fills the checkout information
    And the user confirms the products checkout information
    Then confirmation order message will be displayed


  Examples:
    | username                  | password     |
    | standard_user             | secret_sauce |
    | performance_glitch_user   | secret_sauce |    