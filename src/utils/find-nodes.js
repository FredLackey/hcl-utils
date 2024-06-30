const _           = require('cleaner-node');
const toNodeList  = require('./to-node-list');
const toNodeQuery = require('./to-node-query');
const toTagQuery  = require('./to-tag-query');
const getTagValue = require('./get-tag-value');
const hasTag      = require('./has-tag');

const findNodes = (docOrNodes, nodeQuery, tagQuery) => {
  
  let nodes = toNodeList(docOrNodes);
      nodes = nodes.filter(x => _.isValidArray(x?.name?.parts));

  if (!_.isValidArray(nodes, true)) {
    throw new Error('Invalid value supplied to findNodes');
  }

  let query = toNodeQuery(nodeQuery);

  nodes = nodes.filter(x => (query.tType === '*') || query.tType === x.tType);
  nodes = nodes.filter(x => (query.pType === '*') || query.pType === x.pType);
  nodes = nodes.filter(x => (query.pName === '*') || query.pName === x.pName);

  query = toTagQuery(tagQuery);

  nodes = nodes.filter(x => (query.key === '*') || hasTag(x, query.key));
  nodes = nodes.filter(x => (query.value === '*') || getTagValue(x, query.key).trim() === query.value.trim());

  return nodes;

};

module.exports = findNodes;
