# LoggingConfiguration

[Wiki](../wiki) &rarr; [Configuration](../wiki/Configuration) &rarr;[LoggingConfiguration](../wiki/Configuration:-Logging)

The logging configuration is used to specify the logging behaviour.

## Syntax

### JSON

```json
{
    "ipLogging": "full" | "anonymous" | "none",
    "enableErrorFileLogging": boolean,
    "enableAccessLogging": boolean,
    "accessLogFile": String,
    "errorLogFile": String,
    "ttyLoggingFormat": String,
    "fileLoggingFormat": LoggingFormat,
    "accessLoggingFormat": AccessLoggingFormat,
    "enableLogFileRotation": boolean,
    "logFileRotationFrequencyUnit": "s" | "m" | "h" | "d",
    "logFileRotationMaxFiles": String,
    "logFileRotationEnableCompression": boolean
}
```

### YAML

```yaml
ipLogging: full | anonymous | none
enableErrorFileLogging: boolean
enableAccessLogging: boolean
accessLogFile: String
errorLogFile: String
ttyLoggingFormat: String
fileLoggingFormat: LoggingFormat
accessLoggingFormat: AccessLoggingFormat
enableLogFileRotation: boolean
logFileRotationFrequencyUnit: s | m | h | d
logFileRotationMaxFiles: String
logFileRotationEnableCompression: boolean
```

### Environment Variables

```properties
FILES_CRUD_LOGGING__IP_LOGGING=full | anonymous | none
FILES_CRUD_LOGGING__ENABLE_ERROR_FILE_LOGGING=boolean
FILES_CRUD_LOGGING__ENABLE_ACCESS_LOGGING=boolean
FILES_CRUD_LOGGING__ACCESS_LOG_FILE=String
FILES_CRUD_LOGGING__ERROR_LOG_FILE=String
FILES_CRUD_LOGGING__TTY_LOGGING_FORMAT=String
FILES_CRUD_LOGGING__FILE_LOGGING_FORMAT=LoggingFormat
FILES_CRUD_LOGGING__ACCESS_LOGGING_FORMAT=AccessLoggingFormat
FILES_CRUD_LOGGING__ENABLE_LOG_FILE_ROTATION=boolean
FILES_CRUD_LOGGING__LOG_FILE_ROTATION_FREQUENCY_UNIT=s | m | h | d
FILES_CRUD_LOGGING__LOG_FILE_ROTATION_MAX_FILES=String
FILES_CRUD_LOGGING__LOG_FILE_ROTATION_ENABLE_COMPRESSION=boolean
```

## Properties

### logging.ipLogging

Specifies if and how to log ip addresses for access logging, if enabled.

Required: No

Default: `anonymous`

Type: One of
* `full` &minus; Log full ip address
* `anonymous` &minus; Log anonymized ip address (last part will be replaced by `_`) \
  (Example: `233.42.23._` instead of `233.42.23.123`)
* `none` &minus; Don't log ip addresses (whole address be replaced by `_`)

### logging.enableErrorFileLogging

