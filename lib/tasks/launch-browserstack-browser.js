#!/usr/bin/env node

if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY) {
  throw new Error("Please set the 'BROWSERSTACK_USERNAME' and 'BROWSERSTACK_ACCESS_KEY' environment variables");
}

var workerId = 0;
var BrowserStack = require('browserstack');
// var name = null;

['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(function(signal) {
  process.on(signal, function() {
    console.log("Closed BrowserStack Worker process " + signal);
    if (client !== null) {
      client.terminateWorker(workerId, function() {
        process.exit();
      });
    }
  });
});

var client = BrowserStack.createClient({
  username: process.env.BROWSERSTACK_USERNAME,
  password: process.env.BROWSERSTACK_ACCESS_KEY
});


var build;

if (process.env.TRAVIS_JOB_NUMBER) {
  build = process.env.TRAVIS_JOB_NUMBER;
}

var name = require('crypto').randomBytes(10).toString('hex');
var argv = require('yargs')
  .option('os', {
    describe: 'Operating System'
  })
  .option('os_version', {
    alias: 'osv',
    describe: 'OS Version'
  })
  .option('browser', {
    alias: 'b',
    describe: 'Browser'
  })
  .option('browser_version', {
    alias: 'bv',
    describe: 'Browser Version'
  })
  .option('device', {
    alias: 'd',
    describe: 'Device'
  })
  .option('real_mobile', {
    alias: 'rm',
    describe: 'Use "real" mobile'
  })
  .option('url', {
    alias: 'u',
    describe: 'URL to be opened by the browser'
  })
  .option('timeout', {
    alias: 't',
    describe: 'Timeout (min: 60, max: 1800)',
    default: 300
  })
  .option('name', {
    alias: 'n',
    describe: 'Name of the browser run, defaults to random string',
    default: name
  })
  .option('build', {
    describe: 'Build Name, defaults to process.env.TRAVIS_JOB_NUMBER, if set',
    default: build
  }).help().argv;

// Options documented at https://github.com/scottgonzalez/node-browserstack#clientcreateworkersettings-callback and https://github.com/browserstack/api
var settings = {
  os: argv.os,
  os_version: argv.os_version,
  browser: argv.browser,
  browser_version: argv.browser_version,
  device: argv.device,
  real_mobile: argv.real_mobile,
  url: argv.url,
  'browserstack.local': true,
  timeout: argv.timeout,
  name: argv.name,
  build: argv.build
};

for (var i in settings) {
  if (!settings[i]) {
    delete settings[i];
  }
}

client.createWorker(settings, function(error, worker) {
  if (error) {
    console.log(error);
    process.exit()
  }
  
  workerId = worker.id;
});

setTimeout(function() {
  client.terminateWorker(workerId);
}, 1800000);
