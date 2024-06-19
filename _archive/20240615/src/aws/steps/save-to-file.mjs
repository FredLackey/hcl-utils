import _ from 'cleaner-node';
import getNewLines from '../utils/get-new-lines.mjs';

const saveToFile = (data, filePath) => {

  const newLines = getNewLines(data);

  return _.writeLines(filePath, newLines)
  
};

export default saveToFile;