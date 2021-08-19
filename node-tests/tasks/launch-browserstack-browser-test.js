const execa = require('execa');
const { assert } = require('chai');

describe('launch-browserstack-browser (launcher)', function () {
  this.timeout(5000);
  it('help option outputs options', async function () {
    let { stdout } = await execa.node('lib/tasks/launch-browserstack-browser', [
      '--help',
    ]);
    assert.include(stdout, 'Options:');
    assert.include(stdout, '--version');
    assert.include(stdout, '--os');
    assert.include(stdout, '--os_version, --osv');
    assert.include(stdout, '-b, --browser');
    assert.include(stdout, '--browser_version, --bv');
    assert.include(stdout, '-d, --device');
    assert.include(stdout, '--real_mobile, --rm');
    assert.include(stdout, '-u, --url');
    assert.include(stdout, '-t, --timeout');
    assert.include(stdout, 'Timeout (min: 60, max: 1800)       [default: 300]');
    assert.include(stdout, '-n, --name');
    assert.include(stdout, '--build');
    assert.include(stdout, '--help');
  });
});
