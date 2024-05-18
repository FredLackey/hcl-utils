import fn from './aws/functions/add-arn-outputs.mjs';

const main = async () => {

  const success = await fn({ 
    filePath   : '/Users/flackey/Source/fredlackey/hcl-utils/samples/20240423160239/resources.tf',
    newFilePath: '/Users/flackey/Source/fredlackey/hcl-utils/src/test-output.tf',
    backupPath : '/Users/flackey/Source/fredlackey/hcl-utils/src/resources.tf.bak',
    uidTag : null
  });

  if (success) {
    console.log('Success');
  } else {
    console.log('Failed');
  }

};

main();

