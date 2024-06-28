const _     = require('cleaner-node');
const path = require('path');

const isValidNodeQuery = require('../utils/is-valid-node-query');
const isValidTagQuery  = require('../utils/is-valid-tag-query');
const toError          = require('../utils/to-error');
const loadHclFiles     = require('../utils/load-hcl-files');
const findNodes        = require('../utils/find-nodes');
const modifyTag        = require('../utils/modify-tag');
const isTaggable       = require('../utils/is-taggable');
const backupFile       = require('../utils/backup-file');

const validate = params => {

  const { source: path, nodeQuery, tagQuery, key, value, quoted, backupPath, save } = params;

  // #region Path
  if (!_.isString(source)) {
    return ['File or folder path is required.', 1];
  }
  if (!_.isFile(source) && !_.isFolder(source)) {
    return ['File or folder path is invalid.', 2];
  }
  if (_.isFile(source) && !source.endsWith('.tf')) {
    return ['Only .tf files are supported.', 3];
  }
  if (_.isFolder(source)) {
    const files = _.getFiles(source).filter(file => file.endsWith('.tf'));
    if (!_.isValidArray(files)) {
      return ['No .tf files found.', 5];
    }
  }
  // #endregion

  // #region Node Query
  if (!_.isValidString(nodeQuery)) {
    return ['Node query is required.', 6];
  }
  if (!isValidNodeQuery(nodeQuery)) {
    return ['Node query is invalid.', 7];
  }
  // #endregion

  // #region Tag Query
  if (!_.isValidString(tagQuery)) {
    return ['Tag query is required.', 8];
  }
  if (!isValidTagQuery(tagQuery)) {
    return ['Tag query is invalid.', 9];
  }
  // #endregion

  // #region Key / Value
  if (!_.isValidString(key)) {
    return ['Tag key is required.', 10];
  }
  if (!_.isValidString(value)) {
    return ['Tag value is required.', 11];
  }
  // #endregion

  // #region Quoted
  if (!_.isDefined(quoted) && !_.isBoolean(quoted)) {
    return ['Quoted flag is invalid.', 12];
  }
  // #endregion

  // #region Backup Path
  if (_.isFile(backupPath)) {
    return ['Backup path cannot be an existing file.', 16];
  }
  if (_.isFile(source) && source === backupPath) {
    return ['Backup path is the same as the source path.', 15];
  }
  if (_.isValidString(backupPath) && !_.isFolder(backupPath) && !_.createPath(backupPath)) {
    return ['Backup path could not be created.', 17];
  }
  // #endregion

  // #region Save
  if (!_.isDefined(save) && !_.isBoolean(save)) {
    return ['Save flag is invalid.', 21];
  }
  // #endregion

  return null;

};
const setTag = params => {

  const err = validate(params);
  if (err) { return toError(err); }

  const { source: path, nodeQuery, tagQuery, key, value, quoted, backupPath, save } = params;

  const start = new Date();
  const docs  = loadHclFiles(source);

  for (let d = 0; d < docs.length; d += 1) {

    docs[d].selected = findNodes(docs[d], nodeQuery, tagQuery);

    const untaggable = docs[d].selected.filter(x => (x && !isTaggable(x)));
    if (untaggable.length > 0) {
      docs[d].error = toError(['Some nodes are not taggable.', 13, untaggable]);
      continue;
    }

    for (let t = 0; t < docs[d].selected.length; t += 1) {

      try {
        modifyTag(docs[d], docs[d].selected[t], key, value, quoted);
      } catch (ex) {
        docs[d].selected[t].error = toError(['Error modifying tag.', 14, ex, docs[d].selected[t]]);
        continue;
      }

    }
      
    if (save && docs[d].hash.original !== docs[d].hash.current) {
      try {
        backupFile(source, docs[d].path, backupPath, start);
      } catch (ex) {
        docs[d].error = toError(['Error saving file.', 18, ex]);
        continue;
      }
    }
  }

  return {
    files: docs,
    error: _.isValidString(err) 
      ? toError([err, 20]) 
      : _.isValidObject(err) 
        ? err 
        : null
  };

};

module.exports = setTag;
