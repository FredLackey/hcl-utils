const _ = require('cleaner-node');

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

    value = parts.length === 3
      ? `${parts[0]}(${parts[1]}.${parts[2]})`
      : parts.length === 2
        ? `${parts[0]}(${parts[1]})`
        : parts.length === 1
          ? parts[0]
          :   null;

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

const validate = (filePath) => {
  if (!_.isValidString(filePath)) {
    return 'File path is required.';
  }
  if (!filePath.endsWith('.tf')) {
    return 'File must be a .tf file.';
  }
  return null;
};
const loadHcl = async (filePath) => {

  const err = validate(filePath);
  if (err) { return new Error(err); }

  const lines = await _.readLines(filePath);
  const hash = _.hashLines(lines);
  const doc  = {
    path  : filePath,
    backup: null, // Backup file path
    saved : false,
    lines,
    nodes: [],
    hash : {
      original: hash,
      current : hash
    }
  };

  doc.lines = _.removeComments(doc.lines);
  doc.hash  = _.hashLines(doc.lines);

  let node  = null;
  let level = 0;

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
        type : _.isValidArray(name?.parts) ? name.parts[0]: null,
        lines: [rawLine]
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
      node.hash = _.hashLines(node.lines);
      node      = null;
      continue;
    }

    if (hash.endsWith('{')) {
      level += 1;
      continue;
    }

    if (hash.endsWith('}')) {
      level -= 1;
      if (level < 0) {
        throw new Error('Invalid level detected.');
      }
      continue;
    }
  };
  
  // Ensure the document hash is up to date
  doc.hash.current = _.hashLines(doc.lines);

  return doc;
};

module.exports = loadHcl;