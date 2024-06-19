import _ from 'cleaner-node';
import parseFile from '../utils/parse-file.mjs';
import addNameOutputsStep from '../steps/add-name-outputs.mjs';
import backupFileStep from '../steps/backup-file.mjs';
import saveToFileStep from '../steps/save-to-file.mjs';

const addNameOutputsFunction = async ({ filePath, newFilePath, backupPath }) => {

  const data = await parseFile(filePath);

  addNameOutputsStep(data);

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

export default addNameOutputsFunction;