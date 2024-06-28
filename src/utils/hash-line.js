const _ = require('cleaner-node');

const hashLine = line => {

  const parts = line.split(' ')
    .map(x => _.unquote(x.trim()))
    .filter(x => _.isValidString(x))
    .join('');

  return parts;

};

module.exports = hashLine;
