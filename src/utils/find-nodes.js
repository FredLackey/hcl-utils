const _           = require('cleaner-node');
const toNodeList  = require('./to-node-list');
const toNodeQuery = require('./to-node-query');
const toTagQuery  = require('./to-tag-query');
const getTagValue = require('./get-tag-value');
const hasTag      = require('./has-tag');

const findNodes = (docOrNodes, nodeQuery, tagQuery) => {
  
  let nodes = toNodeList(docOrNodes);
      nodes = nodes.filter(x => _.isValidArray(x?.name?.parts));

  const { tType, pType, pName } = toNodeQuery(nodeQuery);

  nodes = nodes.filter(x => (tType === '*') || tType === x.tType);
  nodes = nodes.filter(x => (pType === '*') || pType === x.pType);
  nodes = nodes.filter(x => (pName === '*') || pName === x.pName);

  const { key, value } = toTagQuery(tagQuery);

  nodes = nodes.filter(x => (key === '*') || hasTag(x, key));
  nodes = nodes.filter(x => (value === '*') || getTagValue(x, key).trim() === value.trim());

  return nodes;

};

module.exports = findNodes;
