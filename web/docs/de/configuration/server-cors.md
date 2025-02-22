# CORS-Konfiguration

Konfiguriert, ob und wie `Cross-Origin Resource Sharing`-Header gesendet werden sollen.

## Syntax

### JSON

```json
    "origin": String | [String],
    "methods": String | [String],
    "allowedHeaders": String | [String],
    "exposedHeaders": String | [String],
    "credentials": boolean,
    "maxAge": number
```

### YAML

```yaml
origin: String | [String]
methods: String | [String]
allowedHeaders: String | [String]
exposedHeaders: String | [String]
credentials: boolean
maxAge: number
```

### Umgebungsvariablen

```properties
FILES_CRUD_SERVER__CORS__ORIGIN=String | [String]
FILES_CRUD_SERVER__CORS__METHODS=String | [String]
FILES_CRUD_SERVER__CORS__ALLOWED_HEADERS=String | [String]
FILES_CRUD_SERVER__CORS__EXPOSED_HEADERS=String | [String]
FILES_CRUD_SERVER__CORS__CREDENTIALS=boolean
FILES_CRUD_SERVER__CORS__MAX_AGE=number
```

## Eigenschaften

### server.cors.origin

Gibt den Wert des
[Access-Control-Allow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-allow-origin)-Headers
an.

Standard: keiner (Header wird nicht gesendet)

Typ: Eines von
* String &minus; komma-separierte Liste von Origins
* Liste/Array aus Strings &minus; Ein String pro Origin

Wildcards unterstützt: Ja

### server.cors.methods

Gibt den Wert des
[Access-Control-Allow-Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-allow-methods)-Headers
an.

Standard: keiner (Header wird nicht gesendet)

Typ: Eines von
* String &minus; komma-separierte Liste von Methoden
* Liste/Array aus Strings &minus; Ein String pro Methode

Wildcards unterstützt: Ja

### server.cors.allowedHeaders

Gibt den Wert des
[Access-Control-Allow-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-allow-headers)-Headers
an.

Standard: keiner (Header wird nicht gesendet)

Typ: Eines von
* String &minus; komma-separierte Liste von Headern
* Liste/Array aus Strings &minus; Ein String pro Header

Wildcards unterstützt: Ja

### server.cors.exposeHeaders

Gibt den Wert des
[Access-Control-Expose-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-expose-headers)-Headers
an.

Standard: keiner (Header wird nicht gesendet)

Typ: Eines von
* String &minus; komma-separierte Liste von Headern
* Liste/Array aus Strings &minus; Ein String pro Header

Wildcards unterstützt: Ja

### server.cors.credentials

Steuert das Senden des
[Access-Control-Allow-Credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-allow-credentials)-Headers.

Standard: keiner (Header wird nicht gesendet)

Typ: boolean (`true` wenn Credentials erlaubt sein sollen)

### server.cors.maxAge

Gibt den Wert des
[Access-Control-Max-Age](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-max-age)-Headers
an.

Standard: keiner (Header wird nicht gesendet)

Typ: number (Sekunden)

## Beispiele

### JSON

```json
    "origin": "*",
    "methods": ["GET", "POST"],
    "allowedHeaders": "*",
    "exposedHeaders": "Server",
    "credentials": true,
    "maxAge": 3600
```

### YAML

```yaml
origin: "*"
methods:
    - GET
    - POST
allowedHeaders: "*"
exposedHeaders: Server
credentials: true
maxAge: 3600
```

### Umgebungsvariablen

```properties
FILES_CRUD_SERVER__CORS__ORIGIN='*'
FILES_CRUD_SERVER__CORS__METHODS='GET,POST'
FILES_CRUD_SERVER__CORS__ALLOWED_HEADERS='*'
FILES_CRUD_SERVER__CORS__EXPOSED_HEADERS=Server
FILES_CRUD_SERVER__CORS__CREDENTIALS=false
FILES_CRUD_SERVER__CORS__MAX_AGE=3600
```
