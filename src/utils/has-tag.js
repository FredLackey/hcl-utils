const _ = require('cleaner-node');

const splitTagLine = require('./split-tag-line');

const hasTag = (node, key) => {
  const lines = [].concat(node.tagLines || [])
    .filter(x => splitTagLine(x).length === 2 && splitTagLine(x)[0] === key);
  return lines.length === 1;
};

module.exports = hasTag;