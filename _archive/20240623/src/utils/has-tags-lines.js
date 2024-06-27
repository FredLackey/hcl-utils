const _ = require('cleaner-node');

const hasTagsLines = (node) => {
  return _.isValidArray(node?.tagLines);
}

module.exports = hasTagsLines;