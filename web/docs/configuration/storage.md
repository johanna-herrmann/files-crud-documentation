# Configuration: Storage

The storage configuration is used to choose the storage type and specify it's behavior.

## Syntax

### JSON

```json
{
    "name": "fs" | "s3",
    "path": String,
    "region": String,
    "accessKeyId": String,
    "secretAccessKey": String,
    "bucket": String,
    "endpoint": String,
    "forcePathStyle": boolean
}
```

### YAML

```yaml
name: fs | s3
path: String
region: String
accessKeyId: String
secretAccessKey: String
bucket: String
endpoint: String
forcePathStyle: boolean
```

### Environment Variables

```properties
FILES_CRUD_DATABASE__NAME=fs | s3
FILES_CRUD_DATABASE__PATH=String
FILES_CRUD_DATABASE__REGION=String
FILES_CRUD_DATABASE__ACCESS_KEY_ID=String
FILES_CRUD_DATABASE__SECRET_ACCESS_KEY=String
FILES_CRUD_DATABASE__BUCKET=String
FILES_CRUD_DATABASE__ENDPOINT=String
FILES_CRUD_DATABASE__FORCE_PATH_STYLE=boolean
```

## Properties

### storage.name

Specifies which storage to use.

Default: `fs`

Type: One of
* `fs` &minus; Uses local file system as files and data storage.
* `s3` &minus; Uses AWS S3 (or S3-compatible service)
  as file storage and local file system as data storage.

### storage.path

Specifies which local file system path to use.

Default: Value specified as [path](/configuration/general#path) on configartion root,
if specified, else `./`

Type: String

### storage.region

Specifies AWS region to use for S3(-compatible) Storage.

Default: Value specified as [region](/configuration/general#region) on configartion root,
if specified, else `eu-central-1` (Frankfurt, Europe)

Type: String

### storage.accessKeyId

Specifies AWS credential Access Key Id to use for S3(-compatible) Storage.

Default: Value specified as [accessKeyId](/configuration/general#accesskeyid) on configartion root,
if specified, else `fallback-key`

Type: String

### storage.secretAccessKey

Specifies AWS credential secret access key to use for S3(-compatible) Storage.

Default: Value specified as [secretAccessKey](/configuration/general#secretaccesskey) on configartion root,
if specified, else `fallback-secret`

Type: String

### storage.bucket

Specifies AWS S3 bucket to use for S3(-compatible) Storage.

Default: `files-crud`

Type: String

### storage.endpoint

Specifies endpoint to use for S3-compatible Storage, if not default AWS S3.

Default: none (Uses default AWS S3 endpoint)

Type: String

### storage.forcePathStyle

Specifies if S3 path style should be used instead of sub-domain style.

Default: `false`

Type: boolean
* `false` (default) &minus; Uses `bucketname.domain.tld/key` as bucket address
* `true` &minus; Uses `domain.tld/bucketname/key` as bucket address

## Examples

### JSON

#### local file system storage
```json
{
    "name": "fs",
    "path": "/opt/fc/storage"
}
```

#### s3 storage (AWS S3)
```json
{
    "name": "s3",
    "path": "/opt/fc/storage",
    "region": "us-east-1",
    "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
    "secretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    "bucket": "filescrud",
}
```

#### s3 storage (local MinIO)
```json
{
    "name": "s3",
    "path": "/opt/fc/storage",
    "region": "local",
    "accessKeyId": "local.accesskey.example",
    "secretAccessKey": "local.accesskey.example.secret.123",
    "bucket": "filescrud",
    "endpoint": "storage.filescrud.local.zz",
    "forcePathStyle": true
}
```

### YAML

#### local file system storage
```yaml
name: fs
path: /opt/fc/storage
```

#### s3 storage (AWS S3)
```yaml
name: s3
path: /opt/fc/storage
region: us-east-1
accessKeyId: AKIAIOSFODNN7EXAMPLE
secretAccessKey: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
bucket: filescrud
```

#### s3 storage (local MinIO)
```yaml
name: s3
path: /opt/fc/storage
region: local
accessKeyId: local.accesskey.example
secretAccessKey: local.accesskey.example.secret.123
bucket: filescrud
endpoint: storage.filescrud.local.zz
forcePathStyle: true
```

### Environment Variables

#### local file system storage
```properties
FILES_CRUD_STORAGE__NAME=fs
FILES_CRUD_STORAGE__PATH=/opt/fc/storage
```

#### s3 storage (AWS S3)
```properties
FILES_CRUD_STORAGE__NAME=s3
FILES_CRUD_STORAGE__PATH=/opt/fc/storage
FILES_CRUD_STORAGE__REGION=us-east-1
FILES_CRUD_STORAGE__ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
FILES_CRUD_STORAGE__SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
FILES_CRUD_STORAGE__BUCKET=filescrud
```

#### s3 storage (local MinIO)
```properties
FILES_CRUD_STORAGE__NAME=s3
FILES_CRUD_STORAGE__PATH=/opt/fc/storage
FILES_CRUD_STORAGE__REGION=local
FILES_CRUD_STORAGE__ACCESS_KEY_ID=local.accesskey.example
FILES_CRUD_STORAGE__SECRET_ACCESS_KEY=local.accesskey.example.secret.123
FILES_CRUD_STORAGE__BUCKET=filescrud
FILES_CRUD_STORAGE__ENDPOINT=storage.filescrud.local.zz
FILES_CRUD_STORAGE__FORCE_PATH_STYLE=true
```
