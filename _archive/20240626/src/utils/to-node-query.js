const _ = require('cleaner-node');
const isValidNodeQuery = require('./is-valid-node-query');

const toNodeQuery = value => {
  if (!isValidNodeQuery(value)) {
    return null;
  }
  if (!_.isValidString(value)) {
    return '*.*.*';
  };
  const parts = value.split('.');
  if (parts.length === 1) {
    return value + '.*.*';
  }
  if (parts.length === 2) {
    return value + '.*';
  }
  return value;
};

module.exports = toNodeQuery;