import * as _ from 'cleaner-node';
import hasTags from "../helpers/has-tags.mjs";

const hasUidTag = (node, tagName) => {
  if (!hasTags(node)) {
    return false;
  }
  if (!_.isValidString(tagName)) {
    throw new Error('Invalid tag name');
  }
  const lines = node.tags.filter(x => x && x.startsWith(`${tagName} = "`));
  if (lines.length > 1) {
    throw new Error('Multiple UID tags found');
  }
  return lines.length === 1;
}

export default hasUidTag;