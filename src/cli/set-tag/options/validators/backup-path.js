const _ = require('cleaner-node');

const backupPath = opts => {
  if (_.isFile(opts?.backup)) {
    return 'Backup file already exists and cannot be overwrtten.';
  }
  if (_.isFolder(opts?.backup)) {
    return null; // Valid folder path
  }
  return null;
};

module.exports = backupPath;
