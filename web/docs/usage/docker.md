# Usage - Docker

This page shows, how to use files-crud docker image.

## docker run

### Synopsis
```bash
docker run --init -dt -p <LOCAL_PORT>:<PORT> -v <LOCAL_PATH>:/data [-e <ENV_NAME>=<ENV_VALUE> [...]] filescrud/filescrud [COMMAND] [OPTIONS] [ARGS]
```

or to listen only on `localhost` of docker host:
```bash
docker run --init -dt -p 127.0.0.1:<LOCAL_PORT>:<PORT> -v <LOCAL_PATH>:/data [-e <ENV_NAME>=<ENV_VALUE> [...]] filescrud/filescrud [COMMAND] [OPTIONS] [ARGS]
```

* LOCAL_PORT &minus; local port which redirects to docker container port
* PORT &minus; docker container port to redirect to
* LOCAL_PATH &minus; local path to bind to container's data directory `/data` (must exist already)
* ENV_NAME &minus; Environment variable name
* ENV_VALUE &minus; Environment variable value
* COMMAND &minus; [CLI](/usage/cli) sub command to run
* OPTIONS &minus; Options for [CLI](/usage/cli) sub command
* ARGS &minus; Args for [CLI](/usage/cli) sub command

### Examples

#### Start with defaults
The following starts the application width default configuration.

```bash
docker run --init -dt -p 9000:9000 -v ./:/data filescrud/filescrud start
```

shortcut (passing no sub command, options and args):
```bash
docker run --init -dt -p 9000:9000 -v ./:/data filescrud/filescrud
```

#### Start with custom host and port
```bash
docker run --init -dt -p 8000:8000 -v ./:/data -e FILES_CRUD_SERVER__HOST=1.2.3.4 -e FILES_CRUD_SERVER__PORT=8000 filescrud/filescrud start
```

#### Check integrity for whole storage

In new container
```bash
docker run --init -dt -v ./:/data filescrud/filescrud integrity
```

In running container (assuming container name `filescrud_1`)
```bash
docker exec -it filescrud_1 filescrud integrity
```


## docker compose

The following example shows,
how to start files-crud with a postgresql, using environment variables.

docker-compose.yml
```yaml
name: filescrud

# replace 'dbUser' and 'dbPassword' by your desired db credentials

services:
  fc:
    image: filescrud/filescrud
    restart: on-failure:3
    tty: true
    init: true
    depends_on:
      db:
        condition: service_healthy
        restart: true
    environment:
      FILES_CRUD_DATABASE__NAME: postgresql
      FILES_CRUD_DATABASE__HOST: db
      FILES_CRUD_DATABASE__USER: dbUser
      FILES_CRUD_DATABASE__PASS: dbPassword
    volumes:
      - ./fc:/data
    ports:
      - 9000:9000
      # or if you want to restrict access to docker host's 127.0.0.1:
      # - 127.0.0.1:9000:9000

  db:
    image: postgres:14-alpine
    restart: on-failure:3
    tty: true
    init: true
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

command:
```bash
docker compose up -d
```

Notice the space instead of a hyphen. \
wrong: `docker-compose` \
correct: `docker compose`

## Reload configuration in running container
Assuming container is running with name `filescrud_1`:

### without passing environment variables
```bash
docker exec -it filescrud_1 filescrud reload
```

### passing environment variables

```bash
docker exec -it -e FILES_CRUD_SERVER__PORT=8000 -e FILES_CRUD_STORAGE__PATH=/opt filescrud_1 filescrud reload
```

## Troubleshooting

* missing permissions in docker container's `/data` directory (or sub directories)
  * Ensure for all volumes, that the host directories already exist. \
    Example: for `-v ./fc:/data` you have to ensure `./fc` already exists.
* error message `Error: listen EADDRNOTAVAIL: address not available 127.0.0.1:9000` (or similar) at startup
  * Using docker, you can not set `server.host` to `127.0.0.1`. \
    Use `-p 127.0.0.1:9000:9000` instead.
