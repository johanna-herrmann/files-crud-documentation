# API

These pages document the API Endpoints for files-crud.

We will use following placeholders / example-notation:
* Good and consistent example values for body parameters, instead of placeholders
* <span style="color: #999; ">{...}</span> placeholder for path parameters, whose values cannot contain slashes
* <span style="color: #999; ">{...*}</span> placeholder for path parameters, whose values can contain slashes

Request-Bodies and response-bodies (if any) are always JSON, except for:
* <span style="color: green; ">POST</span> /api/file/save/<span style="color: #999; ">{path*}</span> request-body
* <span style="color: #60affe; ">GET</span> /api/file/one/<span style="color: #999; ">{path*}</span> response-body

## User endpoints
[User Endpoints](/api/user)

## File endpoints
[File Endpoints](/api/file)

## General error responses

### Validation Error (Example)
StatusCode: 400

For example: username too short on register:
```json
{
  "error": "Validation Error.",
  "schema": {
    "username": "required string, 3 to 64 chars",
    "password": "required string, at least 3 chars",
    "meta": "optional object"
  },
  "value": {
    "username": "ab",
    "password": "p8ssw0rd",
    "meta": {}
  }
}
```

### Not found / Invalid Method / Forbidden
StatusCode: 404

GET
```json
{
  "error": "Cannot GET /nothing/here"
}
```

POST
```json
{
  "error": "Cannot POST /nothing/here"
}
```

Same for other methods (PUT, HEAD, OPTIONS...)

### Unknown error
StatusCode: 500
```json
{
  "error": "Unexpected Error."
}
```
