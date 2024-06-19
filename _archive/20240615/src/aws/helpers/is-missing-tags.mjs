import _ from 'cleaner-node';
import isTaggable from './is-taggable.mjs';

const isMissingTags = node => {
  return isTaggable(node) && !_.isValidArray(node?.tags);
}

export default isMissingTags;
