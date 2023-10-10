Feature: Login

Background: Navigate to Login Page
Given the user navigates to the login page

Scenario Outline: Login user with valid credentials
When the user send "<username>" and "<password>"
Then the user should be logged in successfully

  Examples:
    | username                  | password     |
    | standard_user             | secret_sauce |
    | performance_glitch_user   | secret_sauce |


Scenario Outline: Login user with invalid credentials
When the user send "<username>" and "<password>"
Then the user should see an "<errorMessage>"

  Examples:
    | username                  | password     | errorMessage                                             |
    | standard_user             | pass123!     |Username and password do not match any user in this service|
    | performance_glitch_user   | Pa55w0rD*    |Username and password do not match any user in this service|


Scenario Outline: Login user with empty credentials
When the user send "<username>" and "<password>"
Then the user should see an "<errorMessage>"

  Examples:
    | username                  | password     | errorMessage |
    | standard_user             |              | Password is required |
    |                           | Pa55w0rD*    | Username is required |
    |                           |              | Username is required |
