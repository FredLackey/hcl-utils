const _ = require('cleaner-node');
const isTaggable = require('./is-taggable');
const isGoogle = require('./is-google');
const hasTagsLines = require('./has-tags-lines');

const initTags = doc => {
  if (!doc || isGoogle(doc)) {
    return;
  }
  const nodes = doc.nodes.filter(x => isTaggable(x));
  const missing = nodes.filter(x => x && !_.isValidArray(x.tagLines, true));
  const empty = nodes.filter(x => x && _.isValidArray(x.tagLines) && x.tagLines.length < 3);

  doc.nodes.filter(x => (isTaggable(x) && _.isValidArray(x.lines))).forEach(node => {
    if (!node.tagLines) {
      node.tagLines = [];
    }
  });

}