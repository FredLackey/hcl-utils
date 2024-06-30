const _ = require('cleaner-node');

const getIndent = node => {
  if (!_.isValidArray(node?.lines)) {
    return null;
  }
  let prefix = '';
  for (let i = 0; i < node.lines.length; i += 1) {
    prefix = _.getPadPrefix(node.lines[i]);
    if (prefix.length > 0) {
      break;
    }
  }
  return prefix;
};

module.exports = getIndent;
