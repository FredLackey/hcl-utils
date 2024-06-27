const _ = require('cleaner-node');

const handleArgs = args => {

};

const handleOpts = (fnName, opts) => {
  if (!_.isValidObject(opts)) {
    throw new Error('Opts required');
  }
  return handleArgs({
    action: fnName,
    ...opts
  });
}

const setTag = opts => handleOpts('set', opts);
const clearTag = opts => handleOpts('clear', opts);
const findTag = opts => handleOpts('find', opts);
const showTag = opts => handleOpts('show', opts);
const removeTag = opts => handleOpts('remove', opts);

module.exports = {
  handleArgs,
  setTag,
  clearTag,
  findTag,
  showTag,
  removeTag
};
