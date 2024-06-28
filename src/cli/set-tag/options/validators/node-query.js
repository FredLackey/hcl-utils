const _ = require('cleaner-node');
const isValidNodeQuery = require('../../../../utils/is-valid-node-query');

const nodeQuery = opts => {
  if (_.isValidString(opts.node)) {
    return 'Node query is required.';
  }
  if (!isValidNodeQuery(opts.node)) {
    return 'Node query is invalid.';
  }
  return null;
};

module.exports = nodeQuery;
