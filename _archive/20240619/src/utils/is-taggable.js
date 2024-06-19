const { TAGGABLE } = require('./constants');

const isTaggable = resourceType => TAGGABLE.includes(resourceType);

module.exports = isTaggable;W