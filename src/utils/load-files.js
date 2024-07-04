const _          = require('cleaner-node');
const hashLine   = require('./hash-line');
const isEmptyOneLiner = require('./is-empty-one-liner');
const trimLines  = require('./trim-lines');

const toName = line => {

  if (!_.isValidString(line)) {
    return null;
  }

  const hash = hashLine(line);
  
  if (hash.endsWith('{}')) {
    // value = line.substring(0, line.indexOf('{')).trim();
    // parts = [value];
    throw new Error('Invalid line detected.');
  }

  const parts = line.split(' ')
    .map(x => _.unquote(x))
    .filter(x => _.isValidString(x) && !x.includes('{') && !x.includes('}'));

  const value = parts.length === 3
    ? `${parts[0]}(${parts[1]}.${parts[2]})`
    : parts.length === 2
      ? `${parts[0]}(${parts[1]})`
      : parts.length === 1
        ? parts[0]
        : null;
  
  return {
    value,
    parts,
    hash: _.hashString(line.trim())
  };

};
const toType = nameParts => {
  if (!_.isValidArray(nameParts)) {
    return null;
  }
  return {
    tType: nameParts[0],
    pType: nameParts.length >= 1 ? nameParts[1] : null,
    pName: nameParts.length >= 2 ? nameParts[2] : null
  };
};
const loadFile = async (path) => {

  const rawLines   = await _.readLines(path);
  const cleanLines = _.removeComments(rawLines);

  const file       = {
    path,
    lines: {
      raw  : rawLines,
      clean: cleanLines
    },
    nodes: [],
    hash : {
      original: null,
      current : null
    }
  };

  let node  = null;
  let level = 0;

  for (let i = 0; i < file.lines.clean.length; i += 1) {

    const line = file.lines.clean[i];
    const hash = hashLine(line);

    if (isEmptyOneLiner(line)) {
      continue;
    }

    if (node) {
      node.lines.push(line);
    }

    if (!_.isValidString(line)) {
      continue;
    }

    if (!node && hash.endsWith('{')) {
      const name = toName(line);
      node = {
        name,
        ...toType(name.parts),
        lines: [line]
      };
      file.nodes.push(node);
      continue;
    }

    if (level === 0 && hash.endsWith('}') && !line.endsWith('"')) {
      if (!node) {
        console.log('Invalid node detected.');
      }
      node.hash          = {};
      node.hash.original = _.hashLines(trimLines(node.lines));
      node.hash.current  = node.hash.original;
      node               = null;
      continue;
    }

    if (hash.endsWith('{')) {
      level += 1;
      continue;
    }

    if (hash.endsWith('}') && !line.endsWith('"')) {
      level -= 1;
      if (level < 0) {
        throw new Error('Invalid level detected.');
      }
      continue;
    }
  }
  
  // Set the initial hash for the file
  file.hash.original = _.hashLines(trimLines(file.lines.clean));
  file.hash.current  = file.hash.original;

  return file;
};

const loadFiles = async (path) => {

  let files;

  if (_.isFile(path)) {
    files = [path];
  } else if (_.isFolder(path)) {
    files = _.walk(path).files.map(x => `${path}${x}`);
  } else {
    files = [];
  }

  files = files.filter(x => (x && x.endsWith('.tf')));

  for (let i = 0; i < files.length; i += 1) {
    files[i] = await loadFile(files[i]);
  }

  files = files.filter(x => (x && x.path));

  return {
    path,
    files
  };
};

module.exports = loadFiles;
