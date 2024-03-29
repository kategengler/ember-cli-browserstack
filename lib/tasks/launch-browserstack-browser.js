#!/usr/bin/env node
/* eslint-disable no-console, no-process-exit */
const buildNameFromEnv = require('../utils/build-name-from-env');
const localIdentifier = require('../utils/local-identifier');
const debug = require('debug')(
  'ember-cli-browserstack:launch-browserstack-browser'
);

let build = buildNameFromEnv();

debug('Build Name: %l', build);

let name = require('crypto').randomBytes(10).toString('hex');
debug('Name: %l', name);

let argv = require('yargs')
  .option('os', {
    describe: 'Operating System',
  })
  .option('os_version', {
    alias: 'osv',
    type: 'string',
    describe: 'OS Version',
  })
  .option('browser', {
    alias: 'b',
    describe: 'Browser',
  })
  .option('browser_version', {
    alias: 'bv',
    type: 'string',
    describe: 'Browser Version',
  })
  .option('device', {
    alias: 'd',
    describe: 'Device',
  })
  .option('real_mobile', {
    alias: 'rm',
    describe: 'Use "real" mobile',
  })
  .option('url', {
    alias: 'u',
    describe: 'URL to be opened by the browser',
  })
  .option('timeout', {
    alias: 't',
    describe: 'Timeout (min: 60, max: 1800)',
    default: 300,
  })
  .option('name', {
    alias: 'n',
    describe: 'Name of the browser run, defaults to random string',
    default: name,
  })
  .option('build', {
    describe:
      'Build Name, defaults to values from CI environment if set. Defaults to random string.',
    default: build,
  })
  .option('project', {
    alias: 'p',
    describe: 'Project name to group builds together',
    type: 'string',
  })
  .help().argv;

if (
  !process.env.BROWSERSTACK_USERNAME ||
  !process.env.BROWSERSTACK_ACCESS_KEY
) {
  throw new Error(
    "Please set the 'BROWSERSTACK_USERNAME' and 'BROWSERSTACK_ACCESS_KEY' environment variables"
  );
}

let workerId = 0;
let BrowserStack = require('browserstack');

let client = BrowserStack.createClient({
  username: process.env.BROWSERSTACK_USERNAME,
  password: process.env.BROWSERSTACK_ACCESS_KEY,
});

['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(function (signal) {
  process.on(signal, function () {
    console.log('Closed BrowserStack Worker process ' + signal);
    if (client !== null) {
      client.terminateWorker(workerId, function () {
        process.exit();
      });
    } else {
      process.exit();
    }
  });
});

// Options documented at https://github.com/scottgonzalez/node-browserstack#clientcreateworkersettings-callback and https://github.com/browserstack/api
let settings = {
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
  build: argv.build,
  project: argv.project,
};

settings.localIdentifier = localIdentifier();

for (let i in settings) {
  if (!settings[i]) {
    delete settings[i];
  }
}

debug(
  'Creating BrowserStack worker with settings %s',
  JSON.stringify(settings)
);
client.createWorker(settings, function (error, worker) {
  if (error) {
    console.log(error);
    process.exit();
  }

  workerId = worker.id;
});

setTimeout(function () {
  client.terminateWorker(workerId);
  console.log('Timed out worker');
  process.exit();
}, 1800000);
