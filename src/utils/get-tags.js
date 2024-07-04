const _           = require('cleaner-node');
const getTagLines = require('./get-tag-lines');
const trimLines   = require('./trim-lines');

const toItem = value => {

  const pos = value.indexOf('=');
  if (pos < 0 || value.trim().endsWith('=')) {
    return {};
  }

  const key = value.substring(0, pos).trim();
  const val = value.substring(pos + 1).trim();

  return {
    key  : _.unquote(key.trim()),
    value: _.unquote(val.trim())
  };

};

const getTags = node => {

  const lines = trimLines(getTagLines(node)).filter(x => _.isValidString(x));

  if (lines.length === 0 || lines.length === 2) {
    return [];
  }

  if (lines.length === 1) {

    const parts = lines[0].split('{').map(x => x.trim());
    if (parts.length < 2) {
      throw new Error('Invalid tags');
    }
    parts[1] = parts[1].trim().substring(0, parts[1].length - 1).trim();

    const item = toItem(parts[1]);
    return [item];

  }

  lines.shift();
  lines.pop();

  return lines.map(x => toItem(x)).filter(x => _.isValidString(x?.key));

};

module.exports = getTags;
