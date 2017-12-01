/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-browserstack',
  includedCommands: function() {
    return require('./lib/commands');
  }
};
