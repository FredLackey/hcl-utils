import * as _ from 'cleaner-node';
import { UID_TAG_NAME } from './data/defaults.mjs';
import parseFile from './utils/parse-file.mjs';
import getNewLines from './utils/get-new-lines.mjs';

const addArnOutputs = async (filePath, uidTag = UID_TAG_NAME) => {

  const data = await parseFile(filePath, uidTag);

  const resNodes = [].concat(data.nodes).filter(x => (x && x.parts[0] === 'resource'));
  for (let i = 0; i < resNodes.length; i++) {

    const resNode = resNodes[i];
    const arnNodeName = `${resNode.nameHash}_ARN`.toUpperCase();
    
    let arnNode = data.nodes.find(x => x && x.name === arnNodeName);
    if (arnNode?.value) {
      continue;
    };
  
    const lines = [
      `output "${arnNodeName}" {`,
      `  value = ${resNode.parts.join('.')}.arn`,
      `}`                                                                                                
    ];
    const name = `output(${arnNodeName})`;
    arnNode = {
      index: data.nodes.length,
      parts: ['output', arnNodeName],
      name,
      nameHash: _.hashString(name),
      lines,
      lineHash: _.hashLines(lines),
      tags: [],
      tagsAll: [],
    };

    data.nodes.push(arnNode);
  }

    

  

  const backupName = `${filePath}.${_.getBlockDate()}.bak`;
  if (!_.copyFile(filePath, backupName)) {
    throw new Error(`Failed to backup file: ${filePath}`);
  }

  const newLines = getNewLines(data);

  if (!_.writeLines(filePath, newLines)) {
    throw new Error(`Failed to write new lines to file: ${filePath}`);
  }

};

export default addArnOutputs;