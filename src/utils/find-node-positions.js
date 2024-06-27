const isOneLiner = require('./is-one-liner');

const findNodePositions = (doc, firstLine) => {

  const start = doc.lines.findIndex(x => x === firstLine);
  if (start === -1) {
    throw new Error(`Could not find first line: ${firstLine}`);
  }
  if (isOneLiner(firstLine)) {
    return { start, end: start };
  }

  let level = 0;
  let end = start;
  for (let i = start + 1; i < lines.length; i += 1) {
    
    const line = lines[i];
    if (isOneLiner(line)) {
      continue;
    }

    if (line.endsWith('}')) {
      level -= 1;
    }
    if (level === 0) {
      end = i;
      break;
    }
    if (line.endsWith('{')) {
      level += 1;
    }
  }

  return { start, end };

};

module.exports = findNodePositions;