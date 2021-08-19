const fs = require('fs');

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
    process.kill(pid, 'SIGINT');
  }
  fs.unlinkSync(pidFile);
};
