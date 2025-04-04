# Permissions

Permissions can be used to specify who can do which file operation.
The permissions can be specified on directory level and for different levels of api access.

Instead of write/read/execute permissions files-crud uses create/read/update/delete permissions.

## Notation

You can use three different notations for the permissions.

### rwx equivalent
Permissions can be specified using a `crud`-syntax similar to unix's `rwx`-syntax.

The first four letters specify the permissions for the owner,
the second four letters specify the permissions for any other logged-in user
and the last four letters specify the permission for access without login.

A permission is enabled if it's letter is present,
a permission is disabled if it's letter is replaced with a dash.

#### Examples
* `crud-r------` &minus;
  Full access for owner, read-access for other none-admin users, no access without login
* `crudcrud-r--` &minus; full access for all users, read-access without login
* `-r---r------` &minus;
  read-only access for non-admin users, no access without login

### octal equivalent
Permissions can be specified using a hex-syntax similar to unix's octal syntax (000 to fff instead of 000 to 777).

The first digit specifies the permissions for the owner,
the second digit specifies the permissions for any other logged-in user
and the last digit specifies the permission for access without login.

A permission is enabled if it's bit is set,
a permission is disabled if it's bit is not set.
Put simply,
each digit is the sum of the enabled permission's bit values
(create=8, read=4, update=2, delete=1).

#### Examples
* `f40` &minus;
  Full access for owner, read-access for other none-admin users, no access without login
* `ff4` &minus; full access for all users, read-access without login
* `440` &minus;
  read-only access for non-admin users, no access without login

### Explicit array
Permissions can be specified using an array, one item per level.
Each item contains the permissions, separated by dashes.
The order of the permissions in the item does not matter.

#### Examples (JSON)

* `["create-delete-read-update", "read", ""]` &minus;
  Full access for owner, read-access for other none-admin users, no access without login
* `["create-read-update-delete", "create-read-update-delete", "read"]` &minus;
  full access for all users, read-access without login
* `["read", "read", ""]` &minus;
  read-only access for non-admin users, no access without login

## File operations
* create &minus; Save a new file, save file meta data
* read &minus; download a file, read file data, read file meta data, list directory items
* update &minus; update/overwrite a file, update file metadata
* delete &minus; delete a file (and it's meta data)

## Admins
Admins always have full-access.

## Directories

The permissions can be specified:
* For a specific directory. \
  Use `$user` placeholder for user directories
  (Example: `$user/sub` for directory `sub` in user directories)
* Default: Applicated if the directory and all parent directories don't have a specification

Directories are created (recursively) when the first file is saved there.
They will be deleted when the last file in them is deleted.
When defining directory permissions, it does not matter whether the directories exist.

### User directories
Each user is assigned to a directory. \
The path is: `<storage_root>/user_<user_id>` \
Example: `<storage_root>/user_5d79cd2f-91c7-4d9d-93ed-06418ea81ee6`


### Example
```json
{
    "directoryPermissions": {
        "someDir": "crud-r------",
        ...
    },
    "defaultPermissions": "fc4"
}
```

## Owner
* For file operations
  (update meta data, read meta data, read file data, download file, overwrite file, delete file),
  the owner is the user, who initially created the file
  (`public`* on public access upload) \
  (admins can set the owner to the source file owner on copy operations)
* For directory operations (create new file, list directory items),
  the owner is:
  * on user directories and it's sub directories: the user, the directory belongs to
  * on other directories: none (always user permissions are used)

*this is handled as follows:
* if [publicFileOwner](/configuration#publicfileowner) is set to `all` (default) &minus; file is owned by everybody
* if [publicFileOwner](/configuration#publicfileowner) is set to `none` &minus; file is owned by nobody

## See also:
[Configuration](/configuration/general)
