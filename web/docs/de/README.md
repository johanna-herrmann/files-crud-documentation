# files-crud Dokumentation

<img src="/logo.svg" width="100" height="100" alt="" />

REST Datei-Speicher mit CRUD-basierten Berechtigungen auf Ordner-Level. \
Entwickelt in Typescript.

Dokumentation powered by [docute](https://docute.egoist.dev/)

[Source code auf GitHub](https://github.com/johanna-herrmann/files-crud/)

## Schneller Einstieg

### nodejs

Installation
```
npm install -g files-crud
```

Start
```
filescrud start
```

### docker
```
docker run -d -p 9000:9000 -v ./:/data filescrud/filescrud
```

### List files in a directory

Um alle Dateien und Ordner in `<speicher_hauptordner>/images/` aufzulisten:
```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <jwt>" http://localhost:9000/api/file/list/images
```
