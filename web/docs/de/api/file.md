# API - Datei Endpoints

Diese Seite dokumentiert die API Datei Endpoints.

## Datei hochladen
**<span style="color: green; ">POST</span> /api/file/upload/<span style="color: #999; ">{path*}</span>**

Endpoint um eine Datei hochzuladen. \
Kann eine neue oder eine bereits existierende Datei sein. \
Speichert außerdem folgende Eigenschaften als Datei-Daten.
* Den Mimetype der via `Content-Type`-Parameter im request-body angegeben wurde
  (oder falls angegeben: der Wert des `X-Mimetype`-request-headers)
* Den Eigentümer (user-id des Uploaders, `public` wenn Upload ohne Login erfolgt) \
  (Unverändert beim überschreiben der Datei).
* Größe
* MD5 hash des Dateiinhalts (Verwendet für den [Integritäts-Check](/de/usage/cli#integrity))
* meta (Datei-Metadaten) \
  (*undefined* beim initialen Upload, unverändert beim überschreiben der Datei)

Der `Content-Type`-request-header muss gesendet werden, mit einem Wert wie `multipart/form-data;boundary=delimiter`,
wobei `delimiter` eine beliebige Zeichenfolge aus Zahlen, Buchstaben und Bindestrichen sein kann.
Der `delimiter` muss im request-body verwendet werden.

Wir empfehlen, ebenfalls den `Content-Length`-request-header zu senden.

Wir empfehlen stark, Upload-Tools (Upload-Formular, JS Files API, etc.) zu verwenden.

### Request Body
Datei als `multipart/form-data`, mit exakt einem Datei-Objekt.
Der `name` kann jeder nicht-leere, alpha-numerische Wert sein.
Der `filename`-Parameter wird ignoriert.

Beispiel mit delimiter `---delimiter123`:
```
---delimiter123
Content-Disposition: form-data; name="file"; filename="does-not-matter.txt"
Content-Type: text/plain

example-text-file-content
---delimiter123--

```

### Request Path Parameter
* path &minus; Der Pfad wohin die Datei hochgeladen werden soll (Relativ zum Hauptordner des Speichers)

Beispiel:
<span style="color: green; ">POST</span> /api/file/upload/<span style="color: #999">texts/examples/cool-text.txt</span>

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{
  "path": "texts/examples/cool-text.txt"
}
```

#### Fehlende create Berechtigung
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to create texts/examples/cool-text.txt"
}
```

#### Fehlende update Berechtigung
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to update texts/examples/cool-text.txt"
}
```

#### Datei zu groß
Status-Code: 413

Body (example for limit: 10k):
```json
{
  "error": "Error. File is to big. Limit: 10240 bytes"
}
```

## Datei herunterladen
**<span style="color: #60affe; ">GET</span> /api/file/download/<span style="color: #999; ">{path*}</span>**

Endpoint um eine Datei herunterzuladen.

### Request Body
Keiner

### Request Path Parameter
* path &minus; Der Pfad von wo die Datei heruntergeladen werden soll (Relativ zum Hauptordner des Speichers)

Beispiel:
<span style="color: #60affe; ">GET</span> /api/file/download/<span style="color: #999">texts/examples/cool-text.txt</span>

### Responses

#### Erfolg
Status-Code: 200

Body: \
File content

Response enthält folgende header
* Content-Type &minus; Mimetype der beim Upload gespeichert wurde (oder falls angegeben: Der Wert des `X-Mimetype`-request-headers)
* Content-Length &minus; Größe der Datei (bytes)
* Content-Disposition &minus; Enthält Informationen zur herunterzuladenden Datei \
  Beispiel: `attachment; filename=cool-text.txt`

#### Fehlende read Berechtigung
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to read texts/examples/cool-text.txt"
}
```

#### Datei existiert nicht
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```

## Metadaten speichern
**<span style="color: green; ">POST</span> /api/file/save-meta/<span style="color: #999; ">{path*}</span>**

Speichert die Metadaten zu einer Datei.
Das erste Speichern der Metadaten einer Datei erfordert `create` Berechtigungen.
Danach erfordert jedes weitere Speichern von Metadaten `update` Berechtigungen.

### Request Body
```json
{
  "meta": {
    "recorded-at": 9876543211234
  }
}
```

### Request Path Parameter
* path &minus; Der Pfad zu der Datei zu der die Metadaten gespeichert werden sollen (relativ zum Hauptordner des Speichers)

Beispiel:
<span style="color: green; ">POST</span> /api/file/save-meta/<span style="color: #999">texts/examples/cool-text.txt</span>

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{}
```

#### Fehlende create Berechtigung beim ersten speichern
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to create texts/examples/cool-text.txt"
}
```

#### Fehlende update Berechtigung bei jedem weiteren speichern
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to update texts/examples/cool-text.txt"
}
```

