# Usage - Docker

This page shows, how to files-crud docker image

## Synopsis
`docker run -d -p <LOCAL_PORT>:<PORT> -v ./:/data [-e <ENV_NAME>=<ENV_VALUE> [...]] johannadev/filescrud [COMMAND] [OPTIONS] [ARGS]`

* LOCAL_PORT &minus; local port whichs redirects to docker container exposed port
* PORT &minus; docker container port to expose
* ENV_NAME &minus; Environment variable name
* ENV_VALUE &minus; Environment variable value
* COMMAND &minus; [CLI](/usage/cli) sub command to run
* OPTIONS &minus; Options for [CLI](/usage/cli) sub command
* ARGS &minus; Args for [CLI](/usage/cli) sub command

## Example

### Start with defaults
`docker run -d -p 9000:9000 -v ./:/data johannadev/filescrud start`

### Start with custom host and port
`docker run -d -p 8000:8000 -v ./:/data -e FILES_CRUD_SERVER__HOST=0.0.0.0 -e FILES_CRUD_SERVER__PORT=8000 johannadev/filescrud start`

### Check integrity for whole storage
`docker run -d -p 9000:9000 -v ./:/data johannadev/filescrud integrity`

## Reload configuration in running container
Assuming container is running with name `filescrud_1`:

`docker exec -it filescrud_1 sh -c "filescrud reload"`
