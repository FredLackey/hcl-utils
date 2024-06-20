const _ = require('cleaner-node');
const findNodes = require('./find-nodes');

const PROVIDER = 'google';
const GCP_PREFIX = 'google_';

const isGoogle = (docOrNodeOrNodes) => {

  if (_.isValidArray(docOrNodeOrNodes?.nodes, true)) {
    const providers = findNodes(docOrNodeOrNodes, 'provider');
    return providers.some(x => _.count(x?.name?.parts) === 2 && x.name.parts[1] === PROVIDER);
  }

  if (_.isValidArray(docOrNodeOrNodes)) {
    return docOrNodeOrNodes.some(x => _.count(x?.name?.parts) >= 2 && x.name.parts[1].startsWith(GCP_PREFIX));
  }

  return _.count(docOrNodeOrNodes?.name?.parts) >= 2 && docOrNodeOrNodes.name.parts[1].startsWith(GCP_PREFIX);
}

module.exports = isGoogle;