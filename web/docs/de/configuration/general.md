# Konfiguration

## Allgemeine Informationen zur Konfiguration

Die Konfiguration kann über die folgenden Methoden geschehen:
* Hinzufügen einer `config.json` Datei zum aktuellen Arbeitsverzeichnis (working directory) (`./config.json`).
* Hinzufügen einer `config.yaml` oder `config.yml` Datei zum aktuellen Arbeitsverzeichnis (working directory) (`./config.yaml` oder `./config.yml`).
* Setzen von Umgebungsvariablen mit `FILES_CRUD_`-Prefix
  (oder dem via `filescrud --env-prefix` angegebenen Prefix).

Alle Konfigurationseigenschaften sind optional (convention over configuration) aber manche Eigenschaften sind in eigenen Fällen stark empfohlen. \
Beispiel: Der Standard von `accessKeyId` ist `fallback-key`, was ziemlich unbrauchbar ist, wenn zum Beispiel `s3` als Speicher genutzt wird.

### Vorrangigkeit
Wenn du sowohl eine Konfigurationsdatei, als auch Umgebungsvariablen verwendest,
überschreiben die Eigenschaften der Umgebungsvariablen die Eigenschaften der Konfigurationsdatei.

Für Konfigurationsdateien gilt:
* Liegt eine `./config.json` vor, wird diese angewendet
* Falls nicht, aber es liegt eine `./config.yaml` vor, so wird diese angewendet
* Liegt auch diese nicht vor, aber eine `./config.yml`, dann wird diese angwendet

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

### Umgebungsvariablen

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

#### Anmerkungen zu YAML

##### Verzeichnis-Berechtigungen
Du kannst die Berechtigungen immer mit den folgenden Methoden angeben:
* Explizite Objekt-Notation:
  ```properties
  FILES_CRUD_DIRECTORY_PERMISSIONS='{"special/world":"crudcr---r--","special/admins":"000"}'
  ```
* *Separierte Notation* (empfohlen):
  ```properties
  FILES_CRUD_DIRECTORY_PERMISSIONS__DIRECTORIES='special/world,special/admins'
  FILES_CRUD_DIRECTORY_PERMISSIONS__PERMISSIONS='crudcr---r--,000'
  ```

Wenn alle Variablennamen ausschließlich normale Zeichen wie Buchstaben oder Zahlen enthalten,
kannst du die Zuordnung auch wie folgt durchführen, aber bedenke, dass `SOME_DIR` zu `someDir` wird:
```properties
FILES_CRUD_DIRECTORY_PERMISSIONS__SOME_DIR=fc4
FILES_CRUD_DIRECTORY_PERMISSIONS__SOME_OTHER_DIR=000
```

Zu Einheitlichkeitszwecken empfehlen wir, immer die *separierte Notation* zu verwenden.

