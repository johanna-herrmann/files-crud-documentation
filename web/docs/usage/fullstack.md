# Usage - Fullstack

To add a frontend and let filescrud serve it, following steps have to be done:
* Build and deploy the frontend files, for example to directory `./web`
* Start filescrud with [webRoot](/configuration/general#webRoot) set to `./web`

## Example

### Build and deploy frontend
```bash
npm install
npm build --mode production
rsync -auvxz --progress --delete -e "ssh" ./dist/ webmaster@example.com:/opt/fc/web
```

### Start filescrud
```bash
cd /opt/fc
docker run -d -p 9000:9000 -v ./:/data -e FILES_CRUD_WEB_ROOT=./web filescrud/filescrud
```
