const _                = require('cleaner-node');
const findTagPositions = require('./find-tag-positions');
const getTagValue      = require('./get-tag-value');
const hasTag           = require('./has-tag');
const initTagLines     = require('./init-tag-lines');
const hashLine         = require('./hash-line');
const replaceNodeLines = require('./replace-node-lines');
const getTagSegmentInner = require('./get-tag-segment-inner');

const MODES = {
  ADD    : 'add',
  REMOVE : 'remove',
  REPLACE: 'replace',
  SKIP   : 'skip'
};

const getMode = (node, key, value) => {

  const exists = hasTag(node, key);
  if (!exists && value) {
    return MODES.ADD;
  }
  if (exists && !value) {
    return MODES.REMOVE;
  }

  if (value === getTagValue(node, key)) {
    return MODES.SKIP;
  } 

  return MODES.REPLACE;

};

const addTag = (node, key, value, quote) => {

  const { prefix, content, suffix } = getTagSegmentInner(node);

  return [
    ...prefix,
    `    ${key} = ${quote ? `"${value}"` : value}`,
    ...content,
    ...suffix
  ];
};
const removeTag = (node, key) => {

  const { prefix, content, suffix } = getTagSegmentInner(node);

  const newContent = content.filter(x => !hashLine(x).startsWith(`${key}=`));

  return [
    ...prefix,
    ...newContent,
    ...suffix
  ];
};
const replaceTag = (node, key, value, quote) => {

  const { start, end } = findTagPositions(node);
  if (start < 0 || end < 0) {
    throw new Error('Could not find tag positions.');
  }

  const prefix  = node.lines.slice(0, start + 1);
  let   content = (end - start > 1) ? node.lines.slice(start + 1, end) : [];
  const suffix  = node.lines.slice(end);

  content = content.filter(x => (!x || !hashLine(x).startsWith(`${key}=`)));

  return [
    ...prefix,
    `    ${key} = ${quote ? `"${value}"` : value}`,
    ...content,
    ...suffix
  ];
};

const modifyTag = ({ file, node, key, value, quote }) => {

  const mode = getMode(node, key, value);
  if (mode === MODES.SKIP) {
    return;
  }

  if (mode === MODES.ADD) {
    initTagLines(file, node);
    node.lines = addTag(node, key, value, quote);
  }

  if (mode === MODES.REMOVE) {
    node.lines = removeTag(node, key);
  }

  if (mode === MODES.REPLACE) {
    node.lines = replaceTag(node, key, value, quote);
  }

  node.hash.current = _.hashLines(node.lines);

  replaceNodeLines(file, node);

};

module.exports = modifyTag;
