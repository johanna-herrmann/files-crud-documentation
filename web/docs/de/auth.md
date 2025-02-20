# Auth

Diese Seite erklärt die Authentisierung und Authorisierung von files-crud.

## Art der Authentisierung
files-crud authentisiert Benutzer mittels Benutzername und Passwort.

## Hashing
Aktuell werden Passwörter mittels [scrypt](https://en.wikipedia.org/wiki/Scrypt) mit folgenden Parametern gehasht:
* iterations count: 131072
* block size: 8
* parallelism: 1
* max memory: 176160768
* hash length: 32 Bytes
* salt: 16 zufällig-generierte Bytes, erzeugt beim erstellen des Benutzers und bei jeder Passwort-Änderung
* data (password): Das angegebene Passwort

## Token
Nach einer erfolgreichen Authentisierung wird ein JWT erzeugt (JSON Web Token). \
Der Token wird mittels HMAC-256 signiert, mit einem Schlüssel, zufällig aus 20 Schlüsseln ausgewählt,
die beim Starten der Anwendung zufällig-generiert werden.

Bei fortfolgenden Anfragen muss dieser Token als Wert des `Authorization`-Headers gesendet werden (`Bearer`-Prefix ist optional).

### Die Payload des Tokens enthält folgende Eigenschaften (auch bekannt als `claims`)
* sub &minus; ID des Benutzers zu dem der Token gehört
* iat &minus; Unix Timestamp wann der JWT ausgestellt wird (Sekunden)
* exp &minus; Unix Timestamp wann der JWT abläuft (Sekunden), 0 wenn der Token niemals abläuft

### Response-Body-Eigenschaften bei erfolgreichen Login
* token &minus; Der JWT
* expiresAt &minus;
  Unix Timestamp wann der JWT abläuft (Millisekunden), 0 wenn der Token niemals abläuft

### Siehe auch
[API: Benutzer Endpoints - Login](/de/api/user#login)


## Begrenzung der Login-Versuche und Sperren
Nach 5 aufeinander folgenden, fehlerhaften Login-Versuche mit dem gleichen Benutzernamen,
sind weitere Versuche mit diesem Benutzernamen für 15 Sekunden blockiert. \
Dabei spielt es keine Rolle, ob ein Benutzer mit diesem Benutzernamen existiert. \
Nach 6 falschen Versuchen dauert die Sperre 30 Sekunden, nach 7 Versuchen eine Minute, usw.
Dieser Wert verdoppelt sich bei jedem weiteren falschen Versuch, mit einer maximalen Sperr-Dauer von 15 Minuten.

Findet ein Versuch innerhalb der Sperre statt, startet die Sperrzeit von vorne und der Versuchszähler bleibt unverändert.

Erst wenn ein erfolgreicher Login mit dem Benutzernamen stattfindet, wird der Versuchszähler für diesen Benutzernamen zurückgesetzt.

Jeweilige Dauer der Sperre je Anzahl der Fehlversuche:
* bis 4: Keine Sperre
* 5: 15 Sekunden
* 6: 30 Sekunden
* 7: 1 Minute
* 8: 2 Minuten
* 9: 4 Minuten
* 10: 8 Minuten
* ab 11: 15 Minuten

Damit dauern 100 fehlerhafte Versuche mit dem gleichen Benutzernamen fast 23 Stunden (22,5125).
