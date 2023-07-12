/* global page, context,  process */

const { expect, assert } = require('chai');

const { request } = require('playwright');
const fs = require('fs');

const defaultTimeout = 50000;

exports.BaseAction = class BaseAction {
  /**
   * function to type
   * @param {string} locator - locator of element
   * @param {string} value - text to type
   * @returns {void} nothing
   */
  async type(locator, value) {
      await page.locator(locator).isVisible({ timeout: defaultTimeout });
      await this.wait(2);
      await page.fill(locator, value);
    }

  /**
   * function to click on element
   * @param {string} locator - locator of element
   * @returns {void} nothing
   */
  async click(locator) {
      await page.click(locator, { timeout: defaultTimeout });
    }


  /**
   * function to validate element title contains that value
   * @param {string} locator - locator of element
   * @param {string} value - text
   * @returns {void} nothing
   */
  async shouldHasTitleValue(locator, value) {
    const element = await page.$(locator);
    const locatorValue = await element.getAttribute('title');
    expect(value).contains(locatorValue);
  }


  /**
   * function to get value of input text
   * @param {string} locator - locator of element
   * @returns {string} text value
   */
  async getValueFromTextInput(locator) {
    const element = await page.$eval(locator, (el) => el.value);
    return element;
  }

  /**
   * function to verify text in element
   * @param {string} locator - locator of element
   * @param {string} text - text
   * @returns {void} nothing
   */
  async shouldContainText(locator, text,) {
      await page.locator(locator).isVisible({ timeout: defaultTimeout });
      const locatorText = await page.locator(locator).innerText();
      expect(locatorText).contains(text);
    }
  

  /**
   * function to verify hidden and visiblity of new window
   * @param {string} locator - locator of element
   * @returns {void} nothing
   */
  async shouldVisible(locator) {
      const frame = await page
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      assert.isTrue(frame);
    }


  /**
   * function to open browser
   * @param {string} url - url endpoint
   * @returns {void} nothing
   */
  async openBrowser(url) {
    await page.goto(url, { timeout: 50000 });
    await page.waitForLoadState();
  }

  /**
   * function to wait for seconds
   * @param {string} time - time in seconds to wait
   * @returns {void} nothing
   */
  async wait(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time * 1000);
    });
  }

  /**
   * function to get random string
   * @param {string} string - string to concat
   * @returns {string} random string
   */
  async getRandomString(string) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return (result += string);
  }


  /**
   * function to press keyboard key
   * @param {string} key - key name to press
   * @returns {void} nothing
   */
  async pressKey(key) {
      await page.keyboard.press(key);
    }

  /**
   * function to wait for selector to apppear
   * @param {string} selector - selector of element
   * @param {number} timeOut - time to wait
   * @returns {void} nothing
   */
  async waitForSelector(selector, timeOut = defaultTimeout) {
      await page.waitForSelector(selector, {
        state: 'visible',
        timeout: timeOut,
      });
    }

  /**
   * Enters key
   * @param {String} locatorPath
   * @param {String} key
   */
  async enterKey(locatorPath, key) {
    await page.locator(locatorPath).fill(key);
  }

  /**
   * Expects url to contain
   * @param {String} key 
   */
  async expectUrlToContain(key) {
    await expect(page).toHaveURL(key);
  }

  /**
   * Assert url to contain
   * @param {String} key 
   */
  async assertUrlToContain(keyword) {
    let timeout = 10000;
    let checkInterval = 500;
    let timeElapsed = 0;
    let keywordFound = false;

    while (timeElapsed < timeout) {
      if (page.url().includes(keyword)) {
        keywordFound = true;
        break;
      }
      await page.waitForTimeout(checkInterval);
      timeElapsed += checkInterval;
    }

    assert.strictEqual(keywordFound, true, 'URL does not contain ' + keyword);
  }

  /**
   * function to wait for selector to apppear
   * @param {string} selector - selector of element
   * @param {string} state - visible/invisible
   * @param {number} timeOut - time to wait
   * @returns {void} nothing
   */

  async waitForElement(locator, state = 'visible', timeout = 30000) {
    const element = await page.locator(locator);
    await element.waitFor({ state, timeout });
  }
  
};
