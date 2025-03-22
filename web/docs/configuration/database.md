# Database Configuration

The database configuration is used to configure the connection to the database, used for user management.

## Syntax

### JSON

```json
{
    "name": "mongodb" | "postgresql" | "in-memory",
    "db": String,
    "url": String,
    "host": String,
    "port": number,
    "user": String,
    "pass": String
}
```

### YAML

```yaml
name: mongodb | postgresql | in-memory
db: String
url: String
host: String
port: number
user: String
pass: String
```

### Environment Variables

```properties
FILES_CRUD_DATABASE__NAME=mongodb | postgresql | in-memory
FILES_CRUD_DATABASE__DB=String
FILES_CRUD_DATABASE__URL=String
FILES_CRUD_DATABASE__HOST=String
FILES_CRUD_DATABASE__PORT=number
FILES_CRUD_DATABASE__USER=String
FILES_CRUD_DATABASE__PASS=String
```

## Properties

### database.name
Specifies which database adapter to use.

Default: `in-memory`

Type: One of
* `in-memory` &minus; Saves all data in RAM (memory). Only useful for tests, no data will be persistent
* `mongodb` &minus; Saves data in a [mongodb](https://www.mongodb.com/)
* `postgresql` &minus; Saves data in a [postgresql](https://www.postgresql.org/) database

### database.db
Specifies the database name for postgresql.

Default: `files-crud`

Type: String

### database.url
Specifies the database url for mongodb.

Default: `mongodb://localhost:27017/files-crud`

Type: String

### database.host
Specifies the database host for postgresql.

Default: `localhost`

Type: String

### database.port
Specifies the database port for postgresql.

Default: 5432

Type: number

### database.user
Specifies the database user for mongodb and postgresql.

Default: none (no auth)

Type: String

### database.pass
Specifies the database password for mongodb and postgresql.

Default: none (no auth)

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
