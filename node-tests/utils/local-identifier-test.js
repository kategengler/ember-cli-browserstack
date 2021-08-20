const { assert } = require('chai');
const localIdentifier = require('../../lib/utils/local-identifier');

describe('localIdentifier', function () {
  it('use BROWSERSTACK_LOCAL_IDENTIFIER if set', async function () {
    process.env.BROWSERSTACK_LOCAL_IDENTIFIER = 'yep123';
    let result = localIdentifier();
    assert.equal(result, 'yep123', 'Uses overriding env var');

    delete process.env.BROWSERSTACK_LOCAL_IDENTIFIER;
  });

  it('defaults to using buildName', async function () {
    process.env.BROWSERSTACK_BUILD_NAME = 'nope';
    let result = localIdentifier();
    assert.equal(result, 'nope');

    delete process.env.BROWSERSTACK_BUILD_NAME;
  });

  it('adds a suffix if env var is set', async function () {
    process.env.BROWSERSTACK_BUILD_NAME = 'nope';
    process.env.BROWSERSTACK_LOCAL_ID_SUFFIX = '129';
    let result = localIdentifier();
    assert.equal(result, 'nope129');

    delete process.env.BROWSERSTACK_BUILD_NAME;
    delete process.env.BROWSERSTACK_LOCAL_ID_SUFFIX;
  });
});
