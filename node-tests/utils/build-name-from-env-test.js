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

  describe('_githubRunDesc', function () {
    it('uses PR number when headRef is set', async function () {
      let result = buildNameFromEnv._githubRunDesc(
        'refs/pulls/123/merge',
        'refs/heads/feature-branch-1'
      );
      assert.equal(result, 'PR_123');
    });

    it('uses the branch name when headRef is not set', async function () {
      let result = buildNameFromEnv._githubRunDesc(
        'refs/heads/feature-branch-1'
      );
      assert.equal(result, 'feature-branch-1');
    });

    it('uses the tagName when headRef is not set', async function () {
      let result = buildNameFromEnv._githubRunDesc('refs/tags/v1.0.0');
      assert.equal(result, 'v1.0.0');
    });

    it('uses the pr number when headRef is not set', async function () {
      let result = buildNameFromEnv._githubRunDesc('refs/pull/123/merge');
      assert.equal(result, 'PR_123');
    });
  });

  describe('_buildNameForGithubActions', function () {
    it('returns undefined when no runId', async function () {
      let result = buildNameFromEnv._buildNameForGithubActions({});
      assert.equal(result, undefined);
    });

    it('returns a build name when runId is set', async function () {
      let result = buildNameFromEnv._buildNameForGithubActions({
        runId: '212',
        job: 'test',
        workflow: 'ci',
        ref: 'refs/heads/feature-branch-1',
      });
      assert.equal(result, 'feature-branch-1_ci_212_test');
    });

    it('escapes spaces in workflow name', async function () {
      let result = buildNameFromEnv._buildNameForGithubActions({
        runId: '212',
        job: 'test',
        workflow: 'spacey ci',
        ref: 'refs/heads/feature-branch-1',
      });
      assert.equal(result, 'feature-branch-1_spacey_ci_212_test');
    });
  });
});
