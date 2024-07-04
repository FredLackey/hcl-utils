const _ = require('cleaner-node');
const isValidTagQuery = require('./is-valid-tag-query');

// Tag Query is optional.
const toTagQuery = value => {
  if (!isValidTagQuery(value)) {
    return null;
  } 
  if (!_.isValidString(value)) {
    return {
      key  : '*',
      value: '*'
    };
  }
  const parts = value.split('=').map(x => _.unquote(x.trim()));
  return {
    key  : parts[0].trim(),
    value: parts.length === 2 ? (parts[1].trim() || '*') : '*'
  };
};

module.exports = toTagQuery;
