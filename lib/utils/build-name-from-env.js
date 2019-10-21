const crypto = require('crypto');

module.exports = function() {
  let buildNum = process.env.TRAVIS_JOB_NUMBER || process.env.BITBUCKET_BUILD_NUMBER || process.env.CIRCLE_BUILD_NUM || process.env.CI_JOB_ID;
  let prefix = process.env.BROWSERSTACK_BUILD_NAME_PREFIX;
  if (buildNum && prefix) {
    return prefix + '_' + buildNum;
  }
  return buildNum || crypto.randomBytes(10).toString('hex');
}
