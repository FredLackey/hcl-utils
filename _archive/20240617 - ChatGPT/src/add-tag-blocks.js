const fs = require('fs');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { TAGGABLE, GCP_TAGGABLE } = require('./constants');
const isTaggable = key => TAGGABLE.includes(key);
const isGoogle = key => GCP_TAGGABLE.includes(key);

const argv = yargs(hideBin(process.argv))
  .option('file', {
    alias: 'f',
    description: 'Path to the Terraform HCL file',
    type: 'string',
    demandOption: true,
  })
  .option('name', {
    alias: 'n',
    description: 'The name of the resource(s) to be modified',
    type: 'string',
    demandOption: true,
  })
  .option('key', {
    alias: 'k',
    description: 'The name of the tag to set',
    type: 'string',
    demandOption: true,
  })
  .option('value', {
    alias: 'v',
    description: 'The value of the tag to set',
    type: 'string',
  })
  .option('quotes', {
    alias: 'q',
    description: 'Wrap tag value in quotes',
    type: 'boolean',
    default: true,
  })
  .help()
  .alias('help', 'h')
  .argv;

const updateTags = (content, resourceName, tagKey, tagValue, wrapInQuotes) => {
  const lines = content.split('\n');
  let insideResource = false;
  let resourceType = '';
  let resourceInstance = '';
  let updatedLines = lines.map((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('resource ')) {
      const [, type, name] = trimmedLine.match(/resource\s+"([^"]+)"\s+"([^"]+)"/) || [];
      if (type && name) {
        resourceType = type;
        resourceInstance = name;
        insideResource = true;
      }
    }
    if (insideResource) {
      const lineHash = trimmedLine.split(' ').join('');
      if (lineHash.startsWith('tags={')) {
        if ((resourceName === '*' || resourceName === `${resourceType}.${resourceInstance}` || resourceName === resourceType) && isTaggable(resourceType)) {
          insideResource = false;
          const formattedValue = wrapInQuotes ? `"${tagValue}"` : tagValue;
          if (isGoogle(resourceType)) {
            const tagsIndex = line.indexOf('tags');
            return `${line.slice(0, tagsIndex + 6)}${tagKey}"${line.slice(tagsIndex + 6)}`;
          } else {
            return line.replace('tags = {', `tags = {\n    ${tagKey} = ${formattedValue},`);
          }
        }
      }
      if (trimmedLine === '}') {
        insideResource = false;
      }
    }
    return line;
  });
  return updatedLines.join('\n');
};

fs.readFile(argv.file, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    process.exit(1);
  }

  const updatedContent = updateTags(data, argv.name, argv.key, argv.value, argv.quotes);

  fs.writeFile(argv.file, updatedContent, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file: ${err}`);
      process.exit(1);
    }
    console.log('Tags updated successfully.');
  });
});