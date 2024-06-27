const _ = require('cleaner-node');

const isValidNodeQuery = value => {
  if (!_.isValidString(value)) {
    return true;
  }
  const clean = value.split('.')
    .filter(x => (x && (x === '*' || _.isAlphaNumeric(x))))
    .join('.');
  if (clean !== value) {
    return false;
  }
  return clean.split('.').length < 3;
}

module.exports = isValidNodeQuery;