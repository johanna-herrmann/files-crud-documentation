# Anwendung - Docker

Diese Seite zeigt, wie das files-crud Docker Image verwendet wird.

## docker run

### Synopsis
```bash
docker run --init -dt -p <LOKALER_PORT>:<PORT> -v <LOKALER_PFAD>:/data [-e <ENV_NAME>=<ENV_WERT> [...]] filescrud/filescrud [KOMMANDO] [OPTIONEN] [ARGS]
```

oder um nur auf `localhost` des Docker-Hosts zu lauschen:
```bash
docker run --init -dt -p 127.0.0.1:<LOKALER_PORT>:<PORT> -v <LOKALER_PFAD>:/data [-e <ENV_NAME>=<ENV_WERT> [...]] filescrud/filescrud [KOMMANDO] [OPTIONEN] [ARGS]
```

* LOKALER_PORT &minus; Lokaler Port der auf den Port im Container gemappt werden soll
* PORT &minus; Port im Container
* LOKALER_PFAD &minus; Lokaler Pfad , der als Volume für `/data` im Container verwendet werden soll (muss bereits existieren)
* ENV_NAME &minus; Umgebungsvariablen-Name
* ENV_WERT &minus; Umgebungsvariablen-Wert
* KOMMANDO &minus; [CLI](/de/usage/cli) Unter-Kommando
* OPTIONEN &minus; Optionen fürs [CLI](/de/usage/cli) Unter-Kommando
* ARGS &minus; Argumente fürs [CLI](/de/usage/cli) Unter-Kommando

### Beispiele

#### Mit Standard-Werten starten

Folgendes Kommando startet die Anwendung mit Standard-Konfiguration:
```bash
docker run --init -dt -p 9000:9000 -v ./:/data filescrud/filescrud start
```

Kurzform:
```bash
docker run --init -dt -p 9000:9000 -v ./:/data filescrud/filescrud
```
(Keine Angabe von Kommando, Optionen und/oder Argumenten)

#### Starten mit alternativen Host und Port
```bash
docker run --init -dt -p 8000:8000 -v ./:/data -e FILES_CRUD_SERVER__HOST=1.2.3.4 -e FILES_CRUD_SERVER__PORT=8000 filescrud/filescrud start
```

#### Integrität des gesamten Speichers prüfen
```bash
docker run --init -dt -p 9000:9000 -v ./:/data filescrud/filescrud integrity
```


## docker compose

Das folgende Beispiel zeigt,
wie files-crud mit einer postgresql gestartet wird.
Für die Konfiguration werden Umgebungsvariablen genutzt.

docker-compose.yml
```yaml
name: filescrud

# Erstze 'dbUser' und 'dbPassword' mit deinen gewünschten DB-Credentials

services:
  fc:
    image: filescrud/filescrud
    restart: on-failure:3
    tty: true
    init: true
    depends_on:
      db:
        condition: service_healthy
        restart: true
    environment:
      FILES_CRUD_DATABASE__NAME: postgresql
      FILES_CRUD_DATABASE__HOST: db
      FILES_CRUD_DATABASE__USER: dbUser
      FILES_CRUD_DATABASE__PASS: dbPassword
    volumes:
      - ./fc:/data
    ports:
      - 9000:9000
      # Oder wenn du den Zugriff auf localhost des Docker-Hosts beschränken möchtest:
      # - 127.0.0.1:9000:9000

  db:
    image: postgres:14-alpine
    restart: on-failure:3
    tty: true
    init: true
    environment:
      - POSTGRES_USER=dbUser
      - POSTGRES_PASSWORD=dbPassword
      - POSTGRES_DB=files-crud
    volumes:
      - ./db:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dbUser -d files-crud"]
      interval: 10s
      timeout: 10s
      retries: 5
```

Kommado:
```bash
docker compose up -d
```

Beachte das Leerzeichen anstelle des Bindestrichs. \
falsch: `docker-compose` \
richtig: `docker compose`

## Konfiguration in einem laufenden Container neuladen
Angenommen, der Container läuft unter dem Namen `filescrud_1`:

### Ohne Angabe von Umgebungsvariablen
```bash
docker exec -it filescrud_1 filescrud reload
```

### Mit Angabe von Umgebungsvariablen

```bash
docker exec -it -e FILES_CRUD_SERVER__PORT=8000 -e FILES_CRUD_STORAGE__PATH=/opt filescrud_1 filescrud reload
```

## Fehlerbehebung

* Fehlende Berechtigungen im `/data`-Verzeichnis oder Unterverzeichnissen im Container
  * Stelle für alle Volumes sicher, dass der angegebene lokale Pfad existiert. \
    Beispiel: für `-v ./fc:/data` muss sichergestellt sein, dass `./fc` bereits existiert.
* Fehlermeldung `Error: listen EADDRNOTAVAIL: address not available 172.0.0.0:3000` (oder ähnlich) beim Starten
  * Wenn docker genutzt wird, kann `server.host` nicht auf `127.0.0.1` gesetzt werden. \
    Verwende stattdessen `-p 127.0.0.1:9000:9000`.
