# HCL Utilities (`hcl-utils`)

Helper utilities for working with HCL (Terraform) files.

## Installation

```bash
npm install hcl-utils
```

## Usage

As you can see from the `v0.0.0` version number, development has just begun.  At the moment there is only one function available however this will grow over time.

Each function is available as either a command line utility or as a module.

### Set Tag (`setTag` & `set-hcl-tag`)

#### Command Line Usage (`set-hcl-tag`)

##### Parameters (`set-hcl-tag`)

| Name        | Description                          | Type            | Default |
|-------------|--------------------------------------|-----------------|---------|
| `path`      | Path to HCL file or Terraform folder | `string (path)` |         |
| `recursive` | Search child folders                 | `boolean`       |         |
| `node`      | Fully-qualified node name            |                 | `*.*.*` |
| `tag`       | Tag query as `key` or `key=value`    |                 | `*`     |
| `key`       | Name of tag or label to set          |                 |         |
| `value`     | Value of tag or label to set         |                 |         |
| `quote`     | Wrap the value in quotes             | `boolean`       | `true`  |
| `backup`    | Backup file path or folder path      | `boolean`       |         |
| `save`      | Save changes back to file            | `boolean`       | `false` |
| `quiet`     | Disable display of results           | `boolean`       | `false` |


```bash





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
