const _ = require('cleaner-node');

const value = opts => {
  if (!_.isValidString(opts.value)) {
    return 'Value is required.';
  }
  if (opts.value !== _.unquote(opts.value)) {
    return 'Value must not be quoted.';
  }
  return null;
};

module.exports = value;
