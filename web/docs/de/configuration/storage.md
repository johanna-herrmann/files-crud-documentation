# Konfiguration: Speicher

Die Speicher-Konfiguration definiert die Art und das Verhalten des Speichers.

## Syntax

### JSON

```json
{
    "name": "fs" | "s3",
    "path": String,
    "region": String,
    "accessKeyId": String,
    "secretAccessKey": String,
    "bucket": String,
    "endpoint": String,
    "forcePathStyle": boolean
}
```

### YAML

```yaml
name: fs | s3
path: String
region: String
accessKeyId: String
secretAccessKey: String
bucket: String
endpoint: String
forcePathStyle: boolean
```

### Umgebungsvariablen

```properties
FILES_CRUD_DATABASE__NAME=fs | s3
FILES_CRUD_DATABASE__PATH=String
FILES_CRUD_DATABASE__REGION=String
FILES_CRUD_DATABASE__ACCESS_KEY_ID=String
FILES_CRUD_DATABASE__SECRET_ACCESS_KEY=String
FILES_CRUD_DATABASE__BUCKET=String
FILES_CRUD_DATABASE__ENDPOINT=String
FILES_CRUD_DATABASE__FORCE_PATH_STYLE=boolean
```

## Eigenschaften

### storage.name

Gibt an, welche Speicher-Art verwendet werden soll.

Standard: `fs`

Typ: Eines von
* `fs` &minus; Nutzt das lokale Dateisystem für Dateien und Datei-Daten*.
* `s3` &minus; Nutzt AWS S3 (oder S3-kompatible Dienste)
  als Speicher für die Dateien und das lokale Dateisystem für Datei-Daten*.

*Datei-Daten: Grüße, Eigentümer, Mimetype, MD5-Hash und Metadaten

### storage.path

Gibt den Pfad im lokalen Dateisystem an

Standard: `./`

Typ: String

### storage.region

Gibt die AWS-Region für den S3-Speicher an.

Standard: Der Wert von [region](/configuration/general#region) in der Hauptkonfiguration,
wenn angebenen, ansonsten `eu-central-1` (Frankfurt, Deutschland, Europa)

Typ: String

### storage.accessKeyId

Gibt den AWS Access Key für den S3(-kompatiblen) Speicher an.

Standard: Der Wert von [accessKeyId](/configuration/general#accesskeyid) in der Hauptkonfiguration,
wenn angegeben, ansonsten `fallback-key`

Typ: String

### storage.secretAccessKey

Gibt den AWS Secret Key für den S3(-kompatiblen) Speicher an.

Standard: Der Wert von [secretAccessKey](/configuration/general#secretaccesskey) in der Hauptkonfiguration,
wenn angegeben, ansonsten `fallback-secret`

Typ: String

### storage.bucket

Gibt den Namen des Buckets für den S3(-kompatiblen) Speicher an.
Der Bucket muss bereits existieren.

Standard: `files-crud`

Typ: String

### storage.endpoint

Definiert den Endpoint für den S3-kompatiblen Speicher, falls nicht AWS Standard.

Standard: keiner (Standard AWS S3 Endpoint wird genutzt)

Typ: String

### storage.forcePathStyle

Gibt für S3 an, ob path style statt sub-domain style verwendet werden soll.

Standard: `false`

Typ: boolean
* `false` (Standard) &minus; Nutzt `bucketname.domain.tld/key` als Bucket-Adresse
* `true` &minus; Nutzt `domain.tld/bucketname/key` als Bucket-Adresse

## Beispiele

### JSON

#### Lokales Dateisystem
```json
{
    "name": "fs",
    "path": "/opt/fc/storage"
}
```

#### S3 Speicher (AWS S3)
```json
{
    "name": "s3",
    "path": "/opt/fc/storage",
    "region": "us-east-1",
    "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
    "secretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    "bucket": "filescrud",
}
```

#### S3 Speicher (lokales MinIO)
```json
{
    "name": "s3",
    "path": "/opt/fc/storage",
    "region": "local",
    "accessKeyId": "local.accesskey.example",
    "secretAccessKey": "local.accesskey.example.secret.123",
    "bucket": "filescrud",
    "endpoint": "storage.filescrud.local.zz",
    "forcePathStyle": true
}
```

### YAML

#### Lokales Dateisystem
```yaml
name: fs
path: /opt/fc/storage
```

#### S3 Speicher (AWS S3)
```yaml
name: s3
path: /opt/fc/storage
region: us-east-1
accessKeyId: AKIAIOSFODNN7EXAMPLE
secretAccessKey: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
bucket: filescrud
```

#### S3 Speicher (lokales MinIO)
```yaml
name: s3
path: /opt/fc/storage
region: local
accessKeyId: local.accesskey.example
secretAccessKey: local.accesskey.example.secret.123
bucket: filescrud
endpoint: storage.filescrud.local.zz
forcePathStyle: true
```

### Umgebungsvariablen

#### Lokales Dateisystem
```properties
FILES_CRUD_STORAGE__NAME=fs
FILES_CRUD_STORAGE__PATH=/opt/fc/storage
```

#### S3 Speicher (AWS S3)
```properties
FILES_CRUD_STORAGE__NAME=s3
FILES_CRUD_STORAGE__PATH=/opt/fc/storage
FILES_CRUD_STORAGE__REGION=us-east-1
FILES_CRUD_STORAGE__ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
FILES_CRUD_STORAGE__SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
FILES_CRUD_STORAGE__BUCKET=filescrud
```

#### S3 Speicher (lokales MinIO)
```properties
FILES_CRUD_STORAGE__NAME=s3
FILES_CRUD_STORAGE__PATH=/opt/fc/storage
FILES_CRUD_STORAGE__REGION=local
FILES_CRUD_STORAGE__ACCESS_KEY_ID=local.accesskey.example
FILES_CRUD_STORAGE__SECRET_ACCESS_KEY=local.accesskey.example.secret.123
FILES_CRUD_STORAGE__BUCKET=filescrud
FILES_CRUD_STORAGE__ENDPOINT=storage.filescrud.local.zz
FILES_CRUD_STORAGE__FORCE_PATH_STYLE=true
```

## AWS S3 Berechtigungen
Der AWS-Benutzer benötigt folgende Berechtigungen auf dem angegebenen Bucket.

* `DeleteObject`
* `GetObject`
* `PutObject`

### Beispiel-Policy
Annahmen:
* Standard Bucket Name
* Verwendung einer Role-Policy
* AWS-Benutzer-ID: 123456789012
* Standard-Region

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:DeleteObject",
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:eu-central-1:123456789012:files-crud/*",
                "arn:aws:s3:eu-central-1:123456789012:files-crud"
            ]
        }
    ]
}
```
