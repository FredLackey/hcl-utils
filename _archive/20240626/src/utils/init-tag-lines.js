const _               = require('cleaner-node'              );
const missingTagLines = require('./missing-tag-lines');
const getIndent       = require('./get-indent'       );
const isGoogle        = require('./is-google'        );
const toNodeList      = require('./to-node-list'      );
const calculateHashes = require('./calculate-hashes'  );

const initTagLines = docOrNodeOrNodes => {

  const allNodes = toNodeList(docOrNodeOrNodes);
  const targetNodes = allNodes.filter(missingTagLines);
  if (!_.isValidArray(targetNodes)) {
    return;
  }

  const sampleNode = allNodes.find(x => (x && x.lines.length > 2));
  if (!sampleNode) {
    return;
  }

  const name = isGoogle(docOrNodeOrNodes) ? 'labels' : 'tags';
  const indent = getIndent(sampleNode);

  targetNodes.forEach(node => {
    const taglines = [
      `${indent}${name} = {`,
      `}`
    ];
    const lastLine = node.lines.pop();
    node.lines.push(...taglines);
    node.lines.push(lastLine);
    calculateHashes(node);
  });

}

module.exports = initTagLines;