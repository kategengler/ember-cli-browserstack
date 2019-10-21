const RSVP = require('rsvp');
module.exports = function(ui) {
  if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY) {
    throw new Error("Please set the 'BROWSERSTACK_USERNAME' and 'BROWSERSTACK_ACCESS_KEY' environment variables");
  }

  let BrowserStack = require('browserstack');

  let client = BrowserStack.createAutomateClient({
    username: process.env.BROWSERSTACK_USERNAME,
    password: process.env.BROWSERSTACK_ACCESS_KEY
  });

  return new RSVP.Promise(function(resolve) {
    client.getBrowsers(function(error, browsers) {
      if (error) {
        throw new Error(error);
      }
      ui.writeLine(JSON.stringify(browsers, null, 2));
      resolve();
    });
  });
};
