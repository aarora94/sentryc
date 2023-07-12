Feature: QA Login

Background: login page
Given User is at test login page

@test-1
Scenario: Verify that user can login to the portal
  When user enters username 'student' to the field
  And user enters password 'Password123' to the field
  Then user click on submit button
  And verify user is loggedIn to the page

@test-2
Scenario: Verify that user can logout from the portal
  When user enters username 'student' to the field
  And user enters password 'Password123' to the field
  Then user click on submit button
  And verify user is loggedIn to the page
  And user click on logout button
  And verify that user is loggedOut from the page

@test-3
Scenario: Verify that error message is displayed for wrong user name
  When user enters username 'teacher' to the field
  And user enters password 'Password123' to the field
  Then user click on submit button
  And verify error message is displayed 'Your username is invalid!'

@test-4
Scenario: Verify that error message is displayed for wrong password
  When user enters username 'student' to the field
  And user enters password 'wrongPassword' to the field
  Then user click on submit button
  And verify error message is displayed 'Your password is invalid!'  
