const isValidNodeQuery = require('./is-valid-node-query');

// Node Query is required.
const toNodeQuery = value => {
  if (!isValidNodeQuery(value)) {
    return null;
  }
  const parts = value.split('.');
  if (parts.length === 1) {
    return `${value}.*.*`;
  }
  if (parts.length === 2) {
    return `${value}.*`;
  }
  return value;
};

module.exports = toNodeQuery;
