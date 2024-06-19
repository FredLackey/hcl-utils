const { GCP_TAGGABLE } = require('./constants');

const isGoogle = resourceType => GCP_TAGGABLE.includes(resourceType);

module.exports = isGoogle;