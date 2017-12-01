var RSVP = require('rsvp');
var fs = require('fs');

module.exports = function(ui, project) {
  var browserstackLocal = require('browserstack-local');

  var options = {
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    forceLocal: true,
    force: true,
    localIdentifier: project.name()
  };

  if (process.env.TRAVIS_JOB_NUMBER) {
    options.localIdentifier = options.localIdentifier + process.env.TRAVIS_JOB_NUMBER;
  }

  var bsLocal = new browserstackLocal.Local();

  return new RSVP.Promise(function(resolve, reject) {
    let result = bsLocal.start(options, function(error) {
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
  var pidFile = 'browserstack-local.pid';
  fs.writeFileSync(pidFile, pid);
}
