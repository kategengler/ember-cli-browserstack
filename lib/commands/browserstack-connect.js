module.exports = {
  name: 'browserstack:connect',
  works: 'insideProject',
  description: 'Connect to BrowserStack for local testing',

  availableOptions: [],

  run: function() {
    if (!process.env.BROWSERSTACK_ACCESS_KEY) {
      throw new Error("Please set the 'BROWSERSTACK_ACCESS_KEY' environment variable");
    }

    return require('../tasks/start-browserstack-tunnel')(this.ui, this.project);
  }
};
