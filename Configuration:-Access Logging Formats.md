# LoggingConfiguration &rarr; Access Logging Formats

[Wiki](../wiki) &rarr; [Configuration](../wiki/Configuration) &rarr;[LoggingConfiguration](../wiki/Configuration:-Logging) &rarr; [Access Logging Formats](../wiki/Configuration:-Access-Logging-Formats)

This pages lists and visualizes the available logging formats for access logging.

Following example details are used to visualize the different formats
* ip: `42.0.8.15`
* timestamp: `2025-01-18T18:29:56.382`
* method: `POST`
* path: `/api/file/save/holidays/allTogether.png`
* http version: `HTTP/1.1`
* statusCode: 200
* contentLength: 35
* referer: `https://example-files-crud.com/upload-form.html`
* user agent: `Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0`
* time: 213 (time between request and response in milli seconds)

## classic
Logs details, similar to nginx or apache2 access logging.

```

42.0.8.15 - [2025-01-18T18:29:56.382] "POST /api/file/save/holidays/allTogether.png HTTP/1.1" 200 35 "https://example-files-crud.com/upload-form.html" "Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0" - 213
```

### json
Logs details as single-line json object.

```

{"ip":"42.0.8.15","timestamp":"2025-01-18T18:29:56.382","method":"POST","path":"/api/file/save/holidays/allTogether.png","httpVersion":"HTTP/1.1","statusCode":200,"contentLength":35,"referer":"https://example-files-crud.com/upload-form.html","userAgent":"Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0","time":213}
```
