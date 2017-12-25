const RSVP = require('rsvp');
const fs = require('fs');

module.exports = function(ui, project) {
  let browserstackLocal = require('browserstack-local');

  let options = {
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    forceLocal: true,
    force: true
  };

  if (process.env.TRAVIS_JOB_NUMBER) {
    options.localIdentifier = process.env.TRAVIS_JOB_NUMBER;
  } else if (process.env.BITBUCKET_BUILD_NUMBER) {
    options.localIdentifier = process.env.BITBUCKET_BUILD_NUMBER;
  }

  let bsLocal = new browserstackLocal.Local();

  return new RSVP.Promise(function(resolve, reject) {
    bsLocal.start(options, function(error) {
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
  fs.writeFileSync(pidFile, pid);
}
