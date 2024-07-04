# HCL Utilities (`hcl-utils`)

Helper utilities for working with HCL (Terraform) files.

## Overview

This package provides a set of utilities for working with HCL files. For the time being, the primary focus is on setting and unsetting tags on Terraform resources.

## Installation

```bash
npm install hcl-utils
```

## Parameters

| Key | Description | Example |
|-----|-------------|---------|
| `path` | Path to HCL file or Terraform folder | |
| `nodes` | Node Query syntax | `resource.aws_instance.*` |
| `tags` | Tag Query syntax | `project` or `project=ABC123` |
| `key` | Name of tag or label to set | `project` |
| `value` | Value of tag or label to set | `ABC123` |
| `quote` | Wrap the value in quotes | `true` |
| `save` | Save modificatiosn to file | `true` |
| `backup` | Backup file path or folder path | |

### `path`  

Path to HCL file or Terraform folder.  If a folder is specified, the utility will search for all `.tf` files in the folder and its subfolders.

### `nodes` (`*.*.*`)

The node query in the form of `terraform_type.provider_type.resource_name`.  The `*` character is a wildcard that matches any value.  For example, `resource.aws_instance.*` would match all `aws_instance` resources regardless of name.

### `tags` (`key` | `key=value`)

Optional tag query in the form of `key` or `key=value`.  If a value is provided, the utility will only set the tag if the tag exists and the value matches.  If no value is provided, the utility will set the tag as long as the queried tag exists.

### `key`

The name of the tag or label to set.  (GCP uses `labels` instead of `tags`.)

### `value`

Required value of the tag or label to set.  If no value is supplied, the utility will unset the tag.

### `quote`

Optional boolean used to prevent the value from being wrapped in quotes.  The default is `true`.

### `save`

Optional boolean used to prevent the modifications from being saved to the original file.  The default is `true`.

### `backup`

Optional path to a backup file or folder.  Modified source files are always backed up regardless of this setting.  If a folder is specified, the utility will create a backup of each file that is modified.  If no path is provided, the utility will not create a backup in `%SOURCE_FOLDER%/_backups/%DATE%/`.

## Example

### Set Tag (`setTag`)

#### Single HCL File with Tag Query

In this example, all `aws_instance` objects having the tag `project` set to `ABC123` are modified within the single file (`main.tf`).  The tag `another_project` is set to `"BCDEFGH"`.  A backup file is created at `./myfiles/_backups/%DATE%/main.tf`.

```javascript
  const results = await setTag({
    path  : './myfiles/main.tf',
    nodes : 'resource.aws_instance',
    tags  : 'project=ABC123',
    key   : 'another_project',
    value : 'BCDEFGH',
    backup: null
  });
```

#### Multiple HCL Files with Tag Query

In this example all HCL files in the `./myfiles/` are searched for a single `google_compute_network` object called "`default`".  If found, that single item is updated to add or the the label (remember, Google uses "labels" and not "tags") `UID` to a specific UID.  Since a backup path was set, original version of the located file is copied to `./updated/%DATE%/%RELATIVE PATH%/%FILE NAME%` before the original is modified.

```javascript
  const results = await setTag({
    path  : './myfiles',
    nodes : 'resource.google_compute_network.default',
    tags  : null,
    key   : 'UID',
    value : '88e2c934-b45b-4985-a7c3-4d207cb04fd8',
    backup: `./updated`
  });
```

### Unset Tag (`unsetTag`)

#### Multiples HCL Files (no Tag Query)

In this example, all `resource` objects in all files are searched for the tag or label, "`project`".  This key is removed from all of the objects.  Since a backup path was not specificed, the original files are backed up in `./myfiles/_backups/%DATE%/` while preserving their relative path.

```javascript
  const results = await unsetTag({
    path  : './myfiles',
    nodes : 'resource',
    key   : 'project'
  });
```

-----

## Contact Info  

Feel free to contact me if you have any questions or are interested in contributing.

**Fred Lackey**  
[`http://fredlackey.com`](http://fredlackey.com)  
[`fred.lackey@gmail.com`](mailto:fred.lackey@gmail.com)
