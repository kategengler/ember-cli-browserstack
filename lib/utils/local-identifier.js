const buildNameFromEnv = require('../utils/build-name-from-env');

module.exports = function () {
  let envId = process.env.BROWSERSTACK_LOCAL_IDENTIFIER;
  if (envId) {
    return envId;
  }
  let envIdSuffix = process.env.BROWSERSTACK_LOCAL_ID_SUFFIX || '';
  return `${buildNameFromEnv()}${envIdSuffix}`;
};
