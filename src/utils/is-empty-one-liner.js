const hashLine = require('./hash-line');

const isEmptyOneLiner = line => {
  return line && hashLine(line).endsWith('{}');
};

module.exports = isEmptyOneLiner;
