module.exports = function() {
  let buildNum = process.env.TRAVIS_JOB_NUMBER || process.env.BITBUCKET_BUILD_NUMBER;
  let prefix = process.env.BROWSERSTACK_BUILD_NAME_PREFIX;
  if (buildNum && prefix) {
    return prefix + '-' + buildNum;
  }
  return buildNum;
}
