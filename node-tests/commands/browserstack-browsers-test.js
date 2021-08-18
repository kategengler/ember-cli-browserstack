const execa = require('execa');
const { assert } = require('chai');

describe('ember browserstack:browsers', function () {
  this.timeout(5000);
  it('lists all browsers', async function () {
    let { stdout } = await execa('ember', ['browserstack:browsers']);
    let browsers = JSON.parse(stdout);
    assert.ok(browsers.length);
    assert.deepEqual(Object.keys(browsers[0]), [
      'os',
      'os_version',
      'browser',
      'device',
      'browser_version',
      'real_mobile',
    ]);
  });
});
