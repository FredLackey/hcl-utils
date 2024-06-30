const _       = require('cleaner-node');
const getTags = require('./get-tags');

const getTag = (node, tag) => {
  return getTags(node).find(x => x?.key === tag);
};

module.exports = getTag;
