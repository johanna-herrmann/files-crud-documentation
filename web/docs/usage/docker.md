# Usage - Docker

This page shows, how to files-crud docker image

## Synopsis
`docker run -d -p <LOCAL_PORT>:<PORT> -v <LOCAL_PATH>:/data [-e <ENV_NAME>=<ENV_VALUE> [...]] filescrud/filescrud [COMMAND] [OPTIONS] [ARGS]`

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
`docker run -d -p 9000:9000 -v ./:/data filescrud/filescrud start`

#### shortcut
`docker run -d -p 9000:9000 -v ./:/data filescrud/filescrud` \
(passing no sub command, options and args)

### Start with custom host and port
`docker run -d -p 8000:8000 -v ./:/data -e FILES_CRUD_SERVER__HOST=0.0.0.0 -e FILES_CRUD_SERVER__PORT=8000 filescrud/filescrud start`

### Check integrity for whole storage
`docker run -d -p 9000:9000 -v ./:/data filescrud/filescrud integrity`

## Reload configuration in running container
Assuming container is running with name `filescrud_1`:

### without passing environment variables
`docker exec -it filescrud_1 filescrud reload`

### passing environment variables
with env-prefix `FC`

`docker exec -it -e FC_SERVER__PORT=8000 -e FC_STORAGE__PATH=/opt filescrud_1 filescrud -e FC reload`

## workdir-datadir-linking
The container has following symlinks to read config files and storage from `/data/...` without to change default storage path or any default bahaviour.
* /home/node/config.json -> /data/config.json
* /home/node/config.yaml -> /data/config.yaml
* /home/node/config.yml -> /data/config.yml
* /home/node/data -> /data/data
* /home/node/files -> /data/files

So you won't need to change any config.
