const _ = require('cleaner-node');

const validateArgs = args => {
  if (!_.isBoolean(args.overwrite)) {
    return 'Invalid overwrite. Must be a boolean.';
  }

  //#region Source
  if (!_.isValidString(args.source)) {
    return 'Source path is required.';
  }
  if (!_.isFile(args.source) && !_.isFolder(args.source)) {
    return 'Source path must be a file or a directory.';
  }
  //#endregion
  
  //#region Target
  if (!_.isValidString(args.target) && !args.overwrite) {
    return 'Target is required when overwrite is false.';
  }
  if (args.target === args.source && !args.overwrite) {
    return 'Target must be different from source when overwrite is false.';
  }
  //#endregion

  //#region Backup
  if (args.backup && !_.isFolder(args.backup)) {
    return 'Backup must be a directory.';
  }
  if (args.backup && args.source === args.backup) {
    return 'Backup must be different from source.';
  }
  if (args.backup && args.target === args.backup) {
    return 'Backup must be different from target.';
  }
  //#endregion

};