# files-crud Dokumentation

<img src="/logo.svg" width="100" height="100" alt="" />

REST Datei-Speicher mit CRUD-basierten Berechtigungen auf Ordner-Level. \
Entwickelt in Typescript.

Dokumentation powered by [docute](https://docute.egoist.dev/)

[Source code auf GitHub](https://github.com/johanna-herrmann/files-crud/)

## Schneller Einstieg

### nodejs

Installation
```bash
npm install -g files-crud
```

Start
```bash
filescrud start
```

### docker
```bash
docker run -d -p 9000:9000 -v ./:/data filescrud/filescrud
```

### Verzeichnis auflisten

Um alle Dateien und Ordner in `<speicher_hauptordner>/images/` aufzulisten:
```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <jwt>" http://localhost:9000/api/file/list/images
```
