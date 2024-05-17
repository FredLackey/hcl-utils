import isTaggable from "../helpers/is-taggable.mjs";
import hasUidTag from "../helpers/has-uid-tag.mjs";

const isMissingUidTag = (node, tagName) => {
  return isTaggable(node) && !hasUidTag(node, tagName);
}

export default isMissingUidTag;