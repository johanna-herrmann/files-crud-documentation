# API: File Endpoints

This page documents the API file Endpoints.

## Upload File
**<span style="color: green; ">POST</span> /api/file/save/<span style="color: #999; ">{path*}</span>**

Endpoint to upload a file. \
Can be a new file or an existing file. \
It also stores following properties as file data.
* the Mimetype provided in the value of the `Content-Type` parameter in body-request
  (or if provided: the value of `X-Mimetype` request-header)
* the owner (user-id of the uploader, `-` if public) \
  (unchaged on update).
* size
* md5 hash of the file content (used for [integrity check](/cli#integrity))
* meta (file meta data) \
  (set to undefined on create, unchaged on update)

Requires `Content-Type` request-header with value like `multipart/form-data;boundary=delimiter`
where `delimiter` can be any value containing numbers, letters and dashes.
The `delimiter` must be used in request-body.

We recommend to also set the `Content-Length` request-header.

We highly recommend to use a file upload tool (Upload Form, JS Files API, etc.).

### Request Body
File as `multipart/form-data`, using `file` as value for the `name` parameter.
`filename` parameter will be ignored.

Example with delimiter `---delimiter123`:
```
---delimiter123
Content-Disposition: form-data; name="file"; filename="does-not-matter.txt"
Content-Type: text/plain

example-text-file-content
---delimiter123--

```

### Request Path parameters
* path &minus; The path where to upload the file to (relative to storage root)

Examle:
<span style="color: green; ">POST</span> /api/file/save/<span style="color: #999">texts/examples/cool-text.txt</span>

### Responses

#### Success
Status-Code: 200

Body:
```json
{
  "path": "texts/examples/cool-text.txt"
}
```

#### Missing create permission
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to create texts/examples/cool-text.txt"
}
```

#### Missing update permission
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to update texts/examples/cool-text.txt"
}
```

#### File too big
Status-Code: 413

Body (example for limit: 10k):
```json
{
  "error": "Error. File is to big. Limit: 10240 bytes"
}
```

## Download File
**<span style="color: #60affe; ">GET</span> /api/file/one/<span style="color: #999; ">{path*}</span>**

Endpoint to download a file.

### Request Body
None

### Request Path parameters
* path &minus; The path where to download the file from (relative to storage root)

Examle:
<span style="color: #60affe; ">GET</span> /api/file/one/<span style="color: #999">texts/examples/cool-text.txt</span>

### Responses

#### Success
Status-Code: 200

Body: \
File content

Response will contain following headers
* Content-Type &minus; Mimetype stored at upload (or if provided: the value of the `X-Mimetype` request-header)
* Content-Length &minus; Length of file content (bytes)
* Content-Disposition &minus; Contains info about file to download \
  Example: `attachment; filename=cool-text.txt`

#### Missing read permission
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to read texts/examples/cool-text.txt"
}
```

#### File does not exist
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```

## Save Meta Data
**<span style="color: green; ">POST</span> /api/file/save-meta/<span style="color: #999; ">{path*}</span>**

Saves the meta data for a file. First save meta data call on a file requires `create` permission, subsequent calls require `update` permission.

### Request Body
```json
{
  "meta": {
    "recorded-at": 9876543211234
  }
}
```

### Request Path parameters
* path &minus; The path to the file to save the meta data of (relative to storage root)

Examle:
<span style="color: green; ">POST</span> /api/file/save-meta/<span style="color: #999">texts/examples/cool-text.txt</span>

### Responses

#### Success
Status-Code: 200

Body:
```json
{}
```

#### Missing create permission on first save meta data call on a file
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to create texts/examples/cool-text.txt"
}
```

#### Missing update permission on subsequent calls
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to update texts/examples/cool-text.txt"
}
```

#### File does not exist
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```

## Load Meta Data
**<span style="color: #60affe; ">GET</span> /api/file/load-meta/<span style="color: #999; ">{path*}</span>**

Loads the meta data for a file.

### Request Body
None

### Request Path parameters
* path &minus; The path to the file to load the meta data from (relative to storage root)

Examle:
<span style="color: #60affe; ">GET</span> /api/file/load-meta/<span style="color: #999">texts/examples/cool-text.txt</span>

### Responses

#### Success
Status-Code: 200

Body:
```json
{
  "meta": {
    "recorded-at": 9876543211234
  }
}
```

#### Missing read permission
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to read texts/examples/cool-text.txt"
}
```

