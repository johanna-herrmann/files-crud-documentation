# Usage - CLI

This page shows the usage of files-crud CLI.

## General

### Usage
```bash
filescrud [options] [command] [command-args] [command-options]
```

### General options

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| -V, --version             | output the version number                                 |
| -h, --help                | display help for command                                  |

### Examples
Displays files-crud version
```bash
filescrud --version
```

Displays help summary
```bash
filescrud help
```

Displays help for `start` command
```bash
filescrud help start
```

## Start
Starts files-crud application.

### Usage
```bash
filescrud start [options]
```

### Options

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix for environment variables (default: "FILES_CRUD")  |

### Examples
Starts application with defaults
```bash
filescrud start
```

Starts application with env-prefix `FC`
```bash
filescrud start -e FC
```

Starts application with env-prefix `APP`
```bash
filescrud start --env-prefix APP
```


## Controlling running applications
Controlls a running files-crud application. \
On startup, the application creates a `.control.json` file in current working directory (`./`).
The following commands read this file, also from working dir.

### Usage
```bash
filescrud stop|restart|reload  [options]
```

### Options
For `restart` and `reload` command:

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix for environment variables (default: "FILES_CRUD")  |

### stop
(not suitable for docker)

Stopps a running application

```bash
filescrud stop
```

### restart
(not suitable for docker)

Restarts application with default env-prefix (FILES_CRUD)
```bash
filescrud restart
```

Restarts application with env-prefix `FC`
```bash
filescrud restart -e FC
```

### reload
Reloads the configuration for a running application. \
Affects all properties except for
* server.host
* server.port
* server.useHttps
* server.useHttp2

Reloads config with default env-prefix (FILES_CRUD)
```bash
filescrud reload
```

Reloads config with env-prefix `FC`
```bash
filescrud reload -e FC
```

## Integrity
Checks the integrity of files, using their md5 checksums.

### Usage
```bash
filescrud integrity [options] [arguments]
```

### Options

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix for environment variables (default: "FILES_CRUD")  |

### Arguments
* path &minus; Path to the directory or file to check the integrity for.
  Storage root directory if not specified



### Examples
Checks integrity for whole storage
```bash
filescrud integrity
```

Checks integrity for directory `images/holidays`
```bash
filescrud integrity images/holidays
```

Checks integrity for directory `videos/holidays in Rome`
```bash
filescrud integrity "videos/holidays in Rome"
```

## Admin
Creates an admin user.

### Usage
```bash
filescrud admin [options]
```

### Options

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix for environment variables (default: "FILES_CRUD")  |
| -u, --username <username> | Username of the user to create (default: random string)   |
| -p, --password <password> | Password of the user to create (default: random string)   |

### Examples
Creates admin with random username and password
```bash
filescrud admin
```

Creates admin with username `johanna123_admin` and random password
```bash
filescrud integrity --username johanna123_admin
```

Creates admin with random username  and password `passw0rd987_fjqekfl`
```bash
filescrud integrity -p passw0rd987_fjqekfl
```

Creates admin with username `johanna123_admin` and password `passw0rd987_fjqekfl`
```bash
filescrud integrity --username johanna123_admin -p passw0rd987_fjqekfl
```

### Random
If username or password is not given, random string is generated for it. \
The random string consists of 6 bytes for username, 15 bytes for password, each base64url-encoded.

Examples:
* username: `d1J0N25S`
* password: `VExQUU1UZ3dNakl3TWpVRQ`

## Config
Shows current configuration.

### Usage
```bash
filescrud config [options] [arguments]
```

### Options

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix for environment variables (default: "FILES_CRUD")  |
| -n, --no-defaults         | Only show specified configuration, but no defaults        |

### Arguments
* format &minus; Format to show the config in (json|yaml|env|properties) (default: "json")

### Examples
Shows full config in json format
```bash
filescrud config
```

Shows specified config in yaml format
```bash
filescrud config -n yaml
```

Shows full config in environment variables format
```bash
filescrud config env
```
