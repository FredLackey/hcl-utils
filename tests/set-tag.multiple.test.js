const setTag = require('../src/set-tag');

const main = async () => {

  const results = await setTag({
    path  : '/Users/flackey/Source/fredlackey/public/hcl-utils/assets/samples/output - multiple',
    nodes : 'resource.aws_instance',
    tags  : 'Name=dev-proxy-a',
    key   : 'project',
    value : 'ABC123',
    backup: '/Users/flackey/Source/fredlackey/public/hcl-utils/assets/backups/multiple'
  });

  // const results = await setTag({
  //   path  : '/Users/flackey/Source/fredlackey/public/hcl-utils/assets/samples/output - single/main.tf',
  //   nodes : 'resource.aws_instance',
  //   tags  : 'Name=dev-proxy-a',
  //   key   : 'project',
  //   value : 'ABC123',
  //   backup: null
  // });

  // const results = await setTag({
  //   path  : '/Users/flackey/Source/fredlackey/public/hcl-utils/assets/samples/output - single/main.tf',
  //   nodes : 'resource.aws_instance',
  //   tags  : 'Name=dev-proxy-a',
  //   key   : 'project',
  //   value : 'ABC123',
  //   backup: null
  // });

  // const results = await setTag({
  //   path  : '/Users/flackey/Source/fredlackey/public/hcl-utils/assets/samples/output - single/main.tf',
  //   nodes : 'resource.aws_instance',
  //   tags  : 'project=ABC123',
  //   key   : 'another_project',
  //   value : 'BCDEFGH',
  //   backup: null
  // });

  // const results = await setTag({
  //   path  : '/Users/flackey/Source/fredlackey/public/hcl-utils/assets/samples/output - single/main.tf',
  //   nodes : 'resource.aws_instance',
  //   tags  : 'project',
  //   key   : 'project',
  // });

  console.log('set-tag.mulitple.test.js: done!');

};

main();
