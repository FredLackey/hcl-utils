const _ = require('cleaner-node');

const hasTagsLines = (node, emptyOkay = true) => {
  if (!_.isValidArray(node?.tagLines)) {
    return false;
  }
  if (!emptyOkay && node.tagLines < 3) {
    return false;
  }
  const lines = node.tagLines.filter(x => (x && x.includes('=')));
  return emptyOkay || lines.length >= 1;
}

module.exports = hasTagsLines;