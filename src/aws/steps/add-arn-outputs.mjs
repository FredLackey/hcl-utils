import _ from 'cleaner-node';

const NODE_SUFFIX = 'arn';

const addArnOutputs = (data) => {

  data.nodes.filter(x => (x && x.nameHash && x.lineHash && x.parts[0] === 'resource')).forEach(resNode => {

    const outputNodeName = `${resNode.nameHash}_${NODE_SUFFIX}`;
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

    outputNode = {
      index: data.nodes.length,
      parts: ['output', outputNodeName],
      name,
      nameHash: _.hashString(name),
      lines,
      lineHash: _.hashLines(lines),
      tags: [],
      tagsAll: [],
    };

    data.nodes.push(outputNode);

  });

};

export default addArnOutputs;