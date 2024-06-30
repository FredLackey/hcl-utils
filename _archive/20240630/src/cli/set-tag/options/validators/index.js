const sourcePath = require('./source-path');
const recursive  = require('./recursive');

const nodeQuery = require('./node-query');

const backupPath = require('./backup-path');
const save       = require('./save');

module.exports = {
  sourcePath,
  recursive,

  nodeQuery,
  
  backupPath,
  save
};


/**
 * module.exports = {

  path     : { type: 'string', isPath: true, name: 'Path to HCL file or Terraform folder' },
  recursive: { type: 'boolean', name: 'Search child folders' },

  node     : { type: 'string', default: '*.*.*', name: 'Fully-qualified node name' },
  tag      : { type: 'string', default: '*', name: 'Tag query (key | key:value' },

  key      : { type: 'string', name: 'Name of tag or label to set' },
  value    : { type: 'string', name: 'Value of tag or label to set' },
  quote    : { type: 'boolean', default: true, name: 'Wrap the value in quotes' },

  backup   : { type: 'boolean', name: 'Backup file path or folder path' },
  save     : { type: 'boolean', default: false, name: 'Save changes back to file' },

 */
