const _ = require('../src');
const getNames = require('../src/utils/get-names');
const findNodes = require('../src/utils/find-nodes');

const FILE_PATH = '/Users/flackey/Source/fredlackey/public/hcl-utils/_assets/samples/20240423160337/resources.tf';

const main = async () => {
  const doc = await _.loadHcl(FILE_PATH);

  const query = 'resource.aws_iam_user';
  const nodes = findNodes(doc, query);

  const names = getNames(nodes);
  console.log(names.join('\n'));
};

main();