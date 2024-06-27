const _ = require('cleaner-node');

const isValidFile = file => {
  return _.isFile(file) && file.endsWith('.tf');
}

const findFiles = sourcePath => {

  if (!_.isString(sourcePath)) {
    throw new Error('Source path required');
  }
  if (!_.isFile(sourcePath) && !_.isDirectory(sourcePath)) {
    throw new Error('Invalid source path');
  }
  if (_.isFile(sourcePath) && !isValidFile(sourcePath)) {
    return [sourcePath];
  }
  
  const files = _.getFiles(sourcePath).filter(x => isValidFile(x));
  return files;

}

module.exports = findFiles;
