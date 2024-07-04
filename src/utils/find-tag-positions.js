const getTagLines = require('./get-tag-lines');

const findTagPositions = (node) => {

  const tagLines = getTagLines(node);
  if (tagLines.length < 0) {
    return { start: -1, end: -1 };
  }

  return {
    start: node.lines.indexOf(tagLines[0]),
    end  : node.lines.indexOf(tagLines[tagLines.length - 1])
  };

};

module.exports = findTagPositions;
