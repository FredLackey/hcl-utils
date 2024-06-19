import _ from 'cleaner-node';

const ALLOW_EMPTY_TAGS = true;

const hasTags = node => {
  return _.isValidArray(node?.tags, ALLOW_EMPTY_TAGS) && node.tags.length > 2;
}

export default hasTags;