const _ = require('cleaner-node');
const isGoogle = require('./is-google')
const calculateHashes = require('./calculate-hashes');

const IGNORED_HASHES = [
  'tags={}',
  'tags={},',
  'labels={}',
  'labels={},',
];

const toName = line => {

  let value = '';
  let parts = [];

  const hash = line.split(' ').filter(_.isValidString).join('');
  
  if (hash.endsWith('{}')) {

    value = line.substring(0, line.indexOf('{')).trim();
    parts = [value];

  } else {

    parts = line.split(' ')
      .map(x => _.unquote(x))
      .filter(x => _.isValidString(x) && !x.includes('{') && !x.includes('}'));

    value  = parts.length === 3
      ? `${parts[0]}(${parts[1]}.${parts[2]})`
      : parts.length === 2
        ? `${parts[0]}(${parts[1]})`
        : parts.length === 1
          ? parts[0]
          : null;      

  }

  if (!_.isValidString(value)) {
    return null;
  }
  
  return {
    value,
    parts,
    hash: _.hashString(value)
  };

};

const initAttributes = (node) => {

  if (node.tagLines.length < 3) {
    return;
  }
  
  const lines = [...node.tagLines];
  lines.shift();
  lines.pop();
  
  lines.forEach(line => {

    if (!line.includes('=')) {
      throw new Error('Invalid tag line detected.');
    };
    
    const parts = line.split('=').map(x => x.trim());
    if (parts.length !== 2) {
      return;
    }
    
    const key = parts[0];
    const value = _.unquote(parts[1]);
    
    if (_.isValidString(key) && _.isValidString(value)) {
      node.tags = node.tags || {};
      node.tags[key] = value;
    }
  });

};
const initAttributesLines = (node) => {

  const prefix = isGoogle(node) ? 'labels' : 'tags';

  node.tagLines = [];

  let inLines   = false;

  for (let i = 0; i < node.lines.length; i += 1) {

    const line = node.lines[i];
    const hash = line.split(' ').filter(_.isValidString).join('');

    if (!inLines && hash.startsWith(`${prefix}={}`)) {
      continue;
    }
    if (!inLines && hash === `${prefix}={`) {
      inLines = true;
      node.tagLines.push(line);
      continue;
    };
    if (inLines && hash.endsWith('}')) {
      inLines = false;
      node.tagLines.push(line);
      return;
    }
    if (inLines) {
      node.tagLines.push(line); 
    }
  }

}

const loadHcl = async (filePath) => {

  const doc  = {
    lines: await _.readLines(filePath),
    nodes: [],
  };

  let node   = null;
  let level  = 0;

  for (let i = 0; i < doc.lines.length; i += 1) {

    const rawLine = doc.lines[i];
    const line    = rawLine.trim();
    const hash    = line.split(' ').filter(_.isValidString).join('');

    if (node) {
      node.lines.push(rawLine);
    }
    if (!_.isValidString(line) || IGNORED_HASHES.includes(hash)) {
      continue;
    }

    if (!node && (hash.endsWith('{') || hash.endsWith('{}'))) {
      const name = toName(line);
      node = {
        name,
        type    : _.isValidArray(name?.parts) ? name.parts[0] : null,
        lines   : [rawLine]
      };
      doc.nodes.push(node);
      if (hash.endsWith('{}')) {
        node = null;
      }
      continue;
    }

    if (hash.endsWith('{}')) {
      continue;
    }

    if (level === 0 && hash.endsWith('}')) {
      node = null;
      continue;
    }

    if (hash.endsWith('{')) {
      level += 1;
      continue;
    }

    if (hash.endsWith('}')) {
      level -= 1;
      if (level < 0) {
        throw new Error('Invalid level detected.')
      }
      continue;
    }
  };

  doc.nodes.forEach(node => {

    initAttributesLines(node);
    initAttributes(node);
    calculateHashes(node);

  });

  return doc;

};

module.exports = loadHcl;