import _ from 'cleaner-node';
import hasTag from "./has-tag.mjs";

const getTagValue = (node, tagName) => {

  if (!hasTag(node, tagName)) {
    return null;
  }

  const line = node.tags.find(x => x && x.startsWith(`${tagName} = "`));
  if (!line) {
    return null;
  }

  return line.split('"')[1];

}

export default getTagValue;