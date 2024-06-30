const getTag = require('./get-tag');

const getTagValue = (node, tag) => {  
  const item = getTag(node, tag);
  return item?.value;
};

module.exports = getTagValue;
