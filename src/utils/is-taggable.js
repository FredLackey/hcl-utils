const _ = require('cleaner-node');

const { TAGGABLE } = require('./constants')

const isTaggable = node => {

  return _.isValidArray(node?.name?.parts)
    && node.name.parts.length === 3
    && TAGGABLE.includes(node.name.parts[2]);

}

module.exports = isTaggable;