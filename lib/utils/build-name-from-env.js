const crypto = require('crypto');
const debug = require('debug')('ember-cli-browserstack:build-name-from-env');

module.exports = function () {
  const env = environmentVariables();

  debug('environment variables: %o', env);

  let buildDesc =
    env.BROWSERSTACK_BUILD_NAME ||
    env.TRAVIS_JOB_NUMBER ||
    env.BITBUCKET_BUILD_NUMBER ||
    env.CIRCLE_BUILD_NUM ||
    buildNameForGithubActions({
      runId: env.GITHUB_RUN_ID,
      job: env.GITHUB_JOB,
      workflow: env.GITHUB_WORKFLOW,
      ref: env.GITHUB_REF,
      headRef: env.GITHUB_HEAD_REF,
    }) ||
    env.CI_JOB_ID ||
    crypto.randomBytes(10).toString('hex');

  let prefix = env.BROWSERSTACK_BUILD_NAME_PREFIX;
  if (buildDesc && prefix) {
    return `${prefix}_${buildDesc}`;
  }
  return buildDesc;
};

function buildNameForGithubActions({ runId, job, workflow, ref, headRef }) {
  if (runId) {
    let runDesc = githubRunDesc(ref, headRef);
    let workflowEscaped = workflow.replace(/\s/g, '_');
    const githubActionsBuildName = `${runDesc}_${workflowEscaped}_${runId}_${job}`;
    debug('github actions build name: %s', githubActionsBuildName);
    return githubActionsBuildName;
  }
}

function githubRunDesc(ref, headRef) {
  if (headRef) {
    let matches = /(\d+)/.exec(ref);
    let pr = matches[1];
    return `PR_${pr}`;
  } else if (ref.includes('refs/pull/')) {
    let matches = /(\d+)/.exec(ref);
    let pr = matches[1];
    return `PR_${pr}`;
  } else {
    return ref.replace('refs/heads/', '').replace('refs/tags/', '');
  }
}

function environmentVariables() {
  return {
    BROWSERSTACK_BUILD_NAME: process.env.BROWSERSTACK_BUILD_NAME,
    BROWSERSTACK_BUILD_NAME_PREFIX: process.env.BROWSERSTACK_BUILD_NAME_PREFIX,
    TRAVIS_JOB_NUMBER: process.env.TRAVIS_JOB_NUMBER,
    BITBUCKET_BUILD_NUMBER: process.env.BITBUCKET_BUILD_NUMBER,
    CIRCLE_BUILD_NUM: process.env.CIRCLE_BUILD_NUM,
    CI_JOB_ID: process.env.CI_JOB_ID,
    GITHUB_RUN_ID: process.env.GITHUB_RUN_ID,
    GITHUB_WORKFLOW: process.env.GITHUB_WORKFLOW,
    GITHUB_REF: process.env.GITHUB_REF,
    GITHUB_HEAD_REF: process.env.GITHUB_HEAD_REF,
    GITHUB_RUN_NUMBER: process.env.GITHUB_RUN_NUMBER,
    GITHUB_JOB: process.env.GITHUB_JOB,
  };
}

module.exports._githubRunDesc = githubRunDesc;
module.exports._buildNameForGithubActions = buildNameForGithubActions;
