import * as _ from 'cleaner-node';

const hasTags = node => {
  return _.isValidArray(node?.tags);
}

export default hasTags;