const hashLine = require('./hash-line');

const isEmptyOneLiner = line => hashLine(line).endsWith('{}');

module.exports = isEmptyOneLiner;
