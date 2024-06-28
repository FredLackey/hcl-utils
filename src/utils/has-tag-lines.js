const _ = require('cleaner-node');

const hasTagLines = (node) => {
  return _.isValidArray(node?.tagLines);
};

module.exports = hasTagLines;
