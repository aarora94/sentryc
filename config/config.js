/* global process */
const host = typeof process.env.npm_config_host === 'undefined'? 'https://practicetestautomation.com/practice-test-login/': process.env.npm_config_host;
const userData = Object.assign( {
  BASE_URL: host,
});

module.exports = userData;