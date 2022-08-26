const { assert } = require('chai');
const buildNameFromEnv = require('../../lib/utils/build-name-from-env');

describe('buildNameFromEnv', function () {
  it('defaults to random crypto when no env vars', async function () {
    let result = buildNameFromEnv();
    assert.ok(result.length, 'returns random');
  });

  it('prefixes build name when BROWSERSTACK_BUILD_NAME_PREFIX is set', async function () {
    process.env.BROWSERSTACK_BUILD_NAME_PREFIX = 'foobar';
    let result = buildNameFromEnv();
    assert.match(result, /foobar/, 'build name is prefixed');

    delete process.env.BROWSERSTACK_BUILD_NAME_PREFIX;
  });

  it('uses BROWSERSTACK_BUILD_NAME if set', async function () {
    process.env.BROWSERSTACK_BUILD_NAME = 'nope';
    let result = buildNameFromEnv();
    assert.equal(result, 'nope');

    delete process.env.BROWSERSTACK_BUILD_NAME;
  });

  it('builds a build name from GitHub Actions env vars', async function () {
    // Can only be tested not under GitHub Actions
    if (!process.env.CI) {
      process.env.GITHUB_RUN_ID = '212';
      process.env.GITHUB_REF = 'refs/heads/feature-branch-1';
      process.env.GITHUB_WORKFLOW = 'ci';
      process.env.GITHUB_JOB = 'test';

      let result = buildNameFromEnv();
      assert.equal(result, 'feature-branch-1_ci_212_test');

      delete process.env.GITHUB_RUN_ID;
      delete process.env.GITHUB_REF;
      delete process.env.GITHUB_WORKFLOW;
      delete process.env.GITHUB_JOB;
    }
  });

  it('builds a build name from GitHub Actions env vars in a pull request', async function () {
    // Can only be tested not under GitHub Actions
    if (!process.env.CI) {
      process.env.GITHUB_RUN_ID = '212';
      process.env.GITHUB_REF = 'refs/pulls/123/merge';
      process.env.GITHUB_HEAD_REF = 'refs/heads/feature-branch-1';
      process.env.GITHUB_WORKFLOW = 'ci';
      process.env.GITHUB_JOB = 'test';

      let result = buildNameFromEnv();
      assert.equal(result, 'PR_123_ci_212_test');

      delete process.env.GITHUB_RUN_ID;
      delete process.env.GITHUB_REF;
      delete process.env.GITHUB_HEAD_REF;
      delete process.env.GITHUB_WORKFLOW;
      delete process.env.GITHUB_JOB;
    }
  });

  it('replaces spaces in workflow name', async function () {
    // Can only be tested not under GitHub Actions
    if (!process.env.CI) {
      process.env.GITHUB_RUN_ID = '212';
      process.env.GITHUB_REF = 'refs/heads/feature-branch-1';
      process.env.GITHUB_WORKFLOW = 'spacey ci';
      process.env.GITHUB_JOB = 'test';

      let result = buildNameFromEnv();
      assert.equal(result, 'feature-branch-1_spacey_ci_212_test');

      delete process.env.GITHUB_RUN_ID;
      delete process.env.GITHUB_REF;
      delete process.env.GITHUB_WORKFLOW;
      delete process.env.GITHUB_JOB;
    }
  });
});
