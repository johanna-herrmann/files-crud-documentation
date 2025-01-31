# API: User Endpoints

This page documents the API user Endpoints.

## Register
**<span style="color: green; ">POST</span> /api/register**

Registers a new user

### Request Body
```json
{
  "username": "lisa42",
  "password": "s33mlingl1G00dP8ssw0rd",
  "meta": {
    "birthday": "1988-08-26"
  },
  "token": "4e7e0e32-8b67-473e-a4e9-7572765966e9"
}
```

* username (String) &minus; Desired username for the new user
* password (String) &minus; Desired password for the new user
* meta (Object) &minus; Optional object for user meta data
* token (String) &minus;
  Optional string: If registration-mode is set to `token`, a valid token must be provided here

### Request Path parameters
None

### Responses

#### Success
Status-Code: 200

Body:
```json
{
  "username": "lisa42"
}
```

#### Error: user already exists
Status-Code: 400

Body:
```json
{
  "error": "Error. User lisa42 exists already."
}
```

#### Error: registration is disabled (admin have to add users)
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. Register is disabled. Ask an admin to add you as user."
}
```

#### Error: registration is restricted (token must be provided)
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. Register is not allowed without valid register token."
}
```

## Login
**<span style="color: green; ">POST</span> /api/login**

Logins user.
It authorizes using username and password and provides JWT.
The JWT must be sent in subsequent requests, using `Authorization`-Header. \
(The `Bearer `-prefix is optional)

### Request Body
```json
{
  "username": "lisa42",
  "password": "s33mlingl1G00dP8ssw0rd"
}
```

* username (String) &minus; username for login
* password (String) &minus; password for login

### Request Path parameters
None

### Responses

#### Success
Status-Code: 200

Body:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImU2Mjc5YjVhLWQxMzQtNDU0Mi1hZGJjLWRiMjRlMmU0Yjg2NiJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTQ4MzIyODgwMDAwMH0.dNux4Fp02uc3dDOfBdmxfLTvyyQx5MxoGsfTM7Mm6wI"
}
```

#### Error: wrong username and/or password
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized: invalid credentials provided."
}
```

#### Error: Invalid login attempts exceeded
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. Login attempts exceeded for username lisa42."
}
```

## Add User
**<span style="color: green; ">POST</span> /api/user/add**

Adds a new user. Used by an admin to add a new user

### Request Body
```json
{
  "username": "lisa42",
  "password": "s33mlingl1G00dP8ssw0rd",
  "admin": true,
  "meta": {
    "birthday": "1988-08-26"
  }
}
```

* username (String) &minus; Desired username for the new user
* password (String) &minus; Desired password for the new user
* admin (boolean) &minus; Defines if the new user will be an admin
* meta (Object) &minus; Optional object for user meta data

### Request Path parameters
None

### Responses

#### Success
Status-Code: 200

Body:
```json
{
  "username": "lisa42"
}
```

#### Error: Not logged in
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Error: Not admin
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

#### Error: user already exists
Status-Code: 400

Body:
```json
{
  "error": "Error. User lisa42 exists already."
}
```

## Update Admin State
**<span style="color: green; ">POST</span> /api/user/set-admin**
Changes the admin state of a user

### Request Body
```json
{
  "username": "lisa42",
  "admin": true,
}
```

* username (String) &minus; username to change the state for
* admin (boolean) &minus; New state (`true`: admin, `false`: not admin)

### Request Path parameters
None

### Responses

#### Success
Status-Code: 200

Body:
```json
{}
```

#### Error: Not logged in
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Error: Not admin
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

## Change Username
**<span style="color: green; ">POST</span> /api/user/change-username**

Changes the username of a user

### Request Body
```json
{
  "username": "lisa42",
  "newUsername": "lisa3000",
}
```

* username (String) &minus; username to change the username for
* newUsername (String) &minus; New username for user

### Request Path parameters
None

### Responses

#### Success
Status-Code: 200

Body:
```json
{
  "username": "lisa3000"
}
```

#### Error: Not logged in
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Error: None-Admin tries to rename other user
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

## Change Password
**<span style="color: green; ">POST</span> /api/user/change-password**

Changes the password of a user

### Request Body
```json
{
  "username": "lisa42",
  "oldPassword": "s33mlingl1G00dP8ssw0rd",
  "newPassword": "iOiIxMjM0NTY3ODkwIiwibm"
}
```

* username (String) &minus; username to change the username for
* oldPassword (String) &minus; Required if you change your own password: your old password
* newPassword (String) &minus; The desired new password

### Request Path parameters
None

### Responses

#### Success
Status-Code: 200

Body:
```json
{}
```

#### Error: Not logged in
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Error: None-Admin tries to change the password of another user
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

#### Error: You tried to change your own password and provided an invalid old password
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to provide your password."
}
```

