const _ = require('cleaner-node');

const toNodeList = value => {

  const result = [];

  // Handle main data file
  if (value?.files) {
    value.files.forEach(file => {
      result.push(...toNodeList(file));
    });
    return result;
  }

  // Handle individual file
  if (value?.nodes) {
    const nodes = [].concat(value.nodes).filter(x => _.isValidArray(x?.lines));
    result.push(...nodes);
    return result;
  }

  // Handle array of nodes
  if (_.isValidArray(value, true)) {
    return value.filter(x => (x?.name?.parts));
  }

  // Handle individual node
  if (value?.name) {
    return [].concat(value).filter(x => _.isValidArray(x?.lines));
  }

  throw new Error('Invalid value passed to toNodeList');

};

module.exports = toNodeList;
