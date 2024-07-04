const findTagPositions = require('./find-tag-positions');

const getTagSegment = (node) => {

  const { start, end } = findTagPositions(node);
  
  if (start < 0 || end < 0) {
    return {};
  }

  const prefix  = node.lines.slice(0, start);
  const content = (end - start > 1) ? node.lines.slice(prefix.length, end + 1) : [];
  const suffix  = node.lines.slice(end + 1);
  
  return {
    prefix,
    content,
    suffix
  };
};

module.exports = getTagSegment;
