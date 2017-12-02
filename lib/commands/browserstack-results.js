module.exports = {
  name: 'browserstack:results',
  works: 'insideProject',
  description: 'Get results of BrowserStack runs for a build',

  availableOptions: [
    { name: 'build', type: String}
  ],

  run: function(commandOptions) {
    let buildName = commandOptions.build || process.env.TRAVIS_JOB_NUMBER;
    if (!buildName) {
      this.ui.writeLine('A build name is required to find results');
      return;
    }
    return require('../tasks/build-results')(this.ui, buildName);
  }
};
