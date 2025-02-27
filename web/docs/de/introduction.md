# Einleitung

## Beschreibung
* Speichert Dateien, ansteuerbar via REST API (CRUD)
* Unterstützte Speicher-Arten:
  * Lokales Dateisystem
  * S3 Bucket (und S3-kompatible Dienste)
* Unterstützte Datenbanken (für die Benutzerverwaltung)
  * mongoDB
  * postgresql
  * DynamoDB
  * in-memory (zu Testzwecken)
* Nutzt CRUD-basierte Berechtigungen, angegeben für verschiedene Verzeichnisse

## Funktionen
* Erstellen, überschreiben, lesen und löschen von Dateien
* crud-basierte Berechtigungen können für verschiedene Verzeichnisse konfiguriert werden
* Verzeichnisse werden automatisch erstellt und gelöscht, je nach Bedarf
* Benutzer-spezifische Berechtigungen
* Verschiedene Arten von Benutzern (`normal`, `admin`)
* Optionaler öffentlicher Zugriff (Zugriff ohne Login)
* Registrierung neuer Benutzer kann offen, eingeschränkt oder deaktiviert sein
