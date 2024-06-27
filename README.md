# HCL Utilities (`hcl-utils`)

Helper utilities for working with HCL (Terraform) files.

## Installation

```bash
npm install hcl-utils
```

## Usage

As you can see from the `v0.0.0` version number, development has just begun.  At the moment there is only one function available however this will grow over time.

### Set Tag (`setTag`)

```javascript
const { setTag } = require('hcl-utils');

const results = setTag({
  path      : 'path/to/terraform.tf',     // File or folder
  nodeQuery : 'resource.aws_instance',    // *.*.* format
  tagQuery  : 'project',                  // [name | name:value]
  key       : 'project',                  // Name of tag/label to set
  value     : 'ABC123',                   // Value to set
  quoted    : true,                       // Wrap value in quotes
  backupPath: 'path/to/terraform.tf.bak', // (optional) Backup file or folder
  save      : true                        // (optional) Save changes to file
});
```

-----

## Contact Info  

Feel free to contact me if you have any questions or are interested in contributing.

**Fred Lackey**  
[`http://fredlackey.com`](http://fredlackey.com)  
[`fred.lackey@gmail.com`](mailto:fred.lackey@gmail.com)
