const isValidNode = require('./is-valid-node');

const getName = node => {
  return isValidNode(node) ? node.name.parts.join('.') : '';
}

module.exports = getName;