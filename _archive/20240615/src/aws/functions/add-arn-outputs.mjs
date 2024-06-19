import _ from 'cleaner-node';
import { UID_TAG_NAME } from '../data/defaults.mjs';
import parseFile from '../utils/parse-file.mjs';
import addArnOutputsStep from '../steps/add-arn-outputs.mjs';
import backupFileStep from '../steps/backup-file.mjs';
import saveToFileStep from '../steps/save-to-file.mjs';

const addArnOutputsFunction = async ({ filePath, newFilePath, backupPath, uidTag }) => {

  const data = await parseFile(
    filePath, 
    uidTag || UID_TAG_NAME
  );

  addArnOutputsStep(data);

  if (!backupFileStep(filePath, backupPath)) {
    console.error(`Failed to backup file: ${filePath}`);
    return false;
  }

  if (!saveToFileStep(data, newFilePath || filePath)) {
    console.error(`Failed to save to file: ${newFilePath || filePath}`);
    return false;
  }
  
  return true;
};

export default addArnOutputsFunction;