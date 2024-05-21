import _ from 'cleaner-node';

const hasTags = node => {
  return _.isValidArray(node?.tags) && node.tags.length > 2;
}

export default hasTags;