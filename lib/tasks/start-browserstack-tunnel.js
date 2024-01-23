const RSVP = require('rsvp');
const fs = require('fs');
const debug = require('debug')(
  'ember-cli-browserstack:start-browserstack-tunnel'
);
const localIdentifier = require('../utils/local-identifier');

module.exports = function (ui) {
  let browserstackLocal = require('browserstack-local');

  let options = {
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    forceLocal: true,
    force: true,
  };

  options.localIdentifier = localIdentifier();

  debug(
    'Starting BrowserStack Tunnel with localIdentifier: %l',
    options.localIdentifier
  );

  let bsLocal = new browserstackLocal.Local();

  return new RSVP.Promise(function (resolve, reject) {
    bsLocal.start(options, function (error) {
      if (error) {
        reject(error);
      }

      debug('BrowserStack Tunnel PID: %l', bsLocal.pid);
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
