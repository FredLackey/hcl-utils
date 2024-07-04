const _             = require('cleaner-node');
const getBackupPath = require('./get-backup-path');
const path          = require('path');

const backupFiles = async (data, files, backup) => {

  for (let i = 0; i < files.length; i += 1) {
    
    const file       = files[i];
    const backupPath = getBackupPath(data, file, backup);
    const backupDir  = path.dirname(backupPath);

    if (!_.makePath(backupDir)) {
      file.error = 'Could not create backup directory.';
      continue;
    }

    if (!_.copyFile(file.path, backupPath)) {
      file.error = 'Could not create backup file.';
      continue;
    }

    file.backup = backupPath;

  }

  return !files.some(x => x.error);

};

module.exports = backupFiles;
