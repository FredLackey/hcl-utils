const _ = require('cleaner-node');

const quiet = opts => {
  if (!_.isUndefined(opts.quiet) && !_.isBoolean(opts.quiet)) {
    return 'Quiet flag must be a boolean.';
  }
  return null;
};

module.exports = quiet;
