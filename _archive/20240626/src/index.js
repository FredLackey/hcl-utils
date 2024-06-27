const validateOpts      = require('./lib/validate-opts');
const loadHclFile       = require('./lib/load-hcl');
const determineProvider = require('./lib/determine-provider');
  // const addTagBlocks      = require('./lib/add-tag-blocks');

const findNodes = require('./utils/find-nodes');
const setTag    = require('./utils/set-tag');
const clearTag  = require('./utils/clear-tag');

const handleOpts = (fnName, opts) => {

  validateOpts(opts);

  const doc = loadHclFile(opts);
  determineProvider(doc);
  // addTagBlocks(doc);

  const nodes = findNodes(doc, opts.nodeQuery, opts.tagQuery);

  if (fnName === 'set') {
    setTag(doc, nodes, opts.key, opts.value, opts.quoted);
  }
  if (fnName === 'clear') {
    clearTag(doc, nodes, opts.key);
  }



  
  // Common Steps
  // 6. Select the nodes using 'nodeQuery'
  // 7. Filter the nodes using 'tagQuery'

}

const setTag = opts => handleOpts('set', opts);
const clearTag = opts => handleOpts('clear', opts);
const findTag = opts => handleOpts('find', opts);
const showTags = opts => handleOpts('show', opts);

module.exports = {
  handleOpts,
  setTag,
  clearTag,
  findTag,
  showTags,
};