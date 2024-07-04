const unsetTag = require('../src/unset-tag');

const main = async () => {

  // const results = await unsetTag({
  //   path  : '/Users/flackey/Source/fredlackey/public/hcl-utils/assets/samples/output - single/main.tf',
  //   nodes : 'resource.aws_instance',
  //   tags  : 'Name=dev-proxy-a',
  //   key   : 'project',
  //   value : 'ABC123',
  //   backup: '/Users/flackey/Source/fredlackey/public/hcl-utils/assets/backups/single'
  // });

  const results = await unsetTag({
    path  : '/Users/flackey/Source/fredlackey/public/hcl-utils/assets/samples/output - single/main.tf',
    nodes : 'resource.aws_instance',
    tags  : 'Name=dev-proxy-a',
    key   : 'project',
    backup: null 
  });

  console.log('unset-tag.mutiple.test.js: done!');

};

main();
