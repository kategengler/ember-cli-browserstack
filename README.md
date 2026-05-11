# ember-cli-browserstack

Facilitates automated testing using BrowserStack

## Commands

### `browserstack connect`

- Opens a local tunnel to BrowserStack

### `browserstack disconnect`

- Closes the local tunnel to BrowserStack

### `browserstack results`

- Optional argument `--build <buildName>`
- Returns results for a particular build, with links to the build data on BrowserStack

### `browserstack browsers`

- Returns the list of available browsers

## How to set up automated testing with BrowserStack

1. `npm install ember-cli-browserstack`
1. Register for a BrowserStack account
1. Set environment variables `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY`
1. Add browsers to your `testem.[c]js`. You can see available browsers by running `npx browserstack browsers`

   For example:

   ```
   launchers: {
     bs_edge: {
       exe: 'node_modules/.bin/browserstack-launch',
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
     'bs_chrome'
   ]
   ```

   To see available options run `npx browserstack-launch --help` or see https://www.browserstack.com/automate/capabilities and https://github.com/scottgonzalez/node-browserstack#browser-objects
   Not all options are required.

1. Open a tunnel to BrowserStack using `npx browserstack connect`.

   This will create a `browserstack-local.pid` file, necessary for later disconnecting the tunnel.

1. Run tests
   You may need to specify `--host 127.0.0.1` and `--test-port=7774` to support Safari 
1. When tests are complete, close the tunnel to BrowserStack using `npx browserstack disconnect`

## Build name

The build name can be set by passing it to each launcher (`--build`) or by setting the environment variable `BROWSERSTACK_BUILD_NAME`.
If no build name is passed it will be [determined by CI Environment variables](https://github.com/kategengler/ember-cli-browserstack/blob/main/lib/utils/build-name-from-env.js), falling back to a random value.
The build name can be prefixed by setting `BROWSERSTACK_BUILD_NAME_PREFIX`.

The name is used for grouping runs in the BrowserStack UI and to fetch results.

## Configuring Browserstack `local identifier`

_In most cases you don't need to do anything with default setup._
_However if you are building custom matrix build CI pipeline, then you need to tell Browserstack where each instance is for its routing to work._

In case you need to setup custom value for `local identifier`, you can set `BROWSERSTACK_LOCAL_IDENTIFIER` env var.
If the env var is not set, this addon attempts to set a smart value for the local identifier based on the build name.
You can append to this smart value by setting `BROWSERSTACK_LOCAL_ID_SUFFIX`.

See, for example, the GitHub Actions setup in this repository.

_See for more information: https://www.browserstack.com/local-testing/automate#multiple-local-testing-connections_

## Developing

- `git clone <repository-url>` this repository
- `cd ember-cli-browserstack`
- `pnpm install`

## Thanks

Thanks to [BrowserStack](http://browserstack.com) for providing an open-source account for testing & development!

This addon is based on [ember-cli-sauce](https://github.com/johanneswuerbach/ember-cli-sauce) and [testem-browserstack](https://github.com/browserstack/testem-browserstack).
It also relies upon [node-browserstack](https://github.com/scottgonzalez/node-browserstack) and [browserstack-local-nodejs](https://github.com/browserstack/browserstack-local-nodejs).

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
