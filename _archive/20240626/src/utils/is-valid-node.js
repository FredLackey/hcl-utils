const _ = require('cleaner-node');

const isValidNode = (node) => {
  return _.isValidArray(node?.lines, true) && _.isValidString(node?.name?.value);
};

module.exports = isValidNode;