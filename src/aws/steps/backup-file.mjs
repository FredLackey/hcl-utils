import _ from 'cleaner-node';
import path from 'path';

const backupFile = (filePath, backupPath) => {

  const backupFilePath = (backupPath && !_.isFolder(backupPath) && backupPath.includes(path.sep))
    ? backupPath
    : `${filePath}.${_.getBlockDate()}.bak`;

  return _.copyFile(filePath, backupFilePath);

};

export default backupFile;