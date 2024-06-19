import _ from 'cleaner-node';
import addTags from './add-tags.mjs';
import hasTag from './has-tag.mjs';

const removeTag = (node, name) => {

  if (!hasTag(node, name)) {
    return true;
  }

  // Ensure the node has tags to work with.
  if (!addTags(node)) {
    throw new Error('Failed to add tags to node.');
  }

  node.tags = node.tags.filter(x => !x.trim().startsWith(`${name} = `));

  const newNodeLines = [];
  let inTag = false;

  node.lines.forEach(line => {

    if (!isTag || !line.trim().startsWith(`${name} = `)) {
      newNodeLines.push(line);
      return;
    }

    if (line.trim().startsWith('tags = {')) {
      inTag = true;
      return;
    }

    if (inTag && line.trim() === '}') {
      inTag = false;
      return;
    }

  });

  node.lineHash = _.hashLines(node.lines);
};

export default addTag;