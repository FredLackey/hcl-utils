
import fileToJson from './functions/file-to-json.mjs';
import stringify from './utils/stringify.mjs';

const testFile = '/Users/flackey/Source/fredlackey/hcl-utils/samples/20240423160337/resources.tf';

const main = async () => {

  const data = await fileToJson(testFile);
  console.log(stringify(data));
}

main();