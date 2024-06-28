const _ = require('cleaner-node');

const save = opts => {
  if (!_.isUndefined(opts.save) && !_.isBoolean(opts.save)) {
    return 'Save flag must be a boolean.';
  }
  return null;
};

module.exports = save;
