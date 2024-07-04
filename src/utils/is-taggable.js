const _            = require('cleaner-node');
const { TAGGABLE } = require('./constants');

const isTaggable = node => {

  return node && _.isValidArray(node?.name?.parts)
    && node.name.parts.length === 3
    && TAGGABLE.includes(node.name.parts[1]);

};

module.exports = isTaggable;
