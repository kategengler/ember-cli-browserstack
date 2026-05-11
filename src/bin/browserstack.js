#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');
const yargs = require('yargs');

// Minimal ui shim providing the same API ember-cli commands use
const ui = {
  writeLine(text) {
    console.log(text);
  },
};

// Minimal project shim (cwd-based, like ember-cli's insideProject context)
const project = {
  root: process.cwd(),
};

// Auto-discover all commands in the commands/ directory (mirrors ember-cli addon discovery)
const commandsDir = path.join(__dirname, '..', 'commands');
const commandFiles = fs
  .readdirSync(commandsDir)
  .filter((f) => f.endsWith('.js') && f !== 'index.js');

let cli = yargs;

for (const file of commandFiles) {
  const command = require(path.join(commandsDir, file));

  // Convert ember-cli availableOptions to a yargs options map
  const yargsOptions = {};
  for (const opt of command.availableOptions || []) {
    yargsOptions[opt.name] = {
      type:
        opt.type === String
          ? 'string'
          : opt.type === Boolean
            ? 'boolean'
            : 'string',
      description: opt.description || '',
      ...(opt.default !== undefined ? { default: opt.default } : {}),
    };
  }

  // ember-cli command names use ':' as a separator (e.g. 'browserstack:connect').
  // Use the part after the colon as the yargs subcommand.
  const subcommand = command.name.includes(':')
    ? command.name.split(':').slice(1).join(':')
    : command.name;

  cli = cli.command({
    command: subcommand,
    describe: command.description,
    builder: yargsOptions,
    handler(argv) {
      // Build commandOptions from parsed argv, keyed by the ember-cli option names
      const commandOptions = {};
      for (const opt of command.availableOptions || []) {
        if (argv[opt.name] !== undefined) {
          commandOptions[opt.name] = argv[opt.name];
        }
      }

      // Provide the same `this` context ember-cli supplied to run()
      const context = { ui, project };

      Promise.resolve(command.run.call(context, commandOptions)).catch(
        (err) => {
          console.error(err.message || err);
          process.exitCode = 1;
        },
      );
    },
  });
}

cli.demandCommand(1, 'Please provide a command.').strict().help().parse();
