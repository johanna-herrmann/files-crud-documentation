# Berechtigungen

Mit Berechtigungen kann festgelegt werden, wer welche Dateioperationen ausführen darf.
Die Berechtigungen können auf Verzeichnisebene und für verschiedene API-Zugriffsebenen festgelegt werden.

Anstelle von Schreib-/Lese-/Ausführungsberechtigungen verwendet files-crud Berechtigungen zum Erstellen/Lesen/Aktualisieren/Löschen.

## Notation
Du kannst drei unterschiedliche Notationen für die Berechtigungen nutzen.

### rwx-Äquivalent
Berechtigungen können mit einer `crud`-Syntax festgelegt werden, die der `rwx`-Syntax von Unix ähnelt.

Die ersten vier Buchstaben geben die Berechtigungen für den Eigentümer an,
die zweiten vier Buchstaben geben die Berechtigungen für alle anderen angemeldeten Benutzer an
und die letzten vier Buchstaben geben die Berechtigungen für den Zugriff ohne Anmeldung an.

Eine Berechtigung ist aktiviert, wenn ihr Buchstabe vorhanden ist,
eine Berechtigung ist deaktiviert, wenn ihr Buchstabe durch einen Bindestrich ersetzt wird.

#### Beispiele
* `crud-r------` &minus;
Vollzugriff für Eigentümer, Lesezugriff für andere Benutzer ohne Administratorrechte, kein Zugriff ohne Anmeldung
* `crudcrud-r--` &minus; Vollzugriff für alle Benutzer, Lesezugriff ohne Anmeldung
* `-r---r------` &minus;
Nur-Lese-Zugriff für Benutzer ohne Administratorrechte, kein Zugriff ohne Anmeldung

### Oktal-Äquivalent
Berechtigungen können mit einer Hex-Syntax angegeben werden, die der Oktal-Syntax von Unix ähnelt (000 bis fff statt 000 bis 777).

Die erste Ziffer gibt die Berechtigungen für den Eigentümer an,
die zweite Ziffer gibt die Berechtigungen für alle anderen angemeldeten Benutzer an
und die letzte Ziffer gibt die Berechtigungen für den Zugriff ohne Anmeldung an.

Eine Berechtigung ist aktiviert, wenn ihr Bit gesetzt ist,
eine Berechtigung ist deaktiviert, wenn ihr Bit nicht gesetzt ist.
Einfach ausgedrückt ist jede Ziffer die Summe der Bitwerte der aktivierten Berechtigungen (Erstellen = 8, Lesen = 4, Aktualisieren = 2, Löschen = 1).

#### Beispiele
* `f40` &minus;
Vollzugriff für Eigentümer, Lesezugriff für andere Benutzer ohne Administratorrechte, kein Zugriff ohne Anmeldung
* `ff4` &minus; Vollzugriff für alle Benutzer, Lesezugriff ohne Anmeldung
* `440` &minus; Nur-Lese-Zugriff für Benutzer ohne Administratorrechte, kein Zugriff ohne Anmeldung

### Explizites Array
Berechtigungen können mit einem Array angegeben werden, mit einem Item pro Level.
Jedes Item enthält die Berechtigungen, getrennt durch Bindestriche.
Die Reihenfolge der Berechtigungen innerhalb des Items spielt keine Rolle.

#### Beispiele (JSON)

* `["create-delete-read-update", "read", ""]` &minus;
  Vollzugriff für Eigentümer, Lesezugriff für andere Benutzer ohne Administratorrechte, kein Zugriff ohne Anmeldung
* `["create-read-update-delete", "create-read-update-delete", "read"]` &minus;
  Vollzugriff für alle Benutzer, Lesezugriff ohne Anmeldung
* `["read", "read", ""]` &minus;
  Nur-Lese-Zugriff für Benutzer ohne Administratorrechte, kein Zugriff ohne Anmeldung

## Dateioperationen
* Erstellen &minus; Neue Datei speichern, Dateimetadaten erstmals speichern
* Lesen &minus; Datei herunterladen, Dateidaten lesen, Dateimetadaten lesen, Verzeichniselemente auflisten
* Aktualisieren &minus; Datei aktualisieren/überschreiben, Dateimetadaten aktualisieren
* Löschen &minus; Datei löschen (und ihre Metadaten)

## Admins
Admins haben immer Voll-Zugriff

## Verzeichnisse

Die Berechtigungen können angegeben werden:
* Für ein bestimmtes Verzeichnis. \
Verwende den Platzhalter `$user` für Benutzerverzeichnisse
(Beispiel: `$user/sub` für das Verzeichnis `sub` in Benutzerverzeichnissen)
* Standard: Wird angewendet, wenn das Verzeichnis und alle übergeordneten Verzeichnisse keine Spezifikation haben

Verzeichnisse werden (rekursiv) erstellt, wenn die erste Datei dort gespeichert wird.
Sie werden gelöscht, wenn die letzte Datei darin gelöscht ist.
Für die Definition der Verzeichnis-Berechtigungen spielt es keine Rolle, ob die Verzeichnisse existieren.

### Benutzerverzeichnisse
Jedem Benutzer wird ein Verzeichnis zugewiesen. \
Der Pfad lautet: `<hauptordner>/user_<user_id>` \
Beispiel: `<hauptordner>/user_5d79cd2f-91c7-4d9d-93ed-06418ea81ee6`

### Beispiel
```json
{
  "directoryPermissions": {
    "someDir": "crud-r------",
    ...
  },
  "defaultPermissions": "fc4"
}
```

## Eigentümer
* Bei Dateioperationen
(Metadaten aktualisieren, Metadaten lesen, Dateidaten lesen, Datei herunterladen, Datei überschreiben, Datei löschen)
ist der Eigentümer der Benutzer, der die Datei ursprünglich erstellt hat
(`public`* beim Hochladen mit öffentlichem Zugriff) \
(Administratoren können den Eigentümer beim Kopieren auf den Eigentümer der Quelldatei setzen)
* Bei Verzeichnisoperationen (neue Datei erstellen, Verzeichniselemente auflisten) ist der Eigentümer:
  * bei Benutzerverzeichnissen und deren Unterverzeichnissen: der Benutzer, dem das Verzeichnis zugeordnet ist
  * in anderen Verzeichnissen: keine (es werden immer Benutzerberechtigungen verwendet)

*Dies wird wie folgt behandelt:
* wenn [publicFileOwner](/de/configuration#publicfileowner) auf `all` gesetzt ist (Standard) &minus; Datei gehört jedem
* wenn [publicFileOwner](/de/configuration#publicfileowner) auf `none` gesetzt ist &minus; Datei gehört niemandem

## Siehe auch:
[Konfiguration](/de/configuration/general)
