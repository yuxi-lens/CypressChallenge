@purchase
Feature: Purchase Products

Scenario Outline: Purchase one product from general view
    Given the user is logged in with "<username>" and "<password>"
    When the user add a product to the cart
    And the user completes the purchase process
    Then confirmation order message will be displayed


  Examples:
    | username                  | password     |
    | standard_user             | secret_sauce |
    | performance_glitch_user   | secret_sauce |



Scenario Outline: Purchase multiple products from general view
    Given the user is logged in with "<username>" and "<password>"
    When the user add some products to the cart
    And the user completes the purchase process
    Then confirmation order message will be displayed


  Examples:
    | username                  | password     |
    | standard_user             | secret_sauce |
    | performance_glitch_user   | secret_sauce |



Scenario Outline: Purchase one product from detailed view
    Given the user is logged in with "<username>" and "<password>"
    When the user add the product to the cart from the detail view
    And the user completes the purchase process
    Then confirmation order message will be displayed


  Examples:
    | username                  | password     |
    | standard_user             | secret_sauce |
    | performance_glitch_user   | secret_sauce |


   
Scenario Outline: Purchase multiple products from detailed view
    Given the user is logged in with "<username>" and "<password>"
    When the user add multiple products from detailed view
    And the user completes the purchase process
    Then confirmation order message will be displayed


  Examples:
    | username                  | password     |
    | standard_user             | secret_sauce |
    | performance_glitch_user   | secret_sauce |    