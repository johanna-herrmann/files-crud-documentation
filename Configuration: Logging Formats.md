# LoggingConfiguration &rarr; Logging Formats

[Wiki](/wiki) &rarr; [Configuration](/wiki/Configuration) &rarr;[LoggingConfiguration](wiki/Configuration:-Logging) &rarr; [Logging Formats](/wiki/Configuration:-Logging-Formats)

This pages lists and visualizes the available logging formats.

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

## humanReadableLine
Logs a simple line of information.

![humanReadableLine](https://github.com/johanna-herrmann/files-crud/wiki/images/humanReadableLine.png)

## humanReadableBlock
Logs a block of information.

![humanReadableBlock](https://github.com/johanna-herrmann/files-crud/wiki/images/humanReadableBlock.png)

## coloredHumanReadableLine
Logs a colored line of information. Color depends on log level.

![coloredHumanReadableLine](https://github.com/johanna-herrmann/files-crud/wiki/images/coloredHumanReadableLine.png)

## coloredHumanReadableBlock
Logs a colored block of information.

![coloredHumanReadableBlock](https://github.com/johanna-herrmann/files-crud/wiki/images/coloredHumanReadableBlock.png)

### json

Logs all information as single line json object.

![json](wiki/formats/json.png)
![json](https://github.com/johanna-herrmann/files-crud/wiki/images/json.png)
