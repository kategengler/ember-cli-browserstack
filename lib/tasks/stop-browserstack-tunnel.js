const fs = require('fs');
const debug = require('debug')(
  'ember-cli-browserstack:stop-browserstack-tunnel'
);

module.exports = function (ui) {
  let pidFile = 'browserstack-local.pid';
  let pid;
  try {
    pid = fs.readFileSync(pidFile, 'utf8');
  } catch (e) {
    ui.writeLine(
      'No pid file (browserstack-local.pid) found. Is this the same directory you started the BrowserStack connection?'
    );
    return;
  }
  if (pid) {
    debug('Stopping BrowserStack Tunnel with PID: %l', pid);
    process.kill(pid, 'SIGINT');
  }
  debug('Removing BrowserStack Tunnel PID file');
  fs.unlinkSync(pidFile);
};
