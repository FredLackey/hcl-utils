const _ = require('cleaner-node');

const quote = opts => {
  if (!_.isUndefined(opts.quote) && !_.isBoolean(opts.quote)) {
    return 'Quote flag must be a boolean.';
  }
  return null;
};

module.exports = quote;
