const toNodeList = docOrNodeOrNodes => {

  const nodeOrNodes = docOrNodeOrNodes.nodes
    ? docOrNodeOrNodes.nodes
    : docOrNodeOrNodes;

  return [].concat(nodeOrNodes).filter(x => (x && x.lines));

};

module.exports = toNodeList;
