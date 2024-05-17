import isTaggable from '../helpers/is-taggable.mjs';
import hasTags from '../helpers/has-tags.mjs';

const isMissingTags = node => {
  return isTaggable(node) && !hasTags(node);
}

export default isMissingTags;
