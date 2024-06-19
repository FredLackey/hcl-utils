import _ from 'cleaner-node';

const isHclFile = (filePath) => {

  return _.isValidString(filePath) && filePath.endsWith('.tf');

};

export default isHclFile;