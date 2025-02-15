# ServerConfiguration

The server configuration is used to specify the connection to and behaviour of the files-crud server.

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

### Environment Variables
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

## Properties

### server.host

Specifies on which ip(s) / domain(s) to listen.

Default: `0.0.0.0` (listens to any source IP)

Type: String

To listen only on `localhost`:
* If installed via `npm install -g files-crud`: set `server.host` to `127.0.0.1`
* If using docker: use `-p 127.0.0.1:9000:9000` instead of `-p 9000:9000`

### server.port

Specifies on which port to listen.

Default: `9000`

Type: number

### server.useHttps

Uses `https` with ssl/tls, if `true`.

Default: `false`

Type: boolean

### server.useHttp2

Uses `HTTP/2` for https. 

Default: `false`

Type: boolean

### server.sslKeyPath

Specifies the path to the private key for ssl/tls.

Default: `./privateKey.pem`

Type: String

### server.sslCertPath

Specifies the path to the certificate for ssl/tls.

Default: `./certificate.pem`

Type: String

### server.hsts

Sets `Strict-Transport-Security` header if `true` and `https` is used.

Default: `true`

Type: boolean

### server.noRobots

Sets `X-Robots-Tag`-Header with value `none` if `true`

Default: `false`

Type: boolean

### server.cors

Specifies the `Cross-Origin Resource Sharing` (CORS) properties.

Default: {} (empty object, no cors properties specified)

Type: [CorsConfig](/configuration/server-cors)

### server.fileSizeLimit

Specifies the maximum file size, which can be uploaded to storage.

Default: `100m` 100MiB (104.8MB)

Type: One of
* String &minus; number and unit (Example: `42k` for 42KiB)
* number &minus; amount of bytes (Example: 1024 for 1KiB)

## Examples

### JSON

```json
    "host": "0.0.0.0",
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
host: "0.0.0.0"
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

### Environment Variables
```properties
FILES_CRUD_SERVER__HOST=0.0.0.0
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
