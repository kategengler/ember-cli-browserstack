# ember-cli-browserstack
[![Build Status](https://travis-ci.com/kategengler/ember-cli-browserstack.svg?branch=master)](https://travis-ci.com/kategengler/ember-cli-browserstack)
[![BrowserStack Status](https://automate.browserstack.com/badge.svg?badge_key=RmFGTjdPRlZ4cm1zNjlsb3FFL0YzTmxGcERoUU51ZWR6cldHSUhNZzhWQT0tLTYzYlRCQmxSdlNwZXB5OENsOWhmd3c9PQ==--3bd648a1c454a88bf7bc65c588f657cd1adef2dd%)](https://automate.browserstack.com/public-build/RmFGTjdPRlZ4cm1zNjlsb3FFL0YzTmxGcERoUU51ZWR6cldHSUhNZzhWQT0tLTYzYlRCQmxSdlNwZXB5OENsOWhmd3c9PQ==--3bd648a1c454a88bf7bc65c588f657cd1adef2dd%)

Facilitates automated testing using BrowserStack with ember-cli projects

As of October 21, 2019, version 0.0.8 is the minimum version that will work with BrowserStack, due to API host changes. 

## Commands

### `ember browserstack:connect`
* Opens a local tunnel to BrowserStack
### `ember browserstack:disconnect`
* Closes the local tunnel to BrowserStack
### `ember browserstack:results`
* Optional argument `--build <buildName>`
* Returns results for a particular build, with links to the build data on BrowserStack
### `ember browserstack:browsers`
* Returns the list of available browsers

## How to set up automated testing with BrowserStack using this addon

1. `ember install ember-cli-browserstack`
1. Register for a BrowserStack account
1. Set environment variables `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY`
1. Add browsers to your `testem.js`. You can see available browsers by running `ember browserstack:browsers`

    For example:
    ```
    launchers: {
      bs_edge: {
        exe: 'npx ember-cli-browserstack',
        args: ['--os', 'Windows', '--osv', '10', '--b', 'edge', '--bv', 'latest', '-t', '1200', '-p',
        'my-project-name', '--u', '<url>'],
        protocol: 'browser'
      },
      bs_chrome: {
        exe: 'node_modules/.bin/browserstack-launch',
        args: ['--os', 'Windows', '--osv', '10', '--b', 'chrome', '--bv', 'latest', '-t', '600', '-p', 'my-project-name', '--u', '<url>'],
        protocol: 'browser'
      }
    },
    launch_in_ci: [
      'bs_edge',
      'Chrome'
    ]
    ```
    To see available options, run `npx browserstack-launch --help`, with more info about what those options do available here: https://www.browserstack.com/automate/capabilities and https://github.com/scottgonzalez/node-browserstack#browser-objects
    Not all options are required.
1. Open a tunnel to BrowserStack using `ember browserstack:connect`.

    This will create a `browserstack-local.pid` file, necessary for later disconnecting the tunnel.
1. Run tests (`ember test`)
    You may need to specify `--host 127.0.0.1` to support Safari
1. When tests are complete, close the tunnel to BrowserStack using `ember browserstack:disconnect`

## Running on TravisCI

When running on TravisCI, this addon will use the `TRAVIS_JOB_NUMBER` environment variable to group the browsers run in that job.
There is a helper command `ember browserstack:results` that will return links to each of the test runs in BrowserStack.

## Running on Bitbucket Pipelines

When running on Bitbucket Pipelines, this addon will use the `BITBUCKET_BUILD_NUMBER` environment variable to group the browsers run in that job.
There is a helper command `ember browserstack:results` that will return links to each of the test runs in BrowserStack.

## Build name

The above will be prefixed with the env var BROWSERSTACK_BUILD_NAME_PREFIX, if set. 

## Developing

* `git clone <repository-url>` this repository
* `cd ember-cli-browserstack`
* `yarn install`
* `npm link`
* In another project, `npm link ember-cli-browserstack`

## Thanks

Thanks to [BrowserStack](http://browserstack.com) for providing an open-source account for testing & development!

This addon is based on [ember-cli-sauce](https://github.com/johanneswuerbach/ember-cli-sauce) and [testem-browserstack](https://github.com/browserstack/testem-browserstack).
It also relies upon [node-browserstack](https://github.com/scottgonzalez/node-browserstack) and [browserstack-local-nodejs](https://github.com/browserstack/browserstack-local-nodejs).

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
