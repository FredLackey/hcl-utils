const _ = require('cleaner-node');

const key = opts => {
  if (!_.isValidString(opts.key)) {
    return 'Key is required';
  }
  return null;
};

module.exports = key;
