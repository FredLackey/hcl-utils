const _ = require('cleaner-node');

const findNodes = (docOrNodes, query) => {
  
  if (!_.isValidObject(docOrNodes, true) && !_.isValidArray(docOrNodes?.nodes, true)) {
    throw new Error('Doc or nodes required');
  }
  if (!_.isValidString(query)) {
    throw new Error('Query required');
  }

  const queryParts = query.split('.').filter(x => (x && _.isValidString(x)))
  if (queryParts.length === 0 || queryParts.length > 3) {
    throw new Error('Invalid query');
  }

  let nodes = _.isValidArray(docOrNodes.nodes) ? [...docOrNodes.nodes] : [...docOrNodes];

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