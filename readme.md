# SMJ-SSO
[![Build Status](https://travis-ci.com/aalfiann/smj-sso.svg?branch=master)](https://travis-ci.com/aalfiann/smj-sso)
[![Coverage Status](https://coveralls.io/repos/github/aalfiann/smj-sso/badge.svg?branch=master)](https://coveralls.io/github/aalfiann/smj-sso?branch=master)


## Detail Installation

### Requirement
1. Minimum NodeJS 12
2. MySQL

### 1. Setup Application
1. Download and extract this source code in your computer
2. Go to extracted directory and run `npm install` to install all package libraries.
3. Edit the `config.js`

### 2. Configuration
1. See the `config.js`  
```js
'use strict'

const config = {
  port: process.env.PORT || 4000, // Port Server (default is 4000)
  session: {
    maxAge: 3600 // 1 hour
  },
  database: {
    name: 'sso_db',
    user: 'root',
    pass: '',
    host: 'localhost',
    port: 3306,
    logging: true
  }
}

module.exports = config
```
Note:  
- Default will use standard host and port of MySQL.
- You have to create new database name with `sso_db` (you are able to change this)
- Application use default port `4000`

### 3. Setup Database
1. Create table by run `npm run seed` or if you want a default data, just run `npm run seed-example`

### 4. Run Application
Before running the application make sure you already run `npm run seed` or `npm run seed-example` for the first time.
1. To start the application, just run `npm start` then open your browser to `http://localhost:4000`.

### Default Data
If you want default data, then you have to run `npm run seed-example`.  
- Active User:  
  email: `admin1@example.com`  
  password: `123456`

- Banned User:  
  email: `admin2@example.com`  
  password: `654321`

- Default Service:  
  client_id: `60mwt1txtlnvadtjy5pkwtfwos78im67`  
  client_secret: `kxiykbx9b4ibjd1ofhbg6qg3u4hshui22e8zrp0bqdw`

### Unit Test
```
npm test
```