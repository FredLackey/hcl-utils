import _ from 'cleaner-node';
import addTags from './add-tags.mjs';
import getTagValue from './get-tag-value.mjs';

const EMPTY_OK = true;

const addTag = (node, name, value) => {

  // Ensure the node has tags to work with.
  if (!addTags(node)) {
    throw new Error('Failed to add tags to node.');
  }

  if (!_.isValidString(value, EMPTY_OK)) {
    throw new Error('Value is required.');
  }

  const existingValue = getTagValue(node, name);
  if (value === existingValue) {
    return true;
  }

  const newTagLine  = `    ${name} = "${value}"`;
  const lastTagLine = node.tags.pop();

  node.tags.push(
    newTagLine,
    lastTagLine
  );

  const newNodeLines = [];
  let inTag = false;

  node.lines.forEach(line => {

    newNodeLines.push(line);

    if (line.trim().startsWith('tags = {')) {
      inTag = true;
      return;
    }

    if (inTag && line.trim() === '}') {

      newNodeLines.push(newTagLine);

      inTag = false;
      return;
    }

  });

  node.lineHash = _.hashLines(node.lines);
};

export default addTag;