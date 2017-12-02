var fs = require('fs');

module.exports = function() {
  var pidFile = 'browserstack-local.pid';
  var pid = fs.readFileSync(pidFile, 'utf8');
  process.kill(pid, 'SIGINT');
  fs.unlinkSync(pidFile);
};
