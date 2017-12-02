module.exports = {
  name: 'browserstack:browsers',
  works: 'insideProject',
  description: 'List available browsers',

  availableOptions: [],

  run: function() {
    return require('../tasks/list-available-browsers')(this.ui);
  }
};
