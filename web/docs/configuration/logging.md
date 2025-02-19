# Logging-Configuration

The logging configuration is used to specify the logging behaviour.

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

### Environment Variables

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

## Properties

### logging.level

Specifies the minimum level to log.

Default: `info`

Type: One of
* `debug` &minus; Logs on: `debug`, `info`, `warn`, `error`
* `info` &minus; Logs on: `info`, `warn`, `error`
* `warn` &minus; Logs on: `warn`, `error`
* `error` &minus; Logs on: `error`

### logging.ipLogging

Specifies if and how to log ip addresses for access logging, if enabled.

Default: `anonymous`

Type: One of
* `full` &minus; Logs full ip address
* `anonymous` &minus; Logs anonymized ip address (last part will be replaced by `_`) \
  (Example: `233.42.23._` instead of `233.42.23.123`)
* `none` &minus; Does not log ip addresses (whole address will be replaced by `_`)

### logging.enableErrorFileLogging

If `true`, errors will be logged to a file,
specified as [logging.errorLogFile](#loggingerrorlogfile),
additionally to console logging.

Default: `true`

Type: Boolean

### logging.enableAccessLogging

Static file access always will be logged (method, path, statusCode) to console.
If `true`, additionally,
each access (static files and API) will be logged detailed to a file,
specified as [logging.accessLogFile](#loggingaccesslogfile).

Default: `true`

Type: Boolean

### logging.accessLogFile
Specifies the path to the file for access logging
(see: [logging.enableAccessLogging](#loggingenableaccesslogging))

Default: `./access.log`

Type: String (path, absolute or relative to working directory)

### logging.errorLogFile
Specifies the path to the file for error file logging
(see: [logging.enableErrorFileLogging](#loggingenableerrorfilelogging))

Default: `./error.log`

Type: String (path, absolute or relative to working directory)

### logging.ttyLoggingFormat
Specifies which format to use for logging in console.

Default: [coloredHumanReadableLine](#coloredhumanreadableline)

Type: LoggingFormat, which is one of
* `humanReadableLine` &minus; Logs a simple line of information
* `humanReadableBlock` &minus; Logs a block of information, one line per detail
* `coloredHumanReadableLine` &minus; Logs a colored line of information
   (color depends on logging level)
* `coloredHumanReadableBlock` &minus; Logs a colored block of information, one line per detail
   (color depends on logging level)
* `json` &minus; Logs all information as single line json object.

See also: [Logging Formats](#logging-formats)

### logging.fileLoggingFormat
Specifies which format to use for file logging
if stdout or stderr is redirected to a file.

Default: [json](#json-error-log-file-and-console)

Type: LoggingFormat, which is one of
* `humanReadableLine` &minus; Logs a simple line of information
* `humanReadableBlock` &minus; Logs a block of information, one line per detail
* `coloredHumanReadableLine` &minus; Logs a colored line of information
   (color depends on logging level)
* `coloredHumanReadableBlock` &minus; Logs a colored block of information, one line per detail
   (color depends on logging level)
* `json` &minus; Logs all information as single line json object.

See also: [Logging Formats](#logging-formats)

### logging.errorFileLoggingFormat
Specifies which format to use for error file logging.

Default: [json](#json-error-log-file-and-console)

Type: LoggingFormat, which is one of
* `humanReadableLine` &minus; Logs a simple line of information
* `humanReadableBlock` &minus; Logs a block of information, one line per detail
* `coloredHumanReadableLine` &minus; Logs a colored line of information
   (color depends on logging level)
* `coloredHumanReadableBlock` &minus; Logs a colored block of information, one line per detail
   (color depends on logging level)
* `json` &minus; Logs all information as single line json object.

See also: [Logging Formats](#logging-formats)

### logging.accessLoggingFormat
Specifies which format to use for detailed access logging.

Default: [json](#json-access-logging-file)

Type: AccessLoggingFormat, which is one of
* `classic` &minus; Logs details, similar to nginx or apache2 access logging.
* `json` &minus; Logs details as single-line json object.

See also: [Access Logging Formats](#access-logging-formats)

### logging.enableLogFileRotation
Specifies if the error log file and the access log file should be rotated automatically.

Default: `true`

Type: boolean

### logging.logFileRotationFrequenceUnit
Specifies the frequency of the log file rotation, if enabled.

Default: `d` (Daily)

Type: One of
* `s` &minus; Secondly (On logging event, if last event is at least one second in past)
  (Only suitable for tests)
* `m` &minus; Minutely (On logging event, if last event is at least one minute in past)
  (Only recommended for tests)
* `h` &minus; Hourly (On logging event, if last event is at least one hour in past)
* `d` &minus; Daily (On logging event, if last event is at least one day in past)
  (recommended)

### logging.logFileRotationMaxFiles
Specifies the amount of files to keep if log file rotation is enabled.

Default: `14d` (Files of last 14 days)

Type: String with number and unit (`s`, `m`, `h` or `d`) \
(Example: `60h` to keep the files of the last 60 hours)

### logging.logFileRotationEnableCompression
Specifies if the rotated files should be compressed using gzip.

Default: `true`

Type: boolean

## Examples

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
### Environment Variables

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

## Logging Formats

Following examples are used to visualize the different formats
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

Visualization shows, how it would look like, using `bash` in `Linux Mint 22` (`Cinnamon`) with 80 chars length.
To differentiate between true line breaks and those added by the terminal,
actual lines have alternating background-colors.

### humanReadableLine
Logs a simple line of information.

![humanReadableLine](/images/humanReadableLine.png)

### humanReadableBlock
Logs a block of information.

![humanReadableBlock](/images/humanReadableBlock.png)

### coloredHumanReadableLine
Logs a colored line of information. Color depends on log level.

![coloredHumanReadableLine](/images/coloredHumanReadableLine.png)

### coloredHumanReadableBlock
Logs a colored block of information.

![coloredHumanReadableBlock](/images/coloredHumanReadableBlock.png)

### json (error log file and console)

Logs all information as single line json object.

![json](/images/json.png)

## Access Logging Formats

Following example details are used to visualize the different formats
* ip: `42.0.8.15`
* timestamp: `2025-01-18T18:29:56.382`
* method: `POST`
* path: `/api/file/save/holidays/allTogether.png`
* httpVersion: `HTTP/1.1`
* statusCode: 200
* contentLength: 35
* referer: `https://example-files-crud.com/upload-form.html`
* userAgent: `Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0`
* time: 213 (time between request and response in milli seconds)

### classic
Logs details, similar to nginx or apache2 access logging.

```
42.0.8.15 - [2025-01-18T18:29:56.382] "POST /api/file/save/holidays/allTogether.png HTTP/1.1" 200 35 "https://example-files-crud.com/upload-form.html" "Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0" - 213
```

### json (access logging file)
Logs details as single-line json object.

```
{"ip":"42.0.8.15","timestamp":"2025-01-18T18:29:56.382","method":"POST","path":"/api/file/save/holidays/allTogether.png","httpVersion":"HTTP/1.1","statusCode":200,"contentLength":35,"referer":"https://example-files-crud.com/upload-form.html","userAgent":"Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0","time":213}
```
