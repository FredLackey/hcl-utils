import * as _ from 'cleaner-node';

const NODE_SUFFIX = 'ARN';

const addArnOutputs = async (data) => {

  data.nodes.filter(x => (x && x.nameHash && x.lineHash && x.parts[0] === 'resource')).forEach(resNode => {

    const outputNodeName = `${resNode.nameHash}_${NODE_SUFFIX}`.toUpperCase();
    let   outputNode     = data.nodes.find(x => x && x.name === outputNodeName);
    
    if (outputNode?.value) {
      return;
    };

    const lines = [
      `output "${outputNodeName}" {`,
      `  value = ${resNode.parts.join('.')}.arn`,
      `}`
    ];
    const name = `output(${outputNodeName})`;

    arnNode = {
      index: data.nodes.length,
      parts: ['output', hashNodeName],
      name,
      nameHash: _.hashString(name),
      lines,
      lineHash: _.hashLines(lines),
      tags: [],
      tagsAll: [],
    };

    data.nodes.push(arnNode);

  });

};

export default addArnOutputs;