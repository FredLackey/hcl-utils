const _ = require('cleaner-node');
const findNodePositions = require('./find-node-positions');

const replaceNodeLines = (doc, node) => {

  const positions    = findNodePositions(doc, node);
  const firstDocPart = doc.slice(0, positions.start);
  const lastDocPart  = doc.slice(positions.end + 1);

  doc.lines = [
    ...firstDocPart,
    ...node.lines,
    ...lastDocPart
  ];

  // Ensure the document hash is up to date
  doc.hash.current = _.hashLines(doc.lines);

};

module.exports = replaceNodeLines;
