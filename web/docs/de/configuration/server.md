# Server-Konfiguration

Die-Server Konfiguration bestimmt die Verbindung und das Verhalten zum files-crud Server.

## Syntax

### JSON

```json
    "host": String,
    "port": number,
    "useHttps": boolean,
    "useHttp2": boolean,
    "sslKeyPath": String,
    "sslCertPath": String,
    "hsts": boolean,
    "noRobots": boolean,
    "cors": CorsConfig,
    "fileSizeLimit": String | number
```

### YAML

```yaml
host: String
port: number
useHttps: boolean
useHttp2: boolean
sslKeyPath: String
sslCertPath: String
hsts: boolean
noRobots: boolean
cors: CorsConfig
fileSizeLimit: String | number
```

### Umgebungsvariablen
```properties
FILES_CRUD_SERVER__HOST=String
FILES_CRUD_SERVER__PORT=number
FILES_CRUD_SERVER__USE_HTTPS=boolean
FILES_CRUD_SERVER__USE_HTTP2=boolean
FILES_CRUD_SERVER__SSL_KEY_PATH=String
FILES_CRUD_SERVER__SSL_CERT_PATH=String
FILES_CRUD_SERVER__HSTS=boolean
FILES_CRUD_SERVER__NO_ROBOTS=boolean
FILES_CRUD_SERVER__CORS__...
FILES_CRUD_SERVER__FILE_SIZE_LIMIT=String | number
```

## Eigenschaften

### server.host

Gibt an auf welcher Domain oder IP der Server lauscht.

Standard: `0.0.0.0` (Lauscht auf allen IPs)

Typ: String

Damit nur auf dem `localhost` gelauscht wird:
* Wenn installiert via `npm install -g files-crud`: setze `server.host` auf `127.0.0.1`
* Bei Nutzung von docker: nutze `-p 127.0.0.1:9000:9000` statt `-p 9000:9000`

### server.port

Gibt an auf welchem Port der Server lauscht.

Standard: `9000`

Typ: number

### server.useHttps

Server verwendet `https` mit ssl/tls, wenn `true`.

Standard: `false`

Typ: boolean

### server.useHttp2

Server nutzt `HTTP/2` für https, wenn `true`. 

Standard: `false`

Typ: boolean

### server.sslKeyPath

Gibt den Dateipfad zum privaten Schlüssel für ssl/tls an.

Standard: `./privateKey.pem`

Typ: String

### server.sslCertPath

Gibt den Dateipfad zum Zertifikat für ssl/tls an.

Standard: `./certificate.pem`

Typ: String

### server.hsts

Server sendet `Strict-Transport-Security`-Header wenn `true` und ssl/tls aktiv.

Standard: `true`

Typ: boolean

### server.noRobots

Server sendet `X-Robots-Tag`-Header mit Wert `none` wenn `true`

Standard: `false`

Typ: boolean

### server.cors

Definiert die Eigenschaften des `Cross-Origin Resource Sharing` (CORS).

Standard: keine (Kein CORS-Header wird gesendet)

Typ: [CORS-Konfiguration](/de/configuration/server-cors)

### server.fileSizeLimit

Gibt die maximale Dateigröße an, die hochgeladen werden kann.

Standard: `100m` (100MiB (104.8MB))

Typ: Eines von
* String &minus; Zahl und Einheit (Beispiel: `42k` für 42KiB)
* number &minus; Anzahl der Bytes (Beispiel: 1024 für 1KiB)

## Beispiele

### JSON

```json
    "host": "127.0.0.1",
    "port": 443,
    "useHttps": true,
    "useHttp2": true,
    "sslKeyPath": "/opt/fc/ssl/key.pem",
    "sslCertPath": "/opt/fc/ssl/cert.pem",
    "hsts": true,
    "noRobots": false,
    "cors": {
        "origin": "*"
    },
    "fileSizeLimit": "2g"
```

### YAML

```yaml
host: "127.0.0.1"
port: 443
useHttps: true
useHttp2: true
sslKeyPath: /opt/fc/ssl/key.pem
sslCertPath: /opt/fc/ssl/cert.pem
hsts: true
noRobots: false
cors:
    origin: "*"
fileSizeLimit: 2g
```

### Umgebungsvariablen
```properties
FILES_CRUD_SERVER__HOST=127.0.0.1
FILES_CRUD_SERVER__PORT=443
FILES_CRUD_SERVER__USE_HTTPS=true
FILES_CRUD_SERVER__USE_HTTP2=true
FILES_CRUD_SERVER__SSL_KEY_PATH=S/opt/fc/ssl/key.pem
FILES_CRUD_SERVER__SSL_CERT_PATH=/opt/fc/ssl/cert.pem
FILES_CRUD_SERVER__HSTS=true
FILES_CRUD_SERVER__NO_ROBOTS=false
FILES_CRUD_SERVER__CORS__ORIGIN='*'
FILES_CRUD_SERVER__FILE_SIZE_LIMIT=2g
```
