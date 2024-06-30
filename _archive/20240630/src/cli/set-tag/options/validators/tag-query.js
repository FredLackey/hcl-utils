const _ = require('cleaner-node');
const isValidTagQuery = require('../../../../utils/is-valid-tag-query');

const tagQuery = opts => {
  if (_.isValidString(opts.node) && !isValidTagQuery(opts.node)) {
    return 'Tag query is invalid.';
  }
  return null;
};

module.exports = tagQuery;
