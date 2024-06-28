const fs = require('fs');

const getFileSize = filePath => {
  try {
    const info = fs.lstatSync(filePath);
    return info.isFile() ? info.size : -1;
  } catch (e) {
    return undefined;
  }
};

module.exports = getFileSize;
