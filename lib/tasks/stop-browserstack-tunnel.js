const fs = require('fs');

module.exports = function() {
  let pidFile = 'browserstack-local.pid';
  let pid = fs.readFileSync(pidFile, 'utf8');
  process.kill(pid, 'SIGINT');
  fs.unlinkSync(pidFile);
};
