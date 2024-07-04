const _              = require('cleaner-node');
const getNodeSegment = require('./get-node-segment');

const replaceNodeLines = (file, node) => {

  const { prefix, suffix } = getNodeSegment(file, node);

  file.lines.clean = [
    ...prefix,
    ...node.lines,
    ...suffix
  ];

  file.hash.current = _.hashLines(file.lines.clean);

};

module.exports = replaceNodeLines;
