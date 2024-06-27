const _ = require('cleaner-node');

const toNodeList = docOrNodeOrNodes => {

  if (_.isValidArray(docOrNodeOrNodes, true)) {
    return [...docOrNodeOrNodes];
  }
  if (_.isValidArray(docOrNodeOrNodes.tagLines)) {
    return [docOrNodeOrNodes];
  }
  if (_.isValidArray(docOrNodeOrNodes.nodes, true)) {
    return [...docOrNodeOrNodes.nodes];
  }

  return [];

}

module.exports = toNodeList;