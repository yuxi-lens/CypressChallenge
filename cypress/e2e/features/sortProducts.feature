@sorting
Feature: Sort Products

Scenario Outline: Sort products by price
  Given the user is logged in with "<username>" and "<password>"
  When the user sort products by "<order>"
  Then the products should be sorted by "<order>"


  Examples:
    | username                  | password     | order               |
    | standard_user             | secret_sauce | Price (low to high) |
    | standard_user             | secret_sauce | Price (high to low) | 
    | performance_glitch_user   | secret_sauce | Price (low to high) |
    | performance_glitch_user   | secret_sauce | Price (high to low) |


Scenario Outline: Sort products by name
  Given the user is logged in with "<username>" and "<password>"
  When the user sort products by "<order>"
  Then the products should be sorted by "<order>"


  Examples:
    | username                  | password     | order         |
    | standard_user             | secret_sauce | Name (A to Z) |
    | standard_user             | secret_sauce | Name (Z to A) | 
    | performance_glitch_user   | secret_sauce | Name (A to Z) |
    | performance_glitch_user   | secret_sauce | Name (Z to A) |
