const _ = require('cleaner-node');
const toNodeList = require('./to-node-list');

const findNodes = (docOrNodeOrNodes, query) => {
  
  let nodes = toNodeList(docOrNodeOrNodes);

  if (!_.isValidArray(nodes, true)) {
    throw new Error('Doc or nodes required');
  }
  if (!_.isValidString(query)) {
    throw new Error('Query required');
  }

  const queryParts = query.split('.').filter(x => (x && _.isValidString(x)))
  if (queryParts.length === 0 || queryParts.length > 3) {
    throw new Error('Invalid query');
  }

  for (let i = 0; i < queryParts.length; i += 1) {

    const queryPart = queryParts[i];

    if (queryPart === '*') {
      continue;
    }

    nodes = nodes.filter(x => x && x.name.parts[i] === queryPart);

  }

  return nodes;

};

module.exports = findNodes;