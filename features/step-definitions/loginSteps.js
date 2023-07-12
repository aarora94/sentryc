const { Given, When, Then } = require('@cucumber/cucumber');
const config = require('../../config/config.js');
const { BaseAction } = require('../../utility/baseAction.js');
const { Login } = require('../../page-objects/login.po.js');

const baseAction = new BaseAction();
const login = new Login();

Given('User is at test login page', async () => {
    await login.openBrowserWithURL();
    await baseAction.assertUrlToContain(config.BASE_URL);
  });

When('user enters username {string} to the field', async (name) => {
   await login.enterUsername(name);   
});

When('user enters password {string} to the field', async (paswrd) => {
    await login.enterPassword(paswrd);   
 });

 Then('user click on submit button', async () => {
    await login.clickSubmit();   
 });

 Then('verify user is loggedIn to the page', async () => {
    await login.verifyLoggedInPage();   
 });

 Then('user click on logout button', async () => {
    await login.clickLogout();   
 });

 Then('verify that user is loggedOut from the page', async () => {
    await login.verifyLoggedOutPage();   
 });

 Then('verify error message is displayed {string}', async (errorMessage) => {
    await login.verifyErrorMessage(errorMessage);   
 });