#### File does not exist
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```

## Load File Data
**<span style="color: #60affe; ">GET</span> /api/file/load-data/<span style="color: #999; ">{path*}</span>**

Loads the data for a file. This includes: meta data, size, mimetype, owner and md5 hash.

### Request Body
None

### Request Path parameters
* path &minus; The path to the file to load the data from (relative to storage root)

Examle:
<span style="color: #60affe; ">GET</span> /api/file/load-data/<span style="color: #999">texts/examples/cool-text.txt</span>

### Responses

#### Success
Status-Code: 200

Body:
```json
{
  "data": {
    "meta": {
      "recorded-at": 9876543211234
    },
    "contentType": "text/plain",
    "size": 25,
    "md5": "978304a9ba6dca01666933ec96dafaec",
    "owner": "c0445a62-999d-4b73-bdab-473bae454b03"
  }
}
```

#### Missing read permission
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to read texts/examples/cool-text.txt"
}
```

#### File does not exist
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```

## List Files And Directories
**<span style="color: #60affe; ">GET</span> /api/file/list/<span style="color: #999; ">{path*}</span>**

Lists files and directories in a directory.

### Request Body
None

### Request Path parameters
* path &minus; The path to the directory to list the files and directories in (relative to storage root)

Examle:
<span style="color: #60affe; ">GET</span> /api/file/list/<span style="color: #999">texts/examples</span>

### Responses

#### Success
Status-Code: 200

Body:
```json
{
  "items": ["sub/", "logs/", "cool-text.txt", "boring-text.txt"]
}
```

#### Missing read permission
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to read texts/examples"
}
```

#### Directory does not exist
Status-Code: 400

Body:
```json
{
  "error": "Error. Directory texts/examples does not exist."
}
```

## Copy File
**<span style="color: green; ">POST</span> /api/file/copy**

Copies a file.

### Request Body
```json
{
  "path": "texts/examples/cool-text.txt",
  "targetPath": "copy/cool-text.txt.copy",
  "keepOwner": false
}
```

* path &minus; Path to the file to copy from
* targetPath &minus; Path to the file to copy to
* keepOwner &minus; Optional: Defines if the target file should have the same owner as the source file
  * true: target file will have same owner as source file
  * false (default): target file owner will be the person which does the copy.

### Request Path parameters
None

### Responses

#### Success
Status-Code: 200

Body:
```json
{
  "path": "copy/cool-text.txt.copy"
}
```

#### Missing read permission on source file
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to read texts/examples/cool-text.txt"
}
```

#### Missing create permission for target file
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to create copy/examples/cool-text.txt.copy"
}
```

#### Missing update permission on target file
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to update copy/examples/cool-text.txt.copy."
}
```

#### None-admin user tries to keep the owner
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. Keeping the owner is restricted to admins."
}
```

#### Source File does not exist
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```

## Move File
**<span style="color: green; ">POST</span> /api/file/move**

Moves a file to another path (can also be used to rename a file, still changing the filename).

### Request Body
```json
{
  "path": "texts/examples/cool-text.txt",
  "targetPath": "better/path/really-cool-text.txt",
  "keepOwner": false
}
```

* path &minus; Path to the file to move from
* targetPath &minus; Path to the file to move to
* keepOwner &minus; Optional: Defines if the target file should have the same owner as the source file had
  * true: target file will have same owner as source file
  * false (default): target file owner will be the person which does the copy.

### Request Path parameters
None

### Responses

#### Success
Status-Code: 200

Body:
```json
{
  "path": "better/path/really-cool-text.txt"
}
```

#### Missing read permission on source file
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to read texts/examples/cool-text.txt"
}
```

#### Missing create permission for target file
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to create better/path/really-cool-text.txt."
}
```

#### Missing update permission on target file
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to update better/path/really-cool-text.txt."
}
```

#### Missing delete permission on source file
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to delete texts/examples/cool-text.txt"
}
```

#### None-admin user tries to keep the owner
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. Keeping the owner is restricted to admins."
}
```

#### Source File does not exist
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```

## Delete File
**<span style="color: #a00; ">DELETE</span> /api/file/delete/<span style="color: #999; ">{path*}</span>**

Deletes a file.

### Request Body
None

### Request Path parameters
* path &minus; The path to the file to save the meta data of (relative to storage root)

Examle:
<span style="color: #a00; ">DELETE</span> /api/file/delete/<span style="color: #999">texts/examples/cool-text.txt</span>

### Responses

#### Success
Status-Code: 200

Body:
```json
{}
```

#### Missing delete permission
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to delete texts/examples/cool-text.txt"
}
```

#### File does not exist
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```
