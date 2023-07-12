/* global page */
const { BaseAction } = require('../utility/baseAction');

const config = require('../config/config.js');

exports.Login = class Login extends BaseAction {
  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    userNameField: 'input[id="username"]',
    passwordField: 'input[id="password"]',
    submitButton: 'button[id="submit"]',
    logoutButton: '//a[contains(text(),"Log out")]',
    errorSection: '[id="error"]' 
  }

   /**
   * Function to open home page
   * @return {void} Nothing
   */
   async openBrowserWithURL() {
    await this.openBrowser(config.BASE_URL);
  }

  /**
   * Function to enter user name
   * @return {void} Nothing
   */
  async enterUsername(name) {
    await this.type(this.elements.userNameField, name)
  }

   /**
   * Function to enter password
   * @return {void} Nothing
   */
   async enterPassword(paswrd) {
    await this.type(this.elements.passwordField, paswrd)
  }

  /**
   * Function to click submit
   * @return {void} Nothing
   */
  async clickSubmit() {
    await this.click(this.elements.submitButton)
  }

  /**
   * Function to verify user is at loogedIn page
   * @return {void} Nothing
   */
  async verifyLoggedInPage() {
    await this.shouldContainText('h1', 'Logged In Successfully');
  }

   /**
   * Function to logout from the page
   * @return {void} Nothing
   */
   async clickLogout() {
    await this.click(this.elements.logoutButton);
  }

  /**
   * Function to verify user is at loogedIn page
   * @return {void} Nothing
   */
  async verifyLoggedOutPage() {
    await this.shouldContainText('h2', 'Test login');
  }

  /**
   * Function to verify the error message
   * @return {void} Nothing
   */
  async verifyErrorMessage(errorMessage) {
    await this.shouldVisible(this.elements.errorSection);
    await this.shouldContainText(this.elements.errorSection, errorMessage);
    // adding wait here to display the error in UI
    await this.wait(5);
  }
}