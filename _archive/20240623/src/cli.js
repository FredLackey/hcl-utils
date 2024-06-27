#!/usr/bin/env node

const _ = require('cleaner-node');

const isValidNodeQuery = require('./utils/is-valid-node-query');
const isValidTagQuery = require('./utils/is-valid-tag-query');

const clearTag = require('./commands/clear-tag');
const findTag = require('./commands/find-tag');
const setTag = require('./commands/set-tag');

function main() {

  const yargs          = require('yargs');
  const fs             = require('fs');
  const path           = require('path');
  const { handleArgs } = require('./index');

  // Function to validate the "node" argument
  function validateNode(node) {
    if (!_.isValidString(node)) {
      throw new Error('Node is required.');
    };
    if (!isValidNodeQuery(node)) {
      throw new Error('Invalid node format. Must be "hcl-type.node-type.name" where each segment can be "*" or a valid identifier.');
    }
  }

  // Function to validate the "path" argument
  function validatePath(filePath) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Path does not exist: ${filePath}`);
    }
    const stats = fs.statSync(filePath);
    if (!stats.isFile() && !stats.isDirectory()) {
      throw new Error('Path must be a file or a directory.');
    }
  }

  // Function to validate the "query" argument
  function validateQuery(query) {
    if (_.isValidString(query) && !isValidTagQuery(query)) {
      throw new Error('Invalid query format. Must be "key=value" where both key and value can be "*" or a valid identifier.');
    }
  }

  // Function to validate arguments
  function validateArgs(argv) {
    const {
      action, overwrite, 'backup-folder': backupFolder, path: filePath, node, query, key, value, quote, 'dry-run': dryRun
    } = argv;

    if (!['set', 'find', 'clear'].includes(action)) {
      throw new Error('Invalid action. Options are "set", "find", or "clear".');
    }

    if (overwrite && backupFolder) {
      throw new Error('Cannot set overwrite to true when a backup folder has been supplied.');
    }

    if (!filePath) {
      throw new Error('Path is required.');
    }

    validatePath(filePath);

    if (action === 'set' || action === 'clear') {
      if (!key) {
        throw new Error('Key is required for "set" and "clear" actions.');
      }
    }

    if (action === 'set' && value === undefined) {
      throw new Error('Value is required for "set" action.');
    }

    if (overwrite === true && dryRun === true) {
      throw new Error('Overwrite and dry-run cannot both be true.');
    }

    validateNode(node);
    validateQuery(query);
  }

  function proceed(args) {
    console.log('Proceeding with:', args);
    // if (args.action === 'set') {
    //   setTag(args);
    // }
    // if (args.action === 'find') {
    //   findTag(args);
    // }
    // if (args.action === 'clear') {
    //   clearTag(args);
    // }
  }

  yargs
    .scriptName("hcltag")
    .command({
      command: '$0 <action>',
      builder: {
        action: {
          describe: 'Action to perform',
          choices: ['set', 'find', 'clear'],
          demandOption: true,
          type: 'string',
        },
        overwrite: {
          alias: 'o',
          describe: 'Overwrite the source file',
          default: false,
          type: 'boolean',
        },
        path: {
          alias: 'p',
          describe: 'Path to folder or file',
          demandOption: true,
          type: 'string',
        },
        'backup-folder': {
          alias: 'b',
          describe: 'Backup folder path',
          type: 'string',
        },
        node: {
          alias: 'n',
          describe: 'Fully qualified name of the node(s) being targeted',
          demandOption: true,
          type: 'string',
        },
        query: {
          alias: 'q',
          describe: 'Query format "key=value"',
          type: 'string',
        },
        key: {
          alias: 'k',
          describe: 'Name of the tag to be set or cleared',
          type: 'string',
        },
        value: {
          alias: 'v',
          describe: 'Value of the tag to be set',
          type: 'string',
        },
        quote: {
          alias: 'Q',
          describe: 'Surround the value of the tag in quotes',
          default: true,
          type: 'boolean',
        },
        'dry-run': {
          alias: 'd',
          describe: 'Proceed without writing changes',
          default: false,
          type: 'boolean',
        },
      },
      handler: (argv) => {
        try {
          validateArgs(argv);
          handleArgs(argv);
        } catch (error) {
          console.error('Error:', error.message);
          yargs.showHelp();
        }
      },
    })
    .demandCommand(1, 'You need to specify an action. Use --help for more information.')
    .help()
    .argv;
}

// Run the main function
main();
