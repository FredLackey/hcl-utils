const _ = require('cleaner-node');

const trimLines = values => {
  return [].concat(values)
    .filter(x => _.isValidString(x))
    .map(x => x.trim());
};

module.exports = trimLines;
