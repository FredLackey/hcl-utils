const _ = require('cleaner-node');
const { TAG_CHARS } = require('./constants');

// Tag Query is optional.
const isValidTagQuery = value => {
  
  if (!_.isValidString(value)) {
    return true;
  }
  
  const parts = value.split('=');
  if (parts.length > 2) {
    return false;
  }

  if (parts.length >= 1 && !_.isValidChars(parts[0], TAG_CHARS)) {
    return false;
  }
  if (parts.length === 2 && !_.isValidString(parts[1])) {
    return false;
  }

  return true;
};

module.exports = isValidTagQuery;
