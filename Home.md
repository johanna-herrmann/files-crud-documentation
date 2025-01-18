# files-crud

[Wiki](/wiki)

REST file storage with CRUD based permissions on directory-level. \
Written in Typescript

## Description
* Stores files, using REST calls (CRUD)
* Supported storages:
  * local file-system
  * S3 Bucket (and s3-compatible storages)
* Supported Databases (for user accounts)
  * mongoDB
  * postgresql
  * DynamoDB
  * in-memory (for testing purposes)
* Uses CRUD-based permissions, specified for different directories

## Features
* create, override, read, delete files
* crud-based permissions can be set for different directories via configuration
* directories will be created and removed automatically as needed
* user-specific permissions
* different types of users (`normal`, `admin`)
* optional public-access (access without login)
* registration for new users can be open, restricted or disabled

## Install
```bash
npm install -g files-crud
```

## Permissions
[CLI](wiki/Permissions)

## Usage/CLI
[CLI](wiki/CLI)

## Configuration
[Configuration](wiki/Configuration)

## API
[API](wiki/Api)


## License
This product is licensed via a [MIT License](./LICENSE.md)
