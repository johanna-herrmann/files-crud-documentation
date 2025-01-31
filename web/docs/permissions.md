# Permissions

Permissions can be used to specify who can do which file operation.
The permissions can be specified on directory level and for different levels of api access.

Instead of write/read/execute permissions files-crud uses create/read/update/delete permissions.

## Notation

### rwx equivalent
Permissions can be specified using a `crud`-syntax similar to unix's `rwx` syntax.

The first four letters specify the permissions for the owner,
the second four letters specify the permissions for any other logged-in user
and the last four letters specify the permission for access without login.

A permission is enabled if it's letter is present,
a permission is disabled if it's letter is replaced with a dash.

#### Examples
* `crud-r------` &minus;
  Full access for owner, read-access for others users, no access without login
* `crudcrud-r--` &minus; full access for all users, read-access without login
* `-r---r------` &minus;
  read-only access for non-admin users, no access without login

### octal equivalent
Permissions can be also specified using a hex-syntax similar to unix's octal syntax (000 to fff instead of 000 to 777).

The first digit specifies the permissions for the owner,
the second digit specifies the permissions for any other logged-in user
and the last digit specifies the permission for access without login.

A permission is enabled if it's letters' bit is set,
a permission is disabled if it's letters' bit is not set.
Put simply,
each digit is the sum of the of enabled permission letters' values
(c=8, r=4, u=2, 1=d).

#### Examples
* `f40` &minus;
  Full access for owner, read-access for others users, no access without login
* `ff4` &minus; full access for all users, read-access without login
* `440` &minus;
  read-only access for non-admin users, no access without login


## File operations
* create &minus; Save a new file
* read &minus; download a file, read file data, read file metadata
* update &minus; update/overwrite a file, update file metadata
* delete &minus; delete a file

## Directories

The permissions can be specified:
* For a specific directory. \
  Use `$user` for user directories
  (Example: `$user/sub` for directory `sub` in user directories)
* Default: Applicated if the directory does not have a specification


## Example
```json
{
    "directoryPermissions": {
        "someDir": "crud-r------",
        ...
    },
    "defaultPermissions": "fc4"
}
```

## See also:
[Configuration](/configuration/general)
