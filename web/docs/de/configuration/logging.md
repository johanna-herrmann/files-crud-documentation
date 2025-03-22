# Logging-Konfiguration

Die Logging-Konfiguration steuert das Logging-Verhalten.

## Syntax

### JSON

```json
{
    "level": "debug" | "info" | "warn" | "error",
    "ipLogging": "full" | "anonymous" | "none",
    "enableErrorFileLogging": boolean,
    "enableAccessLogging": boolean,
    "accessLogFile": String,
    "errorLogFile": String,
    "ttyLoggingFormat": String,
    "fileLoggingFormat": LoggingFormat,
    "errorFileLoggingFormat": LoggingFormat,
    "accessLoggingFormat": AccessLoggingFormat,
    "enableLogFileRotation": boolean,
    "logFileRotationFrequencyUnit": "s" | "m" | "h" | "d",
    "logFileRotationMaxFiles": String,
    "logFileRotationEnableCompression": boolean
}
```

### YAML

```yaml
level: debug | info | warn | error
ipLogging: full | anonymous | none
enableErrorFileLogging: boolean
enableAccessLogging: boolean
accessLogFile: String
errorLogFile: String
ttyLoggingFormat: String
fileLoggingFormat: LoggingFormat
errorFileLoggingFormat: LoggingFormat
accessLoggingFormat: AccessLoggingFormat
enableLogFileRotation: boolean
logFileRotationFrequencyUnit: s | m | h | d
logFileRotationMaxFiles: String
logFileRotationEnableCompression: boolean
```

### Umgebungsvariablen

```properties
FILES_CRUD_LOGGING__NAME=debug | info | warn | error
FILES_CRUD_LOGGING__IP_LOGGING=full | anonymous | none
FILES_CRUD_LOGGING__ENABLE_ERROR_FILE_LOGGING=boolean
FILES_CRUD_LOGGING__ENABLE_ACCESS_LOGGING=boolean
FILES_CRUD_LOGGING__ACCESS_LOG_FILE=String
FILES_CRUD_LOGGING__ERROR_LOG_FILE=String
FILES_CRUD_LOGGING__TTY_LOGGING_FORMAT=String
FILES_CRUD_LOGGING__FILE_LOGGING_FORMAT=LoggingFormat
FILES_CRUD_LOGGING__ERROR_FILE_LOGGING_FORMAT=LoggingFormat
FILES_CRUD_LOGGING__ACCESS_LOGGING_FORMAT=AccessLoggingFormat
FILES_CRUD_LOGGING__ENABLE_LOG_FILE_ROTATION=boolean
FILES_CRUD_LOGGING__LOG_FILE_ROTATION_FREQUENCY_UNIT=s | m | h | d
FILES_CRUD_LOGGING__LOG_FILE_ROTATION_MAX_FILES=String
FILES_CRUD_LOGGING__LOG_FILE_ROTATION_ENABLE_COMPRESSION=boolean
```

## Eigenschaften

### logging.level

Gibt das minimale Logging-Level an.

Standard: `info`

Typ: Eines von
* `debug` &minus; Logging für: `debug`, `info`, `warn`, `error`
* `info` &minus; Logging für: `info`, `warn`, `error`
* `warn` &minus; Logging für: `warn`, `error`
* `error` &minus; Logging für: `error`

### logging.ipLogging

Gibt an, ob und wie IPs geloggt werden, wenn detailiertes Access-Logging aktiviert ist.

Standard: `anonymous`

Typ: Eines von
* `full` &minus; Loggt die komplette IP-Adresse
* `anonymous` &minus; Loggt IP-Addressen anonymisiert (letztes Segment wird durch `_` ersetzt) \
  (Beispiel: `233.42.23._` statt `233.42.23.123`)
* `none` &minus; Loggt keine IP-Adressen (Gesamte Adresse wird durch `_` ersetzt)

### logging.enableErrorFileLogging

