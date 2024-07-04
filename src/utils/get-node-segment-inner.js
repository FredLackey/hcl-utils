const findNodePositions = require('./find-node-positions');

const getNodeSegmentInner = (file, node) => {

  const { start, end } = findNodePositions(file, node);
  
  if (start < 0 || end < 0) {
    return {};
  }

  const prefix  = file.lines.slice(0, start + 1);
  const content = (end - start > 1) ? file.lines.slice(prefix.length, end) : [];
  const suffix  = file.lines.slice(end);
  
  return {
    prefix,
    content,
    suffix
  };
};

module.exports = getNodeSegmentInner;
