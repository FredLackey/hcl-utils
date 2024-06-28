const _ = require('cleaner-node');
const getTagValue = require('./get-tag-value');

const hasTag = (node, tag) => {
  
  const value = getTagValue(node, tag);
  return _.isValidString(value);

};

module.exports = hasTag;
