#!/usr/bin/env node

const _           = require('cleaner-node');
const options     = require('./options');
const setTag      = require('../../lib/set-tag');

const { argv } = require('yargs').options(options.formatters.toYargs());

const optsToParams = opts => {
};

const displayError = results => {
  throw new Error('not implemented');

  // errors.forEach(err => {
  //   console.error(`Error: ${err}`);
  // });

};
const displayFileResult = fileOrFiles => {
  if (_.isValidArray(fileOrFiles)) {
    fileOrFiles.forEach(displayFileResult);
    return;
  }
  console.log([
    'FILE: '
  ].join('\n'));
};

const main = async () => {

  const opts = {};
  Object.keys(argv)
    .filter(_.isAlphaNumeric)
    .forEach(key => {
      opts[key] = argv[key];
    });

  if (_.isSet(opts.markdown) || _.isSet(opts.cliMarkdown) || _.isSet(opts.markdownCli)) {
    const lines = options.formatters.toMarkdown(_.isSet(opts.cliMarkdown) || _.isSet(opts.markdownCli));
    lines.forEach(line => {
      console.log(line);
    });
    return;
  }

  const params  = optsToParams(opts);
  const results = setTag(params);

  if (results.error) {
    if (!opts.quiet) {
      displayError(results);
    }
    return process.exit(1);
  }
  if (results.files.length === 0) {
    if (!opts.quiet) {
      console.info('No files found.');
    }
    return process.exit(0);
  }

  if (!opts.quiet) {
    displayFileResult(results);
  }

  return process.exit(0);
};

main();

