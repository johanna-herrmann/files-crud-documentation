# Configuration

## General information about configuration

Configuration can be done, using one of the following methods:
* Adding a `config.json` to the current working directory (`./config.json`).
* Adding a `config.yaml` or `config.yml` to the current working directory (`./config.yaml` or `./config.yml`).
* Set environment variables with `FILES_CRUD_`-prefix
  (or prefix, set via `filescrud --env-prefix`).

All configuration properties are optional (convention over configuration) but some properties are highly recommended in some cases. \
Example: `accessKeyId` defaults to `fallback-key` which is quite useless if `s3` is used as storage.

### Precedence
If you use both, a config file and environment variables,
the environment variable properties overwrite the config file properties.

For config files the following applies:
* If there is a `./config.json`, it will be used
* If not, but there is a `./config.yaml`, then this will be used
* If this is not available either, but a `./config.yml` is available, then this one will be used

## Syntax

### JSON

```json
{
    "defaultPermissions": String,
    "directoryPermissions": {"path": String, ...},
    "publicFileOwner": "all" | "none",
    "database": DatabaseConfig,
    "logging": LoggingConfig,
    "storage": StorageConfig,
    "server": ServerConfig,
    "webRoot": String,
    "tokenExpiresInSeconds": number,
    "register": "all" | "admin" | "token",
    "tokens": [String, ...]
}
```

### YAML

```yaml
defaultPermissions: String
directoryPermissions:
    path: String
    ...
publicFileOwner: all | none,
database:
    DatabaseConfig
logging:
    LoggingConfig
storage:
    StorageConfig
server:
    ServerConfig
webRoot: String
tokenExpiresInSeconds: number
register: all | admin | token
tokens:
    - String,
    ...
```

### Environment Variables

```properties
FILES_CRUD_DEFAULT_PERMISSIONS=String
FILES_CRUD_DIRECTORY_PERMISSIONS...
FILES_CRUD_PUBLIC_FILE_OWNER=all|none
FILES_CRUD_DATABASE...
FILES_CRUD_LOGGING...
FILES_CRUD_STORAGE...
FILES_CRUD_SERVER...
FILES_CRUD_WEB_ROOT=String
FILES_CRUD_TOKEN_EXPIRES_IN_SECONDS=number
FILES_CRUD_REGISTER=all|admin|token
FILES_CRUD_TOKENS=String,...
```

#### Notices about yaml

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

