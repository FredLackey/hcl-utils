const findNodePositions = require('./find-node-positions');

const getNodeSegment = (file, node) => {

  const { start, end } = findNodePositions(file, node);
  
  if (start < 0 || end < 0) {
    return {};
  }

  const prefix  = file.lines.clean.slice(0, start);
  const content = (end - start > 1) ? file.lines.clean.slice(prefix.length, end + 1) : [];
  const suffix  = file.lines.clean.slice(end + 1);
  
  return {
    prefix,
    content,
    suffix
  };
};

module.exports = getNodeSegment;
