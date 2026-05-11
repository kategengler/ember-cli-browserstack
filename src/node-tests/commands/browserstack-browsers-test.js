const path = require('path');
const execa = require('execa');
const { assert } = require('chai');

describe('browserstack browsers', function () {
  this.timeout(5000);
  it('lists all browsers', async function () {
    let { stdout } = await execa('node', ['bin/browserstack.js', 'browsers'], {
      cwd: path.join(__dirname, '../..'),
    });
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
