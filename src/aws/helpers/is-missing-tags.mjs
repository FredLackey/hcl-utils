import isTaggable from './is-taggable.mjs';
import hasTags from './has-tags.mjs';

const isMissingTags = node => {
  return isTaggable(node) && !hasTags(node);
}

export default isMissingTags;
