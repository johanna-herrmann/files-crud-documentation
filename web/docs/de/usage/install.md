# Nutzung - Installation

Diese Seite zeigt wie files-crud installiert bzw. eingerichtet wird.

## npm install
Du kannst files-crud global als [npm-CLI](https://www.npmjs.com/package/files-crud) installieren, um sie direkt zu nutzen.

Nach der Installation steht die CLI als `filescrud` zur Verfügung. \
Beispiel:
```bash
filescrud start
```

### Voraussetzungen
* [nodejs](https://nodejs.org/en) installiert, mindestens in Version 22.x.x \
  getestet für:
  * 22.11.0
  * 22.14.0

### Installation
```bash
npm install -g files-crud
```

## Docker
Du kannst außerdem das files-crud [Docker Image](https://hub.docker.com/r/filescrud/filescrud) verwenden.

### Voraussetzungen
* [docker](https://www.docker.com/) installiert

### Image holen
```bash
docker pull filescrud/filescrud:latest
```
