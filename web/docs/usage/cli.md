# Usage - CLI

This pages shows the usage of files-crud CLI.

## General

### Usage
`filescrud [options] [command]`

### Options

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| -V, --version             | output the version number                                 |
| -h, --help                | display help for command                                  |

### Examples
* `filescrud --version` &minus; Displays files-crud version
* `filescrud help` &minus; Displays help summary
* `filescrud help start` &minus; Displays help for `start` command


## Start
Starts files-crud application.

### Usage
`filescrud start [options]`

### Options

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix for environment variables (default: "FILES_CRUD")  |

### Examples
* `filescrud start` &minus; Starts application with defaults
* `filescrud start -e FC` &minus; Starts application with env-prefix `FC`
* `filescrud start --env-prefix APP` &minus; Starts application with env-prefix `APP`


## Stop
Stops a running files-crud application.

### Usage
`filescrud stop`

## Restart
Restarts a running files-crud application.

### Usage
`filescrud restart [options]`

#### Options

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix for environment variables (default: "FILES_CRUD")  |

### Examples
* `filescrud restart` &minus; Restarts application with default env-prefix (FILES_CRUD)
* `filescrud restart -e FC` &minus; Restarts application with env-prefix `FC`
* `filescrud restart --env-prefix APP` &minus; Restarts application with env-prefix `APP`

## Reload
Reloads the configuration for a running application. \
Affects all properties except for
* server.host
* server.port
* server.useHttps
* server.useHttp2

### Usage
`filescrud reload [options]`

### Options

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix for environment variables (default: "FILES_CRUD")  |

### Examples
* `filescrud reload` &minus; Reloads config with default env-prefix (FILES_CRUD)
* `filescrud reload -e FC` &minus; Reloads config with env-prefix `FC`
* `filescrud reload --env-prefix APP` &minus; Reloads config with env-prefix `APP`

## Integrity
Checks the integrity of all files, using their md5 checksums.

### Usage
`filescrud integrity [options] [path]`

### Options

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix for environment variables (default: "FILES_CRUD")  |

### Arguments
* path &minus; Path to the directory or file to check the integrity for.
  Storage root directory if not specified (default: "")


### Examples
* `filescrud integrity` &minus; Checks integrity for whole storage
* `filescrud integrity images/holidays` &minus; Checks integrity for directory `images/holidays`
* `filescrud integrity "videos/holidays in Rome"` &minus; Checks integrity for directory `videos/holidays in Rome`

## Admin
Creates an admin user.

### Usage
`filescrud admin [options]`

### Options

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix for environment variables (default: "FILES_CRUD")  |
| -u, --username <username> | Username of the user to create (default: random string)   |
| -p, --password <password> | Password of the user to create (default: random string)   |

### Examples
* `filescrud admin` &minus; Creates admin with random username and password
* `filescrud integrity --username johanna123_admin` &minus;
   Creates admin with username `johanna123_admin` and random password
* `filescrud integrity -p passw0rd987_fjqekfl` &minus;
   Creates admin with random username  and password `passw0rd987_fjqekfl`
* `filescrud integrity --username johanna123_admin -p passw0rd987_fjqekfl` &minus;
   Creates admin with username `johanna123_admin` and password `passw0rd987_fjqekfl`

### Random
If username or password is not given, random string is generated for it. \
The random string consist of 6 bytes for username, 15 bytes for password, base64url-encoded

## Config
Shows current configuration.

### Usage
`filescrud config [options] [format]`

### Options

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix for environment variables (default: "FILES_CRUD")  |
| -n, --no-defaults         | Only show specified configuration, but no defaults        |

### Arguments
* format &minus; Format to show the config in (json|yaml|env|properties) (default: "json")

### Examples
* `filescrud config` &minus; Shows full config in json format
* `filescrud config -n yaml` &minus; Shows specified config in yaml format
* `filescrud config env` &minus; Shows full config in environment variables format