Wenn du die [explizite Array](/de/permissions#explizites-array)-Notation
zusammen mit der *separierten Notation* verwenden möchtest, kann dies wie folgt geschehen: \
Komma als Verzeichnis-Trenner, Doppelpunkt als Level-Trenner
```properties
FILES_CRUD_DIRECTORY_PERMISSIONS__DIRECTORIES='dir/one,dir/two'
FILES_CRUD_DIRECTORY_PERMISSIONS__PERMISSIONS='create-read-update-delete:read:read,create-read:read:'
```

## Eigenschaften

### defaultPermissions
Gibt die Standard-Berechtigungen an, die genutzt werden, wenn für das jeweilige Verzeichnis `directoryPermissions` nicht gesetzt ist.

Standard: `crudcr------`
(Siehe: [Berechtigungen](/de/permissions))

Typ: String

### directoryPermissions
Gibt die Berechtigungen für bestimmte Verzeichnisse an.
Um Berechtigungen für ein Verzeichnis festzulegen, spielt es keine Rolle, ob das Verzeichnis bereits existiert.

Standard: leer

Typ: Record/Map von String<=>String (Verzeichnis->Berechtigung-Zuordnung)

Berechtigungen werden vererbt. \
Beispiel:
* Du gibst Berechtigungen für `images` an, aber nicht für `images/holidays`
* Ein Benutzer greift auf `images/holidays` zu
* In diesem Fall greift die Berechtigungsdefinition von `images` auch für `images/holidays`, weil `holidays` ein Unterverzeichnis ist.

### publicFileOwner
Gibt an wie der Eigentümer behandelt werden soll, wenn eine Datei ohne Login erstellt wurde.

Standard: `all`

Typ: Eines von
* `all` &minus; Datei gehört jedem
* `none` &minus; Datei gehört niemandem

### Datenbank
Konfiguriert die Datenbakverbindung

Standard: Siehe: [Datenbank-Konfiguration](/de/configuration/database)

Type: [Datenbank-Konfiguration](/de/configuration/database)

### logging
Konfiguriert das Logging-Verhalten

Standard: Siehe: [Logging-Konfiguraion](/de/configuration/logging)

Typ: [Logging-Konfiguraion](/de/configuration/logging)

### storage
Konfiguriert die Eigenschaften des Speichers

Standard: Siehe: [Speicher-Konfiguration](/de/configuration/storage)

Typ: [Speicher-Konfiguration](/de/configuration/storage)

### server
Konfiguration für den Anwendungsserver.

Standard: Siehe: [Server-Konfiguration](/de/configuration/server)

Typ: [Server-Konfiguration](/de/configuration/server)

### webRoot
Gibt den Pfad an, dessen Inhalt als Frontend statisch ausgeliefert werden soll, wenn der Zugriff kein API-Zugriff ist.

Standard: keins (nur API, kein Frontend)

Typ: String

### tokenExpiresInSeconds
Gibt an, wie viele Sekunden lang ein JWT gültig sein soll, nachdem er ausgestellt wurde. \
Wenn Tokens niemals ablaufen sollen (NICHT EMPFOHLEN), setze `tokenExpiresInSeconds` auf 0.

Standard: 1800 (30 Minuten)

Typ: number

### register
Gibt an, ob und wie sich Benutzer registrieren können

Standard: `admin`

Typ: Eines von
* `all` &minus; Jeder kann sich uneingeschränkt registrieren
* `token` &minus; Wer sich registrieren will, muss einen gültigen Token im Request-Body angeben
* `admin` &minus; Registrierung ist deaktiviert. Benutzer müssen von einem Admin* hinzugefügt werden

*Beim ersten Start der Anwendung, wird automatisch ein Admin angelegt, wenn noch keiner existiert.

### tokens
Gibt die Tokens an, die verwendet werden können, wenn `register` auf `token` gesetzt ist.

Standard: leer

Typ: Liste/Array von Strings (ein String pro Token)

## Beispiele

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

### Umgebungsvariablen

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

## Zusammenfassung zum Standard-Verhalten

Wenn überhaupt gar keine Eigenschaft gesetzt wird, verhält sich die Anwendung wie folgt:
* `crudcr------`-Berechtigung für alle Verzeichnisse (Voll-Zugriff für Eigentümer, Erstellen- und Lese-Zugriff für Benutzer)
* in-memory-db wird genutzt
* Logging:
  * Kein Debug-Logging
  * Alle Logging-Funktionen aktiviert
  * Anonymisiertes IP-Logging
  * Tägliche Datei-Rotation; Kompression der rotierten Dateien via gzip
  * Dateien:
    * Access-Log: `./access.log`
    * Error-Log: `./error.log`
  * Formate:
    * Konsole: `coloredHumanReadableLine`
    * Konsole in Datei umgeleitet: `json`
    * Access-Log-Datei: `json`
    * Error-Log-Datei: `json`
* Pfad zum Speicher: `./`
* Server:
  * Lauscht auf `0.0.0.0:9000`
  * Kein SSL
  * `X-Robots-Tag` Header wird nicht gesetzt
  * Keine CORS-Header werden gesetzt
  * Datei-Größen-Limit für den Speicher: `100m` (100MiB (104857600 Bytes))
* Keine Auslieferung von Frontend-Dateien
* Auth: JWTs bleiben 30 Minuten lang gültig
* Registrierung ist deaktiviert (Nur Admins können Benutzer hinzufügen)