If `true`, errors will be logged to a file,
specified as [logging.errorLogFile](#loggingerrorlogfile),
additionally to console logging.

Required: No

Default: `true`

Type: Boolean

### logging.enableAccessLogging

Static file access always wille be logged (method, path, statusCode) to console.
If `true`, additionally,
each access (static files and API) will be logged detailed to a file,
specified as [logging.accessLogFile](#loggingaccesslogfile).

Required: No

Default: `true`

Type: Boolean

### logging.accessLogFile
Specifies the path to the file for access logging
(see: [logging.enableAccessLogging](#loggingenableaccesslogging))

Required: No

Default: `./access.log`

Type: String (path, absolute or relative to working directory)

### logging.errorLogFile
Specifies the path to the file for error file logging
(see: [logging.enableErrorFileLogging](#loggingenableerrorfilelogging))

Required: No

Default: `./error.log`

Type: String (path, absolute or relative to working directory)

### logging.ttyLoggingFormat
Specifies which format to use for logging in console.

Required: No

Default: [coloredHumanReadableLine](../wiki/Configuration:-Logging-Formats#coloredHumanReadableLine)

Type: LoggingFormat, which is one of
* `humanReadableLine` &minus; Logs a simple line of information
* `humanReadableBlock` &minus; Logs a block of information, one line per detail
* `coloredHumanReadableLine` &minus; Logs a colored line of information
   (color depends on logging level)
* `coloredHumanReadableBlock` &minus; Logs a colored block of information, one line per detail
   (color depends on logging level)
* `json` &minus; Logs all information as single line json object.

See also: [Logging Formats](../wiki/Configuration:-Logging-Formats)

### logging.fileLoggingFormat
Specifies which format to use for file logging.
This is used in the following to cases:
* Error logging to error log file
* Console logging if redirected to file

Required: No

Default: [json](../wiki/Configuration:-Logging-Formats#json)

Type: LoggingFormat, which is one of
* `humanReadableLine` &minus; Logs a simple line of information
* `humanReadableBlock` &minus; Logs a block of information, one line per detail
* `coloredHumanReadableLine` &minus; Logs a colored line of information
   (color depends on logging level)
* `coloredHumanReadableBlock` &minus; Logs a colored block of information, one line per detail
   (color depends on logging level)
* `json` &minus; Logs all information as single line json object.

See also: [Logging Formats](../wiki/Configuration:-Logging-Formats)

### logging.accessLoggingFormat
Specifies which format to use for detailed access logging.

Required: No

Default: [json](../wiki/Configuration:-Access-Logging-Formats#json)

Type: AccessLoggingFormat, which is one of
* `classic` &minus; Logs details, similar to nginx or apache2 access logging.
* `json` &minus; Logs details as single-line json object.

See also: [Access Logging Formats](../wiki/Configuration:-Access-Logging-Formats)

### logging.enableLogFileRotation
Specifies if the error log file and the access log file should be rotated automatically.

Required: No

Default: `true`

Type: boolean

### logging.logFileRotationFrequenceUnit
Specifies the frequency of the log file rotation, if enabled.

Required: No

Default: `d` (Daily)

Type: One of
* `s` &minus; Secondly (On logging event, if last event is at least one second in past)
  (Only recommended for tests)
* `m` &minus; Minutely (On logging event, if last event is at least one minute in past)
  (Only recommended for tests)
* `h` &minus; Hourly (On logging event, if last event is at least one hour in past)
* `d` &minus; Daily (On logging event, if last event is at least one day in past)
  (recommended)

### logging.logFileRotationMaxFiles
Specifies the amount of files to keep if log file rotation is enabled.

Required: No

Default: `14d` (Files of last 14 days)

Type: String with number and unit (`s`, `m`, `h` or `d`) \
(Example: `60h` to keep the files of the last 60 hours)

### logging.logFileRotationEnableCompression
Specifies if the rotated files should be compressed using gzip.

Required: No

Default: `true`

Type: boolean

## Examples

### JSON

```json
{
    "ipLogging": "none",
    "enableErrorFileLogging": true,
    "enableAccessLogging": true,
    "accessLogFile": "/opt/fc/access.log",
    "errorLogFile": "/opt/fc/error.log",
    "ttyLoggingFormat": "coloredHumanReadableBock",
    "fileLoggingFormat": "humanReadableLine",
    "accessLoggingFormat": "classic",
    "enableLogFileRotation": true,
    "logFileRotationFrequencyUnit": "h",
    "logFileRotationMaxFiles": "20h",
    "logFileRotationEnableCompression": false
}
```

### YAML

```yaml
ipLogging: none
enableErrorFileLogging: true
enableAccessLogging: true
accessLogFile: /opt/fc/access.log
errorLogFile: /opt/fc/error.log
ttyLoggingFormat: coloredHumanReadableBock
fileLoggingFormat: humanReadableLine
accessLoggingFormat: classic
enableLogFileRotation: true
logFileRotationFrequencyUnit: h
logFileRotationMaxFiles: 20h
logFileRotationEnableCompression: false
```
### Environment Variables

```properties
FILES_CRUD_LOGGING__IP_LOGGING=none
FILES_CRUD_LOGGING__ENABLE_ERROR_FILE_LOGGING=true
FILES_CRUD_LOGGING__ENABLE_ACCESS_LOGGING=true
FILES_CRUD_LOGGING__ACCESS_LOG_FILE=/opt/fc/access.log
FILES_CRUD_LOGGING__ERROR_LOG_FILE=/opt/fc/error.log
FILES_CRUD_LOGGING__TTY_LOGGING_FORMAT=coloredhumanReadableBlock
FILES_CRUD_LOGGING__FILE_LOGGING_FORMAT=humanReadableLine
FILES_CRUD_LOGGING__ACCESS_LOGGING_FORMAT=json
FILES_CRUD_LOGGING__ENABLE_LOG_FILE_ROTATION=true
FILES_CRUD_LOGGING__LOG_FILE_ROTATION_FREQUENCY_UNIT=h
FILES_CRUD_LOGGING__LOG_FILE_ROTATION_MAX_FILES=20h
FILES_CRUD_LOGGING__LOG_FILE_ROTATION_ENABLE_COMPRESSION=false
```