If you want to use the [explicit array](/permissions#explicit-array) notation together with *separated notation*, this can be done as follows: \
comma-separation for directories, colon-separation for levels
```properties
FILES_CRUD_DIRECTORY_PERMISSIONS__DIRECTORIES='dir/one,dir/two'
FILES_CRUD_DIRECTORY_PERMISSIONS__PERMISSIONS='create-read-update-delete:read:read,create-read:read:'
```

## Properties

### defaultPermissions
Specifies default directory permissions, used if `directoryPermissions` is not specified for a directory.

Default: `crudcr------`
(See: [Permissions](/permissions))

Type: String

### directoryPermissions
Specifies permissions for specific directories.
To specify permissions for a directory, it does not matter whether the directory exists already.

Default: empty

Type: Record/Map of String<=>String

Permissions will be inherited. \
Example:
* You specified directory permissions for `images` but not for `images/holidays`
* A user wants to access `images/holidays`
* In this case, the permission definition on `images` will be used, since `holidays` is a sub directory.

### publicFileOwner
Specifies how owner is handled if a file was created without login.

Default: `all`

Type: One of
* `all` &minus; File is owned by everybody
* `none` &minus; File is owned by nobody

### database
Specifies configuration for the database connection.

Default: See: [Database Configuration](/configuration/database)

Type: [Database Configuration](/configuration/database)

### logging
Specifies configuration for logging.

Default: See: [Logging Configuration](/configuration/logging)

Type: [Logging Configuration](/configuration/logging)

### storage
Specifies configuration for storage to use.

Default: See: [Storage Configuration](/configuration/storage)

Type: [Storage Configuration](/configuration/storage)

### server
Specifies configuration for the application server.

Default: See: [Server Configuration](/configuration/server)

Type: [Server Configuration](/configuration/server)

### webRoot
Specifies the path to serve as frontend. The application will serve static web content from this directory. The application is only backend if no `webRoot` is specified.

Default: none

Type: String

### tokenExpiresInSeconds
Specifies how many seconds a JWT will be valid after it was issued. \
If you want the JWTs to be valid forever (NOT RECOMMENDED), set `tokenExpiresInSeconds` to 0.

Default: 1800 (30 minutes)

Type: number

### register
Specifies how users can be added and registered.

Default: `admin`

Type: One of
* `all` &minus; Anybody can register without any restriction
* `token` &minus; Registration requires to include a token in request body
* `admin` &minus; Registration is disabled. Users have to be added by an admin*.

*On first startup, an initial admin will be created automatically, if no admin exists already.

### tokens
Specifies the tokens which are valid for registration, if `register` is set to `token`.

Default: empty

Type: List/Array of String (one string item for each valid token)

## Examples

### JSON

```json
{
    "defaultPermissions": "crudcr------",
    "directoryPermissions": {
        "special/world": "crudcr---r--",
        "special/admins": "000",
        "special/all-cr": ["create-read", "create-read", "create-read"]
    },
    "publicFileOwner": "none",
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
    "tokenExpiresInSeconds": 3600,
    "register": "token",
    "tokens": ["ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"]
}
```

### YAML

```yaml
defaultPermissions: crudcr------
directoryPermissions:
    special/world: crudcr---r--
    special/admins: 000
    special/all-cr:
        - create-read
        - create-read
        - create-read
publicFileOwner: none
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
tokenExpiresInSeconds: 3600
register: token
tokens: 
    - ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
```

### Environment Variables

```properties
FILES_CRUD_DEFAULT_PERMISSIONS=crudcr------
FILES_CRUD_DIRECTORY_PERMISSIONS__DIRECTORIES='special/world,special/admins,special/all-cr'
FILES_CRUD_DIRECTORY_PERMISSIONS__PERMISSIONS='crudcr---r--,000,create-read:create-read:create-read'
FILES_CRUD_PUBLIC_FILE_OWNER=none
FILES_CRUD_DATABASE__NAME=mongodb
FILES_CRUD_LOGGING__IP_LOGGING=full
FILES_CRUD_STORAGE__NAME=s3
FILES_CRUD_PATH=/opt/filescrud
FILES_CRUD_SERVER__PORT=1234
FILES_CRUD_WEB_ROOT=/opt/filescrud/web
FILES_CRUD_TOKEN_EXPIRES_IN_SECONDS=3600
FILES_CRUD_REGISTER=token
FILES_CRUD_TOKENS=1a79a4d60de6718e8e5b326e338ae533,3712c56ef7490da429ffe2d364871edb
```

## Default summary

If no property is set at all, the application defaults to:
* `crudcr------`-permissions for all directories (Full-Access for owner, create and read permissions for users)
* files created without login will be owned by everybody
* in-memory-db is used
* Logging:
  * No debug logging
  * All logging features enabled
  * Anonymous ip logging
  * Daily file rotation, compressing rotated files via gzip
  * files:
    * access log: `./access.log`
    * error log: `./error.log`
  * formats:
    * console: `coloredHumanReadableLine`
    * console redirected to file: `json`
    * access log file: `json`
    * error log file: `json`
* Local file system storage is used with path: `./`
* Server:
  * Listens on `0.0.0.0:9000`
  * No ssl
  * `X-Robots-Tag` header is not set
  * No CORS header will be set
  * file size limit is: `100m` (100MiB (104857600 bytes))
* No static files will be served
* Auth: JWT tokens will be valid for 30 Minutes
* registration is disabled (Only admins can add users)
