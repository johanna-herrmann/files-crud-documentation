# Datenbank-Konfiguration

Die Datenbank-Konfiguration wird für die Verbindung zur Datenbank verwendet, die für die Benutzerverwaltung genutzt wird.

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

### Umgebungsvariablen

```properties
FILES_CRUD_DATABASE__NAME=mongodb | postgresql | in-memory
FILES_CRUD_DATABASE__DB=String
FILES_CRUD_DATABASE__URL=String
FILES_CRUD_DATABASE__HOST=String
FILES_CRUD_DATABASE__PORT=number
FILES_CRUD_DATABASE__USER=String
FILES_CRUD_DATABASE__PASS=String
```

## Eigenschaften

### database.name
Gibt an, welcher Adapter verwendet werden soll

Standard: `in-memory`

Typ: Eines der folgenden
* `in-memory` &minus; Daten werden im Arbeitsspeicher gespeichert. Nur für Tests sinnvoll, keine Daten dauerhaft
* `mongodb` &minus; Daten werden in einer [mongodb](https://www.mongodb.com/) gespeichert
* `postgresql` &minus; Daten werden in einer [postgresql](https://www.postgresql.org/)-Datenbank gespeichert

### database.db
Gibt den Namen der postgresql Datenbank an.

Standard: `files-crud`

Typ: String

### database.url
Gibt die Datenbank-URL für mongodb an.

Standard: `mongodb://localhost:27017/files-crud`

Typ: String

### database.host
Gibt den host für die postgresql Datenbank an.

Standard: `localhost`

Typ: String

### database.port
Gibt den Port für die postgresql Datenbank an.

Default: 5432

Typ: number

### database.user
Gibt den Benutzernamen für die postgresql Datenbank oder mongodb an.

Standard: keiner (Verbindung ohne Login)

Typ: String

### database.pass
Gibt das Passwort für die postgresql Datenbank oder mongodb an.

Standard: keines (Verbindung ohne Login)

Typ: String

## Beispiele

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

### Umgebungsvariablen

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
