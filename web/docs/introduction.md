# Introduction

## Description
* Stores files, using REST calls (CRUD)
* Supported storages:
  * local file-system
  * S3 Bucket (and s3-compatible storages)
* Supported Databases (for user accounts)
  * mongoDB
  * postgresql
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
