const _ = require('cleaner-node');
const toNodeList = require('./to-node-list');
const isValidNode = require('./is-valid-node');

const calculateHashes = docOrNodeOrNodes => {
  
  const nodes = toNodeList(docOrNodeOrNodes).filter(isValidNode);

  if (!_.isValidArray(nodes, true)) {
    throw new Error('Doc or nodes required');
  }

  for (let i = 0; i < nodes.length; i += 1) {
    nodes[i].hash = _.hashLines(nodes[i].lines);
  }

};

module.exports = calculateHashes;