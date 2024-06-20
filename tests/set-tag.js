const _ = require('cleaner-node');
const loadHcl = require('../src/utils/load-hcl');
const findNodes = require('../src/utils/find-nodes');
const getTags = require('../src/utils/get-tags');
const getName = require('../src/utils/get-name');
const setTag = require('../src/utils/set-tag');

const FILE_PATH = '/Users/flackey/Source/fredlackey/public/hcl-utils/_assets/samples/20240423160337/resources.tf';

const main = async () => {

  const doc = await loadHcl(FILE_PATH);

  const params = { 
    doc, 
    query : 'resource.aws_iam_user',
    key : 'Project',
    value : 'ABC123', 
  //   quoted = true 
  }

  setTag(params);
  
  const nodes = findNodes(doc, params.query);
  nodes.forEach((node) => {

    const name = getName(node);
    const tags = getTags(node);

    if (Object.keys(tags).length === 0) {
      console.log([
        name,
        '  (no tags)'
      ].join('\n'));
      return;
    };

    const output = _.toColumn(Object.keys(tags)).map(key => `  ${key} : ${tags[key.trim()]}`);
    console.log([
      name,
      ...output
    ].join('\n'));

  });

};

main();