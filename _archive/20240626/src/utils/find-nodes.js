const _ = require('cleaner-node');
const toNodeList = require('./to-node-list');
const toNodeQuery = require('./to-node-query');

const findNodes = (docOrNodeOrNodes, nodeQuery, tagQuery) => {
  
  let nodes = toNodeList(docOrNodeOrNodes);

  if (!_.isValidArray(nodes, true)) {
    throw new Error('Doc or nodes required');
  }

  const queryParts = toNodeQuery(nodeQuery).split('.');

  // Filter on node query first
  for (let i = 0; i < queryParts.length; i += 1) {

    const queryPart = queryParts[i];

    if (queryPart === '*') {
      continue;
    }

    nodes = nodes.filter(x => x && x.name.parts[i] === queryPart);

  }

  const { key, value } = toTagQuery(tagQuery);

  if (_.isValidString(key) && _.isValidString(value)) {
    node = nodes.filter(x => x && getTagValue(x, key).trim() === value.trim());
  } else if (_.isValidString(key)) {
    node = nodes.filter(x => x && hasTag(key));
  }

  return nodes;

};

module.exports = findNodes;