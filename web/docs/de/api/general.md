# API

Diese Seiten dokumentieren die API Endpoints für files-crud.

Wir verwenden folgende Platzhalter-Notationen und Beispiele:
* Gute und konsistente Beispiele für body Parameter, anstelle von Platzhaltern
* <span style="color: #999; ">{...}</span> Platzhalter für Path Parameter, deren Werte keine Slashes enthalten dürfen
* <span style="color: #999; ">{...*}</span> Platzhalter für Path Parameter, deren Werte auch Slashes enthalten können

Request-Body und Response-Body (wenn vorhanden) sind immer JSON, außer bei:
* <span style="color: green; ">POST</span> /api/file/save/<span style="color: #999; ">{path*}</span> request-body
* <span style="color: #60affe; ">GET</span> /api/file/one/<span style="color: #999; ">{path*}</span> response-body

## Nutzer endpoints
[Nutzer Endpoints](/de/api/user)

## Datei endpoints
[Datei Endpoints](/de/api/file)

## Allgemeine Fehler Responses

### Fehler beim Validieren (Beispiel)
StatusCode: 400

Beispiel: Benutzername zu kurz beim Registreiren:
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

### Nicht gefunden / Invalide Methode / Forbidden Access
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

So auch für andere Methoden (PUT, HEAD, OPTIONS...)

### Unbekannter Fehler
StatusCode: 500
```json
{
  "error": "Unexpected Error."
}
```
