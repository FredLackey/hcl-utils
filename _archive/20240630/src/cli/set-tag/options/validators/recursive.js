const _ = require('cleaner-node');

const recursive = opts => {
  if (!_.isDefined(opts?.recursive) && !_.isBoolean(opts.recursive)) {
    return 'Recursive must be a boolean.';
  }
  return null;
};

module.exports = recursive;
