const RSVP = require('rsvp');
const fs = require('fs');
const buildNameFromEnv = require('../utils/build-name-from-env');

module.exports = function (ui) {
  let browserstackLocal = require('browserstack-local');

  let options = {
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    forceLocal: true,
    force: true,
  };

  options.localIdentifier =
    process.env.BROWSERSTACK_LOCAL_IDENTIFIER || buildNameFromEnv();

  let bsLocal = new browserstackLocal.Local();

  return new RSVP.Promise(function (resolve, reject) {
    bsLocal.start(options, function (error) {
      if (error) {
        reject(error);
      }

      writePidFile(bsLocal.pid);
      ui.writeLine('BrowserStack Tunnel Connected');
      resolve();
    });
  });
};

function writePidFile(pid) {
  let pidFile = 'browserstack-local.pid';
  fs.writeFileSync(pidFile, String(pid));
}
