const _            = require('cleaner-node'    );
const splitTagLine = require('./split-tag-line');
const isTaggable   = require('./is-taggable'   );

const getTags = (node) => {

  const item = {};

  if (!isTaggable(node)) {
    return item;
  }
  if (_.getArrayCount(node.tagLines) < 3) {
    return item;
  }

  let lines = [...node.tagLines];
  lines.pop();
  lines.shift();

  const tags = lines.map(splitTagLine).map(parts => ({
    key: parts.length === 2 ? parts[0] : null,
    value: parts.length === 2 ? parts[1] : null
  })).filter(x => x?.key).forEach(x => {
    item[x.key] = x.value;
  });

  return item;
};

module.exports = getTags;