const _ = require('cleaner-node');

const sourcePath = opts => {
  if (!_.isValidString(opts?.path)) {
    return 'Path is required.';
  }
  if (!_.isFile(opts.path) && !_.isFolder(opts.path)) {
    return 'Path does not exist.';
  }
  return null;
};

module.exports = sourcePath;