#### Datei existiert nicht
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```

## Metadaten laden
**<span style="color: #60affe; ">GET</span> /api/file/load-meta/<span style="color: #999; ">{path*}</span>**

Lädt die Metadaten zu einer Datei.

### Request Body
Keiner

### Request Path Parameter
* path &minus; Der Pfad zu der Datei zu der die Metadaten geladen werden sollen (Relativ zum Hauptordner des Speichers)

Beispiel:
<span style="color: #60affe; ">GET</span> /api/file/load-meta/<span style="color: #999">texts/examples/cool-text.txt</span>

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{
  "meta": {
    "recorded-at": 9876543211234
  }
}
```

#### Fehlende read Berechtigung
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to read texts/examples/cool-text.txt"
}
```

#### Datei existiert nicht
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```

## Datei-Daten laden
**<span style="color: #60affe; ">GET</span> /api/file/load-data/<span style="color: #999; ">{path*}</span>**

Lädt Datei-Daten zu einer Datei. Darin enthalten: Metadateb, Größe, Mimetype, Eigentümer und MD5-Hash.

### Request Body
Keiner

### Request Path Parameter
* path &minus; Pfad zu der Datei zu der die Datei-Daten geladen werden sollen (relativ zum Hauptordner des Speichers)

Beispiel:
<span style="color: #60affe; ">GET</span> /api/file/load-data/<span style="color: #999">texts/examples/cool-text.txt</span>

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{
  "data": {
    "meta": {
      "recorded-at": 9876543211234
    },
    "contentType": "text/plain",
    "size": 25,
    "md5": "978304a9ba6dca01666933ec96dafaec",
    "owner": "c0445a62-999d-4b73-bdab-473bae454b03"
  }
}
```

#### Fehlende read Berechtigung
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to read texts/examples/cool-text.txt"
}
```

#### Datei existiert nicht
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```

## Dateien und Ordner auflisten
**<span style="color: #60affe; ">GET</span> /api/file/list/<span style="color: #999; ">{path*}</span>**

Zeigt die Dateien und Ordner eines Ordners an

### Request Body
Keiner

### Request Path Parameter
* path &minus; Der Pfad zum Ordner von dem die Dateien und Ordner angezeigt werden sollen (Relativ zum Hauptordner des Speichers) \
  (leer, um die Dateien und Ordner des Hauptordners anzuzeigen)

Beispiele:
* <span style="color: #60affe; ">GET</span> /api/file/list/<span style="color: #999">texts/examples</span>
* <span style="color: #60affe; ">GET</span> /api/file/list/

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{
  "items": ["sub/", "logs/", "cool-text.txt", "boring-text.txt"]
}
```

