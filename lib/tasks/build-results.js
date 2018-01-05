const RSVP = require('rsvp');
module.exports = function(ui, buildName) {
  if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY) {
    throw new Error("Please set the 'BROWSERSTACK_USERNAME' and 'BROWSERSTACK_ACCESS_KEY' environment variables");
  }
  
  let BrowserStack = require('browserstack');

  let client = BrowserStack.createAutomateClient({
    username: process.env.BROWSERSTACK_USERNAME,
    password: process.env.BROWSERSTACK_ACCESS_KEY
  });

  return new RSVP.Promise(function(resolve) {
    client.getBuilds(function(error, builds) {
      if (error) {
        throw new Error(error);
      }

      let build = builds.find(function(build) {
        return build.name === buildName;
      });

      if (!build) {
        throw new Error("Build not found for name " + buildName);
      }

      client.getSessions(build.hashed_id, function(error, sessions) {
        if (error) {
          throw new Error(error);
        }
        
        sessions.forEach(function(session) {
          let summary = `${session.os} ${session.os_version}`;
          if (session.browser) {
            summary = `${summary}, ${session.browser} ${session.browser_version}`;
          }
          if (session.device) {
            summary = `${summary}, ${session.device}`
          }
          ui.writeLine(summary);
          ui.writeLine(`Status: ${session.status}`);
          ui.writeLine(`Details: ${session.public_url}`);
          ui.writeLine('');
        });
        
        resolve();
      });
    });
  });
};
