const _ = require('cleaner-node');
const path = require('path');

const DATE_LENGTH = 'yyyymmddhhMMss'.length;
const DEFAULT_BACKUP_DIR = '_backup';

const getBackupRoot = (data, backup) => {
  if (_.isFolder(backup)) {
    return backup;
  }
  if (_.isFile(backup)) {
    return path.dirname(backup);
  }
  if (_.makePath(backup)) {
    return backup;
  }
  if (_.isFolder(data.path)) {
    return path.join(data.path, DEFAULT_BACKUP_DIR);
  }
  if (_.isFile(data.path)) {
    return path.join(path.dirname(data.path), DEFAULT_BACKUP_DIR);
  }
};
const getRelativePath = (data, file) => {
  if (data.path === file.path) {
    return path.basename(file.path);
  }
  if (_.isFolder(data.path)) {
    return file.path.replace(data.path, '');
  }
  throw new Error('Invalid relative path');
};

const getBackupPath = (data, file, backup) => {

  const datestamp    = _.getBlockDate(data.session).substring(0, DATE_LENGTH);
  const backupRoot   = getBackupRoot(data, backup);
  const backupDir    = path.join(backupRoot, datestamp);
  const relativePath = getRelativePath(data, file);

  return path.join(backupDir, relativePath);
  
};

module.exports = getBackupPath;
