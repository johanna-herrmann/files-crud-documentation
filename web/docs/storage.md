# Storage
This page contains technical details about how the storage works internally.

The main reason for the way, the storage works, is to be as fast as possible, especially when it comes to actions that do not require reading the actual file contents.
The performance difference is particularly noticeable when using S3 storage.

## Data and structure
The storage stores file data and directory-file-structure as follows.

Under the actual file path, a file is saved, containing the file data as json.
The file data includes a key, which is a UUID, formatted as two-level-path,
used as path / object key to the actual file.

### Example
We will look at the following three files, assuming `/opt/fc`
as [storage path](/configuration/storage#storagepath):
* music/song.mp3
* vidoes/holidays/in-rome.mp4
* videos/holidays/in-paris.mp4

The storage holds following files:
* /opt/fc/data/music/song.mp3
* /opt/fc/data/videos/holidays/in-rome.mp4
* /opt/fc/data/videos/holidays/in-paris.mp4

For example, the file content for `/opt/fc/data/music/song.mp3` looks like this:
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

As you can see, the first to characters of the key uuid is used as directory.

## Actual file content
The actual file content is stored as follows.

### FS Storage (local file system)
Looking at the example, above, the storage looks like this, where each file contains the actual file content.
* /opt/fc/files/c5/c5700643-6e6f-4100-b753-018ff95e1a57
* /opt/fc/files/8a/8a2dcdde-bc51-4486-8cea-2ead8d8e8078
* /opt/fc/files/ad/ad37d6b2-73e9-4430-bc2b-70cbe2e33ac8

As you can see, the key is used as file path.

### S3 Storage
Looking at the example, above, the list of used object keys, looks like this.
* c5/c5700643-6e6f-4100-b753-018ff95e1a57
* 8a/8a2dcdde-bc51-4486-8cea-2ead8d8e8078
* ad/ad37d6b2-73e9-4430-bc2b-70cbe2e33ac8

As you can see, the key is used as object key.
