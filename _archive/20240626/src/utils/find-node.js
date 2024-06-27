const _ = require('cleaner-node');
const findNodes = require('./find-nodes');

const findNode = (docOrNodeOrNodes, nodeQuery, tagQuery) => {
  
  const nodes = findNodes(docOrNodeOrNodes, nodeQuery, tagQuery);
  return _.single(nodes);

};

module.exports = findNode;