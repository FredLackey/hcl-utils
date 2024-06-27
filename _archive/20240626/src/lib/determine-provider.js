const toNodeList = require('../utils/find-node');
const findNode = require('../utils/find-node');

const { AWS_PREFIX, AZURE_PREFIX, GOOGLE_PREFIX } = require('../utils/constants');

const determineProvider = (docOrNodeOrNodes) => {

  const nodes = toNodeList(docOrNodeOrNodes);

  let node = findNode(nodes, 'provider');
  if (node) {
    doc.provider = node.name.parts[1];
    return;
  } 

  node = nodes.find(x => (
    x.name.parts[0] === 'resource' &&
    (x.name.parts[1].startsWith(AWS_PREFIX) || x.name.parts[1].startsWith(AZURE_PREFIX) || x.name.parts[1].startsWith(GOOGLE_PREFIX))
  ));
  if (!node) {
    throw new Error('Unable to find node with valid provider prefix');
  }

  if (node.name.parts[1].startsWith(AWS_PREFIX)) {
    doc.provider = 'aws';
  } else if (node.name.parts[1].startsWith(AZURE_PREFIX)) {
    doc.provider = 'azure';
  } else if (node.name.parts[1].startsWith(GOOGLE_PREFIX)) {
    doc.provider = 'gcp';
  } else {
    throw new Error('Unable to determine provider');
  }

};

module.exports = determineProvider;