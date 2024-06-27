const _ = require('cleaner-node');

const isValidTagQuery = value => {

  if (!_.isValidString(value)) {
    return true;
  }

  const parts = value.split('=')
  if (parts.length > 2) {
    return false;
  }

  let cleaned = parts.map(x => _.unquote(x.trim())).filter(x => (_.isValidString(x)));
  if (cleaned.length !== parts.length || ) {
    return false;
  }

  return true;

};

module.exports = isValidTagQuery;