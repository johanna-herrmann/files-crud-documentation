# files-crud Documentation

<img src="/logo.svg" width="100" height="100" alt="" />

REST file storage with CRUD based permissions on directory-level. \
Written in Typescript.

Documentation powered by [docute](https://docute.egoist.dev/)

[Source code on GitHub](https://github.com/johanna-herrmann/files-crud/)

## Quickstart

### nodejs

install
```
npm install -g files-crud
```

startup
```
filescrud start
```

### docker
```
docker run -d -p 9000:9000 -v ./:/data filescrud/filescrud
```

### List files in a directory

To list all files in `<storage_root>/images/`
```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <jwt>" http://localhost:9000/api/file/list/images
```
