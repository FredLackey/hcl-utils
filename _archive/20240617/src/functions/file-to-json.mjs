import readLines from "../utils/read-lines.mjs";
import isValidString from "../utils/is-valid-string.mjs";
import isValidArray from "../utils/is-valid-array.mjs";
import isValidObject from "../utils/is-valid-object.mjs";
import comments from "../utils/comments/index.mjs";
import isOneLiner from "../helpers/is-one-liner.mjs";
import dequote from "../utils/dequote.mjs";

const toName = parts => {
  switch (parts.length) {
    case 3: 
      return `${parts[0]}(${parts[1]}.${parts[2]})`
    case 2:
      return `${parts[0]}(${parts[1]})`
    case 1:
      return parts[0];
    default:
      throw new Error(`Invalid parts: ${parts}`);
  }
}
const toNode = (rawLine, parent) => {
  const line  = rawLine.split('{')[0].trim();
  const parts = line.split(' ').map(x => dequote(x)).filter(x => isValidString(x));
  const node  = {
    type : parts[0],
    name : toName(parts),
    lines: [rawLine],
    parent,
  }
  if (parent) {
    parent.nodes = parent.nodes || [];
    parent.nodes.push(node);
  }
  return node;
}

const addProperties = node => {
  if (isValidArray(node, true)) {
    node.forEach(x => addProperties(x));
    return;
  }
  
  if (node.lines && node.lines.length > 2) {
    let lines = [...node.lines];
    lines.shift();
    lines.pop();
  
    // const lines = node.lines.slice(1, node.lines.length - 1).filter(x => isValidString(x) && x.includes('='));
    lines.forEach(line => {
      const parts = line.split('=').map(x => x.trim());
      const key   = parts[0];
      const value = dequote(parts[1]);
      node[key]   = value;
    });
  }

  [].concat(node.nodes)
    .filter(x => isValidObject(x))
    .forEach(x => addProperties(x));

}

const fileToJson = async (filePath) => {

  let rawLines = await readLines(filePath);
      rawLines = comments.multiLine.removeComments(rawLines);
      rawLines = rawLines.filter(x => isValidString(x))
    
  if (!isValidArray(rawLines)) {
    return undefined;
  }

  const doc   = {};
  let   node  = null;

  // Create the document heirarchy.
  rawLines.forEach(rawLine => {

    const line = comments.singleLine.removeComments(rawLine).trim();
    if (!isValidString(line)) {
      return;
    }

    if (isOneLiner(line)) {
      // Do not replace the current node if the line is a one-liner.
      toNode(line, (node || doc));
      return;
    }

    if (line.endsWith('{')) {
      node = toNode(line, (node || doc));
      return;
    }

    node.lines.push(line);

    if (line === '}') {
      node = node.parent;
      return;
    }

  })

  // Create properties for each node.
  addProperties(doc);

  return doc

};

export default fileToJson;
