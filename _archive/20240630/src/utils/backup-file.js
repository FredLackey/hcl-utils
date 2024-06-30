const _    = require('cleaner-node');
const path = require('path');

const backupFile = (sourcePath, filePath, backupPath, date) => {

  if (!_.isValidString(backupPath)) {
    return; // Nothing to do.
  }

  const sourceIsFolder = _.isFolder(sourcePath);
  const targetIsFolder = _.isFolder(backupPath);
  const targetIsFile   = _.isFile(backupPath);

  if (sourceIsFolder && !targetIsFolder) {
    throw new Error('Backup path must be a folder when the source is a folder.');
  }

  const timestamp = targetIsFolder
    ? _.getBlockDate(date).substring(0, 12)
    : _.getBlockDate(date).substring(0, 14);

  if (targetIsFolder) {

    const relativePath = filePath.substring(sourcePath.length);
    const targetFolder = path.join(backupPath, timestamp);
    const targetPath   = path.join(targetFolder, relativePath);

    if (!_.makePath(targetFolder)) {
      throw new Error('Could not create backup folder.');
    }
    if (!_.copyFile(filePath, targetPath)) {
      throw new Error('Could not backup file.');
    }

    _.createFolder(backupPath);

  } else if (targetIsFile) {

    const targetPath = backupPath + '-' + timestamp;

    if (!_.copyFile(filePath, targetPath)) {
      throw new Error('Could not backup file.');
    }

  }


};

module.exports = backupFile;