# API: Benutzer Endpoints

Diese Seite dokumentiert die API Benutzer Endpoints.

## Registrieren
**<span style="color: green; ">POST</span> /api/register**

Registriert einen neuen Benutzer

### Request Body
```json
{
  "username": "lisa42",
  "password": "s33mlingl1G00dP8ssw0rd",
  "meta": {
    "birthday": "1992-03-19"
  },
  "token": "4e7e0e32-8b67-473e-a4e9-7572765966e9"
}
```

* username (String) &minus; Gewünschter Benutzername für den neuen Benutzer
* password (String) &minus; Gewünschtes Passwort für den neuen Benutzer
* meta (Object) &minus; Optionales Objekt für Metadaten zum Benutzer
* token (String) &minus;
  Optionale Zeichenfolge: Wenn registration-mode ist `token`, muss der Wert ein gültiger Token sein

### Request Path Parameter
Keiner

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{
  "username": "lisa42"
}
```

#### Fehler: Benutzer existiert bereits
Status-Code: 400

Body:
```json
{
  "error": "Error. User lisa42 exists already."
}
```

#### Fehler: Registreirung ist deaktiviert (Benutzer müssen durch Admins hinzugefügt werden)
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. Register is disabled. Ask an admin to add you as user."
}
```

#### Fehler: Registerierung ist eingeschränkt (Gültiger Token muss mitgesendet werden)
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. Register is not allowed without valid register token."
}
```

## Einloggen
**<span style="color: green; ">POST</span> /api/login**

Loggt einen Benutzer ein.
Authentisiert via Benutzername und Passwort und stellt einen JWT aus.
Der JWT muss in nachfolgenden Anfragen gesendet werden, mittels `Authorization`-Header. \
(Der `Bearer `-Prefix ist optional)

### Request Body
```json
{
  "username": "lisa42",
  "password": "s33mlingl1G00dP8ssw0rd"
}
```

* username (String) &minus; Benutzername für Login
* password (String) &minus; Passwort für Login

### Request Path Parameter
Keiner

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImU2Mjc5YjVhLWQxMzQtNDU0Mi1hZGJjLWRiMjRlMmU0Yjg2NiJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTQ4MzIyODgwMDAwMH0.dNux4Fp02uc3dDOfBdmxfLTvyyQx5MxoGsfTM7Mm6wI",
  "expiresAt": 2123456789123
}
```
* token &minus; Der ausgestellte Token (JWT)
* expiresAt: &minus;
  Der Unix Timestamp in Millisekunden, wann der JWT abläuft, 0 wenn er niemals abläuft

#### Fehler: Falscher Benutzername und/oder falsches Passwort
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized: invalid credentials provided."
}
```

#### Fehler: Anzahl fehlerhafter Versuche überschritten
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. Login attempts exceeded for username lisa42."
}
```

## Benutzer hinzufügen
**<span style="color: green; ">POST</span> /api/user/add**

Fügt einen neuen Benutzer hinzu. Nur für Admins
### Request Body
```json
{
  "username": "lisa42",
  "password": "s33mlingl1G00dP8ssw0rd",
  "admin": true,
  "meta": {
    "birthday": "1992-03-19"
  }
}
```

* username (String) &minus; Gewünschter Benutzername für den neuen Benutzer
* password (String) &minus; Gewünschtes Passwort für den neuen Benutzer
* admin (boolean) &minus; Gibt an, ob der neue Benutzer ein Admin sein soll
* meta (Object) &minus; Optionales Objekt für Metadaten zum Benutzer

### Request Path Parameter
Keiner

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{
  "username": "lisa42"
}
```

#### Fehler: Nicht eingeloggt
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Fehler: Kein Admin
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

#### Fehler: Benutzer existiert schon
Status-Code: 400

Body:
```json
{
  "error": "Error. User lisa42 exists already."
}
```

## Admin Status anpassen
**<span style="color: green; ">POST</span> /api/user/set-admin**
Ändert den Admin-Status eines Benutzers

### Request Body
```json
{
  "id": "fc3f4c5e-93be-4d69-a4d3-a90c32e2309f",
  "admin": true,
}
```

* id (String) &minus; ID des Benutzers für den der Status geändert werden soll
* admin (boolean) &minus; Neuer Status (`true`: Admin, `false`: nicht Admin)

### Request Path Parameter
Keiner

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{}
```

#### Fehler: Nicht eingeloggt
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Fehler: Kein Admin
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

## Benutzername ändern
**<span style="color: green; ">POST</span> /api/user/change-username**

Ändert den Benutzernamen eines Benutzers.

### Request Body
```json
{
  "id": "fc3f4c5e-93be-4d69-a4d3-a90c32e2309f",
  "newUsername": "lisa3000",
}
```

* id (String) &minus; ID des Benutzers dessen Benutzername geändert werden soll (`self` um den eigenen Benutzernamen zu ändern)
* newUsername (String) &minus; Neuer Benutzername des Benutzers

