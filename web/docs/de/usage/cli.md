# Anwendung - CLI

Diese Seite zeigt, wie die CLI genutzt wird.

## Allgemein

### Anwendung
```bash
filescrud [Optionen] [Kommando] [Kommando-Argumente] [Kommando-Optionen]
```

### Allgemeine Optionen

| Option                    | Beschreibung                                              |
| ------------------------- | --------------------------------------------------------- |
| -V, --version             | Zeigt die  Version an                                     |
| -h, --help                | Zeigt Hilfe zum Kommando an                               |

### Beispiele
Anzeigen der Version
```bash
filescrud --version
```

Allgemeine Hilfe anzeigen
```bash
filescrud help
```

Hilfe fürs `start`-Kommando anzeigen
```bash
filescrud help start
```

## Start
Startet die files-crud Anwendung.

### Anwendung
```bash
filescrud start [Optionen]
```

### Optionen

| Optionen                  | Beschreibung                                              |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix für Umgebungsvariablen (Standard: "FILES_CRUD")    |

### Beispiele
Startet die Anwendung mit Standards
```bash
filescrud start
```

Startet die Anwendung mit env-prefix `FC`
```bash
filescrud start -e FC
```

Startet die Anwendung mit env-prefix `APP`
```bash
filescrud start --env-prefix APP
```

## Steuern einer laufenden Anwendung
Steuert eine laufende files-crud Anwendung. \
Beim starten legt die Anwendung eine `.control.json`-Datei im aktuellen Arbeitsverzeichnis (`./`) an.
Die folgenden Kommandos lesen diese Datei, ebenfalls vom Arbeitsverzeichnis.

### Anwendung
```bash
filescrud stop|restart|reload  [Optionen]
```

### Optionen
Für `restart` und `reload`:

| Option                    | Beschreibung                                              |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix für Umgebungsvariablen (Standard: "FILES_CRUD")    |

### stop
Stoppt die laufende Anwendung

```bash
filescrud stop
```

### restart

Startet die Anwendung mit Standard env-prefix (FILES_CRUD) neu
```bash
filescrud restart
```

Startet die Anwendung mit env-prefix `FC` neu
```bash
filescrud restart -e FC
```

### reload
Lädt die Konfiguration der Anwendung neu. \
Betrifft alle Eigenschaften außer
* server.host
* server.port
* server.useHttps
* server.useHttp2

Lädt die Konfiguration neu, unter Verwendung des Standard env-prefix (FILES_CRUD)
```bash
filescrud reload
```

Lädt die Konfiguration neu, unter Verwendung des env-prefix `FC`
```bash
filescrud reload -e FC
```

## Integrity
Prüft die Datei-Integrität, unter Verwendung der MD5-Hashes.

### Anwendung
```bash
filescrud integrity [Optionen] [Argumente]
```

### Optionen

| Option                    | Beschreibung                                              |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix für Umgebungsvariablen (Standard: "FILES_CRUD")    |

### Argumente
* Pfad &minus; Pfad zum Verzeichnis oder zur Datei wovon die Integrität geprüft werden soll.
  Hauptordner des Speichers, falls nicht angegeben



### Beispiele
Integrität des gesamten Speichers prüfen
```bash
filescrud integrity
```

Integrität des Verzeichnisses `images/holidays` prüfen
```bash
filescrud integrity images/holidays
```

Integrität des Verzeichnisses `videos/holidays in Rome` prüfen
```bash
filescrud integrity "videos/holidays in Rome"
```

## Admin
Erstellt einen Admin-Benutzer.

### Anwendung
```bash
filescrud admin [Optionen]
```

### Optionen

| Option                    | Beschreibung                                              |
| ------------------------- | --------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix für Umgebungsvariablen (Standard: "FILES_CRUD")    |
| -u, --username <username> | Benutzername des neuen Benutzers (Standard: zufällig)     |
| -p, --password <password> | Passwort des neuen Benutzers (Standard: zufällig)         |

### Beispiele
Erstellt einen Benutzer mit zufälligem Benutzernamen und zufälligem Passwort
```bash
filescrud admin
```

Erstellt einen Benutzer mit Benutzername `johanna123_admin` und einem zufälligem Passwort
```bash
filescrud integrity --username johanna123_admin
```

Erstellt einen Benutzer mit zufälligem Benutzernamen und Passwort `passw0rd987_fjqekfl`
```bash
filescrud integrity -p passw0rd987_fjqekfl
```

Erstellt einen Benutzer mit Benutzername `johanna123_admin` und Passwort `passw0rd987_fjqekfl`
```bash
filescrud integrity --username johanna123_admin -p passw0rd987_fjqekfl
```

### Zufall
Wenn der Benutzername und/oder das Passwort nicht angegeben wird, wird jeweils eine zufällige Zeichenfolge dafür verwendet. \
Die zufällige Zeichenfolge besteht aus 6 Bytes für den Benutzernamen, 15 Bytes für das Passwort, jeweils base64url-kodiert.

Beispiel:
* Benutzername: `d1J0N25S`
* Passwort: `VExQUU1UZ3dNakl3TWpVRQ`

## Config
Zeigt die aktuelle Konfiguration an.

### Anwendung
```bash
filescrud config [Optionen] [Argumente]
```

### Optionen

| Option                    | Beschreibung                                                |
| ------------------------- | ----------------------------------------------------------- |
| -e, --env-prefix <prefix> | Prefix für Umgebungsvariablen (Standard: "FILES_CRUD")      |
| -n, --no-defaults         | Nur definierte Eigenschaften anzeigen, aber keine Standards |

### Argumente
* Format &minus; Das Format in dem die Konfiguration angezeigt werden soll (json|yaml|env|properties) (Standard: "json")

### Beispiele
Zeigt die gesamte Konfiguration im Standard-Format (json) an
```bash
filescrud config
```

Zeigt definierte Eigenschaften im yaml Format an
```bash
filescrud config -n yaml
```

Zeigt die gesamte Konfiguration in Form von Umgebungsvariablen an
```bash
filescrud config env
```
