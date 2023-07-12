const common = `
  --require config/config.js 
  --require utility/hooks.js 
  --require step-definitions/**/*.steps.js
  `;
module.exports = {
  default: `${common} features/**/*.feature`,
};
