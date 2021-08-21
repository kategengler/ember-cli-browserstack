const crypto = require('crypto');

module.exports = function () {
  let buildDesc =
    process.env.BROWSERSTACK_BUILD_NAME ||
    process.env.TRAVIS_JOB_NUMBER ||
    process.env.BITBUCKET_BUILD_NUMBER ||
    process.env.CIRCLE_BUILD_NUM ||
    buildNameForGithubActions() ||
    process.env.CI_JOB_ID ||
    crypto.randomBytes(10).toString('hex');

  let prefix = process.env.BROWSERSTACK_BUILD_NAME_PREFIX;
  if (buildDesc && prefix) {
    return `${prefix}_${buildDesc}`;
  }
  return buildDesc;
};

function buildNameForGithubActions() {
  if (process.env.GITHUB_RUN_ID) {
    let runDesc = githubRunDesc();
    return `${runDesc}_${process.env.GITHUB_WORKFLOW}_${process.env.GITHUB_RUN_ID}_${process.env.GITHUB_JOB}`;
  }
}

function githubRunDesc() {
  if (process.env.GITHUB_HEAD_REF) {
    let matches = /(\d+)/.exec(process.env.GITHUB_REF);
    let pr = matches[1];
    return `PR_${pr}`;
  } else {
    return process.env.GITHUB_REF.replace('refs/heads/', '');
  }
}
