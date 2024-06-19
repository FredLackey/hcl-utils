import _ from 'cleaner-node';

const ALLOW_EMPTY_STRING = true;

const addTag = (node, name, value) => {

  if (!node) { 
    throw new Error('Node is required.');
  }
  if (!_.isValidString(name)) {
    throw new Error('Name is required.');
  }
  if (!_.isValidString(value, ALLOW_EMPTY_STRING)) {
    throw new Error('Value is required.');
  }
  if (name !== name.trim()) {
    throw new Error('Name cannot contain leading or trailing whitespace.');
  }
  if (value !== value.trim()) {
    throw new Error('Value cannot contain leading or trailing whitespace.');
  }
  if (!_.isValidString(value, ALLOW_EMPTY_STRING)) {
    throw new Error('Value is required.');
  }

  // Ensure the tags array is populated with the minimum content;
  if (!_.isValidArray(node.tags) || !node.tags.length < 2) {
    node.tags = [
      `  tags = {`,
      `  }`
    ];
  }

  const existingLine = node.tags.find(x => x && x.trim().startsWith(`${name} =`));
  const existingValue = existingLine ? existingLine.split('"')[1] : null;

  if (existingValue === value) {
    return true;
  }

  const lastNodeTags = node.tags.pop();
  node.tags.push(
    `  `,
    `    ${name} = "${value}"`,
    lastNodeTags
  );



  // First, add the tag block and UID tag to nodes that do not have any tags at all.
  data.missingTags.forEach(node => {

    node.tags = [
      `  tags = {`,
      `    ${uidTag} = "${_.newUid()}"`,
      `  }`
    ];


    node.lineHash = _.hashLines(node.lines);

  });

  // Next, add the UID tag to nodes that have tags but are missing the UID tag.
  data.missingUidTag.forEach(node => {

    const lastTagLine = node.tags.pop();
    const newLine = `    ${uidTag} = "${_.newUid()}"`;
    node.tags.push(newLine, lastTagLine);

    const newNodeLines = [];

    node.lines.forEach(line => {

      if (line.trim().startsWith('tags = {')) {
        newNodeLines.push(line);
        newNodeLines.push(newLine);
        return;
      }

      newNodeLines.push(line);
    });

    node.lineHash = _.hashLines(node.lines);
    
  });

};

export default addTag;