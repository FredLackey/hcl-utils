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
  let insideTagBlock = false;
  let updatedLines = lines.map((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('resource ')) {
      const [, type, name] = trimmedLine.match(/resource\s+"([^"]+)"\s+"([^"]+)"/) || [];
      if (type && name) {
        resourceType = type;
        resourceInstance = name;
        insideResource = true;
        insideTagBlock = false;
      }
    }
    if (insideResource) {
      if (isGoogle(resourceType)) {
        if (trimmedLine.startsWith('labels = {') || trimmedLine.startsWith('labels = [')) {
          if ((resourceName === '*' || resourceName === `${resourceType}.${resourceInstance}` || resourceName === resourceType) && isTaggable(resourceType)) {
            insideTagBlock = true;
          }
        }
      } else {
        if (trimmedLine.startsWith('tags = {')) {
          if ((resourceName === '*' || resourceName === `${resourceType}.${resourceInstance}` || resourceName === resourceType) && isTaggable(resourceType)) {
            insideTagBlock = true;
          }
        }
      }
      if (insideTagBlock) {
        if (trimmedLine === '}' || trimmedLine === '],') {
          insideTagBlock = false;
          insideResource = false;
          const formattedValue = wrapInQuotes ? `"${tagValue}"` : tagValue;
          return [
            ...lines.slice(0, index),
            `    ${tagKey} = ${formattedValue}`,
            ...lines.slice(index)
          ].join('\n');
        } else if (trimmedLine.startsWith(`${tagKey} =`)) {
          const formattedValue = wrapInQuotes ? `"${tagValue}"` : tagValue;
          return line.replace(new RegExp(`(${tagKey} =).*`), `$1 ${formattedValue}`);
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