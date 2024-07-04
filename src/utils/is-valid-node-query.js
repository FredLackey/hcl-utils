const _             = require('cleaner-node');
const { TAG_CHARS } = require('./constants');

// Node Query is always required.
const isValidNodeQuery = value => {
  if (!_.isValidString(value)) {
    return false;
  }
  const clean = value.split('.')
    .filter(x => (x && (x === '*' || _.isValidChars(x, TAG_CHARS))))
    .join('.');
  if (clean !== value) {
    return false;
  }
  return clean.split('.').length <= 3;
};

module.exports = isValidNodeQuery;
