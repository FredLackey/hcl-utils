const isTaggable = require('./is-taggable');
const toNodeList = require('./to-node-list');

const getTaggable = docOrNodeOrNodes => {
  return toNodeList(docOrNodeOrNodes).filter(isTaggable);
};

module.exports = getTaggable;
