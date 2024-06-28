const _    = require('cleaner-node');
const path = require('path');

const backupFile = (sourcePath, filePath, backupPath, date) => {

  if (!_.isValidString(backupPath)) {
    return; // Nothing to do.
  }
  if (_.isFolder(sourcePath) && !_.isFolder(backupPath)) {
    throw new Error('Backup path must be a folder.');
  }

  if (_.isFolder(backupPath)) {

    const folderName   = _.getBlockDate(date).substring(0, 12);
    const relativePath = filePath.substring(sourcePath.length);
    const targetFolder = path.join(backupPath, folderName);
    const targetPath   = path.join(targetFolder, relativePath);

    if (!_.makePath(targetFolder)) {
      throw new Error('Could not create backup folder.');
    }
    if (!_.copyFile(filePath, targetPath)) {
      throw new Error('Could not backup file.');
    }

    _.createFolder(backupPath);

  } else if (_.isFile(backupPath)) {

    const suffix     = _.getBlockDate(date).substring(0, 14);
    const targetPath = backupPath + '-' + suffix;

    if (!_.copyFile(filePath, targetPath)) {
      throw new Error('Could not backup file.');
    }

  }


};

module.exports = backupFile;