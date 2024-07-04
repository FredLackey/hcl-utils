const getTagLines = require('./get-tag-lines');

const hasTagLines = node => {
  return getTagLines(node).length > 0;
};

module.exports = hasTagLines;
