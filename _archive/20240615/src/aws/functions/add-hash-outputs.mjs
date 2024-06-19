import _ from 'cleaner-node';
import parseFile from '../utils/parse-file.mjs';
import addHashOutputsStep from '../steps/add-hash-outputs.mjs';
import backupFileStep from '../steps/backup-file.mjs';
import saveToFileStep from '../steps/save-to-file.mjs';

const addNameOutputsFunction = async ({ filePath, newFilePath, backupPath }) => {

  const data = await parseFile(filePath);

  addHashOutputsStep(data);

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