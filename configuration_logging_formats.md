<style>
   .bash {
    background: #3f3f3f;
    padding: 3px;
    font-family: monospace;
    font-size: 12;
   }

   .bash .line:nth-child(odd) {
    background: #353535;
   }

   .bash .line:nth-child(even) {
    background: #4a4a4a;
   }

   .debug {
    color: #3465a4;
   }

   .info {
    color: #4e9a06;
   }

   .warn {
    color: #c4a000;
   }

   .error {
    color: #cc0000;
   }
</style>

# LoggingConfiguration &rarr; Logging Formats

[Wiki](/wiki) &rarr; [LoggingConfiguration](/wiki/configuration_logging) &rarr; [Logging Formats](/wiki/configuration_logging_formats)

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

Visualization shows, how it would look like, using `bash` in `Linux Mint 22` (`Cinnamon`).
To differentiate between true line breaks and those added by your browser to prevent side-scrolling,
actual lines have alternating background-colors.

## humanReadableLine
Logs a simple line of information.

### Debug
<div class="bash">
    <div class="line">2025-01-29T12:11:12.654 [/opt/fc/built/lib/server/handler/file.js] DEBUG: Loaded following directory items. - {"directory":"holidays","items":["flight/","allTogether.png","swimming.mp4"]}</div>
</div>

### Info
<div  class="bash">
    <div class="line">2025-01-18T18:29:56.382 [/opt/fc/built/lib/server/handler/file.js] INFO: Successfully saved file. - {"path":"holidays/allTogether.png","size":67367,"mimetype":"image/png","mimetypeFrom":"files attribute"}</div>
</div>

### Warn
<div class="bash">
    <div class="line">2025-02-23T13:44:11.765 [/opt/fc/built/lib/server/handler/user.js] WARN: password is a bit short. Maybe implement passwords rules in future. - {"length": 9}</div>
</div>

### Error
<div class="bash">
    <div class="line">2025-01-18T19:21:22.823 [/opt/fc/built/lib/server/handler/file.js] ERROR: Error. File holidays/allTogeth.png does not exist. - {"statusCode":400}</div>
</div>

## humanReadableBlock
Logs a block of information.

Notice: The bottom line length equals the current length of the terminal window (fallback: 80 times `_`). The length above is shortened to 50 times `_` to perevent the line to be splitted.

### Debug
<div class="bash">
    <div class="line">2025-01-29T12:11:12.654</div>
    <div class="line">[/opt/fc/built/lib/server/handler/file.js]</div>
    <div class="line">DEBUG:</div>
    <div class="line">Loaded following directory items.</div>
    <div class="line">{"directory":"holidays","items":["flight/","allTogether.png","swimming.mp4"]}</div>
    <div class="line">__________________________________________________</div>
    <div class="line">&nbsp;</div>
</div>

### Info
<div  class="bash">
    <div class="line">2025-01-18T18:29:56.382</div>
    <div class="line">[/opt/fc/built/lib/server/handler/file.js]</div>
    <div class="line">INFO</div>
    <div class="line">Successfully saved file.</div>
    <div class="line">{"path":"holidays/allTogether.png","size":67367,"mimetype":"image/png","mimetypeFrom":"files attribute"}</div>
    <div class="line">__________________________________________________</div>
    <div class="line">&nbsp;</div>
</div>

### Warn
<div class="bash">
    <div class="line">2025-02-23T13:44:11.765</div>
    <div class="line">[/opt/fc/built/lib/server/handler/user.js]</div>
    <div class="line">WARN</div>
    <div class="line">password is a bit short. Maybe implement passwords rules in future.</div>
    <div class="line">{"length": 9}</div>
    <div class="line">__________________________________________________</div>
    <div class="line">&nbsp;</div>
</div>

### Error
<div class="bash">
    <div class="line">2025-01-18T19:21:22.823</div>
    <div class="line">[/opt/fc/built/lib/server/handler/file.js]</div>
    <div class="line">ERROR:</div>
    <div class="line">Error. File holidays/allTogeth.png does not exist.</div>
    <div class="line">{"statusCode":400}</div>
    <div class="line">__________________________________________________</div>
    <div class="line">&nbsp;</div>
</div>

## coloredHumanReadableLine
Logs a colored line of information. Color depends on log level.

### Debug
<div class="bash">
    <div class="line debug">2025-01-29T12:11:12.654 [/opt/fc/built/lib/server/handler/file.js] DEBUG: Loaded following directory items.. - {"directory":"holidays","items":["flight/","allTogether.png","swimming.mp4"]}</div>
