const isTaggable   = require('./is-taggable'   );
const hasTagLines = require('./has-tags-lines');

const isMissingTags = node => {
  return isTaggable(node) && !hasTagLines(node);
};

module.exports = isMissingTags;