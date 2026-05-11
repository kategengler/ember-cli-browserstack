const buildNameFromEnv = require('../utils/build-name-from-env');
const debug = require('debug')('ember-cli-browserstack:browserstack-results');

module.exports = {
  name: 'browserstack:results',
  works: 'insideProject',
  description: 'Get results of BrowserStack runs for a build',

  availableOptions: [{ name: 'build', type: String }],

  run: function (commandOptions) {
    if (commandOptions.build) {
      debug('build name passed as option');
    }
    let buildName = commandOptions.build || buildNameFromEnv();
    debug('build name: %l', buildName);
    if (!buildName) {
      this.ui.writeLine('A build name is required to find results');
      return;
    }
    return require('../tasks/build-results')(this.ui, buildName);
  },
};
