const _        = require('cleaner-node');
const hashLine = require('./hash-line' );

const splitTagLine = (tagLine) => {
  if (!_.isValidString(tagLine)) {
    return [];
  }
  const hash = hashLine(tagLine);
  if (hash.length < 3 || !tagLine.includes('=')) {
    return [];
  }
  const parts = _.splitFirst(tagLine, '=').map(x => _.unquote(x.trim())).filter(x => _.isValidString(x));
  if (parts.length !== 2) {
    return [];
  }
  return parts;
};

module.exports = splitTagLine;