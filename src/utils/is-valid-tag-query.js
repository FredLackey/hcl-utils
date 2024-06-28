const _ = require('cleaner-node');

// Tag Query is optional.
const isValidTagQuery = value => {
  if (!_.isValidString(value)) {
    return true;
  }
  const parts = value.split('=');
  if (parts.length > 2) {
    return false;
  }

  const cleaned = parts.map(x => _.unquote(x.trim())).filter(x => (_.isValidString(x)));

  return cleaned.length === parts.length;

};

module.exports = isValidTagQuery;
