const _     = require('cleaner-node');
const _path = require('path');

const isValidNodeQuery = require('../utils/is-valid-node-query');
const isValidTagQuery  = require('../utils/is-valid-tag-query' );
const toError          = require('../utils/to-error');
const loadHclFiles     = require('../utils/load-hcl-files');
const findNodes        = require('../utils/find-nodes');
const getTagValue      = require('../utils/get-tag-value');
const modifyTag        = require('../utils/modify-tag');
const isTaggable       = require('../utils/is-taggable');

const validate = params => {

  const { path, nodeQuery, tagQuery, key, value, quoted, backupPath, save } = params;

  //#region Path
  if (!_.isString(path)) {
    return ['File or folder path is required.', 1];
  }
  if (!_.isFile(path) && !_.isFolder(path)) {
    return ['File or folder path is invalid.', 2];
  }
  if (_.isFile(path)) {
    return ['Only .tf files are supported.', 3];
  }
  let files = _.getFiles(path);
  if (!_.isValidArray(files)) {
    return ['Folder is empty.', 4];
  }
  files = files.filter(file => file.endsWith('.tf'));
  if (!_isValidArray(files)) {
    return ['No .tf files found.', 5];
  }
  //#endregion

  //#region Node Query
  if (!_.isValidString(nodeQuery)) {
    return ['Node query is required.', 6];
  }
  if (!isValidNodeQuery(nodeQuery)) {
    return ['Node query is invalid.', 7];
  }
  //#endregion

  //#region Tag Query
  if (!_.isValidString(tagQuery)) {
    return ['Tag query is required.', 8];
  }
  if (!isValidTagQuery(tagQuery)) {
    return ['Tag query is invalid.', 9];
  }
  //#endregion

  //#region Key / Value
  if (!_.isValidString(key)) {
    return ['Tag key is required.', 10];
  }
  if (!_.isValidString(value)) {
    return ['Tag value is required.', 11];
  }
  //#endregion

  //#region Quoted
  if (!_.isDefined(quoted) && !_.isBoolean(quoted)) {
    return ['Quoted flag is invalid.', 12];
  }
  //#endregion

  //#region Backup Path
  if (_.isFile(backupPath)){
    return ['Backup path cannot be an existing file.', 16];
  }
  if (_.isFile(path) && path === backupPath) {
    return ['Backup path is the same as the source path.', 15];
  }
  if (_.isValidString(backupPath) && !_.isFolder(backupPath) && !_.createPath(backupPath)) {
    return ['Backup path could not be created.', 17];
  }
  //#endregion

  //#region Save
  if (!_.isDefined(save) && !_.isBoolean(save)) {
    return ['Save flag is invalid.', 21];
  }
  //#endregion

  return null;

}
const setTag = params => {

  let err = validate(params);
  if (err) { return toError(err); }

  const { path, nodeQuery, tagQuery, key, value, quoted, backupPath, save } = params;

  const docs = loadHclFiles(path);

  for (d = 0; d < docs.length; d++) {

    let nodes = findNodes(docs[d], nodeQuery, tagQuery);
        nodes = nodes.filter(node => getTagValue(node, key) !== value);

    const untaggable = nodes.filter(node => !isTaggable(node));
    if (untaggable.length > 0) {
      docs[d].error = toError(['Some nodes are not taggable.', 13, untaggable]);
      continue;
    }

    for (t = 0; t < nodes.length; t++) {

      try {
        modifyTag(nodes[t], key, value, quoted)
      } catch (ex) {
        nodes[t].error = toError(['Error modifying tag.', 14, ex, nodes[t]]);
        continue;
      }

      if (save && nodes[t].hash.original !== nodes[t].hash.current) {

        const backupFile = _.isFolder(backupPath) 
          ? _path.join(backupPath, _.getFileName(path)) 
          : _.isValidString(backupPath)
            ? backupPath
            : null;

        if (backupFile && !_.copyFile(path, backupFile)) {
          nodes[t].error = toError(['Error backing up file.', 18, { source: path, target: backupFile } ]);
          continue;
        }

        node.backup = backupFile;

        if (!_.writeLines(path, doc.lines)) {
          nodes[t].error = toError(['Error writing file.', 19, path]);
        }
          
      }



    };
      
  };

  return err ? toError(err) : null;

};

module.exports = setTag;