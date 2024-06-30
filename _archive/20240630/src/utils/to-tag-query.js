const _ = require('cleaner-node');
const isValidTagQuery = require('./is-valid-tag-query');

// Tag Query is optional.
const toTagQuery = value => {

  if (!isValidTagQuery(value)) {
    return {
      key  : '*',
      value: '*'
    };
  }
  
  const parts = value.split('=');

  return {
    key  : parts[0],
    value: parts.length === 2 ? parts[1]: '*'
  };
};

module.exports = toTagQuery;
