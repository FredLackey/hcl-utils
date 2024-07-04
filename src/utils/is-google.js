const _          = require('cleaner-node');
const toNodeList = require('./to-node-list');

const PROVIDER   = 'google';
const GCP_PREFIX = 'google_';

const isGoogle = (value) => {

  const nodes = toNodeList(value);
  if (!_.isValidArray(nodes)) {
    return false;
  }

  const providers = nodes.filter(x => x?.name?.parts?.length === 2 && x.name.parts[0] === 'provider');
  if (providers.length > 1) {
    throw new Error('Only one provider block is allowed');
  }
  if (providers.length === 1) {
    return providers[0].name.parts[1] === PROVIDER;
  }

  const resources = nodes.filter(x => x?.name?.parts?.length >= 2 && x.name.parts[0] === 'resource');
  return resources.some(x => x?.name?.parts?.length >= 2 && x.name.parts[1].startsWith(GCP_PREFIX));
};

module.exports = isGoogle;
