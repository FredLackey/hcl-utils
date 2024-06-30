const _          = require('cleaner-node');
const isGoogle   = require('./is-google');
const hashLine   = require('./hash-line');

const getTagLines = node => {

  const prefix = isGoogle(node) ? 'labels' : 'tags';
  const result = [];

  let inTags = false;

  for (let i = 0; i < node.lines.length; i += 1) {

    const hash = hashLine(node.lines[i]);

    if (!inTags && hash.startsWith(`${prefix}={`)) {
      inTags = true;
    }

    if (inTags) {
      result.push(node.lines[i]);
    }

    if (inTags && hash.endsWith('}')) {
      return result;
    }

  }

};

module.exports = getTagLines;
