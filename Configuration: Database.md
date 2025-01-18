# DatabaseConfiguration

[Wiki](wiki) &rarr; [Configuration](wiki/Configuration) &rarr; [DatabaseConfiguration](wiki/Configuration:-Database)

The database configuration is used to configure the connection to the database, used for user management.

## Syntax

### JSON

```json
{
    "name": "mongodb" | "postgresql" | "dynamodb" | "in-memory",
    "db": String,
    "url": String,
    "host": String,
    "port": number,
    "user": String,
    "pass": String,
    "password": String,
    "region": String,
    "accessKeyId": String,
    "secretAccessKey": String,
    "userTableName": String,
    "failedLoginAttemptsTableName": String,
    "jwtKeyTableName": String
}
```

### YAML

```yaml
name: mongodb | postgresql | dynamodb | in-memory
db: String
url: String
host: String
port: number
user: String
pass: String
password: String
region: String
accessKeyId: String
secretAccessKey: String
userTableName: String
failedLoginAttemptsTableName: String
jwtKeyTableName: String
```

### Environment Variables

```properties
FILES_CRUD_DATABASE__NAME=String
FILES_CRUD_DATABASE__DB=String
FILES_CRUD_DATABASE__URL=String
FILES_CRUD_DATABASE__HOST=String
FILES_CRUD_DATABASE__PORT=number
FILES_CRUD_DATABASE__USER=String
FILES_CRUD_DATABASE__PASS=String
FILES_CRUD_DATABASE__PASSWORD=String
FILES_CRUD_DATABASE__REGION=String
FILES_CRUD_DATABASE__ACCESS_KEY_ID=String
FILES_CRUD_DATABASE__SECRET_ACCESS_KEY=String
FILES_CRUD_DATABASE__USER_TABLE_NAME=String
FILES_CRUD_DATABASE__FAILED_LOGIN_ATTEMPTS_TABLE_NAME=String
FILES_CRUD_DATABASE__JWT_KEY_TABLE_NAME=String
```

## Properties

### database.name
Specifies which database adapter to use.

Required: No

Default: `in-memory`

Type: One of
* `in-memory` &minus; Saves all data in RAM (memory). Only useful for tests, no data will be persistent
* `mongodb` &minus; Saves data in a [mongodb](https://www.mongodb.com/)
* `postgresql` &minus; Saves data in a [postgresql](https://www.postgresql.org/) database
* `dynanodb` &minus; Saves data in a AWS [dynamodb](https://aws.amazon.com/dynamodb)

### database.db
Specifies the database name for postgresql.

Required: No

Default: `files-crud`

Type: String

### database.url
Specifies the database url for mongodb.

Required: No

Default: `mongodb://localhost:27017/files-crud`

Type: String

### database.host
Specifies the database host for postgresql.

Required: No

Default: `localhost`

Type: String

### database.port
Specifies the database port for postgresql.

Required: No

Default: 5432

Type: number

### database.user
Specifies the database user for mongodb and postgresql.

Required: No

Default: none

Type: String

### database.pass
Specifies the database password for mongodb and postgresql.

Required: No

Default: none

Type: String

### database.region
Specifies the database region for dynamodb.

Required: No

Default: `eu-central-1` (Frankfurt, Germany)

Type: String

### database.accessKeyId
Specifies the database access key for dynamodb.

Required: No

Default: `fallback-key`

Type: String

### database.secretAccessKey
Specifies the database secret key for dynamodb.

Required: No

Default: `fallback-secret`

Type: String

### database.userTableName
Specifies the database user table name for dynamodb.

Required: No

Default `files-crud-user`

Type: String

### database.failedLoginAttemptsTableName
Specifies the database login attempts table name for dynamodb, where failed login attempts are saved, used to lock further attempts for a period of time.

Required: No

Default `files-crud-failedloginattempts`

Type: String

### database.jwtKeyTableName
Specifies the database jwt key table name for dynamodb, where the jwt keys are saved, used to sign and verify JSON Web Tokens for user authorization.

Required: No

Default `files-crud-jwtkey`

Type: String

## Examples

### JSON

#### in-memory
```json
{
    "name": "in-memory"
}
```

#### mongodb
```json
{
    "name": "mongodb",
    "url": "mongodb://192.168.24.42:12345/filescrud-db",
    "user": "dbUser",
    "pass": "s0meLong-and-go0d_p8ssword!sfjdalS"
}
```

#### postgresql
```json
{
    "name": "postgresql",
    "host": "192.168.24.42",
    "port": 4321,
    "db": "filescrud-db",
    "user": "dbUser",
    "pass": "s0meLong-and-go0d_p8ssword!sfjdalS"
}
```

#### dynamodb
```json
    "name": "dynamodb",
    "region": "us-east-1",
    "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
    "secretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    "userTableName": "fc_user",
    "failedLoginAttemptsTableName": "fc_failed-login-attempts",
    "jwtKeyTableName": "fc_jwt-key"
```

### YAML

#### in-memory
```yaml
name: in-memory
```

#### mongodb
```yaml
name: mongodb
url: mongodb://192.168.24.42:12345/filescrud-db
user: dbUser
pass: s0meLong-and-go0d_p8ssword!sfjdalS
```

#### postgresql
```yaml
name: postgresql
host: 192.168.24.42
port: 4321
db: filescrud-db
user: dbUser
pass: s0meLong-and-go0d_p8ssword!sfjdalS
```

#### dynamodb
```yaml
name: dynamodb
region: us-east-1
accessKeyId: AKIAIOSFODNN7EXAMPLE
secretAccessKey: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
userTableName: fc_user
failedLoginAttemptsTableName: fc_failed-login-attempts
jwtKeyTableName: fc_jwt-key
```

### Environment Variables

#### in-memory
```properties
FILES_CRUD_DATABASE__NAME=in-memory
```

#### mongodb
```properties
FILES_CRUD_DATABASE__NAME=mongodb
FILES_CRUD_DATABASE__URL=mongodb://192.168.24.42:12345/filescrud-db
FILES_CRUD_DATABASE__USER=dbUser
FILES_CRUD_DATABASE__PASS=s0meLong-and-go0d_p8ssword!sfjdalS
```

#### postgresql
```properties
FILES_CRUD_DATABASE__NAME=postgresql
FILES_CRUD_DATABASE__HOST=192.168.24.42
FILES_CRUD_DATABASE__PORT=4321
FILES_CRUD_DATABASE__DB=filescrud-db
FILES_CRUD_DATABASE__USER=dbUser
FILES_CRUD_DATABASE__PASS=s0meLong-and-go0d_p8ssword!sfjdalS
```

#### dynamodb
```properties
FILES_CRUD_DATABASE__NAME=dynamodb
FILES_CRUD_DATABASE__REGION=us-east-1
FILES_CRUD_DATABASE__ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
FILES_CRUD_DATABASE__SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
FILES_CRUD_DATABASE__USER_TABLE_NAME=fc_user
FILES_CRUD_DATABASE__FAILED_LOGIN_ATTEMPTS_TABLE_NAME=fc_failed-login-attempts
FILES_CRUD_DATABASE__JWT_KEY_TABLE_NAME=fc_jwt-key
```