#### Fehlende read Berechtigung
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to read texts/examples"
}
```

#### Ordner existiert nicht
Status-Code: 400

Body:
```json
{
  "error": "Error. Directory texts/examples does not exist."
}
```

## Datei kopieren
**<span style="color: green; ">POST</span> /api/file/copy**

Kopiert eine Datei.

### Request Body
```json
{
  "path": "texts/examples/cool-text.txt",
  "targetPath": "copy/cool-text.txt.copy",
  "copyOwner": false
}
```

* path &minus; Pfad zur Datei die kopiert werden soll
* targetPath &minus; Pfad zur Ziel-Datei
* copyOwner &minus; Optional: Definiert ob die Ziel-Datei den gleichen Eigentümer haben soll, wie die Quell-Datei
  * true: Eigentümer der Quell-Datei wird kopiert (Ziel-Datei hat gleichen Eigentümer)
  * false (standard): Eigentümer ist der Aufrufer, wenn Ziel-Datei vorher nicht existierte, andernfalls bleibt Eigentümer unverändert

### Request Path Parameter
Keiner

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{
  "path": "copy/cool-text.txt.copy"
}
```

#### Fehlende read Berechtigung für die Quell-Datei
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to read texts/examples/cool-text.txt"
}
```

#### Fehlende create Berechtigung für die Ziel-Datei
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to create copy/examples/cool-text.txt.copy"
}
```

#### Fehlende update Berechtigung für die Ziel-Datei
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to update copy/examples/cool-text.txt.copy."
}
```

#### Nutzer der kein Admin ist, versucht Eigentümer-Attribut zu kopieren (copyOwner)
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. Only admins are allowed to copy the owner."
}
```

#### Quell-Datei existiert nicht
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```

## Datei verschieben
**<span style="color: green; ">POST</span> /api/file/move**

Verschiebt eine Datei (kann auch zum umbenennen einer Datei verwendet werden). \
Kopiert die Datei und löscht anschließend die Quell-Datei.

### Request Body
```json
{
  "path": "texts/examples/cool-text.txt",
  "targetPath": "better/path/really-cool-text.txt",
  "copyOwner": false
}
```

* path &minus; Pfad zu der Datei die verschoben werden soll
* targetPath &minus; Neuer Pfad
* copyOwner &minus; Optional: Definiert ob die Ziel-Datei den gleichen Eigentümer haben soll, wie die Quell-Datei
  * true: Eigentümer der Quell-Datei wird kopiert (Ziel-Datei hat gleichen Eigentümer)
  * false (standard): Eigentümer ist der Aufrufer, wenn Ziel-Datei vorher nicht existierte, andernfalls bleibt Eigentümer unverändert

### Request Path Parameter
Keiner

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{
  "path": "better/path/really-cool-text.txt"
}
```

#### Fehlende read Berechtigung für die Quell-Datei
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to read texts/examples/cool-text.txt"
}
```

#### Fehlende create Berechtigung für die Ziel-Datei
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to create better/path/really-cool-text.txt."
}
```

#### Fehlende update Berechtigung für die Ziel-Datei
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to update better/path/really-cool-text.txt."
}
```

#### Fehlende delete Berechtigung für die Quell-Datei
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to delete texts/examples/cool-text.txt"
}
```

#### Nutzer der kein Admin ist, versucht Eigentümer-Attribut zu kopieren (copyOwner)
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. Only admins are allowed to copy the owner."
}
```

#### Quell-Datei existiert nicht
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```

## Datei löschen
**<span style="color: #a00; ">DELETE</span> /api/file/remove/<span style="color: #999; ">{path*}</span>**

Löscht eine Datei

### Request Body
Keiner

### Request Path Parameter
* path &minus; Der Pfad zu der Datei die gelöscht werden soll (Relativ zum Hauptordner des Speichers)

Beispiel:
<span style="color: #a00; ">DELETE</span> /api/file/remove/<span style="color: #999">texts/examples/cool-text.txt</span>

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{}
```

#### Fehlende delete Berechtigung
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You are not allowed to delete texts/examples/cool-text.txt"
}
```

#### Datei existiert nicht
Status-Code: 400

Body:
```json
{
  "error": "Error. File texts/examples/cool-text.txt does not exist."
}
```
