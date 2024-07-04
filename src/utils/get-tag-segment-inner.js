const findTagPositions = require('./find-tag-positions');

const getTagSegmentInner = (node) => {

  const { start, end } = findTagPositions(node);
  
  if (start < 0 || end < 0) {
    return {};
  }

  const prefix  = node.lines.slice(0, start + 1);
  const content = (end - start > 1) ? node.lines.slice(prefix.length, end) : [];
  const suffix  = node.lines.slice(end);
  
  return {
    prefix,
    content,
    suffix
  };
};

module.exports = getTagSegmentInner;
