import isTaggable from "./is-taggable.mjs";
import hasUidTag from "./has-uid-tag.mjs";

const isMissingUidTag = (node, tagName) => {
  return isTaggable(node) && !hasUidTag(node, tagName);
}

export default isMissingUidTag;