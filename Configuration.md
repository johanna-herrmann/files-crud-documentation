# Configuration

[Wiki](../wiki) &rarr; [Configuration](../wiki/Configuration)

Configuration can be done, using one of the following methods:
* Adding a `config.json` to the pwd of the application (`./config.json`).
* Adding a `config.yaml` or `config.yml` to the pwd of the application (`./config.yaml` or `./config.yml`).
* Set environment variables with `FILES_CRUD_`-prefix
  (or prefix, set via `filescrud --env-prefix`).

## Syntax

### JSON

```json
{
    "defaultPermissions": String,
    "directoryPermissions": {"path": String, ...},
    "database": DatabaseConfig,
    "logging": LoggingConfig,
    "storage": StorageConfig,
    "path": String,
    "server": ServerConfig,
    "webRoot": String,
    "register": "all" | "admin" | "token",
    "tokens": [String, ...],
    "region": String,
    "accessKeyId": String,
    "secretAccessKey": String
}
```

### YAML

```yaml
defaultPermissions: String
directoryPermissions:
    path: String
    ...
database:
    DatabaseConfig
logging:
    LoggingConfig
storage:
    StorageConfig
path: String
server:
    ServerConfig
webRoot: String
register: all | admin | token
tokens:
    - String,
    ...
region: String
accessKeyId: String
secretAccessKey: String

```

### Environment Variables

```properties
FILES_CRUD_DEFAULT_PERMISSIONS=String
FILES_CRUD_DIRECTORY_PERMISSIONS...
FILES_CRUD_DATABASE...
FILES_CRUD_LOGGING...
FILES_CRUD_STORAGE...
FILES_CRUD_PATH=String
FILES_CRUD_SERVER...
FILES_CRUD_WEBROOT=String
FILES_CRUD_REGISTER=all|admin|token
FILES_CRUD_TOKENS=String,...
FILES_CRUD_REGION=String
FILES_CRUD_ACCESS_KEY_ID=String
FILES_CRUD_SECRET_ACCESS_KEY=String
```

#### Notices

##### Directory permissions
You can always specify the permissions, using one of the following methods:
* Explicit object notaion:
  ```properties
  FILES_CRUD_DIRECTORY_PERMISSIONS='{"special/world":"crudcr---r--","special/admins":"000"}'
  ```
* *Separated notation* (recommended):
  ```properties
  FILES_CRUD_DIRECTORY_PERMISSIONS__DIRECTORIES='special/world,special/admins'
  FILES_CRUD_DIRECTORY_PERMISSIONS__PERMISSIONS='crudcr---r--,000'
  ```

If all keys only include normal chars like letters or numbers, you also can use one environment variable for each `directory<->permissions`-mapping, like shown below, but remember, `SOME_DIR` will become `someDir`:
```properties
FILES_CRUD_DIRECTORY_PERMISSIONS__SOME_DIR=fc4
FILES_CRUD_DIRECTORY_PERMISSIONS__SOME_OTHER_DIR=000
```

For consistency, we recommend to use always the *separated notation*.

## Properties

### defaultPermissions
Specifies default directory permissions, used if `directoryPermissions` is not specified.

Required: No

Default: `crudcr------`
(See: [Permissions](../wiki/Permissions))

Type: String

### directoryPermissions
Specifies directory permissions for specific directories.

Required: No

Default: empty

Type: Record/Map of String<=>String

### database
Specifies configuration for the database connection.

Required: No

Default: See: [DatabaseConfig](../wiki/Configuration:-Database)

Type: [DatabaseConfig](../wiki/Configuration:-Database)

### logging
Specifies configuration for logging.

Required: No

Default: See: [LoggingConfig](../wiki/Configuration:-Logging)

Type: [LoggingConfig](../wiki/Configuration:-Logging)

### storage
Specifies configuration for storage to use.

Required: No

Default: See: [StorageConfig](../wiki/Configuration:-Storage)

Type: [StorageConfig](../wiki/Configuration:-Storage)

### path
Specifies the path used to store file data.
Is also used to store files itself if not specified at `storage.path` and storage is local file system.

Required: No

Default: `./`

Type: String

### server
Specifies configuration for the application server.

Required: No

Default: See: [ServerConfig](../wiki/Configuration:-Server)

Type: [ServerConfig](../wiki/Configuration:-Server)

### webRoot
Specifies the path to serve as frontend. The application will serve static web content from this directory. The application is only backend if no `webRoot` is specified.

Required: No

Default: none

Type: String

### register
Specifies how users can be added and registered.

Required: No

Default: `admin`

Type: One of
* `all` &minus; Anybody can register without any retriction
* `token` &minus; Registration requires to include a token in request body
* `admin` &minus; Registration is disabled. Users have to be added by an admin.

### tokens
Specifies the tokens which are valid for registration, if `register` is set to `token`.

Required: No

Default: empty

Type: List/Array of String (one string item for each valid token)

### region
AWS region, used for `dynamodb` and/or `s3`.
Will be overwritten by `database.region` or `storage.region` if specified.

Required: No

Default: `eu-central-1`

Type: String

### accessKeyId
AWS credential Access Key Id, used for `dynamodb` and/or `s3`.
Will be overwritten by `database.accessKeyId` or `storage.accessKeyId` if specified.

Required: No

Default: `fallback-key`

Type: String

### secretAccessKey
AWS credential Secret Access Key, used for `dynamodb` and/or `s3`.
Will be overwritten by `database.secretAccessKey` or `storage.secretAccessKey` if specified.

Required: No

Default: `fallback-secret`

Type: String

## Examples

### JSON

```json
{
    "defaultPermissions": "crudcr------",
    "directoryPermissions": {
        "special/world": "crudcr---r--",
        "special/admins": "000"
    },
    "database": {
        "name": "mongodb"
    },
    "logging": {
        "ipLogging": "full"
    },
    "storage": {
        "name": "s3"
    },
    "path": "/opt/filescrud",
    "server": {
        "port": 1234
    },
    "webRoot": "/opt/filescrud/web",
    "register": "token",
    "tokens": ["ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"],
    "region": "us-east-1",
    "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
    "secretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
}
```

### YAML

```yaml
defaultPermissions: crudcr------
directoryPermissions:
    special/world: crudcr---r--
    special/admins: 000
database:
    name: mongodb
logging:
    ipLogging: full
storage:
    name: s3
path: /opt/filescrud
server:
    port: 1234
webRoot: /opt/filescrud/web
register: token
tokens: 
    - ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
region: us-east-1
accessKeyId: AKIAIOSFODNN7EXAMPLE
secretAccessKey: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### Environment Variables

```properties
FILES_CRUD_DEFAULT_PERMISSIONS=crudcr------
FILES_CRUD_DIRECTORY_PERMISSIONS__DIRECTORIES='special/world,special/admins'
FILES_CRUD_DIRECTORY_PERMISSIONS__PERMISSIONS='crudcr---r--,000'
FILES_CRUD_DATABASE__NAME=mongodb
FILES_CRUD_LOGGING__IP_LOGGING=full
FILES_CRUD_STORAGE__NAME=s3
FILES_CRUD_PATH=/opt/filescrud
FILES_CRUD_SERVER__PORT=1234
FILES_CRUD_WEBROOT=/opt/filescrud/web
FILES_CRUD_REGISTER=token
FILES_CRUD_TOKENS=1a79a4d60de6718e8e5b326e338ae533,3712c56ef7490da429ffe2d364871edb
FILES_CRUD_REGION=us-east-1
FILES_CRUD_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
FILES_CRUD_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```
