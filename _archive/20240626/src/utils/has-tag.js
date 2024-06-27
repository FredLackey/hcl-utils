const _            = require('cleaner-node'    );
const getTags      = require('./get-tags'      );

const hasTag = (node, key) => {
  const tags = getTags(node);
  return _.isValidString(tags[key]);
};

module.exports = hasTag;