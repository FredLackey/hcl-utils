import * as _ from 'cleaner-node';

const addUidTagsToData = (data, uidTag) => {

  // First, add the tag block and UID tag to nodes that do not have any tags at all.
  data.missingTags.forEach(node => {

    node.tags = [
      `  `,
      `  tags = {`,
      `    ${uidTag} = "${_.newUid()}"`,
      `  }`
    ];

    const lastNodeLine = node.lines.pop();
    node.lines.push(...node.tags, lastNodeLine);

  });

  // Next, add the UID tag to nodes that have tags but are missing the UID tag.
  data.missingUidTag.forEach(node => {

    const lastTagLine = node.tags.pop();
    const newLine = `    ${uidTag} = "${_.newUid()}"`;
    node.tags.push(newLine, lastTagLine);

    const newNodeLines = [];

    node.lines.forEach(line => {

      if (line.trim().startsWith('tags = {')) {
        newNodeLines.push('  tags = {');
        newNodeLines.push(newLine);
        return;
      }

      newNodeLines.push(line);
    });
  });

};

export default addUidTagsToData;