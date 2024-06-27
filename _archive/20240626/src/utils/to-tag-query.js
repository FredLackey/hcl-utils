const isValidTagQuery = require('./is-valid-tag-query');

const toTagQuery = value => {
  if (!isValidTagQuery(value)) {
    return {
      key  : '',
      value: ''
    };
  }
  const parts = value.split('=').map(x => _.unquote(x.trim()));
  return {
    key  : parts[0].trim(),
    value: parts[1].trim()
  }
};

module.exports = toTagQuery;
