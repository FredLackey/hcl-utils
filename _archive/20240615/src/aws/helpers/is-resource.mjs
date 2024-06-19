import _ from 'cleaner-node';

const isResource = node => {
  return _.isValidArray(node?.parts) && node.parts[0] === 'resource';
}

export default isResource;