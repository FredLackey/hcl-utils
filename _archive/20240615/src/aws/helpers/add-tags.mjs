import _ from 'cleaner-node';
import hasTags from './has-tags.mjs';

const addTags = (data) => {

  if (hasTags(data)) {
    return true;
  }

  node.tags = [
    `  tags = {`,
    `    ${uidTag} = "${_.newUid()}"`,
    `  }`
  ];

  const lastNodeLine = node.lines.pop();
  node.lines.push(
    `  `,
    ...node.tags, 
    lastNodeLine
  );

  node.lineHash = _.hashLines(node.lines);

  return true;
  
};

export default addTags;