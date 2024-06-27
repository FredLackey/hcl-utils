const _ = require('../src');

const FILE_PATH = '/Users/flackey/Source/fredlackey/public/hcl-utils/_assets/samples/20240423160337/resources.tf';

const main = async () => {
  const doc = await _.loadHcl(FILE_PATH);
  console.log(doc);
};

main();