Wenn `true`, werden Fehler zusätzlich in eine Datei geloggt,
die via [logging.errorLogFile](#loggingerrorlogfile) angegeben wurde,
zusätzlich zum Logging in der Konsole.

Standard: `true`

Typ: Boolean

### logging.enableAccessLogging

Der Zuriff auf Frontend-Dateien wird immer in der Konsole geloggt (Methode, Pfad, StatusCode).
Wenn `true`, wird zusätzlich jeder Zugriff (Frontend und API) detailiert in eine Datei geloggt,
die via [logging.accessLogFile](#loggingaccesslogfile) angegeben wurde.

Standard: `true`

Typ: Boolean

### logging.accessLogFile
Gibt den Datei-Pfad für das detailierte Access-Logging an
(Siehe: [logging.enableAccessLogging](#loggingenableaccesslogging))

Standard: `./access.log`

Typ: String

### logging.errorLogFile
Gibt den Dateipfad fürs Error-Logging an
(Siehe: [logging.enableErrorFileLogging](#loggingenableerrorfilelogging))

Standard: `./error.log`

Type: String

### logging.ttyLoggingFormat
Gibt das Format des Loggings in der Konsole an.

Standard: [coloredHumanReadableLine](#coloredhumanreadableline)

Typ: LoggingFormat, also eines aus
* `humanReadableLine` &minus; Loggt eine einfache Zeile aus Informationen
* `humanReadableBlock` &minus; Loggt einen Block von Informatioen, mit einer Zeile pro Detail
* `coloredHumanReadableLine` &minus; Loggt eine gefärbte Zeile aus Informationen
   (Farbe abhängig vom Level)
* `coloredHumanReadableBlock` &minus; Loggt einen gefärbten Block von Informatioen, mit einer Zeile pro Detail
   (Farbe abhängig vom Level)
* `json` &minus; Loggt alle Informationen als ein einzeiliges JSON-Objekt

Siehe auch: [Logging-Formate](#logging-formate)

### logging.fileLoggingFormat
Gibt an welches Format verwendet werden soll, für das Logging in der Konsole, welches in eine Datei umgeleitet wird.

Standard: [json](#json-error-log-datei-und-konsole)

Typ: LoggingFormat, also eines aus
* `humanReadableLine` &minus; Loggt eine einfache Zeile aus Informationen
* `humanReadableBlock` &minus; Loggt einen Block von Informatioen, mit einer Zeile pro Detail
* `coloredHumanReadableLine` &minus; Loggt eine gefärbte Zeile aus Informationen
   (Farbe abhängig vom Level)
* `coloredHumanReadableBlock` &minus; Loggt einen gefärbten Block von Informatioen, mit einer Zeile pro Detail
   (Farbe abhängig vom Level)
* `json` &minus; Loggt alle Informationen als ein einzeiliges JSON-Objekt

Siehe auch: [Logging-Formate](#logging-formate)

### logging.errorFileLoggingFormat
Gibt das Format für das Error-Logging an.

Standard: [json](#json-error-log-datei-und-konsole)

Typ: LoggingFormat, also eines aus
* `humanReadableLine` &minus; Loggt eine einfache Zeile aus Informationen
* `humanReadableBlock` &minus; Loggt einen Block von Informatioen, mit einer Zeile pro Detail
* `coloredHumanReadableLine` &minus; Loggt eine gefärbte Zeile aus Informationen
   (Farbe abhängig vom Level)
* `coloredHumanReadableBlock` &minus; Loggt einen gefärbten Block von Informatioen, mit einer Zeile pro Detail
   (Farbe abhängig vom Level)
* `json` &minus; Loggt alle Informationen als ein einzeiliges JSON-Objekt

Siehe auch: [Logging-Formate](#logging-formate)

### logging.accessLoggingFormat
Gibt das Format für das detailierte Access-Logging an.

Standard: [json](#json-access-log-datei)

Typ: AccessLoggingFormat, also eines von
* `classic` &minus; Loggt Details, ähnlich wie nginx or apache2
* `json` &minus; Loggt Details als ein einzeiliges JSON-Objekt

Siehe auch: [Access-Logging-Formate](#access-logging-formate)

### logging.enableLogFileRotation
Gibt an ob die Dateien für das Error-Logging und das Access-Logging rotiert werden sollen.

Standard: `true`

Typ: boolean

### logging.logFileRotationFrequenceUnit
Gibt die Häufigkeit (Interval) der Log-Dateien-Rotation an, falls aktiv.

Standard: `d` (täglich)

Typ: Eines von
* `s` &minus; Sekündlich (Beim loggen, falls das letzte Logging mindestens eine Sekune zurück liegt)
  (Ausschließlich für Tests geeignet)
* `m` &minus; Minütlich (Beim loggen, falls das letzte Logging mindestens eine Minute zurück liegt)
  (Ausschließlich für Tests empfohlen)
* `h` &minus; Stündlich (Beim loggen, falls das letzte Logging mindestens eine Stunde zurück liegt)
* `d` &minus; Täglich (Beim loggen, falls das letzte Logging mindestens einen Tag zurück liegt)
  (empfohlen)

### logging.logFileRotationMaxFiles
Gibt die Anzahl der Dateien an, die behalten werden sollen, wenn die Log-Datei-Rotation aktiv ist.

Standard: `14d` (Dateien der letzten 14 Tage)

Typ: String mit Anzahl und Einheit (`s`, `m`, `h` oder `d`) \
(Beispiel: `60h` um die Dateien der letzten 60 Stunden zu behalten)

### logging.logFileRotationEnableCompression
Gibt an, ob die rotierten Dateien mittels gzip komprimiert werden sollen, wenn die Log-Datei-Rotation aktiv ist.

Standard: `true`

Typ: boolean

## Beispiele

### JSON

```json
{
    "level": "debug",
    "ipLogging": "none",
    "enableErrorFileLogging": true,
    "enableAccessLogging": true,
    "accessLogFile": "/opt/fc/access.log",
    "errorLogFile": "/opt/fc/error.log",
    "ttyLoggingFormat": "coloredHumanReadableBock",
    "fileLoggingFormat": "humanReadableLine",
    "errorFileLoggingFormat": "humanReadableBlock",
    "accessLoggingFormat": "classic",
    "enableLogFileRotation": true,
    "logFileRotationFrequencyUnit": "h",
    "logFileRotationMaxFiles": "20h",
    "logFileRotationEnableCompression": false
}
```

### YAML

```yaml
level: debug
ipLogging: none
enableErrorFileLogging: true
enableAccessLogging: true
accessLogFile: /opt/fc/access.log
errorLogFile: /opt/fc/error.log
ttyLoggingFormat: coloredHumanReadableBock
fileLoggingFormat: humanReadableLine
errorFileLoggingFormat: humanReadableBlock
accessLoggingFormat: classic
enableLogFileRotation: true
logFileRotationFrequencyUnit: h
logFileRotationMaxFiles: 20h
logFileRotationEnableCompression: false
```
### Umgebungsvariablen

```properties
FILES_CRUD_LOGGING__NAME=debug
FILES_CRUD_LOGGING__IP_LOGGING=none
FILES_CRUD_LOGGING__ENABLE_ERROR_FILE_LOGGING=true
FILES_CRUD_LOGGING__ENABLE_ACCESS_LOGGING=true
FILES_CRUD_LOGGING__ACCESS_LOG_FILE=/opt/fc/access.log
FILES_CRUD_LOGGING__ERROR_LOG_FILE=/opt/fc/error.log
FILES_CRUD_LOGGING__TTY_LOGGING_FORMAT=coloredhumanReadableBlock
FILES_CRUD_LOGGING__FILE_LOGGING_FORMAT=humanReadableLine
FILES_CRUD_LOGGING__ERROR_FILE_LOGGING_FORMAT=humanReadableBlock
FILES_CRUD_LOGGING__ACCESS_LOGGING_FORMAT=json
FILES_CRUD_LOGGING__ENABLE_LOG_FILE_ROTATION=true
FILES_CRUD_LOGGING__LOG_FILE_ROTATION_FREQUENCY_UNIT=h
FILES_CRUD_LOGGING__LOG_FILE_ROTATION_MAX_FILES=20h
FILES_CRUD_LOGGING__LOG_FILE_ROTATION_ENABLE_COMPRESSION=false
```

## Logging-Formate

Folgende Beispiele werden genutzt, um die unterschiedlichen Formate zu visualisieren
* debug
  * timestamp: `2025-01-29T12:11:12.654`
  * sourcePath: `/opt/fc/built/lib/server/handler/file.js`
  * message: `Loaded following directory items.`
  * meta: `{"directory":"holidays","items":["flight/","allTogether.png","swimming.mp4"]}`
* info
  * timestamp: `2025-01-18T18:29:56.382`
  * sourcePath: `/opt/fc/built/lib/server/handler/file.js`
  * message: `Successfully saved file.`
  * meta: `{"path":"holidays/allTogether.png","size":67367,"mimetype":"image/png","mimetypeFrom":"files attribute"}`
* warn
  * timestamp: `2025-02-23T13:44:11.765`
  * sourcePath: `/opt/fc/built/lib/server/handler/user.js`
  * message: `password is a bit short. Maybe implement passwords rules in future.`
  * meta: `{"length":9}`
* error
  * timestamp: `2025-01-18T19:21:22.823`
  * sourcePath: `/opt/fc/built/lib/server/handler/file.js`
  * message: `Error. File holidays/allTogeth.png does not exist.`
  * meta: `{"statusCode":400}`

Die Bilder zeigen, wie es aussehen würde, im Terminal `bash` von `Linux Mint 22` (`Cinnamon`) mit 80 Zeichen Fenster-Länge.
Um zwischen echten Zeilenumbrüchen und zur besseren Darstellung eingefügten Zeilenumbrüchen zu unterscheiden,
haben die eigentlichen Zeilen abwechselnde Hintergrundfarben.

### humanReadableLine
Loggt eine einfache Zeile aus Informationen.

![humanReadableLine](/images/humanReadableLine.png)

### humanReadableBlock
Loggt einen Block von Informatioen, mit einer Zeile pro Detail.

![humanReadableBlock](/images/humanReadableBlock.png)

### coloredHumanReadableLine
Loggt eine gefärbte Zeile aus Informationen. Farbe abhängig vom Level

![coloredHumanReadableLine](/images/coloredHumanReadableLine.png)

### coloredHumanReadableBlock
Loggt einen gefärbten Block von Informatioen, mit einer Zeile pro Detail. Farbe abhängig vom Level

![coloredHumanReadableBlock](/images/coloredHumanReadableBlock.png)

### json (Error-Log-Datei und Konsole)

Loggt alle Information als ein einzeiliges JSON-Objekt.

![json](/images/json.png)

## Access-Logging-Formate

Folgende Beispiel-Details werden genutzt, um die verschiedenen Formate zu visualisieren
* ip: `42.0.8.15`
* timestamp: `2025-01-18T18:29:56.382`
* method: `POST`
* path: `/api/file/save/holidays/allTogether.png`
* httpVersion: `HTTP/1.1`
* statusCode: 200
* contentLength: 35
* referer: `https://example-files-crud.com/upload-form.html`
* userAgent: `Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0`
* time: 213 (Zeit zwischen Request und Response in Millisekunden)

### classic
Loggt Details, ähnlich zu nginx or apache2.

```
42.0.8.15 - [2025-01-18T18:29:56.382] "POST /api/file/save/holidays/allTogether.png HTTP/1.1" 200 35 "https://example-files-crud.com/upload-form.html" "Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0" - 213
```

### json (Access-Log-Datei)
Loggt Details als ein einzeiliges JSON-Objekt.

```
{"ip":"42.0.8.15","timestamp":"2025-01-18T18:29:56.382","method":"POST","path":"/api/file/save/holidays/allTogether.png","httpVersion":"HTTP/1.1","statusCode":200,"contentLength":35,"referer":"https://example-files-crud.com/upload-form.html","userAgent":"Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0","time":213}
```
