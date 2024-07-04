const _                = require('cleaner-node');
const isGoogle         = require('./is-google');
const isTaggable       = require('./is-taggable');
const hasTagLines      = require('./has-tag-lines');
const replaceNodeLines = require('./replace-node-lines');

const initTagLines = (file, node) => {

  if (hasTagLines(node)) {
    return;
  }

  if (!isTaggable(node)) {
    throw new Error('Node is not taggable');
  }

  const name   = isGoogle(node) ? 'labels' : 'tags';

  const taglines = [
    `  ${name} = {`,
    '  }'
  ];

  const lastLine = node.lines.pop();
  node.lines.push(...taglines);
  node.lines.push(lastLine);
  node.hash = _.hashLines(node.lines);

  replaceNodeLines(file, node);
  
};

module.exports = initTagLines;