## Update Meta Data
**<span style="color: green; ">POST</span> /api/user/save-meta/<span style="color: #999">{username}</span>**

Changes the meta data of a user

### Request Body
```json
{
  "meta": {
    "birthday": "1988-08-26",
    "marriage": "2029-05-12"
  }
}
```

* meta (Object) &minus; object for the new user meta data

### Request Path parameters
* username &minus; The username of the user to change the meta data for

Examle:
<span style="color: green; ">POST</span> /api/user/save-meta/<span style="color: #999">lisa42</span>

### Responses

#### Success
Status-Code: 200

Body:
```json
{}
```

#### Error: Not logged in
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Error: None-Admin tries to change the meta data of another user
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

## Get Meta Data
**<span style="color: #60affe; ">GET</span> /api/user/load-meta/<span style="color: #999">{username}</span>**

Loads the meta data of a user

### Request Body
None

### Request Path parameters
* username &minus; The username of the user to load the meta data for

Examle:
<span style="color: #60affe; ">GET</span> /api/user/load-meta/<span style="color: #999">lisa42</span>

### Responses

#### Success
Status-Code: 200

Body:
```json
{
  "meta": {
    "birthday": "1988-08-26"
  }
}
```

#### Error: Not logged in
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Error: None-Admin tries to load the meta data of another user
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

## Get User
**<span style="color: #60affe; ">GET</span> /api/user/one/<span style="color: #999">{username}</span>**

Gets one user

### Request Body
None

### Request Path parameters
* username &minus; The username of the user to get

Examle:
<span style="color: #60affe; ">GET</span> /api/user/one/<span style="color: #999">lisa42</span>

### Responses

#### Success
Status-Code: 200

Body:
```json
{
  "user": {
    "username": "lisa42",
    "ownerId": "fc3f4c5e-93be-4d69-a4d3-a90c32e2309f",
    "admin": true,
    "meta": {
      "birthday": "1988-08-26"
    }
  }
}
```

#### Error: Not logged in
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Error: None-Admin tries to get another user
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

## List Users
**<span style="color: #60affe; ">GET</span> /api/user/list**

Lists users (username and admin state)

### Request Body
None

### Request Path parameters
None

### Responses

#### Success
Status-Code: 200

Body:
```json
{
  "users": [
    {
      "username": "lisa42",
      "admin": true
    },
    {
      "username": "maxi09",
      "admin": false
    }
  ]
}
```

#### Error: Not logged in
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Error: Not Admin
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```

## Delete User
**<span style="color: #a00; ">DELETE</span> /api/user/delete/<span style="color: #999">{username}</span>**

Deletes a user

### Request Body
None

### Request Path parameters
* username &minus; The username of the user to delete

Examle:
<span style="color: #a00; ">DELETE</span> /api/user/delete/<span style="color: #999">lisa42</span>

### Responses

#### Success
Status-Code: 200

Body:
```json
{}
```

#### Error: Not logged in
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be logged in."
}
```

#### Error: None-Admin tries to delete another user
Status-Code: 401

Body:
```json
{
  "error": "Unauthorized. You have to be admin."
}
```
