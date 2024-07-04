const setTag = require('./set-tag');

/**
 * Removes a tag from specified nodes in files located at the given path.
 * 
 * @param {Object} options - The options for setting the tag or label.
 * @param {string} options.path - Path to HCL file or Terraform folder.
 * @param {string} options.nodes - Node Query syntax in *.*.* format.
 * @param {string} options.tags - Tag Query syntax in `project` or `project=ABC123` format.
 * @param {string} options.key - The key of the tag or label to modify.
 * @param {boolean} [options.backup] - Destination for original unmodified backups.
 * @param {boolean} [options.save=true] - Whether to save the modified files. Defaults to true.
 * @returns {Promise<Object>} - A promise that resolves to the modified data object.
 */
const unsetTag = async ({ path, nodes, tags, key, backup, save = true }) => {
  return setTag({ path, nodes, tags, key, value: null, backup, save });
};

module.exports = unsetTag;