### Request Path Parameter
Keiner

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{
  "username": "lisa3000"
}
```

#### Fehler: Nicht eingeloggt
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Fehler: Nicht-Admin versucht Benutzername anderer Bunutzer zu ändern
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

## Passwort ändern
**<span style="color: green; ">POST</span> /api/user/change-password**

Ändert das Passwort eines Benutzers

### Request Body
```json
{
  "id": "fc3f4c5e-93be-4d69-a4d3-a90c32e2309f",
  "oldPassword": "s33mlingl1G00dP8ssw0rd",
  "newPassword": "iOiIxMjM0NTY3ODkwIiwibm"
}
```

* id (String) &minus; ID des Benutzers von dem das Passwort geändert werden soll (`self` um das eigene Passwort zu ändern)
* oldPassword (String) &minus; Erforderlich um das eigene Passwort zu ändern: dein altes Passwort
* newPassword (String) &minus; Das gewünschte neue Passwort

### Request Path Parameter
Keiner

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{}
```

#### Fehler: Nicht eingeloggt
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Fehler: Nicht-Admin versucht das Passwort eines anderen Benutzers zu ändern
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

#### Fehler: Du hast versucht dein eigenes Passwort zu ändern, ohne das richtige alte Passwort anzugeben
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to provide your password."
}
```

## Metadaten ändern
**<span style="color: green; ">POST</span> /api/user/save-meta/<span style="color: #999">{id}</span>**

Ändert die Metadaten eines Benutzers

### Request Body
```json
{
  "meta": {
    "birthday": "1992-03-19",
    "marriage": "2029-05-12"
  }
}
```

* meta (Objekt) &minus; Objekt für die neuen Metadaten des Benutzers

### Request Path parameters
* id &minus; Die ID des Benutzers für den die Metadaten geändert werden sollen (`self` um die eigenen Metadaten zu ändern)

Beispiel:
<span style="color: green; ">POST</span> /api/user/save-meta/<span style="color: #999">5251279e-6e21-4173-9b64-1be006bd22ba</span>

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{}
```

#### Fehler: Nicht eingeloggt
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Fehler: Nicht-Admin versucht die Metadaten eines anderen Benutzers zu ändern
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

## Metadaten laden
**<span style="color: #60affe; ">GET</span> /api/user/load-meta/<span style="color: #999">{id}</span>**

Lädt die Metadaten eines Benutzers

### Request Body
Keiner

### Request Path parameters
* id &minus; Die ID des Benutzers von dem die Metadaten geladen werden sollen (`self` um die eigenen Metadaten zu laden)

Beispiel:
<span style="color: #60affe; ">GET</span> /api/user/load-meta/<span style="color: #999">5251279e-6e21-4173-9b64-1be006bd22ba</span>

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{
  "meta": {
    "birthday": "1992-03-19"
  }
}
```

#### Fehler: Nicht eingeloggt
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Fehler: Nicht-Admin versucht die Metadaten eines anderen Benutzers zu laden
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

## Benutzer laden
**<span style="color: #60affe; ">GET</span> /api/user/load/<span style="color: #999">{id}</span>**

Lädt einen Benutzer

### Request Body
Keiner

### Request Path Parameter
* id &minus; Die ID des Benutzers der geladen werden soll (`self` um den eigenen Benutzer zu laden)

Beispiel:
<span style="color: #60affe; ">GET</span> /api/user/load/<span style="color: #999">5251279e-6e21-4173-9b64-1be006bd22ba</span>

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{
  "user": {
    "id": "fc3f4c5e-93be-4d69-a4d3-a90c32e2309f",
    "username": "lisa42",
    "admin": true,
    "meta": {
      "birthday": "1992-03-19"
    }
  }
}
```

#### Error: Nicht eingeloggt
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Error: Nicht-Admin versucht einen anderen Benutzer zu laden
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

## Benutzer auflisten
**<span style="color: #60affe; ">GET</span> /api/user/list**

Listet die Benutzer auf (ID, Benutzername und Admin-Status)

### Request Body
Keiner

### Request Path Parameter
Keiner

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{
  "users": [
    {
      "id": "fc3f4c5e-93be-4d69-a4d3-a90c32e2309f",
      "username": "lisa42",
      "admin": true
    },
    {
      "id": "aa932f42-de86-4ace-9420-fe9bc9c6bfa1",
      "username": "maxi09",
      "admin": false
    }
  ]
}
```

#### Fehler: Nicht eingeloggt
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Fehler: Kein Admin
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

## Benutzer löschen
**<span style="color: #a00; ">DELETE</span> /api/user/remove/<span style="color: #999">{id}</span>**

Löscht einen Benutzer

### Request Body
Keiner

### Request Path Parameter
* id &minus; ID des Benutzers der gelöscht werden soll (`self` um dich selbst zu löschen)

Beispiel:
<span style="color: #a00; ">DELETE</span> /api/user/remove/<span style="color: #999">5251279e-6e21-4173-9b64-1be006bd22ba</span>

### Responses

#### Erfolg
Status-Code: 200

Body:
```json
{}
```

#### Fehler: Nicht eingeloggt
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Fehler: Nicht-Admin versucht einen anderen Benutzer zu löschen
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```
