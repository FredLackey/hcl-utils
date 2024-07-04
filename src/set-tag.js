const loadFiles   = require('./utils/load-files');
const findNodes   = require('./utils/find-nodes');
const modifyTag   = require('./utils/modify-tag');
const backupFiles = require('./utils/backup-files');
const saveFiles   = require('./utils/save-files');

/**
 * Sets a tag on specified nodes in files located at the given path.
 * 
 * @param {Object} options - The options for setting the tag or label.
 * @param {string} options.path - Path to HCL file or Terraform folder.
 * @param {string} options.nodes - Node Query syntax in *.*.* format.
 * @param {string} options.tags - Tag Query syntax in `project` or `project=ABC123` format.
 * @param {string} options.key - The key of the tag or label to modify.
 * @param {string} options.value - The new value for the tag or label.
 * @param {boolean} [options.backup] - Destination for original unmodified backups.
 * @param {boolean} [options.save=true] - Whether to save the modified files. Defaults to true.
 * @param {boolean} [options.quote=true] - Whether to quote the tag value. Defaults to true.
 * @returns {Promise<Object>} - A promise that resolves to the modified data object.
 */
const setTag = async ({ path, nodes, tags, key, value, backup, save = true, quote = true }) => {

  const data         = await loadFiles(path);
        data.session = new Date();

  data.files.filter(x => x?.nodes).forEach(file => {
    findNodes(file.nodes, nodes, tags).forEach(node => {
      modifyTag({ file, node, key, value, quote });
    });
  });

  const modified = data.files.filter(x => (x?.hash?.original !== x?.hash?.current));
  if (modified.length === 0) {
    return data;
  }

  let success = true;

  success = success && save && await backupFiles(data, modified, backup);
  success = success && save && await saveFiles(data, modified);

  return data;

};

module.exports = setTag;
