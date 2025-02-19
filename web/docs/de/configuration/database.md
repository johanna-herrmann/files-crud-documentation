# Datenbank-Konfiguration

Die Datenbank-Konfiguration wird für die Verbindung zur Datenbank verwendet, die für die Benutzerverwaltung genutzt wird.

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

### Umgebungsvariablen

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

## Eigenschaften

### database.name
Gibt an, welcher Adapter verwendet werden soll

Standard: `in-memory`

Typ: Eines der folgenden
* `in-memory` &minus; Daten werden im Arbeitsspeicher gespeichert. Nur für Tests sinnvoll, keine Daten dauerhaft
* `mongodb` &minus; Daten werden in einer [mongodb](https://www.mongodb.com/) gespeichert
* `postgresql` &minus; Daten werden in einer [postgresql](https://www.postgresql.org/)-Datenbank gespeichert
* `dynanodb` &minus; Daten werden in einer [dynamodb](https://aws.amazon.com/dynamodb) gespeichert

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

### database.region
Gibt die Region für die dynamodb an.

Standard: Wert von [region](/de/configuration/general#region) in der Hauptkonfiguration,
wenn angegeben, ansonsten `eu-central-1` (Frankfurt, Deutschland, Europa)

Typ: String

### database.accessKeyId
Gibt den Access-Key für dynamodb an.

Standard: Wert von [accessKeyId](/de/configuration/general#accesskeyid) in der Hauptkonfiguration,
wenn angegeben, ansonsten `fallback-key`

Typ: String

### database.secretAccessKey
Gibt den Secret-Key für dynamodb an.

Standard: Wert von [secretAccessKey](/de/configuration/general#secretaccesskey) in der Hauptkonfiguration,
wenn angegeben, ansonsten `fallback-secret`

Typ: String

### database.userTableName
Gibt den Namen der Benutzertabelle für dynamodb an.

Standard `files-crud-user`

Typ: String

### database.failedLoginAttemptsTableName
Gibt den Namen der dynamodb Tabelle an, mit der die fehlerhaften Logins verwaltet werden.

Standard: `files-crud-failedloginattempts`

Typ: String

### database.jwtKeyTableName
Gibt den Namen der JWT-Key-Tabelle für dynamodb an.

Standard: `files-crud-jwtkey`

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

## dynamodb Berechtigungen
Der verwendete AWS-Benutzer benötigt folgende Berechtigungen.

Wir empfehlen, vor der Verwendung von files-crud die Tabellen selbst anzulegen,
um die erforderlichen Berechtigungen des AWS-Benutzers zu reduzieren.

### Wenn die Tabellen bereits existieren
* Dynamodb-Wurzel
  * `ListTables`
* Für jede Tabelle
  * `DeleteItem`
  * `PutItem`
  * `Query`
  * `Scan`
  * `UpdateItem`

### Wenn die Tabellen noch nicht existieren
* Dynamodb-Wurzel
  * `ListTables`
  * `CreateTable`
* Für jede Tabelle
  * `DeleteItem`
  * `PutItem`
  * `Query`
  * `Scan`
  * `UpdateItem`

### Beispiel-Policy
Unter folgenden Annahmen
* Tabellen bereits erstellt, Standard-Namen
* Nutzung einer Role-Policy
* AWS user id: 123456789012
* Standard-Region
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:ListTables"
            ],
            "Resource": "arn:aws:dynamodb:eu-central-1:123456789012"
        },
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:DeleteItem",
                "dynamodb:PutItem",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:UpdateItem"
            ],
            "Resource": [
              "arn:aws:dynamodb:eu-central-1:123456789012:table/files-crud-user"
              "arn:aws:dynamodb:eu-central-1:123456789012:table/files-crud-jwtkey"
              "arn:aws:dynamodb:eu-central-1:123456789012:table/files-crud-failedloginattempts"
            ]
        }
    ]
}
```

## dynamodb table definition
Die Tabellen für dynamodb müssen wie folgt erstellt werden.

### Benutzer-Tabelle
```json
{
  "TableName": "files-crud-user",
  "BillingMode": "PAY_PER_REQUEST",
  "TableClass": "STANDARD",
  "AttributeDefinitions": [
    {
      "AttributeName": "username",
      "AttributeType": "S"
    }
  ],
  "KeySchema": [
    {
      "AttributeName": "username",
      "KeyType": "HASH"
    }
  ]
}
```

### Tabelle für fehlgeschlagene Login-Versuche
```json
{
  "TableName": "files-crud-failedloginattempts",
  "BillingMode": "PAY_PER_REQUEST",
  "TableClass": "STANDARD",
  "AttributeDefinitions": [
    {
      "AttributeName": "username",
      "AttributeType": "S"
    }
  ],
  "KeySchema": [
    {
      "AttributeName": "username",
      "KeyType": "HASH"
    }
  ]
}
```

### Tabelle für JWT Keys
```json
{
  "TableName": "files-crud-jwtkey",
  "BillingMode": "PAY_PER_REQUEST",
  "TableClass": "STANDARD",
  "AttributeDefinitions": [
    {
      "AttributeName": "kid",
      "AttributeType": "S"
    }
  ],
  "KeySchema": [
    {
      "AttributeName": "kid",
      "KeyType": "HASH"
    }
  ]
}
```
