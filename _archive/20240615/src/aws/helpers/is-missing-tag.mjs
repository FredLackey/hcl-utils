import isTaggable from "./is-taggable.mjs";
import hasTag from "./has-tag.mjs";

const isMissingUidTag = (node, tagName) => {
  return isTaggable(node) && !hasTag(node, tagName);
}

export default isMissingUidTag;