# Usage - Docker

This page shows, how to files-crud docker image.

## Synopsis
`docker run -d -p <LOCAL_PORT>:<PORT> -v <LOCAL_PATH>:/data [-e <ENV_NAME>=<ENV_VALUE> [...]] filescrud/filescrud [COMMAND] [OPTIONS] [ARGS]`

or to listen only on `localhost`: \
`docker run -d -p 127.0.0.1:<LOCAL_PORT>:<PORT> -v <LOCAL_PATH>:/data [-e <ENV_NAME>=<ENV_VALUE> [...]] filescrud/filescrud [COMMAND] [OPTIONS] [ARGS]`

* LOCAL_PORT &minus; local port whichs redirects to docker container exposed port
* PORT &minus; docker container port to expose
* LOCAL_PATH &minus; local path to bind to container's data directory `/data`
* ENV_NAME &minus; Environment variable name
* ENV_VALUE &minus; Environment variable value
* COMMAND &minus; [CLI](/usage/cli) sub command to run
* OPTIONS &minus; Options for [CLI](/usage/cli) sub command
* ARGS &minus; Args for [CLI](/usage/cli) sub command

## Examples

### Start with defaults
The following starts the application width default configuration
([server.host](/configuration/server#host) is set to `0.0.0.0` automatically).

`docker run -d -p 9000:9000 -v ./:/data filescrud/filescrud start`

#### shortcut
`docker run -d -p 9000:9000 -v ./:/data filescrud/filescrud` \
(passing no sub command, options and args)

### Start with custom host and port
`docker run -d -p 8000:8000 -v ./:/data -e FILES_CRUD_SERVER__HOST=1.2.3.4 -e FILES_CRUD_SERVER__PORT=8000 filescrud/filescrud start`

### Check integrity for whole storage
`docker run -d -p 9000:9000 -v ./:/data filescrud/filescrud integrity`

## Reload configuration in running container
Assuming container is running with name `filescrud_1`:

### without passing environment variables
`docker exec -it filescrud_1 filescrud reload`

### passing environment variables

`docker exec -it -e FC_SERVER__HOST=0.0.0.0 -e FILES_CRUD_SERVER__PORT=8000 -e FILES_CRUD_STORAGE__PATH=/opt filescrud_1 filescrud reload`

## docker compose

The following example shows,
how to start files-crud with a mongodb, using environment variables.

docker-compose.yml
```yaml
name: filescrud

# replace 'dbUser' and 'dbPassword' to your desired db credentials

services:
  fc:
    image: filescrud/filescrud
    restart: on-failure:3
    depends_on:
      db:
        condition: service_healthy
        restart: true
    environment:
      FILES_CRUD_DATABASE__NAME: postgresql
      FILES_CRUD_DATABASE__HOST: db
      FILES_CRUD_DATABASE__USER: dbUser
      FILES_CRUD_DATABASE__PASS: dbPassword
      # since docker-compose hanldes stdout and stderr as file streams despite it's shown in console:
      FILES_CRUD_LOGGING__FILE_LOGGING_FORMAT: coloredHumanReadableLine
    volumes:
      - ./fc:/data
    ports:
      - 9000:9000

  db:
    image: postgres:14-alpine
    restart: on-failure:3
    environment:
      - POSTGRES_USER=dbUser
      - POSTGRES_PASSWORD=dbPassword
      - POSTGRES_DB=files-crud
    volumes:
      - ./db:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dbUser -d files-crud"]
      interval: 10s
      timeout: 10s
      retries: 5
```
