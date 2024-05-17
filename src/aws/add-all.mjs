import * as _ from 'cleaner-node';
import { UID_TAG_NAME } from './data/defaults.mjs';
import parseFile from './utils/parse-file.mjs';
import addUidTagsToData from './utils/add-uid-tags-to-data.mjs';
import getNewLines from './utils/get-new-lines.mjs';
import setUids from './utils/set-uids.mjs';

const addAll = async (filePath, uidTag = UID_TAG_NAME) => {

  const data = await parseFile(filePath, uidTag);

  addUidTagsToData(data, uidTag);
  setUids(data, uidTag);







  const backupName = `${filePath}.${_.getBlockDate()}.bak`;
  if (!_.copyFile(filePath, backupName)) {
    throw new Error(`Failed to backup file: ${filePath}`);
  }

  const newLines = getNewLines(data);

  if (!_.writeLines(filePath, newLines)) {
    throw new Error(`Failed to write new lines to file: ${filePath}`);
  }

};

export default addAll;