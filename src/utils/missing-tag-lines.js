const isTaggable   = require('./is-taggable'   );
const hasTagsLines = require('./has-tags-lines');

const missingTagLines = node => {
  return isTaggable(node) && !hasTagsLines(node);
};

module.exports = missingTagLines;