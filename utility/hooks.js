/* global process */
const playwright = require('playwright');
const {
  BeforeAll,
  Before,
  After,
  AfterAll,
  Status,
  setDefaultTimeout,
  AfterStep,
  BeforeStep,
} = require('@cucumber/cucumber');
const { BaseAction } = require('./baseAction');
const { NetworkRequestManager } = require('./networkRequestManager');


const baseAction = new BaseAction();
let networkRequestManager;
setDefaultTimeout(60 * 8 * 10000);

let headlessValue = true;
let testStarted = false;

if (process.argv.includes('ENV=gitlab')) {
  headlessValue = true;
}

// Launch options.
const options = {
  headless: headlessValue,
  slowMo: 100,
  channel: 'chrome', // or 'msedge'
};

// Create a global browser for the test session.
BeforeAll(async () => {
  global.browser = await playwright.chromium.launch(options);
});

AfterAll(async () => {
  await global.browser.close();
  await baseAction.wait(2);
});

// Create a fresh browser context for each test.
Before(async () => {
  if(!testStarted) {
    global.context = await global.browser.newContext({
      viewport: { width: 1220, height: 880 },
    });
    global.page = await global.context.newPage();
    testStarted = true;
  }
});

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    let buffer = await global.page.screenshot({
      path: `reports/${scenario.pickle.name}.png`,
      fullPage: true,
    });
    this.attach(buffer, 'image/png');
    if (global.secondSession) {
      buffer = await global.secondSession.screenshot({
        path: `reports/${scenario.pickle.name}_secondWindow.png`,
        fullPage: true,
      });
      this.attach(buffer, 'image/png');
    }
    if (global.thirdSession) {
      buffer = await global.thirdSession.screenshot({
        path: `reports/${scenario.pickle.name}_thirdWindow.png`,
        fullPage: true,
      });
      this.attach(buffer, 'image/png');
    }
  }
});

BeforeStep(async function() {
  if(typeof global.page !== 'undefined') {
    networkRequestManager = new NetworkRequestManager(global.page);
    await networkRequestManager.registerEventListeners();
  }
});

AfterStep(async function () {
  await global.page.waitForLoadState('networkidle');
  // Wait for the 'DOMContentLoaded' event to be fired
  await global.page.waitForLoadState('domcontentloaded');
  // Wait for the 'load' event to be fired
  await global.page.waitForLoadState('load');

  // Wait for DOM stability
  await global.page.evaluate(await networkRequestManager.waitForDOMStability);
  
  if(typeof global.page !== 'undefined') {
    await networkRequestManager.waitForAllNetworkRequests();
  }
});