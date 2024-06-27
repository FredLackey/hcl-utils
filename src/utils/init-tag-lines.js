const _                = require('cleaner-node');
const getIndent        = require('./get-indent');
const isGoogle         = require('./is-google' );
const isTaggable       = require('./is-taggable');
const replaceNodeLines = require('./replace-node-lines');

const initTagLines = (doc, node) => {

  if (!isTaggable(node)) {
    throw new Error('Node is not taggable');
  };

  if (_.isValidArray(node.taglines)) {
    return;
  }

  const name   = isGoogle(node) ? 'labels' : 'tags';
  const indent = getIndent(sampleNode);

  const taglines = [
    `${indent}${name} = {`,
    `${indent}}`
  ];

  const lastLine = node.lines.pop();
  node.lines.push(...taglines);
  node.lines.push(lastLine);
  node.hash = _.hashLines(node.lines);

  replaceNodeLines(doc, node);
  
}

module.exports = initTagLines;