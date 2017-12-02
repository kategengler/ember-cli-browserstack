module.exports = {
  name: 'browserstack:disconnect',
  works: 'insideProject',
  description: 'Disconnect BrowserStack Tunnel',

  availableOptions: [],

  run: function() {
    return require('../tasks/stop-browserstack-tunnel')(this.ui);
  }
};
