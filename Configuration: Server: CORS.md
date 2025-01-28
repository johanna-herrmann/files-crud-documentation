# CorsConfiguration

[Wiki](../wiki) &rarr; [Configuration](../wiki/Configuration) &rarr; [ServerConfiguration](../wiki/Configuration:-Server) &rarr; [CorsConfiguration](../wiki/Configuration:-Server:-CORS)

Specifies the `Cross-Origin Resource Sharing` (CORS) properties.

## Syntax

### JSON

```json
    "origin": String | boolean | [String | boolean],
    "methods": String | [String],
    "allowedHeaders": String | [String],
    "exposedHeaders": String | [String],
    "credentials": boolean,
    "maxAge": number
```

### YAML

```yaml
origin: String | boolean | [String | boolean]
methods: String | [String]
allowedHeaders: String | [String]
exposedHeaders: String | [String]
credentials: boolean
maxAge: number
```

### Environment Variables

```properties
FILES_CRUD_SERVER__CORS__ORIGIN=String | boolean | [String | boolean]
FILES_CRUD_SERVER__CORS__METHODS=String | [String]
FILES_CRUD_SERVER__CORS__ALLOWED_HEADERS=String | [String]
FILES_CRUD_SERVER__CORS__EXPOSED_HEADERS=String | [String]
FILES_CRUD_SERVER__CORS__CREDENTIALS=boolean
FILES_CRUD_SERVER__CORS__MAX_AGE=number
```

## Properties

### server.cors.origin

Sets the value of the
[Access-Control-Allow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-allow-origin)
header.

Default: none (no will be sent)

Type: One of
* String &minus; comma-separated list of origins
* List/Array of Strings &minus; One item per origin

Wildcards supported: Yes

### server.cors.methods

Sets the value of the
[Access-Control-Allow-Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-allow-methods)
header.

Default: none (no will be sent)

Type: One of
* String &minus; comma-separated list of methods
* List/Array of Strings &minus; One item per method

Wildcards supported: Yes

### server.cors.allowedHeaders

Sets the value of the
[Access-Control-Allow-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-allow-headers)
header.

Default: none (no will be sent)

Type: One of
* String &minus; comma-separated list of headers
* List/Array of Strings &minus; One item per header

Wildcards supported: Yes

### server.cors.exposeHeaders

Sets the value of the
[Access-Control-Expose-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-expose-headers)
header.

Default: none (no will be sent)

Type: One of
* String &minus; comma-separated list of headers
* List/Array of Strings &minus; One item per header

Wildcards supported: Yes

### server.cors.credentials

Sets the value of the
[Access-Control-Allow-Credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-allow-credentials)
header.

Default: none (no will be sent)

Type: boolean (`true` if credentials should be allowed)

### server.cors.maxAge

Sets the value of the
[Access-Control-Max-Age](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-max-age)
header.

Default: none (no will be sent)

Type: number (seconds)

## Examples

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

### Environment Variables

```properties
FILES_CRUD_SERVER__CORS__ORIGIN='*'
FILES_CRUD_SERVER__CORS__METHODS=GET,POST
FILES_CRUD_SERVER__CORS__ALLOWED_HEADERS='*'
FILES_CRUD_SERVER__CORS__EXPOSED_HEADERS=Server
FILES_CRUD_SERVER__CORS__CREDENTIALS=false
FILES_CRUD_SERVER__CORS__MAX_AGE=3600
```
