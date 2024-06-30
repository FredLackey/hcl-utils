
const hashLine = require('./hash-line');

const isOneLiner = line => hashLine(line).endsWith('{}');

module.exports = isOneLiner;
