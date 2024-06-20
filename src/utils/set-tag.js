const _               = require('cleaner-node'       )
const isTaggable      = require('./is-taggable'      )
const isGoogle        = require('./is-google'        )
const initTagLines    = require('./init-tag-lines'   )
const missingTagLines = require('./missing-tag-lines')
const getTagValue     = require('./get-tag-value'    )
const getIndent       = require('./get-indent'       )
const hashLine       = require('./hash-line'       )
const calculateHashes = require('./calculate-hashes'  )
const findNodes       = require('./find-nodes'       )

const DEFAULT_INDENT = ' ';

const validate = p => {
  if (!_.isObject(p.doc)) {
    return 'Invalid doc'
  }
  if (!_.isValidString(p.query)) {
    return 'Invalid query'
  }
  if (!_.isValidString(p.key) || !_.isValidString(_.unquote(p.key))) {
    return 'Invalid key'
  }
  if (isGoogle(p.doc) && _.isValidString(p.value)) {
    return 'Google does not allow tag values'
  }
  if (!isGoogle(p.doc) && !_.isValidString(p.value)) {
    return 'Invalid value'
  }
  return null;
}
const setTag = ({ doc, query, key, value, quoted = true }) => {

  const err = validate({ doc, query, key, value })
  if (err) { 
    throw new Error(err)
  }

  const nodes = findNodes(doc, query);
  if (nodes.length === 0) {
    return;
  }

  const untaggable = nodes.filter(node => !isTaggable(node));
  if (untaggable.length > 0) {
    throw new Error('Some selected nodes are not taggable.');
  }

  initTagLines(doc);
  
  const invalid = nodes.filter(missingTagLines);
  if (invalid.length > 0) {
    throw new Error('Some selected nodes missing tag lines.  Narrow the select criteria or initialize tag lines at the document level.');
  }

  const tagValue = quoted ? `"${value}"` : value;

  const needUpdating = nodes.filter(node => getTagValue(node, key) !== value);

  needUpdating.forEach(node => {

    const pad = node.tagLines.length >= 3 
      ? _.getPadPrefix(node.tagLines[1]) 
      : _.getPadPrefix(node.tagLines[0]) + DEFAULT_INDENT;

    const tagLine = `${pad}"${key}" = ${tagValue}`;

    node.tagLines = node.tagLines.filter(x => (x && !hashLine(x).startsWith(`"${key}"=`)));

    const lastLine = node.tagLines.pop();

    node.tagLines.push(tagLine);
    node.tagLines.push(lastLine);
    calculateHashes(node);

  });
  
  const verified = nodes.filter(node => getTagValue(node, key) === value);
  if (verified.length !== nodes.length) {
    throw new Error('Failed to set tag.');
  }

}

module.exports = setTag;