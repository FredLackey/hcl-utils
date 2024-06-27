const toNodeList = require('./to-node-list');
const isValidNode = require('./is-valid-node');

const getNames = docOrNodeOrNodes => {
  return toNodeList(docOrNodeOrNodes).filter(isValidNode).map(x => x.name.parts.join('.'));
}

module.exports = getNames;