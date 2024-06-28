const _ = require('cleaner-node');
const toNodeList = require('./to-node-list');
const findNodes = require('./find-nodes');

const PROVIDER = 'google';
const GCP_PREFIX = 'google_';

const isGoogle = (docOrNodeOrNodes) => {

  const nodes = toNodeList(docOrNodeOrNodes);
  if (!_.isValidArray(nodes)) {
    return false;
  }

  const providers = findNodes(nodes, 'provider');
  if (providers.length > 1) {
    throw new Error('Only one provider block is allowed');
  }
  if (providers.length === 1) {
    return _.count(providers[0].name.parts) === 2 && providers[0].name.parts[1] === PROVIDER;
  }

  const resources = findNodes(nodes, 'resource');
  return resources.some(x => _.count(x?.name?.parts) >= 2 && x.name.parts[1].startsWith(GCP_PREFIX));
};

module.exports = isGoogle;
