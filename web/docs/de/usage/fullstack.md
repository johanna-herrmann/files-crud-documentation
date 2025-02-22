# Nutzung - Fullstack

Um ein Frontend hinzuzufügen und es files-crud ausliefern zu lassen, sind folgende Schritte nötig:
* Bauen und deployen der Frontend-Dateien, zum Beispiel zum Verzeichnis `./web`
* files-crud starten mit [webRoot](/de/configuration/general#webRoot) gesetzt zum Beispiel auf `./web`

## Beispiel

### Bauen und Deployment
```bash
npm install
npm build --mode production
rsync -auvxz --progress --delete -e "ssh" ./dist/ webmaster@example.com:/opt/fc/web
```

### filescrud starten

npm cli:
```bash
cd /opt/fc
export FILES_CRUD_WEB_ROOT=./web
filescrud start
```

docker:
```bash
cd /opt/fc
docker run -d -p 9000:9000 -v ./:/data -e FILES_CRUD_WEB_ROOT=./web filescrud/filescrud
```
