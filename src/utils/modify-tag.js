const _                 = require('cleaner-node');
const getTagValue       = require('./get-tag-value');
const replaceNodeLines  = require('./replace-node-lines');
const initTagLines      = require('./init-tag-lines');
const parseTagLine          = require('./parse-tag-line');

const modifyTag = (doc, node, key, value, quoted) => {

  if (getTagValue(node, key) === value) {
    return;
  }

  initTagLines(doc, node);

  if (quoted) {
    value = _.unquote(value);
    value = `"${value}"`;
  }

  node.lines = node.lines.filter(x => (x && parseTagLine(x).key !== key));

  const lastLine = node.lines[node.lines.length - 1];
  node.lines.push(`    ${key} = ${value}`);
  node.lines.push(lastLine);
  node.hash = _.hashLines(node.lines);

  replaceNodeLines(doc, node);
};

module.exports = modifyTag;