</div>

### Info
<div  class="bash">
    <div class="line info">2025-01-18T18:29:56.382 [/opt/fc/built/lib/server/handler/file.js] INFO: Successfully saved file. - {"path":"holidays/allTogether.png","size":67367,"mimetype":"image/png","mimetypeFrom":"files attribute"}</div>
</div>

### Warn
<div class="bash">
    <div class="line warn">2025-02-23T13:44:11.765 [/opt/fc/built/lib/server/handler/user.js] WARN: password is a bit short. Maybe implement passwords rules in future. - {"length": 9}</div>
</div>

### Error
<div class="bash">
    <div class="line error">2025-01-18T19:21:22.823 [/opt/fc/built/lib/server/handler/file.js] ERROR: Error. File holidays/allTogeth.png does not exist. - {"statusCode":400}</div>
</div>

## coloredHumanReadableBlock
Logs a colored block of information.

Notice: The bottom line length equals the current length of the terminal window (fallback: 80 times `_`). The length above is shortened to 50 times `_` to perevent the line to be splitted.

### Debug
<div class="bash">
    <div class="line debug">2025-01-29T12:11:12.654</div>
    <div class="line debug">[/opt/fc/built/lib/server/handler/file.js]</div>
    <div class="line debug">DEBUG:</div>
    <div class="line debug">Loaded following directory items.</div>
    <div class="line debug">{"directory":"holidays","items":["flight/","allTogether.png","swimming.mp4"]}</div>
    <div class="line">__________________________________________________</div>
    <div class="line">&nbsp;</div>
</div>

### Info
<div  class="bash">
    <div class="line info">2025-01-18T18:29:56.382</div>
    <div class="line info">[/opt/fc/built/lib/server/handler/file.js]</div>
    <div class="line info">INFO</div>
    <div class="line info">Successfully saved file.</div>
    <div class="line info">{"path":"holidays/allTogether.png","size":67367,"mimetype":"image/png","mimetypeFrom":"files attribute"}</div>
    <div class="line">__________________________________________________</div>
    <div class="line">&nbsp;</div>
</div>

### Warn
<div class="bash">
    <div class="line warn">2025-02-23T13:44:11.765</div>
    <div class="line warn">[/opt/fc/built/lib/server/handler/user.js]</div>
    <div class="line warn">WARN</div>
    <div class="line warn">password is a bit short. Maybe implement passwords rules in future.</div>
    <div class="line warn">{"length": 9}</div>
    <div class="line">__________________________________________________</div>
    <div class="line">&nbsp;</div>
</div>

### Error
<div class="bash">
    <div class="line error">2025-01-18T19:21:22.823</div>
    <div class="line error">[/opt/fc/built/lib/server/handler/file.js]</div>
    <div class="line error">ERROR:</div>
    <div class="line error">Error. File holidays/allTogeth.png does not exist.</div>
    <div class="line error">{"statusCode":400}</div>
    <div class="line">__________________________________________________</div>
    <div class="line">&nbsp;</div>
</div>

### json

Logs all information as single line json object.

### Debug
<div class="bash">
    <div class="line">{"timestamp":"2025-01-29T12:11:12.654","level":"debug","source":"/opt/fc/built/lib/server/handler/file.js","message":"Loaded following directory items.","meta":{"directory":"holidays","items":["flight/","allTogether.png","swimming.mp4"]}}</div>
</div>

### Info
<div  class="bash">
    <div class="line">{"timestamp":"2025-01-18T18:29:56.382","level":"info","source":"/opt/fc/built/lib/server/handler/file.js","message":"Successfully saved file.","meta":{"path":"holidays/allTogether.png","size":67367,"mimetype":"image/png","mimetypeFrom":"files attribute"}}</div>
</div>

### Warn
<div class="bash">
    <div class="line">{"timestamp":"2025-02-23T13:44:11.765","level":"warn","source":"/opt/fc/built/lib/server/handler/user.js","message":"password is a bit short. Maybe implement passwords rules in future.","meta":{"length": 9}}</div>
</div>

### Error
<div class="bash">
    <div class="line">{"timestamp":"2025-01-18T19:21:22.823","level":"error","source":"/opt/fc/built/lib/server/handler/file.js","message":"Error. File holidays/allTogeth.png does not exist.","meta":{"statusCode":400}}</div>
</div>
