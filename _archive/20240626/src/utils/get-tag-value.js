const _            = require('cleaner-node'    );
const getTags      = require('./get-tags'      );

const getTagValue = (node, key) => {
  const tags = getTags(node);
  return tags[key];
};

module.exports = getTagValue;