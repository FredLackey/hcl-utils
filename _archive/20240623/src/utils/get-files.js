const _ = require('cleaner-node');

const getFiles = sourcePath => {

  if (_.isFile(sourcePath)) {
    return [sourcePath];
  }
  if (_.isFolder(sourcePath)) {
    return _.getFiles(sourcePath).filter(x => x.endsWith('.tf'));
  }
  throw new Error('Invalid source path');

};

module.exports = getFiles;