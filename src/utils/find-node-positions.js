const isEmptyOneLiner = require('./is-empty-one-liner');
const _ = require('cleaner-node');

const findNodePositions = (file, node) => {

  const start = file.lines.clean.indexOf(node.lines[0]);
  if (start === -1) {
    throw new Error('Could not find first line of node.');
  }
  if (node.lines.length === 1) {
    return { start, end: start };
  }

  let level = 0;
  let end = start;
  for (let i = start + 1; i < file.lines.clean.length; i += 1) {
    
    const line = file.lines.clean[i];
    if (!_.isValidString(line)) {
      continue;
    }
    if (isEmptyOneLiner(line)) {
      continue;
    }

    if (level === 0 && line.trim().endsWith('}')) {
      end = i;
      break;
    }
    if (line.trim().endsWith('{')) {
      level += 1;
      continue;
    }
    if (line.trim().endsWith('}')) {
      level -= 1;
    }
  }

  return { start, end };

};

module.exports = findNodePositions;
