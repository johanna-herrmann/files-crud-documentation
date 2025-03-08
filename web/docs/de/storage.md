# Speicher
Diese Seite enthält technische Details darüber, wer der Speicher intern funktioniert.

Der Hauptgrund für die Arbeisweise des Speichers ist, möglichst schnell zu sein, insbesondere wenn es um Aktionen geht, bei denen der eigentliche Dateiinhalt nicht gelesen werden muss.
Der Performance-Unterschied fällt insbesondere ins Gewicht, wenn S3-Speicher verwendet wird.

## Daten und Struktur
Der Speicher speichert Dateidaten und die Verzeichnis-Datei-Struktur wie folgt.

Unter dem eigentlichen Dateipfad wird eine Datei gespeichert, die die Dateidaten als JSON enthält.
Die Dateidaten enthalten einen `key`, der eine UUID ist, formatiert als Zwei-Level-Pfad,
der als Datei-Pfad bzw. als Objektschlüssel zur eigentlichen Datei verwendet wird.

### Beispiel
Wir werden uns die folgenden drei Dateien ansehen und dabei `/opt/fc`
als [Speicherpfad](/de/configuration/storage#storagepath) annehmen:
* music/song.mp3
* vidoes/holidays/in-rome.mp4
* videos/holidays/in-paris.mp4

Der Speicher enthält folgende Dateien:
* /opt/fc/data/music/song.mp3
* /opt/fc/data/videos/holidays/in-rome.mp4
* /opt/fc/data/videos/holidays/in-paris.mp4

Beispielsweise sieht der Dateiinhalt für `/opt/fc/data/music/song.mp3` in etwa so aus:
```json
{
  "owner": "f8d3ae0b-a230-442b-a809-b40ffa200794",
  "contentType": "audio/mpeg",
  "size": 23918273,
  "md5": "a2b43ffe93b40d00d394e6623d246553",
  "meta": {
    "length": "3:42"
  },
  "key": "c5/c5700643-6e6f-4100-b753-018ff95e1a57"
}
```

Wie du siehst, werden die ersten beiden Zeichen der Key-UUID als Verzeichnis verwendet.

## Tatsächlicher Dateiinhalt
Der tatsächliche Dateiinhalt wird wie folgt gespeichert.

### FS-Speicher (lokales Dateisystem)
Wenn man sich das obige Beispiel ansieht, sieht der Speicher in etwa so aus, wobei jede Datei den eigentlichen Dateiinhalt enthält.
* /opt/fc/files/c5/c5700643-6e6f-4100-b753-018ff95e1a57
* /opt/fc/files/8a/8a2dcdde-bc51-4486-8cea-2ead8d8e8078
* /opt/fc/files/ad/ad37d6b2-73e9-4430-bc2b-70cbe2e33ac8

Wie du siehst, wird der `key` als Dateipfad verwendet.

### S3-Speicher
Wenn man sich das obige Beispiel ansieht, sieht die Liste der verwendeten Objektschlüssel in etwa so aus.
* c5/c5700643-6e6f-4100-b753-018ff95e1a57
* 8a/8a2dcdde-bc51-4486-8cea-2ead8d8e8078
* ad/ad37d6b2-73e9-4430-bc2b-70cbe2e33ac8

Wie du siehst, wird der `key` als Objektschlüssel verwendet.
